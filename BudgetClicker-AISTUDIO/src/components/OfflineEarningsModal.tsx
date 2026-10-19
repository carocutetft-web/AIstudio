import React from 'react';
import { Language } from '../types/game';
import { TRANSLATIONS } from '../i18n/translations';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Clock, TrendingUp, CheckCircle } from 'lucide-react';

interface Props {
  offlineSeconds: number;
  earned: number;
  onClaim: () => void;
  lang: Language;
}

export const OfflineEarningsModal: React.FC<Props> = ({
  offlineSeconds,
  earned,
  onClaim,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  const hours = Math.floor(offlineSeconds / 3600);
  const minutes = Math.floor((offlineSeconds % 3600) / 60);

  const timeFormatted =
    hours > 0 ? `${hours}h ${minutes}m` : `${Math.max(1, minutes)}m`;

  const handleClaim = () => {
    sound.playStreakFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    onClaim();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in text-center">
      <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 mb-3 shadow-lg">
          <TrendingUp className="w-7 h-7 animate-pulse" />
        </div>

        <h3 className="text-lg font-black text-white mb-1">
          {t.welcome_back_title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          {t.welcome_back_desc}
        </p>

        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 mb-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{t.offline_time_elapsed}</span>
            </span>
            <span className="font-mono font-bold text-white">{timeFormatted}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300 font-semibold">{t.offline_earned_amount}</span>
            <span className="text-lg font-mono font-black text-emerald-400">
              +${earned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <button
          onClick={handleClaim}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-sm shadow-xl shadow-emerald-500/25 transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-emerald-200" />
          <span>{t.claim_offline_btn}</span>
        </button>
      </div>
    </div>
  );
};
