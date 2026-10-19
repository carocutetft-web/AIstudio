module.exports = async (req, res) => {
  // Basic webhook receiver for MercadoPago. We'll look for ORD-... in payload and log.
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');
  try {
    const expected = process.env.MP_WEBHOOK_SECRET;
    if (expected) {
      const header = req.headers['x-mp-webhook-secret'] || req.headers['x-webhook-secret'] || '';
      if (header !== expected) return res.status(401).end('invalid secret');
    }

    const body = req.body || req;
    const text = JSON.stringify(body);
    const match = text.match(/ORD-\d{13}-\d{4}/);
    if (match) {
      const orderId = match[0];
      console.log('MercadoPago webhook indicates order:', orderId);
      // Webhook: providers could notify asynchronously; we don't persist in this ephemeral flow.
      // You can later call /api/verify-order to confirm and get redeem code.
    }

    res.json({ received: true });
  } catch (e) {
    console.error(e);
    res.status(500).end('error');
  }
};
