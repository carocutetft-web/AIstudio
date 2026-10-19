import { useState, useEffect, useRef } from 'react';
import { GameState, FinancialDilemma } from '../types/game';
import { calculatePassiveIncome, saveGameState } from '../utils/storage';
import { FINANCIAL_DILEMMAS } from '../data/dilemmasData';

interface UseGameLoopOptions {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export function useGameLoop({ gameState, setGameState }: UseGameLoopOptions) {
  const [frenzyMultiplier, setFrenzyMultiplier] = useState(1);
  const [activeDilemma, setActiveDilemma] = useState<FinancialDilemma | null>(null);

  const basePassive = calculatePassiveIncome(gameState);
  const passiveRate = basePassive * frenzyMultiplier;

  // Numerical safety: use an accumulator ref for smooth high-wealth addition without float precision loss
  const accumulatorRef = useRef(0);
  const lastTickTimeRef = useRef(Date.now());

  // Passive income game loop (runs every 250ms for low CPU and zero bottleneck)
  useEffect(() => {
    lastTickTimeRef.current = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const deltaSeconds = (now - lastTickTimeRef.current) / 1000;
      lastTickTimeRef.current = now;

      if (passiveRate <= 0 || deltaSeconds <= 0) return;

      const earned = passiveRate * deltaSeconds;

      setGameState((prev) => {
        // High-precision arithmetic: avoid expensive string conversions on large numbers
        const newBalance = prev.balance + earned;
        const newLifetime = prev.lifetimeEarned + earned;

        return {
          ...prev,
          balance: newBalance,
          lifetimeEarned: newLifetime,
        };
      });
    }, 250);

    return () => clearInterval(interval);
  }, [passiveRate, setGameState]);

  // Periodic auto-save to localStorage (every 3 seconds)
  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveGameState(gameState);
    }, 3000);

    return () => clearInterval(saveInterval);
  }, [gameState]);

  // Non-repeating Financial Dilemma scheduler
  // Keeps track of solvedDilemmas in state; picks from unseen dilemmas first!
  useEffect(() => {
    const scheduleDilemma = () => {
      const delay = Math.random() * 45000 + 70000; // 70-115s interval
      return setTimeout(() => {
        if (!activeDilemma) {
          triggerNextDilemma();
        }
      }, delay);
    };

    const timer = scheduleDilemma();
    return () => clearTimeout(timer);
  }, [activeDilemma, gameState.solvedDilemmas]);

  const triggerNextDilemma = () => {
    const solvedSet = new Set(gameState.solvedDilemmas || []);
    // Filter out dilemmas that were already solved in this cycle
    const uncompleted = FINANCIAL_DILEMMAS.filter((d) => !solvedSet.has(d.id));

    let chosen: FinancialDilemma;
    if (uncompleted.length > 0) {
      const randomIndex = Math.floor(Math.random() * uncompleted.length);
      chosen = uncompleted[randomIndex];
    } else {
      // If all 20+ have been solved, pick any and start a fresh cycle
      const randomIndex = Math.floor(Math.random() * FINANCIAL_DILEMMAS.length);
      chosen = FINANCIAL_DILEMMAS[randomIndex];
    }

    setActiveDilemma(chosen);
  };

  const activateFrenzy = (multiplier: number = 3, durationMs: number = 15000) => {
    setFrenzyMultiplier(multiplier);
    setTimeout(() => {
      setFrenzyMultiplier(1);
    }, durationMs);
  };

  return {
    passiveRate,
    frenzyMultiplier,
    activeDilemma,
    setActiveDilemma,
    triggerNextDilemma,
    activateFrenzy,
  };
}
