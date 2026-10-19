import React from 'react';
import { SceneEnvironmentId } from '../types/game';

interface Props {
  environment: SceneEnvironmentId;
}

export const SceneBackdrop: React.FC<Props> = ({ environment }) => {
  switch (environment) {
    case 'wallstreet':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-40">
          {/* Skyscraper Skyline Silhouettes */}
          <div className="absolute inset-x-0 bottom-0 h-48 flex items-end justify-between px-2 gap-1.5 opacity-60">
            <div className="w-12 h-36 bg-slate-800 rounded-t-sm" />
            <div className="w-16 h-44 bg-slate-700/80 rounded-t-sm" />
            <div className="w-10 h-28 bg-slate-800 rounded-t-sm" />
            <div className="w-20 h-48 bg-slate-700 rounded-t-sm" />
            <div className="w-14 h-32 bg-slate-800/90 rounded-t-sm" />
            <div className="w-16 h-40 bg-slate-700/70 rounded-t-sm" />
          </div>

          {/* Wall Street Ticker Tape */}
          <div className="absolute top-2 inset-x-0 overflow-hidden whitespace-nowrap text-[10px] font-mono text-emerald-400 bg-slate-950/70 py-1 border-y border-emerald-500/20">
            <div className="animate-marquee inline-block">
              ▲ SPY +1.4% &nbsp; ▲ AAPL +2.1% &nbsp; ▲ BTC +3.8% &nbsp; ▲ SAVINGS +100% &nbsp; ▲ DIVIDEND +4.2% &nbsp; ▲ COMPOUNDING +999% &nbsp;
            </div>
          </div>

          {/* Penthouse Glass Window Grids */}
          <div className="absolute inset-0 border-x-4 border-slate-700/40" />
        </div>
      );

    case 'fortknox':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-35">
          {/* Heavy Vault Blast Door Outer Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 rounded-full border-8 border-amber-500/40 border-dashed animate-spin" style={{ animationDuration: '60s' }} />
          </div>

          {/* Stacks of Gold Bullion Bricks at the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 flex items-end justify-center gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-12 h-6 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-sm shadow-md border border-amber-300/40" />
            ))}
          </div>
        </div>
      );

    case 'cyber_rooftop':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-40">
          {/* Cyber Neon Grid */}
          <div
            className="absolute inset-x-0 bottom-0 h-40 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #ec4899 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              transform: 'perspective(200px) rotateX(60deg)',
            }}
          />

          {/* Holographic Japanese Signs */}
          <div className="absolute top-4 right-4 text-xs font-mono text-cyan-400 border border-cyan-400/40 p-1.5 rounded bg-cyan-950/40 animate-pulse">
            CYBER-BANK // 貯蓄
          </div>
        </div>
      );

    case 'tropical':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-35">
          {/* Sun & Ocean Waves */}
          <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-amber-400/40 blur-md" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-teal-500/20 to-transparent" />
          {/* Palm Silhouette */}
          <div className="absolute -top-4 -left-4 text-4xl opacity-50 select-none">🌴</div>
          <div className="absolute -top-2 right-2 text-3xl opacity-40 select-none">🏝️</div>
        </div>
      );

    case 'space':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-40">
          {/* Earth Horizon Arc */}
          <div className="absolute -bottom-48 inset-x-0 h-72 rounded-full border-t-4 border-cyan-400 bg-gradient-to-b from-blue-600/30 via-slate-900 to-transparent blur-sm" />
          {/* Starry dots */}
          <div className="absolute top-6 left-12 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <div className="absolute top-16 right-20 w-1 h-1 rounded-full bg-amber-200" />
          <div className="absolute bottom-24 left-8 w-1.5 h-1.5 rounded-full bg-purple-300" />
        </div>
      );

    case 'akihabara':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-35">
          {/* Red Lanterns */}
          <div className="absolute top-2 left-6 text-2xl select-none animate-bounce" style={{ animationDuration: '3s' }}>🏮</div>
          <div className="absolute top-2 right-6 text-2xl select-none animate-bounce" style={{ animationDuration: '3.5s' }}>🏮</div>
          <div className="absolute bottom-2 inset-x-0 text-center text-[10px] font-mono text-rose-400">
            秋葉原 // FUTURE SAVINGS ARCADE
          </div>
        </div>
      );

    case 'castle':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-35">
          {/* Castle Torches & Arch */}
          <div className="absolute top-4 left-6 text-xl select-none animate-pulse">🔥</div>
          <div className="absolute top-4 right-6 text-xl select-none animate-pulse">🔥</div>
          <div className="absolute bottom-2 inset-x-0 flex justify-center gap-6 text-2xl opacity-60">
            <span>👑</span>
            <span>💎</span>
            <span>🪙</span>
          </div>
        </div>
      );

    case 'sunset_cafe':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-35">
          {/* Warm Bistro String Lights */}
          <div className="absolute top-2 inset-x-0 flex justify-around">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-md shadow-amber-300/80 animate-pulse" />
            ))}
          </div>
          <div className="absolute bottom-2 right-4 text-2xl opacity-50">☕</div>
        </div>
      );

    case 'egypt':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-35">
          {/* Pyramids Silhouette */}
          <div className="absolute bottom-0 inset-x-0 flex items-end justify-center gap-4">
            <polygon points="0,60 40,0 80,60" className="w-20 h-16 fill-amber-600/30" />
            <polygon points="0,80 50,0 100,80" className="w-28 h-20 fill-amber-700/40" />
          </div>
          <div className="absolute top-4 left-8 text-2xl opacity-50">☀️</div>
        </div>
      );

    case 'studio':
    default:
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-20">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-cyan-500/10" />
        </div>
      );
  }
};
