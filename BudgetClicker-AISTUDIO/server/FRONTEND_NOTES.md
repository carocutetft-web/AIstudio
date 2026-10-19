***FRONTEND ADVICE***

I updated CheckoutModal to call /api/create-order already in the previous change. After deploying these serverless functions to Vercel, configure your environment variables and set your payment links to include {ORDER_ID} so the redirect contains the order id.

You should add a small "Restore purchase with code" UI (a modal) where users paste their redeem code and the client calls POST /api/redeem with { code } to validate and apply the purchase via the existing handlePurchaseSuccess hook (which I left intact).

Testing locally:
- Vercel dev (vercel dev) will run serverless functions locally.
- Without MP_ACCESS_TOKEN / PayPal creds, verify-order will return pending; you can still test full flow by generating a redeemCode manually by hitting /api/verify-order with a debug flag (not implemented here) or by mocking the provider responses.

