import { Redis } from "@upstash/redis";

// Vercel's Upstash integration names these KV_REST_API_*; a direct Upstash setup uses UPSTASH_REDIS_REST_*.
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

const KEYS = {
  refreshToken: "fitbit:refresh_token",
  accessToken: "fitbit:access_token",
  lock: "fitbit:refresh_lock",
  steps: "fitbit:steps_today",
};

const STEPS_CACHE_SECONDS = 600; // re-ask Fitbit at most every 10 minutes

function basicAuth() {
  return (
    "Basic " +
    Buffer.from(`${process.env.FITBIT_CLIENT_ID}:${process.env.FITBIT_CLIENT_SECRET}`).toString("base64")
  );
}

// Fitbit refresh tokens are single-use: every refresh returns a new one, which must be saved
// before anything else, or the next refresh fails and the widget is locked out.
async function refreshAccessToken() {
  // Only one request refreshes at a time; a second concurrent refresh would burn the same token.
  const gotLock = await redis.set(KEYS.lock, "1", { nx: true, ex: 15 });
  if (!gotLock) {
    for (let i = 0; i < 10; i++) {
      await new Promise((r) => setTimeout(r, 500));
      const token = await redis.get(KEYS.accessToken);
      if (token) return token;
    }
    throw new Error("Timed out waiting for another Fitbit token refresh");
  }

  try {
    const refreshToken = await redis.get(KEYS.refreshToken);
    if (!refreshToken) {
      throw new Error("No Fitbit refresh token in Redis. Run: npm run fitbit:auth");
    }

    const res = await fetch("https://api.fitbit.com/oauth2/token", {
      method: "POST",
      headers: {
        Authorization: basicAuth(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Fitbit token refresh failed (${res.status}): ${await res.text()}`);
    }

    const data = await res.json();
    await redis.set(KEYS.refreshToken, data.refresh_token);
    // Expire our copy a minute early so we never send a just-expired token.
    await redis.set(KEYS.accessToken, data.access_token, { ex: Math.max(data.expires_in - 60, 60) });
    return data.access_token;
  } finally {
    await redis.del(KEYS.lock);
  }
}

async function getAccessToken() {
  const token = await redis.get(KEYS.accessToken);
  return token || refreshAccessToken();
}

async function fetchActivitySummary(token) {
  return fetch("https://api.fitbit.com/1/user/-/activities/date/today.json", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
}

// "today" is resolved by Fitbit in the timezone set on the Fitbit account.
export async function getStepsToday() {
  const cached = await redis.get(KEYS.steps);
  if (cached) return cached;

  let res = await fetchActivitySummary(await getAccessToken());

  // Access token was revoked or expired early: drop it, refresh once, retry.
  if (res.status === 401) {
    await redis.del(KEYS.accessToken);
    res = await fetchActivitySummary(await refreshAccessToken());
  }

  if (!res.ok) {
    throw new Error(`Fitbit activity request failed (${res.status}): ${await res.text()}`);
  }

  const data = await res.json();
  const result = {
    steps: data.summary?.steps ?? 0,
    goal: data.goals?.steps ?? null,
    updatedAt: new Date().toISOString(),
  };

  await redis.set(KEYS.steps, result, { ex: STEPS_CACHE_SECONDS });
  return result;
}

export { redis, KEYS };
