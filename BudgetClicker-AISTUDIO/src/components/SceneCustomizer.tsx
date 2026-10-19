import React, { useState } from 'react';
import { GameState, Language, PiggySkinId, SceneEnvironmentId, TapFXId, AppWallpaperId } from '../types/game';
import { TRANSLATIONS } from '../i18n/translations';
import { sound } from '../utils/audio';
import {
  X,
  Palette,
  Sparkles,
  Check,
  Lock,
  Gem,
  Crown,
  Layers,
  Wand2,
  Image as ImageIcon,
} from 'lucide-react';

interface Props {
  state: GameState;
  onEquipSkin: (skinId: PiggySkinId) => void;
  onEquipEnvironment: (envId: SceneEnvironmentId) => void;
  onEquipWallpaper?: (wallId: AppWallpaperId) => void;
  onEquipTapFX: (fxId: TapFXId) => void;
  onOpenStore: () => void;
  onClose: () => void;
  lang: Language;
}

export const SceneCustomizer: React.FC<Props> = ({
  state,
  onEquipSkin,
  onEquipEnvironment,
  onEquipWallpaper,
  onEquipTapFX,
  onOpenStore,
  onClose,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'skins' | 'environments' | 'wallpapers' | 'fx'>('skins');
  const t = TRANSLATIONS[lang];

  const SKINS_LIST: { id: PiggySkinId; name: string; icon: string; preview: string }[] = [
    { id: 'classic', name: 'Clásico Rosado / Classic Rosy', icon: '🐷', preview: '#f472b6' },
    { id: 'monopoly', name: 'Monopoly Tycoon Guy', icon: '🎩', preview: '#020617' },
    { id: 'bull', name: 'Wall Street Golden Bull', icon: '🐂', preview: '#eab308' },
    { id: 'cyber', name: 'Cyber-Piggy 3000', icon: '🤖', preview: '#06b6d4' },
    { id: 'diamond', name: 'Pure Diamond Vault', icon: '💎', preview: '#38bdf8' },
    { id: 'cat', name: 'Maneki-Neko Lucky Cat', icon: '🐱', preview: '#facc15' },
    { id: 'dragon', name: 'Dragon Hoard Bank', icon: '🐉', preview: '#dc2626' },
    { id: 'steampunk', name: 'Steampunk Clockwork', icon: '⚙️', preview: '#b45309' },
    { id: 'arcade', name: '8-Bit Retro Pixel', icon: '👾', preview: '#ec4899' },
    { id: 'vampire', name: 'Count Pig-ula Vampire', icon: '🧛', preview: '#18181b' },
    { id: 'zen', name: 'Zen Matcha Ceramic', icon: '🍵', preview: '#86efac' },
    { id: 'pharaoh', name: 'Pharaoh Tutankh-Piggy', icon: '👑', preview: '#ca8a04' },
    { id: 'cosmic', name: 'Asteroid Void Bank', icon: '🪐', preview: '#8b5cf6' },
  ];

  const ENV_LIST: { id: SceneEnvironmentId; name: string; icon: string; preview: string }[] = [
    { id: 'studio', name: 'Minimalist Studio', icon: '🌿', preview: '#0f766e' },
    { id: 'wallstreet', name: 'Wall Street Penthouse', icon: '🏙️', preview: '#1e293b' },
    { id: 'cyber_rooftop', name: 'Neo-Tokyo Rooftop', icon: '⚡', preview: '#0284c7' },
    { id: 'fortknox', name: 'Fort Knox Gold Vault', icon: '🏦', preview: '#ca8a04' },
    { id: 'tropical', name: 'Bahama Resort Beach', icon: '🌴', preview: '#0d9488' },
    { id: 'space', name: 'Orbital Space Station', icon: '🚀', preview: '#312e81' },
    { id: 'akihabara', name: 'Akihabara Night Market', icon: '🏮', preview: '#e11d48' },
    { id: 'castle', name: 'Royal Treasury Castle', icon: '🏰', preview: '#713f12' },
    { id: 'sunset_cafe', name: 'Parisian Sunset Cafe', icon: '☕', preview: '#ea580c' },
    { id: 'egypt', name: 'Giza Golden Dunes', icon: '☀️', preview: '#d97706' },
  ];

  const FX_LIST: { id: TapFXId; name: string; icon: string; preview: string }[] = [
    { id: 'coins', name: 'Cash & Coins', icon: '💵', preview: '#22c55e' },
    { id: 'emerald', name: 'Emerald Sparkles', icon: '❇️', preview: '#10b981' },
    { id: 'bullion', name: 'Gold Bullion Shower', icon: '🪙', preview: '#fbbf24' },
    { id: 'glitch', name: 'Laser Neon Glitch', icon: '⚡', preview: '#06b6d4' },
  ];

  const WALLPAPERS_LIST: { id: AppWallpaperId; name: string; icon: string; preview: string }[] = [
    { id: 'emerald_vault', name: 'Bóveda Esmeralda / Emerald Vault', icon: '💎', preview: '#059669' },
    { id: 'synthwave_sunset', name: 'Atardecer Synthwave / 80s Sunset', icon: '🌅', preview: '#f43f5e' },
    { id: 'aurora', name: 'Aurora Boreal / Polar Aurora', icon: '🌌', preview: '#0891b2' },
    { id: 'cyber_city', name: 'Ciudad Cyberpunk / Cyber City', icon: '🏙️', preview: '#0284c7' },
    { id: 'lofi_room', name: 'Habitación Lo-Fi / Cozy Lo-Fi', icon: '☕', preview: '#ea580c' },
    { id: 'deep_space', name: 'Espacio Profundo / Deep Space', icon: '🪐', preview: '#4c1d95' },
    { id: 'candy_pop', name: 'Candy Pop / Pastel Dreams', icon: '🍭', preview: '#ec4899' },
    { id: 'tokyo_arcade', name: 'Arcade Tokio / Akihabara', icon: '👾', preview: '#e11d48' },
    { id: 'minimal_zen', name: 'Jardín Zen / Minimalist Zen', icon: '🎋', preview: '#10b981' },
    { id: 'wallstreet_trading', name: 'Trading Floor Wall Street', icon: '📈', preview: '#059669' },
    { id: 'gold_palace', name: 'Palacio de Oro / Gold Palace', icon: '👑', preview: '#eab308' },
    { id: 'miami_sunrise', name: 'Amanecer Miami Vice', icon: '🌴', preview: '#06b6d4' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in text-left">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 p-5 sm:p-6 shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-black text-white">
                {lang === 'es' ? 'Personalizar Escena de Clicker' : 'Customize Clicker Scene'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {lang === 'es' ? 'Cambia tu alcancía, el fondo y los efectos' : 'Change your piggy, backdrop and tap particles'}
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

        {/* Tab Pills */}
        <div className="flex gap-1.5 py-3 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('skins')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'skins'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                : 'bg-slate-800/40 text-slate-400 hover:text-white'
            }`}
          >
            <span>🐷</span>
            <span>{lang === 'es' ? 'Alcancías' : 'Piggies'}</span>
          </button>

          <button
            onClick={() => setActiveTab('environments')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'environments'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/25'
                : 'bg-slate-800/40 text-slate-400 hover:text-white'
            }`}
          >
            <span>🏙️</span>
            <span>{lang === 'es' ? 'Escena' : 'Scene'}</span>
          </button>

          <button
            onClick={() => setActiveTab('wallpapers')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'wallpapers'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25'
                : 'bg-slate-800/40 text-slate-400 hover:text-white'
            }`}
          >
            <span>🖼️</span>
            <span>Wallpapers</span>
          </button>

          <button
            onClick={() => setActiveTab('fx')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'fx'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                : 'bg-slate-800/40 text-slate-400 hover:text-white'
            }`}
          >
            <span>✨</span>
            <span>Tap FX</span>
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1">
          {/* Skins */}
          {activeTab === 'skins' &&
            SKINS_LIST.map((item) => {
              const isUnlocked = state.customizations.unlockedSkins.includes(item.id);
              const isEquipped = state.customizations.activeSkin === item.id;

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition ${
                    isEquipped
                      ? 'bg-emerald-950/30 border-emerald-500 shadow-md shadow-emerald-500/10'
                      : isUnlocked
                      ? 'bg-slate-800/40 border-slate-700/80 hover:border-slate-600'
                      : 'bg-slate-900/60 border-slate-800 opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-inner"
                      style={{ backgroundColor: `${item.preview}30`, borderColor: item.preview }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {item.id === 'monopoly' && (
                          <span className="text-[9px] font-black bg-amber-400/20 text-amber-300 px-1 rounded border border-amber-400/30">
                            HOT 🔥
                          </span>
                        )}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {isEquipped ? t.equipped : isUnlocked ? t.owned : (lang === 'es' ? 'Desbloqueable en Tienda VIP' : 'Unlock in VIP Store')}
                      </p>
                    </div>
                  </div>

                  {isEquipped ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>{t.equipped}</span>
                    </span>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => {
                        sound.playPurchase();
                        onEquipSkin(item.id);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition cursor-pointer"
                    >
                      {t.equip}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenStore();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Ver en Tienda' : 'View in Store'}</span>
                    </button>
                  )}
                </div>
              );
            })}

          {/* Environments */}
          {activeTab === 'environments' &&
            ENV_LIST.map((item) => {
              const isUnlocked =
                state.customizations.unlockedEnvironments?.includes(item.id) ?? (item.id === 'studio');
              const isEquipped = state.customizations.activeEnvironment === item.id;

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition ${
                    isEquipped
                      ? 'bg-cyan-950/30 border-cyan-500 shadow-md shadow-cyan-500/10'
                      : isUnlocked
                      ? 'bg-slate-800/40 border-slate-700/80 hover:border-slate-600'
                      : 'bg-slate-900/60 border-slate-800 opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-inner"
                      style={{ backgroundColor: `${item.preview}30`, borderColor: item.preview }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{item.name}</h4>
                      <p className="text-[10px] text-slate-400">
                        {isEquipped ? t.equipped : isUnlocked ? t.owned : (lang === 'es' ? 'Desbloqueable en Tienda VIP' : 'Unlock in VIP Store')}
                      </p>
                    </div>
                  </div>

                  {isEquipped ? (
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>{t.equipped}</span>
                    </span>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => {
                        sound.playPurchase();
                        onEquipEnvironment(item.id);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition cursor-pointer"
                    >
                      {t.equip}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenStore();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Ver en Tienda' : 'View in Store'}</span>
                    </button>
                  )}
                </div>
              );
            })}

          {/* Wallpapers */}
          {activeTab === 'wallpapers' &&
            WALLPAPERS_LIST.map((item) => {
              const unlockedWallpapers = state.customizations.unlockedWallpapers || ['emerald_vault', 'synthwave_sunset', 'aurora', 'deep_space'];
              const isUnlocked = unlockedWallpapers.includes(item.id) || item.id === 'emerald_vault' || state.customizations.vipPass;
              const isEquipped = (state.customizations.activeWallpaper || 'emerald_vault') === item.id;

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition ${
                    isEquipped
                      ? 'bg-amber-950/30 border-amber-500 shadow-md shadow-amber-500/10'
                      : isUnlocked
                      ? 'bg-slate-800/40 border-slate-700/80 hover:border-slate-600'
                      : 'bg-slate-900/60 border-slate-800 opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ backgroundColor: `${item.preview}30`, borderColor: item.preview }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{item.name}</h4>
                      <p className="text-[10px] text-slate-400">
                        {isEquipped ? t.equipped : isUnlocked ? t.owned : (lang === 'es' ? 'Desbloqueable en Tienda VIP' : 'Unlock in VIP Store')}
                      </p>
                    </div>
                  </div>

                  {isEquipped ? (
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>{t.equipped}</span>
                    </span>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => {
                        sound.playPurchase();
                        if (onEquipWallpaper) onEquipWallpaper(item.id);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition cursor-pointer"
                    >
                      {t.equip}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenStore();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Ver en Tienda' : 'View in Store'}</span>
                    </button>
                  )}
                </div>
              );
            })}

          {/* Tap FX */}
          {activeTab === 'fx' &&
            FX_LIST.map((item) => {
              const isUnlocked = state.customizations.unlockedTapFX.includes(item.id);
              const isEquipped = state.customizations.activeTapFX === item.id;

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition ${
                    isEquipped
                      ? 'bg-purple-950/30 border-purple-500 shadow-md shadow-purple-500/10'
                      : isUnlocked
                      ? 'bg-slate-800/40 border-slate-700/80 hover:border-slate-600'
                      : 'bg-slate-900/60 border-slate-800 opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ backgroundColor: `${item.preview}30`, borderColor: item.preview }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{item.name}</h4>
                      <p className="text-[10px] text-slate-400">
                        {isEquipped ? t.equipped : isUnlocked ? t.owned : (lang === 'es' ? 'Desbloqueable en Tienda VIP' : 'Unlock in VIP Store')}
                      </p>
                    </div>
                  </div>

                  {isEquipped ? (
                    <span className="text-xs font-bold text-purple-400 flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>{t.equipped}</span>
                    </span>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => {
                        sound.playPurchase();
                        onEquipTapFX(item.id);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition cursor-pointer"
                    >
                      {t.equip}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenStore();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Ver en Tienda' : 'View in Store'}</span>
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
