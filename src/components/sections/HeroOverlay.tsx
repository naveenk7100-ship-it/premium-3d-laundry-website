'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Calendar,
  Compass,
  ArrowDown,
  ShieldCheck,
  CheckCircle2,
  Waves,
  Mouse,
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { audioEngine } from '@/utils/audioEngine';

interface HeroOverlayProps {
  onExplore: () => void;
}

export default function HeroOverlay({ onExplore }: HeroOverlayProps) {
  const { openBooking } = useBooking();

  const handleBook = () => {
    audioEngine.playClick();
    audioEngine.playChime(660);
    openBooking();
  };

  const handleExplore = () => {
    audioEngine.playClick();
    audioEngine.playChime(520);
    onExplore();
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 z-10 pointer-events-none">
      {/* Top Status Pill */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-start pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-xl border border-cyan-500/35 text-cyan-300 text-xs font-semibold shadow-2xl"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Atelier Flagship Storefront</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 font-normal">Next Valet Window: In 35 mins</span>
        </motion.div>
      </div>

      {/* Main Cinematic Headline & CTAs */}
      <div className="max-w-7xl mx-auto w-full my-auto pointer-events-auto">
        <div className="max-w-3xl space-y-6">
          {/* Main Headline with Staggered Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white font-heading leading-[1.02]">
              Fresh Clothes.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                Zero Effort.
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-base sm:text-xl md:text-2xl text-slate-200/90 max-w-2xl font-light leading-relaxed drop-shadow-md"
          >
            Premium laundry care, pickup and delivery — made effortless.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {/* Primary CTA (Magnetic-feel scale) */}
            <button
              onClick={handleBook}
              className="group relative px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-cyan-200 group-hover:scale-110 transition-transform" />
              <span>Book a Pickup</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={handleExplore}
              className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700/80 hover:border-cyan-500/50 backdrop-blur-xl shadow-xl transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <Compass className="w-5 h-5 text-cyan-400" />
              <span>Explore Our Laundry</span>
            </button>
          </motion.div>

          {/* Value Pillars Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-4 sm:pt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 font-medium"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>100% Organic Solvent</span>
            </div>
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-cyan-400" />
              <span>Ozone Deep Sanitization</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Zero Missing Sock Guarantee</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Cue with "Scroll to explore" */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-slate-400 pointer-events-auto"
      >
        <button
          onClick={handleExplore}
          className="flex items-center gap-3 text-cyan-300/90 hover:text-white transition-colors group cursor-pointer"
          aria-label="Scroll to explore 3D store"
        >
          <div className="w-6 h-10 rounded-full border-2 border-cyan-400/50 group-hover:border-cyan-400 flex items-start justify-center p-1.5 transition-colors bg-slate-950/40 backdrop-blur-xs">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]"
            />
          </div>
          <span className="font-mono text-xs tracking-wider uppercase font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
            Scroll to explore
          </span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform text-cyan-400" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-300 bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive 3D Walkthrough Active</span>
        </div>
      </motion.div>
    </section>
  );
}
