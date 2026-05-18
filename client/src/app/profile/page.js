'use client';

import React, { useEffect } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  Flame, 
  Zap,
  ShieldAlert
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import useAuth from '@/hooks/useAuth';
import useHabitStore from '@/store/useHabitStore';

export default function ProfilePage() {
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

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
        
        {/* Page title */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <User className="w-8 h-8 text-indigo-500" />
            My Profile
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage your account parameters and review your global achievements.</p>
        </div>

        {/* Profile Split layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left panel - Info Card */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="p-6 rounded-3xl border border-slate-900 bg-slate-900/20 backdrop-blur-xl flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />
              
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-indigo-600/15 border border-indigo-500/20 flex items-center justify-center font-extrabold text-2xl text-indigo-400 mb-4">
                {user?.name?.charAt(0) || 'U'}
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">{user?.name}</h3>
              <span className="text-xs text-slate-500 font-medium mt-0.5">HabitOS Consistency Enthusiast</span>

              <div className="h-px bg-slate-900/80 w-full my-6" />

              {/* Specific info rows */}
              <div className="flex flex-col gap-3.5 w-full text-left text-xs font-semibold text-slate-400">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="truncate">{user?.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>Joined May 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel - Stats & Achievements */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              Achievements Board
            </h2>

            {/* Achievement metrics stats cards */}
            {isLoading && !analytics ? (
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="p-5 rounded-2xl border border-slate-900 bg-slate-900/10 h-24 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {/* Stat 1 */}
                <div className="p-5 rounded-2xl border border-slate-900/80 bg-slate-900/10 flex items-center gap-4">
                  <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                    <Flame className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Best Daily Streak</h4>
                    <span className="text-2xl font-extrabold text-white mt-0.5 block">{metrics.highestStreak} Days</span>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="p-5 rounded-2xl border border-slate-900/80 bg-slate-900/10 flex items-center gap-4">
                  <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Cumulative Streaks</h4>
                    <span className="text-2xl font-extrabold text-white mt-0.5 block">{metrics.totalStreaks} Days</span>
                  </div>
                </div>
              </div>
            )}

            {/* Account Settings / Meta Panel */}
            <div className="p-6 rounded-3xl border border-slate-900/80 bg-slate-900/10 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4.5 h-4.5 text-slate-500" />
                Security Information
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your credentials are secured using bcrypt password hashing algorithms inside MongoDB and validated via state-of-the-art JSON Web Tokens (JWT). HabitOS processes requests via pre-authorized Bearer token scopes.
              </p>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
