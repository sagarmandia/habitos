'use client';

import React from 'react';

/**
 * Reusable linear progress bar with smooth slide width transitions.
 * 
 * @param {object} props
 * @param {number} props.value - Percentage value (0 - 100)
 * @param {string} props.className - Additional track class overrides
 * @param {string} props.barColor - Fill color class overrides (defaults to indigo gradient)
 */
export default function ProgressBar({ value = 0, className = '', barColor = 'bg-gradient-to-r from-indigo-500 to-indigo-600' }) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={`w-full bg-slate-900 rounded-full overflow-hidden h-2 border border-slate-950/20 ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
