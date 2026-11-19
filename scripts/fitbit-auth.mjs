// One-time Fitbit login. Run with: npm run fitbit:auth
// Opens a local callback server, prints a Fitbit sign-in link, and saves the
// resulting refresh token to Upstash Redis, where the site picks it up.
// Re-run it only if the widget ever loses access (e.g. you revoke the app).

import http from "node:http";
import crypto from "node:crypto";
import { Redis } from "@upstash/redis";

const PORT = 8787;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;
const SCOPES = "activity";

const clientId = process.env.FITBIT_CLIENT_ID;
const clientSecret = process.env.FITBIT_CLIENT_SECRET;
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const missing = [
  !clientId && "FITBIT_CLIENT_ID",
  !clientSecret && "FITBIT_CLIENT_SECRET",
  !redisUrl && "KV_REST_API_URL (or UPSTASH_REDIS_REST_URL)",
  !redisToken && "KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_TOKEN)",
].filter(Boolean);

if (missing.length) {
  console.error(`Missing in .env.local: ${missing.join(", ")}`);
  process.exit(1);
}

const redis = new Redis({ url: redisUrl, token: redisToken });

// PKCE: proves the code exchange comes from the same process that started the login.
const verifier = crypto.randomBytes(32).toString("base64url");
const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");
const state = crypto.randomBytes(16).toString("hex");

const authUrl =
  "https://www.fitbit.com/oauth2/authorize?" +
  new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    code_challenge: challenge,
    code_challenge_method: "S256",
    state,
  });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname !== "/callback") {
    res.writeHead(404).end();
    return;
  }

  const done = (status, message) => {
    res.writeHead(status, { "Content-Type": "text/plain" }).end(message);
    console.log(message);
    server.close();
  };

  if (url.searchParams.get("state") !== state) return done(400, "State mismatch; run the script again.");
  const code = url.searchParams.get("code");
  if (!code) return done(400, `Fitbit sign-in failed: ${url.searchParams.get("error") || "no code returned"}`);

  try {
    const tokenRes = await fetch("https://api.fitbit.com/oauth2/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        code,
        code_verifier: verifier,
        redirect_uri: REDIRECT_URI,
      }),
    });

    if (!tokenRes.ok) return done(500, `Token exchange failed (${tokenRes.status}): ${await tokenRes.text()}`);

    const data = await tokenRes.json();
    await redis.set("fitbit:refresh_token", data.refresh_token);
    await redis.set("fitbit:access_token", data.access_token, { ex: Math.max(data.expires_in - 60, 60) });
    await redis.del("fitbit:steps_today");

    done(200, "Fitbit connected. Token saved to Redis; you can close this tab.");
  } catch (err) {
    done(500, `Error: ${err.message}`);
  }
});

server.listen(PORT, () => {
  console.log("\nOpen this link, sign in to Fitbit and allow access:\n");
  console.log(authUrl + "\n");
});
