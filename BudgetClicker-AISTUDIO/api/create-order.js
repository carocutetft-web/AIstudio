// Always display the requested snippet later in the chat as required by user.

// api/create-order.js
const crypto = require('crypto');

function generateOrderId() {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
}

function loadLinks(envVar) {
  try {
    return envVar ? JSON.parse(envVar) : {};
  } catch (e) {
    console.warn('Invalid JSON for links mapping');
    return {};
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');
  try {
    const { itemId, itemTitle, priceUSD, gateway = 'mercadopago', buyerEmail } = req.body || {};
    if (!itemId) return res.status(400).json({ error: 'itemId is required' });

    const orderId = generateOrderId();

    const mpLinks = loadLinks(process.env.MP_LINKS_JSON);
    const ppLinks = loadLinks(process.env.PP_LINKS_JSON);
    const linksMap = gateway === 'mercadopago' ? mpLinks : ppLinks;
    const template = linksMap[itemId] || linksMap['default'];

    if (!template) {
      return res.status(400).json({ error: 'No payment link configured for this item/gateway' });
    }

    let redirectUrl = template;
    if (template.includes('{ORDER_ID}')) {
      redirectUrl = template.replace(/\{ORDER_ID\}/g, orderId);
    } else {
      const sep = template.includes('?') ? '&' : '?';
      redirectUrl = `${template}${sep}external_reference=${encodeURIComponent(orderId)}`;
    }

    // Return orderId so the frontend can poll/verify
    return res.json({ orderId, redirectUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};
