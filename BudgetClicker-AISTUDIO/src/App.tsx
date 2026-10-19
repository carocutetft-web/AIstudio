import React, { useState, useEffect } from 'react';
import { GameState, FinancialDilemma } from './types/game';
import { loadGameState, saveGameState, calculateTapPower, getDefaultState } from './utils/storage';
import { sound } from './utils/audio';

// Custom Hooks for Modular Architecture
import { useGameLoop } from './hooks/useGameLoop';
import { useGameActions } from './hooks/useGameActions';

// Components
import { AppBackground } from './components/AppBackground';
import { HeaderBar } from './components/HeaderBar';
import { VaultBalanceHeader } from './components/VaultBalanceHeader';
import { BottomNavBar, NavigationTab } from './components/BottomNavBar';
import { PiggyBankClicker } from './components/PiggyBankClicker';
import { UpgradesView } from './components/UpgradesView';
import { GoalsView } from './components/GoalsView';
import { AchievementsView } from './components/AchievementsView';
import { SceneCustomizer } from './components/SceneCustomizer';
import { WallpaperSelectorModal } from './components/WallpaperSelectorModal';
import { DilemmaModal } from './components/DilemmaModal';
import { StreakModal } from './components/StreakModal';
import { StoreModal } from './components/StoreModal';
import { StatsModal } from './components/StatsModal';
import { OfflineEarningsModal } from './components/OfflineEarningsModal';
import { OfflineIndicator } from './components/OfflineIndicator';

import { Layers, Brain, Image as ImageIcon, Trophy } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const { state } = loadGameState();
    return state;
  });

  // Offline earnings modal notice on return
  const [offlineNotice, setOfflineNotice] = useState<{
    seconds: number;
    earned: number;
  } | null>(() => {
    const { offlineEarned, offlineSeconds } = loadGameState();
    if (offlineEarned > 0 && offlineSeconds >= 15) {
      return { seconds: offlineSeconds, earned: offlineEarned };
    }
    return null;
  });

  // Navigation tab
  const [activeTab, setActiveTab] = useState<NavigationTab>('budget');

  // Modals state
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showSceneCustomizer, setShowSceneCustomizer] = useState(false);
  const [showWallpaperSelector, setShowWallpaperSelector] = useState(false);

  // Hook 1: Game Loop (Passive income, accumulator, non-repeating dilemma timer, frenzy timer)
  const {
    passiveRate,
    frenzyMultiplier,
    activeDilemma,
    setActiveDilemma,
    triggerNextDilemma,
    activateFrenzy,
  } = useGameLoop({ gameState, setGameState });

  // Hook 2: Game Actions & Handlers
  const actions = useGameActions({ setGameState, activateFrenzy });

  const baseTapPower = calculateTapPower(gameState);
  const tapPower = baseTapPower * frenzyMultiplier;

  // Sync sound toggle with sound engine
  useEffect(() => {
    sound.setEnabled(gameState.customizations.soundEnabled);
  }, [gameState.customizations.soundEnabled]);

  return (
    <div className="min-h-screen flex flex-col font-sans safe-top safe-bottom relative selection:bg-emerald-500 selection:text-white text-slate-100">
      {/* Dynamic 60fps Full-Screen Game Wallpaper */}
      <AppBackground wallpaper={gameState.customizations.activeWallpaper || 'emerald_vault'} />

      {/* Top Header Bar */}
      <HeaderBar
        state={gameState}
        passiveRate={passiveRate}
        onOpenStore={() => setShowStoreModal(true)}
        onOpenStreak={() => setShowStreakModal(true)}
        onOpenWallpapers={() => setShowWallpaperSelector(true)}
        onToggleSound={actions.handleToggleSound}
        onToggleLanguage={actions.handleToggleLanguage}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-6 flex flex-col justify-start pb-24 z-10">
        {/* Available Vault Balance Banner with Compact notation & hover toggle */}
        <VaultBalanceHeader
          state={gameState}
          tapPower={tapPower}
          passiveRate={passiveRate}
          frenzyMultiplier={frenzyMultiplier}
        />

        {/* Tab 1: Central Clicker & Piggy scene */}
        {activeTab === 'budget' && (
          <div className="flex-1 flex flex-col items-center justify-center py-1 animate-fade-in">
            <PiggyBankClicker
              skin={gameState.customizations.activeSkin}
              environment={gameState.customizations.activeEnvironment || 'studio'}
              fx={gameState.customizations.activeTapFX}
              tapPower={tapPower}
              passiveRate={passiveRate}
              onTap={actions.handleTap}
              onPopBalloon={actions.handlePopBalloon}
              onOpenCustomizer={() => setShowSceneCustomizer(true)}
              lang={gameState.language}
            />

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5 w-full max-w-lg">
              <button
                onClick={() => setShowSceneCustomizer(true)}
                className="flex-1 py-2 px-3 rounded-2xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>{gameState.language === 'es' ? 'Escena & Skins' : 'Scene & Skins'}</span>
              </button>

              <button
                onClick={() => setShowWallpaperSelector(true)}
                className="flex-1 py-2 px-3 rounded-2xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 text-amber-200 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
              >
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>{gameState.language === 'es' ? 'Fondos (12)' : 'Wallpapers (12)'}</span>
              </button>

              <button
                onClick={triggerNextDilemma}
                className="flex-1 py-2 px-3 rounded-2xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
              >
                <Brain className="w-4 h-4 text-purple-400" />
                <span>{gameState.language === 'es' ? 'Desafío Financiero' : 'Financial Dilemma'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Passive Habits & Discipline Upgrades */}
        {activeTab === 'habits' && (
          <div className="animate-fade-in">
            <UpgradesView
              state={gameState}
              onBuyAutoSaver={actions.handleBuyAutoSaver}
              onBuyClickUpgrade={actions.handleBuyClickUpgrade}
              lang={gameState.language}
            />
          </div>
        )}

        {/* Tab 3: Real Savings Goals & Action Logger */}
        {activeTab === 'goals' && (
          <div className="animate-fade-in">
            <GoalsView
              state={gameState}
              onDepositToGoal={actions.handleDepositToGoal}
              onCreateGoal={actions.handleCreateGoal}
              onLogRealSaving={actions.handleLogRealSaving}
              lang={gameState.language}
            />
          </div>
        )}

        {/* Tab 4: 100+ Achievements Hub with Rebalanced Economy */}
        {activeTab === 'achievements' && (
          <div className="animate-fade-in">
            <AchievementsView
              state={gameState}
              onClaimAchievement={actions.handleClaimAchievement}
              lang={gameState.language}
            />
          </div>
        )}

        {/* Tab 5: Player Progress & Local Backup */}
        {activeTab === 'stats' && (
          <div className="animate-fade-in">
            <StatsModal
              state={gameState}
              onRestoreState={(restored) => {
                setGameState(restored);
                saveGameState(restored);
              }}
              onResetState={() => {
                const fresh = getDefaultState();
                setGameState(fresh);
                saveGameState(fresh);
              }}
              onClose={() => setActiveTab('budget')}
              lang={gameState.language}
            />
          </div>
        )}
      </main>

      {/* Floating Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        lang={gameState.language}
      />

      {/* Scene Customizer Drawer */}
      {showSceneCustomizer && (
        <SceneCustomizer
          state={gameState}
          onEquipSkin={actions.handleEquipSkin}
          onEquipEnvironment={actions.handleEquipEnvironment}
          onEquipWallpaper={actions.handleEquipWallpaper}
          onEquipTapFX={actions.handleEquipTapFX}
          onOpenStore={() => setShowStoreModal(true)}
          onClose={() => setShowSceneCustomizer(false)}
          lang={gameState.language}
        />
      )}

      {/* Wallpapers Selector Modal */}
      {showWallpaperSelector && (
        <WallpaperSelectorModal
          state={gameState}
          onEquipWallpaper={actions.handleEquipWallpaper}
          onUnlockWithGems={actions.handleUnlockWithGems}
          onClose={() => setShowWallpaperSelector(false)}
          lang={gameState.language}
        />
      )}

      {/* Non-Repeating Financial Dilemma Modal */}
      {activeDilemma && (
        <DilemmaModal
          dilemma={activeDilemma}
          tapPower={tapPower}
          onChoice={(dilemmaId, reward) => {
            actions.handleDilemmaChoice(dilemmaId, reward);
          }}
          onClose={() => setActiveDilemma(null)}
          lang={gameState.language}
        />
      )}

      {/* Daily Streak Modal */}
      {showStreakModal && (
        <StreakModal
          state={gameState}
          onClaimStreak={actions.handleClaimStreak}
          onClose={() => setShowStreakModal(false)}
          lang={gameState.language}
        />
      )}

      {/* Store & Personalization Modal */}
      {showStoreModal && (
        <StoreModal
          state={gameState}
          onEquipTheme={actions.handleEquipTheme}
          onEquipSkin={actions.handleEquipSkin}
          onEquipEnvironment={actions.handleEquipEnvironment}
          onEquipWallpaper={actions.handleEquipWallpaper}
          onEquipTapFX={actions.handleEquipTapFX}
          onUnlockWithGems={actions.handleUnlockWithGems}
          onPurchaseSuccess={actions.handlePurchaseSuccess}
          onClose={() => setShowStoreModal(false)}
          lang={gameState.language}
        />
      )}

      {/* Welcome Back Offline Earnings Modal */}
      {offlineNotice && (
        <OfflineEarningsModal
          offlineSeconds={offlineNotice.seconds}
          earned={offlineNotice.earned}
          onClaim={() => setOfflineNotice(null)}
          lang={gameState.language}
        />
      )}

      {/* Offline Connectivity Banner */}
      <OfflineIndicator lang={gameState.language} />
    </div>
  );
}
