'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log the error to an analytics service in production
    console.error('Captured Application Runtime Crash:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background radial effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(244,63,94,0.06),rgba(255,255,255,0))]" />
      
      <div className="w-full max-w-md p-8 rounded-3xl border border-rose-500/10 bg-slate-900/20 backdrop-blur-xl flex flex-col items-center text-center relative z-10">
        {/* Error icon halo */}
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6 animate-pulse">
          <AlertCircle className="w-8 h-8" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Something went wrong
        </h2>
        <p className="text-slate-450 text-xs mt-2 max-w-[280px] leading-relaxed">
          An unexpected application runtime crash occurred. The system logs have been captured.
        </p>

        {/* Retry/Nav buttons */}
        <div className="flex flex-col gap-3 w-full mt-8">
          <Button
            onClick={() => reset()}
            variant="primary"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-rose-700 border-rose-500/20 hover:from-rose-500 hover:to-rose-600"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>

          <Link href="/dashboard" className="w-full">
            <Button
              variant="secondary"
              className="w-full flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
