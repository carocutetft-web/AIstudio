import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Gem, DollarSign } from 'lucide-react';
import { Language } from '../types/game';

interface Props {
  tapPower: number;
  passiveRate: number;
  onPop: (reward: { type: 'cash' | 'gems' | 'frenzy'; value: number }) => void;
  lang: Language;
}

export const FlyingBalloon: React.FC<Props> = ({
  tapPower,
  passiveRate,
  onPop,
  lang,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [topPercent, setTopPercent] = useState(25);
  const [bannerNotice, setBannerNotice] = useState<string | null>(null);

  // Random periodic trigger (every 30 to 55 seconds)
  useEffect(() => {
    const scheduleNext = () => {
      const delay = Math.random() * 25000 + 25000; // 25-50s
      return setTimeout(() => {
        setTopPercent(Math.floor(Math.random() * 45) + 15);
        setIsVisible(true);
      }, delay);
    };

    let timer = scheduleNext();

    return () => clearTimeout(timer);
  }, [isVisible]);

  // If visible, hide after 12 seconds if not tapped
  useEffect(() => {
    if (!isVisible) return;
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 12000);

    return () => clearTimeout(hideTimer);
  }, [isVisible]);

  const handlePop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);

    sound.playStreakFanfare();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { x: 0.5, y: 0.4 },
    });

    // Rebalanced: 60% big cash, 30% frenzy boost, 10% rare 1-gem drop
    const roll = Math.random();
    if (roll < 0.60) {
      const cashVal = Number((Math.max(100, tapPower * 60 + passiveRate * 35)).toFixed(2));
      onPop({ type: 'cash', value: cashVal });
      setBannerNotice(
        lang === 'es'
          ? `🎈 ¡Globo de la Suerte! +$${cashVal.toLocaleString()} agregados!`
          : `🎈 Lucky Balloon! +$${cashVal.toLocaleString()} collected!`
      );
    } else if (roll < 0.90) {
      onPop({ type: 'frenzy', value: 3 });
      setBannerNotice(
        lang === 'es'
          ? `⚡ ¡Mega Frenesí Activado x3 por 15s!`
          : `⚡ Mega Frenzy Activated x3 for 15s!`
      );
    } else {
      // 10% chance for 1 rare gem
      const gemsVal = 1;
      onPop({ type: 'gems', value: gemsVal });
      setBannerNotice(
        lang === 'es'
          ? `💎 ¡Gema Rara Encontrada! +1 Diamante agregado!`
          : `💎 Rare Diamond Found! +1 Gem added!`
      );
    }

    setTimeout(() => setBannerNotice(null), 3500);
  };

  return (
    <>
      {isVisible && (
        <div
          onClick={handlePop}
          className="absolute z-30 cursor-pointer animate-float-across select-none"
          style={{
            top: `${topPercent}%`,
            animation: 'floatAcross 12s linear forwards',
          }}
          title={lang === 'es' ? '¡Toca el globo de la fortuna!' : 'Tap the lucky balloon!'}
        >
          <div className="flex flex-col items-center animate-bounce" style={{ animationDuration: '1.2s' }}>
            <div className="w-12 h-14 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-yellow-300 p-0.5 shadow-xl shadow-amber-400/50 flex items-center justify-center relative">
              <Gift className="w-6 h-6 text-white" />
              <Sparkles className="w-3.5 h-3.5 text-yellow-200 absolute -top-1 -right-1 animate-spin" />
            </div>
            {/* Balloon string */}
            <div className="w-0.5 h-6 bg-slate-300/60" />
            <span className="text-[9px] font-black font-mono text-amber-300 bg-slate-900/80 px-1 rounded border border-amber-400/40">
              TAP!
            </span>
          </div>
        </div>
      )}

      {bannerNotice && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-slate-900/90 border border-amber-400 text-amber-300 text-xs font-bold shadow-2xl animate-fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{bannerNotice}</span>
        </div>
      )}
    </>
  );
};
