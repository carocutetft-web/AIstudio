import React, { useState, useEffect, useRef } from 'react';
import { PiggySkinId, SceneEnvironmentId, TapFXId, Language } from '../types/game';
import { PiggyBankGraphic } from './PiggyBankGraphic';
import { SceneBackdrop } from './SceneBackdrop';
import { FlyingBalloon } from './FlyingBalloon';
import { sound } from '../utils/audio';
import { formatMoney } from '../utils/numberFormat';
import { Sparkles, Zap, Flame, Paintbrush, Layers } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';

interface FloatingNumber {
  id: number;
  x: number;
  y: number;
  text: string;
  isCrit: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  symbol: string;
  color: string;
}

interface Props {
  skin: PiggySkinId;
  environment: SceneEnvironmentId;
  fx: TapFXId;
  tapPower: number;
  passiveRate: number;
  onTap: (earned: number) => void;
  onPopBalloon: (reward: { type: 'cash' | 'gems' | 'frenzy'; value: number }) => void;
  onOpenCustomizer: () => void;
  lang: Language;
}

export const PiggyBankClicker: React.FC<Props> = ({
  skin,
  environment,
  fx,
  tapPower,
  passiveRate,
  onTap,
  onPopBalloon,
  onOpenCustomizer,
  lang,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [combo, setCombo] = useState(1);
  const [comboPoints, setComboPoints] = useState(0); // 0 to 100
  const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  const comboTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  // Decay combo points if not tapping
  useEffect(() => {
    const interval = setInterval(() => {
      setComboPoints((prev) => {
        if (prev <= 0) {
          setCombo(1);
          return 0;
        }
        const next = Math.max(0, prev - 4);
        if (next < 25) setCombo(1);
        else if (next < 60) setCombo(1.5);
        else if (next < 90) setCombo(2);
        else setCombo(3);
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const getFXParticleSymbols = (type: TapFXId): { symbols: string[]; colors: string[] } => {
    switch (type) {
      case 'emerald':
        return {
          symbols: ['💎', '✨', '❇️', '💵'],
          colors: ['#10b981', '#34d399', '#059669'],
        };
      case 'bullion':
        return {
          symbols: ['🪙', '👑', '⭐', '💰'],
          colors: ['#fbbf24', '#f59e0b', '#fde047'],
        };
      case 'glitch':
        return {
          symbols: ['⚡', '💠', '👾', '🔥'],
          colors: ['#06b6d4', '#f43f5e', '#a855f7'],
        };
      case 'coins':
      default:
        return {
          symbols: ['💵', '🪙', '✨', '📈'],
          colors: ['#22c55e', '#eab308', '#38bdf8'],
        };
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsPressed(true);

    const rect = containerRef.current?.getBoundingClientRect();
    const clickX = rect ? e.clientX - rect.left : 140;
    const clickY = rect ? e.clientY - rect.top : 120;

    // Combo progression
    setComboPoints((prev) => {
      const next = Math.min(100, prev + 12);
      if (next >= 90) setCombo(3);
      else if (next >= 60) setCombo(2);
      else if (next >= 25) setCombo(1.5);
      return next;
    });

    // 15% chance of critical tap
    const isCrit = Math.random() < 0.15;
    const critMultiplier = isCrit ? 2.5 : 1.0;
    const finalEarned = Number((tapPower * combo * critMultiplier).toFixed(2));

    // Sound
    sound.playTap(combo);

    // Add floating number
    const numId = Date.now() + Math.random();
    const formattedEarned = formatMoney(finalEarned, lang, { compact: finalEarned >= 10000 });
    const newNum: FloatingNumber = {
      id: numId,
      x: clickX,
      y: clickY,
      text: isCrit ? `🔥 +${formattedEarned} CRIT!` : `+${formattedEarned}`,
      isCrit,
    };

    setFloatingNumbers((prev) => [...prev.slice(-12), newNum]);

    // Spawn 4 micro-particles
    const fxConfig = getFXParticleSymbols(fx);
    const newParticles: Particle[] = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: clickX + (Math.random() * 40 - 20),
      y: clickY + (Math.random() * 40 - 20),
      vx: (Math.random() - 0.5) * 8,
      vy: -Math.random() * 6 - 2,
      symbol: fxConfig.symbols[Math.floor(Math.random() * fxConfig.symbols.length)],
      color: fxConfig.colors[Math.floor(Math.random() * fxConfig.colors.length)],
    }));

    setParticles((prev) => [...prev.slice(-16), ...newParticles]);

    onTap(finalEarned);

    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
    comboTimerRef.current = setTimeout(() => {
      setIsPressed(false);
    }, 120);
  };

  return (
    <div className="flex flex-col items-center justify-center relative w-full max-w-md mx-auto select-none">
      {/* Combo Rush Meter */}
      <div className="w-full px-6 mb-2">
        <div className="flex items-center justify-between text-xs font-bold mb-1">
          <span className="flex items-center gap-1 text-slate-300">
            <Flame className={`w-3.5 h-3.5 ${combo > 1 ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
            <span>{t.combo_label}</span>
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-extrabold transition-all duration-300 ${
            combo >= 3
              ? 'bg-rose-500/30 text-rose-300 border border-rose-500/50 shadow-lg shadow-rose-500/20'
              : combo >= 2
              ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
              : combo > 1
              ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
              : 'text-slate-400'
          }`}>
            x{combo.toFixed(1)} {combo >= 2 && '🔥'}
          </span>
        </div>

        {/* Progress Track */}
        <div className="h-2 w-full rounded-full bg-slate-800/80 p-0.5 overflow-hidden border border-slate-700/50">
          <div
            className={`h-full rounded-full transition-all duration-150 ${
              combo >= 3
                ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500 shadow-md shadow-rose-500/50'
                : combo >= 2
                ? 'bg-gradient-to-r from-emerald-400 to-amber-400'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${comboPoints}%` }}
          />
        </div>
      </div>

      {/* Main Stage Container with Scene Backdrop */}
      <div className="relative w-full h-72 sm:h-80 flex items-center justify-center rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl overflow-hidden p-4">
        {/* Environmental Backdrop */}
        <SceneBackdrop environment={environment} />

        {/* Quick in-scene customize button */}
        <button
          onClick={onOpenCustomizer}
          className="absolute top-3 right-3 z-30 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shadow-md flex items-center gap-1.5 text-xs font-bold transition active:scale-95 cursor-pointer backdrop-blur-sm"
          title={lang === 'es' ? 'Personalizar Alcancía y Fondo' : 'Customize Character & Backdrop'}
        >
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">{lang === 'es' ? 'Personalizar' : 'Customize'}</span>
        </button>

        {/* Interactive Flying Balloon / Gift Drone */}
        <FlyingBalloon
          tapPower={tapPower}
          passiveRate={passiveRate}
          onPop={onPopBalloon}
          lang={lang}
        />

        {/* Interactive Piggy Box */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center cursor-pointer touch-none active:scale-95 transition-transform z-20"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {/* Ambient Pulsing Aura */}
          <div
            className={`absolute inset-4 rounded-full filter blur-2xl opacity-40 transition-all duration-300 pointer-events-none ${
              combo >= 3
                ? 'bg-rose-500 scale-110 animate-pulse'
                : combo >= 2
                ? 'bg-amber-400 scale-105'
                : 'bg-emerald-500/60'
            }`}
          />

          {/* Piggy Graphic */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <PiggyBankGraphic
              skin={skin}
              isPressed={isPressed}
              comboCount={comboPoints}
            />
          </div>

          {/* Floating Numbers */}
          {floatingNumbers.map((num) => (
            <div
              key={num.id}
              className={`absolute animate-float-fade font-mono font-black z-30 pointer-events-none ${
                num.isCrit
                  ? 'text-lg sm:text-xl text-yellow-300 drop-shadow-[0_2px_10px_rgba(234,179,8,0.8)]'
                  : 'text-base sm:text-lg text-emerald-300 drop-shadow-[0_2px_6px_rgba(16,185,129,0.7)]'
              }`}
              style={{ left: `${num.x}px`, top: `${num.y - 20}px` }}
            >
              {num.text}
            </div>
          ))}

          {/* Particle bursts */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute animate-float-fade text-sm pointer-events-none z-20"
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                color: p.color,
              }}
            >
              {p.symbol}
            </div>
          ))}
        </div>
      </div>

      {/* Tap prompt */}
      <p className="text-xs text-slate-400/90 text-center font-medium mt-2 flex items-center gap-1.5 px-4">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>{t.tap_prompt}</span>
      </p>
    </div>
  );
};
