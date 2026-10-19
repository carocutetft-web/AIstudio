import React, { useRef } from 'react';
import { GameState, Language } from '../types/game';
import { TRANSLATIONS } from '../i18n/translations';
import { exportBackup, resetGameState } from '../utils/storage';
import {
  X,
  BarChart3,
  MousePointerClick,
  DollarSign,
  HeartHandshake,
  Trophy,
  Shield,
  Download,
  Upload,
  RotateCcw,
} from 'lucide-react';

interface Props {
  state: GameState;
  onRestoreState: (state: GameState) => void;
  onResetState: () => void;
  onClose: () => void;
  lang: Language;
}

export const StatsModal: React.FC<Props> = ({
  state,
  onRestoreState,
  onResetState,
  onClose,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed.balance === 'number') {
          onRestoreState(parsed);
          onClose();
        }
      } catch (err) {
        alert('Invalid backup file');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm(t.reset_confirm)) {
      onResetState();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in text-left">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700/80 p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white">{t.stats_title}</h3>
            <p className="text-xs text-slate-400">AhorroPulse Dashboard</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <MousePointerClick className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.stat_total_clicks}</span>
            </div>
            <div className="text-lg font-mono font-black text-white">
              {state.stats.totalClicks.toLocaleString()}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.stat_lifetime_earned}</span>
            </div>
            <div className="text-lg font-mono font-black text-emerald-400">
              ${state.lifetimeEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
              <span>{t.stat_real_savings_count}</span>
            </div>
            <div className="text-lg font-mono font-black text-white">
              {state.stats.realSavingsLogged}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span>{t.stat_goals_done}</span>
            </div>
            <div className="text-lg font-mono font-black text-yellow-300">
              {state.stats.goalsCompleted} / {state.goals.length}
            </div>
          </div>
        </div>

        {/* Real dollars saved in pocket highlight */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/70 to-teal-950/70 border border-emerald-500/30 mb-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-300 font-bold block">{t.stat_real_savings_total}</span>
            <span className="text-xl font-mono font-black text-emerald-400">
              ${state.stats.realAmountLogged.toFixed(2)} USD
            </span>
          </div>
          <HeartHandshake className="w-8 h-8 text-emerald-400/60" />
        </div>

        {/* Privacy & Backup */}
        <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold text-white">{t.backup_data_title}</h4>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">{t.backup_desc}</p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => exportBackup(state)}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.export_backup_btn}</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.import_backup_btn}</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />
          </div>

          <button
            onClick={handleReset}
            className="w-full mt-2 py-1.5 rounded-xl bg-rose-950/30 hover:bg-rose-900/40 text-rose-300 border border-rose-500/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.reset_data_btn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
