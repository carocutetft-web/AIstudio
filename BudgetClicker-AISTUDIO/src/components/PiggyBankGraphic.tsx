import React from 'react';
import { PiggySkinId } from '../types/game';

interface Props {
  skin: PiggySkinId;
  isPressed: boolean;
  comboCount: number;
}

export const PiggyBankGraphic: React.FC<Props> = ({ skin, isPressed, comboCount }) => {
  const isSuperCharged = comboCount >= 10;

  switch (skin) {
    // 1. Monopoly Tycoon Guy Piggy (Requested by user!)
    case 'monopoly':
      return (
        <svg
          viewBox="0 0 320 300"
          className={`w-full h-full drop-shadow-2xl transition-transform duration-100 ${
            isPressed ? 'scale-90' : 'scale-100'
          }`}
        >
          <defs>
            <linearGradient id="monoSuit" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="monoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>

          {/* Golden Gentleman Cane on the right */}
          <path d="M 270 140 C 290 120, 305 150, 285 165 L 275 250" fill="none" stroke="url(#monoGold)" strokeWidth="6" strokeLinecap="round" />

          {/* Ears */}
          <path d="M 105 105 C 85 65, 125 55, 135 85 Z" fill="#f472b6" stroke="#fda4af" strokeWidth="2.5" />
          <path d="M 215 105 C 235 65, 195 55, 185 85 Z" fill="#f472b6" stroke="#fda4af" strokeWidth="2.5" />

          {/* Legs with polished black dress shoes */}
          <rect x="95" y="230" width="32" height="34" rx="8" fill="#020617" />
          <rect x="195" y="230" width="32" height="34" rx="8" fill="#020617" />

          {/* Body */}
          <ellipse cx="160" cy="180" rx="105" ry="80" fill="#fbcfe8" stroke="#f472b6" strokeWidth="3" />

          {/* Tuxedo Jacket */}
          <path d="M 85 180 C 85 240, 235 240, 235 180 L 195 240 L 125 240 Z" fill="url(#monoSuit)" />
          {/* White Shirt Collar */}
          <polygon points="160,185 140,210 180,210" fill="#ffffff" />
          {/* Red Silk Bowtie */}
          <polygon points="145,190 175,190 160,198" fill="#dc2626" />
          <polygon points="145,206 175,206 160,198" fill="#dc2626" />
          <circle cx="160" cy="198" r="4" fill="#991b1b" />

          {/* Golden Pocket Watch Chain */}
          <path d="M 130 220 Q 160 235 190 220" fill="none" stroke="url(#monoGold)" strokeWidth="3" strokeDasharray="3 3" />

          {/* Snout with rosy blush */}
          <ellipse cx="160" cy="165" rx="28" ry="20" fill="#f472b6" stroke="#ec4899" strokeWidth="2" />
          <ellipse cx="152" cy="165" rx="4" ry="7" fill="#9f1239" opacity="0.8" />
          <ellipse cx="168" cy="165" rx="4" ry="7" fill="#9f1239" opacity="0.8" />

          {/* Dapper White Aristocrat Mustache */}
          <path d="M 160 174 Q 130 185 110 172 Q 135 198 160 178 Q 185 198 210 172 Q 190 185 160 174 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* Eyes: Right eye has gold Monocle! */}
          <circle cx="132" cy="142" r="7" fill="#0f172a" />
          <circle cx="130" cy="139" r="2.5" fill="#ffffff" />

          {/* Monocle on Left Eye */}
          <circle cx="188" cy="142" r="14" fill="#67e8f9" fillOpacity="0.35" stroke="url(#monoGold)" strokeWidth="3" />
          <circle cx="188" cy="142" r="6" fill="#0f172a" />
          <circle cx="186" cy="140" r="2" fill="#ffffff" />
          {/* Monocle Chain down to lapel */}
          <path d="M 200 148 Q 215 170 205 195" fill="none" stroke="url(#monoGold)" strokeWidth="2" />

          {/* Tall Black Top Hat with Ruby Red Ribbon */}
          <ellipse cx="160" cy="100" rx="60" ry="14" fill="#020617" stroke="#334155" strokeWidth="2" />
          <rect x="120" y="30" width="80" height="70" rx="8" fill="#020617" />
          <ellipse cx="160" cy="30" rx="40" ry="10" fill="#0f172a" />
          {/* Red Ribbon */}
          <rect x="120" y="86" width="80" height="12" fill="#e11d48" />
          <circle cx="160" cy="92" r="4" fill="url(#monoGold)" />

          {/* Dollar bills sticking out of top hat */}
          <rect x="175" y="15" width="22" height="30" rx="3" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" transform="rotate(18 175 15)" />
          <text x="179" y="35" fontSize="14" fontWeight="bold" fill="#ffffff" transform="rotate(18 175 15)">$</text>
        </svg>
      );

    // 2. Wall Street Golden Bull
    case 'bull':
      return (
        <svg
          viewBox="0 0 320 280"
          className={`w-full h-full drop-shadow-2xl transition-transform duration-100 ${
            isPressed ? 'scale-90' : 'scale-100'
          }`}
        >
          <defs>
            <linearGradient id="bullGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
          </defs>

          {/* Muscular Bull Horns */}
          <path d="M 100 80 C 60 20, 20 60, 40 100 C 60 70, 90 90, 100 95" fill="url(#bullGold)" stroke="#ca8a04" strokeWidth="3" />
          <path d="M 220 80 C 260 20, 300 60, 280 100 C 260 70, 230 90, 220 95" fill="url(#bullGold)" stroke="#ca8a04" strokeWidth="3" />

          {/* Ears */}
          <ellipse cx="75" cy="115" rx="20" ry="10" fill="#eab308" transform="rotate(-20 75 115)" />
          <ellipse cx="245" cy="115" rx="20" ry="10" fill="#eab308" transform="rotate(20 245 115)" />

          {/* Legs */}
          <rect x="90" y="210" width="35" height="38" rx="8" fill="#854d0e" />
          <rect x="195" y="210" width="35" height="38" rx="8" fill="#854d0e" />

          {/* Bull Body */}
          <ellipse cx="160" cy="155" rx="115" ry="85" fill="url(#bullGold)" stroke="#fde047" strokeWidth="4" />

          {/* Aviator Sunglasses */}
          <path d="M 105 115 Q 160 110 215 115 L 205 145 Q 160 135 115 145 Z" fill="#09090b" stroke="#facc15" strokeWidth="2.5" />
          {/* Glass glare reflection */}
          <line x1="125" y1="120" x2="140" y2="140" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
          <line x1="175" y1="120" x2="190" y2="140" stroke="#ffffff" strokeWidth="2" opacity="0.6" />

          {/* Snout with Golden Bull Ring */}
          <ellipse cx="160" cy="170" rx="35" ry="24" fill="#ca8a04" />
          <ellipse cx="148" cy="168" rx="6" ry="8" fill="#451a03" />
          <ellipse cx="172" cy="168" rx="6" ry="8" fill="#451a03" />
          {/* Golden Nose Ring */}
          <circle cx="160" cy="186" r="14" fill="none" stroke="#fef08a" strokeWidth="4" />

          {/* Thick Cuban Link Gold Chain */}
          <path d="M 95 185 Q 160 215 225 185" fill="none" stroke="#fde047" strokeWidth="8" strokeDasharray="10 4" />
        </svg>
      );

    // 3. Dragon Hoard Piggy
    case 'dragon':
      return (
        <svg
          viewBox="0 0 320 280"
          className={`w-full h-full drop-shadow-2xl transition-transform duration-100 ${
            isPressed ? 'scale-90' : 'scale-100'
          }`}
        >
          <defs>
            <linearGradient id="dragonRuby" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
            <linearGradient id="dragonGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>

          {/* Dragon Wings */}
          <path d="M 80 120 C 30 70, 40 10, 10 40 C 20 80, 50 110, 75 130 Z" fill="#b91c1c" stroke="#fca5a5" strokeWidth="2" />
          <path d="M 240 120 C 290 70, 280 10, 310 40 C 300 80, 270 110, 245 130 Z" fill="#b91c1c" stroke="#fca5a5" strokeWidth="2" />

          {/* Dragon Horns & Spines */}
          <polygon points="120,60 100,15 135,45" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
          <polygon points="200,60 220,15 185,45" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
          <polygon points="160,50 150,25 170,50" fill="#facc15" />

          {/* Dragon Body */}
          <ellipse cx="160" cy="150" rx="105" ry="85" fill="url(#dragonRuby)" stroke="#f87171" strokeWidth="3" />

          {/* Golden Belly Scales */}
          <path d="M 120 160 C 120 220, 200 220, 200 160" fill="url(#dragonGold)" opacity="0.9" />
          <line x1="135" y1="175" x2="185" y2="175" stroke="#854d0e" strokeWidth="2" />
          <line x1="140" y1="190" x2="180" y2="190" stroke="#854d0e" strokeWidth="2" />

          {/* Fierce Yellow Dragon Eyes */}
          <ellipse cx="120" cy="120" rx="9" ry="12" fill="#fde047" />
          <ellipse cx="120" cy="120" rx="2" ry="10" fill="#020617" />
          <ellipse cx="200" cy="120" rx="9" ry="12" fill="#fde047" />
          <ellipse cx="200" cy="120" rx="2" ry="10" fill="#020617" />

          {/* Snout with Smoke / Flame sparks */}
          <ellipse cx="160" cy="155" rx="26" ry="18" fill="#991b1b" stroke="#f87171" strokeWidth="2" />
          <circle cx="152" cy="155" r="4" fill="#020617" />
          <circle cx="168" cy="155" r="4" fill="#020617" />
          {/* Flame breath wisp */}
          <path d="M 160 165 Q 165 180 185 175 Q 170 190 155 170 Z" fill="#fbbf24" className="animate-pulse" />

          {/* Gold Hoard at feet */}
          <ellipse cx="160" cy="235" rx="120" ry="20" fill="url(#dragonGold)" opacity="0.6" />
        </svg>
      );

    // 4. Steampunk Brass Clockwork
    case 'steampunk':
      return (
        <svg
          viewBox="0 0 320 280"
          className={`w-full h-full drop-shadow-2xl transition-transform duration-100 ${
            isPressed ? 'scale-90' : 'scale-100'
          }`}
        >
          <defs>
            <linearGradient id="brass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>

          {/* Steam Chimney on back */}
          <rect x="145" y="30" width="30" height="40" rx="4" fill="#78350f" stroke="#b45309" strokeWidth="2" />
          <ellipse cx="160" cy="30" rx="15" ry="5" fill="#d97706" />

          {/* Body */}
          <ellipse cx="160" cy="150" rx="110" ry="85" fill="url(#brass)" stroke="#fbbf24" strokeWidth="3" />

          {/* Rivets around perimeter */}
          {[60, 90, 120, 150, 180, 210, 240, 270].map((deg) => (
            <circle
              key={deg}
              cx={160 + Math.cos((deg * Math.PI) / 180) * 98}
              cy={150 + Math.sin((deg * Math.PI) / 180) * 75}
              r="3.5"
              fill="#fef08a"
              stroke="#78350f"
              strokeWidth="1"
            />
          ))}

          {/* Brass Goggles */}
          <circle cx="120" cy="125" r="22" fill="#0f172a" stroke="#d97706" strokeWidth="5" />
          <circle cx="120" cy="125" r="16" fill="#38bdf8" fillOpacity="0.4" />
          <circle cx="200" cy="125" r="22" fill="#0f172a" stroke="#d97706" strokeWidth="5" />
          <circle cx="200" cy="125" r="16" fill="#38bdf8" fillOpacity="0.4" />
          <line x1="142" y1="125" x2="178" y2="125" stroke="#78350f" strokeWidth="5" />

          {/* Pressure Gauge Dial on Snout */}
          <circle cx="160" cy="165" r="20" fill="#f8fafc" stroke="#b45309" strokeWidth="3" />
          <line x1="160" y1="165" x2="172" y2="155" stroke="#dc2626" strokeWidth="2.5" />
          <circle cx="160" cy="165" r="3" fill="#020617" />

          {/* Rotating Cogwheel on chest */}
          <g className="animate-spin" style={{ transformOrigin: '160px 205px', animationDuration: '8s' }}>
            <circle cx="160" cy="205" r="14" fill="#b45309" stroke="#fef08a" strokeWidth="2" />
            <rect x="156" y="188" width="8" height="34" rx="2" fill="#fef08a" />
            <rect x="143" y="201" width="34" height="8" rx="2" fill="#fef08a" />
          </g>
        </svg>
      );

    // 5. 8-Bit Retro Pixel Piggy
    case 'arcade':
      return (
        <svg
          viewBox="0 0 320 280"
          className={`w-full h-full drop-shadow-2xl transition-transform duration-100 ${
            isPressed ? 'scale-90' : 'scale-100'
          }`}
        >
          {/* Pixelated Body Blocks */}
          <rect x="80" y="80" width="160" height="130" fill="#ec4899" />
          <rect x="65" y="100" width="190" height="90" fill="#db2777" />

          {/* Pixel Ears */}
          <rect x="90" y="50" width="30" height="30" fill="#f43f5e" />
          <rect x="200" y="50" width="30" height="30" fill="#f43f5e" />

          {/* Pixel Snout */}
          <rect x="135" y="145" width="50" height="35" fill="#f472b6" />
          <rect x="145" y="155" width="10" height="15" fill="#881337" />
          <rect x="165" y="155" width="10" height="15" fill="#881337" />

          {/* Pixel Eyes (Green CRT Arcade Phosphor) */}
          <rect x="110" y="115" width="18" height="18" fill="#22c55e" />
          <rect x="114" y="119" width="8" height="8" fill="#ffffff" />
          <rect x="192" y="115" width="18" height="18" fill="#22c55e" />
          <rect x="196" y="119" width="8" height="8" fill="#ffffff" />

          {/* Legs */}
          <rect x="95" y="210" width="30" height="35" fill="#9f1239" />
          <rect x="195" y="210" width="30" height="35" fill="#9f1239" />

          {/* Pixel Coin Floating Above */}
          <rect x="145" y="15" width="30" height="30" fill="#facc15" className="animate-bounce" />
          <rect x="153" y="23" width="14" height="14" fill="#ca8a04" />
        </svg>
      );

    // 6. Count Pig-ula (Vampire)
    case 'vampire':
      return (
        <svg
          viewBox="0 0 320 280"
          className={`w-full h-full drop-shadow-2xl transition-transform duration-100 ${
            isPressed ? 'scale-90' : 'scale-100'
          }`}
        >
          {/* Vampire High Collar Cape */}
          <polygon points="70,180 30,70 110,130" fill="#18181b" stroke="#dc2626" strokeWidth="2.5" />
          <polygon points="250,180 290,70 210,130" fill="#18181b" stroke="#dc2626" strokeWidth="2.5" />

          {/* Bat Wing Ears */}
          <path d="M 110 75 Q 85 30 65 50 Q 80 80 115 85" fill="#3f3f46" stroke="#e11d48" strokeWidth="2" />
          <path d="M 210 75 Q 235 30 255 50 Q 240 80 205 85" fill="#3f3f46" stroke="#e11d48" strokeWidth="2" />

          {/* Pale Moonlit Body */}
          <ellipse cx="160" cy="155" rx="105" ry="85" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />

          {/* Red Velvet Vest */}
          <path d="M 120 180 Q 160 210 200 180 L 190 230 L 130 230 Z" fill="#991b1b" />
          <circle cx="160" cy="195" r="3" fill="#facc15" />
          <circle cx="160" cy="210" r="3" fill="#facc15" />

          {/* Snout with Cute Vampire Fangs */}
          <ellipse cx="160" cy="165" rx="28" ry="20" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
          <ellipse cx="152" cy="165" rx="4" ry="7" fill="#475569" />
          <ellipse cx="168" cy="165" rx="4" ry="7" fill="#475569" />
          {/* Fangs */}
          <polygon points="144,182 148,182 146,192" fill="#ffffff" />
          <polygon points="172,182 176,182 174,192" fill="#ffffff" />

          {/* Crimson Vampire Eyes */}
          <circle cx="125" cy="125" r="8" fill="#dc2626" />
          <circle cx="123" cy="123" r="2.5" fill="#ffffff" />
          <circle cx="195" cy="125" r="8" fill="#dc2626" />
          <circle cx="193" cy="123" r="2.5" fill="#ffffff" />
        </svg>
      );

    // 7. Zen Garden Ceramic Piggy
    case 'zen':
      return (
        <svg
          viewBox="0 0 320 280"
          className={`w-full h-full drop-shadow-2xl transition-transform duration-100 ${
            isPressed ? 'scale-90' : 'scale-100'
          }`}
        >
          {/* Soft Jade / Matcha Ceramic Body */}
          <ellipse cx="160" cy="155" rx="110" ry="85" fill="#86efac" stroke="#16a34a" strokeWidth="3" />

          {/* Lotus Flower on Head */}
          <path d="M 160 55 C 140 40, 140 20, 160 10 C 180 20, 180 40, 160 55 Z" fill="#f472b6" />
          <path d="M 145 45 C 130 35, 135 15, 150 25 Z" fill="#fb7185" />
          <path d="M 175 45 C 190 35, 185 15, 170 25 Z" fill="#fb7185" />

          {/* Peaceful Closed Eyes (Meditation smile) */}
          <path d="M 115 125 Q 128 135 140 125" fill="none" stroke="#166534" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 180 125 Q 192 135 205 125" fill="none" stroke="#166534" strokeWidth="3.5" strokeLinecap="round" />

          {/* Smooth Snout */}
          <ellipse cx="160" cy="160" rx="26" ry="18" fill="#4ade80" stroke="#15803d" strokeWidth="2" />
          <ellipse cx="153" cy="160" rx="4" ry="6" fill="#14532d" />
          <ellipse cx="167" cy="160" rx="4" ry="6" fill="#14532d" />

          {/* Zen River Ripple lines */}
          <path d="M 95 165 Q 120 180 140 165" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.6" />
          <path d="M 180 165 Q 200 180 225 165" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.6" />
        </svg>
      );

    // 8. Pharaoh Tutankh-Piggy
    case 'pharaoh':
      return (
        <svg
          viewBox="0 0 320 280"
          className={`w-full h-full drop-shadow-2xl transition-transform duration-100 ${
            isPressed ? 'scale-90' : 'scale-100'
          }`}
        >
          {/* Nemes Golden Striped Headdress Wings */}
          <polygon points="90,100 40,190 85,180" fill="#0284c7" stroke="#eab308" strokeWidth="2.5" />
          <polygon points="230,100 280,190 235,180" fill="#0284c7" stroke="#eab308" strokeWidth="2.5" />

          {/* Pharaoh Crown cobra */}
          <path d="M 160 50 Q 165 30 160 20 Q 155 30 160 50" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
          <circle cx="160" cy="20" r="3" fill="#dc2626" />

          {/* Golden Body */}
          <ellipse cx="160" cy="155" rx="105" ry="85" fill="#fde047" stroke="#ca8a04" strokeWidth="4" />

          {/* Egyptian Kohl Eye (Eye of Horus style) */}
          <path d="M 115 125 Q 128 115 140 125 L 145 130" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
          <circle cx="128" cy="125" r="5" fill="#0284c7" />

          <path d="M 205 125 Q 192 115 180 125 L 175 130" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
          <circle cx="192" cy="125" r="5" fill="#0284c7" />

          {/* Snout with Royal Pharaoh Beard */}
          <ellipse cx="160" cy="165" rx="28" ry="18" fill="#eab308" stroke="#a16207" strokeWidth="2" />
          <ellipse cx="152" cy="165" rx="5" ry="7" fill="#713f12" />
          <ellipse cx="168" cy="165" rx="5" ry="7" fill="#713f12" />
          {/* Braided Beard */}
          <rect x="154" y="183" width="12" height="28" rx="4" fill="#0284c7" stroke="#eab308" strokeWidth="2" />

          {/* Scarab Beetle Breastplate */}
          <circle cx="160" cy="225" r="14" fill="#0d9488" stroke="#fde047" strokeWidth="2.5" />
        </svg>
      );

    // Existing skins: Cyber, Diamond, Cat, Cosmic, Classic
    case 'cyber':
      return (
        <svg
          viewBox="0 0 320 280"
          className={`w-full h-full drop-shadow-2xl transition-transform duration-100 ${
            isPressed ? 'scale-90' : 'scale-100'
          }`}
        >
          <defs>
            <linearGradient id="cyberBody2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#090d16" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <filter id="neonGlow2">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="160" cy="140" r="125" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 8" opacity="0.4" className="animate-spin" style={{ animationDuration: '24s' }} />

          <polygon points="120,60 100,20 150,45" fill="#0f172a" stroke="#06b6d4" strokeWidth="2.5" />
          <polygon points="140,55 125,30 155,48" fill="#06b6d4" opacity="0.7" />

          <rect x="95" y="210" width="30" height="36" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
          <rect x="195" y="210" width="30" height="36" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />

          <ellipse cx="160" cy="145" rx="110" ry="85" fill="url(#cyberBody2)" stroke="#38bdf8" strokeWidth="3" />

          <path d="M 80 145 H 120 L 140 170 H 180" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.8" />
          <circle cx="180" cy="170" r="3" fill="#22d3ee" />

          <ellipse cx="75" cy="145" rx="30" ry="24" fill="#1e293b" stroke="#06b6d4" strokeWidth="2.5" />
          <ellipse cx="68" cy="145" rx="4" ry="8" fill="#06b6d4" filter="url(#neonGlow2)" />
          <ellipse cx="82" cy="145" rx="4" ry="8" fill="#06b6d4" filter="url(#neonGlow2)" />

          <path d="M 105 110 L 135 115 L 125 125 L 98 120 Z" fill="#06b6d4" filter="url(#neonGlow2)" />
          <rect x="140" y="65" width="40" height="10" rx="4" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" filter="url(#neonGlow2)" />

          <circle cx="180" cy="145" r={isSuperCharged ? 16 : 10} fill="#f43f5e" opacity="0.9" filter="url(#neonGlow2)" className={isSuperCharged ? 'animate-ping' : ''} />
        </svg>
      );

    case 'diamond':
      return (
        <svg
          viewBox="0 0 320 280"
          className={`w-full h-full drop-shadow-2xl transition-transform duration-100 ${
            isPressed ? 'scale-90' : 'scale-100'
          }`}
        >
          <defs>
            <linearGradient id="diamondGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="40%" stopColor="#7dd3fc" />
              <stop offset="80%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
          </defs>

          <ellipse cx="160" cy="145" rx="110" ry="85" fill="url(#diamondGrad2)" stroke="#ffffff" strokeWidth="3" />
          <polygon points="160,75 110,120 160,145 210,120" fill="#ffffff" opacity="0.35" />
          <polygon points="110,120 80,145 120,180 160,145" fill="#38bdf8" opacity="0.4" />
          <polygon points="210,120 240,145 200,180 160,145" fill="#0284c7" opacity="0.3" />

          <polygon points="50,145 75,125 90,145 75,165" fill="#e0f2fe" stroke="#ffffff" strokeWidth="2" />
          <circle cx="70" cy="145" r="3" fill="#0369a1" />
          <circle cx="80" cy="145" r="3" fill="#0369a1" />

          <polygon points="112,112 118,105 124,112 118,119" fill="#082f49" />
          <circle cx="116" cy="110" r="2" fill="#ffffff" />
          <rect x="140" y="65" width="40" height="10" rx="3" fill="#0c4a6e" stroke="#ffffff" strokeWidth="2" />
        </svg>
      );

    case 'cat':
      return (
        <svg
          viewBox="0 0 320 280"
          className={`w-full h-full drop-shadow-2xl transition-transform duration-100 ${
            isPressed ? 'scale-90' : 'scale-100'
          }`}
        >
          <defs>
            <linearGradient id="catGold2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>

          <ellipse cx="160" cy="145" rx="105" ry="90" fill="url(#catGold2)" stroke="#ca8a04" strokeWidth="4" />
          <path d="M 105 160 Q 160 180 215 160" fill="none" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" />
          <circle cx="160" cy="174" r="14" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />

          <g className="animate-bounce" style={{ animationDuration: '1.2s' }}>
            <ellipse cx="245" cy="105" rx="18" ry="24" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
          </g>

          <path d="M 125 115 Q 135 105 145 115" fill="none" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <path d="M 175 115 Q 185 105 195 115" fill="none" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <polygon points="156,126 164,126 160,132" fill="#f87171" />
        </svg>
      );

    case 'cosmic':
      return (
        <svg
          viewBox="0 0 320 280"
          className={`w-full h-full drop-shadow-2xl transition-transform duration-100 ${
            isPressed ? 'scale-90' : 'scale-100'
          }`}
        >
          <defs>
            <linearGradient id="cosmicBody2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#312e81" />
              <stop offset="50%" stopColor="#4c1d95" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>
          </defs>

          <ellipse cx="160" cy="145" rx="140" ry="45" fill="none" stroke="#c084fc" strokeWidth="3" transform="rotate(-18 160 145)" opacity="0.75" />
          <circle cx="70" cy="115" r="7" fill="#facc15" />

          <ellipse cx="160" cy="145" rx="110" ry="85" fill="url(#cosmicBody2)" stroke="#c084fc" strokeWidth="3" />
          <circle cx="170" cy="140" r="38" fill="#ec4899" opacity="0.35" />

          <circle cx="120" cy="115" r="7" fill="#fef08a" />
          <circle cx="118" cy="113" r="2.5" fill="#ffffff" />
        </svg>
      );

    case 'classic':
    default:
      return (
        <svg
          viewBox="0 0 320 280"
          className={`w-full h-full drop-shadow-2xl transition-transform duration-100 ${
            isPressed ? 'scale-90' : 'scale-100'
          }`}
        >
          <defs>
            <linearGradient id="piggyPink2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>

          <circle cx="160" cy="145" r="120" fill="none" stroke="#f472b6" strokeWidth="2" opacity="0.25" strokeDasharray="8 8" />

          <path d="M 115 65 C 95 20, 140 15, 150 48 Z" fill="#ec4899" stroke="#fda4af" strokeWidth="3" />
          <path d="M 122 55 C 108 26, 138 24, 143 47 Z" fill="#fbcfe8" />

          <rect x="95" y="210" width="30" height="36" rx="14" fill="#be185d" />
          <rect x="195" y="210" width="30" height="36" rx="14" fill="#be185d" />

          <ellipse cx="160" cy="145" rx="110" ry="85" fill="url(#piggyPink2)" stroke="#fda4af" strokeWidth="3" />

          <ellipse cx="75" cy="145" rx="30" ry="24" fill="#fb7185" stroke="#f43f5e" strokeWidth="2.5" />
          <ellipse cx="68" cy="145" rx="5" ry="9" fill="#9f1239" opacity="0.75" />
          <ellipse cx="82" cy="145" rx="5" ry="9" fill="#9f1239" opacity="0.75" />

          <circle cx="118" cy="115" r="8" fill="#1e1b4b" />
          <circle cx="115" cy="112" r="3" fill="#ffffff" />
          <path d="M 102 148 Q 112 158 122 148" fill="none" stroke="#9f1239" strokeWidth="3" strokeLinecap="round" />

          <circle cx="128" cy="138" r="12" fill="#fda4af" opacity="0.7" />
          <rect x="140" y="65" width="40" height="10" rx="5" fill="#881337" />
        </svg>
      );
  }
};
