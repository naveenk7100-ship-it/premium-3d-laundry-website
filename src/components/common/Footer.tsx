'use client';

import React, { useState } from 'react';
import {
  Waves,
  MapPin,
  Clock,
  Phone,
  Mail,
  Send,
  Sparkles,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { STORE_LOCATIONS } from '@/data/mockData';
import { useBooking } from '@/context/BookingContext';
import { BRAND_CONFIG } from '@/config/brand.config';

export default function Footer() {
  const { openBooking } = useBooking();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const activeLoc = STORE_LOCATIONS[activeLocationIndex];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-12 border-t border-cyan-900/40 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Top CTA Banner */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-sky-900 via-blue-950 to-slate-900 border border-cyan-500/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
              ⚡ Complimentary Valet Doorstep Collection
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Ready to Upgrade Your Laundry Experience?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Get $10 off your first pickup. Eco-friendly organic solvent wash, precision Italian steam press, delivered in 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => openBooking()}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 cursor-pointer"
            >
              Book Pickup Now
            </button>
            <a
              href={BRAND_CONFIG.contact.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Store Locations & Stylized Interactive Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Drop-Off Ateliers & Valet Hubs</span>
            </div>

            <h4 className="text-xl font-bold text-white font-heading">
              Visit Our Metro Boutiques
            </h4>

            <p className="text-xs text-slate-400">
              Prefer dropping off in person? Visit our storefronts with 24/7 automated smart lockers or relax in our espresso reception lounge.
            </p>

            {/* Location Selector Tabs */}
            <div className="space-y-3 pt-2">
              {STORE_LOCATIONS.map((loc, idx) => (
                <div
                  key={loc.name}
                  onClick={() => setActiveLocationIndex(idx)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                    activeLocationIndex === idx
                      ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/50'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-bold text-slate-200">
                      {loc.name}
                    </h5>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {loc.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-1 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{loc.hours}</span>
                    </span>
                    <span className="font-mono text-cyan-300">{loc.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Stylized Map View */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            {/* Visual Vector Map Graphic */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:20px_20px]" />

            {/* Stylized Map Canvas Simulation */}
            <div className="relative z-10 w-full h-64 sm:h-72 rounded-2xl bg-slate-950/80 border border-cyan-500/20 p-6 flex flex-col justify-between overflow-hidden">
              {/* Map roads/grids simulation */}
              <svg className="absolute inset-0 w-full h-full opacity-30 stroke-cyan-500/30 stroke-[1.5]" fill="none">
                <path d="M0 60 Q 150 120 300 80 T 600 180" />
                <path d="M100 0 L 220 300" />
                <path d="M350 0 L 400 300" />
                <circle cx="220" cy="110" r="40" strokeDasharray="4 4" />
                <circle cx="450" cy="160" r="50" strokeDasharray="4 4" />
              </svg>

              {/* Pin 1: Downtown Flagship */}
              <div
                className={`absolute top-20 left-1/4 transition-transform duration-300 ${
                  activeLocationIndex === 0 ? 'scale-125 z-20' : 'scale-90 opacity-70'
                }`}
              >
                <div className="relative flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-cyan-500/50 animate-bounce">
                    <MapPin className="w-4 h-4 fill-current" />
                  </div>
                  <div className="bg-slate-900/90 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border border-cyan-400 text-cyan-300 mt-1 whitespace-nowrap shadow-md">
                    Flagship Atelier
                  </div>
                </div>
              </div>

              {/* Pin 2: Uptown Boutique */}
              <div
                className={`absolute bottom-16 right-1/3 transition-transform duration-300 ${
                  activeLocationIndex === 1 ? 'scale-125 z-20' : 'scale-90 opacity-70'
                }`}
              >
                <div className="relative flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-400/50 animate-bounce">
                    <MapPin className="w-4 h-4 fill-current" />
                  </div>
                  <div className="bg-slate-900/90 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border border-amber-400 text-amber-300 mt-1 whitespace-nowrap shadow-md">
                    Uptown Boutique
                  </div>
                </div>
              </div>

              {/* Map Footer badge */}
              <div className="relative z-10 flex justify-between items-center mt-auto bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-300 font-mono text-[11px]">
                  Showing: <strong className="text-cyan-400">{activeLoc.name}</strong>
                </span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(activeLoc.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px]"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Quick Valet Coverage info */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Free doorstep pickup covers 25km metro radius</span>
              </span>
              <span className="text-cyan-400 font-mono">100% Electric Courier Fleet</span>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-8 border-t border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Waves className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white font-heading">
                FreshFold
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier eco-conscious garment atelier and dry-cleaning service. Combining ozone hydro sanitization, certified organic fluids, and bespoke hand pressing.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-200 mb-2">
                Subscribe for laundry care tips & exclusive promotions
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-cyan-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 mt-1.5 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Subscribed! Check your inbox for your $10 voucher.</span>
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Services
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Wash & Fold
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Organic Dry Cleaning
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Steam Press & Iron
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Sneaker & Shoe Spa
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Curtains & Bedding
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Express 6-Hour Rush
                </a>
              </li>
            </ul>
          </div>

          {/* Experience Links */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Experience
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#tour" className="hover:text-cyan-400 transition-colors">
                  Virtual Clean Atelier Tour
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-cyan-400 transition-colors">
                  Pricing & Calculator
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-cyan-400 transition-colors">
                  Stain Restoration Results
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-cyan-400 transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Concierge
            </h5>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{BRAND_CONFIG.contact.phoneFormatted}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{BRAND_CONFIG.contact.conciergeEmail}</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.hours.weekdays}</span>
              </p>
              <div className="pt-2">
                <a
                  href={BRAND_CONFIG.contact.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold hover:bg-emerald-600/50 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp 24/7 Support</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.businessName}. All rights reserved. Zero-PERC Certified.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Garment Terms of Care</span>
            <span className="hover:text-slate-400 cursor-pointer">Eco Accreditation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
