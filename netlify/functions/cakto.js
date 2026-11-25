// Webhook Cakto → Firestore `sales/{order_id}` (+ marca a sessão em `sessions/{sid}`) · funil LATAM /sangre
// Cakto → Apps → Webhooks → URL: https://dietadesangue.netlify.app/.netlify/functions/cakto
// Env (Netlify): FIREBASE_SERVICE_ACCOUNT (a mesma da Kirvano) · CAKTO_WEBHOOK_SECRET (opcional: o "secret" do webhook)
// O funil manda no link do checkout ?sck=onde|vsl|entrada|sid|sangre-TIPO, e a Cakto devolve o sck no webhook.
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

// mesmo vocabulário de status da Kirvano, pro /admin ler igual
const STATUS = { paid: "aprovada", refused: "REFUSED", refunded: "REFUNDED", chargedback: "CHARGEBACK", canceled: "CANCELED", waiting_payment: "PENDING", refund_requested: "REFUND_REQUESTED", MED: "CHARGEBACK" };
// id da oferta na Cakto → nome do produto no /admin (ids em tools/cakto_sangre.json)
const PRODUCT = {
  abm8u4s: "principal", tju5cxr: "backredirect", "36ntim7": "bump postres",
  "6ppjdip": "up1 acelerador", oihxqsz: "down1 acelerador",
  udhtqhp: "up2 intestino", u7n7xkp: "down2 intestino",
  ytrjtju: "up3 familia", "3em4b5o": "down3 familia",
  tfopgx3: "app postres", "6arpd93": "app vientre plano", "3ffz8na": "app fase 2",
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "POST only" };
  let b; try { b = JSON.parse(event.body || "{}"); } catch (e) { return { statusCode: 400, body: "bad json" }; }
  const want = process.env.CAKTO_WEBHOOK_SECRET || "";
  if (want && b.secret !== want) return { statusCode: 401, body: "bad secret" };

  const list = Array.isArray(b.data) ? b.data : [b.data || {}];  // webhook V2 manda lista
  const ev = b.event || "";
  if (ev === "checkout_abandonment") return { statusCode: 200, body: "ignored" };
  // sem secret configurado: só aceita pedido de oferta nossa (evita lixo no painel)
  if (!want && !list.some((o) => PRODUCT[(o.offer || {}).id])) return { statusCode: 200, body: "ignored" };

  try {
    const d = db();
    for (const o of list) {
      if (!o || !o.id) continue;
      const offerId = (o.offer || {}).id || "";
      const [where, ab, entry, sid] = String(o.sck || "").split("|");
      const status = STATUS[o.status] || String(o.status || ev || "?");
      const at = new Date(o.paidAt || o.createdAt || Date.now()); const atMs = isNaN(at) ? Date.now() : at.getTime();
      const product = PRODUCT[offerId] || (o.offer_type === "orderbump" ? "bump" : (o.offer || {}).name || (o.product || {}).name || "?");
      const doc = {
        at: atMs, day: new Date(atMs).toISOString().slice(0, 10), event: ev, status, value: +o.amount || +o.baseAmount || 0, currency: o.currency || "USD", product,
        offerType: o.offer_type || null, parentOrder: o.parent_order || null, bumps: [], funil: "sangre", platform: "cakto",
        payment: o.paymentMethod || null, country: (o.address || {}).country || null,
        source: o.utm_source || null, medium: o.utm_medium || null, campaign: o.utm_campaign || null, content: o.utm_content || null, term: o.utm_term || null,
        src: where || null, ab: ab || null, entry: entry || null, sid: sid || null,
        customer: o.customer ? { name: o.customer.name || null, email: o.customer.email || null, phone: o.customer.phone || null } : null,
        checkoutId: offerId, updatedAt: FieldValue.serverTimestamp(), raw: JSON.stringify({ ...o, customer: undefined }).slice(0, 8000),
      };
      await d.collection("sales").doc("cakto-" + o.id).set(doc, { merge: true });
      if (sid) await d.collection("sessions").doc(sid).set({ sale: { status, product, value: doc.value, at: atMs, saleId: "cakto-" + o.id }, ...(status === "aprovada" ? { purchased: true, purchasedProduct: product } : {}), updatedAt: FieldValue.serverTimestamp() }, { merge: true }).catch(() => {});
    }
    return { statusCode: 200, body: "ok" };
  } catch (e) { console.error(e); return { statusCode: 200, body: "erro registrado" }; }
};
