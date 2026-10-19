---
Added serverless API endpoints for ephemeral flow with redeem code:
- POST /api/create-order -> returns { orderId, redirectUrl }
- GET  /api/verify-order?orderId=...&gateway=... -> verifies with MercadoPago (if MP_ACCESS_TOKEN env set) or PayPal (if PAYPAL_CLIENT_ID/SECRET provided and paypalOrderId param provided), returns {status: 'paid'|'pending', redeemCode}
- POST /api/redeem -> validate redeemCode and return payload
- POST /api/webhook-mercadopago -> lightweight webhook receiver
- POST /api/webhook-paypal -> lightweight webhook receiver

Notes:
- This is an ephemeral serverless approach: no persistent DB. Redeem codes are signed tokens you must keep safe (REDEEM_SIGNING_KEY env var).
- For reliable verification enable MP_ACCESS_TOKEN and PayPal credentials (see serverless/README added below).

