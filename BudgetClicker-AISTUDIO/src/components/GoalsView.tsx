import React, { useState } from 'react';
import { GameState, SavingsGoal, Language } from '../types/game';
import { TRANSLATIONS } from '../i18n/translations';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import {
  Target,
  ShieldCheck,
  Plane,
  Zap,
  Laptop,
  Home,
  PlusCircle,
  PiggyBank,
  CheckCircle2,
  DollarSign,
  HeartHandshake,
  Calendar,
  Gem,
} from 'lucide-react';

interface Props {
  state: GameState;
  onDepositToGoal: (goalId: string, amount: number) => void;
  onCreateGoal: (name: string, target: number) => void;
  onLogRealSaving: (note: string, amount: number) => void;
  lang: Language;
}

export const GoalsView: React.FC<Props> = ({
  state,
  onDepositToGoal,
  onCreateGoal,
  onLogRealSaving,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  // Deposit modal state
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const [depositAmount, setDepositAmount] = useState<string>('50');

  // New goal state
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');

  // Real saving log state
  const [realNote, setRealNote] = useState('');
  const [realAmount, setRealAmount] = useState('');
  const [logSuccessMessage, setLogSuccessMessage] = useState<string | null>(null);

  const getGoalIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Plane': return <Plane className="w-5 h-5 text-cyan-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-purple-400" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-amber-400" />;
      case 'Home': return <Home className="w-5 h-5 text-rose-400" />;
      default: return <Target className="w-5 h-5 text-teal-400" />;
    }
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGoal) return;
    const num = parseFloat(depositAmount);
    if (isNaN(num) || num <= 0) return;

    const actualDeposit = Math.min(num, state.balance, selectedGoal.target - selectedGoal.current);
    if (actualDeposit <= 0) return;

    onDepositToGoal(selectedGoal.id, actualDeposit);

    // If reaching completion
    if (selectedGoal.current + actualDeposit >= selectedGoal.target) {
      sound.playGoalComplete();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      sound.playPurchase();
    }

    setSelectedGoal(null);
  };

  const handleCreateGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetVal = parseFloat(newGoalTarget);
    if (!newGoalName.trim() || isNaN(targetVal) || targetVal <= 0) return;

    onCreateGoal(newGoalName.trim(), targetVal);
    sound.playPurchase();
    setNewGoalName('');
    setNewGoalTarget('');
    setShowNewGoal(false);
  };

  const handleLogRealSavingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(realAmount);
    if (!realNote.trim() || isNaN(amt) || amt <= 0) return;

    onLogRealSaving(realNote.trim(), amt);
    sound.playStreakFanfare();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });

    setRealNote('');
    setRealAmount('');
    setLogSuccessMessage(
      lang === 'es'
        ? `¡Genial! Ahorraste $${amt.toFixed(2)} reales y ganaste +$${(amt * 10).toFixed(0)} en el juego + 1 Gema preciosa!`
        : `Awesome! You kept $${amt.toFixed(2)} in your pocket and earned +$${(amt * 10).toFixed(0)} in-game + 1 Rare Gem!`
    );

    setTimeout(() => {
      setLogSuccessMessage(null);
    }, 4000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 pb-8 text-left">
      {/* Header Info */}
      <div className="px-2">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-400" />
          <span>{t.goals_header}</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">{t.goals_desc}</p>
      </div>

      {/* Real Savings Action Form */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <HeartHandshake className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm sm:text-base font-bold text-white">
            {t.log_real_savings_title}
          </h3>
          <span className="ml-auto flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
            <Gem className="w-3 h-3 text-amber-400" />
            <span>+5 Gems</span>
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-3">{t.log_real_savings_desc}</p>

        <form onSubmit={handleLogRealSavingSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              value={realNote}
              onChange={(e) => setRealNote(e.target.value)}
              placeholder={t.log_note_placeholder}
              className="sm:col-span-2 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              required
            />
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs text-slate-500 font-mono">$</span>
              <input
                type="number"
                step="0.01"
                min="0.1"
                value={realAmount}
                onChange={(e) => setRealAmount(e.target.value)}
                placeholder={t.log_amount_placeholder}
                className="w-full pl-6 pr-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            <span>{t.log_submit_btn}</span>
          </button>
        </form>

        {logSuccessMessage && (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-fade-in flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{logSuccessMessage}</span>
          </div>
        )}
      </div>

      {/* Goal Buckets List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-sm font-bold text-white">
            {lang === 'es' ? 'Tus Bóvedas de Objetivos' : 'Your Goal Vaults'}
          </h3>
          <button
            onClick={() => setShowNewGoal(!showNewGoal)}
            className="flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{t.create_goal_title}</span>
          </button>
        </div>

        {/* Create new goal inline form */}
        {showNewGoal && (
          <form
            onSubmit={handleCreateGoalSubmit}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-4 space-y-3 animate-fade-in"
          >
            <h4 className="text-xs font-bold text-white">{t.create_goal_title}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
                placeholder={t.goal_name_placeholder}
                className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                required
              />
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs text-slate-500 font-mono">$</span>
                <input
                  type="number"
                  min="1"
                  value={newGoalTarget}
                  onChange={(e) => setNewGoalTarget(e.target.value)}
                  placeholder={t.goal_target_placeholder}
                  className="w-full pl-6 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
              >
                {t.add_goal_btn}
              </button>
              <button
                type="button"
                onClick={() => setShowNewGoal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-bold transition cursor-pointer"
              >
                {t.cancel}
              </button>
            </div>
          </form>
        )}

        {/* Goals cards */}
        {state.goals.map((goal) => {
          const pct = Math.min(100, Math.floor((goal.current / goal.target) * 100));
          const isDone = goal.current >= goal.target;

          return (
            <div
              key={goal.id}
              className={`bg-slate-900/80 border rounded-2xl p-4 transition ${
                isDone
                  ? 'border-emerald-500/50 shadow-md shadow-emerald-500/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${goal.color}25`, borderColor: `${goal.color}50` }}
                  >
                    {getGoalIcon(goal.icon)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{goal.name}</span>
                      {isDone && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {t.goal_completed} 🏆
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()} ({pct}%)
                    </p>
                  </div>
                </div>

                {!isDone && (
                  <button
                    onClick={() => {
                      setSelectedGoal(goal);
                      setDepositAmount(Math.min(50, state.balance).toString());
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition active:scale-95 cursor-pointer"
                  >
                    {t.deposit_to_goal}
                  </button>
                )}
              </div>

              {/* Progress bar */}
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: goal.color || '#10b981',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Deposit Modal */}
      {selectedGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl relative text-left">
            <h3 className="text-base font-bold text-white mb-1">
              {t.deposit_to_goal}: {selectedGoal.name}
            </h3>
            <p className="text-xs text-slate-400 mb-4">{t.deposit_amount_prompt}</p>

            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm text-slate-500 font-mono">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  max={Math.min(state.balance, selectedGoal.target - selectedGoal.current)}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              {/* Quick preset buttons */}
              <div className="flex gap-2">
                {[10, 50, 200].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setDepositAmount(Math.min(preset, state.balance).toString())}
                    className="flex-1 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition"
                  >
                    +${preset}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setDepositAmount(
                      Math.min(state.balance, selectedGoal.target - selectedGoal.current).toString()
                    )
                  }
                  className="flex-1 py-1 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/70 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30"
                >
                  MAX
                </button>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={state.balance <= 0}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs transition cursor-pointer"
                >
                  {t.deposit_btn}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGoal(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold text-xs transition cursor-pointer"
                >
                  {t.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Real Savings History */}
      {state.realSavingLogs.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
          <h4 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.recent_logs_title}</span>
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {state.realSavingLogs.slice(-8).reverse().map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-800/40 text-xs"
              >
                <div className="text-left pr-2">
                  <p className="text-slate-200 font-medium line-clamp-1">{log.note}</p>
                  <p className="text-[10px] text-slate-500">{log.date}</p>
                </div>
                <span className="font-mono font-bold text-emerald-400 shrink-0">
                  +${log.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
