import React, { useState } from 'react';
import { FinancialDilemma, Language } from '../types/game';
import { TRANSLATIONS } from '../i18n/translations';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Brain, Sparkles, CheckCircle2, ArrowRight, DollarSign, Gem } from 'lucide-react';

interface Props {
  dilemma: FinancialDilemma;
  tapPower: number;
  onChoice: (dilemmaId: string, reward: { cash: number; gems: number }) => void;
  onClose: () => void;
  lang: Language;
}

export const DilemmaModal: React.FC<Props> = ({
  dilemma,
  tapPower,
  onChoice,
  onClose,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const title = t[dilemma.titleKey] || 'Dilema Financiero';
  const prompt = t[dilemma.promptKey] || '¿Qué harías en esta situación?';

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    const opt = dilemma.options[idx];
    const cashReward = Number((opt.cashRewardMultiplier * Math.max(10, tapPower)).toFixed(2));

    if (opt.isMindful) {
      sound.playStreakFanfare();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } else {
      sound.playPurchase();
    }

    onChoice(dilemma.id, {
      cash: cashReward,
      gems: opt.gemReward,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in text-left">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-purple-500/40 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Brain className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-wider text-purple-400 uppercase">
              {lang === 'es' ? 'Decisión Financiera' : 'Financial Dilemma'}
            </span>
            <h3 className="text-base font-black text-white">{title}</h3>
          </div>
        </div>

        {/* Prompt */}
        <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed bg-slate-800/50 p-3 rounded-2xl border border-slate-700/60">
          {prompt}
        </p>

        {/* Options */}
        {selectedIdx === null ? (
          <div className="space-y-2.5">
            {dilemma.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className="w-full p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-semibold text-left transition hover:border-purple-400 flex items-center justify-between group active:scale-98 cursor-pointer"
              >
                <span>{t[opt.textKey] || `Opción ${idx + 1}`}</span>
                <ArrowRight className="w-4 h-4 text-purple-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition shrink-0 ml-2" />
              </button>
            ))}
          </div>
        ) : (
          /* Feedback view */
          <div className="space-y-4 animate-fade-in">
            <div className={`p-4 rounded-2xl border ${
              dilemma.options[selectedIdx].isMindful
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs mb-1">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  {dilemma.options[selectedIdx].isMindful
                    ? (lang === 'es' ? '¡Excelente Decisión Frugal!' : 'Great Mindful Choice!')
                    : (lang === 'es' ? 'Gasto Tentador' : 'Tempting Expense')}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                {t[dilemma.options[selectedIdx].feedbackKey] || 'Decisión registrada.'}
              </p>
            </div>

            <div className="flex items-center justify-around p-3 rounded-xl bg-slate-800/60 border border-slate-700 font-mono text-xs font-bold">
              <span className="text-emerald-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" />
                +${(dilemma.options[selectedIdx].cashRewardMultiplier * Math.max(10, tapPower)).toFixed(0)}
              </span>
              {dilemma.options[selectedIdx].gemReward > 0 && (
                <span className="text-sky-400 flex items-center gap-1">
                  <Gem className="w-3.5 h-3.5" />
                  +{dilemma.options[selectedIdx].gemReward} Gems
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/25 transition cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
