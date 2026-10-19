export type Language = 'es' | 'en';

export type ThemeId = 'mint' | 'cyberpunk' | 'gold' | 'sunset' | 'cosmic';

export type PiggySkinId =
  | 'classic'
  | 'monopoly'
  | 'cyber'
  | 'diamond'
  | 'cat'
  | 'cosmic'
  | 'bull'
  | 'dragon'
  | 'steampunk'
  | 'arcade'
  | 'vampire'
  | 'zen'
  | 'pharaoh';

export type SceneEnvironmentId =
  | 'studio'
  | 'wallstreet'
  | 'cyber_rooftop'
  | 'fortknox'
  | 'tropical'
  | 'space'
  | 'akihabara'
  | 'castle'
  | 'sunset_cafe'
  | 'egypt';

export type AppWallpaperId =
  | 'emerald_vault'
  | 'synthwave_sunset'
  | 'aurora'
  | 'cyber_city'
  | 'lofi_room'
  | 'deep_space'
  | 'candy_pop'
  | 'tokyo_arcade'
  | 'minimal_zen'
  | 'wallstreet_trading'
  | 'gold_palace'
  | 'miami_sunrise';

export type TapFXId = 'coins' | 'emerald' | 'bullion' | 'glitch';

export interface AutoSaver {
  id: string;
  nameKey: string;
  descKey: string;
  baseCost: number;
  baseIncome: number; // per second
  icon: string;
  growthRate: number;
}

export interface ClickUpgrade {
  id: string;
  nameKey: string;
  descKey: string;
  baseCost: number;
  clickBonus: number;
  icon: string;
  growthRate: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  icon: string;
  color: string;
  completed: boolean;
  isCustom?: boolean;
}

export interface RealSavingLog {
  id: string;
  note: string;
  amount: number;
  date: string;
  timestamp: number;
}

export interface StoreItem {
  id: string;
  type: 'theme' | 'skin' | 'backdrop' | 'wallpaper' | 'fx' | 'vip' | 'gems';
  itemId?: string; // target id for theme, skin, backdrop, wallpaper, fx
  nameKey: string;
  descKey: string;
  priceUSD: number;
  gemCost?: number; // can also be bought with gems earned in-game
  gemReward?: number; // for gem packs
  badge?: string;
  previewColor?: string;
  icon: string;
}

export type AchievementCategory =
  | 'clicks'
  | 'wealth'
  | 'income'
  | 'streaks'
  | 'real_savings'
  | 'goals'
  | 'collection'
  | 'minievents';

export interface Achievement {
  id: string;
  titleKey: string;
  descKey: string;
  category: AchievementCategory;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  targetValue: number;
  rewardGems: number;
  rewardCash: number;
  icon: string;
  checkUnlocked: (state: GameState) => boolean;
  getProgress: (state: GameState) => { current: number; target: number; percent: number };
}

export interface FinancialDilemma {
  id: string;
  titleKey: string;
  promptKey: string;
  difficulty: 'intermediate' | 'hard' | 'expert';
  categoryKey: string;
  options: {
    textKey: string;
    isMindful: boolean;
    isOptimal?: boolean;
    cashRewardMultiplier: number;
    gemReward: number; // strictly 0 or 1
    feedbackKey: string;
    financialAnalysisKey?: string;
  }[];
}

export interface GameState {
  balance: number;
  lifetimeEarned: number;
  gems: number;
  tapPower: number;
  lastSavedTimestamp: number;
  streak: {
    currentStreak: number;
    lastClaimDate: string; // YYYY-MM-DD
    totalDaysClaimed: number;
  };
  autoSavers: Record<string, number>; // id -> level
  clickUpgrades: Record<string, number>; // id -> level
  goals: SavingsGoal[];
  realSavingLogs: RealSavingLog[];
  unlockedAchievements: string[]; // achievement IDs
  solvedDilemmas: string[]; // dilemma IDs solved so far to prevent immediate repetition
  customizations: {
    activeTheme: ThemeId;
    activeSkin: PiggySkinId;
    activeEnvironment: SceneEnvironmentId;
    activeWallpaper: AppWallpaperId;
    activeTapFX: TapFXId;
    unlockedThemes: ThemeId[];
    unlockedSkins: PiggySkinId[];
    unlockedEnvironments: SceneEnvironmentId[];
    unlockedWallpapers: AppWallpaperId[];
    unlockedTapFX: TapFXId[];
    vipPass: boolean;
    soundEnabled: boolean;
    hapticsEnabled: boolean;
  };
  stats: {
    totalClicks: number;
    realSavingsLogged: number;
    realAmountLogged: number;
    goalsCompleted: number;
    balloonsPopped: number;
    dilemmasSolved: number;
    frenziesReached: number;
    totalDepositedToGoals: number;
  };
  language: Language;
}
