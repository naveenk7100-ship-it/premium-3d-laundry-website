'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import {
  CalendarClock,
  Waves,
  Flame,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '@/data/mockData';
import { useBooking } from '@/context/BookingContext';
import { audioEngine } from '@/utils/audioEngine';

const stepIcons: Record<string, React.ReactNode> = {
  CalendarClock: <CalendarClock className="w-5 h-5 sm:w-6 sm:h-6" />,
  Waves: <Waves className="w-5 h-5 sm:w-6 sm:h-6" />,
  Flame: <Flame className="w-5 h-5 sm:w-6 sm:h-6" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
  Truck: <Truck className="w-5 h-5 sm:w-6 sm:h-6" />,
};

export default function HowItWorksSection() {
  const { openBooking } = useBooking();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.2) setActiveStep(1);
      else if (latest < 0.4) setActiveStep(2);
      else if (latest < 0.6) setActiveStep(3);
      else if (latest < 0.8) setActiveStep(4);
      else setActiveStep(5);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleStepClick = (stepNum: number) => {
    audioEngine.playClick();
    setActiveStep(stepNum);
  };

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-slate-900/60 border-y border-slate-800 backdrop-blur-xl text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>5-Stage Continuous Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
            Pickup → Wash → Dry → Fold → Deliver
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Every garment flows through our certified five-stage closed-loop sanitization and artisanal finishing pipeline.
          </p>
        </div>

        {/* Desktop Interactive Timeline Pipeline */}
        <div className="relative my-12 hidden lg:block">
          {/* Background Track Line */}
          <div className="absolute top-1/2 left-8 right-8 h-2 bg-slate-800 rounded-full -translate-y-1/2 z-0" />

          {/* Animated Progress Fill Line */}
          <motion.div
            className="absolute top-1/2 left-8 h-2 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 rounded-full -translate-y-1/2 z-0 shadow-[0_0_12px_#38bdf8]"
            animate={{ width: `${((activeStep - 1) / 4) * 94}%` }}
            transition={{ ease: 'easeOut', duration: 0.35 }}
          />

          {/* 5 Stage Checkpoints */}
          <div className="grid grid-cols-5 gap-4 relative z-10">
            {HOW_IT_WORKS_STEPS.map((stepItem) => {
              const isPassed = activeStep >= stepItem.step;
              const isCurrent = activeStep === stepItem.step;

              return (
                <div
                  key={stepItem.step}
                  onClick={() => handleStepClick(stepItem.step)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  {/* Step Circular Node */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${
                      isCurrent
                        ? 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white ring-4 ring-cyan-400/40 scale-110 shadow-cyan-500/50'
                        : isPassed
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {stepIcons[stepItem.icon]}
                  </div>

                  <span className="mt-3 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Stage 0{stepItem.step}
                  </span>
                  <span className="text-sm font-bold text-white mt-0.5 text-center">
                    {stepItem.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5 Step Detail Cards Grid with Scroll-Driven Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {HOW_IT_WORKS_STEPS.map((stepItem) => {
            const isActive = activeStep === stepItem.step;

            return (
              <motion.div
                key={stepItem.step}
                animate={{
                  scale: isActive ? 1.03 : 1,
                  borderColor: isActive ? 'rgba(6, 182, 212, 0.6)' : 'rgba(51, 65, 85, 0.6)',
                }}
                transition={{ duration: 0.3 }}
                onClick={() => handleStepClick(stepItem.step)}
                className={`relative rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                  isActive
                    ? 'bg-slate-800/90 shadow-2xl shadow-cyan-500/20'
                    : 'bg-slate-900/60 hover:bg-slate-800/60'
                }`}
              >
                {/* Active Indicator Top Tag */}
                {isActive && (
                  <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-mono text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                    Active Step
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-cyan-400">
                      0{stepItem.step}
                    </span>
                    <div
                      className={`p-2 rounded-xl ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {stepIcons[stepItem.icon]}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white font-heading">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-300/80 mt-1">
                    {stepItem.subtitle}
                  </p>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {stepItem.description}
                  </p>

                  <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-800">
                    {stepItem.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-[11px] text-slate-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{stepItem.timeframe}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 border border-cyan-500/30 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold font-heading text-white">
              Ready to experience zero-effort laundry?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Book in 30 seconds. Complimentary pickup & reusable FreshFold canvas hamper included.
            </p>
          </div>

          <button
            onClick={() => {
              audioEngine.playClick();
              audioEngine.playChime(660);
              openBooking();
            }}
            className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/30 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
          >
            <span>Schedule Valet Pickup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
