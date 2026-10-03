// Manikun: podgląd kadru. Worker Cloudflare (manikun-podglad.fakindomin.workers.dev).
// Przyjmuje Maniscrypt (POST, JSON { prompt }) i zwraca obraz. Najpierw Workers AI (FLUX schnell, darmowa dzienna pula),
// a gdy ta odmówi (limit albo błąd), zapasowo Pollinations (FLUX) z kluczem z sekretu POLLINATIONS_KEY.
// Wymaga: powiązania Workers AI o nazwie AI (Settings › Bindings) i sekretu POLLINATIONS_KEY (Settings › Variables and Secrets).
// Wdrożenie: wklejenie kodu w panelu Cloudflare.
const ALLOWED = ["https://manikun.vercel.app", "https://manikun.fakindomin.workers.dev"];
const MODEL = "@cf/black-forest-labs/flux-1-schnell";
const MAX_PROMPT = 2048;
const POLLINATIONS = "https://gen.pollinations.ai/image/";

function cors(origin) {
  const ok = ALLOWED.includes(origin) || /^http:\/\/localhost(:\d+)?$/.test(origin);
  return ok ? { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Expose-Headers": "X-Manikun-Source",
    "Access-Control-Max-Age": "86400", "Vary": "Origin" } : null;
}
const fail = (msg, status, headers = {}) =>
  new Response(JSON.stringify({ error: msg }), { status, headers: { "Content-Type": "application/json", ...headers } });
const image = (body, type, source, h) =>
  new Response(body, { headers: { ...h, "Content-Type": type, "Cache-Control": "no-store", "X-Manikun-Source": source } });

// Workers AI: obraz w base64
async function fromCloudflare(env, prompt) {
  const out = await env.AI.run(MODEL, { prompt, steps: 4 });
  return Uint8Array.from(atob(out.image), c => c.charCodeAt(0));
}

// Pollinations: prompt w adresie (wysyła go serwer, nie przeglądarka użytkownika), klucz w nagłówku
async function fromPollinations(env, prompt) {
  const url = POLLINATIONS + encodeURIComponent(prompt) + "?model=flux&width=1024&height=1024&seed=-1";
  const res = await fetch(url, { headers: { Authorization: "Bearer " + env.POLLINATIONS_KEY }, signal: AbortSignal.timeout(50000) });
  if (!res.ok) throw Object.assign(new Error("Pollinations " + res.status), { status: res.status });
  return { body: await res.arrayBuffer(), type: res.headers.get("Content-Type") || "image/jpeg" };
}

export default {
  async fetch(request, env) {
    const h = cors(request.headers.get("Origin") || "");
    if (request.method === "GET") return new Response("Manikun podgląd działa." + (env.POLLINATIONS_KEY ? " Zapas: Pollinations." : ""), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
    if (!h) return fail("Niedozwolone źródło.", 403);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    if (request.method !== "POST") return fail("Tylko POST.", 405, h);
    let body;
    try { body = await request.json(); } catch { return fail("Zły format zapytania.", 400, h); }
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt) return fail("Brak opisu.", 400, h);
    if (prompt.length > MAX_PROMPT) return fail("Opis jest za długi na darmowy podgląd.", 413, h);

    let cfLimit = false;
    try {
      return image(await fromCloudflare(env, prompt), "image/jpeg", "cloudflare", h);
    } catch (e) {
      cfLimit = /limit|quota|neuron|429/i.test(String(e && e.message));
      console.log("Workers AI: " + (e && e.message));
    }
    if (env.POLLINATIONS_KEY) {
      try {
        const p = await fromPollinations(env, prompt);
        return image(p.body, p.type, "pollinations", h);
      } catch (e) {
        console.log("Pollinations: " + (e && e.message));
        if (cfLimit && (e.status === 402 || e.status === 429)) return fail("Dzienny limit darmowych podglądów się wyczerpał. Spróbuj jutro.", 429, h);
        return fail("Generator nie odpowiedział. Spróbuj ponownie za chwilę.", 502, h);
      }
    }
    return fail(cfLimit ? "Dzienny limit darmowych podglądów się wyczerpał. Spróbuj jutro." : "Generator nie odpowiedział. Spróbuj ponownie.", cfLimit ? 429 : 502, h);
  }
};
