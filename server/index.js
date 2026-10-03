import { bench, models } from "./bench.js";
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
// Soul 2: najlepszy stosunek ceny do jakości (ok. 20 s). Recraft 4.1 był szybszy (ok. 10 s), ale za drogi.
// Bez modelu zapasowego: Soul Standard kosztuje ok. 0,094 $ (30 razy więcej), więc awaria ma się zakończyć zwrotem kredytu.
const HF_MODEL = "higgsfield-ai/soul/v2/standard";
const HF_FALLBACK = [];
// Modele do testów (tylko właściciel, konto nr 1, wybiera w panelu Maniscryptu); ceny z cennika Higgsfield API, 3.10.2026
const TEST_MODELS = [
  { id: "higgsfield-ai/soul/v2/standard", name: "Soul 2", price: 0.0032 },
  { id: "marketing-studio/image/sunburst", name: "Marketing Studio 2.5 Sunburst", price: 0.0107 },
  { id: "marketing-studio/image/flare", name: "Marketing Studio 2.5 Flare", price: 0.0107 },
  { id: "marketing-studio/image", name: "Marketing Studio", price: 0.0107 },
  { id: "z-image/turbo", name: "Z-Image Turbo", price: 0.015 },
  { id: "ideogram/v4.0", name: "Ideogram 4.0", price: 0.03 },
  { id: "recraft/v4.1/text-to-image", name: "Recraft 4.1", price: 0.035 },
  { id: "alibaba/qwen-image-3/text-to-image", name: "Qwen Image 3", price: 0.04 },
  { id: "xai/grok-imagine-image-2.0", name: "Grok Imagine 2.0", price: 0.04 }
  // FLUX.2 klein z Cloudflare Workers AI (kod niżej) zdjęty z listy: na darmowym planie zlecenie wisiało i nie oddawało obrazu
];
const isWorkersAI = model => model.startsWith("@cf/");

// Wymiary ok. 1 MP w proporcjach kadru, wielokrotność 16
function dims(aspect) {
  const [a, b] = String(aspect).split(":").map(Number);
  const r = a > 0 && b > 0 ? a / b : 1, area = 1024 * 1024;
  const w = Math.round(Math.sqrt(area * r) / 16) * 16, h = Math.round(Math.sqrt(area / r) / 16) * 16;
  return [w, h];
}

// Base64 → bajty natywnie (tanio dla procesora; pętla w JS przy dużym obrazie przekracza limit czasu procesora Workera)
async function fromBase64(b64) {
  if (typeof Uint8Array.fromBase64 === "function") return Uint8Array.fromBase64(b64);
  return new Uint8Array(await (await fetch("data:application/octet-stream;base64," + b64)).arrayBuffer());
}
const note = (env, id, text) => env.DB.prepare("UPDATE generations SET detail = ? WHERE id = ?").bind(text, id).run();

// Zdjęcie z Workers AI, w tle (ctx.waitUntil): kolejne etapy w kolumnie detail, na końcu zapis do KV
async function generateWorkersAI(env, g, model, prompt, aspect) {
  const t0 = Date.now();
  let bytes = null, why = "";
  await note(env, g.id, "workers-ai: start");
  try {
    const [w, h] = dims(aspect);
    const form = new FormData();
    form.append("prompt", prompt);
    form.append("width", String(w));
    form.append("height", String(h));
    const fr = new Response(form);
    const out = await env.AI.run(model, { multipart: { body: fr.body, contentType: fr.headers.get("content-type") } });
    await note(env, g.id, "workers-ai: obraz po " + (Date.now() - t0) + " ms, dekodowanie");
    if (out && typeof out.image === "string") bytes = await fromBase64(out.image);
    else if (out instanceof ReadableStream) bytes = new Uint8Array(await new Response(out).arrayBuffer());
    else why = "brak obrazu w odpowiedzi: " + JSON.stringify(out).slice(0, 200);
  } catch (e) { why = String(e && e.message || e).slice(0, 400); }
  const ms = Date.now() - t0;
  if (!bytes || !env.PHOTOS) {
    await env.DB.prepare("UPDATE generations SET detail = ? WHERE id = ?").bind("workers-ai " + ms + " ms: " + (why || "brak magazynu zdjęć"), g.id).run();
    await refund(env, g, "failed", "Generator nie zrobił zdjęcia. Kredyt wrócił na konto.");
    return;
  }
  const type = bytes[0] === 0x89 ? "image/png" : bytes[0] === 0x52 ? "image/webp" : "image/jpeg";
  await env.PHOTOS.put("gen/" + g.id, bytes, { metadata: { type } });
  await env.DB.prepare("UPDATE generations SET status = 'completed', stored = 1, detail = ?, updated_at = ? WHERE id = ?")
    .bind("workers-ai " + ms + " ms", now(), g.id).run();
  Object.assign(g, { status: "completed", stored: 1 });
}
const isOwner = user => user && user.id === 1;
const GEN_COST = 1;
const MAX_PROMPT = 6000;
// Formaty z aplikacji → proporcje, które przyjmuje model (Recraft ma 4:5, nie ma 21:9; Soul nie ma 4:5)
const ASPECTS = { "4:5": "4:5", "2:3": "2:3", "1:1": "1:1", "3:2": "3:2", "9:16": "9:16", "16:9": "16:9", "21:9": "16:9", "3:4": "3:4", "4:3": "4:3" };
const ASPECTS_SOUL = { "4:5": "3:4", "21:9": "21:9" };
const aspectFor = (model, a) => model.startsWith("@cf/") && /^\d{1,2}:\d{1,2}$/.test(a) ? a : (/soul/.test(model) && ASPECTS_SOUL[a]) || ASPECTS[a] || "1:1";

const hfModel = env => env.HF_MODEL || HF_MODEL;
const genCost = env => Number(env.GEN_COST) || GEN_COST;
// Klucz wklejony w panelu bywa z odstępami albo cudzysłowami; zostawiamy samo KEY_ID:KEY_SECRET
// Gdy przed kluczem jest dopisek (np. „HF_KEY:”), bierzemy dwie ostatnie części: KEY_ID (UUID) i KEY_SECRET
const hfKey = env => String(env.HF_KEY || "").trim().replace(/^["']|["']$/g, "").replace(/\s+/g, "").split(":").slice(-2).join(":");
const hfHeaders = env => ({ Authorization: "Key " + hfKey(env), "Content-Type": "application/json", Accept: "application/json" });
// Kształt klucza do diagnozy (bez treści): liczba części i ich długości
const hfKeyShape = env => "klucz: " + String(env.HF_KEY || "").trim().split(":").map(p => p.length).join("+") + " znaków";

// Adres zdjęcia: nasza kopia (/api/photo/<id>), a dopóki jej nie ma, adres Higgsfield
const photoUrl = g => g.stored ? "/api/photo/" + g.id : g.image_url || null;
function genView(g, credits, eta) {
  return { id: g.id, status: g.status, url: photoUrl(g), error: g.error || null, seen: !!g.seen, cancelled: !!g.cancelled,
    ...(credits === undefined ? {} : { credits }), ...(eta ? { eta } : {}) };
}

// Ile zwykle trwa zdjęcie tym modelem (średnia z ostatnich 20 udanych, w sekundach), do paska postępu w aplikacji
async function genEta(env, model) {
  const row = await env.DB.prepare(
    "SELECT AVG(d) AS a FROM (SELECT updated_at - created_at AS d FROM generations WHERE model = ? AND status = 'completed' ORDER BY created_at DESC LIMIT 20)"
  ).bind(model).first();
  return Math.round(row && row.a) || (/recraft/.test(model) ? 11 : 20);
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

async function generate(request, env, user, ctx) {
  if (!env.HF_KEY) return json({ error: "Generator nie jest jeszcze podłączony." }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Zły format zapytania." }, 400); }
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) return json({ error: "Brak Maniscryptu." }, 400);
  if (prompt.length > MAX_PROMPT) return json({ error: "Maniscrypt jest za długi." }, 413);
  // Właściciel może wybrać model do testu; reszta zawsze dostaje model domyślny
  const pick = isOwner(user) && TEST_MODELS.find(m => m.id === body.model);
  const chosen = pick ? pick.id : hfModel(env);
  const asked = String(body.aspect || ""), aspect = aspectFor(chosen, asked);

  // Jedno zlecenie naraz na konto
  const busy = await env.DB.prepare("SELECT id FROM generations WHERE user_id = ? AND status IN ('queued', 'in_progress') AND created_at > ?")
    .bind(user.id, now() - 600).first();
  if (busy) {
    // Może już skończone, tylko nikt nie zapytał: dopytujemy, zanim odmówimy
    const b = await refresh(env, await env.DB.prepare("SELECT * FROM generations WHERE id = ?").bind(busy.id).first());
    if (b.status === "queued" || b.status === "in_progress") return json({ error: "Poprzednie zdjęcie jeszcze się robi. Naraz robimy jedno.", id: busy.id }, 409);
  }

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
  ).bind(id, user.id, chosen, aspect, cost, prompt, t, t).run();

  // Model z HF_MODEL, a gdy API go nie zna, kolejne z listy; przy 422 (nieznany parametr) jeszcze raz z samym promptem
  if (isWorkersAI(chosen)) {
    if (!env.AI) { await refund(env, g, "failed", "Generator nie jest podłączony. Kredyt wrócił na konto."); return json(genView(g, await balance(env, user.id)), 502); }
    // Zlecenie robi się w tle, aplikacja dopytuje jak przy Higgsfield (odpowiedź nie czeka na obraz)
    ctx.waitUntil(generateWorkersAI(env, g, chosen, prompt, aspect).catch(async e => {
      await note(env, g.id, "workers-ai błąd: " + String(e && e.message || e).slice(0, 300));
      await refund(env, g, "failed", "Generator nie zrobił zdjęcia. Kredyt wrócił na konto.");
    }));
    return json(genView(g, await balance(env, user.id), 3));
  }
  let res, data = null, raw = "", model = chosen;
  const log = [];
  const models = [model, ...HF_FALLBACK.filter(m => m !== model)];
  attempts: for (const m of models) {
    for (const body of [{ prompt, aspect_ratio: aspectFor(m, asked) }, { prompt }]) {
      model = m; data = null;
      try {
        res = await fetch((env.HF_API_URL || HF_API) + "/" + m, {
          method: "POST", headers: hfHeaders(env), body: JSON.stringify(body), signal: AbortSignal.timeout(30000)
        });
        raw = await res.text();
        try { data = JSON.parse(raw); } catch { data = null; }
      } catch (e) { res = null; raw = "fetch: " + e; }
      log.push(m + " " + (res ? res.status : "-") + " " + raw.slice(0, 300));
      if (res && res.status === 422) continue;
      if (res && res.status === 404 && /model_not_found/.test(raw)) continue attempts;
      break attempts;
    }
  }
  if (model !== chosen) await env.DB.prepare("UPDATE generations SET model = ? WHERE id = ?").bind(model, g.id).run();
  if (!res || !res.ok || !data || !data.request_id) {
    const detail = log.join(" || ").slice(0, 1500) + (res && res.status === 401 ? " | " + hfKeyShape(env) : "");
    console.log("Higgsfield start: " + detail);
    await env.DB.prepare("UPDATE generations SET detail = ? WHERE id = ?").bind(detail, g.id).run();
    await refund(env, g, "failed", "Generator nie przyjął zlecenia. Kredyt wrócił na konto.");
    return json(genView(g, await balance(env, user.id)), 502);
  }
  g.status = data.status === "in_progress" ? "in_progress" : "queued";
  await env.DB.prepare("UPDATE generations SET request_id = ?, status = ?, updated_at = ? WHERE id = ?")
    .bind(data.request_id, g.status, now(), id).run();
  return json(genView(g, await balance(env, user.id), await genEta(env, model)));
}

// Kopia zdjęcia u nas (KV PHOTOS): adresy Higgsfield wygasają, a Moje ujęcia mają zostać
async function storePhoto(env, g) {
  if (!env.PHOTOS || g.stored || !g.image_url) return;
  let why = "";
  try {
    const r = await fetch(g.image_url, { signal: AbortSignal.timeout(20000) });
    if (r.ok) {
      const buf = await r.arrayBuffer();
      await env.PHOTOS.put("gen/" + g.id, buf, { metadata: { type: r.headers.get("Content-Type") || "image/jpeg" } });
      await env.DB.prepare("UPDATE generations SET stored = 1 WHERE id = ?").bind(g.id).run();
      g.stored = 1;
      return;
    }
    why = "pobranie " + r.status + " " + (await r.text()).slice(0, 200);
  } catch (e) { why = String(e).slice(0, 300); }
  console.log("Zapis zdjęcia: " + why);
  await env.DB.prepare("UPDATE generations SET detail = ? WHERE id = ?").bind("zapis: " + why, g.id).run();
}

// Dopytanie Higgsfield o zlecenie w toku i zapis wyniku (wspólne dla okna zdjęcia i Moich ujęć)
async function refresh(env, g) {
  // Zlecenie Workers AI bez wyniku po 2 minutach: zadanie w tle przerwane, kredyt wraca
  if ((g.status === "queued" || g.status === "in_progress") && !g.request_id && now() - g.created_at > 120) {
    await refund(env, g, "failed", "Generator nie zrobił zdjęcia. Kredyt wrócił na konto.");
    return g;
  }
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
    } else if (data && data.status === "cancelled") {
      await refund(env, g, "cancelled", "Anulowano. Kredyt wrócił na konto.");
    } else if (data && data.status && data.status !== g.status) {
      await env.DB.prepare("UPDATE generations SET status = ?, updated_at = ? WHERE id = ?").bind(data.status, now(), g.id).run();
      g.status = data.status;
    } else if (now() - g.created_at > 600) {
      await refund(env, g, "failed", "Generator nie zdążył. Kredyt wrócił na konto.");
    }
  }
  if (g.status === "completed") await storePhoto(env, g);
  return g;
}

async function generationStatus(env, user, id) {
  const g = await env.DB.prepare("SELECT * FROM generations WHERE id = ? AND user_id = ?").bind(id, user.id).first();
  if (!g) return json({ error: "Nie ma takiego zdjęcia." }, 404);
  await refresh(env, g);
  return json(genView(g, await balance(env, user.id)));
}

// Anulowanie: Higgsfield zatrzymuje tylko zlecenia w kolejce (wtedy kredyt wraca);
// gdy zdjęcie już się robi, nie da się go przerwać, więc dokończy się i trafi do Moich ujęć
async function generationCancel(env, user, id) {
  const g = await env.DB.prepare("SELECT * FROM generations WHERE id = ? AND user_id = ?").bind(id, user.id).first();
  if (!g) return json({ error: "Nie ma takiego zdjęcia." }, 404);
  if (g.status !== "queued" && g.status !== "in_progress") return json(genView(g, await balance(env, user.id)));
  let ok = false;
  if (g.request_id) {
    try {
      const res = await fetch((env.HF_API_URL || HF_API) + "/requests/" + encodeURIComponent(g.request_id) + "/cancel", { method: "POST", headers: hfHeaders(env), signal: AbortSignal.timeout(15000) });
      ok = res.ok;
      if (!ok) console.log("Higgsfield cancel: " + res.status + " " + (await res.text()).slice(0, 200));
    } catch (e) { console.log("Higgsfield cancel: " + e); }
  }
  await env.DB.prepare("UPDATE generations SET cancelled = 1 WHERE id = ?").bind(g.id).run();
  g.cancelled = 1;
  if (ok) await refund(env, g, "cancelled", "Anulowano. Kredyt wrócił na konto.");
  const view = genView(g, await balance(env, user.id));
  if (!ok) view.note = "Generator już robi to zdjęcie i nie da się go zatrzymać. Gdy będzie gotowe, znajdziesz je w Moich ujęciach.";
  return json(view);
}

async function generationSeen(env, user, id) {
  await env.DB.prepare("UPDATE generations SET seen = 1 WHERE id = ? AND user_id = ?").bind(id, user.id).run();
  return json({ ok: true });
}

// Moje ujęcia: udane zdjęcia (nowe pierwsze); najpierw dopytanie o zlecenia w toku
async function library(env, user) {
  const open = await env.DB.prepare("SELECT * FROM generations WHERE user_id = ? AND (status IN ('queued', 'in_progress') OR (status = 'completed' AND stored = 0)) AND created_at > ?")
    .bind(user.id, now() - 7 * 86400).all();
  for (const g of open.results) await refresh(env, g);
  const rows = await env.DB.prepare("SELECT * FROM generations WHERE user_id = ? AND status = 'completed' ORDER BY created_at DESC LIMIT 60").bind(user.id).all();
  return json({ photos: rows.results.map(g => ({ id: g.id, url: photoUrl(g), seen: !!g.seen, aspect: g.aspect, at: g.created_at })) });
}

async function photo(env, user, id) {
  const g = await env.DB.prepare("SELECT id, stored, image_url FROM generations WHERE id = ? AND user_id = ?").bind(id, user.id).first();
  if (!g) return json({ error: "Nie ma takiego zdjęcia." }, 404);
  const obj = g.stored && env.PHOTOS ? await env.PHOTOS.getWithMetadata("gen/" + id, { type: "arrayBuffer" }) : null;
  if (!obj || !obj.value) return g.image_url ? Response.redirect(g.image_url, 302) : json({ error: "Brak zdjęcia." }, 404);
  return new Response(obj.value, { headers: { "Content-Type": (obj.metadata && obj.metadata.type) || "image/jpeg", "Cache-Control": "private, max-age=31536000, immutable" } });
}

async function me(request, env) {
  const user = await currentUser(request, env);
  if (!user) return json({ user: null, login: !!env.GOOGLE_CLIENT_SECRET, v: 3 });
  const active = await env.DB.prepare("SELECT id FROM generations WHERE user_id = ? AND status IN ('queued', 'in_progress') AND cancelled = 0 AND created_at > ? ORDER BY created_at DESC LIMIT 1")
    .bind(user.id, now() - 600).first();
  const unseen = await env.DB.prepare("SELECT COUNT(*) AS n FROM generations WHERE user_id = ? AND status = 'completed' AND seen = 0").bind(user.id).first();
  return json({ user: { email: user.email, name: user.name }, credits: await balance(env, user.id), gen: !!env.HF_KEY, cost: genCost(env),
    active: active ? active.id : null, unseen: unseen.n, ...(isOwner(user) ? { models: TEST_MODELS, model: hfModel(env) } : {}) });
}

export default {
  async fetch(request, env, ctx) {
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
      if (route === "GET /api/admin/models")
        return await models(url, env, await currentUser(request, env), { hfHeaders, apiBase: e => e.HF_API_URL || HF_API, json });
      if (route === "GET /api/admin/bench")
        return await bench(request, url, env, await currentUser(request, env), { hfHeaders, apiBase: e => e.HF_API_URL || HF_API, json });
      if (url.pathname === "/api/generate" || url.pathname.startsWith("/api/generate/")) {
        if (request.method === "POST" && !sameOrigin(request, url)) return json({ error: "Niedozwolone źródło." }, 403);
        const user = await currentUser(request, env);
        if (!user) return json({ error: "Zaloguj się." }, 401);
        if (route === "POST /api/generate") return await generate(request, env, user, ctx);
        const m = url.pathname.match(/^\/api\/generate\/([\w-]{8,40})(\/cancel|\/seen)?$/);
        if (request.method === "GET" && m && !m[2]) return await generationStatus(env, user, m[1]);
        if (request.method === "POST" && m && m[2] === "/cancel") return await generationCancel(env, user, m[1]);
        if (request.method === "POST" && m && m[2] === "/seen") return await generationSeen(env, user, m[1]);
      }
      if (route === "GET /api/library" || url.pathname.startsWith("/api/photo/")) {
        const user = await currentUser(request, env);
        if (!user) return json({ error: "Zaloguj się." }, 401);
        if (route === "GET /api/library") return await library(env, user);
        const m = url.pathname.match(/^\/api\/photo\/([\w-]{8,40})$/);
        if (request.method === "GET" && m) return await photo(env, user, m[1]);
      }
      return json({ error: "Nie ma takiego adresu." }, 404);
    } catch (e) {
      console.log("Błąd: " + (e && e.stack || e));
      return json({ error: "Coś poszło nie tak. Spróbuj ponownie." }, 500);
    }
  }
};
