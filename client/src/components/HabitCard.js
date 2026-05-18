'use client';

import React, { useState } from 'react';
import { 
  Flame, 
  Check, 
  Trash2, 
  Archive,
  Loader2,
  CalendarDays,
  Target
} from 'lucide-react';

/**
 * Highly interactive, animated card component for tracking a single habit.
 * 
 * @param {object} props
 * @param {object} props.habit - Habit data object
 * @param {function} props.onToggleComplete - Completion handler (supporting optimistic UI)
 * @param {function} props.onArchive - Archiving handler
 * @param {function} props.onDelete - Deletion handler
 */
export default function HabitCard({ habit, onToggleComplete, onArchive, onDelete }) {
  const [isToggling, setIsToggling] = useState(false);
  const [triggerFlameAnimation, setTriggerFlameAnimation] = useState(false);

  const handleToggle = async () => {
    if (habit.completedToday) return;

    setIsToggling(true);
    setTriggerFlameAnimation(true);

    try {
      await onToggleComplete(habit._id);
    } catch (err) {
      console.error('Logging action failed:', err);
    } finally {
      setIsToggling(false);
      // Let animation loop briefly
      setTimeout(() => setTriggerFlameAnimation(false), 1200);
    }
  };

  const categoryColor = {
    mindfulness: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    growth: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    health: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    fitness: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    finance: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    other: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
  }[habit.category] || 'text-slate-400 bg-slate-500/10 border-slate-500/20';

  return (
    <div
      className={`p-5 flex flex-col justify-between rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
        habit.completedToday
          ? 'border-emerald-500/30 bg-emerald-950/5 shadow-[0_0_24px_-8px_rgba(16,185,129,0.08)]'
          : 'border-slate-900 bg-slate-900/10 hover:border-slate-800 hover:bg-slate-900/20'
      }`}
    >
      {/* Top completion ribbon */}
      {habit.completedToday && (
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-emerald-500/20 animate-pulse" />
      )}

      {/* Main Metadata split */}
      <div className="flex justify-between items-start gap-4 mb-5">
        <div className="flex flex-col gap-2">
          {/* Badges */}
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-wider ${categoryColor}`}>
              {habit.category}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1">
              <CalendarDays className="w-3 h-3 text-slate-600" />
              {habit.frequency}
            </span>
          </div>

          {/* Title & Desc */}
          <h3 className={`text-lg font-bold tracking-tight leading-snug transition-colors ${
            habit.completedToday ? 'text-emerald-300/90 line-through decoration-emerald-500/30' : 'text-white'
          }`}>
            {habit.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {habit.description || 'No description provided.'}
          </p>
        </div>

        {/* Action Checkbox */}
        <button
          onClick={handleToggle}
          disabled={habit.completedToday || isToggling}
          className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
            habit.completedToday
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-inner'
              : 'border-slate-800 text-slate-500 hover:border-indigo-500/50 hover:text-indigo-400 hover:scale-105 active:scale-95'
          }`}
          title={habit.completedToday ? 'Completed today' : 'Mark as complete'}
        >
          {isToggling ? (
            <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
          ) : habit.completedToday ? (
            <Check className="w-5 h-5 stroke-[3px] animate-in zoom-in-50 spin-in-12 duration-300" />
          ) : (
            <div className="w-3 h-3 rounded-full border border-slate-600 group-hover:border-indigo-400 transition-colors" />
          )}
        </button>
      </div>

      {/* Bottom info split */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-950/40 relative">
        {/* Streak Counter */}
        <div 
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
            habit.completedToday
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              : 'bg-slate-950 text-slate-500 border-slate-900 group-hover:border-slate-800/80 group-hover:text-slate-400'
          }`}
        >
          <Flame 
            className={`w-4 h-4 fill-current transition-transform duration-500 ${
              triggerFlameAnimation 
                ? 'animate-bounce text-amber-500 scale-125' 
                : 'group-hover:scale-110 group-hover:animate-pulse text-amber-600 group-hover:text-amber-500'
            }`} 
          />
          <span>{habit.streak}d streak</span>
        </div>

        {/* Target Indicator */}
        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold uppercase">
          <Target className="w-3.5 h-3.5 text-slate-600" />
          <span>Goal: {habit.targetCount}x</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute right-0 top-1/2 -translate-y-1/2 bg-slate-950/80 backdrop-blur-sm pl-2">
          {onArchive && (
            <button
              onClick={() => onArchive(habit._id)}
              className="p-1.5 text-slate-500 hover:text-indigo-400 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
              title="Archive"
            >
              <Archive className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(habit._id)}
              className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
