'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Calendar,
  ArrowRight,
  ShieldCheck,
  RotateCw,
  Droplets,
  Zap,
  Play,
  Pause,
  Award,
  Waves,
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

export default function HeroSection() {
  const { openBooking } = useBooking();
  const [drumSpeed, setDrumSpeed] = useState<'normal' | 'fast' | 'turbo'>('normal');
  const [isPlaying, setIsPlaying] = useState(true);
  const [bubbleBurst, setBubbleBurst] = useState(0);

  const speedDuration = {
    normal: '3s',
    fast: '1.2s',
    turbo: '0.5s',
  };

  const handleBurstBubbles = () => {
    setBubbleBurst((prev) => prev + 1);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-sky-50/30 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950">
      {/* Background Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={`bubble-${i}-${bubbleBurst}`}
            className="absolute rounded-full bg-radial from-white/80 via-cyan-200/40 to-sky-400/20 dark:from-cyan-300/30 dark:via-sky-400/20 dark:to-blue-600/10 border border-white/60 dark:border-cyan-300/30 shadow-inner"
            style={{
              width: `${18 + (i % 6) * 14}px`,
              height: `${18 + (i % 6) * 14}px`,
              left: `${(i * 6.5) % 100}%`,
              bottom: '-60px',
            }}
            animate={{
              y: ['0vh', '-110vh'],
              x: [0, (i % 2 === 0 ? 25 : -25), (i % 3 === 0 ? -15 : 15), 0],
              opacity: [0, 0.75, 0.85, 0],
            }}
            transition={{
              duration: 7 + (i % 5) * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (i * 0.4) % 4,
            }}
          />
        ))}

        {/* Soft Ambient Light Glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-400/15 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-sky-400/15 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-amber-300/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/80 dark:bg-cyan-950/60 border border-cyan-300/60 dark:border-cyan-700/50 text-cyan-800 dark:text-cyan-300 text-xs font-semibold shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400 animate-pulse" />
              <span>Next-Gen Organic Garment Atelier</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <span className="text-cyan-700 dark:text-cyan-400">Zero-PERC Eco</span>
            </motion.div>

            {/* Headline with Text Reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] font-heading"
            >
              Couture Laundry Care,{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-400 bg-clip-text text-transparent">
                  Delivered To You.
                </span>
                {/* Yellow accent underline brush */}
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="absolute -bottom-2 left-0 w-full h-3 text-amber-400"
                  viewBox="0 0 250 12"
                  fill="none"
                >
                  <path
                    d="M3 9C60 3 190 3 247 9"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              Say goodbye to harsh chemical odors and laundry day exhaustion. We combine cold-ozone sanitization, Italian dry steam finishing, and valet electric pickup in 30-minute precise windows.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={() => openBooking()}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 text-white font-bold text-base shadow-xl shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 group"
              >
                <Calendar className="w-5 h-5 text-amber-300" />
                <span>Book Free Pickup</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-base border border-slate-200 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-slate-800/80 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <span>View Menu & Prices</span>
              </a>
            </motion.div>

            {/* Micro Trust Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto lg:mx-0"
            >
              <div>
                <div className="flex items-center gap-1 text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl font-heading">
                  <span>12,400+</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Garments Restored
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl font-heading">
                  <span className="text-amber-500">★</span>
                  <span>4.9 / 5.0</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Google Verified (850+)
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl font-heading">
                  <span className="text-cyan-500">6h</span>
                  <span>Rush</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Same-Day Express
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Animated Washing Machine (CSS + SVG) with interactive controls */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Ambient Washing Machine Platform Glow */}
            <div className="w-72 h-16 bg-cyan-500/20 dark:bg-cyan-500/30 rounded-full blur-xl -bottom-6 absolute pointer-events-none" />

            {/* Interactive Washing Machine Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-80 sm:w-[360px] rounded-[36px] bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 p-6 shadow-2xl shadow-cyan-950/20 dark:shadow-black/70 border-4 border-slate-200/80 dark:border-slate-700/80 group"
            >
              {/* Washing Machine Top Control Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-sky-600 flex items-center justify-center text-white shadow-sm">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 font-heading">
                      FreshFold V4
                    </h5>
                    <p className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono font-semibold">
                      OZONE HYDRO LAB
                    </p>
                  </div>
                </div>

                {/* Digital LED Timer Display */}
                <div className="bg-slate-900 dark:bg-black px-3 py-1 rounded-xl border border-cyan-500/30 shadow-inner flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-cyan-300 text-xs font-bold tracking-wider">
                    {drumSpeed === 'turbo' ? '00:08' : drumSpeed === 'fast' ? '00:18' : '00:28'}
                  </span>
                </div>
              </div>

              {/* Central Circular Washing Porthole Door */}
              <div className="relative my-6 flex items-center justify-center">
                {/* Outer Chrome Bezel */}
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full p-3 bg-gradient-to-tr from-slate-300 via-slate-100 to-slate-400 dark:from-slate-700 dark:via-slate-600 dark:to-slate-800 shadow-xl relative flex items-center justify-center">
                  {/* Chrome Door Handle */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-12 rounded-full bg-gradient-to-r from-slate-400 to-slate-200 dark:from-slate-600 dark:to-slate-400 shadow-md border border-white/50" />

                  {/* Inner Water Drum Chamber */}
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-sky-900 via-blue-950 to-slate-950 relative overflow-hidden flex items-center justify-center shadow-inner border-4 border-slate-400/40 dark:border-slate-800">
                    {/* Water Level with Sloshing Animation */}
                    <div className="absolute inset-x-0 bottom-0 h-4/6 bg-gradient-to-t from-cyan-600/60 via-sky-500/40 to-transparent backdrop-blur-[1px] animate-slosh" />

                    {/* Tumbling Drum Ring */}
                    <div
                      className="w-48 h-48 sm:w-52 sm:h-52 rounded-full border-4 border-dashed border-cyan-400/40 flex items-center justify-center relative"
                      style={{
                        animation: isPlaying
                          ? `drumSpin ${speedDuration[drumSpeed]} linear infinite`
                          : 'none',
                      }}
                    >
                      {/* Clothes tumbling inside */}
                      {/* T-Shirt SVG */}
                      <div className="absolute top-4 left-8 -rotate-12 w-10 h-10 bg-amber-400/90 rounded-lg p-1.5 shadow-md flex items-center justify-center text-[10px] font-bold text-amber-950">
                        👕
                      </div>

                      {/* Silk Scarf */}
                      <div className="absolute bottom-6 right-8 rotate-45 w-9 h-9 bg-pink-400/90 rounded-lg p-1 shadow-md flex items-center justify-center text-[10px]">
                        🧣
                      </div>

                      {/* Socks */}
                      <div className="absolute top-12 right-6 -rotate-45 w-7 h-7 bg-emerald-400/90 rounded-md p-1 shadow-md flex items-center justify-center text-[9px]">
                        🧦
                      </div>

                      {/* Towel */}
                      <div className="absolute bottom-8 left-10 rotate-12 w-11 h-8 bg-sky-200/90 rounded-md p-1 shadow-md flex items-center justify-center text-[9px]">
                        🧺
                      </div>

                      {/* Center Honeycomb Hub */}
                      <div className="w-14 h-14 rounded-full bg-slate-800/80 border-2 border-cyan-300/50 flex items-center justify-center">
                        <Waves className="w-7 h-7 text-cyan-300 animate-pulse" />
                      </div>
                    </div>

                    {/* Bubbles foaming inside drum */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(8)].map((_, idx) => (
                        <motion.div
                          key={idx}
                          className="absolute w-3 h-3 rounded-full bg-white/70 border border-cyan-200"
                          style={{
                            left: `${25 + (idx * 9)}%`,
                            bottom: '25%',
                          }}
                          animate={{
                            y: [0, -40, -70],
                            x: [0, (idx % 2 === 0 ? 10 : -10), 0],
                            opacity: [0, 0.9, 0],
                            scale: [0.5, 1.2, 0.2],
                          }}
                          transition={{
                            duration: 1.5 + (idx % 3) * 0.4,
                            repeat: Infinity,
                            delay: idx * 0.25,
                          }}
                        />
                      ))}
                    </div>

                    {/* Convex Glass Reflection Highlight */}
                    <div className="absolute -top-10 -left-10 w-36 h-36 bg-gradient-to-br from-white/35 via-white/10 to-transparent rounded-full rotate-45 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Interactive Machine Control Buttons */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-1">
                  <span>Drum Cycle Control:</span>
                  <span className="text-cyan-600 dark:text-cyan-400 capitalize">
                    {drumSpeed} Speed
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                    }}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-colors ${
                      !isPlaying
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setDrumSpeed('normal');
                      setIsPlaying(true);
                    }}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center border transition-colors ${
                      drumSpeed === 'normal'
                        ? 'bg-cyan-500 text-white border-cyan-500 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Eco
                  </button>

                  <button
                    onClick={() => {
                      setDrumSpeed('fast');
                      setIsPlaying(true);
                    }}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center border transition-colors ${
                      drumSpeed === 'fast'
                        ? 'bg-cyan-500 text-white border-cyan-500 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Fast
                  </button>

                  <button
                    onClick={() => {
                      setDrumSpeed('turbo');
                      setIsPlaying(true);
                      handleBurstBubbles();
                    }}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-colors ${
                      drumSpeed === 'turbo'
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <Zap className="w-3 h-3 fill-current" />
                    <span>Turbo</span>
                  </button>
                </div>
              </div>

              {/* Floating Detergent Pod Callout */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-5 -right-4 bg-white dark:bg-slate-900 border border-cyan-300 dark:border-cyan-700 rounded-2xl p-2.5 shadow-xl flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                  100%
                </div>
                <div className="text-left pr-2">
                  <p className="text-[11px] font-bold text-slate-800 dark:text-slate-100 leading-tight">
                    Plant Bio-Enzymes
                  </p>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400">
                    Safe for cashmere & silks
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
