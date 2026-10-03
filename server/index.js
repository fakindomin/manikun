// Manikun: serwer (Worker Cloudflare "manikun").
// Strona to statyczne pliki; tutaj trafiają tylko adresy /api/*.
// Logowanie przez Google (OAuth z PKCE), sesja w ciasteczku HttpOnly, kredyty w bazie D1 (binding DB).
// Wymaga: zmiennej GOOGLE_CLIENT_ID i sekretu GOOGLE_CLIENT_SECRET (Settings › Variables and Secrets).

const START_CREDITS = 5;
const SESSION_DAYS = 30;
const SESSION_COOKIE = "mk_s";
const OAUTH_COOKIE = "mk_oauth";
const GOOGLE_AUTH = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN = "https://oauth2.googleapis.com/token";

const now = () => Math.floor(Date.now() / 1000);
const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers } });
const redirect = (to, headers = {}) => new Response(null, { status: 302, headers: { Location: to, "Cache-Control": "no-store", ...headers } });

function b64url(bytes) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
const randomToken = (n = 32) => b64url(crypto.getRandomValues(new Uint8Array(n)));
async function sha256(text) {
  return b64url(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text))));
}

function cookies(request) {
  const out = {};
  for (const part of (request.headers.get("Cookie") || "").split(";")) {
    const i = part.indexOf("=");
    if (i > 0) out[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  }
  return out;
}
function setCookie(name, value, maxAge, path = "/") {
  return `${name}=${value}; Path=${path}; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

// Treść id_token z Google. Token przychodzi prosto z Google przez HTTPS (wymiana kodu), więc podpisu nie sprawdzamy;
// sprawdzamy wydawcę, odbiorcę i ważność.
function idTokenClaims(idToken, clientId) {
  const part = (idToken || "").split(".")[1];
  if (!part) return null;
  const bin = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
  const claims = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0))));
  const issOk = claims.iss === "https://accounts.google.com" || claims.iss === "accounts.google.com";
  if (!issOk || claims.aud !== clientId || !(claims.exp > now()) || !claims.sub || !claims.email || claims.email_verified === false) return null;
  return claims;
}

async function currentUser(request, env) {
  const token = cookies(request)[SESSION_COOKIE];
  if (!token) return null;
  return env.DB.prepare(
    "SELECT u.id, u.email, u.name FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?"
  ).bind(await sha256(token), now()).first();
}

async function balance(env, userId) {
  const row = await env.DB.prepare("SELECT COALESCE(SUM(delta), 0) AS n FROM credits WHERE user_id = ?").bind(userId).first();
  return row.n;
}

// Zmiana stanu (POST) tylko z tej samej strony
function sameOrigin(request, url) {
  return request.headers.get("Origin") === url.origin;
}

async function googleStart(url, env) {
  if (!env.GOOGLE_CLIENT_ID) return json({ error: "Logowanie nie jest jeszcze skonfigurowane." }, 503);
  const state = randomToken(16), verifier = randomToken(32);
  const q = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: url.origin + "/api/auth/google/callback",
    response_type: "code",
    scope: "openid email profile",
    state,
    code_challenge: await sha256(verifier),
    code_challenge_method: "S256",
    prompt: "select_account"
  });
  return redirect(GOOGLE_AUTH + "?" + q, { "Set-Cookie": setCookie(OAUTH_COOKIE, state + "." + verifier, 600, "/api/auth") });
}

async function googleCallback(request, url, env) {
  const clear = setCookie(OAUTH_COOKIE, "", 0, "/api/auth");
  const fail = why => redirect("/?konto=blad", { "Set-Cookie": clear, "X-Manikun-Error": why });
  const [state, verifier] = (cookies(request)[OAUTH_COOKIE] || "").split(".");
  const code = url.searchParams.get("code");
  if (!state || !verifier || !code || url.searchParams.get("state") !== state) return fail("state");

  const res = await fetch(env.GOOGLE_TOKEN_URL || GOOGLE_TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code, code_verifier: verifier, grant_type: "authorization_code",
      client_id: env.GOOGLE_CLIENT_ID, client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: url.origin + "/api/auth/google/callback"
    })
  });
  if (!res.ok) { console.log("Google token: " + res.status + " " + (await res.text()).slice(0, 300)); return fail("token"); }
  let claims;
  try { claims = idTokenClaims((await res.json()).id_token, env.GOOGLE_CLIENT_ID); } catch { claims = null; }
  if (!claims) return fail("claims");

  const t = now();
  await env.DB.prepare(
    "INSERT INTO users (google_sub, email, name, created_at) VALUES (?1, ?2, ?3, ?4) " +
    "ON CONFLICT (google_sub) DO UPDATE SET email = ?2, name = ?3"
  ).bind(claims.sub, claims.email, claims.name || null, t).run();
  const user = await env.DB.prepare("SELECT id FROM users WHERE google_sub = ?").bind(claims.sub).first();
  const token = randomToken(32);
  await env.DB.batch([
    // Kredyty na start: raz na konto (unikalne reason + ref)
    env.DB.prepare("INSERT OR IGNORE INTO credits (user_id, delta, reason, ref, created_at) VALUES (?1, ?2, 'start', ?3, ?4)")
      .bind(user.id, START_CREDITS, String(user.id), t),
    env.DB.prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)")
      .bind(await sha256(token), user.id, t + SESSION_DAYS * 86400),
    env.DB.prepare("DELETE FROM sessions WHERE expires_at <= ?").bind(t)
  ]);
  const h = new Headers({ Location: "/?konto=ok", "Cache-Control": "no-store" });
  h.append("Set-Cookie", clear);
  h.append("Set-Cookie", setCookie(SESSION_COOKIE, token, SESSION_DAYS * 86400));
  return new Response(null, { status: 302, headers: h });
}

async function logout(request, env) {
  const token = cookies(request)[SESSION_COOKIE];
  if (token) await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await sha256(token)).run();
  return json({ ok: true }, 200, { "Set-Cookie": setCookie(SESSION_COOKIE, "", 0) });
}

async function me(request, env) {
  const user = await currentUser(request, env);
  if (!user) return json({ user: null, login: !!env.GOOGLE_CLIENT_ID });
  return json({ user: { email: user.email, name: user.name }, credits: await balance(env, user.id) });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);
    try {
      const route = request.method + " " + url.pathname;
      switch (route) {
        case "GET /api/me": return await me(request, env);
        case "GET /api/auth/google": return await googleStart(url, env);
        case "GET /api/auth/google/callback": return await googleCallback(request, url, env);
        case "POST /api/auth/logout":
          return sameOrigin(request, url) ? await logout(request, env) : json({ error: "Niedozwolone źródło." }, 403);
      }
      return json({ error: "Nie ma takiego adresu." }, 404);
    } catch (e) {
      console.log("Błąd: " + (e && e.stack || e));
      return json({ error: "Coś poszło nie tak. Spróbuj ponownie." }, 500);
    }
  }
};
