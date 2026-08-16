import axios from "axios";
import querystring from "querystring";

let accessToken = null;
let accessTokenExpires = 0;

let accessTokenRecent = null;
let accessTokenRecentExpires = 0;

async function refreshAccessToken() {

    const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        querystring.stringify({
          grant_type: "refresh_token",
          refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
        }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                  "Basic " +
                  Buffer.from(
                    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
                      ":" +
                      process.env.SPOTIFY_CLIENT_SECRET
                  ).toString("base64"),
              },
        }
    );

    accessToken = response.data.access_token;
    accessTokenExpires = Date.now() + response.data.expires_in * 1000;
    return accessToken;

}

async function getAccessToken() {
    if (!accessToken || Date.now() > accessTokenExpires) {
      return await refreshAccessToken();
    }
    return accessToken;
}

export async function getTopTracks(time_range = "short_term", limit = 10) {
    const token = await getAccessToken();
  
    const resp = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=${limit}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return resp.data.items;
}


async function refreshAccessTokenRecent() {
    const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        querystring.stringify({
          grant_type: "refresh_token",
          refresh_token: process.env.SPOTIFY_REFRESH_TOKEN_RECENT,
        }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                  "Basic " +
                  Buffer.from(
                    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
                      ":" +
                      process.env.SPOTIFY_CLIENT_SECRET
                  ).toString("base64"),
              },
        }
    );

    accessTokenRecent = response.data.access_token;
    accessTokenRecentExpires = Date.now() + response.data.expires_in * 1000;
    return accessTokenRecent;
}

async function getAccessTokenRecent() {
    if (!accessTokenRecent || Date.now() > accessTokenRecentExpires) {
      return await refreshAccessTokenRecent();
    }
    return accessTokenRecent;
}

export async function getRecentTracks(limit=40) {

    const token = await getAccessTokenRecent();
  
    const resp = await axios.get(
      `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return resp.data.items;

}
