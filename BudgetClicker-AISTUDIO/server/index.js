// server/index.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));

const MP_LINKS = process.env.MP_LINKS_JSON ? JSON.parse(process.env.MP_LINKS_JSON) : {};
const PP_LINKS = process.env.PP_LINKS_JSON ? JSON.parse(process.env.PP_LINKS_JSON) : {};
const PORT = process.env.PORT || 4000;

function readOrders() {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8')) || [];
  } catch (e) {
    return [];
  }
}

function writeOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

function createOrderRecord({ itemId, itemTitle, priceUSD, gateway, metadata = {} }) {
  const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
  const order = {
    id: orderId,
    itemId,
    itemTitle,
    priceUSD,
    gateway,
    status: 'pending',
    metadata,
    createdAt: new Date().toISOString(),
  };
  const orders = readOrders();
  orders.push(order);
  writeOrders(orders);
  return order;
}

function updateOrderStatus(orderId, status, extra = {}) {
  const orders = readOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) return null;
  orders[idx] = { ...orders[idx], status, updatedAt: new Date().toISOString(), ...extra };
  writeOrders(orders);
  return orders[idx];
}

// Create order and return redirect URL (the link templates should include {ORDER_ID} placeholder)
app.post('/api/create-order', (req, res) => {
  try {
    const { itemId, itemTitle, priceUSD, gateway = 'mercadopago', buyerEmail } = req.body;
    if (!itemId) return res.status(400).json({ error: 'itemId is required' });

    const order = createOrderRecord({ itemId, itemTitle, priceUSD, gateway, metadata: { buyerEmail } });

    const linksMap = gateway === 'mercadopago' ? MP_LINKS : PP_LINKS;
    const template = linksMap[itemId] || linksMap['default'];
    if (!template) {
      return res.status(400).json({ error: 'No payment link configured for this item/gateway' });
    }

    let redirectUrl = template;
    if (template.includes('{ORDER_ID}')) {
      redirectUrl = template.replace(/\{ORDER_ID\}/g, order.id);
    } else {
      // Append as query param if template doesn't contain placeholder
      const sep = template.includes('?') ? '&' : '?';
      redirectUrl = `${template}${sep}external_reference=${encodeURIComponent(order.id)}`;
    }

    return res.json({ orderId: order.id, redirectUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
});

// Webhook receiver for MercadoPago
app.post('/api/webhook/mercadopago', (req, res) => {
  // Optional simple secret header check
  const expectedSecret = process.env.MP_WEBHOOK_SECRET;
  if (expectedSecret) {
    const header = req.headers['x-mp-webhook-secret'] || req.headers['x-webhook-secret'] || '';
    if (header !== expectedSecret) {
      console.warn('MercadoPago webhook secret mismatch');
      return res.status(401).send('invalid secret');
    }
  }

  // Try to find our order id inside the payload (expects that payment link or preference included the order id as external_reference or query param)
  const payloadStr = JSON.stringify(req.body);
  const match = payloadStr.match(/ORD-\d{13}-\d{4}/);
  if (match) {
    const orderId = match[0];
    // Heuristic: consider event contains "approved" or "payment" keywords
    const lower = payloadStr.toLowerCase();
    if (lower.includes('approved') || lower.includes('paid') || lower.includes('payment')) {
      const updated = updateOrderStatus(orderId, 'paid', { raw: req.body });
      console.log('Marked order paid (mercadopago):', orderId, !!updated);
    }
  }

  res.json({ received: true });
});

// Webhook receiver for PayPal
app.post('/api/webhook/paypal', (req, res) => {
  // Optional simple secret header check
  const expectedSecret = process.env.PP_WEBHOOK_SECRET;
  if (expectedSecret) {
    const header = req.headers['x-pp-webhook-secret'] || req.headers['x-webhook-secret'] || '';
    if (header !== expectedSecret) {
      console.warn('PayPal webhook secret mismatch');
      return res.status(401).send('invalid secret');
    }
  }

  const payloadStr = JSON.stringify(req.body);
  const match = payloadStr.match(/ORD-\d{13}-\d{4}/);
  if (match) {
    const orderId = match[0];
    const lower = payloadStr.toLowerCase();
    if (lower.includes('completed') || lower.includes('capture') || lower.includes('sale')) {
      const updated = updateOrderStatus(orderId, 'paid', { raw: req.body });
      console.log('Marked order paid (paypal):', orderId, !!updated);
    }
  }

  res.json({ received: true });
});

// Simple admin route to list orders (protected by a quick env token if provided)
app.get('/api/orders', (req, res) => {
  const token = process.env.ADMIN_TOKEN;
  if (token) {
    const provided = req.headers['x-admin-token'];
    if (provided !== token) return res.status(401).json({ error: 'unauthorized' });
  }
  res.json(readOrders());
});

app.listen(PORT, () => console.log(`Payment helper server listening on ${PORT}`));
