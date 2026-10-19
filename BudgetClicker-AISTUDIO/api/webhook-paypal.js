module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');
  try {
    const expected = process.env.PP_WEBHOOK_SECRET;
    if (expected) {
      const header = req.headers['x-pp-webhook-secret'] || req.headers['x-webhook-secret'] || '';
      if (header !== expected) return res.status(401).end('invalid secret');
    }

    const body = req.body || req;
    const text = JSON.stringify(body);
    const match = text.match(/ORD-\d{13}-\d{4}/);
    if (match) {
      const orderId = match[0];
      console.log('PayPal webhook indicates order:', orderId);
    }

    res.json({ received: true });
  } catch (e) {
    console.error(e);
    res.status(500).end('error');
  }
};
