'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MoveHorizontal, CheckCircle2, AlertCircle } from 'lucide-react';
import { BEFORE_AFTER_DATA } from '@/data/mockData';

export default function BeforeAfterSection() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const activeCase = BEFORE_AFTER_DATA[activeCaseIndex];

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  return (
    <section id="results" className="py-24 relative overflow-hidden bg-slate-50/60 dark:bg-slate-900/40 border-t border-cyan-100/50 dark:border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/70 dark:bg-cyan-950/50 border border-cyan-300/40 text-cyan-800 dark:text-cyan-300 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Master Stain Restoration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            See The Transformation,{' '}
            <span className="gradient-text-ocean">Slide To Compare.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Drag the interactive slider to see how our ultrasonic spotters and organic solvents lift the toughest dried stains without fiber degradation.
          </p>

          {/* Case Study Switcher Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {BEFORE_AFTER_DATA.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCaseIndex === idx
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25 scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.title.split('on')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Before / After Slider Component */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Slider Container */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerUp}
              className="relative w-full h-80 sm:h-[420px] rounded-3xl overflow-hidden select-none cursor-ew-resize shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900 touch-none"
            >
              {/* "AFTER" (Pristine Clean) Background Layer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-100 via-white to-cyan-50 dark:from-slate-900 dark:via-sky-950 dark:to-slate-850 flex flex-col items-center justify-center p-8 text-center">
                {/* Visual Representation of Pristine Fabric */}
                <div className="relative w-52 h-52 rounded-3xl bg-white dark:bg-slate-800 shadow-2xl border-2 border-cyan-400/40 flex flex-col items-center justify-center p-6">
                  <div className="text-5xl animate-pulse">
                    {activeCase.id === 'ba-wine'
                      ? '👚'
                      : activeCase.id === 'ba-coffee'
                      ? '🧶'
                      : '👟'}
                  </div>
                  <div className="mt-4 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 border border-emerald-300 dark:border-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Restored Pristine</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-mono">
                    Zero stain residual
                  </p>
                </div>

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/90 text-white font-mono text-xs font-bold shadow-md">
                  AFTER: FreshFold Clean
                </div>
              </div>

              {/* "BEFORE" (Stained) Overlay Layer clipped by slider percentage */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-stone-900 via-amber-950 to-stone-950 flex flex-col items-center justify-center p-8 text-center overflow-hidden pointer-events-none"
                style={{
                  clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                }}
              >
                {/* Visual Representation of Stained Fabric */}
                <div className="relative w-52 h-52 rounded-3xl bg-stone-800 shadow-2xl border-2 border-amber-600/40 flex flex-col items-center justify-center p-6">
                  <div className="relative text-5xl grayscale opacity-80">
                    {activeCase.id === 'ba-wine'
                      ? '👚'
                      : activeCase.id === 'ba-coffee'
                      ? '🧶'
                      : '👟'}
                    {/* Simulated stain spot */}
                    <div className="absolute top-2 left-3 w-8 h-8 rounded-full bg-red-800/80 blur-xs border border-red-950" />
                  </div>
                  <div className="mt-4 px-3 py-1 rounded-full bg-amber-950 text-amber-300 text-xs font-bold flex items-center gap-1.5 border border-amber-700">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Severe Stain Damage</span>
                  </div>
                  <p className="text-[11px] text-amber-200/70 mt-2 font-mono">
                    {activeCase.stainType}
                  </p>
                </div>

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-600/90 text-white font-mono text-xs font-bold shadow-md">
                  BEFORE: Damaged
                </div>
              </div>

              {/* Draggable Divider Handle Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.7)] pointer-events-none z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-cyan-400 border-2 border-cyan-400 shadow-xl flex items-center justify-center">
                  <MoveHorizontal className="w-5 h-5" />
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-slate-400 mt-2.5">
              ← Drag horizontal bar or touch & slide to inspect fabric fibers →
            </p>
          </div>

          {/* Details Sidebar for Active Case */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
              {activeCase.category}
            </span>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              {activeCase.title}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeCase.description}
            </p>

            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40">
                <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">
                  Initial Condition:
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                  {activeCase.beforeDesc}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">
                  After FreshFold Treatment:
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                  {activeCase.afterDesc}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Fabric composition:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {activeCase.fabric}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
