// One-time Google Health sign-in. Run with: npm run health:auth
// Opens a local callback server, prints a Google sign-in link, and prints the
// refresh token to paste into .env.local and Vercel as GOOGLE_HEALTH_REFRESH_TOKEN.

import http from "node:http";
import crypto from "node:crypto";

const PORT = 8787;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;
const SCOPE = "https://www.googleapis.com/auth/googlehealth.activity_and_fitness.readonly";

const clientId = process.env.GOOGLE_HEALTH_CLIENT_ID;
const clientSecret = process.env.GOOGLE_HEALTH_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("Missing in .env.local: GOOGLE_HEALTH_CLIENT_ID and/or GOOGLE_HEALTH_CLIENT_SECRET");
  process.exit(1);
}

// PKCE: proves the code exchange comes from the same process that started the sign-in.
const verifier = crypto.randomBytes(32).toString("base64url");
const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");
const state = crypto.randomBytes(16).toString("hex");

const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: REDIRECT_URI,
    scope: SCOPE,
    access_type: "offline", // needed to get a refresh token
    prompt: "consent", // makes Google issue a refresh token even if you've signed in before
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
    server.close();
  };

  if (url.searchParams.get("state") !== state) {
    console.error("State mismatch; run the script again.");
    return done(400, "State mismatch; run the script again.");
  }
  const code = url.searchParams.get("code");
  if (!code) {
    const error = url.searchParams.get("error") || "no code returned";
    console.error(`Sign-in failed: ${error}`);
    return done(400, `Sign-in failed: ${error}`);
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        code_verifier: verifier,
        redirect_uri: REDIRECT_URI,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const data = await tokenRes.json();
    if (!tokenRes.ok || !data.refresh_token) {
      console.error("Token exchange failed:", data);
      return done(500, "Token exchange failed; see the terminal.");
    }

    // Confirms the Google account is linked to Google Health.
    const idRes = await fetch("https://health.googleapis.com/v4/users/me/identity", {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });
    if (!idRes.ok) {
      console.warn(
        `\nWarning: identity check failed (${idRes.status}). Make sure Google Health is linked in the Google Health mobile app.\n${await idRes.text()}`
      );
    }

    if (data.refresh_token_expires_in) {
      const days = (data.refresh_token_expires_in / 86400).toFixed(1);
      console.warn(
        `\nWarning: this refresh token expires in ${days} days. Your OAuth app is probably still in "Testing"; publish it to "In production" and run this script again.`
      );
    }

    console.log("\nSuccess. Add this line to .env.local and to your Vercel environment variables:\n");
    console.log(`GOOGLE_HEALTH_REFRESH_TOKEN=${data.refresh_token}\n`);
    done(200, "Signed in. Copy the refresh token from your terminal; you can close this tab.");
  } catch (err) {
    console.error(err);
    done(500, `Error: ${err.message}`);
  }
});

server.listen(PORT, () => {
  console.log("\nOpen this link, sign in with your Google account and allow access:\n");
  console.log(authUrl + "\n");
});
