// Google Health API (successor to the Fitbit Web API, which was shut off 2026-11-02).
// Same pattern as lib/spotify.js: a long-lived refresh token lives in env, and the
// short-lived (1 hour) access token is cached in memory.

// "Today" is computed in this timezone, since the server itself runs in UTC.
const TIMEZONE = process.env.GOOGLE_HEALTH_TIMEZONE || "America/Chicago";

let accessToken = null;
let accessTokenExpires = 0;

async function refreshAccessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.GOOGLE_HEALTH_REFRESH_TOKEN,
      client_id: process.env.GOOGLE_HEALTH_CLIENT_ID,
      client_secret: process.env.GOOGLE_HEALTH_CLIENT_SECRET,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Google token refresh failed (${res.status}): ${await res.text()}`);
  }

  const data = await res.json();
  accessToken = data.access_token;
  // Expire our copy a minute early so we never send a just-expired token.
  accessTokenExpires = Date.now() + (data.expires_in - 60) * 1000;
  return accessToken;
}

async function getAccessToken() {
  if (!accessToken || Date.now() > accessTokenExpires) {
    return refreshAccessToken();
  }
  return accessToken;
}

// Calendar date (year/month/day) in TIMEZONE, offset by `addDays`.
function civilDate(addDays = 0) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date());
  const get = (type) => Number(parts.find((p) => p.type === type).value);

  // Use UTC date math purely as a calendar to roll over month/year boundaries.
  const d = new Date(Date.UTC(get("year"), get("month") - 1, get("day") + addDays));
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

const MIDNIGHT = { hours: 0, minutes: 0, seconds: 0, nanos: 0 };

async function requestDailySteps(token) {
  return fetch("https://health.googleapis.com/v4/users/me/dataTypes/steps/dataPoints:dailyRollUp", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      range: {
        start: { date: civilDate(0), time: MIDNIGHT }, // inclusive
        end: { date: civilDate(1), time: MIDNIGHT }, // exclusive
      },
      windowSizeDays: 1,
    }),
    cache: "no-store",
  });
}

export async function getStepsToday() {
  let res = await requestDailySteps(await getAccessToken());

  // Access token revoked or expired early: refresh once and retry.
  if (res.status === 401) {
    accessToken = null;
    res = await requestDailySteps(await getAccessToken());
  }

  if (!res.ok) {
    throw new Error(`Google Health steps request failed (${res.status}): ${await res.text()}`);
  }

  const data = await res.json();
  const today = data.rollupDataPoints?.[0];

  return {
    // countSum is a string in the API; no data point means no steps recorded yet today.
    steps: Number(today?.steps?.countSum ?? 0),
    updatedAt: new Date().toISOString(),
  };
}
