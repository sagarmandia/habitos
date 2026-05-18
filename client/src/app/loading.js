'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.06),rgba(255,255,255,0))]" />
      
      <div className="flex flex-col items-center gap-4 relative z-10">
        {/* Loading Spinner Halo */}
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 animate-spin">
          <Loader2 className="w-6 h-6 stroke-[3px]" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Loading HabitOS</span>
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
