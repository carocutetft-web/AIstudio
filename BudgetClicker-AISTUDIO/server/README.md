---
***CHANGES***
The CheckoutModal component was updated to call the server payment helper when creating real payments.
Added server/ with a minimal Express helper that:
 - creates an order ID and stores it in server/data/orders.json
 - maps itemId + gateway to a payment link template (MP_LINKS_JSON / PP_LINKS_JSON env vars)
 - exposes webhook endpoints /api/webhook/mercadopago and /api/webhook/paypal
 - marks orders as paid when the webhook payload contains the generated order ID and an indication of payment

Usage notes:
 - When you supply your payment link templates in MP_LINKS_JSON / PP_LINKS_JSON make sure they include the placeholder {ORDER_ID} so the helper can add the generated order id.
 - If your external payment links don't accept placeholders, the helper will append ?external_reference=ORDER_ID to the link (if possible), but it's more reliable to include {ORDER_ID}.
 - Configure your MercadoPago / PayPal webhook URLs in their dashboards to point to:
     https://<your-server>/api/webhook/mercadopago
     https://<your-server>/api/webhook/paypal

Security:
 - For production, configure MP_WEBHOOK_SECRET / PP_WEBHOOK_SECRET and set your payment provider to include that header or secret when calling the webhook.
 - This helper uses a file-based orders.json persistence (simple). For production, switch to a DB (Postgres/SQLite) to avoid race conditions.

---
