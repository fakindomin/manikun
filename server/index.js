// Manikun: serwer (Worker Cloudflare "manikun").
// Strona to statyczne pliki; tutaj trafiają tylko adresy /api/*.
// Logowanie przez Google (OAuth z PKCE), sesja w ciasteczku HttpOnly, kredyty w bazie D1 (binding DB).
// Wymaga: sekretu GOOGLE_CLIENT_SECRET (Settings › Variables and Secrets).
// Generowanie obrazów: Higgsfield API (api.higgsfield.ai), sekret HF_KEY w postaci KEY_ID:KEY_SECRET.

const START_CREDITS = 5;
const SESSION_DAYS = 30;
const SESSION_COOKIE = "mk_s";
const OAUTH_COOKIE = "mk_oauth";
const GOOGLE_AUTH = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN = "https://oauth2.googleapis.com/token";
// Identyfikator klienta jest publiczny; zmienna GOOGLE_CLIENT_ID (wrangler.jsonc albo panel) ma pierwszeństwo
const GOOGLE_CLIENT_ID = "331864294353-thj64786rfai33kid9v7sbahg52vicb3.apps.googleusercontent.com";
const clientId = env => env.GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID;

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
  if (!env.GOOGLE_CLIENT_SECRET) return json({ error: "Logowanie nie jest jeszcze skonfigurowane." }, 503);
  const state = randomToken(16), verifier = randomToken(32);
  const q = new URLSearchParams({
    client_id: clientId(env),
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
      client_id: clientId(env), client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: url.origin + "/api/auth/google/callback"
    })
  });
  if (!res.ok) { console.log("Google token: " + res.status + " " + (await res.text()).slice(0, 300)); return fail("token"); }
  let claims;
  try { claims = idTokenClaims((await res.json()).id_token, clientId(env)); } catch { claims = null; }
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

// ---------- Generowanie obrazów (Higgsfield) ----------
const HF_API = "https://api.higgsfield.ai";
const HF_MODEL = "bytedance/seedream/v4/text-to-image";
const GEN_COST = 1;
const MAX_PROMPT = 6000;
// Formaty z aplikacji → proporcje, które przyjmuje model (4:5 nie ma, najbliższe 3:4)
const ASPECTS = { "4:5": "3:4", "2:3": "2:3", "1:1": "1:1", "3:2": "3:2", "9:16": "9:16", "16:9": "16:9", "21:9": "21:9", "3:4": "3:4", "4:3": "4:3" };

const hfModel = env => env.HF_MODEL || HF_MODEL;
const genCost = env => Number(env.GEN_COST) || GEN_COST;
const hfHeaders = env => ({ Authorization: "Key " + env.HF_KEY, "Content-Type": "application/json", Accept: "application/json" });

function genView(g, credits) {
  return { id: g.id, status: g.status, url: g.image_url || null, error: g.error || null, ...(credits === undefined ? {} : { credits }) };
}

// Zwrot kredytów za nieudane zlecenie: raz (unikalne reason + ref)
async function refund(env, g, status, error) {
  await env.DB.batch([
    env.DB.prepare("INSERT OR IGNORE INTO credits (user_id, delta, reason, ref, created_at) VALUES (?, ?, 'refund', ?, ?)")
      .bind(g.user_id, g.cost, g.id, now()),
    env.DB.prepare("UPDATE generations SET status = ?, error = ?, updated_at = ? WHERE id = ?").bind(status, error, now(), g.id)
  ]);
  Object.assign(g, { status, error });
}

async function generate(request, env, user) {
  if (!env.HF_KEY) return json({ error: "Generator nie jest jeszcze podłączony." }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Zły format zapytania." }, 400); }
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) return json({ error: "Brak Maniscryptu." }, 400);
  if (prompt.length > MAX_PROMPT) return json({ error: "Maniscrypt jest za długi." }, 413);
  const aspect = ASPECTS[body.aspect] || "1:1";

  // Jedno zlecenie naraz na konto
  const busy = await env.DB.prepare("SELECT id FROM generations WHERE user_id = ? AND status IN ('queued', 'in_progress') AND created_at > ?")
    .bind(user.id, now() - 600).first();
  if (busy) return json({ error: "Poprzednie zdjęcie jeszcze się robi.", id: busy.id }, 409);

  // Kredyty schodzą tylko, jeśli saldo wystarcza (jedno zapytanie, więc dwa kliknięcia naraz nie zejdą poniżej zera)
  const id = randomToken(12), cost = genCost(env), t = now();
  const charged = await env.DB.prepare(
    "INSERT INTO credits (user_id, delta, reason, ref, created_at) SELECT ?1, -?2, 'gen', ?3, ?4 " +
    "WHERE (SELECT COALESCE(SUM(delta), 0) FROM credits WHERE user_id = ?1) >= ?2"
  ).bind(user.id, cost, id, t).run();
  if (!charged.meta.changes) return json({ error: "Brak kredytów.", credits: await balance(env, user.id) }, 402);

  const g = { id, user_id: user.id, cost, status: "queued" };
  await env.DB.prepare(
    "INSERT INTO generations (id, user_id, model, aspect, cost, prompt, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, 'queued', ?, ?)"
  ).bind(id, user.id, hfModel(env), aspect, cost, prompt, t, t).run();

  let res, data = null;
  try {
    res = await fetch((env.HF_API_URL || HF_API) + "/" + hfModel(env), {
      method: "POST", headers: hfHeaders(env),
      body: JSON.stringify({ prompt, aspect_ratio: aspect, resolution: "2K" }),
      signal: AbortSignal.timeout(30000)
    });
    data = await res.json().catch(() => null);
  } catch (e) {
    console.log("Higgsfield: " + e);
  }
  if (!res || !res.ok || !data || !data.request_id) {
    console.log("Higgsfield start: " + (res && res.status) + " " + JSON.stringify(data).slice(0, 500));
    await refund(env, g, "failed", "Generator nie przyjął zlecenia. Kredyt wrócił na konto.");
    return json(genView(g, await balance(env, user.id)), 502);
  }
  g.status = data.status === "in_progress" ? "in_progress" : "queued";
  await env.DB.prepare("UPDATE generations SET request_id = ?, status = ?, updated_at = ? WHERE id = ?")
    .bind(data.request_id, g.status, now(), id).run();
  return json(genView(g, await balance(env, user.id)));
}

async function generationStatus(env, user, id) {
  const g = await env.DB.prepare("SELECT * FROM generations WHERE id = ? AND user_id = ?").bind(id, user.id).first();
  if (!g) return json({ error: "Nie ma takiego zdjęcia." }, 404);
  if ((g.status === "queued" || g.status === "in_progress") && g.request_id) {
    let data = null;
    try {
      const res = await fetch((env.HF_API_URL || HF_API) + "/requests/" + encodeURIComponent(g.request_id) + "/status", { headers: hfHeaders(env), signal: AbortSignal.timeout(15000) });
      data = res.ok ? await res.json() : null;
      if (!res.ok) console.log("Higgsfield status: " + res.status);
    } catch (e) { console.log("Higgsfield status: " + e); }
    if (data && data.status === "completed") {
      const url = data.images && data.images[0] && data.images[0].url;
      if (url) {
        await env.DB.prepare("UPDATE generations SET status = 'completed', image_url = ?, updated_at = ? WHERE id = ?").bind(url, now(), g.id).run();
        Object.assign(g, { status: "completed", image_url: url });
      } else await refund(env, g, "failed", "Generator nie oddał zdjęcia. Kredyt wrócił na konto.");
    } else if (data && data.status === "nsfw") {
      await refund(env, g, "nsfw", "Generator odrzucił ten opis. Kredyt wrócił na konto.");
    } else if (data && data.status === "failed") {
      await refund(env, g, "failed", "Nie udało się zrobić zdjęcia. Kredyt wrócił na konto.");
    } else if (data && data.status && data.status !== g.status) {
      await env.DB.prepare("UPDATE generations SET status = ?, updated_at = ? WHERE id = ?").bind(data.status, now(), g.id).run();
      g.status = data.status;
    } else if (now() - g.created_at > 600) {
      await refund(env, g, "failed", "Generator nie zdążył. Kredyt wrócił na konto.");
    }
  }
  return json(genView(g, await balance(env, user.id)));
}

async function me(request, env) {
  const user = await currentUser(request, env);
  if (!user) return json({ user: null, login: !!env.GOOGLE_CLIENT_SECRET, v: 3 });
  return json({ user: { email: user.email, name: user.name }, credits: await balance(env, user.id), gen: !!env.HF_KEY, cost: genCost(env) });
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
      if (url.pathname === "/api/generate" || url.pathname.startsWith("/api/generate/")) {
        if (request.method === "POST" && !sameOrigin(request, url)) return json({ error: "Niedozwolone źródło." }, 403);
        const user = await currentUser(request, env);
        if (!user) return json({ error: "Zaloguj się." }, 401);
        if (route === "POST /api/generate") return await generate(request, env, user);
        const m = url.pathname.match(/^\/api\/generate\/([\w-]{8,40})$/);
        if (request.method === "GET" && m) return await generationStatus(env, user, m[1]);
      }
      return json({ error: "Nie ma takiego adresu." }, 404);
    } catch (e) {
      console.log("Błąd: " + (e && e.stack || e));
      return json({ error: "Coś poszło nie tak. Spróbuj ponownie." }, 500);
    }
  }
};
