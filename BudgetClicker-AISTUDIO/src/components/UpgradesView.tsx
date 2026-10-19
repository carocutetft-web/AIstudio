import React, { useState } from 'react';
import { GameState, AutoSaver, ClickUpgrade, Language } from '../types/game';
import { AUTO_SAVERS, CLICK_UPGRADES } from '../data/gameData';
import { TRANSLATIONS } from '../i18n/translations';
import { formatMoney, formatRate } from '../utils/numberFormat';
import {
  Coins,
  PiggyBank,
  CalendarCheck2,
  TrendingUp,
  Leaf,
  Building2,
  Cpu,
  Sparkles,
  BookOpen,
  Smartphone,
  Utensils,
  CreditCard,
  Brain,
  ArrowUpRight,
  Zap,
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Props {
  state: GameState;
  onBuyAutoSaver: (saverId: string, cost: number) => void;
  onBuyClickUpgrade: (upgradeId: string, cost: number) => void;
  lang: Language;
}

export const UpgradesView: React.FC<Props> = ({
  state,
  onBuyAutoSaver,
  onBuyClickUpgrade,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'passive' | 'click'>('passive');
  const t = TRANSLATIONS[lang];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coins': return <Coins className="w-5 h-5 text-amber-400" />;
      case 'PiggyBank': return <PiggyBank className="w-5 h-5 text-rose-400" />;
      case 'CalendarCheck2': return <CalendarCheck2 className="w-5 h-5 text-emerald-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-cyan-400" />;
      case 'Leaf': return <Leaf className="w-5 h-5 text-emerald-400" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-yellow-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-emerald-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-sky-400" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-orange-400" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-indigo-400" />;
      case 'Brain': return <Brain className="w-5 h-5 text-pink-400" />;
      default: return <Coins className="w-5 h-5 text-slate-400" />;
    }
  };

  const getAutoSaverCost = (saver: AutoSaver, currentLevel: number): number => {
    return Math.floor(saver.baseCost * Math.pow(saver.growthRate, currentLevel));
  };

  const getClickUpgradeCost = (upgrade: ClickUpgrade, currentLevel: number): number => {
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.growthRate, currentLevel));
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-6">
      {/* Sub-tab pills */}
      <div className="flex bg-slate-900/80 p-1 rounded-2xl border border-slate-800 mb-4 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('passive')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'passive'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{t.tab_habits}</span>
        </button>

        <button
          onClick={() => setActiveTab('click')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'click'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{t.tab_discipline}</span>
        </button>
      </div>

      {/* Passive Habits Section */}
      {activeTab === 'passive' && (
        <div className="space-y-3">
          <div className="text-left px-2 mb-2">
            <h2 className="text-base font-bold text-white">{t.habits_header}</h2>
            <p className="text-xs text-slate-400">{t.habits_desc}</p>
          </div>

          {AUTO_SAVERS.map((saver) => {
            const currentLevel = state.autoSavers[saver.id] || 0;
            const cost = getAutoSaverCost(saver, currentLevel);
            const canAfford = state.balance >= cost;
            const title = t[saver.nameKey] || saver.id;
            const desc = t[saver.descKey] || '';
            const currentTotalIncome = (currentLevel * saver.baseIncome * (state.customizations.vipPass ? 1.5 : 1)).toFixed(1);

            return (
              <div
                key={saver.id}
                className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center shrink-0">
                    {getIcon(saver.icon)}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{title}</h3>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {t.level_label} {currentLevel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{desc}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] font-mono">
                      <span className="text-emerald-400">
                        +{saver.baseIncome.toFixed(1)}{t.per_second}
                      </span>
                      {currentLevel > 0 && (
                        <span className="text-slate-500">
                          (Total: +{currentTotalIncome}{t.per_second})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  disabled={!canAfford}
                  onClick={() => {
                    if (canAfford) {
                      sound.playPurchase();
                      onBuyAutoSaver(saver.id, cost);
                    }
                  }}
                  className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
                    canAfford
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/20 active:scale-95'
                      : 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700/40'
                  }`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{formatMoney(cost, lang, { compact: cost >= 1000000 })}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Click Discipline Section */}
      {activeTab === 'click' && (
        <div className="space-y-3">
          <div className="text-left px-2 mb-2">
            <h2 className="text-base font-bold text-white">{t.discipline_header}</h2>
            <p className="text-xs text-slate-400">{t.discipline_desc}</p>
          </div>

          {CLICK_UPGRADES.map((upgrade) => {
            const currentLevel = state.clickUpgrades[upgrade.id] || 0;
            const cost = getClickUpgradeCost(upgrade, currentLevel);
            const canAfford = state.balance >= cost;
            const title = t[upgrade.nameKey] || upgrade.id;
            const desc = t[upgrade.descKey] || '';
            const totalBonus = (currentLevel * upgrade.clickBonus).toFixed(1);

            return (
              <div
                key={upgrade.id}
                className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center shrink-0">
                    {getIcon(upgrade.icon)}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{title}</h3>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {t.level_label} {currentLevel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{desc}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] font-mono">
                      <span className="text-cyan-400">
                        +{upgrade.clickBonus.toFixed(1)} {t.tap_power_label}
                      </span>
                      {currentLevel > 0 && (
                        <span className="text-slate-500">
                          (Total: +{totalBonus})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  disabled={!canAfford}
                  onClick={() => {
                    if (canAfford) {
                      sound.playPurchase();
                      onBuyClickUpgrade(upgrade.id, cost);
                    }
                  }}
                  className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
                    canAfford
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/20 active:scale-95'
                      : 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700/40'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{formatMoney(cost, lang, { compact: cost >= 1000000 })}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
