import React, { useState } from 'react';
import { StoreItem, Language } from '../types/game';
import { TRANSLATIONS } from '../i18n/translations';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Wallet,
  CheckCircle2,
  Loader2,
  Lock,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface Props {
  item: StoreItem;
  onSuccess: (item: StoreItem) => void;
  onClose: () => void;
  lang: Language;
}

export const CheckoutModal: React.FC<Props> = ({
  item,
  onSuccess,
  onClose,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const [gateway, setGateway] = useState<'mercadopago' | 'paypal'>('mercadopago');
  const [mpMethod, setMpMethod] = useState<'card' | 'wallet' | 'qr'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<{ orderId: string; date: string } | null>(null);

  // Card form state
  const [cardNumber, setCardNumber] = useState('4532 8900 1234 5678');
  const [cardHolder, setCardHolder] = useState('JUAN PEREZ');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('892');
  const [installments, setInstallments] = useState('1');

  const handleSimulatePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const prefix = gateway === 'mercadopago' ? 'MP-' : 'PP-';
      const orderId = `${prefix}${Math.floor(10000000 + Math.random() * 90000000)}`;
      setReceipt({
        orderId,
        date: new Date().toLocaleTimeString(),
      });

      sound.playStreakFanfare();
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Complete purchase in state
      onSuccess(item);
    }, 1500);
  };

  const itemTitle = t[item.nameKey] || item.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in text-left">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-1">
          <Lock className="w-4 h-4 text-emerald-400" />
          <h2 className="text-base sm:text-lg font-black text-white">
            {t.checkout_title}
          </h2>
        </div>
        <p className="text-xs text-slate-400 mb-4">{t.checkout_subtitle}</p>

        {/* Order Summary Box */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/70 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
              style={{ backgroundColor: item.previewColor || '#3b82f6' }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{itemTitle}</h4>
              <p className="text-[11px] text-slate-400">{item.badge || 'VIP Digital Asset'}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">{t.total_to_pay}</span>
            <span className="text-lg font-mono font-black text-emerald-400">
              ${item.priceUSD.toFixed(2)} USD
            </span>
          </div>
        </div>

        {/* Success Receipt State */}
        {receipt ? (
          <div className="py-6 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">{t.purchase_successful}</h3>
              <p className="text-xs text-slate-400 mt-1">
                {t.order_id} <span className="font-mono text-emerald-300 font-bold">{receipt.orderId}</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-sm shadow-xl shadow-emerald-500/20 transition cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        ) : (
          <>
            {/* Gateway Selectors */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {/* Mercado Pago Button */}
              <button
                type="button"
                onClick={() => setGateway('mercadopago')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                  gateway === 'mercadopago'
                    ? 'bg-[#009ee3]/15 border-[#009ee3] shadow-md shadow-[#009ee3]/20 ring-1 ring-[#009ee3]'
                    : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                  <div className="w-4 h-4 rounded-full bg-[#009ee3] flex items-center justify-center text-[10px] text-white font-black">
                    MP
                  </div>
                  <span>Mercado Pago</span>
                </div>
                <span className="text-[10px] text-sky-300 font-medium">
                  {lang === 'es' ? 'Tarjetas, QR & Dinero en cuenta' : 'Cards, QR & Balance'}
                </span>
              </button>

              {/* PayPal Button */}
              <button
                type="button"
                onClick={() => setGateway('paypal')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                  gateway === 'paypal'
                    ? 'bg-[#ffc439]/15 border-[#ffc439] shadow-md shadow-[#ffc439]/20 ring-1 ring-[#ffc439]'
                    : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                  <span className="font-extrabold text-[#003087]">Pay</span>
                  <span className="font-extrabold text-[#0079c1]">Pal</span>
                </div>
                <span className="text-[10px] text-amber-300 font-medium">
                  {lang === 'es' ? 'Saldo, Tarjetas o Cuotas' : 'Balance, Cards & Pay in 4'}
                </span>
              </button>
            </div>

            {/* Mercado Pago Flow */}
            {gateway === 'mercadopago' && (
              <div className="space-y-3.5 mb-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                {/* Method selector inside MP */}
                <div className="flex gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-700/60">
                  <button
                    onClick={() => setMpMethod('card')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                      mpMethod === 'card' ? 'bg-[#009ee3] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>{lang === 'es' ? 'Tarjeta' : 'Card'}</span>
                  </button>
                  <button
                    onClick={() => setMpMethod('wallet')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                      mpMethod === 'wallet' ? 'bg-[#009ee3] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    <span>{lang === 'es' ? 'Cuenta MP' : 'MP Wallet'}</span>
                  </button>
                  <button
                    onClick={() => setMpMethod('qr')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                      mpMethod === 'qr' ? 'bg-[#009ee3] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{lang === 'es' ? 'QR / Pix' : 'QR / Pix'}</span>
                  </button>
                </div>

                {mpMethod === 'card' && (
                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="text-[11px] text-slate-400 mb-1 block">
                        {lang === 'es' ? 'Número de tarjeta' : 'Card number'}
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-[#009ee3]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 mb-1 block">
                        {lang === 'es' ? 'Nombre en la tarjeta' : 'Cardholder name'}
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white uppercase focus:outline-none focus:border-[#009ee3]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-slate-400 mb-1 block">Vencimiento</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-[#009ee3]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 mb-1 block">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-[#009ee3]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 mb-1 block">
                        {lang === 'es' ? 'Cuotas disponibles' : 'Installments'}
                      </label>
                      <select
                        value={installments}
                        onChange={(e) => setInstallments(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-[#009ee3]"
                      >
                        <option value="1">1x ${(item.priceUSD).toFixed(2)} USD</option>
                        <option value="3">3x ${(item.priceUSD / 3).toFixed(2)} USD {lang === 'es' ? 'sin interés' : 'interest-free'}</option>
                        <option value="6">6x ${(item.priceUSD / 6).toFixed(2)} USD</option>
                      </select>
                    </div>
                  </div>
                )}

                {mpMethod === 'wallet' && (
                  <div className="p-3 text-center space-y-2">
                    <div className="text-xs text-slate-300">
                      {lang === 'es'
                        ? 'Paga al instante con tu dinero disponible en tu cuenta de Mercado Pago.'
                        : 'Pay instantly with your available Mercado Pago wallet balance.'}
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-mono text-emerald-400 font-bold">
                      {lang === 'es' ? 'Saldo disponible simulado: $250.00 USD' : 'Simulated balance: $250.00 USD'}
                    </div>
                  </div>
                )}

                {mpMethod === 'qr' && (
                  <div className="p-2 text-center space-y-2">
                    <div className="w-32 h-32 bg-white rounded-xl mx-auto p-2 flex items-center justify-center shadow-lg">
                      {/* SVG QR Code Simulation */}
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <rect width="100" height="100" fill="#ffffff" />
                        <rect x="10" y="10" width="25" height="25" fill="#000000" />
                        <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
                        <rect x="18" y="18" width="9" height="9" fill="#000000" />
                        <rect x="65" y="10" width="25" height="25" fill="#000000" />
                        <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
                        <rect x="73" y="18" width="9" height="9" fill="#000000" />
                        <rect x="10" y="65" width="25" height="25" fill="#000000" />
                        <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
                        <rect x="18" y="73" width="9" height="9" fill="#000000" />
                        <rect x="42" y="15" width="8" height="8" fill="#000000" />
                        <rect x="42" y="35" width="16" height="8" fill="#000000" />
                        <rect x="42" y="65" width="8" height="20" fill="#000000" />
                        <rect x="65" y="45" width="12" height="12" fill="#000000" />
                        <rect x="75" y="70" width="15" height="15" fill="#000000" />
                      </svg>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {lang === 'es'
                        ? 'Escanea con la app de Mercado Pago para acreditar de inmediato'
                        : 'Scan with Mercado Pago or Pix camera to authorize instantly'}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#009ee3]" />
                  <span>{t.mp_guarantee}</span>
                </div>
              </div>
            )}

            {/* PayPal Flow */}
            {gateway === 'paypal' && (
              <div className="space-y-3 mb-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 text-center space-y-2">
                  <div className="text-xs font-semibold text-slate-200">
                    {t.paypal_instant}
                  </div>
                  <div className="inline-block px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-400/40">
                    {t.paypal_payin4}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ffc439]" />
                  <span>
                    {lang === 'es'
                      ? 'Transacción cifrada de 256-bits respaldada por PayPal'
                      : '256-bit encrypted transaction backed by PayPal Purchase Protection'}
                  </span>
                </div>
              </div>
            )}

            {/* Complete Purchase Button */}
            <button
              disabled={isProcessing}
              onClick={handleSimulatePayment}
              className={`w-full py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-xl ${
                gateway === 'mercadopago'
                  ? 'bg-[#009ee3] hover:bg-[#0089c7] text-white shadow-[#009ee3]/25'
                  : 'bg-[#ffc439] hover:bg-[#f2b82d] text-slate-950 shadow-[#ffc439]/25'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.processing_payment}</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>
                    {gateway === 'mercadopago'
                      ? `${lang === 'es' ? 'Pagar con Mercado Pago' : 'Pay with Mercado Pago'} ($${item.priceUSD.toFixed(2)})`
                      : `${lang === 'es' ? 'Pagar con PayPal' : 'Pay with PayPal'} ($${item.priceUSD.toFixed(2)})`}
                  </span>
                </>
              )}
            </button>

            {/* Test / Sandbox Note */}
            <p className="text-[10px] text-slate-500 text-center mt-2.5">
              🛡️ {t.simulate_sandbox_btn}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
