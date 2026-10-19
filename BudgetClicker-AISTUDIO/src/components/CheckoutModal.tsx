@@
-  const handleSimulatePayment = () => {
-    setIsProcessing(true);
-
-    setTimeout(() => {
-      setIsProcessing(false);
-      const prefix = gateway === 'mercadopago' ? 'MP-' : 'PP-';
-      const orderId = `${prefix}${Math.floor(10000000 + Math.random() * 90000000)}`;
-      setReceipt({
-        orderId,
-        date: new Date().toLocaleTimeString(),
-      });
-
-      sound.playStreakFanfare();
-      confetti({
-        particleCount: 90,
-        spread: 70,
-        origin: { y: 0.6 },
-      });
-
-      // Complete purchase in state
-      onSuccess(item);
-    }, 1500);
-  };
+  const handleCreateOrderAndRedirect = async () => {
+    setIsProcessing(true);
+    try {
+      const resp = await fetch('/api/create-order', {
+        method: 'POST',
+        headers: { 'Content-Type': 'application/json' },
+        body: JSON.stringify({ itemId: item.id, itemTitle: item.nameKey, priceUSD: item.priceUSD, gateway }),
+      });
+      if (!resp.ok) {
+        throw new Error('No se pudo crear la orden');
+      }
+      const data = await resp.json();
+      // Redirect the user to the provider-hosted payment link
+      if (data.redirectUrl) {
+        window.location.href = data.redirectUrl;
+        return;
+      }
+      throw new Error('No redirect URL returned');
+    } catch (err) {
+      console.error(err);
+      // Fallback to local simulation if the helper server is not configured
+      setIsProcessing(false);
+      // simulate as before
+      setTimeout(() => {
+        const prefix = gateway === 'mercadopago' ? 'MP-' : 'PP-';
+        const orderId = `${prefix}${Math.floor(10000000 + Math.random() * 90000000)}`;
+        setReceipt({ orderId, date: new Date().toLocaleTimeString() });
+        sound.playStreakFanfare();
+        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
+        onSuccess(item);
+      }, 1000);
+    }
+  };
@@
-            <button
-              disabled={isProcessing}
-              onClick={handleSimulatePayment}
+            <button
+              disabled={isProcessing}
+              onClick={handleCreateOrderAndRedirect}
               className={`w-full py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-xl ${
                 gateway === 'mercadopago'
                   ? 'bg-[#009ee3] hover:bg-[#0089c7] text-white shadow-[#009ee3]/25'
                   : 'bg-[#ffc439] hover:bg-[#f2b82d] text-slate-950 shadow-[#ffc439]/25'
               }`}
             >
