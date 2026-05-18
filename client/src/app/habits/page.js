'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  AlertTriangle,
  FolderHeart,
  TrendingUp,
  Award
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import useHabitStore from '@/store/useHabitStore';
import Button from '@/components/ui/Button';
import HabitCard from '@/components/HabitCard';
import ProgressBar from '@/components/ui/ProgressBar';

export default function HabitsPage() {
  const { 
    habits, 
    fetchHabits, 
    toggleComplete, 
    archiveHabit, 
    deleteHabit, 
    isLoading, 
    error, 
    clearError 
  } = useHabitStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  // Clean error banner on mount/unmount
  useEffect(() => {
    clearError();
    return () => clearError();
  }, [clearError]);

  const handleToggleComplete = async (habitId) => {
    try {
      await toggleComplete(habitId);
    } catch (err) {
      console.error('Logging action failed:', err);
    }
  };

  const categoriesList = ['all', 'mindfulness', 'growth', 'health', 'fitness', 'finance', 'other'];

  // Filter habits locally
  const filteredHabits = habits.filter((habit) => {
    const matchesSearch = habit.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          habit.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || habit.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Calculate today's completion progress details
  const totalActiveHabitsCount = habits.length;
  const completedTodayCount = habits.filter(h => h.completedToday).length;
  const completionPercentage = totalActiveHabitsCount > 0 
    ? Math.round((completedTodayCount / totalActiveHabitsCount) * 100) 
    : 0;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 animate-in fade-in duration-500">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              My Habits
            </h1>
            <p className="text-slate-400 text-sm mt-1">Track and manage your recurring daily routines.</p>
          </div>
          
          <Link href="/habits/create">
            <Button variant="primary" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Habit
            </Button>
          </Link>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="flex gap-3 items-center bg-rose-500/10 border border-rose-500/20 text-rose-300 p-4 rounded-xl text-sm animate-in slide-in-from-top-2 duration-300">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-400" />
            <span className="flex-1">{error}</span>
            <button 
              onClick={clearError}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Completion Progress Analytics Banner */}
        {totalActiveHabitsCount > 0 && (
          <div className="p-6 rounded-3xl border border-slate-900 bg-slate-900/10 backdrop-blur-md flex flex-col sm:flex-row items-center gap-6 justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white">Daily Consistency Tracker</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  You completed <span className="font-bold text-emerald-400">{completedTodayCount}</span> of <span className="font-bold text-white">{totalActiveHabitsCount}</span> active habits today!
                </p>
              </div>
            </div>

            <div className="w-full sm:w-64 flex flex-col gap-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  Progress
                </span>
                <span className="text-emerald-400">{completionPercentage}%</span>
              </div>
              <ProgressBar value={completionPercentage} barColor="bg-gradient-to-r from-emerald-500 to-emerald-600" />
            </div>
          </div>
        )}

        {/* Search & Category Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/30 p-4 rounded-2xl border border-slate-900/80 backdrop-blur-xl">
          {/* Search box */}
          <div className="relative w-full md:max-w-xs">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search habits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950 border border-slate-850 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 rounded-xl text-white placeholder-slate-500 transition-all outline-none"
            />
          </div>

          {/* Categories Selector list */}
          <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15'
                    : 'bg-slate-950 text-slate-450 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Habits Skeletons or List Grid */}
        {isLoading && habits.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-5 rounded-2xl border border-slate-900 bg-slate-900/10 h-36 animate-pulse" />
            ))}
          </div>
        ) : filteredHabits.length === 0 ? (
          <div className="p-12 rounded-3xl border border-dashed border-slate-850 bg-slate-900/5 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900/50 flex items-center justify-center text-slate-600 border border-slate-850">
              <FolderHeart className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-md font-bold text-slate-300">No habits found</h4>
              <p className="text-xs text-slate-500 mt-1">Refine your search parameters or build a brand-new habit card!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHabits.map((habit) => (
              <HabitCard
                key={habit._id}
                habit={habit}
                onToggleComplete={handleToggleComplete}
                onArchive={archiveHabit}
                onDelete={deleteHabit}
              />
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
