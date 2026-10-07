import { bench, models, schemas } from "./bench.js";
import { shopInfo, checkoutStart, paddleWebhook } from "./paddle.js";
// Manikun: serwer (Worker Cloudflare "manikun").
// Strona to statyczne pliki; tutaj trafiają tylko adresy /api/*.
// Logowanie przez Google (OAuth z PKCE), sesja w ciasteczku HttpOnly, kredyty w bazie D1 (binding DB).
// Wymaga: sekretu GOOGLE_CLIENT_SECRET (Settings › Variables and Secrets).
// Generowanie obrazów: Higgsfield API (api.higgsfield.ai), sekret HF_KEY w postaci KEY_ID:KEY_SECRET.

const START_CREDITS = 5;
// Zdjęcia od AI dla wszystkich tylko przy GEN_OPEN = "1" (wtedy też kredyty na start). Bez tego generuje wyłącznie właściciel (testy).
const genOpenAll = env => env.GEN_OPEN === "1";
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
    // Kredyty na start: raz na konto (unikalne reason + ref), tylko gdy zdjęcia są otwarte dla wszystkich
    ...(genOpenAll(env) ? [env.DB.prepare("INSERT OR IGNORE INTO credits (user_id, delta, reason, ref, created_at) VALUES (?1, ?2, 'start', ?3, ?4)")
      .bind(user.id, START_CREDITS, String(user.id), t)] : []),
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
// Premium: Recraft 4.1 Pro w 2K (ok. 15 s, 1664×2560 przy 2:3); bez zdjęcia twarzy.
// Wyłączone 4.10.2026: kosztuje ok. 0,41 $ za zdjęcie (130 razy więcej niż Soul 2), a Soul 2 w 1080p daje 1344×2016.
// Włącza je zmienna PREMIUM_COST (liczba kredytów) w Cloudflare.
const PREMIUM_MODEL = "recraft/v4.1/pro/text-to-image";
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
const genFor = (env, user) => genOpenAll(env) || isOwner(user);

// Zdjęcie twarzy (dla wszystkich; wybrany po testach Soul 2 image-to-image): którym modelem i pod jakim polem (z komunikatów walidacji API, 3.10.2026).
// Soul 2 przyjmuje resolution '720p' albo '1080p' (sonda schematu 4.10.2026) — bierzemy wyższą
const SOUL_RES = "1080p";

// Soul 2 i Qwen mają osobne warianty przyjmujące obraz; image_urls to lista, image_url pojedynczy adres.
function faceRoute(model) {
  if (model === "higgsfield-ai/soul/v2/standard") return { model: "higgsfield-ai/soul/v2/image-to-image", field: "image_url" };
  if (model === "alibaba/qwen-image-3/text-to-image") return { model: "alibaba/qwen-image-3/edit", field: "image_urls" };
  if (model === "ideogram/v4.0") return { model, field: "image_url" };
  if (model === "xai/grok-imagine-image-2.0" || model.startsWith("marketing-studio/image")) return { model, field: "image_urls" };
  return null;
}
// Adres zdjęcia twarzy: tylko taki, jaki oddaje wysyłanie plików Higgsfield
const faceUrlOk = u => typeof u === "string" && /^https:\/\/[\w-]+\.cloudfront\.net\/[\w\/.-]+\.(jpe?g|png|webp)$/i.test(u);

// Wysłanie zdjęcia twarzy do Higgsfield (plik tymczasowy, znacznik retention=temporary); u nas nie zostaje
async function uploadFace(request, env, user) {
  if (!genFor(env, user)) return json({ error: "Zdjęcia w Manikunie są chwilowo wyłączone." }, 403);
  // Wysłać zdjęcie może każdy zalogowany, kto ma kredyt na zdjęcie (bez tego wysyłanie nie ma po co się odbywać)
  if (await balance(env, user.id) < genCost(env)) return json({ error: "Brak kredytów." }, 402);
  const type = (request.headers.get("Content-Type") || "").split(";")[0];
  if (!/^image\/(jpeg|png|webp)$/.test(type)) return json({ error: "To nie jest zdjęcie (JPG, PNG albo WebP)." }, 415);
  const buf = await request.arrayBuffer();
  if (!buf.byteLength || buf.byteLength > 8 * 1024 * 1024) return json({ error: "Zdjęcie jest za duże (do 8 MB)." }, 413);
  const r = await fetch((env.HF_API_URL || HF_API) + "/files/generate-upload-url", { method: "POST", headers: hfHeaders(env), body: JSON.stringify({ content_type: type }), signal: AbortSignal.timeout(15000) });
  const d = r.ok ? await r.json() : null;
  if (!d || !d.upload_url || !d.public_url) { console.log("Upload URL: " + r.status); return json({ error: "Nie udało się wysłać zdjęcia." }, 502); }
  const up = await fetch(d.upload_url, { method: "PUT", headers: d.upload_headers || { "Content-Type": type }, body: buf, signal: AbortSignal.timeout(30000) });
  if (!up.ok) { console.log("Upload PUT: " + up.status + " " + (await up.text()).slice(0, 200)); return json({ error: "Nie udało się wysłać zdjęcia." }, 502); }
  return json({ url: d.public_url });
}
// ---------- Darmowe zdjęcia: FLUX.1 schnell z Cloudflare Workers AI ----------
// Kwadrat 1024×1024, tylko tekst (bez zdjęcia twarzy/produktu), kilka sekund. Model przyjmuje wyłącznie prompt i steps
// (seed odrzuca błędem 5006 „Additional properties '/seed' not allowed”, sprawdzone na produkcji 5.10.2026). Koszt: 4 kafle × 4,8 + kroki × 9,6 neuronu
// (ok. 0,001 $), więc darmowa dzienna pula Workers AI (10 000 neuronów) starcza na ok. 100 zdjęć. Wywołanie wprost
// w zapytaniu (nie w tle): na darmowym planie praca w tle przy FLUX.2 klein zawisała.
const FREE_MODEL = "@cf/black-forest-labs/flux-1-schnell";
const FREE_STEPS = 6;
const freeDaily = env => Number(env.FREE_DAILY) >= 0 && env.FREE_DAILY !== undefined ? Number(env.FREE_DAILY) : 2;
const freeGlobal = env => Number(env.FREE_GLOBAL) || 90;
const dayStart = () => { const d = new Date(); d.setUTCHours(0, 0, 0, 0); return Math.floor(d.getTime() / 1000); };
const freeOn = env => !!env.AI && freeDaily(env) > 0;
async function freeLeft(env, user) {
  const r = await env.DB.prepare("SELECT COUNT(*) AS n FROM generations WHERE user_id = ? AND model = ? AND created_at >= ? AND status <> 'failed'")
    .bind(user.id, FREE_MODEL, dayStart()).first();
  return Math.max(0, freeDaily(env) - r.n);
}
// Opis dla modelu: najwyżej 2048 znaków; ucinamy na granicy zdania albo przecinka
function freePrompt(prompt) {
  let p = prompt.replace(/\s+/g, " ").trim();
  if (p.length <= 2000) return p;
  p = p.slice(0, 2000);
  const cut = Math.max(p.lastIndexOf(". "), p.lastIndexOf(", "));
  return cut > 1200 ? p.slice(0, cut) : p;
}
async function generateFree(env, user, body) {
  if (!freeOn(env)) return json({ error: "Darmowe zdjęcia są chwilowo wyłączone." }, 503);
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) return json({ error: "Brak Maniscryptu." }, 400);
  if (prompt.length > MAX_PROMPT) return json({ error: "Maniscrypt jest za długi." }, 413);
  if (body.face) return json({ error: "Darmowe zdjęcie nie przyjmuje zdjęcia twarzy ani produktu." }, 400);
  const busy = await env.DB.prepare("SELECT id FROM generations WHERE user_id = ? AND model = ? AND status = 'in_progress' AND created_at > ?")
    .bind(user.id, FREE_MODEL, now() - 120).first();
  if (busy) return json({ error: "Poprzednie zdjęcie jeszcze się robi. Naraz robimy jedno." }, 409);
  if (await freeLeft(env, user) <= 0) return json({ error: "Dzisiejsze darmowe zdjęcia już wykorzystane. Wróć jutro!", freeLeft: 0 }, 429);
  const all = await env.DB.prepare("SELECT COUNT(*) AS n FROM generations WHERE model = ? AND created_at >= ? AND status <> 'failed'").bind(FREE_MODEL, dayStart()).first();
  if (all.n >= freeGlobal(env)) return json({ error: "Dzisiejsza pula darmowych zdjęć dla wszystkich się skończyła. Wróć jutro!", freeLeft: 0 }, 429);
  const id = randomToken(12), t = now();
  let sceneJson = null;
  if (typeof body.scene === "string" && body.scene.length <= 30000) { try { JSON.parse(body.scene); sceneJson = body.scene; } catch (e) {} }
  await env.DB.prepare(
    "INSERT INTO generations (id, user_id, model, aspect, cost, prompt, status, created_at, updated_at, scene) VALUES (?, ?, ?, '1:1', 0, ?, 'in_progress', ?, ?, ?)"
  ).bind(id, user.id, FREE_MODEL, prompt, t, t, sceneJson).run();
  const g = { id, user_id: user.id, cost: 0, status: "in_progress" };
  let bytes = null, why = "";
  const t0 = Date.now();
  try {
    const out = await env.AI.run(FREE_MODEL, { prompt: freePrompt(prompt), steps: FREE_STEPS });
    if (out && typeof out.image === "string") bytes = await fromBase64(out.image);
    else why = "brak obrazu: " + JSON.stringify(out).slice(0, 200);
  } catch (e) { why = String(e && e.message || e).slice(0, 400); }
  const ms = Date.now() - t0;
  if (!bytes || !env.PHOTOS) {
    const nsfw = /nsfw|safety|flagged/i.test(why);
    await env.DB.prepare("UPDATE generations SET status = 'failed', error = ?, detail = ?, updated_at = ? WHERE id = ?")
      .bind(nsfw ? "Generator odrzucił ten opis. Zmień scenę i spróbuj jeszcze raz." : "Generator nie zrobił zdjęcia. Spróbuj jeszcze raz.", "free " + ms + " ms: " + (why || "brak magazynu"), now(), id).run();
    console.log("Darmowe zdjęcie: " + why);
    return json({ id, status: "failed", error: nsfw ? "Generator odrzucił ten opis. Zmień scenę i spróbuj jeszcze raz." : "Generator nie zrobił zdjęcia. Spróbuj jeszcze raz.", freeLeft: await freeLeft(env, user) });
  }
  await env.PHOTOS.put("gen/" + id, bytes, { metadata: { type: "image/jpeg" } });
  await env.DB.prepare("UPDATE generations SET status = 'completed', stored = 1, detail = ?, updated_at = ? WHERE id = ?").bind("free " + ms + " ms", now(), id).run();
  Object.assign(g, { status: "completed", stored: 1 });
  await prunePhotos(env, user.id);
  return json({ ...genView(g), freeLeft: await freeLeft(env, user) });
}

const GEN_COST = 1;
const MAX_PROMPT = 6000;
// Formaty z aplikacji → proporcje, które przyjmuje model (Recraft ma 4:5, nie ma 21:9; Soul nie ma 4:5)
const ASPECTS = { "4:5": "4:5", "2:3": "2:3", "1:1": "1:1", "3:2": "3:2", "9:16": "9:16", "16:9": "16:9", "21:9": "16:9", "3:4": "3:4", "4:3": "4:3" };
const ASPECTS_SOUL = { "4:5": "3:4", "21:9": "21:9" };
const aspectFor = (model, a) => model.startsWith("@cf/") && /^\d{1,2}:\d{1,2}$/.test(a) ? a : (/soul/.test(model) && ASPECTS_SOUL[a]) || ASPECTS[a] || "1:1";

const hfModel = env => env.HF_MODEL || HF_MODEL;
const genCost = env => Number(env.GEN_COST) || GEN_COST;
const premiumCost = env => Number(env.PREMIUM_COST) || 0;
// Najwyższa jakość, jaką model przyjmuje (sondy schematu: Soul 2 720p/1080p, Recraft Pro 1k/2k)
const qualityFor = m => m.startsWith("higgsfield-ai/soul/v2/") ? { resolution: SOUL_RES } : m === PREMIUM_MODEL ? { resolution: "2k" } : null;
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
  return Math.round(row && row.a) || (model === PREMIUM_MODEL ? 15 : /recraft/.test(model) ? 11 : 20);
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
  let body;
  try { body = await request.json(); } catch { return json({ error: "Zły format zapytania." }, 400); }
  if (body.free === true) return generateFree(env, user, body);
  if (!env.HF_KEY) return json({ error: "Generator nie jest jeszcze podłączony." }, 503);
  if (!genFor(env, user)) return json({ error: "Zdjęcia w Manikunie są chwilowo wyłączone." }, 403);
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) return json({ error: "Brak Maniscryptu." }, 400);
  if (prompt.length > MAX_PROMPT) return json({ error: "Maniscrypt jest za długi." }, 413);
  // Soul 2, a na życzenie Premium (Recraft 4.1 Pro); porównania modeli zakończone 4.10.2026
  const premium = body.premium === true;
  if (premium && !premiumCost(env)) return json({ error: "Premium jest wyłączone." }, 400);
  if (premium && body.face) return json({ error: "Premium nie łączy się ze zdjęciem twarzy." }, 400);
  const chosen = premium ? PREMIUM_MODEL : hfModel(env);
  const asked = String(body.aspect || ""), aspect = aspectFor(chosen, asked);
  // Zdjęcie twarzy (na razie tylko właściciel): model z wariantem przyjmującym obraz
  const face = body.face ? (faceUrlOk(body.face) ? body.face : "zły") : null;
  if (face === "zły") return json({ error: "Zły adres zdjęcia twarzy." }, 400);
  const fr = face && faceRoute(chosen);
  if (face && !fr) return json({ error: "Ten model nie przyjmuje zdjęcia twarzy. Wybierz Soul 2." }, 400);

  // Jedno zlecenie naraz na konto
  const busy = await env.DB.prepare("SELECT id FROM generations WHERE user_id = ? AND status IN ('queued', 'in_progress') AND created_at > ?")
    .bind(user.id, now() - 600).first();
  if (busy) {
    // Może już skończone, tylko nikt nie zapytał: dopytujemy, zanim odmówimy
    const b = await refresh(env, await env.DB.prepare("SELECT * FROM generations WHERE id = ?").bind(busy.id).first());
    if (b.status === "queued" || b.status === "in_progress") return json({ error: "Poprzednie zdjęcie jeszcze się robi. Naraz robimy jedno.", id: busy.id }, 409);
  }

  // Kredyty schodzą tylko, jeśli saldo wystarcza (jedno zapytanie, więc dwa kliknięcia naraz nie zejdą poniżej zera)
  const id = randomToken(12), cost = premium ? premiumCost(env) : genCost(env), t = now();
  const charged = await env.DB.prepare(
    "INSERT INTO credits (user_id, delta, reason, ref, created_at) SELECT ?1, -?2, 'gen', ?3, ?4 " +
    "WHERE (SELECT COALESCE(SUM(delta), 0) FROM credits WHERE user_id = ?1) >= ?2"
  ).bind(user.id, cost, id, t).run();
  if (!charged.meta.changes) return json({ error: "Brak kredytów.", credits: await balance(env, user.id) }, 402);

  const g = { id, user_id: user.id, cost, status: "queued" };
  // Scena z aplikacji (do „Zrób podobne”); tylko poprawny JSON, do 30 tys. znaków
  let sceneJson = null;
  if (typeof body.scene === "string" && body.scene.length <= 30000) { try { JSON.parse(body.scene); sceneJson = body.scene; } catch (e) {} }
  await env.DB.prepare(
    "INSERT INTO generations (id, user_id, model, aspect, cost, prompt, status, created_at, updated_at, scene) VALUES (?, ?, ?, ?, ?, ?, 'queued', ?, ?, ?)"
  ).bind(id, user.id, chosen, aspect, cost, prompt, t, t, sceneJson).run();

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
  let res, data = null, raw = "", model = fr ? fr.model : chosen;
  const log = [];
  const models = fr ? [model] : [model, ...HF_FALLBACK.filter(m => m !== model)];
  const withFace = b => fr ? { ...b, [fr.field]: fr.field === "image_urls" ? [face] : face } : b;
  attempts: for (const m of models) {
    const q = qualityFor(m), sized = q ? [withFace({ prompt, aspect_ratio: aspectFor(m, asked), ...q })] : [];
    for (const body of [...sized, withFace({ prompt, aspect_ratio: aspectFor(m, asked) }), withFace({ prompt })]) {
      model = m; data = null;
      try {
        res = await fetch((env.HF_API_URL || HF_API) + "/" + m, {
          method: "POST", headers: hfHeaders(env), body: JSON.stringify(body), signal: AbortSignal.timeout(30000)
        });
        raw = await res.text();
        try { data = JSON.parse(raw); } catch { data = null; }
      } catch (e) { res = null; raw = "fetch: " + e; }
      log.push(m + " " + (res ? res.status : "-") + " " + raw.slice(0, 300));
      // Walidacja odrzuciła parametr (np. proporcje): jeszcze raz bez niego
      if (res && (res.status === 422 || (res.status === 400 && /aspect_ratio|resolution/.test(raw)))) continue;
      if (res && res.status === 404 && /model_not_found/.test(raw)) continue attempts;
      break attempts;
    }
  }
  if (model !== chosen || face) await env.DB.prepare("UPDATE generations SET model = ?, detail = ? WHERE id = ?").bind(model, face ? (body.ref === "product" ? "ze zdjęciem produktu" : "ze zdjęciem twarzy") : null, g.id).run();
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

// Wymiary obrazu z nagłówka (JPEG, PNG, WebP), do diagnozy jakości
function imageSize(b) {
  if (b[0] === 0x89 && b[1] === 0x50) return [(b[16] << 24 | b[17] << 16 | b[18] << 8 | b[19]) >>> 0, (b[20] << 24 | b[21] << 16 | b[22] << 8 | b[23]) >>> 0];
  if (b[0] === 0x52 && b[8] === 0x57) {
    const t = String.fromCharCode(b[12], b[13], b[14], b[15]);
    if (t === "VP8X") return [1 + (b[24] | b[25] << 8 | b[26] << 16), 1 + (b[27] | b[28] << 8 | b[29] << 16)];
    if (t === "VP8 ") return [(b[26] | b[27] << 8) & 0x3fff, (b[28] | b[29] << 8) & 0x3fff];
    if (t === "VP8L") { const n = b[21] | b[22] << 8 | b[23] << 16 | b[24] << 24; return [1 + (n & 0x3fff), 1 + (n >> 14 & 0x3fff)]; }
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    for (let i = 2; i < b.length - 9;) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1], len = b[i + 2] << 8 | b[i + 3];
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return [b[i + 7] << 8 | b[i + 8], b[i + 5] << 8 | b[i + 6]];
      i += 2 + len;
    }
  }
  return null;
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
      const dim = imageSize(new Uint8Array(buf));
      await env.DB.prepare("UPDATE generations SET stored = 1, detail = COALESCE(detail || ' | ', '') || ? WHERE id = ?")
        .bind((dim ? dim.join("x") + " px, " : "") + Math.round(buf.byteLength / 1024) + " KB", g.id).run();
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
  if (g.status === "completed") {
    const fresh = !g.stored;
    await storePhoto(env, g);
    if (fresh) await prunePhotos(env, g.user_id);
  }
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

// Usunięcie zdjęcia z Moich ujęć: kopia w KV znika, wpis zostaje jako „usunięte” (kredytów nie zwracamy)
async function generationDelete(env, user, id) {
  const g = await env.DB.prepare("SELECT id, status FROM generations WHERE id = ? AND user_id = ?").bind(id, user.id).first();
  if (!g) return json({ error: "Nie ma takiego zdjęcia." }, 404);
  if (g.status === "queued" || g.status === "in_progress") return json({ error: "To zdjęcie jeszcze się robi." }, 409);
  if (env.PHOTOS) await env.PHOTOS.delete("gen/" + id);
  await env.DB.prepare("UPDATE generations SET status = 'deleted', stored = 0, image_url = NULL, updated_at = ? WHERE id = ?").bind(now(), id).run();
  return json({ ok: true });
}

async function generationSeen(env, user, id) {
  await env.DB.prepare("UPDATE generations SET seen = 1 WHERE id = ? AND user_id = ?").bind(id, user.id).run();
  return json({ ok: true });
}

// Moje ujęcia: udane zdjęcia (nowe pierwsze); najpierw dopytanie o zlecenia w toku
// Ekipa: Manimale i Manito zapisane na koncie (najwyżej 40 na konto)
const CREW_MAX = 40;
async function crewList(env, user) {
  const rows = (await env.DB.prepare("SELECT id, kind, name, data, created_at FROM crew WHERE user_id = ? ORDER BY created_at").bind(user.id).all()).results;
  return json({ crew: rows.map(r => { let data = {}; try { data = JSON.parse(r.data); } catch (e) {} return { id: r.id, kind: r.kind, name: r.name, data, at: r.created_at }; }) });
}
async function crewAdd(request, env, user) {
  let body;
  try { body = await request.json(); } catch { return json({ error: "Zły format zapytania." }, 400); }
  const kind = body.kind, name = typeof body.name === "string" ? body.name.trim().slice(0, 60) : "";
  if (!["animal", "object"].includes(kind) || !name || !body.data || typeof body.data !== "object") return json({ error: "Niepełne dane." }, 400);
  const data = JSON.stringify(body.data);
  if (data.length > 1000) return json({ error: "Za dużo danych." }, 413);
  const n = await env.DB.prepare("SELECT COUNT(*) AS n FROM crew WHERE user_id = ?").bind(user.id).first();
  if (n.n >= CREW_MAX) return json({ error: "Ekipa jest pełna (" + CREW_MAX + "). Usuń kogoś, żeby dodać nowego." }, 409);
  const id = randomToken(9), t = now();
  await env.DB.prepare("INSERT INTO crew (id, user_id, kind, name, data, created_at) VALUES (?, ?, ?, ?, ?, ?)").bind(id, user.id, kind, name, data, t).run();
  return json({ id, kind, name, data: body.data, at: t });
}
async function crewDelete(env, user, id) {
  await env.DB.prepare("DELETE FROM crew WHERE id = ? AND user_id = ?").bind(id, user.id).run();
  return json({ ok: true });
}

// ---------- Moje sceny: całe sceny na koncie (najwyżej 60), nowe pierwsze ----------
const SCENES_MAX = 60;
async function scenesList(env, user) {
  const rows = (await env.DB.prepare("SELECT id, title, subject, scene, created_at FROM scenes WHERE user_id = ? ORDER BY created_at DESC").bind(user.id).all()).results;
  return json({ scenes: rows.map(r => ({ id: r.id, title: r.title || "", subject: r.subject, scene: r.scene, at: r.created_at })) });
}
async function scenesAdd(request, env, user) {
  let body;
  try { body = await request.json(); } catch { return json({ error: "Zły format zapytania." }, 400); }
  const scene = typeof body.scene === "string" ? body.scene : "";
  if (!scene || scene.length > 30000) return json({ error: "Zła scena." }, 400);
  let parsed;
  try { parsed = JSON.parse(scene); } catch { return json({ error: "Zła scena." }, 400); }
  const subject = ["person", "object", "animal", "place"].includes(parsed && parsed.subject) ? parsed.subject : "person";
  const title = typeof body.title === "string" ? body.title.replace(/[<>"]/g, "").trim().slice(0, 100) : "";
  const n = await env.DB.prepare("SELECT COUNT(*) AS n FROM scenes WHERE user_id = ?").bind(user.id).first();
  if (n.n >= SCENES_MAX) return json({ error: "Masz już " + SCENES_MAX + " scen. Usuń którąś w Moich scenach, żeby zapisać nową." }, 409);
  const id = randomToken(9), t = now();
  await env.DB.prepare("INSERT INTO scenes (id, user_id, title, subject, scene, created_at) VALUES (?, ?, ?, ?, ?, ?)").bind(id, user.id, title || null, subject, scene, t).run();
  return json({ id, title, subject, scene, at: t });
}
async function scenesDelete(env, user, id) {
  await env.DB.prepare("DELETE FROM scenes WHERE id = ? AND user_id = ?").bind(id, user.id).run();
  return json({ ok: true });
}

// ---------- Udostępnione sceny: krótki link /s/<id> ----------
// Każdy może udostępnić scenę (bez konta); limit 40 linków dziennie z jednego adresu IP (skrót adresu, nie sam adres)
const SHARE_DAILY = 40;
async function shareCreate(request, env, user) {
  let body;
  try { body = await request.json(); } catch { return json({ error: "Zły format zapytania." }, 400); }
  const scene = typeof body.scene === "string" ? body.scene : "";
  if (!scene || scene.length > 30000) return json({ error: "Zła scena." }, 400);
  try { JSON.parse(scene); } catch { return json({ error: "Zła scena." }, 400); }
  const title = typeof body.title === "string" ? body.title.replace(/[<>"]/g, "").trim().slice(0, 100) : "";
  const ip = await sha256((request.headers.get("CF-Connecting-IP") || "local") + ":manikun");
  const n = await env.DB.prepare("SELECT COUNT(*) AS n FROM shares WHERE ip_hash = ? AND created_at > ?").bind(ip, now() - 86400).first();
  if (n.n >= SHARE_DAILY) return json({ error: "Dziś udostępniono już dużo scen z tego połączenia. Spróbuj jutro." }, 429);
  const id = randomToken(6);
  await env.DB.prepare("INSERT INTO shares (id, scene, title, user_id, ip_hash, created_at) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(id, scene, title || null, user ? user.id : null, ip, now()).run();
  return json({ id, url: "https://" + (env.CANONICAL_HOST || "manikun.pl") + "/s/" + id });
}
async function shareGet(env, id) {
  const r = await env.DB.prepare("SELECT scene, title FROM shares WHERE id = ?").bind(id).first();
  if (!r) return json({ error: "Nie ma takiej sceny." }, 404);
  return json({ scene: r.scene, title: r.title || null });
}
// Strona aplikacji z tytułem sceny w podglądzie linku (Messenger, WhatsApp, Facebook)
async function sharePage(request, env, url, id) {
  const r = await env.DB.prepare("SELECT title FROM shares WHERE id = ?").bind(id).first();
  const page = await env.ASSETS.fetch(new Request(new URL("/", url), request));
  // Pliki aplikacji są podawane względnie; pod /s/<id> mają się brać z katalogu głównego (także gdy sceny nie ma)
  const base = new HTMLRewriter().on("meta[charset]", { element(e) { e.after('<base href="/">', { html: true }); } });
  if (!r) return base.transform(page);
  const title = "Scena na Manikunie" + (r.title ? ": " + r.title : "");
  const desc = "Ktoś ułożył tę scenę na wirtualnym manekinie. Otwórz, popraw po swojemu i skopiuj Maniscrypt do generatora AI.";
  const set = v => ({ element(e) { e.setAttribute("content", v); } });
  return base
    .on('meta[property="og:title"]', set(title))
    .on('meta[property="og:description"]', set(desc))
    .on('meta[name="description"]', set(desc))
    .on('meta[property="og:url"]', set("https://" + (env.CANONICAL_HOST || url.host) + "/s/" + id))
    .on("title", { element(e) { e.setInnerContent(title); } })
    .transform(page);
}

// ---------- Galeria przykładów: zdjęcia wybrane przez właściciela, publiczne, z „Zrób podobne” ----------
// Kopia pliku pod pub/<id> (niezależna od Moich ujęć, które trzymają 5 ostatnich)
async function galleryList(env, user) {
  const rows = (await env.DB.prepare("SELECT id, title, scene, aspect, created_at FROM gallery ORDER BY created_at DESC LIMIT 60").all()).results;
  return json({ owner: isOwner(user), photos: rows.map(g => ({ id: g.id, url: "/api/pub/" + g.id, title: g.title, aspect: g.aspect, scene: g.scene, at: g.created_at })) },
    200);
}
async function galleryPhoto(env, id) {
  const obj = env.PHOTOS && await env.PHOTOS.getWithMetadata("pub/" + id, { type: "arrayBuffer" });
  if (!obj || !obj.value) return json({ error: "Nie ma takiego zdjęcia." }, 404);
  return new Response(obj.value, { headers: { "Content-Type": (obj.metadata && obj.metadata.type) || "image/jpeg", "Cache-Control": "public, max-age=86400" } });
}
async function galleryAdd(request, env, user) {
  let body;
  try { body = await request.json(); } catch { return json({ error: "Zły format zapytania." }, 400); }
  const id = typeof body.id === "string" ? body.id : "";
  const g = await env.DB.prepare("SELECT id, scene, aspect, stored FROM generations WHERE id = ? AND user_id = ? AND status = 'completed'").bind(id, user.id).first();
  if (!g || !g.stored) return json({ error: "Nie ma takiego zdjęcia." }, 404);
  const obj = await env.PHOTOS.getWithMetadata("gen/" + id, { type: "arrayBuffer" });
  if (!obj || !obj.value) return json({ error: "Plik zdjęcia zniknął." }, 404);
  await env.PHOTOS.put("pub/" + id, obj.value, { metadata: obj.metadata || { type: "image/jpeg" } });
  const title = typeof body.title === "string" ? body.title.replace(/[<>"]/g, "").trim().slice(0, 100) : null;
  await env.DB.prepare("INSERT OR REPLACE INTO gallery (id, title, scene, aspect, created_at) VALUES (?, ?, ?, ?, ?)").bind(id, title, g.scene, g.aspect, now()).run();
  return json({ ok: true });
}
async function galleryDelete(env, id) {
  await env.DB.prepare("DELETE FROM gallery WHERE id = ?").bind(id).run();
  if (env.PHOTOS) await env.PHOTOS.delete("pub/" + id);
  return json({ ok: true });
}

// Moje ujęcia: zostaje 5 najnowszych zdjęć, starsze kasujemy (plik z KV i adres), status 'expired'
const KEEP_PHOTOS = 5;
async function prunePhotos(env, userId) {
  const old = (await env.DB.prepare("SELECT id FROM generations WHERE user_id = ? AND status = 'completed' ORDER BY created_at DESC LIMIT -1 OFFSET ?")
    .bind(userId, KEEP_PHOTOS).all()).results;
  if (!old.length) return 0;
  if (env.PHOTOS) await Promise.all(old.map(g => env.PHOTOS.delete("gen/" + g.id)));
  await env.DB.prepare("UPDATE generations SET status = 'expired', stored = 0, image_url = NULL, updated_at = ? WHERE id IN (" + old.map(() => "?").join(",") + ")")
    .bind(now(), ...old.map(g => g.id)).run();
  return old.length;
}

async function library(env, user) {
  const open = await env.DB.prepare("SELECT * FROM generations WHERE user_id = ? AND (status IN ('queued', 'in_progress') OR (status = 'completed' AND stored = 0)) AND created_at > ?")
    .bind(user.id, now() - 7 * 86400).all();
  for (const g of open.results) await refresh(env, g);
  await prunePhotos(env, user.id);
  const rows = await env.DB.prepare("SELECT * FROM generations WHERE user_id = ? AND status = 'completed' ORDER BY created_at DESC LIMIT ?").bind(user.id, KEEP_PHOTOS).all();
  return json({ keep: KEEP_PHOTOS, photos: rows.results.map(g => ({ id: g.id, url: photoUrl(g), seen: !!g.seen, aspect: g.aspect, at: g.created_at, scene: g.scene || null })) });
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
  if (!user) return json({ user: null, login: !!env.GOOGLE_CLIENT_SECRET, gen: !!env.HF_KEY && genOpenAll(env), free: freeOn(env) ? { daily: freeDaily(env) } : null, v: 3 });
  const active = await env.DB.prepare("SELECT id FROM generations WHERE user_id = ? AND status IN ('queued', 'in_progress') AND cancelled = 0 AND created_at > ? ORDER BY created_at DESC LIMIT 1")
    .bind(user.id, now() - 600).first();
  const unseen = await env.DB.prepare("SELECT COUNT(*) AS n FROM generations WHERE user_id = ? AND status = 'completed' AND seen = 0").bind(user.id).first();
  return json({ user: { email: user.email, name: user.name }, credits: await balance(env, user.id), gen: !!env.HF_KEY && genFor(env, user), cost: genCost(env), premiumCost: premiumCost(env), shop: shopInfo(env),
    free: freeOn(env) ? { daily: freeDaily(env), left: await freeLeft(env, user) } : null, owner: isOwner(user),
    active: active ? active.id : null, unseen: unseen.n });
}

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Adres główny (zmienna CANONICAL_HOST, np. manikun.pl): strony otwarte pod innym adresem (workers.dev, www) przenosimy tam na stałe.
    // API działa pod każdym adresem (zdjęcia w toku), poza startem logowania – ciasteczko sesji ma powstać pod adresem głównym.
    const main = env.CANONICAL_HOST;
    if (main && url.hostname !== main && !LOCAL_HOSTS.has(url.hostname) && request.method === "GET"
      && (!url.pathname.startsWith("/api/") || url.pathname === "/api/auth/google"))
      return Response.redirect("https://" + main + url.pathname + url.search, 301);
    // Udostępniona scena: strona aplikacji z własnym tytułem i opisem w podglądzie linku (aplikacja sama wczyta scenę)
    const sm = url.pathname.match(/^\/s\/([\w-]{6,16})$/);
    if (sm && request.method === "GET") return await sharePage(request, env, url, sm[1]);
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
      if (route === "GET /api/admin/schemas")
        return await schemas(url, env, await currentUser(request, env), { hfHeaders, apiBase: e => e.HF_API_URL || HF_API, json });
      if (route === "GET /api/admin/models")
        return await models(url, env, await currentUser(request, env), { hfHeaders, apiBase: e => e.HF_API_URL || HF_API, json });
      if (route === "GET /api/admin/bench")
        return await bench(request, url, env, await currentUser(request, env), { hfHeaders, apiBase: e => e.HF_API_URL || HF_API, json, imageSize });
      if (url.pathname === "/api/generate" || url.pathname.startsWith("/api/generate/")) {
        if ((request.method === "POST" || request.method === "DELETE") && !sameOrigin(request, url)) return json({ error: "Niedozwolone źródło." }, 403);
        const user = await currentUser(request, env);
        if (!user) return json({ error: "Zaloguj się." }, 401);
        if (route === "POST /api/generate") return await generate(request, env, user, ctx);
        const m = url.pathname.match(/^\/api\/generate\/([\w-]{8,40})(\/cancel|\/seen)?$/);
        if (request.method === "GET" && m && !m[2]) return await generationStatus(env, user, m[1]);
        if (request.method === "POST" && m && m[2] === "/cancel") return await generationCancel(env, user, m[1]);
        if (request.method === "POST" && m && m[2] === "/seen") return await generationSeen(env, user, m[1]);
        if (request.method === "DELETE" && m && !m[2]) return await generationDelete(env, user, m[1]);
      }
      // Udostępnianie scen i galeria przykładów
      if (route === "POST /api/share") {
        if (!sameOrigin(request, url)) return json({ error: "Niedozwolone źródło." }, 403);
        return await shareCreate(request, env, await currentUser(request, env));
      }
      const shm = url.pathname.match(/^\/api\/share\/([\w-]{6,16})$/);
      if (request.method === "GET" && shm) return await shareGet(env, shm[1]);
      if (route === "GET /api/gallery") return await galleryList(env, await currentUser(request, env));
      const pm = url.pathname.match(/^\/api\/pub\/([\w-]{8,40})$/);
      if (request.method === "GET" && pm) return await galleryPhoto(env, pm[1]);
      if (route === "POST /api/gallery" || (request.method === "DELETE" && url.pathname.startsWith("/api/gallery/"))) {
        if (!sameOrigin(request, url)) return json({ error: "Niedozwolone źródło." }, 403);
        const user = await currentUser(request, env);
        if (!isOwner(user)) return json({ error: "Tylko dla właściciela." }, 403);
        if (route === "POST /api/gallery") return await galleryAdd(request, env, user);
        const gm = url.pathname.match(/^\/api\/gallery\/([\w-]{8,40})$/);
        if (gm) return await galleryDelete(env, gm[1]);
      }
      // Zakup kredytów (Paddle): zgoda przed kasą i powiadomienia o płatnościach (podpisane, bez sprawdzania źródła)
      if (route === "POST /api/paddle/webhook") return await paddleWebhook(request, env, { json });
      if (route === "POST /api/checkout") {
        if (!sameOrigin(request, url)) return json({ error: "Niedozwolone źródło." }, 403);
        const user = await currentUser(request, env);
        if (!user) return json({ error: "Zaloguj się." }, 401);
        return await checkoutStart(request, env, user, { json, randomToken });
      }
      if (url.pathname === "/api/crew" || url.pathname.startsWith("/api/crew/")) {
        if (request.method !== "GET" && !sameOrigin(request, url)) return json({ error: "Niedozwolone źródło." }, 403);
        const user = await currentUser(request, env);
        if (!user) return json({ error: "Zaloguj się." }, 401);
        if (route === "GET /api/crew") return await crewList(env, user);
        if (route === "POST /api/crew") return await crewAdd(request, env, user);
        const m = url.pathname.match(/^\/api\/crew\/([\w-]{6,20})$/);
        if (request.method === "DELETE" && m) return await crewDelete(env, user, m[1]);
      }
      if (url.pathname === "/api/scenes" || url.pathname.startsWith("/api/scenes/")) {
        if (request.method !== "GET" && !sameOrigin(request, url)) return json({ error: "Niedozwolone źródło." }, 403);
        const user = await currentUser(request, env);
        if (!user) return json({ error: "Zaloguj się." }, 401);
        if (route === "GET /api/scenes") return await scenesList(env, user);
        if (route === "POST /api/scenes") return await scenesAdd(request, env, user);
        const m = url.pathname.match(/^\/api\/scenes\/([\w-]{6,20})$/);
        if (request.method === "DELETE" && m) return await scenesDelete(env, user, m[1]);
      }
      if (route === "POST /api/upload-face") {
        if (!sameOrigin(request, url)) return json({ error: "Niedozwolone źródło." }, 403);
        const user = await currentUser(request, env);
        if (!user) return json({ error: "Zaloguj się." }, 401);
        return await uploadFace(request, env, user);
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
