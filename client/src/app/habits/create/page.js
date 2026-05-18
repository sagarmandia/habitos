'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle, 
  ArrowLeft, 
  Sparkles,
  Zap,
  Target,
  Clock
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import useHabitStore from '@/store/useHabitStore';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function CreateHabitPage() {
  const router = useRouter();
  const { addHabit, isLoading, error: apiError, clearError } = useHabitStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('mindfulness');
  const [frequency, setFrequency] = useState('daily');
  const [targetCount, setTargetCount] = useState(1);

  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'mindfulness', label: 'Mindfulness', desc: 'Meditation, journaling' },
    { value: 'growth', label: 'Growth', desc: 'Reading, skill-building' },
    { value: 'health', label: 'Health', desc: 'Diet, hydration' },
    { value: 'fitness', label: 'Fitness', desc: 'Workouts, cardio' },
    { value: 'finance', label: 'Finance', desc: 'Savings, budgeting' },
    { value: 'other', label: 'Other', desc: 'Miscellaneous tasks' },
  ];

  const frequencies = [
    { value: 'daily', label: 'Daily', desc: 'Every calendar day' },
    { value: 'weekly', label: 'Weekly', desc: 'Once a week cycle' },
    { value: 'monthly', label: 'Monthly', desc: 'Once a month cycle' },
  ];

  const validateForm = () => {
    const tempErrors = {};
    if (!title) {
      tempErrors.title = 'Habit title is required';
    } else if (title.length < 2) {
      tempErrors.title = 'Title must be at least 2 characters long';
    }

    if (description.length > 500) {
      tempErrors.description = 'Description cannot exceed 500 characters';
    }

    if (targetCount < 1) {
      tempErrors.targetCount = 'Target completions must be at least 1';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) return;

    try {
      await addHabit({
        title,
        description,
        category,
        frequency,
        targetCount,
      });
      router.push('/habits');
    } catch (err) {
      console.error('Failed to create habit:', err);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
        
        {/* Back Link */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors self-start cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to list
        </button>

        {/* Heading */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <Sparkles className="w-8 h-8 text-indigo-500" />
            Build New Habit
          </h1>
          <p className="text-slate-400 text-sm mt-1">Design a daily routine that fits your lifestyle parameters.</p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900/30 border border-slate-900/80 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
          {apiError && (
            <div className="mb-6 bg-rose-500/10 border border-rose-500/20 text-rose-300 p-4 rounded-xl text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Title */}
            <Input
              label="Habit Name"
              placeholder="e.g. Read 15 Pages, Gym session"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: null });
              }}
              error={errors.title}
            />

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400 tracking-wide">
                Description (Optional)
              </label>
              <textarea
                placeholder="Details of the routine, triggers, or notes..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors({ ...errors, description: null });
                }}
                className={`w-full bg-slate-950 border ${
                  errors.description ? 'border-rose-500/50' : 'border-slate-800'
                } focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all resize-none min-h-[100px]`}
              />
              {errors.description && (
                <span className="text-xs text-rose-400 mt-1">{errors.description}</span>
              )}
            </div>

            {/* Category Select grid */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-semibold text-slate-400 tracking-wide flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-indigo-400" />
                Select Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      category === cat.value
                        ? 'border-indigo-500 bg-indigo-500/5 shadow-md shadow-indigo-500/5'
                        : 'border-slate-900 bg-slate-950/40 hover:border-slate-800'
                    }`}
                  >
                    <span className={`text-xs font-bold ${category === cat.value ? 'text-indigo-400' : 'text-white'}`}>
                      {cat.label}
                    </span>
                    <span className="text-[10px] text-slate-500 leading-tight mt-1">
                      {cat.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Select card list */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-semibold text-slate-400 tracking-wide flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                Completion Frequency
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {frequencies.map((freq) => (
                  <button
                    key={freq.value}
                    type="button"
                    onClick={() => setFrequency(freq.value)}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      frequency === freq.value
                        ? 'border-indigo-500 bg-indigo-500/5 shadow-md shadow-indigo-500/5'
                        : 'border-slate-900 bg-slate-950/40 hover:border-slate-800'
                    }`}
                  >
                    <span className={`text-xs font-bold ${frequency === freq.value ? 'text-indigo-400' : 'text-white'}`}>
                      {freq.label}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1">
                      {freq.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Count */}
            <div className="flex flex-col gap-2.5 sm:max-w-xs">
              <label className="text-xs font-semibold text-slate-400 tracking-wide flex items-center gap-1.5">
                <Target className="w-4 h-4 text-indigo-400" />
                Target Completions (per cycle)
              </label>
              <input
                type="number"
                min="1"
                value={targetCount}
                onChange={(e) => {
                  setTargetCount(parseInt(e.target.value) || 1);
                  if (errors.targetCount) setErrors({ ...errors, targetCount: null });
                }}
                className={`bg-slate-950 border ${
                  errors.targetCount ? 'border-rose-500/50' : 'border-slate-800'
                } focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all`}
              />
              {errors.targetCount && (
                <span className="text-xs text-rose-400 mt-1">{errors.targetCount}</span>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4 flex items-center justify-center gap-2"
              isLoading={isLoading}
            >
              <CheckCircle className="w-4.5 h-4.5" />
              Build Habit Schema
            </Button>

          </form>
        </div>

      </div>
    </DashboardLayout>
  );
}
