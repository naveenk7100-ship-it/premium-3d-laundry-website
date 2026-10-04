'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shirt,
  Sparkles,
  Flame,
  Footprints,
  BedDouble,
  Zap,
  Check,
  Clock,
  ArrowUpRight,
  Shield,
} from 'lucide-react';
import { SERVICES_DATA } from '@/data/mockData';
import { useBooking } from '@/context/BookingContext';
import { ServiceItem } from '@/types';

// Map icon strings to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  Shirt: <Shirt className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Flame: <Flame className="w-6 h-6" />,
  Footprints: <Footprints className="w-6 h-6" />,
  BedDouble: <BedDouble className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
};

interface TiltCardProps {
  service: ServiceItem;
  index: number;
  onSelect: (id: string) => void;
}

function ServiceCard({ service, index, onSelect }: TiltCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="h-full relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-7 shadow-lg shadow-sky-950/5 dark:shadow-black/40 hover:shadow-2xl hover:shadow-cyan-500/15 dark:hover:border-cyan-500/50 transition-shadow duration-300 flex flex-col justify-between group overflow-hidden"
      >
        {/* Subtle hover gradient background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-cyan-400/15 to-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

        <div>
          {/* Top Row: Icon + Badge */}
          <div className="flex items-start justify-between mb-5">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 ${service.accentBg}`}
            >
              {iconMap[service.icon] || <Shirt className="w-6 h-6" />}
            </div>

            {service.badge && (
              <span className="text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300/40 shadow-xs">
                {service.badge}
              </span>
            )}
          </div>

          {/* Title & Tagline */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {service.title}
          </h3>
          <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-1">
            {service.tagline}
          </p>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            {service.description}
          </p>

          {/* Features Bullet List */}
          <div className="mt-5 space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-4">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Turnaround, Price, and Booking Button */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
              <Clock className="w-3 h-3 text-cyan-500" />
              <span>{service.turnaround}</span>
            </div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5 font-heading">
              {service.startingPrice}
            </div>
          </div>

          <button
            onClick={() => onSelect(service.id)}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 text-slate-700 dark:text-slate-200 hover:text-white transition-all duration-200 group-hover:bg-cyan-500 group-hover:text-white shadow-sm flex items-center gap-1.5 text-xs font-semibold"
          >
            <span>Book</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const { openBooking } = useBooking();

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/70 dark:bg-cyan-950/50 border border-cyan-300/40 text-cyan-800 dark:text-cyan-300 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Artisanal Wardrobe Care</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            Tailored Services For{' '}
            <span className="gradient-text-ocean">Every Thread & Fabric.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            From daily cotton tees to bespoke wedding gowns and luxury leather sneakers, every garment receives individual batch processing and daylight quality audit.
          </p>
        </div>

        {/* 6 Services Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onSelect={(id) => openBooking(id)}
            />
          ))}
        </div>

        {/* Assurance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-900 via-blue-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0">
              <Shield className="w-7 h-7 text-cyan-300" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-heading">
                The FreshFold Fabric Promise
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                If any stain can be safely lifted without compromising garment integrity, our master spotters will eliminate it. If you’re not 100% satisfied, re-wash is on the house.
              </p>
            </div>
          </div>

          <button
            onClick={() => openBooking('wash-fold')}
            className="shrink-0 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs tracking-wide uppercase transition-all shadow-md hover:scale-105"
          >
            Claim First Pickup Free
          </button>
        </motion.div>
      </div>
    </section>
  );
}
