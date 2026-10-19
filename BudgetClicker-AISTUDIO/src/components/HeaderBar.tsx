import React from 'react';
import { GameState, Language } from '../types/game';
import { PWAInstallButton } from './PWAInstallButton';
import { sound } from '../utils/audio';
import {
  Flame,
  Gem,
  Volume2,
  VolumeX,
  Languages,
  ShoppingBag,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';

import { formatRate } from '../utils/numberFormat';
import { Image as ImageIcon } from 'lucide-react';

interface Props {
  state: GameState;
  passiveRate: number;
  onOpenStore: () => void;
  onOpenStreak: () => void;
  onOpenWallpapers?: () => void;
  onToggleSound: () => void;
  onToggleLanguage: () => void;
}

export const HeaderBar: React.FC<Props> = ({
  state,
  passiveRate,
  onOpenStore,
  onOpenStreak,
  onOpenWallpapers,
  onToggleSound,
  onToggleLanguage,
}) => {
  const t = TRANSLATIONS[state.language];

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80 px-3 sm:px-6 py-2.5 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Brand & Title */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-0.5 shadow-md shadow-pink-500/20 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-lg">
              🐷
            </div>
          </div>
          <div className="hidden xs:block sm:block text-left">
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-base font-black tracking-tight text-white leading-tight">
                {t.app_title}
              </h1>
              {state.customizations.vipPass && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  VIP
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              {t.app_subtitle}
            </p>
          </div>
        </div>

        {/* Center: Passive Rate & Gems */}
        <div className="flex items-center gap-2">
          {/* Passive income pill */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>{formatRate(passiveRate, state.language)}</span>
          </div>

          {/* Gems counter with + button */}
          <button
            onClick={onOpenStore}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-sky-950/60 hover:bg-sky-900/60 border border-sky-500/30 text-sky-200 text-xs font-mono font-bold transition active:scale-95 cursor-pointer shadow-sm"
            title={t.store_btn}
          >
            <Gem className="w-3.5 h-3.5 text-sky-400 fill-sky-400/40 animate-pulse" />
            <span>{state.gems}</span>
            <span className="text-[10px] bg-sky-500/30 px-1 rounded text-sky-300">+</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          {/* Wallpapers Button */}
          {onOpenWallpapers && (
            <button
              onClick={onOpenWallpapers}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-purple-300 border border-purple-500/30 text-xs font-bold transition active:scale-95 cursor-pointer"
              title={state.language === 'es' ? 'Fondos del Juego' : 'Game Wallpapers'}
            >
              <ImageIcon className="w-4 h-4" />
            </button>
          )}

          {/* Daily Streak Button */}
          <button
            onClick={onOpenStreak}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition active:scale-95 cursor-pointer"
            title={t.daily_streak_btn}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
            <span className="font-mono">{state.streak.currentStreak}</span>
            <span className="hidden md:inline text-[11px] font-normal">{t.streak_days}</span>
          </button>

          {/* VIP Store Button */}
          <button
            onClick={onOpenStore}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-purple-600/40 to-pink-600/40 hover:from-purple-600/60 hover:to-pink-600/60 text-purple-200 border border-purple-500/40 text-xs font-bold transition active:scale-95 cursor-pointer"
            title={t.store_btn}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">{t.store_btn}</span>
          </button>

          {/* Language toggle */}
          <button
            onClick={onToggleLanguage}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700 text-xs font-bold transition active:scale-95 cursor-pointer"
            title="Toggle Language (ES / EN)"
          >
            <span className="text-[11px] font-mono px-0.5 uppercase">{state.language}</span>
          </button>

          {/* Sound toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700 text-xs transition active:scale-95 cursor-pointer"
            title="Toggle Sound"
          >
            {state.customizations.soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>

          {/* PWA Install */}
          <PWAInstallButton lang={state.language} />
        </div>
      </div>
    </header>
  );
};
