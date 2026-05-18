'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { Loader2 } from 'lucide-react';

/**
 * Route protection wrapper component. Secures sub-pages and prompts login redirections.
 */
export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // Redirect to login if load completes and user is unauthenticated
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Render high-end premium loading screen while state is loading
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))]" />
        <div className="relative flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-500">
          {/* Neon spinner circle */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <div className="absolute inset-0 border border-indigo-500/10 rounded-full scale-125 animate-pulse" />
          </div>
          <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
            Securing Connection...
          </span>
        </div>
      </div>
    );
  }

  // Render children only if validated
  return isAuthenticated ? <>{children}</> : null;
}
