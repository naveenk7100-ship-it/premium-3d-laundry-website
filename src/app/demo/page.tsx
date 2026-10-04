'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCw,
  Maximize2,
  Minimize2,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  Truck,
  LayoutDashboard,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Monitor,
  Eye,
  Home,
} from 'lucide-react';
import { db } from '@/services/storage';
import { useToast } from '@/context/ToastContext';

interface DemoSlide {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  path: string;
  previewUrl: string;
  clientPitch: string;
  features: string[];
  techStack: string[];
}

const DEMO_SLIDES: DemoSlide[] = [
  {
    id: 'landing',
    stepNumber: 1,
    title: 'Landing Page & Interactive Atelier',
    subtitle: 'High-conversion visual storytelling with smooth micro-interactions',
    badge: 'Storefront',
    path: '/',
    previewUrl: '/',
    clientPitch:
      'The landing page immerses high-end clientele in a crisp, clean aesthetic. Features an interactive SVG washing machine with cycle speed toggles, 3D hover-tilt service cards, a scroll-driven 4-step delivery road with moving electric van, virtual shop tour across 5 cleanroom zones, and an interactive draggable stain comparison slider.',
    features: [
      'Interactive SVG washing machine (Eco / Fast / Turbo with foaming bubbles)',
      '6 service cards with 3D perspective hover tilt',
      'Scroll-driven timeline with traveling electric delivery van',
      'Draggable before/after stain comparison slider',
      'Live per-kg vs per-item laundry cost estimator',
    ],
    techStack: ['Next.js 14 App Router', 'Tailwind CSS', 'Framer Motion', 'GSAP ScrollTrigger'],
  },
  {
    id: 'booking',
    stepNumber: 2,
    title: 'Valet Booking & Live Price Calculator',
    subtitle: 'Frictionless 6-step ordering flow with instant quote and payment mock',
    badge: 'Customer Flow',
    path: '/book',
    previewUrl: '/book',
    clientPitch:
      'Clients can schedule a contactless valet collection in under 60 seconds. Supports multi-garment item selection with live dynamic price updates, signature fragrance selection (Lavender / Ocean Breeze / Fragrance-Free), 2-hour arrival slot calendar, and mock payment gateway supporting UPI QR codes, cards, and Cash on Delivery.',
    features: [
      '6-step guided wizard with animated progress bar',
      'Real-time live item calculator with search and + / - counters',
      'Signature scent preference & special stain treatment notes',
      'Valet arrival time window selector with van capacity counters',
      'Mock UPI QR, card checkout, and confetti confirmation',
    ],
    techStack: ['TypeScript State Machine', 'LocalStorage DB', 'Canvas Confetti', 'Tailwind Grid'],
  },
  {
    id: 'tracking',
    stepNumber: 3,
    title: 'Live Order Tracking & Telemetry',
    subtitle: 'Uber-style 5-stage progress stepper with electric driver telemetry',
    badge: 'Order Tracking',
    path: '/track/FF-1000',
    previewUrl: '/track/FF-1000',
    clientPitch:
      'Peace of mind for luxury garments. Customers watch their clothes advance through Picked up ➔ Hydro-Wash ➔ Steam Press ➔ Out for Delivery ➔ Delivered. Includes an instant "Simulate Next Stage" button to demonstrate live transitions, assigned driver GPS telemetry, and downloadable tax invoice.',
    features: [
      'Animated 5-stage glowing progress stepper with telemetry history',
      'Interactive "Simulate Next Stage" button for instant client demo',
      'Assigned electric valet courier details with 1-click call & WhatsApp',
      'RFID Hamper Bag Tag verification and itemized garment manifest',
      'Printable tax invoice and receipt download',
    ],
    techStack: ['Framer Motion Spring Transitions', 'Storage Event Sync', 'Dynamic App Router'],
  },
  {
    id: 'admin',
    stepNumber: 4,
    title: 'Admin Command Studio & Live Sync',
    subtitle: 'Manage 30 seeded orders with real-time status updates reflecting on customer screen',
    badge: 'Admin Control',
    path: '/admin',
    previewUrl: '/admin',
    clientPitch:
      'Back-office operations hub for store managers. When an admin changes an order status in the dropdown (e.g. from "Washing" to "Out for delivery"), it instantly updates localStorage, syncs to the customer tracking page in real-time without page reload, and pushes a notification to the customer’s bell icon!',
    features: [
      'Orders table with 30 seeded realistic orders & search filters',
      'Live status dropdown with instantaneous multi-screen sync',
      'Customer directory with 15 detailed client profiles and lifetime spend',
      'Pricing management to update per-kg and per-item menu tariffs',
      'Courier slot capacity toggling across morning/evening shifts',
    ],
    techStack: ['Real-time CustomEvents', 'CRUD LocalStorage', 'Responsive Data Tables'],
  },
  {
    id: 'dashboard',
    stepNumber: 5,
    title: 'Customer Dashboard & Recharts Analytics',
    subtitle: 'Retention tools: 1-click reorder, printable invoices, FreshPoints & executive charts',
    badge: 'Retention & BI',
    path: '/dashboard',
    previewUrl: '/dashboard',
    clientPitch:
      'Drives repeat orders and customer loyalty. Features 1-click hamper reordering, printable PDF invoices, a FreshPoints rewards system ($5 discount for 500 pts), and a "Give $20, Get $20" referral engine. On the executive side, Recharts powers daily order volume AreaCharts and service breakdown PieCharts.',
    features: [
      'Customer KPI summary cards (Active in atelier, total spent, points)',
      '1-click Reorder button to duplicate previous hampers immediately',
      'Printable official tax invoice modal with subtotal and taxes',
      'FreshPoints redemption and referral code sharing',
      'Recharts AreaChart and PieChart visualizations in admin',
    ],
    techStack: ['Recharts Data Visualizations', 'Print Stylesheet', 'Loyalty Point Engine'],
  },
];

export default function DemoPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSlide = DEMO_SLIDES[currentSlideIndex];

  // Next Slide
  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % DEMO_SLIDES.length);
  }, []);

  // Prev Slide
  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + DEMO_SLIDES.length) % DEMO_SLIDES.length);
  }, []);

  // Keyboard Navigation: ArrowRight / ArrowLeft / Space / R
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'r' || e.key === 'R') {
        handleResetDemoData();
      } else if (e.key === 'p' || e.key === 'P') {
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Auto-play timer (8 seconds per slide)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [isPlaying, handleNext]);

  // Reset Demo Data
  const handleResetDemoData = () => {
    db.resetDatabase();
    showToast('Demo Database Reset! 30 pristine orders & 15 customers re-seeded.', 'success');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between overflow-x-hidden select-none">
      {/* Top Presentation Bar */}
      <header className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between z-30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Exit Demo to Landing Page"
          >
            <Home className="w-4 h-4" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white font-heading">
                FreshFold Client Walkthrough
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                Slide {currentSlide.stepNumber} / {DEMO_SLIDES.length}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              Use ← / → keys or Floating Controls
            </p>
          </div>
        </div>

        {/* Slide Selector Pills */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-2xl border border-slate-800">
          {DEMO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                currentSlideIndex === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {slide.stepNumber}. {slide.badge}
            </button>
          ))}
        </div>

        {/* Global Demo Actions */}
        <div className="flex items-center gap-2.5">
          {/* Reset Demo Data Button */}
          <button
            onClick={handleResetDemoData}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/50 hover:border-rose-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-rose-300 transition-all flex items-center gap-1.5"
            title="Reset database to 30 seed orders and 15 customers"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Demo Data</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Progress Bar across slides */}
      <div className="w-full h-1.5 bg-slate-900 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600"
          animate={{ width: `${((currentSlideIndex + 1) / DEMO_SLIDES.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Main Presentation Stage */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Client Pitch & Architecture Callouts */}
        <div className="lg:col-span-4 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between space-y-6 shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700">
                Phase {currentSlide.stepNumber}: {currentSlide.badge}
              </span>
              <span className="text-xs text-amber-400 font-mono">
                {isPlaying ? '▶ Auto-playing (8s)' : '❚❚ Paused'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
              {currentSlide.title}
            </h2>

            <p className="text-xs font-semibold text-cyan-400 leading-snug">
              {currentSlide.subtitle}
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="text-amber-400 font-bold block mb-1">
                💬 Client Pitch Note:
              </span>
              {currentSlide.clientPitch}
            </div>

            {/* Key Feature Checklist */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                Demonstrated Features:
              </span>
              {currentSlide.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Link to Live Page */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {currentSlide.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={currentSlide.path}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
            >
              <span>Open This Page In Full Browser</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Live Viewport Frame */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl border border-slate-800 p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Frame Top Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-slate-400 font-mono ml-2 text-[11px]">
                https://freshfold.luxury{currentSlide.path}
              </span>
            </div>

            {/* Viewport switchers */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-1.5 rounded-lg ${viewMode === 'desktop' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-1.5 rounded-lg ${viewMode === 'mobile' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Embedded Interactive Live View */}
          <div className="flex-1 my-3 flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950 border border-slate-850">
            <iframe
              key={currentSlide.id}
              src={currentSlide.previewUrl}
              title={currentSlide.title}
              className={`h-[580px] rounded-xl transition-all duration-300 border-0 ${
                viewMode === 'mobile' ? 'w-[375px] shadow-2xl border-4 border-slate-800' : 'w-full'
              }`}
            />
          </div>
        </div>
      </main>

      {/* Floating Presenter Control Dock (Bottom) */}
      <footer className="bg-slate-900/90 border-t border-slate-800 p-4 z-30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous (←)</span>
          </button>

          {/* Center Play/Pause & Slide Count */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-3 rounded-full shadow-lg transition-all ${
                isPlaying
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-105'
              }`}
              title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play (8s per slide)'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <span className="text-xs font-mono text-slate-400">
              {currentSlideIndex + 1} of {DEMO_SLIDES.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all"
          >
            <span>Next Slide (→)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
