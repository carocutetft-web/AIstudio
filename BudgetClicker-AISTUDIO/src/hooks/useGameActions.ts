import { GameState, Language, ThemeId, PiggySkinId, SceneEnvironmentId, AppWallpaperId, TapFXId, StoreItem } from '../types/game';
import { calculateTapPower, saveGameState } from '../utils/storage';

interface UseGameActionsOptions {
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  activateFrenzy: (multiplier?: number, durationMs?: number) => void;
}

export function useGameActions({ setGameState, activateFrenzy }: UseGameActionsOptions) {
  // Handle piggy tap
  const handleTap = (earned: number) => {
    setGameState((prev) => {
      const nextBal = prev.balance + earned;
      const nextLifetime = prev.lifetimeEarned + earned;
      return {
        ...prev,
        balance: nextBal,
        lifetimeEarned: nextLifetime,
        stats: {
          ...prev.stats,
          totalClicks: prev.stats.totalClicks + 1,
        },
      };
    });
  };

  // Pop flying balloon / gift drone
  const handlePopBalloon = (reward: { type: 'cash' | 'gems' | 'frenzy'; value: number }) => {
    setGameState((prev) => {
      let newBalance = prev.balance;
      let newLifetime = prev.lifetimeEarned;
      let newGems = prev.gems;

      if (reward.type === 'cash') {
        newBalance = prev.balance + reward.value;
        newLifetime = prev.lifetimeEarned + reward.value;
      } else if (reward.type === 'gems') {
        newGems += reward.value;
      }

      return {
        ...prev,
        balance: newBalance,
        lifetimeEarned: newLifetime,
        gems: newGems,
        stats: {
          ...prev.stats,
          balloonsPopped: (prev.stats.balloonsPopped || 0) + 1,
        },
      };
    });

    if (reward.type === 'frenzy') {
      activateFrenzy(3, 15000);
    }
  };

  // Resolve financial dilemma and record in solvedDilemmas
  const handleDilemmaChoice = (dilemmaId: string, reward: { cash: number; gems: number }) => {
    setGameState((prev) => {
      const alreadySolved = prev.solvedDilemmas || [];
      const updatedSolved = alreadySolved.includes(dilemmaId)
        ? alreadySolved
        : [...alreadySolved, dilemmaId];

      const updated: GameState = {
        ...prev,
        balance: prev.balance + reward.cash,
        lifetimeEarned: prev.lifetimeEarned + reward.cash,
        gems: prev.gems + reward.gems,
        solvedDilemmas: updatedSolved,
        stats: {
          ...prev.stats,
          dilemmasSolved: (prev.stats.dilemmasSolved || 0) + 1,
        },
      };
      saveGameState(updated);
      return updated;
    });
  };

  // Buy passive auto-saver
  const handleBuyAutoSaver = (saverId: string, cost: number) => {
    setGameState((prev) => {
      if (prev.balance < cost) return prev;
      const currentCount = prev.autoSavers[saverId] || 0;
      const updated: GameState = {
        ...prev,
        balance: prev.balance - cost,
        autoSavers: {
          ...prev.autoSavers,
          [saverId]: currentCount + 1,
        },
      };
      saveGameState(updated);
      return updated;
    });
  };

  // Buy click upgrade
  const handleBuyClickUpgrade = (upgradeId: string, cost: number) => {
    setGameState((prev) => {
      if (prev.balance < cost) return prev;
      const currentCount = prev.clickUpgrades[upgradeId] || 0;
      const updated: GameState = {
        ...prev,
        balance: prev.balance - cost,
        clickUpgrades: {
          ...prev.clickUpgrades,
          [upgradeId]: currentCount + 1,
        },
      };
      updated.tapPower = calculateTapPower(updated);
      saveGameState(updated);
      return updated;
    });
  };

  // Deposit to goal bucket
  const handleDepositToGoal = (goalId: string, amount: number) => {
    setGameState((prev) => {
      if (prev.balance < amount) return prev;
      const updatedGoals = prev.goals.map((g) => {
        if (g.id !== goalId) return g;
        const newCurrent = Math.min(g.target, g.current + amount);
        const completed = newCurrent >= g.target;
        return {
          ...g,
          current: newCurrent,
          completed,
        };
      });

      const newlyCompleted = updatedGoals.filter((g) => g.completed).length;
      const updated: GameState = {
        ...prev,
        balance: prev.balance - amount,
        goals: updatedGoals,
        stats: {
          ...prev.stats,
          goalsCompleted: newlyCompleted,
          totalDepositedToGoals: (prev.stats.totalDepositedToGoals || 0) + amount,
        },
      };
      saveGameState(updated);
      return updated;
    });
  };

  // Create custom goal
  const handleCreateGoal = (name: string, target: number) => {
    setGameState((prev) => {
      const newGoal = {
        id: `goal_${Date.now()}`,
        name,
        target,
        current: 0,
        icon: 'Target',
        color: '#14b8a6',
        completed: false,
        isCustom: true,
      };
      const updated: GameState = {
        ...prev,
        goals: [...prev.goals, newGoal],
      };
      saveGameState(updated);
      return updated;
    });
  };

  // Log real-life savings: gives balanced +1 gem!
  const handleLogRealSaving = (note: string, amount: number) => {
    setGameState((prev) => {
      const logEntry = {
        id: `log_${Date.now()}`,
        note,
        amount,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now(),
      };

      const gameCashReward = amount * 10;
      const updated: GameState = {
        ...prev,
        balance: prev.balance + gameCashReward,
        lifetimeEarned: prev.lifetimeEarned + gameCashReward,
        gems: prev.gems + 1, // Balanced: exactly 1 gem per real mindful saving
        realSavingLogs: [...prev.realSavingLogs, logEntry],
        stats: {
          ...prev.stats,
          realSavingsLogged: prev.stats.realSavingsLogged + 1,
          realAmountLogged: Number((prev.stats.realAmountLogged + amount).toFixed(2)),
        },
      };
      saveGameState(updated);
      return updated;
    });
  };

  // Claim streak
  const handleClaimStreak = (_dayIndex: number, cashReward: number, gemReward: number) => {
    setGameState((prev) => {
      const todayStr = new Date().toISOString().slice(0, 10);
      const updated: GameState = {
        ...prev,
        balance: prev.balance + cashReward,
        lifetimeEarned: prev.lifetimeEarned + cashReward,
        gems: prev.gems + gemReward,
        streak: {
          currentStreak: prev.streak.currentStreak + 1,
          lastClaimDate: todayStr,
          totalDaysClaimed: prev.streak.totalDaysClaimed + 1,
        },
      };
      saveGameState(updated);
      return updated;
    });
  };

  // Claim achievement
  const handleClaimAchievement = (achId: string, cashReward: number, gemReward: number) => {
    setGameState((prev) => {
      if ((prev.unlockedAchievements || []).includes(achId)) return prev;
      const updated: GameState = {
        ...prev,
        balance: prev.balance + cashReward,
        lifetimeEarned: prev.lifetimeEarned + cashReward,
        gems: prev.gems + gemReward,
        unlockedAchievements: [...(prev.unlockedAchievements || []), achId],
      };
      saveGameState(updated);
      return updated;
    });
  };

  // Equip Theme
  const handleEquipTheme = (themeId: ThemeId) => {
    setGameState((prev) => {
      const updated: GameState = {
        ...prev,
        customizations: {
          ...prev.customizations,
          activeTheme: themeId,
        },
      };
      saveGameState(updated);
      return updated;
    });
  };

  // Equip Skin
  const handleEquipSkin = (skinId: PiggySkinId) => {
    setGameState((prev) => {
      const updated: GameState = {
        ...prev,
        customizations: {
          ...prev.customizations,
          activeSkin: skinId,
        },
      };
      saveGameState(updated);
      return updated;
    });
  };

  // Equip Environment Backdrop
  const handleEquipEnvironment = (envId: SceneEnvironmentId) => {
    setGameState((prev) => {
      const updated: GameState = {
        ...prev,
        customizations: {
          ...prev.customizations,
          activeEnvironment: envId,
        },
      };
      saveGameState(updated);
      return updated;
    });
  };

  // Equip App Wallpaper (Game Background)
  const handleEquipWallpaper = (wallId: AppWallpaperId) => {
    setGameState((prev) => {
      const updated: GameState = {
        ...prev,
        customizations: {
          ...prev.customizations,
          activeWallpaper: wallId,
        },
      };
      saveGameState(updated);
      return updated;
    });
  };

  // Equip Tap FX
  const handleEquipTapFX = (fxId: TapFXId) => {
    setGameState((prev) => {
      const updated: GameState = {
        ...prev,
        customizations: {
          ...prev.customizations,
          activeTapFX: fxId,
        },
      };
      saveGameState(updated);
      return updated;
    });
  };

  // Unlock with gems
  const handleUnlockWithGems = (item: StoreItem) => {
    setGameState((prev) => {
      if (!item.gemCost || prev.gems < item.gemCost) return prev;
      const newCustomizations = { ...prev.customizations };

      if (item.type === 'theme') {
        newCustomizations.unlockedThemes = Array.from(
          new Set([...newCustomizations.unlockedThemes, item.itemId as ThemeId])
        );
        newCustomizations.activeTheme = item.itemId as ThemeId;
      } else if (item.type === 'skin') {
        newCustomizations.unlockedSkins = Array.from(
          new Set([...newCustomizations.unlockedSkins, item.itemId as PiggySkinId])
        );
        newCustomizations.activeSkin = item.itemId as PiggySkinId;
      } else if (item.type === 'backdrop') {
        newCustomizations.unlockedEnvironments = Array.from(
          new Set([...(newCustomizations.unlockedEnvironments || []), item.itemId as SceneEnvironmentId])
        );
        newCustomizations.activeEnvironment = item.itemId as SceneEnvironmentId;
      } else if (item.type === 'wallpaper') {
        newCustomizations.unlockedWallpapers = Array.from(
          new Set([...(newCustomizations.unlockedWallpapers || []), item.itemId as AppWallpaperId])
        );
        newCustomizations.activeWallpaper = item.itemId as AppWallpaperId;
      } else if (item.type === 'fx') {
        newCustomizations.unlockedTapFX = Array.from(
          new Set([...newCustomizations.unlockedTapFX, item.itemId as TapFXId])
        );
        newCustomizations.activeTapFX = item.itemId as TapFXId;
      }

      const updated: GameState = {
        ...prev,
        gems: prev.gems - item.gemCost,
        customizations: newCustomizations,
      };
      saveGameState(updated);
      return updated;
    });
  };

  // Purchase success via Mercado Pago / PayPal checkout
  const handlePurchaseSuccess = (item: StoreItem) => {
    setGameState((prev) => {
      const newCustomizations = { ...prev.customizations };
      let newGems = prev.gems;

      if (item.type === 'vip') {
        newCustomizations.vipPass = true;
        newCustomizations.unlockedThemes = Array.from(
          new Set([...newCustomizations.unlockedThemes, 'gold' as ThemeId])
        );
        newCustomizations.unlockedSkins = Array.from(
          new Set([
            ...newCustomizations.unlockedSkins,
            'diamond' as PiggySkinId,
            'monopoly' as PiggySkinId,
          ])
        );
        newCustomizations.unlockedEnvironments = Array.from(
          new Set([
            ...(newCustomizations.unlockedEnvironments || []),
            'wallstreet' as SceneEnvironmentId,
            'fortknox' as SceneEnvironmentId,
          ])
        );
        newCustomizations.unlockedWallpapers = Array.from(
          new Set([
            ...(newCustomizations.unlockedWallpapers || []),
            'gold_palace' as AppWallpaperId,
            'wallstreet_trading' as AppWallpaperId,
          ])
        );
        newCustomizations.activeTheme = 'gold';
        newCustomizations.activeSkin = 'monopoly';
        newCustomizations.activeEnvironment = 'wallstreet';
        newCustomizations.activeWallpaper = 'gold_palace';
      } else if (item.type === 'gems' && item.gemReward) {
        newGems += item.gemReward;
      } else if (item.type === 'theme' && item.itemId) {
        newCustomizations.unlockedThemes = Array.from(
          new Set([...newCustomizations.unlockedThemes, item.itemId as ThemeId])
        );
        newCustomizations.activeTheme = item.itemId as ThemeId;
      } else if (item.type === 'skin' && item.itemId) {
        newCustomizations.unlockedSkins = Array.from(
          new Set([...newCustomizations.unlockedSkins, item.itemId as PiggySkinId])
        );
        newCustomizations.activeSkin = item.itemId as PiggySkinId;
      } else if (item.type === 'backdrop' && item.itemId) {
        newCustomizations.unlockedEnvironments = Array.from(
          new Set([...(newCustomizations.unlockedEnvironments || []), item.itemId as SceneEnvironmentId])
        );
        newCustomizations.activeEnvironment = item.itemId as SceneEnvironmentId;
      } else if (item.type === 'wallpaper' && item.itemId) {
        newCustomizations.unlockedWallpapers = Array.from(
          new Set([...(newCustomizations.unlockedWallpapers || []), item.itemId as AppWallpaperId])
        );
        newCustomizations.activeWallpaper = item.itemId as AppWallpaperId;
      } else if (item.type === 'fx' && item.itemId) {
        newCustomizations.unlockedTapFX = Array.from(
          new Set([...newCustomizations.unlockedTapFX, item.itemId as TapFXId])
        );
        newCustomizations.activeTapFX = item.itemId as TapFXId;
      }

      const updated: GameState = {
        ...prev,
        gems: newGems,
        customizations: newCustomizations,
      };
      saveGameState(updated);
      return updated;
    });
  };

  const handleToggleSound = () => {
    setGameState((prev) => {
      const updated: GameState = {
        ...prev,
        customizations: {
          ...prev.customizations,
          soundEnabled: !prev.customizations.soundEnabled,
        },
      };
      saveGameState(updated);
      return updated;
    });
  };

  const handleToggleLanguage = () => {
    setGameState((prev) => {
      const newLang: Language = prev.language === 'es' ? 'en' : 'es';
      const updated: GameState = {
        ...prev,
        language: newLang,
      };
      saveGameState(updated);
      return updated;
    });
  };

  return {
    handleTap,
    handlePopBalloon,
    handleDilemmaChoice,
    handleBuyAutoSaver,
    handleBuyClickUpgrade,
    handleDepositToGoal,
    handleCreateGoal,
    handleLogRealSaving,
    handleClaimStreak,
    handleClaimAchievement,
    handleEquipTheme,
    handleEquipSkin,
    handleEquipEnvironment,
    handleEquipWallpaper,
    handleEquipTapFX,
    handleUnlockWithGems,
    handlePurchaseSuccess,
    handleToggleSound,
    handleToggleLanguage,
  };
}
