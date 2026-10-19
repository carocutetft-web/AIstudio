# Serverless ephemeral payment helper (Vercel)

This folder contains Serverless Functions for a minimal ephemeral payment flow using external payment links (MercadoPago / PayPal) and a signed redeem code that the buyer saves to restore purchases on other devices.

Required environment variables (set in Vercel):
- MP_LINKS_JSON: JSON string mapping itemId -> link-template. Example: {"vip_pass":"https://www.mercadopago.com/checkout/v1/redirect?preference_id=ABC&external_reference={ORDER_ID}"}
- PP_LINKS_JSON: JSON string mapping itemId -> link-template. Example: {"vip_pass":"https://www.paypal.com/checkoutnow?token=XYZ&custom={ORDER_ID}"}
- REDEEM_SIGNING_KEY: secret string used to HMAC-sign redeem tokens

Optional (recommended for automatic verification):
- MP_ACCESS_TOKEN: MercadoPago server-side access token (to query payments by external_reference)
- PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET: credentials to verify PayPal orders (if you pass paypalOrderId from the success redirect)
- MP_WEBHOOK_SECRET / PP_WEBHOOK_SECRET: optional secrets to validate incoming webhooks

How it works:
1. Frontend calls POST /api/create-order with { itemId, itemTitle, priceUSD, gateway }
2. Function returns { orderId, redirectUrl } where redirectUrl includes the orderId as external_reference
3. User completes payment on provider-hosted page
4. Provider redirects user back to your app (configure success_url) with orderId present in query
5. Frontend calls GET /api/verify-order?orderId=...&gateway=...
   - The function will verify with the provider (if credentials present) and, on success, return a signed redeemCode
6. Frontend displays redeemCode and applies purchase locally. The user can copy the code for cross-device restore.
7. To restore: user pastes code into the app -> POST /api/redeem -> server verifies signature and returns payload

Limitations:
- No DB: serverless functions are stateless and ephemeral. The redeem code is the portable proof of purchase.
- If you need revocation/listing, switch to a small DB (Supabase or SQLite).

