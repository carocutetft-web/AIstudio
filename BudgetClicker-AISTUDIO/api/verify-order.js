const crypto = require('crypto');

function base64UrlEncode(buf) {
  return Buffer.from(buf).toString('base64').replace(/=+$/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function signPayload(payloadObj) {
  const payload = JSON.stringify(payloadObj);
  const payloadB64 = base64UrlEncode(Buffer.from(payload));
  const key = process.env.REDEEM_SIGNING_KEY || '';
  const h = crypto.createHmac('sha256', key).update(payloadB64).digest();
  const sigB64 = base64UrlEncode(h);
  return `${payloadB64}.${sigB64}`;
}

async function verifyMercadoPago(orderId) {
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) return { ok: false, reason: 'no_mp_token' };

  const url = `https://api.mercadopago.com/v1/payments/search?external_reference=${encodeURIComponent(orderId)}`;
  try {
    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!r.ok) return { ok: false, reason: 'mp_api_error' };
    const data = await r.json();
    // data.results is array of payments
    const payments = data.results || [];
    const approved = payments.some(p => (p.status || '').toLowerCase() === 'approved' || (p.status_detail || '').toLowerCase().includes('accredited') || (p.payment_method && p.status === 'approved'));
    return { ok: approved, raw: data };
  } catch (e) {
    console.error(e);
    return { ok: false, reason: 'mp_fetch_failed' };
  }
}

async function verifyPayPal(orderId, paypalOrderId) {
  // If a PayPal order id (paypalOrderId) was provided by the success redirect, verify it directly
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) return { ok: false, reason: 'no_paypal_creds' };

  try {
    const tokenResp = await fetch(process.env.PAYPAL_OAUTH_URL || 'https://api-m.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Basic ${Buffer.from(clientId + ':' + clientSecret).toString('base64')}` },
      body: 'grant_type=client_credentials',
    });
    if (!tokenResp.ok) return { ok: false, reason: 'paypal_oauth_failed' };
    const tokenData = await tokenResp.json();
    const accessToken = tokenData.access_token;
    if (!paypalOrderId) return { ok: false, reason: 'no_paypal_order_id' };
    const orderResp = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${paypalOrderId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!orderResp.ok) return { ok: false, reason: 'paypal_order_fetch_failed' };
    const orderData = await orderResp.json();
    const status = orderData.status;
    const ok = status === 'COMPLETED' || status === 'APPROVED';
    return { ok, raw: orderData };
  } catch (e) {
    console.error(e);
    return { ok: false, reason: 'paypal_fetch_failed' };
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).end('Method not allowed');
  const { orderId, gateway, paypalOrderId } = req.query || {};
  if (!orderId) return res.status(400).json({ error: 'orderId required' });

  try {
    let verified = false;
    let raw = null;
    if ((gateway || 'mercadopago').toLowerCase() === 'mercadopago') {
      const r = await verifyMercadoPago(orderId);
      verified = !!r.ok;
      raw = r.raw || r;
    } else if ((gateway || '').toLowerCase() === 'paypal') {
      const r = await verifyPayPal(orderId, paypalOrderId);
      verified = !!r.ok;
      raw = r.raw || r;
    }

    if (verified) {
      // Issue redeem code (signed token)
      const payload = { orderId, gateway, issuedAt: Date.now() };
      const redeemCode = signPayload(payload);
      return res.json({ status: 'paid', redeemCode, info: raw });
    }

    return res.json({ status: 'pending', info: raw });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'internal_error' });
  }
};
