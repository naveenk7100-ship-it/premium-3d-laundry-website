'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Sparkles,
  Calculator,
  Plus,
  Minus,
  Calendar,
  Scale,
  Shirt,
  Scissors,
  BedDouble,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { PRICING_ITEMS_DATA, PRICING_PLANS_KG } from '@/data/mockData';
import { useBooking } from '@/context/BookingContext';
import { audioEngine } from '@/utils/audioEngine';

const itemIcons: Record<string, React.ReactNode> = {
  Shirt: <Shirt className="w-5 h-5 text-cyan-400" />,
  Scissors: <Scissors className="w-5 h-5 text-blue-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-amber-400" />,
  BedDouble: <BedDouble className="w-5 h-5 text-emerald-400" />,
  Layers: <Layers className="w-5 h-5 text-indigo-400" />,
};

export default function PricingSection() {
  const { openBooking, setSelectedService } = useBooking();
  const [pricingMode, setPricingMode] = useState<'estimator' | 'kg'>('estimator');

  // Quantities for the 6 exact items requested:
  // Shirts, Pants, T-shirts, Dresses, Bedsheets, Blankets
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'item-shirt': 3,
    'item-pants': 2,
    'item-tshirt': 4,
    'item-dress': 1,
    'item-bedsheets': 1,
    'item-blankets': 0,
  });

  const [serviceSpeed, setServiceSpeed] = useState<'standard' | 'express'>('standard');

  const updateQuantity = (id: string, delta: number) => {
    audioEngine.playClick();
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const resetQuantities = () => {
    audioEngine.playClick();
    setQuantities({
      'item-shirt': 0,
      'item-pants': 0,
      'item-tshirt': 0,
      'item-dress': 0,
      'item-bedsheets': 0,
      'item-blankets': 0,
    });
  };

  // Base subtotal calculation
  const rawSubtotal = PRICING_ITEMS_DATA.reduce((sum, item) => {
    const qty = quantities[item.id] || 0;
    return sum + qty * item.pricePerUnit;
  }, 0);

  // Speed multiplier
  const speedMultiplier = serviceSpeed === 'express' ? 1.3 : 1.0;
  const calculatedTotal = (rawSubtotal * speedMultiplier).toFixed(2);
  const totalItemsCount = Object.values(quantities).reduce((a, b) => a + b, 0);

  // Estimated weight (approx 0.35kg per item avg)
  const estimatedWeightKg = (totalItemsCount * 0.38).toFixed(1);

  const handleBookEstimate = () => {
    audioEngine.playClick();
    audioEngine.playChime(660);
    setSelectedService(serviceSpeed === 'express' ? 'express-laundry' : 'wash-fold');
    openBooking();
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-slate-950 text-white">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Honest & Transparent Rates</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
            Interactive <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Laundry Estimator</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Select your garments below to dynamically calculate your exact laundry cost with zero hidden fees.
          </p>

          {/* Pricing Mode Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex p-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-inner">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  setPricingMode('estimator');
                }}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                  pricingMode === 'estimator'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>Interactive Estimator</span>
              </button>

              <button
                onClick={() => {
                  audioEngine.playClick();
                  setPricingMode('kg');
                }}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                  pricingMode === 'kg'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>Per-Kg Everyday Plans</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Interactive Garment Estimator */}
        {pricingMode === 'estimator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: 6 Garment Cards */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                  Select Garment Quantities
                </span>
                <button
                  onClick={resetQuantities}
                  className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
                >
                  Reset all
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {PRICING_ITEMS_DATA.map((item) => {
                  const qty = quantities[item.id] || 0;
                  const itemTotal = (qty * item.pricePerUnit).toFixed(2);

                  return (
                    <div
                      key={item.id}
                      className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                        qty > 0
                          ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700">
                          {itemIcons[item.icon] || <Shirt className="w-5 h-5 text-cyan-400" />}
                        </div>
                        <span className="text-xs font-mono font-bold text-cyan-300">
                          ${item.pricePerUnit.toFixed(2)} / {item.unitLabel}
                        </span>
                      </div>

                      <div className="my-4">
                        <h4 className="text-base font-bold text-white font-heading">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {item.category}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={qty === 0}
                          className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-white flex items-center justify-center transition-colors"
                          aria-label={`Decrease ${item.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex flex-col items-center">
                          <span className="text-lg font-bold font-mono text-white">
                            {qty}
                          </span>
                          <span className="text-[10px] text-cyan-400 font-mono">
                            ${itemTotal}
                          </span>
                        </div>

                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center justify-center transition-colors shadow-md shadow-cyan-500/30"
                          aria-label={`Increase ${item.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Service Speed Toggle */}
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Turnaround Service Speed
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Standard organic wash (24h) or Priority Express valet (4-6h rush).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      audioEngine.playClick();
                      setServiceSpeed('standard');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      serviceSpeed === 'standard'
                        ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Standard 24h
                  </button>
                  <button
                    onClick={() => {
                      audioEngine.playClick();
                      setServiceSpeed('express');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      serviceSpeed === 'express'
                        ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Express 4h (+30%)
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Live Calculation Summary Card */}
            <div className="lg:col-span-4 sticky top-28">
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 border border-cyan-500/40 p-6 sm:p-7 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold font-heading text-white">
                    Estimated Total
                  </h3>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                    Live Calculation
                  </span>
                </div>

                {/* Subtotal Big Display */}
                <div>
                  <div className="text-4xl sm:text-5xl font-black font-heading text-white">
                    ${calculatedTotal}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    {totalItemsCount} items selected • Approx {estimatedWeightKg} kg
                  </p>
                </div>

                {/* Itemized Breakdown List */}
                <div className="space-y-2 border-t border-slate-800 pt-4 max-h-52 overflow-y-auto pr-1">
                  {PRICING_ITEMS_DATA.map((item) => {
                    const qty = quantities[item.id] || 0;
                    if (qty === 0) return null;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-xs text-slate-300"
                      >
                        <span>
                          {qty}x {item.name}
                        </span>
                        <span className="font-mono font-semibold text-white">
                          ${(qty * item.pricePerUnit).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}

                  {totalItemsCount === 0 && (
                    <p className="text-xs text-slate-500 italic text-center py-4">
                      No garments selected yet. Use the + buttons to add items!
                    </p>
                  )}
                </div>

                {/* Service Speed Addon */}
                {serviceSpeed === 'express' && (
                  <div className="flex items-center justify-between text-xs text-amber-300 pt-2 border-t border-slate-800">
                    <span>Priority 4-Hour Express Surge (+30%)</span>
                    <span className="font-mono">
                      +${(rawSubtotal * 0.3).toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Perks Checklist */}
                <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Free Doorstep Pickup & Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Hypoallergenic Organic Bio-Wash</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Zero Missing Sock Guarantee</span>
                  </div>
                </div>

                {/* Book Action Button */}
                <button
                  onClick={handleBookEstimate}
                  disabled={totalItemsCount === 0}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:hover:from-cyan-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Pickup With This Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* View Mode 2: Per-Kg Everyday Bags */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_PLANS_KG.map((plan) => (
              <div
                key={plan.id}
                className={`p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-slate-900 border-cyan-400/60 shadow-2xl shadow-cyan-500/20 ring-2 ring-cyan-500/30'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {plan.popular && (
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-mono text-[10px] font-black uppercase tracking-wider mb-4">
                      Most Popular
                    </span>
                  )}

                  <h3 className="text-xl font-bold font-heading text-white">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.subtitle}</p>

                  <div className="mt-5 mb-6">
                    <span className="text-4xl font-black font-heading text-white">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400 ml-2 font-mono">
                      {plan.unit}
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-slate-800">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    audioEngine.playClick();
                    setSelectedService('wash-fold');
                    openBooking();
                  }}
                  className="mt-8 w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Select Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
