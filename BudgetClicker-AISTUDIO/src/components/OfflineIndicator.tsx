import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';
import { Language } from '../types/game';

interface Props {
  lang: Language;
}

export const OfflineIndicator: React.FC<Props> = ({ lang }) => {
  const isOnline = useOnlineStatus();
  const t = TRANSLATIONS[lang];

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 z-40 flex items-center gap-2 rounded-xl bg-amber-600/90 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white shadow-xl border border-amber-400/30">
      <WifiOff className="w-3.5 h-3.5 animate-pulse text-amber-200" />
      <span>{t.offline_notice}</span>
    </div>
  );
};
