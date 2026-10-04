'use client';

import React from 'react';
import Link from 'next/link';
import { Waves, ArrowLeft, Home, Sparkles } from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-36 pb-24 max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/25 animate-pulse">
          <Waves className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-500 uppercase">
            Error 404 • Page Not Found
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            Lost in the Cycle?
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The page you are looking for has been washed away or moved. Return to the showroom or customer hub.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
          >
            <Home className="w-4 h-4" />
            <span>Enter Showroom</span>
          </Link>
          <Link
            href="/track"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span>Track Order</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
