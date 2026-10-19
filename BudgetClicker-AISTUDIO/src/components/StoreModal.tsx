import React, { useState } from 'react';
import { GameState, StoreItem, Language, ThemeId, PiggySkinId, SceneEnvironmentId, TapFXId, AppWallpaperId } from '../types/game';
import { STORE_ITEMS } from '../data/gameData';
import { TRANSLATIONS } from '../i18n/translations';
import { CheckoutModal } from './CheckoutModal';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  X,
  Crown,
  Gem,
  Palette,
  Sparkles,
  Wand2,
  Check,
  Lock,
  ShoppingBag,
  Zap,
  Building2,
  Image as ImageIcon,
} from 'lucide-react';

interface Props {
  state: GameState;
  onEquipTheme: (themeId: ThemeId) => void;
  onEquipSkin: (skinId: PiggySkinId) => void;
  onEquipEnvironment: (envId: SceneEnvironmentId) => void;
  onEquipWallpaper?: (wallId: AppWallpaperId) => void;
  onEquipTapFX: (fxId: TapFXId) => void;
  onUnlockWithGems: (item: StoreItem) => void;
  onPurchaseSuccess: (item: StoreItem) => void;
  onClose: () => void;
  lang: Language;
}

export const StoreModal: React.FC<Props> = ({
  state,
  onEquipTheme,
  onEquipSkin,
  onEquipEnvironment,
  onEquipWallpaper,
  onEquipTapFX,
  onUnlockWithGems,
  onPurchaseSuccess,
  onClose,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedTab, setSelectedTab] = useState<'vip' | 'gems' | 'skins' | 'backdrops' | 'wallpapers' | 'themes' | 'fx'>('vip');
  const [checkoutItem, setCheckoutItem] = useState<StoreItem | null>(null);

  const vipItem = STORE_ITEMS.find((i) => i.type === 'vip');
  const gemPacks = STORE_ITEMS.filter((i) => i.type === 'gems');
  const themes = STORE_ITEMS.filter((i) => i.type === 'theme');
  const skins = STORE_ITEMS.filter((i) => i.type === 'skin');
  const backdrops = STORE_ITEMS.filter((i) => i.type === 'backdrop');
  const wallpapers = STORE_ITEMS.filter((i) => i.type === 'wallpaper');
  const tapFXs = STORE_ITEMS.filter((i) => i.type === 'fx');

  const isUnlocked = (item: StoreItem): boolean => {
    if (item.type === 'theme') {
      return state.customizations.unlockedThemes.includes(item.itemId as ThemeId);
    }
    if (item.type === 'skin') {
      return state.customizations.unlockedSkins.includes(item.itemId as PiggySkinId);
    }
    if (item.type === 'backdrop') {
      return (state.customizations.unlockedEnvironments || []).includes(item.itemId as SceneEnvironmentId);
    }
    if (item.type === 'wallpaper') {
      return (state.customizations.unlockedWallpapers || ['emerald_vault', 'synthwave_sunset', 'aurora', 'deep_space']).includes(item.itemId as AppWallpaperId);
    }
    if (item.type === 'fx') {
      return state.customizations.unlockedTapFX.includes(item.itemId as TapFXId);
    }
    if (item.type === 'vip') {
      return state.customizations.vipPass;
    }
    return false;
  };

  const isEquipped = (item: StoreItem): boolean => {
    if (item.type === 'theme') {
      return state.customizations.activeTheme === item.itemId;
    }
    if (item.type === 'skin') {
      return state.customizations.activeSkin === item.itemId;
    }
    if (item.type === 'backdrop') {
      return state.customizations.activeEnvironment === item.itemId;
    }
    if (item.type === 'wallpaper') {
      return (state.customizations.activeWallpaper || 'emerald_vault') === item.itemId;
    }
    if (item.type === 'fx') {
      return state.customizations.activeTapFX === item.itemId;
    }
    return false;
  };

  const handleEquip = (item: StoreItem) => {
    sound.playPurchase();
    if (item.type === 'theme') {
      onEquipTheme(item.itemId as ThemeId);
    } else if (item.type === 'skin') {
      onEquipSkin(item.itemId as PiggySkinId);
    } else if (item.type === 'backdrop') {
      onEquipEnvironment(item.itemId as SceneEnvironmentId);
    } else if (item.type === 'wallpaper' && onEquipWallpaper) {
      onEquipWallpaper(item.itemId as AppWallpaperId);
    } else if (item.type === 'fx') {
      onEquipTapFX(item.itemId as TapFXId);
    }
  };

  const handleGemUnlock = (item: StoreItem) => {
    if (!item.gemCost || state.gems < item.gemCost) return;
    sound.playStreakFanfare();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
    onUnlockWithGems(item);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-fade-in text-left">
        <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700/80 p-5 sm:p-6 shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-white">{t.store_title}</h2>
                <p className="text-[11px] text-slate-400 hidden sm:block">{t.store_desc}</p>
              </div>
            </div>

            {/* Gem count & Close */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-sky-950/60 border border-sky-500/30 text-sky-200 text-xs font-mono font-bold">
                <Gem className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
                <span>{state.gems}</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-1 overflow-x-auto py-2.5 scrollbar-none border-b border-slate-800/80">
            {[
              { id: 'vip', label: t.tab_vip, icon: <Crown className="w-3.5 h-3.5" /> },
              { id: 'gems', label: t.tab_gems, icon: <Gem className="w-3.5 h-3.5" /> },
              { id: 'skins', label: t.tab_skins, icon: <Sparkles className="w-3.5 h-3.5" /> },
              { id: 'backdrops', label: t.tab_backdrops, icon: <Building2 className="w-3.5 h-3.5" /> },
              { id: 'wallpapers', label: lang === 'es' ? 'Wallpapers (12)' : 'Wallpapers (12)', icon: <ImageIcon className="w-3.5 h-3.5" /> },
              { id: 'themes', label: t.tab_themes, icon: <Palette className="w-3.5 h-3.5" /> },
              { id: 'fx', label: t.tab_fx, icon: <Wand2 className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  selectedTab === tab.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white bg-slate-800/40'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
            {/* VIP Pass Tab */}
            {selectedTab === 'vip' && vipItem && (
              <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-purple-950/40 border border-amber-400/50 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Crown className="w-6 h-6 text-amber-400 fill-amber-400 animate-pulse" />
                    <h3 className="text-base sm:text-lg font-black text-white">
                      {t[vipItem.nameKey]}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 shadow">
                    {vipItem.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {t[vipItem.descKey]}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2 text-amber-300 font-bold">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>2x Offline Yield (24h)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2 text-purple-300 font-bold">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>+50% Passive Speed</span>
                  </div>
                </div>

                {state.customizations.vipPass ? (
                  <div className="w-full py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-center text-xs flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>{t.vip_active_badge}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setCheckoutItem(vipItem)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-400/25 transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{t.buy_with_usd} ${vipItem.priceUSD.toFixed(2)} USD</span>
                    <span className="text-[11px] font-normal opacity-80">(Mercado Pago / PayPal)</span>
                  </button>
                )}
              </div>
            )}

            {/* Gems Tab */}
            {selectedTab === 'gems' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {gemPacks.map((pack) => (
                  <div
                    key={pack.id}
                    className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 flex flex-col justify-between text-center gap-3 hover:border-sky-500/50 transition relative overflow-hidden"
                  >
                    {pack.badge && (
                      <span className="absolute top-2 right-2 text-[9px] font-black px-1.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                        {pack.badge}
                      </span>
                    )}

                    <div className="my-2 flex flex-col items-center">
                      <Gem className="w-10 h-10 text-sky-400 fill-sky-400/30 animate-pulse mb-1" />
                      <div className="text-xl font-mono font-black text-white">
                        {pack.gemReward} <span className="text-xs text-sky-400 font-sans">Gems</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{t[pack.nameKey]}</p>
                    </div>

                    <button
                      onClick={() => setCheckoutItem(pack)}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition cursor-pointer"
                    >
                      ${pack.priceUSD.toFixed(2)} USD
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Themes, Skins, Backdrops, Wallpapers, TapFX Lists */}
            {['themes', 'skins', 'backdrops', 'wallpapers', 'fx'].includes(selectedTab) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(selectedTab === 'themes'
                  ? themes
                  : selectedTab === 'skins'
                  ? skins
                  : selectedTab === 'backdrops'
                  ? backdrops
                  : selectedTab === 'wallpapers'
                  ? wallpapers
                  : tapFXs
                ).map((item) => {
                  const unlocked = isUnlocked(item);
                  const equipped = isEquipped(item);
                  const title = t[item.nameKey] || item.id;
                  const desc = t[item.descKey] || '';
                  const canAffordGems = item.gemCost ? state.gems >= item.gemCost : false;

                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border transition flex flex-col justify-between gap-3 ${
                        equipped
                          ? 'bg-purple-950/25 border-purple-500 shadow-md shadow-purple-500/10'
                          : unlocked
                          ? 'bg-slate-800/40 border-slate-700/80 hover:border-slate-600'
                          : 'bg-slate-900/60 border-slate-800 opacity-90'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-5 h-5 rounded-full shrink-0 shadow-sm"
                              style={{ backgroundColor: item.previewColor || '#a855f7' }}
                            />
                            <h4 className="text-xs sm:text-sm font-bold text-white">{title}</h4>
                          </div>

                          {equipped && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                              {t.equipped}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">{desc}</p>
                      </div>

                      {/* Actions */}
                      <div className="pt-2">
                        {unlocked ? (
                          equipped ? (
                            <div className="w-full py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold text-center">
                              ✓ {t.equipped}
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEquip(item)}
                              className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition cursor-pointer border border-slate-700"
                            >
                              {t.equip}
                            </button>
                          )
                        ) : (
                          <div className="flex gap-2">
                            {/* Buy with gems button */}
                            {item.gemCost && (
                              <button
                                disabled={!canAffordGems}
                                onClick={() => handleGemUnlock(item)}
                                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                                  canAffordGems
                                    ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20'
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                }`}
                                title={!canAffordGems ? t.not_enough_gems : ''}
                              >
                                <Gem className="w-3 h-3 text-sky-300" />
                                <span>{item.gemCost}</span>
                              </button>
                            )}

                            {/* Buy with USD via MP/PayPal */}
                            <button
                              onClick={() => setCheckoutItem(item)}
                              className="flex-1 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition cursor-pointer"
                            >
                              ${item.priceUSD.toFixed(2)}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Gateway Modal */}
      {checkoutItem && (
        <CheckoutModal
          item={checkoutItem}
          lang={lang}
          onSuccess={(item) => {
            onPurchaseSuccess(item);
          }}
          onClose={() => setCheckoutItem(null)}
        />
      )}
    </>
  );
};
