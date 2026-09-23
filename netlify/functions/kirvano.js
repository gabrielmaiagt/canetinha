// Webhook Kirvano → Firestore `sales/{sale_id}` (+ marca a sessão em `sessions/{sid}`)
// Kirvano → Configurações → Webhooks → URL: https://SEU-DOMINIO/.netlify/functions/kirvano?token=KIRVANO_TOKEN
// Env (Netlify): FIREBASE_SERVICE_ACCOUNT (JSON da service account, em base64) · KIRVANO_TOKEN (qualquer string longa)
const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

function db() {
  if (!getApps().length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT || "";
    const json = raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
    initializeApp({ credential: cert(JSON.parse(json)) });
  }
  return getFirestore();
}
const STATUS = { SALE_APPROVED: "aprovada", SALE_REFUSED: "REFUSED", SALE_REFUNDED: "REFUNDED", SALE_CHARGEBACK: "CHARGEBACK", PIX_GENERATED: "PENDING", BANK_SLIP_GENERATED: "PENDING", PIX_EXPIRED: "CANCELED", BANK_SLIP_EXPIRED: "CANCELED", ABANDONED_CART: "ABANDONED_CART", SUBSCRIPTION_CANCELED: "CANCELED", SUBSCRIPTION_RENEWED: "aprovada", SUBSCRIPTION_EXPIRED: "CANCELED" };
const money = (v) => typeof v === "number" ? v : parseFloat(String(v || "0").replace(/[^\d,.-]/g, "").replace(/\.(?=\d{3})/g, "").replace(",", ".")) || 0;
// checkout_id → nome do produto no /admin. Colar aqui os ids do upsell e do downsell quando criar na Kirvano.
const PRODUCT = {
  "3d91f533-62ad-4945-a86d-bea2aafa4e4c": "principal",
  "be75b426-7805-49ba-af3d-84512909f508": "backredirect",
  // "xxxxxxxx-...": "upsell desparasita",
  // "xxxxxxxx-...": "downsell desparasita",
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "POST only" };
  const want = process.env.KIRVANO_TOKEN || "";
  const got = (event.queryStringParameters || {}).token || event.headers["security-token"] || event.headers["x-security-token"] || event.headers["authorization"] || "";
  if (want && got.replace(/^Bearer /i, "") !== want) return { statusCode: 401, body: "bad token" };

  let b; try { b = JSON.parse(event.body || "{}"); } catch (e) { return { statusCode: 400, body: "bad json" }; }
  const ev = b.event || b.type || ""; const status = STATUS[ev] || (b.status ? String(b.status) : ev || "?");
  const utm = b.utm || {}; const src = String(utm.src || b.src || ""); const [where, ab, entry, sid] = src.split("|");
  const prods = Array.isArray(b.products) ? b.products : []; const main = prods.find(p => !p.is_order_bump) || prods[0] || {};
  const checkoutId = b.checkout_id || b.checkoutId || ""; const product = PRODUCT[checkoutId] || PRODUCT[main.id] || (where && where.startsWith("bk") ? "backredirect" : where ? "principal" : (main.offer_name || main.name || "?"));
  const bumps = prods.filter(p => p.is_order_bump).map(p => ({ name: p.name, price: money(p.price) }));
  const at = b.created_at ? new Date(b.created_at) : new Date(); const atMs = isNaN(at) ? Date.now() : at.getTime();
  const saleId = b.sale_id || b.id || `${checkoutId}-${atMs}`;
  const doc = {
    at: atMs, day: new Date(atMs).toISOString().slice(0, 10), event: ev, status, value: money(b.total_price ?? b.value), product, bumps,
    payment: b.payment_method || null, source: utm.utm_source || null, medium: utm.utm_medium || null, campaign: utm.utm_campaign || null, content: utm.utm_content || null, term: utm.utm_term || null,
    src: where || null, ab: ab || null, entry: entry || null, sid: sid || null,
    customer: b.customer ? { name: b.customer.name || null, email: b.customer.email || null, phone: b.customer.phone_number || null } : null,
    checkoutId, updatedAt: FieldValue.serverTimestamp(), raw: JSON.stringify(b).slice(0, 8000),
  };
  try {
    const d = db();
    await d.collection("sales").doc(String(saleId)).set(doc, { merge: true });
    if (sid) await d.collection("sessions").doc(sid).set({ sale: { status, product, value: doc.value, at: atMs, saleId: String(saleId) }, ...(status === "aprovada" ? { purchased: true, purchasedProduct: product } : {}), updatedAt: FieldValue.serverTimestamp() }, { merge: true }).catch(() => {});
    return { statusCode: 200, body: "ok" };
  } catch (e) { console.error(e); return { statusCode: 500, body: "erro: " + e.message }; }
};
