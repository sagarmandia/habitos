import { Activity, LayoutDashboard, CheckCircle, User } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">HabitOS</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="hover:text-white transition-colors">Habits</a>
            <a href="#" className="hover:text-white transition-colors">Stats</a>
            <button className="bg-white text-slate-950 px-4 py-2 rounded-full hover:bg-slate-200 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-500 bg-clip-text text-transparent tracking-tight">
              Master Your Habits,<br />Elevate Your Life.
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              HabitOS is the production-grade habit tracking system designed for high performers. 
              Built with precision, scalability, and modern design in mind.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-all group">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                <LayoutDashboard className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Modern Dashboard</h3>
              <p className="text-slate-400 leading-relaxed">
                Beautifully designed analytics to visualize your progress and keep you motivated every single day.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-all group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                <Activity className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Streak Tracking</h3>
              <p className="text-slate-400 leading-relaxed">
                Advanced algorithms to track your consistency and build momentum that lasts a lifetime.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-all group">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
                <User className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community First</h3>
              <p className="text-slate-400 leading-relaxed">
                Share your journey with friends, compete in challenges, and grow together in a supportive environment.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-indigo-500" />
            <span className="text-xl font-bold tracking-tight">HabitOS</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 HabitOS. All rights reserved. Built with Next.js, Express, and MongoDB.
          </p>
        </div>
      </footer>
    </div>
  );
}
