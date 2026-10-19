Update: added public standalone pages for success and restore to support serverless ephemeral flow.

Files added:
- public/checkout-success.html  (reads orderId, calls /api/verify-order, shows redeemCode and stores in localStorage)
- public/restore.html           (paste redeemCode, calls /api/redeem, stores localStorage on success)

Usage:
- Configure payment links to redirect to: https://<your-site>/checkout-success?orderId={ORDER_ID}
- After payment, user gets redeemCode and can use /restore.html to paste it on other devices.
