import React from 'react';
import { AppWallpaperId } from '../types/game';

interface Props {
  wallpaper: AppWallpaperId;
}

export const AppBackground: React.FC<Props> = ({ wallpaper }) => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-all duration-700 select-none"
    >
      {/* 1. EMERALD VAULT */}
      {wallpaper === 'emerald_vault' && (
        <div className="absolute inset-0 bg-[#070e17]">
          {/* Radial ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[130px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]" />
          {/* Subtle vault geometric circle pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="vault_grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="32" fill="none" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 3" />
                <circle cx="40" cy="40" r="16" fill="none" stroke="#34d399" strokeWidth="0.5" />
                <path d="M40 0 L40 80 M0 40 L80 40" stroke="#059669" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vault_grid)" />
          </svg>
        </div>
      )}

      {/* 2. SYNTHWAVE SUNSET */}
      {wallpaper === 'synthwave_sunset' && (
        <div className="absolute inset-0 bg-[#120726]">
          {/* Pulsing neon sun */}
          <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-t from-[#f43f5e] via-[#fb7185] to-[#fbbf24] shadow-[0_0_90px_rgba(244,63,94,0.6)] opacity-85" />
          {/* Sun horizontal blinds lines */}
          <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-72 h-32 flex flex-col justify-between opacity-70">
            <div className="h-1 bg-[#120726]" />
            <div className="h-1.5 bg-[#120726]" />
            <div className="h-2 bg-[#120726]" />
            <div className="h-2.5 bg-[#120726]" />
            <div className="h-3 bg-[#120726]" />
            <div className="h-4 bg-[#120726]" />
          </div>
          {/* Wireframe perspective grid floor */}
          <div
            className="absolute bottom-0 inset-x-0 h-1/2 opacity-35"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ec4899 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              transform: 'perspective(400px) rotateX(65deg)',
              transformOrigin: 'bottom center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090214] via-transparent to-[#0a0318]/70" />
        </div>
      )}

      {/* 3. AURORA BOREALIS */}
      {wallpaper === 'aurora' && (
        <div className="absolute inset-0 bg-[#040d1a]">
          {/* Shifting aurora bands */}
          <div className="absolute -top-20 -left-20 w-[120%] h-96 bg-gradient-to-r from-emerald-500/25 via-cyan-400/30 to-purple-500/20 rounded-full blur-[90px] animate-pulse" />
          <div className="absolute top-32 -right-20 w-[110%] h-80 bg-gradient-to-l from-teal-400/20 via-sky-500/25 to-emerald-400/20 rounded-full blur-[100px]" />
          {/* Distant star dots */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#67e8f9 1px, transparent 1px)',
              backgroundSize: '90px 90px, 140px 140px',
              backgroundPosition: '0 0, 40px 60px',
            }}
          />
          {/* Bottom mountain tree silhouettes */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#02070e] to-transparent opacity-90" />
        </div>
      )}

      {/* 4. CYBER CITY */}
      {wallpaper === 'cyber_city' && (
        <div className="absolute inset-0 bg-[#060813]">
          {/* Cyber light leaks */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-[110px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/15 rounded-full blur-[110px]" />
          {/* Skyscraper silhouettes */}
          <svg className="absolute bottom-0 inset-x-0 w-full h-72 opacity-25" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <polygon points="0,300 0,160 60,160 60,120 120,120 120,300" fill="#0ea5e9" />
            <polygon points="140,300 140,80 200,80 200,300" fill="#ec4899" />
            <polygon points="220,300 220,190 280,190 280,300" fill="#06b6d4" />
            <polygon points="310,300 310,60 380,60 380,300" fill="#a855f7" />
            <polygon points="410,300 410,140 480,140 480,300" fill="#3b82f6" />
            <polygon points="510,300 510,90 570,90 570,300" fill="#ec4899" />
            <polygon points="600,300 600,180 660,180 660,300" fill="#06b6d4" />
            <polygon points="690,300 690,110 770,110 770,300" fill="#8b5cf6" />
            <polygon points="800,300 800,70 870,70 870,300" fill="#0ea5e9" />
            <polygon points="900,300 900,150 1000,150 1000,300" fill="#d946ef" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060c] via-transparent to-[#04060c]/80" />
        </div>
      )}

      {/* 5. LO-FI SUNSET ROOM */}
      {wallpaper === 'lofi_room' && (
        <div className="absolute inset-0 bg-[#170e13]">
          {/* Warm dusk amber glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-gradient-to-b from-[#f97316]/25 via-[#e11d48]/15 to-transparent rounded-full blur-[100px]" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[80px]" />
          {/* Cozy horizontal window frame lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="lofi_stripes" width="100" height="24" patternUnits="userSpaceOnUse">
                <line x1="0" y1="23" x2="100" y2="23" stroke="#fb923c" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lofi_stripes)" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d070b] via-transparent to-[#10090e]" />
        </div>
      )}

      {/* 6. DEEP SPACE NEBULA */}
      {wallpaper === 'deep_space' && (
        <div className="absolute inset-0 bg-[#05030c]">
          {/* Swirling galactic nebula */}
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[100px]" />
          {/* Dense twinkling starfield */}
          <div
            className="absolute inset-0 opacity-55"
            style={{
              backgroundImage:
                'radial-gradient(#ffffff 1.2px, transparent 1.2px), radial-gradient(#c084fc 1px, transparent 1px), radial-gradient(#38bdf8 0.8px, transparent 0.8px)',
              backgroundSize: '75px 75px, 130px 130px, 200px 200px',
              backgroundPosition: '0 0, 30px 50px, 80px 120px',
            }}
          />
        </div>
      )}

      {/* 7. CANDY POP PASTEL */}
      {wallpaper === 'candy_pop' && (
        <div className="absolute inset-0 bg-[#160c19]">
          {/* Soft bubble ambient blooms */}
          <div className="absolute top-12 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-[90px]" />
          <div className="absolute bottom-24 right-12 w-80 h-80 bg-cyan-400/20 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px]" />
          {/* Floating pastel bubble circles */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15%" cy="20%" r="28" fill="#f472b6" />
            <circle cx="85%" cy="30%" r="35" fill="#38bdf8" />
            <circle cx="30%" cy="75%" r="42" fill="#c084fc" />
            <circle cx="75%" cy="85%" r="25" fill="#facc15" />
            <circle cx="60%" cy="15%" r="18" fill="#4ade80" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0712] via-transparent to-[#100813]/80" />
        </div>
      )}

      {/* 8. TOKYO ARCADE NIGHT */}
      {wallpaper === 'tokyo_arcade' && (
        <div className="absolute inset-0 bg-[#0a0514]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />
          {/* Arcade dotted pixel matrix */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#ec4899 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0514]/60 via-transparent to-[#0a0514]" />
        </div>
      )}

      {/* 9. MINIMAL ZEN GARDEN */}
      {wallpaper === 'minimal_zen' && (
        <div className="absolute inset-0 bg-[#09110d]">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-[130px]" />
          {/* Zen concentric circle wave ripple */}
          <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="zen_ripples" width="120" height="120" patternUnits="userSpaceOnUse">
                <circle cx="60" cy="60" r="20" fill="none" stroke="#6ee7b7" strokeWidth="0.8" />
                <circle cx="60" cy="60" r="35" fill="none" stroke="#6ee7b7" strokeWidth="0.8" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#6ee7b7" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#zen_ripples)" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-[#060b08] to-transparent" />
        </div>
      )}

      {/* 10. WALL STREET TRADING */}
      {wallpaper === 'wallstreet_trading' && (
        <div className="absolute inset-0 bg-[#040e0b]">
          <div className="absolute top-10 left-1/3 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[130px]" />
          {/* Financial Candlestick Chart silhouettes */}
          <svg className="absolute bottom-0 inset-x-0 w-full h-80 opacity-20" viewBox="0 0 1000 300" preserveAspectRatio="none">
            {/* Green and red candlesticks */}
            <rect x="50" y="160" width="18" height="60" fill="#10b981" />
            <line x1="59" y1="130" x2="59" y2="240" stroke="#10b981" strokeWidth="2" />
            <rect x="110" y="120" width="18" height="80" fill="#10b981" />
            <line x1="119" y1="90" x2="119" y2="220" stroke="#10b981" strokeWidth="2" />
            <rect x="170" y="150" width="18" height="50" fill="#ef4444" />
            <line x1="179" y1="130" x2="179" y2="230" stroke="#ef4444" strokeWidth="2" />
            <rect x="230" y="110" width="18" height="70" fill="#10b981" />
            <line x1="239" y1="70" x2="239" y2="200" stroke="#10b981" strokeWidth="2" />
            <rect x="290" y="90" width="18" height="90" fill="#10b981" />
            <line x1="299" y1="50" x2="299" y2="210" stroke="#10b981" strokeWidth="2" />
            <rect x="350" y="140" width="18" height="40" fill="#ef4444" />
            <line x1="359" y1="110" x2="359" y2="210" stroke="#ef4444" strokeWidth="2" />
            <rect x="410" y="70" width="18" height="110" fill="#10b981" />
            <line x1="419" y1="30" x2="419" y2="220" stroke="#10b981" strokeWidth="2" />
            <rect x="470" y="50" width="18" height="130" fill="#10b981" />
            <line x1="479" y1="20" x2="479" y2="210" stroke="#10b981" strokeWidth="2" />
            <rect x="530" y="90" width="18" height="60" fill="#ef4444" />
            <line x1="539" y1="60" x2="539" y2="180" stroke="#ef4444" strokeWidth="2" />
            <rect x="590" y="40" width="18" height="140" fill="#10b981" />
            <line x1="599" y1="10" x2="599" y2="210" stroke="#10b981" strokeWidth="2" />
            <rect x="650" y="30" width="18" height="120" fill="#10b981" />
            <line x1="659" y1="5" x2="659" y2="180" stroke="#10b981" strokeWidth="2" />
            <rect x="710" y="80" width="18" height="50" fill="#ef4444" />
            <line x1="719" y1="50" x2="719" y2="160" stroke="#ef4444" strokeWidth="2" />
            <rect x="770" y="20" width="18" height="150" fill="#10b981" />
            <line x1="779" y1="0" x2="779" y2="200" stroke="#10b981" strokeWidth="2" />
            <rect x="830" y="10" width="18" height="160" fill="#10b981" />
            <line x1="839" y1="0" x2="839" y2="190" stroke="#10b981" strokeWidth="2" />
            <rect x="890" y="40" width="18" height="90" fill="#ef4444" />
            <line x1="899" y1="20" x2="899" y2="160" stroke="#ef4444" strokeWidth="2" />
            <rect x="950" y="10" width="18" height="170" fill="#10b981" />
            <line x1="959" y1="0" x2="959" y2="200" stroke="#10b981" strokeWidth="2" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020705] via-transparent to-[#030a07]" />
        </div>
      )}

      {/* 11. GOLD PALACE */}
      {wallpaper === 'gold_palace' && (
        <div className="absolute inset-0 bg-[#161007]">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[600px] bg-amber-500/20 rounded-full blur-[130px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-600/15 rounded-full blur-[110px]" />
          {/* Opulent baroque diamond lattice */}
          <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="palace_lattice" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#f59e0b" strokeWidth="0.8" />
                <circle cx="30" cy="30" r="3" fill="#fbbf24" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#palace_lattice)" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0903] via-transparent to-[#0d0903]" />
        </div>
      )}

      {/* 12. MIAMI SUNRISE */}
      {wallpaper === 'miami_sunrise' && (
        <div className="absolute inset-0 bg-[#12081a]">
          {/* Flamingo pink and cyan ocean gradient */}
          <div className="absolute top-0 inset-x-0 h-2/3 bg-gradient-to-b from-[#ec4899]/25 via-[#f43f5e]/15 to-transparent blur-[80px]" />
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#06b6d4]/20 to-transparent blur-[80px]" />
          {/* Palm silhouette */}
          <svg className="absolute bottom-0 left-0 w-72 h-80 opacity-30" viewBox="0 0 200 250" fill="#f43f5e">
            <path d="M100,250 Q110,180 120,100 Q130,50 140,0 Q120,40 100,70 Q70,90 20,100 Q60,110 90,110 Q50,140 10,160 Q60,160 90,140 Q80,180 50,220 Q90,190 100,160 Z" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-[#09030e] via-transparent to-[#0a0410]/80" />
        </div>
      )}
    </div>
  );
};
