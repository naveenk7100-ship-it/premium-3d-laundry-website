'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, Truck, Package, ArrowRight } from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { db } from '@/services/storage';

export default function GeneralTrackingPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    db.init();
    const orders = db.getOrders();
    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === query.trim().toLowerCase() ||
        o.bagTagId.toLowerCase() === query.trim().toLowerCase() ||
        o.id.replace('FF-', '') === query.trim()
    );

    if (found) {
      router.push(`/track/${found.id}`);
    } else {
      setError(`No active order found matching "${query}". Try #FF-1000 or check recent orders.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-36 pb-24 max-w-xl mx-auto px-4 sm:px-6 w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/25">
          <Truck className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            Live Garment Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Enter your FreshFold Order ID (e.g., FF-1000) or Hamper Bag Tag # to view stage telemetry and valet courier location.
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="e.g. FF-1000 or TAG-91000"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setError('');
              }}
              className="w-full text-sm pl-11 pr-32 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-lg focus:outline-cyan-500"
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Track
            </button>
          </div>

          {error && <p className="text-xs text-rose-500 font-semibold">{error}</p>}
        </form>

        {/* Quick Demo Links */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 mb-2">Or view recent active orders:</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {['FF-1000', 'FF-1010', 'FF-1015', 'FF-1020', 'FF-1026'].map((id) => (
              <button
                key={id}
                onClick={() => router.push(`/track/${id}`)}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 font-mono text-cyan-600 dark:text-cyan-400 font-bold"
              >
                #{id}
              </button>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
