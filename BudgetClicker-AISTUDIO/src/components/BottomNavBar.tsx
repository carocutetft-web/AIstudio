import React from 'react';
import { Language } from '../types/game';
import { TRANSLATIONS } from '../i18n/translations';
import { Coins, TrendingUp, Target, Trophy, BarChart3 } from 'lucide-react';

export type NavigationTab = 'budget' | 'habits' | 'goals' | 'achievements' | 'stats';

interface Props {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  lang: Language;
}

export const BottomNavBar: React.FC<Props> = ({ activeTab, onTabChange, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <nav className="fixed bottom-3 inset-x-0 mx-auto max-w-sm sm:max-w-lg px-2 z-30">
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-1.5 shadow-2xl flex items-center justify-around">
        <button
          onClick={() => onTabChange('budget')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl text-[10px] sm:text-[11px] font-bold transition cursor-pointer ${
            activeTab === 'budget'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>{t.tab_clicker}</span>
        </button>

        <button
          onClick={() => onTabChange('habits')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl text-[10px] sm:text-[11px] font-bold transition cursor-pointer ${
            activeTab === 'habits'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{t.tab_habits}</span>
        </button>

        <button
          onClick={() => onTabChange('goals')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl text-[10px] sm:text-[11px] font-bold transition cursor-pointer ${
            activeTab === 'goals'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>{t.tab_goals}</span>
        </button>

        <button
          onClick={() => onTabChange('achievements')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl text-[10px] sm:text-[11px] font-bold transition cursor-pointer ${
            activeTab === 'achievements'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>{t.tab_achievements}</span>
        </button>

        <button
          onClick={() => onTabChange('stats')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl text-[10px] sm:text-[11px] font-bold transition cursor-pointer ${
            activeTab === 'stats'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>{t.tab_stats}</span>
        </button>
      </div>
    </nav>
  );
};
