'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, 
  Flame, 
  TrendingUp, 
  Calendar, 
  Plus, 
  Activity,
  Award,
  Zap
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import useHabitStore from '@/store/useHabitStore';
import useAuth from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  const { user } = useAuth();
  const { analytics, fetchAnalytics, isLoading } = useHabitStore();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const metrics = analytics?.data?.metrics || {
    totalHabits: 0,
    completedToday: 0,
    highestStreak: 0,
    totalStreaks: 0,
    completionRate: 0,
  };

  const recentActivity = analytics?.data?.recentActivity || [];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 animate-in fade-in duration-500">
        
        {/* Upper Heading */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-slate-400 text-sm mt-1">Here is your habits consistency analytics report.</p>
          </div>
          
          <Link href="/habits/create">
            <Button variant="primary" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Habit
            </Button>
          </Link>
        </div>

        {/* Pulse Loading Skeleton or Metrics Grid */}
        {isLoading && !analytics ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-900 bg-slate-900/10 h-32 animate-pulse flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-24 h-4 bg-slate-800 rounded" />
                  <div className="w-8 h-8 bg-slate-800 rounded-lg" />
                </div>
                <div className="w-16 h-8 bg-slate-800 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metric 1 */}
            <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-md hover:border-slate-800 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Active Habits</span>
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight">{metrics.totalHabits}</h3>
              <p className="text-slate-500 text-xs mt-1">Currently tracking</p>
            </div>

            {/* Metric 2 */}
            <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-md hover:border-slate-800 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Completed Today</span>
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight">{metrics.completedToday}</h3>
              <p className="text-slate-500 text-xs mt-1">Daily completions</p>
            </div>

            {/* Metric 3 */}
            <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-md hover:border-slate-800 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Best Streak</span>
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                  <Flame className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight">{metrics.highestStreak} Days</h3>
              <p className="text-slate-500 text-xs mt-1">Highest streak count</p>
            </div>

            {/* Metric 4 */}
            <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-md hover:border-slate-800 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Consistency Level</span>
                <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight">{metrics.completionRate}%</h3>
              <p className="text-slate-500 text-xs mt-1">7-Day Completion Rate</p>
            </div>
          </div>
        )}

        {/* Lower Details Splits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Activity List feed */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              Recent Completes
            </h2>

            {isLoading && !analytics ? (
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-900 bg-slate-900/10 h-16 animate-pulse" />
                ))}
              </div>
            ) : recentActivity.length === 0 ? (
              <div className="p-8 rounded-2xl border border-dashed border-slate-800 bg-slate-900/5 text-center flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-slate-600">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-300">No logs found</h4>
                  <p className="text-xs text-slate-500 mt-1">Mark a habit as complete in "My Habits" to see it here.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {recentActivity.map((activity) => (
                  <div 
                    key={activity._id}
                    className="p-4 flex items-center justify-between rounded-xl border border-slate-900/80 bg-slate-900/20 hover:bg-slate-900/40 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{activity.habit?.title || 'Habit Completed'}</h4>
                        <p className="text-xs text-slate-500">
                          {activity.notes ? `"${activity.notes}"` : 'No notes added'}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-slate-500 font-medium">
                      {new Date(activity.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Consistency Side Guide Card */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              Consistency Insights
            </h2>

            <div className="p-6 rounded-2xl border border-slate-900 bg-indigo-950/10 flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />
              
              <h4 className="text-sm font-bold text-indigo-400">Weekly Achievement Goal</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Consistency is key! Aim to hit at least 80% completion percentage this week to secure your "Elite" streak ranking tier.
              </p>

              <div className="h-px bg-slate-900 w-full my-1" />

              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">Completed Logs (Last 7 Days)</span>
                <span className="text-white">{metrics.completionRate > 0 ? 'Consistent' : 'Starting Out'}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
