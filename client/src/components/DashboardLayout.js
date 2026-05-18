'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  CheckCircle, 
  LayoutDashboard, 
  ListTodo, 
  PlusCircle, 
  User, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Settings
} from 'lucide-react';
import ProtectedRoute from './ProtectedRoute';
import useAuth from '@/hooks/useAuth';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Habits', href: '/habits', icon: ListTodo },
    { name: 'Create Habit', href: '/habits/create', icon: PlusCircle },
    { name: 'My Profile', href: '/profile', icon: User },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex relative overflow-hidden select-none">
        {/* Dynamic Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.08),rgba(255,255,255,0))]" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[128px] -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/3 rounded-full blur-[128px] -translate-y-1/2 pointer-events-none" />

        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-slate-900 bg-slate-950/60 backdrop-blur-xl z-20 relative h-screen sticky top-0">
          {/* Header Brand */}
          <div className="h-16 flex items-center gap-2.5 px-6 border-b border-slate-900/50">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">HabitOS</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-6 px-4 flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500 pl-3.5 shadow-sm shadow-indigo-500/5'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : ''}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Footer Profile */}
          <div className="p-4 border-t border-slate-900/80 bg-slate-950/40">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/40 border border-slate-800/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-400">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex flex-col max-w-[110px]">
                  <span className="text-xs font-bold text-white truncate">{user?.name}</span>
                  <span className="text-[10px] text-slate-500 truncate">{user?.email}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 hover:bg-rose-950/40 hover:text-rose-400 text-slate-500 rounded-lg transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen relative z-10">
          {/* Header Bar */}
          <header className="h-16 border-b border-slate-900 bg-slate-950/40 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
            {/* Left Header - Mobile Brand & Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="flex lg:hidden items-center gap-2">
                <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center">
                  <CheckCircle className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-md font-bold tracking-tight text-white">HabitOS</span>
              </div>
            </div>

            {/* Right Header - Controls */}
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors">
                <Bell className="w-4.5 h-4.5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors">
                <Settings className="w-4.5 h-4.5" />
              </button>
              
              {/* Vertical line */}
              <div className="h-4 w-px bg-slate-900 hidden lg:block" />
              
              <div className="items-center gap-2.5 pl-1 hidden lg:flex">
                <span className="text-xs text-slate-400 font-medium">System Online</span>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              </div>
            </div>
          </header>

          {/* Children Scroll container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sidebar drawer content */}
            <div className="relative flex flex-col w-72 max-w-xs bg-slate-950 border-r border-slate-900 h-full p-6 animate-in slide-in-from-left duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold tracking-tight text-white">HabitOS</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500 pl-3.5'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* User Profiling */}
              <div className="pt-6 border-t border-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-600/20 flex items-center justify-center font-bold text-indigo-400">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white truncate max-w-[120px]">{user?.name}</span>
                    <span className="text-[10px] text-slate-500 truncate max-w-[120px]">{user?.email}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 bg-slate-900 hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
