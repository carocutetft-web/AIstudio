import React, { useState } from 'react';
import { GameState } from '../types/game';
import { TRANSLATIONS } from '../i18n/translations';
import { formatMoney, formatRate } from '../utils/numberFormat';
import { Coins, Zap, TrendingUp, Info } from 'lucide-react';

interface Props {
  state: GameState;
  tapPower: number;
  passiveRate: number;
  frenzyMultiplier: number;
}

export const VaultBalanceHeader: React.FC<Props> = ({
  state,
  tapPower,
  passiveRate,
  frenzyMultiplier,
}) => {
  const [showFullDigits, setShowFullDigits] = useState(false);
  const t = TRANSLATIONS[state.language];

  const formattedBalance = formatMoney(state.balance, state.language, {
    compact: !showFullDigits,
    fullPrecision: showFullDigits,
  });

  return (
    <section className="mb-3 sm:mb-5 text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700/60 text-slate-300 text-xs font-semibold mb-2 shadow-sm">
        <Coins className="w-3.5 h-3.5 text-amber-400" />
        <span>{t.balance_label}</span>
      </div>

      {/* Main Balance Display with Tap-to-expand full digits toggle */}
      <button
        onClick={() => setShowFullDigits((prev) => !prev)}
        title={state.language === 'es' ? 'Toca para ver dígitos completos / compactos' : 'Tap to toggle compact / full digits'}
        className="group inline-flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-98 mx-auto"
      >
        <span className="text-3xl sm:text-5xl font-mono font-black tracking-tight text-white flex items-center justify-center gap-1 group-hover:text-emerald-300 transition-colors">
          <span>{formattedBalance}</span>
        </span>
        {state.balance >= 1_000_000 && (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 group-hover:border-emerald-500/50">
            {showFullDigits ? '123' : '1.2M'}
          </span>
        )}
      </button>

      {/* Sub-stats: Tap Power & Passive Income */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2 text-xs font-medium text-slate-400">
        <span className="flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>
            {t.tap_power_label}:{' '}
            <strong className="text-white font-mono">
              {formatMoney(tapPower, state.language, { compact: true })}
            </strong>
          </span>
        </span>
        <span className="text-slate-600">•</span>
        <span className="flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {t.per_second}:{' '}
            <strong className="text-emerald-400 font-mono">
              {formatRate(passiveRate, state.language)}
            </strong>
          </span>
        </span>

        {frenzyMultiplier > 1 && (
          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-300 border border-rose-500 font-bold animate-pulse text-[11px] shadow-sm shadow-rose-500/30">
            x{frenzyMultiplier} FRENZY!
          </span>
        )}
      </div>
    </section>
  );
};
