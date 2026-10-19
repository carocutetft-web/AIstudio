import { GameState, Language } from '../types/game';
import { AUTO_SAVERS, CLICK_UPGRADES, INITIAL_GOALS } from '../data/gameData';

const STORAGE_KEY = 'ahorropulse_game_state_v1';

export function getDefaultState(): GameState {
  let initialLang: Language = 'es';
  if (typeof navigator !== 'undefined') {
    const lang = (navigator.language || '').toLowerCase();
    if (lang.startsWith('en')) {
      initialLang = 'en';
    }
  }

  const autoSaversInit: Record<string, number> = {};
  AUTO_SAVERS.forEach((s) => {
    autoSaversInit[s.id] = 0;
  });

  const clickUpgradesInit: Record<string, number> = {};
  CLICK_UPGRADES.forEach((u) => {
    clickUpgradesInit[u.id] = 0;
  });

  return {
    balance: 0,
    lifetimeEarned: 0,
    gems: 10, // balanced starting welcome gift
    tapPower: 1,
    lastSavedTimestamp: Date.now(),
    streak: {
      currentStreak: 0,
      lastClaimDate: '',
      totalDaysClaimed: 0,
    },
    autoSavers: autoSaversInit,
    clickUpgrades: clickUpgradesInit,
    goals: JSON.parse(JSON.stringify(INITIAL_GOALS)),
    realSavingLogs: [],
    unlockedAchievements: [],
    solvedDilemmas: [],
    customizations: {
      activeTheme: 'mint',
      activeSkin: 'classic',
      activeEnvironment: 'studio',
      activeWallpaper: 'emerald_vault',
      activeTapFX: 'coins',
      unlockedThemes: ['mint'],
      unlockedSkins: ['classic'],
      unlockedEnvironments: ['studio'],
      unlockedWallpapers: ['emerald_vault', 'synthwave_sunset', 'aurora', 'deep_space'],
      unlockedTapFX: ['coins'],
      vipPass: false,
      soundEnabled: true,
      hapticsEnabled: true,
    },
    stats: {
      totalClicks: 0,
      realSavingsLogged: 0,
      realAmountLogged: 0,
      goalsCompleted: 0,
      balloonsPopped: 0,
      dilemmasSolved: 0,
      frenziesReached: 0,
      totalDepositedToGoals: 0,
    },
    language: initialLang,
  };
}

export interface OfflineEarningsResult {
  state: GameState;
  offlineSeconds: number;
  offlineEarned: number;
}

export function calculatePassiveIncome(state: GameState): number {
  let income = 0;
  AUTO_SAVERS.forEach((s) => {
    const count = state.autoSavers[s.id] || 0;
    if (count > 0) {
      income += count * s.baseIncome;
    }
  });

  if (state.customizations.vipPass) {
    income *= 1.5;
  }

  return income;
}

export function calculateTapPower(state: GameState): number {
  let power = 1;
  CLICK_UPGRADES.forEach((u) => {
    const count = state.clickUpgrades[u.id] || 0;
    if (count > 0) {
      power += count * u.clickBonus;
    }
  });
  return power;
}

export function loadGameState(): OfflineEarningsResult {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const defaults = getDefaultState();
    if (!raw) {
      return { state: defaults, offlineSeconds: 0, offlineEarned: 0 };
    }

    const parsed: Partial<GameState> = JSON.parse(raw);

    const state: GameState = {
      ...defaults,
      ...parsed,
      unlockedAchievements: parsed.unlockedAchievements || [],
      solvedDilemmas: parsed.solvedDilemmas || [],
      customizations: {
        ...defaults.customizations,
        ...(parsed.customizations || {}),
        unlockedEnvironments: parsed.customizations?.unlockedEnvironments || ['studio'],
        activeEnvironment: parsed.customizations?.activeEnvironment || 'studio',
        unlockedWallpapers: parsed.customizations?.unlockedWallpapers || defaults.customizations.unlockedWallpapers,
        activeWallpaper: parsed.customizations?.activeWallpaper || 'emerald_vault',
      },
      stats: {
        ...defaults.stats,
        ...(parsed.stats || {}),
      },
      streak: {
        ...defaults.streak,
        ...(parsed.streak || {}),
      },
      autoSavers: {
        ...defaults.autoSavers,
        ...(parsed.autoSavers || {}),
      },
      clickUpgrades: {
        ...defaults.clickUpgrades,
        ...(parsed.clickUpgrades || {}),
      },
      goals: parsed.goals && parsed.goals.length > 0 ? parsed.goals : defaults.goals,
    };

    // Economy balance patch: normalize runaway gems from previous version if player hasn't bought VIP
    if (!state.customizations.vipPass && state.gems > 90) {
      state.gems = 25;
    }

    const now = Date.now();
    const lastTime = state.lastSavedTimestamp || now;
    const elapsedSeconds = Math.max(0, Math.floor((now - lastTime) / 1000));

    const maxOfflineSecs = state.customizations.vipPass ? 24 * 3600 : 12 * 3600;
    const effectiveSecs = Math.min(elapsedSeconds, maxOfflineSecs);

    const passivePerSec = calculatePassiveIncome(state);
    let offlineEarned = 0;

    if (effectiveSecs >= 15 && passivePerSec > 0) {
      const efficiency = state.customizations.vipPass ? 1.0 : 0.8;
      offlineEarned = Number((effectiveSecs * passivePerSec * efficiency).toFixed(2));
      state.balance = Number((state.balance + offlineEarned).toFixed(2));
      state.lifetimeEarned = Number((state.lifetimeEarned + offlineEarned).toFixed(2));
    }

    state.lastSavedTimestamp = now;
    state.tapPower = calculateTapPower(state);

    return {
      state,
      offlineSeconds: effectiveSecs,
      offlineEarned,
    };
  } catch (e) {
    console.error('Failed to load game state from localStorage', e);
    const defaults = getDefaultState();
    return { state: defaults, offlineSeconds: 0, offlineEarned: 0 };
  }
}

export function saveGameState(state: GameState): void {
  try {
    const updated = {
      ...state,
      lastSavedTimestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save game state', e);
  }
}

export function exportBackup(state: GameState): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `ahorropulse_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function resetGameState(): GameState {
  const defaults = getDefaultState();
  localStorage.removeItem(STORAGE_KEY);
  return defaults;
}
