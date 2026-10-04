'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  CheckCircle2,
  Cpu,
  Leaf,
  Layers,
  Sparkles,
  ArrowRight,
  Shield,
  Waves,
  Eye,
} from 'lucide-react';
import { SHOP_TOUR_STOPS } from '@/data/mockData';
import { ShopTourStop } from '@/types';

// Custom Illustrated Scene Visuals for each Tour Zone
function TourSceneVisual({ stop }: { stop: ShopTourStop }) {
  if (stop.id === 'reception') {
    return (
      <div className="relative w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-blue-950 p-6 flex flex-col justify-between overflow-hidden border border-cyan-500/30 shadow-2xl">
        {/* Glow & Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Info Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold">
            ZONE 01: SMART CHECK-IN
          </span>
          <span className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            Active Optical Sensor
          </span>
        </div>

        {/* Illustrated Reception Counter & Scanner */}
        <div className="relative z-10 flex items-center justify-center my-auto">
          <div className="relative w-64 h-48 bg-slate-800/80 rounded-2xl border border-cyan-400/40 p-4 shadow-xl flex flex-col items-center justify-center backdrop-blur-md">
            {/* Garment Tagging Hologram */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-24 h-24 rounded-2xl bg-cyan-500/20 border-2 border-cyan-300 flex flex-col items-center justify-center text-cyan-200 shadow-lg shadow-cyan-500/30"
            >
              <Cpu className="w-8 h-8 text-cyan-300 animate-pulse" />
              <span className="text-[9px] font-mono mt-1 font-bold">QR #FF-9021</span>
            </motion.div>

            {/* Laser Scan Line */}
            <motion.div
              animate={{ y: [-40, 40, -40] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-44 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#38bdf8]"
            />

            <p className="text-[11px] font-mono text-slate-300 mt-4 text-center">
              Multi-Spectral Fabric Density Analysis: <strong className="text-cyan-400">100% Cashmere</strong>
            </p>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="relative z-10 flex justify-between items-center text-[11px] text-slate-400 font-mono border-t border-cyan-500/20 pt-3">
          <span>Resolution: 4K Daylight CRI-98</span>
          <span className="text-cyan-400">Tag Status: Verified</span>
        </div>
      </div>
    );
  }

  if (stop.id === 'washing') {
    return (
      <div className="relative w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 p-6 flex flex-col justify-between overflow-hidden border border-cyan-500/30 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold">
            ZONE 02: HYDRO LAB & OZONE
          </span>
          <span className="flex items-center gap-1.5 text-xs text-cyan-300 font-semibold">
            <Waves className="w-4 h-4 text-cyan-400 animate-pulse" />
            Ozone Injection Active
          </span>
        </div>

        {/* Dual Industrial Drums Visual */}
        <div className="relative z-10 flex items-center justify-center gap-6 my-auto">
          {[1, 2].map((drum) => (
            <div
              key={drum}
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-cyan-400/60 bg-slate-900/90 flex items-center justify-center relative shadow-xl shadow-cyan-900/40 overflow-hidden"
            >
              {/* Rotating Drum Spokes */}
              <div
                className="absolute inset-2 rounded-full border-2 border-dashed border-cyan-300/40 animate-spin"
                style={{ animationDuration: drum === 1 ? '3s' : '2.2s' }}
              />
              <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-cyan-500/40 to-transparent animate-slosh" />
              <div className="z-10 text-center">
                <span className="text-xl">🫧</span>
                <p className="text-[10px] font-mono text-cyan-300 font-bold mt-1">
                  DRUM {drum === 1 ? 'A1' : 'A2'}
                </p>
                <p className="text-[9px] text-slate-300 font-mono">30°C ECO</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 flex justify-between items-center text-[11px] text-slate-400 font-mono border-t border-cyan-500/20 pt-3">
          <span>Reverse Osmosis Soft Water</span>
          <span className="text-emerald-400">99.9% Microbial Sterilization</span>
        </div>
      </div>
    );
  }

  if (stop.id === 'dry-cleaning') {
    return (
      <div className="relative w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 p-6 flex flex-col justify-between overflow-hidden border border-cyan-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-mono text-xs font-bold">
            ZONE 03: ZERO-PERC ORGANIC CHAMBER
          </span>
          <span className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
            <Shield className="w-4 h-4 text-amber-400" />
            100% Closed Loop Fluid
          </span>
        </div>

        {/* Mannequin in Sealed Glass Chamber */}
        <div className="relative z-10 flex items-center justify-center my-auto">
          <div className="w-56 h-48 rounded-2xl bg-slate-900/80 border-2 border-indigo-400/40 p-4 flex flex-col items-center justify-center relative shadow-2xl backdrop-blur-md">
            <div className="text-4xl">🧥</div>
            <p className="text-xs font-bold text-slate-200 mt-2">
              Bespoke Wool & Silk Drape
            </p>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[9px] font-mono border border-emerald-700">
                ZERO TOXINS
              </span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 text-[9px] font-mono border border-indigo-700">
                SILICONE FLUID
              </span>
            </div>
            {/* Shimmer line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none rounded-2xl" />
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-center text-[11px] text-slate-400 font-mono border-t border-indigo-500/20 pt-3">
          <span>Solvent Recovery: 99.8%</span>
          <span className="text-indigo-300">Fiber Softness Index: 10/10</span>
        </div>
      </div>
    );
  }

  if (stop.id === 'ironing') {
    return (
      <div className="relative w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 p-6 flex flex-col justify-between overflow-hidden border border-cyan-500/30 shadow-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold">
            ZONE 04: ITALIAN STEAM ATELIER
          </span>
          <span className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            6-Bar Dry Steam Active
          </span>
        </div>

        {/* Steam Table Visual */}
        <div className="relative z-10 flex items-center justify-center my-auto">
          <div className="relative w-60 h-44 bg-slate-900/90 rounded-2xl border border-cyan-400/40 p-4 flex flex-col items-center justify-center shadow-xl">
            {/* Animated Steam Clouds */}
            <motion.div
              animate={{ y: [-10, -25], opacity: [0.8, 0], scale: [0.9, 1.4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
              className="absolute top-3 text-cyan-200 text-lg"
            >
              💨 💨
            </motion.div>

            <div className="text-3xl mt-4">👔</div>
            <p className="text-xs font-bold text-slate-200 mt-2">
              Artisanal Hand-Pressing
            </p>
            <p className="text-[10px] text-cyan-300 font-mono">
              Vacuum Heated Table + Teflon Shield
            </p>
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-center text-[11px] text-slate-400 font-mono border-t border-cyan-500/20 pt-3">
          <span>Heat Source: Micro-Boiler</span>
          <span className="text-cyan-400">Zero Fabric Shine or Glaze</span>
        </div>
      </div>
    );
  }

  // Packing
  return (
    <div className="relative w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 p-6 flex flex-col justify-between overflow-hidden border border-cyan-500/30 shadow-2xl">
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold">
          ZONE 05: CLEANROOM PACKAGING & DISPATCH
        </span>
        <span className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold">
          <Leaf className="w-4 h-4 text-emerald-400" />
          100% Compostable Film
        </span>
      </div>

      {/* Packaging Visual */}
      <div className="relative z-10 flex items-center justify-center my-auto">
        <div className="w-64 h-44 bg-slate-900/90 rounded-2xl border border-emerald-400/40 p-4 flex flex-col items-center justify-center shadow-xl text-center">
          <div className="text-3xl">📦 🏷️</div>
          <p className="text-xs font-bold text-slate-200 mt-2">
            Wooden Hangers & Cedar Rings
          </p>
          <p className="text-[10px] text-emerald-400 font-mono mt-0.5">
            Loaded onto Electric Delivery Van
          </p>
        </div>
      </div>

      <div className="relative z-10 flex justify-between items-center text-[11px] text-slate-400 font-mono border-t border-emerald-500/20 pt-3">
        <span>RFID Verification: Passed</span>
        <span className="text-emerald-400">Fleet Ready for Dispatch</span>
      </div>
    </div>
  );
}

export default function ShopTourSection() {
  const [selectedZone, setSelectedZone] = useState<string>(SHOP_TOUR_STOPS[0].id);

  const currentStop =
    SHOP_TOUR_STOPS.find((s) => s.id === selectedZone) || SHOP_TOUR_STOPS[0];

  return (
    <section id="tour" className="py-24 relative overflow-hidden bg-slate-950 text-white">
      {/* Background Starry Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Behind The Scenes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
            Virtual Tour of Our{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
              High-Tech Clean Atelier.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Take an interactive scroll-driven tour through the 5 specialized zones where our textile engineers care for your wardrobe.
          </p>
        </div>

        {/* Zone Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {SHOP_TOUR_STOPS.map((stop) => {
            const isSelected = selectedZone === stop.id;
            return (
              <button
                key={stop.id}
                onClick={() => setSelectedZone(stop.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-cyan-500/40 hover:text-slate-200'
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{stop.zone}</span>
                <span>{stop.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Main Stage Tour Showcase: Left Content + Right Parallax Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Details about Current Zone */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStop.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-500/40">
                    {currentStop.zone}
                  </span>
                  <span className="text-xs font-semibold text-amber-400">
                    {currentStop.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  {currentStop.title}
                </h3>
                <p className="text-sm font-semibold text-cyan-400">
                  {currentStop.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentStop.description}
                </p>

                {/* Zone Specifications Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Machinery & System</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      {currentStop.equipment}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                      <Leaf className="w-3.5 h-3.5" />
                      <span>Eco-Sustainability Impact</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      {currentStop.ecoFeature}
                    </p>
                  </div>
                </div>

                {/* Key Features List */}
                <div className="space-y-2 pt-2">
                  {currentStop.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Custom Parallax Illustrated Scene */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStop.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
              >
                <TourSceneVisual stop={currentStop} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
