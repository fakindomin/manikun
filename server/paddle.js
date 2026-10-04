// Zakup kredytów przez Paddle (sprzedawca: Paddle, Merchant of Record).
// Ustawienia (wrangler.jsonc / panel Cloudflare):
//   PADDLE_ENV – "sandbox" albo "production"
//   PADDLE_PACKS – pakiety: [{ price: "pri_…", product: "pro_…", credits: 20, pln: 5 }, …]
//   PADDLE_CLIENT_TOKEN – token przeglądarki (jawny, otwiera kasę)
//   PADDLE_WEBHOOK_SECRET – sekret powiadomień (panel: Secret); bez niego sklep jest ukryty
// Przebieg: aplikacja zapisuje zgodę (POST /api/checkout) → kasa Paddle z custom_data { c: id zgody }
// → Paddle wysyła transaction.completed na /api/paddle/webhook → kredyty na konto (raz na transakcję).
// Zwrot albo chargeback (adjustment, status approved) zabiera kredyty z tego zakupu.

const now = () => Math.floor(Date.now() / 1000);

export function packs(env) {
  let p = env.PADDLE_PACKS;
  if (typeof p === "string") { try { p = JSON.parse(p); } catch { p = null; } }
  return Array.isArray(p) ? p.filter(x => x && /^pri_\w+$/.test(x.price) && Number(x.credits) > 0) : [];
}
const packFor = (env, priceId) => packs(env).find(x => x.price === priceId);

// Dane sklepu dla aplikacji (w /api/me); null = sklep wyłączony
export function shopInfo(env) {
  const p = packs(env);
  if (!env.PADDLE_CLIENT_TOKEN || !env.PADDLE_WEBHOOK_SECRET || !p.length) return null;
  return {
    env: env.PADDLE_ENV === "production" ? "production" : "sandbox",
    token: env.PADDLE_CLIENT_TOKEN,
    packs: p.map(x => ({ price: x.price, credits: Number(x.credits), pln: Number(x.pln) || null }))
  };
}

// Zgoda przed kasą: wybrany pakiet + wyraźna zgoda (pole w aplikacji nie jest zaznaczone domyślnie)
export async function checkoutStart(request, env, user, { json, randomToken }) {
  if (!shopInfo(env)) return json({ error: "Zakup kredytów nie jest jeszcze dostępny." }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Zły format zapytania." }, 400); }
  if (body.consent !== true) return json({ error: "Zaznacz zgodę, żeby przejść do płatności." }, 400);
  const pack = packFor(env, body.price);
  if (!pack) return json({ error: "Nie ma takiego pakietu." }, 400);
  const id = randomToken(12), t = now();
  await env.DB.prepare("INSERT INTO checkouts (id, user_id, price_id, consent_at, created_at) VALUES (?, ?, ?, ?, ?)")
    .bind(id, user.id, pack.price, t, t).run();
  return json({ id, email: user.email });
}

// Podpis Paddle: nagłówek "ts=…;h1=…" (przy wymianie sekretu kilka h1), HMAC-SHA256 z "ts:surowa treść"
async function signatureOk(raw, header, secret) {
  let ts = null;
  const sigs = [];
  for (const part of String(header || "").split(";")) {
    const [k, v] = part.split("=");
    if (k === "ts") ts = v;
    else if (k === "h1" && v) sigs.push(v.toLowerCase());
  }
  if (!ts || !sigs.length || Math.abs(now() - Number(ts)) > 900) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(ts + ":" + raw)));
  const hex = [...mac].map(b => b.toString(16).padStart(2, "0")).join("");
  return sigs.some(s => s.length === hex.length && [...s].reduce((d, c, i) => d | (c.charCodeAt(0) ^ hex.charCodeAt(i)), 0) === 0);
}

export async function paddleWebhook(request, env, { json }) {
  if (!env.PADDLE_WEBHOOK_SECRET) return json({ error: "Brak sekretu." }, 503);
  const raw = await request.text();
  if (!(await signatureOk(raw, request.headers.get("Paddle-Signature"), env.PADDLE_WEBHOOK_SECRET))) return json({ error: "Zły podpis." }, 401);
  let ev;
  try { ev = JSON.parse(raw); } catch { return json({ error: "Zły format." }, 400); }
  const d = ev.data || {};
  if (ev.event_type === "transaction.completed") await onPaid(env, d);
  else if (ev.event_type === "adjustment.created" || ev.event_type === "adjustment.updated") await onAdjustment(env, d);
  return json({ ok: true });
}

// Zapłacone: kredyty z pakietów w transakcji, raz na transakcję (unikalne reason + ref)
async function onPaid(env, d) {
  if (!d.id) return;
  const items = Array.isArray(d.items) ? d.items : [];
  let credits = 0, priceId = null;
  for (const it of items) {
    const id = it.price && it.price.id || it.price_id;
    const pack = packFor(env, id);
    if (pack) { credits += Number(pack.credits) * (Number(it.quantity) || 1); priceId = priceId || id; }
  }
  const c = d.custom_data && typeof d.custom_data.c === "string" ? d.custom_data.c : null;
  const co = c ? await env.DB.prepare("SELECT id, user_id FROM checkouts WHERE id = ?").bind(c).first() : null;
  const totals = d.details && d.details.totals || {};
  const total = Number(totals.grand_total || totals.total) || null, t = now();
  // Bez znanego konta albo pakietu: zapis do wyjaśnienia ręcznie (status 'orphan'), bez kredytów
  const status = co && credits > 0 ? "paid" : "orphan";
  await env.DB.prepare(
    "INSERT OR IGNORE INTO purchases (txn_id, user_id, checkout_id, price_id, credits, total, currency, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(d.id, co ? co.user_id : null, c, priceId, credits, total, d.currency_code || null, status, t, t).run();
  if (status !== "paid") { console.log("Paddle: transakcja bez konta albo pakietu " + d.id); return; }
  await env.DB.prepare("INSERT OR IGNORE INTO credits (user_id, delta, reason, ref, created_at) VALUES (?, ?, 'buy', ?, ?)")
    .bind(co.user_id, credits, d.id, t).run();
}

// Zwrot / chargeback zatwierdzony: zabieramy kredyty z tego zakupu (całość albo część proporcjonalnie do kwoty)
async function onAdjustment(env, d) {
  if (!d.id || !d.transaction_id || d.status !== "approved" || !["refund", "chargeback"].includes(d.action)) return;
  const p = await env.DB.prepare("SELECT * FROM purchases WHERE txn_id = ?").bind(d.transaction_id).first();
  if (!p || !p.user_id || p.status === "orphan") return;
  const amount = Number(d.totals && d.totals.total) || 0;
  const back = d.type === "full" || !p.total || !amount ? p.credits : Math.min(p.credits, Math.round(p.credits * amount / p.total));
  const ins = await env.DB.prepare("INSERT OR IGNORE INTO credits (user_id, delta, reason, ref, created_at) VALUES (?, ?, 'refund-buy', ?, ?)")
    .bind(p.user_id, -back, d.id, now()).run();
  if (ins.meta.changes) await env.DB.prepare("UPDATE purchases SET refunded = refunded + ?, status = ?, updated_at = ? WHERE txn_id = ?")
    .bind(back, d.action === "chargeback" ? "chargeback" : "refunded", now(), p.txn_id).run();
}
