const crypto = require('crypto');

function base64UrlDecode(input) {
  input = input.replace(/-/g, '+').replace(/_/g, '/');
  while (input.length % 4) input += '=';
  return Buffer.from(input, 'base64').toString();
}

function base64UrlToBuffer(input) {
  input = input.replace(/-/g, '+').replace(/_/g, '/');
  while (input.length % 4) input += '=';
  return Buffer.from(input, 'base64');
}

function verifyAndDecode(code) {
  try {
    const [payloadB64, sigB64] = code.split('.');
    if (!payloadB64 || !sigB64) return null;
    const key = process.env.REDEEM_SIGNING_KEY || '';
    const h = crypto.createHmac('sha256', key).update(payloadB64).digest();
    const expectedSig = h;
    const providedSig = base64UrlToBuffer(sigB64);
    if (!crypto.timingSafeEqual(expectedSig, providedSig)) return null;
    const payloadJson = base64UrlDecode(payloadB64);
    const payload = JSON.parse(payloadJson);
    return payload;
  } catch (e) {
    console.error('redeem verify error', e);
    return null;
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST' && req.method !== 'GET') return res.status(405).end('Method not allowed');
  const code = req.method === 'GET' ? req.query.code : (req.body && req.body.code);
  if (!code) return res.status(400).json({ error: 'code required' });
  const payload = verifyAndDecode(code);
  if (!payload) return res.status(400).json({ valid: false, error: 'invalid_or_tampered' });

  // Optionally check expiry if payload includes issuedAt
  // Here we accept tokens up to 365 days old
  if (payload.issuedAt) {
    const age = Date.now() - payload.issuedAt;
    const max = 365 * 24 * 60 * 60 * 1000;
    if (age > max) return res.status(400).json({ valid: false, error: 'expired' });
  }

  // Return item info for the client to award
  return res.json({ valid: true, payload });
};
