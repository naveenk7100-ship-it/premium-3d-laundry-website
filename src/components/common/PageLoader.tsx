'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Waves, CheckCircle2, RotateCw } from 'lucide-react';
import { audioEngine } from '@/utils/audioEngine';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const stages = [
    { threshold: 25, label: 'Initializing 3D Architectural World...' },
    { threshold: 55, label: 'Sanitizing Commercial Honeycomb Drums...' },
    { threshold: 85, label: 'Pressurizing Italian Boiler Steam...' },
    { threshold: 100, label: 'Atelier Showroom Ready' },
  ];

  const currentStage = stages.find((s) => progress <= s.threshold)?.label || 'Showroom Ready';

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            audioEngine.playChime(660);
            setLoading(false);
          }, 350);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden select-none"
        >
          {/* Subtle Ambient Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Luxury Rotary Dial & Washing Drum */}
          <div className="relative mb-8 flex flex-col items-center">
            {/* Outer Rotary Dial Ring */}
            <div className="relative w-32 h-32 rounded-full border-2 border-slate-800 bg-slate-900/90 shadow-[0_0_50px_rgba(6,182,212,0.25)] flex items-center justify-center p-3">
              {/* Dial tick marks */}
              <div
                className="absolute inset-1 rounded-full border-2 border-dashed border-cyan-400/40 animate-spin"
                style={{ animationDuration: '6s' }}
              />

              {/* Inner Chrome Drum Ring */}
              <div className="w-full h-full rounded-full border-2 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Spinning Drum Perforations & Waves */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  className="w-16 h-16 rounded-full border border-cyan-400/50 flex items-center justify-center relative bg-cyan-950/30"
                >
                  <Waves className="w-7 h-7 text-cyan-400 animate-pulse" />
                  <div className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_#38bdf8]" />
                </motion.div>

                {/* Shimmer light beam */}
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 pointer-events-none" />
              </div>
            </div>

            {/* Glowing Dial Value Tag */}
            <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>DIAL 40°C • OZONE ACTIVE</span>
            </div>
          </div>

          {/* Typography Brand & Progress Readout */}
          <div className="text-center z-10 max-w-sm w-full px-6 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-white">
              AURA <span className="text-cyan-400">ATELIER</span>
            </h2>

            <p className="text-xs text-slate-400 font-mono tracking-wider h-4">
              {currentStage}
            </p>

            {/* Precision Horizontal Progress Bar */}
            <div className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60 mt-3">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 rounded-full shadow-[0_0_12px_#38bdf8]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
              <span>EST. 2026</span>
              <span className="text-cyan-400 font-bold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
