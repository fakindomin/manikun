// Manikun: podgląd kadru. Worker Cloudflare (manikun-podglad.fakindomin.workers.dev).
// Przyjmuje Maniscrypt (POST, JSON { prompt }) i zwraca obraz JPEG z Workers AI (FLUX schnell).
// Wymaga powiązania Workers AI o nazwie AI (Settings › Bindings). Wdrożenie: wklejenie kodu w panelu Cloudflare.
const ALLOWED = ["https://manikun.vercel.app"];
const MODEL = "@cf/black-forest-labs/flux-1-schnell";
const MAX_PROMPT = 2048;

function cors(origin) {
  const ok = ALLOWED.includes(origin) || /^http:\/\/localhost(:\d+)?$/.test(origin);
  return ok ? { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400", "Vary": "Origin" } : null;
}
const fail = (msg, status, headers = {}) =>
  new Response(JSON.stringify({ error: msg }), { status, headers: { "Content-Type": "application/json", ...headers } });

export default {
  async fetch(request, env) {
    const h = cors(request.headers.get("Origin") || "");
    if (request.method === "GET") return new Response("Manikun podgląd działa.", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
    if (!h) return fail("Niedozwolone źródło.", 403);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    if (request.method !== "POST") return fail("Tylko POST.", 405, h);
    let body;
    try { body = await request.json(); } catch { return fail("Zły format zapytania.", 400, h); }
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt) return fail("Brak opisu.", 400, h);
    if (prompt.length > MAX_PROMPT) return fail("Opis jest za długi na darmowy podgląd.", 413, h);
    try {
      const out = await env.AI.run(MODEL, { prompt, steps: 4 });
      const bytes = Uint8Array.from(atob(out.image), c => c.charCodeAt(0));
      return new Response(bytes, { headers: { ...h, "Content-Type": "image/jpeg", "Cache-Control": "no-store" } });
    } catch (e) {
      const limit = /limit|quota|neuron|429/i.test(String(e && e.message));
      return fail(limit ? "Dzienny limit darmowych podglądów się wyczerpał. Spróbuj jutro." : "Generator nie odpowiedział. Spróbuj ponownie.", limit ? 429 : 502, h);
    }
  }
};
