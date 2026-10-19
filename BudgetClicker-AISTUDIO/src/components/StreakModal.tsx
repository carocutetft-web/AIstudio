import React from 'react';
import { GameState, Language } from '../types/game';
import { STREAK_DAYS } from '../data/gameData';
import { TRANSLATIONS } from '../i18n/translations';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Flame, X, Check, Gem, Coins, Gift, Sparkles } from 'lucide-react';

interface Props {
  state: GameState;
  onClaimStreak: (dayIndex: number, cash: number, gems: number) => void;
  onClose: () => void;
  lang: Language;
}

export const StreakModal: React.FC<Props> = ({
  state,
  onClaimStreak,
  onClose,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const todayStr = new Date().toISOString().slice(0, 10);
  const alreadyClaimedToday = state.streak.lastClaimDate === todayStr;

  // Determine current day in 7-day cycle (0 to 6)
  const currentCycleDay = state.streak.currentStreak % 7;
  // If already claimed, today's completed index is (currentCycleDay - 1 + 7) % 7
  const claimableIndex = alreadyClaimedToday ? -1 : currentCycleDay;

  const handleClaim = () => {
    if (alreadyClaimedToday) return;

    const reward = STREAK_DAYS[currentCycleDay];
    sound.playStreakFanfare();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
    });
    onClaimStreak(currentCycleDay, reward.cash, reward.gems);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700/80 p-5 sm:p-6 shadow-2xl relative text-left overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Flame className="w-6 h-6 fill-amber-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white">
              {t.streak_modal_title}
            </h3>
            <p className="text-xs text-slate-400">
              {t.streak_modal_desc}
            </p>
          </div>
        </div>

        {/* Streak Counter Pill */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 mb-4">
          <span className="text-xs font-semibold text-slate-300">
            {t.current_streak_text}
          </span>
          <span className="flex items-center gap-1.5 font-mono font-black text-sm text-amber-400">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>{state.streak.currentStreak} {t.streak_days}</span>
          </span>
        </div>

        {/* 7-Day Matrix */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-5">
          {STREAK_DAYS.map((reward, idx) => {
            const isClaimedPast =
              alreadyClaimedToday
                ? idx <= (currentCycleDay - 1 + 7) % 7 && state.streak.currentStreak > 0
                : idx < currentCycleDay;
            const isToday = idx === claimableIndex;

            return (
              <div
                key={reward.day}
                className={`flex flex-col items-center justify-between p-2 rounded-2xl border text-center transition-all ${
                  idx === 6 ? 'col-span-2 sm:col-span-1' : ''
                } ${
                  isClaimedPast
                    ? 'bg-slate-800/40 border-emerald-500/30 text-emerald-300'
                    : isToday
                    ? 'bg-gradient-to-b from-amber-500/25 to-slate-800 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-slate-800/30 border-slate-800 text-slate-500 opacity-70'
                }`}
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  D{reward.day}
                </span>

                <div className="my-1.5 flex flex-col items-center">
                  {isClaimedPast ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : idx === 6 ? (
                    <Gift className={`w-6 h-6 ${isToday ? 'text-amber-400 animate-bounce' : 'text-slate-500'}`} />
                  ) : (
                    <Coins className={`w-5 h-5 ${isToday ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
                  )}
                </div>

                <div className="text-[10px] font-mono font-bold leading-tight">
                  <div className="text-white">+${reward.cash}</div>
                  <div className="text-sky-400 flex items-center justify-center gap-0.5">
                    <Gem className="w-2.5 h-2.5" />
                    <span>+{reward.gems}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Claim button */}
        {!alreadyClaimedToday ? (
          <button
            onClick={handleClaim}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black text-sm shadow-xl shadow-amber-500/25 transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-200" />
            <span>{t.claim_reward_btn}</span>
          </button>
        ) : (
          <div className="text-center py-2.5 px-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs font-semibold text-slate-400 flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{t.already_claimed_today}</span>
          </div>
        )}
      </div>
    </div>
  );
};
