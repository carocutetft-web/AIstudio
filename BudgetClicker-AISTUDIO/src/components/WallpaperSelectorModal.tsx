import React from 'react';
import { GameState, Language, AppWallpaperId } from '../types/game';
import { TRANSLATIONS } from '../i18n/translations';
import { sound } from '../utils/audio';
import { X, Image, Check, Lock, Gem } from 'lucide-react';

interface Props {
  state: GameState;
  onEquipWallpaper: (wallId: AppWallpaperId) => void;
  onUnlockWithGems: (item: any) => void;
  onClose: () => void;
  lang: Language;
}

export const WallpaperSelectorModal: React.FC<Props> = ({
  state,
  onEquipWallpaper,
  onUnlockWithGems,
  onClose,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  const WALLPAPERS_LIST: {
    id: AppWallpaperId;
    nameKey: string;
    descKey: string;
    previewBg: string;
    gemCost: number;
    icon: string;
  }[] = [
    {
      id: 'emerald_vault',
      nameKey: 'Bóveda Esmeralda / Emerald Vault',
      descKey: 'Seguridad máxima con luces esmeralda',
      previewBg: 'from-[#070e17] via-[#0b241b] to-[#04120e]',
      gemCost: 0,
      icon: '💎',
    },
    {
      id: 'synthwave_sunset',
      nameKey: 'Atardecer Synthwave / 80s Sunset',
      descKey: 'Rejilla retro con sol de neón magenta',
      previewBg: 'from-[#1a0733] via-[#3b0764] to-[#f43f5e]',
      gemCost: 45,
      icon: '🌅',
    },
    {
      id: 'aurora',
      nameKey: 'Aurora Boreal / Polar Aurora',
      descKey: 'Ondas celestes polares y cielo estrellado',
      previewBg: 'from-[#040d1a] via-[#064e3b] to-[#0891b2]',
      gemCost: 45,
      icon: '🌌',
    },
    {
      id: 'cyber_city',
      nameKey: 'Ciudad Cyberpunk / Cyber City',
      descKey: 'Rascacielos con lluvia de neón y hologramas',
      previewBg: 'from-[#060813] via-[#1e1b4b] to-[#0284c7]',
      gemCost: 60,
      icon: '🏙️',
    },
    {
      id: 'lofi_room',
      nameKey: 'Habitación Lo-Fi / Cozy Lo-Fi',
      descKey: 'Atardecer cálido, café y ambiente relajante',
      previewBg: 'from-[#170e13] via-[#7c2d12] to-[#ea580c]',
      gemCost: 45,
      icon: '☕',
    },
    {
      id: 'deep_space',
      nameKey: 'Espacio Profundo / Deep Space',
      descKey: 'Nebulosas púrpuras y constelaciones cósmicas',
      previewBg: 'from-[#05030c] via-[#2e1065] to-[#4c1d95]',
      gemCost: 60,
      icon: '🪐',
    },
    {
      id: 'candy_pop',
      nameKey: 'Candy Pop / Pastel Dreams',
      descKey: 'Burbujas flotantes y tonos pastel dulces',
      previewBg: 'from-[#160c19] via-[#831843] to-[#ec4899]',
      gemCost: 45,
      icon: '🍭',
    },
    {
      id: 'tokyo_arcade',
      nameKey: 'Arcade Tokio / Akihabara Night',
      descKey: 'Máquinas retro de 8 bits y luces eléctricas',
      previewBg: 'from-[#0a0514] via-[#4a044e] to-[#e11d48]',
      gemCost: 60,
      icon: '👾',
    },
    {
      id: 'minimal_zen',
      nameKey: 'Jardín Zen / Minimalist Zen',
      descKey: 'Bambú verde relajante y ondas de agua',
      previewBg: 'from-[#09110d] via-[#064e3b] to-[#10b981]',
      gemCost: 45,
      icon: '🎋',
    },
    {
      id: 'wallstreet_trading',
      nameKey: 'Wall Street Trading Floor',
      descKey: 'Gráficos alcistas verdes y velas japonesas',
      previewBg: 'from-[#040e0b] via-[#022c22] to-[#059669]',
      gemCost: 75,
      icon: '📈',
    },
    {
      id: 'gold_palace',
      nameKey: 'Palacio de Oro / Gold Palace',
      descKey: 'Lujo imperial con pan de oro y mármol',
      previewBg: 'from-[#161007] via-[#78350f] to-[#eab308]',
      gemCost: 75,
      icon: '👑',
    },
    {
      id: 'miami_sunrise',
      nameKey: 'Amanecer Miami / Vice Sunrise',
      descKey: 'Palmeras tropicales sobre horizonte turquesa',
      previewBg: 'from-[#12081a] via-[#831843] to-[#06b6d4]',
      gemCost: 60,
      icon: '🌴',
    },
  ];

  const unlocked = state.customizations.unlockedWallpapers || ['emerald_vault', 'synthwave_sunset', 'aurora', 'deep_space'];
  const activeWall = state.customizations.activeWallpaper || 'emerald_vault';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in text-left">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 p-5 sm:p-6 shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Image className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                {lang === 'es' ? 'Fondos del Juego (Wallpapers)' : 'Game Wallpapers'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {lang === 'es'
                  ? 'Personaliza la atmósfera de todo el juego con 12 fondos temáticos'
                  : 'Customize the overall game atmosphere with 12 themed wallpapers'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wallpaper Grid */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {WALLPAPERS_LIST.map((item) => {
              const isUnlocked = unlocked.includes(item.id) || item.gemCost === 0 || state.customizations.vipPass;
              const isActive = activeWall === item.id;

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border transition relative overflow-hidden flex flex-col justify-between ${
                    isActive
                      ? 'border-emerald-500 bg-slate-800/90 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
                      : isUnlocked
                      ? 'border-slate-700/80 bg-slate-800/50 hover:border-slate-600'
                      : 'border-slate-800 bg-slate-900/60 opacity-80'
                  }`}
                >
                  {/* Miniature wallpaper preview box */}
                  <div
                    className={`h-16 w-full rounded-xl bg-gradient-to-r ${item.previewBg} mb-2.5 relative flex items-center justify-center shadow-inner overflow-hidden border border-white/10`}
                  >
                    <span className="text-2xl drop-shadow-md select-none">{item.icon}</span>
                    {isActive && (
                      <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black flex items-center gap-1 shadow">
                        <Check className="w-3 h-3" />
                        {t.equipped}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">{item.nameKey}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mb-2.5">{item.descKey}</p>
                  </div>

                  {isUnlocked ? (
                    <button
                      onClick={() => {
                        sound.playPurchase();
                        onEquipWallpaper(item.id);
                      }}
                      disabled={isActive}
                      className={`w-full py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                        isActive
                          ? 'bg-slate-700 text-slate-400 cursor-default'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md active:scale-95'
                      }`}
                    >
                      {isActive ? t.equipped : t.equip}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (state.gems >= item.gemCost) {
                          onUnlockWithGems({
                            id: `wall_${item.id}`,
                            type: 'wallpaper',
                            itemId: item.id,
                            gemCost: item.gemCost,
                          });
                        }
                      }}
                      className={`w-full py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                        state.gems >= item.gemCost
                          ? 'bg-sky-600 hover:bg-sky-500 text-white shadow active:scale-95'
                          : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                      }`}
                    >
                      <Lock className="w-3 h-3" />
                      <span>{item.gemCost} 💎</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-bold text-sky-400">
            <Gem className="w-4 h-4" />
            <span>{state.gems} {lang === 'es' ? 'Diamantes Disponibles' : 'Diamonds Available'}</span>
          </div>
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
