// Porównanie modeli Higgsfield: ten sam Maniscrypt wysłany do kilku modeli, mierzony czas i wynik.
// Tylko właściciel (konto nr 1). Adres: /api/admin/bench (wyniki), /api/admin/bench?start=1 (nowe porównanie).
// Nazwy modeli w API nie są nigdzie wypisane, więc dla każdej rodziny próbujemy kilku adresów;
// 404 model_not_found nic nie kosztuje, a po pierwszym przyjętym zleceniu rodzina jest zamknięta.

const FAMILIES = [
  ["Soul 2", ["higgsfield-ai/soul/v2/standard"]],
  ["Z-Image Turbo", ["tongyi-mai/z-image-turbo/text-to-image", "tongyi-mai/z-image/turbo", "z-image/turbo/text-to-image", "z-image-turbo/text-to-image"]],
  ["Nano Banana 2", ["google/nano-banana-2/text-to-image", "google/nano-banana/v2/text-to-image", "nano-banana-2/text-to-image", "google/nano-banana-flash/text-to-image"]],
  ["Nano Banana", ["google/nano-banana/text-to-image", "nano-banana/text-to-image", "google/gemini-2.5-flash-image/text-to-image"]],
  ["Seedream", ["bytedance/seedream-4.5/text-to-image", "bytedance/seedream-5.0/text-to-image", "bytedance/seedream-5-lite/text-to-image", "bytedance/seedream/v4.5/text-to-image"]],
  ["FLUX", ["flux-pro/kontext/max/text-to-image", "black-forest-labs/flux-2-pro/text-to-image", "flux-2/pro/text-to-image"]],
  ["Grok Imagine", ["xai/grok-imagine-2.0/text-to-image", "xai/grok-imagine/text-to-image", "grok-imagine/text-to-image"]],
  ["Ideogram 4", ["ideogram/ideogram-4.0/text-to-image", "ideogram/v4/text-to-image", "ideogram-ai/ideogram-4/text-to-image"]],
  ["Recraft 4.1", ["recraft/recraft-4.1/text-to-image", "recraft-ai/recraft-v4.1/text-to-image", "recraft/v4.1/text-to-image"]]
];
const CATALOG = ["/models", "/v1/models", "/api/models", "/catalog"];
const FALLBACK_PROMPT = "Photorealistic full-body photo of a person standing in a sunny park, natural light, 35mm lens, vertical 3:4 frame.";

const esc = t => String(t == null ? "" : t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

export async function bench(request, url, env, user, ctx) {
  const { hfHeaders, apiBase, json } = ctx;
  if (!user || user.id !== 1) return json({ error: "Tylko dla właściciela." }, 403);
  const db = env.DB, base = apiBase(env);

  if (url.searchParams.get("start") === "1") {
    const last = await db.prepare("SELECT MAX(started_ms) AS t FROM bench WHERE family <> 'katalog-pelny'").first();
    if (last && last.t && Date.now() - last.t < 5 * 60000) return Response.redirect(url.origin + "/api/admin/bench", 302);
    const g = await db.prepare("SELECT prompt FROM generations WHERE user_id = ? AND status = 'completed' ORDER BY created_at DESC LIMIT 1").bind(user.id).first();
    const prompt = (g && g.prompt) || FALLBACK_PROMPT, run = String(Date.now());
    // Katalog modeli (jeśli API go ma)
    for (const path of CATALOG) {
      let r, raw = "";
      try { r = await fetch(base + path, { headers: hfHeaders(env), signal: AbortSignal.timeout(10000) }); raw = await r.text(); } catch (e) { raw = String(e); }
      await db.prepare("INSERT INTO bench (run, family, model, http, status, detail, started_ms) VALUES (?, 'katalog', ?, ?, 'info', ?, ?)")
        .bind(run, path, r ? r.status : null, raw.slice(0, 4000), Date.now()).run();
    }
    const pick = (url.searchParams.get("models") || "").split(",").map(x => x.trim()).filter(x => /^[\w.\/-]{3,80}$/.test(x)).slice(0, 12);
    for (const [family, paths] of pick.length ? pick.map(m => [m, [m]]) : FAMILIES) {
      for (const model of paths) {
        let r, raw = "", data = null;
        const t0 = Date.now();
        try {
          r = await fetch(base + "/" + model, { method: "POST", headers: hfHeaders(env), body: JSON.stringify({ prompt, aspect_ratio: "3:4" }), signal: AbortSignal.timeout(30000) });
          raw = await r.text();
          try { data = JSON.parse(raw); } catch { data = null; }
        } catch (e) { raw = String(e); }
        const ok = r && r.ok && data && data.request_id;
        await db.prepare("INSERT INTO bench (run, family, model, http, status, request_id, detail, started_ms) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
          .bind(run, family, model, r ? r.status : null, ok ? "queued" : "rejected", ok ? data.request_id : null, raw.slice(0, 600), t0).run();
        if (ok || !(r && r.status === 404)) break;
      }
    }
    return Response.redirect(url.origin + "/api/admin/bench", 302);
  }

  // Dopytanie o zlecenia w toku
  const run = (await db.prepare("SELECT MAX(run) AS r FROM bench WHERE family <> 'katalog-pelny'").first() || {}).r;
  const pending = await db.prepare("SELECT * FROM bench WHERE run = ? AND status IN ('queued', 'in_progress')").bind(run || "").all();
  await Promise.all(pending.results.map(async b => {
    try {
      const r = await fetch(base + "/requests/" + encodeURIComponent(b.request_id) + "/status", { headers: hfHeaders(env), signal: AbortSignal.timeout(10000) });
      const d = r.ok ? await r.json() : null;
      if (!d || !d.status || d.status === b.status) return;
      const end = ["completed", "failed", "nsfw"].includes(d.status);
      const img = d.images && d.images[0] && d.images[0].url;
      await db.prepare("UPDATE bench SET status = ?, image_url = ?, done_ms = ?, detail = ? WHERE id = ?")
        .bind(d.status, img || null, end ? Date.now() : null, end && !img ? JSON.stringify(d).slice(0, 600) : b.detail, b.id).run();
    } catch (e) {}
  }));
  const rows = (await db.prepare("SELECT * FROM bench WHERE run = ? ORDER BY id").bind(run || "").all()).results;
  if (url.searchParams.get("format") === "json") return json(rows);
  const busy = rows.some(b => b.status === "queued" || b.status === "in_progress");
  const cards = rows.filter(b => !b.family.startsWith("katalog") && b.status !== "rejected").map(b => {
    const sec = b.done_ms ? ((b.done_ms - b.started_ms) / 1000).toFixed(1) + " s" : Math.round((Date.now() - b.started_ms) / 1000) + " s…";
    return `<figure><div class="img">${b.image_url ? `<a href="${esc(b.image_url)}" target="_blank"><img src="${esc(b.image_url)}"></a>` : `<span>${esc(b.status)}</span>`}</div>
      <figcaption><b>${esc(b.family)}</b> <span class="t">${sec}</span><br><code>${esc(b.model)}</code></figcaption></figure>`;
  }).join("");
  const misses = rows.filter(b => b.status === "rejected").map(b => `<li><b>${esc(b.family)}</b> <code>${esc(b.model)}</code>: ${esc(b.http)} ${esc((b.detail || "").slice(0, 160))}</li>`).join("");
  const html = `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Porównanie modeli</title>${busy ? '<meta http-equiv="refresh" content="2">' : ""}
<style>body{font:15px system-ui,sans-serif;margin:16px;background:#141416;color:#eee}a{color:#8fd3a8}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}figure{margin:0;background:#1e1e22;border-radius:12px;overflow:hidden}
.img{aspect-ratio:3/4;display:grid;place-items:center;background:#000;color:#999}.img img{width:100%;height:100%;object-fit:cover;display:block}
figcaption{padding:8px 10px;font-size:13px}.t{float:right;font-weight:700;color:#8fd3a8}code{font-size:11px;color:#aaa;word-break:break-all}li{margin:4px 0;font-size:13px}</style></head>
<body><h1>Porównanie modeli Higgsfield</h1><p>${run ? "Start: " + new Date(Number(run)).toLocaleString("pl-PL") + (busy ? " · odświeża się samo…" : " · gotowe") : "Brak porównań."} · <a href="?start=1">Nowe porównanie</a></p>
<div class="grid">${cards}</div>${misses ? `<h3>Nie przyjęte</h3><ul>${misses}</ul>` : ""}</body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}

// Katalog modeli z API (GET /models): zapis do bazy (wiersz 'katalog-pelny') i lista modeli obrazów z ceną
export async function models(url, env, user, ctx) {
  const { hfHeaders, apiBase, json } = ctx;
  if (!user || user.id !== 1) return json({ error: "Tylko dla właściciela." }, 403);
  const items = [];
  for (let page = 1; page <= 10; page++) {
    const r = await fetch(apiBase(env) + "/models?page=" + page + "&size=100&limit=100", { headers: hfHeaders(env), signal: AbortSignal.timeout(15000) });
    if (!r.ok) break;
    const d = await r.json();
    const got = d.items || [];
    for (const m of got) if (!items.some(x => x.slug === m.slug)) items.push(m);
    if (!got.length || items.length >= (d.total || 0)) break;
  }
  const slim = items.map(m => ({ slug: m.slug, title: m.title, out: m.output_type, op: (m.operation_type || []).join("|"), credits: m.base_credits,
    schema: m.input_schema && m.input_schema.properties ? Object.keys(m.input_schema.properties).join(",") : null }));
  await env.DB.prepare("INSERT INTO bench (run, family, model, http, status, detail, started_ms) VALUES (?, 'katalog-pelny', '/models', 200, 'info', ?, ?)")
    .bind(String(Date.now()), JSON.stringify(slim), Date.now()).run();
  const img = slim.filter(m => m.out === "image");
  const rows = img.map(m => `<tr><td><b>${esc(m.title)}</b></td><td><code>${esc(m.slug)}</code></td><td>${esc(m.op)}</td><td>${esc(m.credits)}</td></tr>`).join("");
  return new Response(`<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Modele Higgsfield</title>
<style>body{font:14px system-ui,sans-serif;margin:16px;background:#141416;color:#eee}td{padding:4px 8px;border-bottom:1px solid #333}code{color:#8fd3a8}</style></head>
<body><h1>Modele obrazów w API (${img.length} z ${slim.length})</h1><table>${rows}</table></body></html>`, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}
