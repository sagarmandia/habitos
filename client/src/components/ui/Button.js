'use client';

import React from 'react';
import { cn } from '@/utils/cn';

/**
 * Reusable, premium dark-themed button component. Supports loading states and custom variants.
 */
export default function Button({
  children,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  className,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-indigo-500 duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 py-3 px-5',
    secondary: 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white py-3 px-5 border border-slate-700/50',
    danger: 'bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-600/20 py-3 px-5',
    ghost: 'text-slate-400 hover:text-white hover:bg-slate-900 py-2 px-4',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          {/* Custom micro spinner */}
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
