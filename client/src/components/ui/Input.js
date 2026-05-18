'use client';

import React from 'react';
import { cn } from '@/utils/cn';

/**
 * Reusable, premium dark-themed form Input component.
 */
const Input = React.forwardRef(
  ({ label, error, className, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-500",
            error && "border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/10",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs font-medium text-rose-400 select-none animate-in fade-in slide-in-from-top-1 duration-200">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
