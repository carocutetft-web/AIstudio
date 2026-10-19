import React, { useState } from 'react';
import { GameState, Language, AchievementCategory } from '../types/game';
import { ACHIEVEMENTS } from '../data/achievementsData';
import { TRANSLATIONS } from '../i18n/translations';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Trophy,
  MousePointerClick,
  DollarSign,
  TrendingUp,
  Flame,
  HeartHandshake,
  Target,
  Sparkles,
  Gift,
  CheckCircle2,
  Lock,
  Gem,
  Award,
} from 'lucide-react';

interface Props {
  state: GameState;
  onClaimAchievement: (achId: string, cashReward: number, gemReward: number) => void;
  lang: Language;
}

export const AchievementsView: React.FC<Props> = ({
  state,
  onClaimAchievement,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'claimable' | 'completed' | 'locked'>('all');

  const unlockedIds = state.unlockedAchievements || [];

  const getCategoryIcon = (cat: AchievementCategory) => {
    switch (cat) {
      case 'clicks': return <MousePointerClick className="w-3.5 h-3.5" />;
      case 'wealth': return <DollarSign className="w-3.5 h-3.5" />;
      case 'income': return <TrendingUp className="w-3.5 h-3.5" />;
      case 'streaks': return <Flame className="w-3.5 h-3.5" />;
      case 'real_savings': return <HeartHandshake className="w-3.5 h-3.5" />;
      case 'goals': return <Target className="w-3.5 h-3.5" />;
      case 'collection': return <Sparkles className="w-3.5 h-3.5" />;
      case 'minievents': return <Gift className="w-3.5 h-3.5" />;
      default: return <Award className="w-3.5 h-3.5" />;
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">💎 DIAMOND</span>;
      case 'platinum':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-purple-400/20 text-purple-300 border border-purple-400/40">👑 PLATINUM</span>;
      case 'gold':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/40">🥇 GOLD</span>;
      case 'silver':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-slate-300/20 text-slate-200 border border-slate-400/40">🥈 SILVER</span>;
      default:
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-700/20 text-amber-500 border border-amber-700/40">🥉 BRONZE</span>;
    }
  };

  // Filter achievements
  const filtered = ACHIEVEMENTS.filter((ach) => {
    if (selectedCategory !== 'all' && ach.category !== selectedCategory) return false;
    const isMet = ach.checkUnlocked(state);
    const isClaimed = unlockedIds.includes(ach.id);

    if (filterStatus === 'claimable') return isMet && !isClaimed;
    if (filterStatus === 'completed') return isClaimed;
    if (filterStatus === 'locked') return !isMet;
    return true;
  });

  const totalCompleted = unlockedIds.length;
  const overallPct = Math.floor((totalCompleted / ACHIEVEMENTS.length) * 100);

  const handleClaim = (achId: string, cash: number, gems: number) => {
    sound.playStreakFanfare();
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.6 },
    });
    onClaimAchievement(achId, cash, gems);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 pb-8 text-left">
      {/* Header with Global Mastery Bar */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/30 rounded-3xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Trophy className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                {lang === 'es' ? 'Gran Bóveda de Logros' : 'Grand Achievement Vault'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'es'
                  ? 'Más de 100 hitos para desbloquear a lo largo de tu viaje'
                  : 'Over 100 milestones to conquer across your savings journey'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono font-bold text-amber-300">
              {totalCompleted} / {ACHIEVEMENTS.length}
            </span>
            <span className="text-[10px] text-slate-500 block">({overallPct}%)</span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 transition-all duration-300"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: lang === 'es' ? 'Todos' : 'All', icon: <Trophy className="w-3.5 h-3.5" /> },
          { id: 'clicks', label: lang === 'es' ? 'Toques' : 'Taps', icon: <MousePointerClick className="w-3.5 h-3.5" /> },
          { id: 'wealth', label: lang === 'es' ? 'Patrimonio' : 'Wealth', icon: <DollarSign className="w-3.5 h-3.5" /> },
          { id: 'income', label: lang === 'es' ? 'Renta/s' : 'Yield/s', icon: <TrendingUp className="w-3.5 h-3.5" /> },
          { id: 'real_savings', label: lang === 'es' ? 'Vida Real' : 'Real Life', icon: <HeartHandshake className="w-3.5 h-3.5" /> },
          { id: 'streaks', label: lang === 'es' ? 'Rachas' : 'Streaks', icon: <Flame className="w-3.5 h-3.5" /> },
          { id: 'goals', label: lang === 'es' ? 'Metas' : 'Goals', icon: <Target className="w-3.5 h-3.5" /> },
          { id: 'collection', label: lang === 'es' ? 'Colección' : 'Catalog', icon: <Sparkles className="w-3.5 h-3.5" /> },
          { id: 'minievents', label: lang === 'es' ? 'Eventos' : 'Events', icon: <Gift className="w-3.5 h-3.5" /> },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as typeof selectedCategory)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Achievement Cards List */}
      <div className="space-y-2.5">
        {filtered.map((ach) => {
          const isMet = ach.checkUnlocked(state);
          const isClaimed = unlockedIds.includes(ach.id);
          const prog = ach.getProgress(state);
          const title = t[ach.titleKey] || ach.id;
          const desc = t[ach.descKey] || '';

          return (
            <div
              key={ach.id}
              className={`p-3.5 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isClaimed
                  ? 'bg-slate-900/40 border-slate-800/80 opacity-75'
                  : isMet
                  ? 'bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border-amber-400 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/70 border-slate-800/90'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    isClaimed
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                      : isMet
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 animate-pulse'
                      : 'bg-slate-800 border-slate-700 text-slate-500'
                  }`}
                >
                  {isClaimed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : isMet ? (
                    <Trophy className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-500" />
                  )}
                </div>

                <div className="text-left flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">{title}</h4>
                    {getTierBadge(ach.tier)}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{desc}</p>

                  {/* Micro Progress Bar */}
                  {!isClaimed && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-amber-400 transition-all duration-200"
                          style={{ width: `${prog.percent}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {prog.current.toLocaleString()} / {prog.target.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="sm:self-center shrink-0">
                {isClaimed ? (
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{lang === 'es' ? 'Completado' : 'Claimed'}</span>
                  </span>
                ) : isMet ? (
                  <button
                    onClick={() => handleClaim(ach.id, ach.rewardCash, ach.rewardGems)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/25 transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>{lang === 'es' ? 'Reclamar' : 'Claim'}</span>
                    <span className="text-[10px] text-slate-900 font-mono">
                      (+${ach.rewardCash} & +{ach.rewardGems} 💎)
                    </span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                    <span>+${ach.rewardCash}</span>
                    <span className="text-sky-400">+{ach.rewardGems} 💎</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
