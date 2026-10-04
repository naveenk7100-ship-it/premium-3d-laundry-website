'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  PackageCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBooking } from '@/context/BookingContext';
import { SERVICES_DATA } from '@/data/mockData';

export default function BookingModal() {
  const { isOpen, closeBooking, selectedService, setSelectedService } = useBooking();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pickupDate: 'Tomorrow (Morning 8am - 10am)',
    expressRush: false,
    specialNotes: '',
    perfumePreference: 'Fresh Lavender',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const currentServiceObj =
    SERVICES_DATA.find((s) => s.id === selectedService) || SERVICES_DATA[0];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit booking
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        const randomId = `FF-${Math.floor(100000 + Math.random() * 900000)}`;
        setOrderId(randomId);
        setStep(4);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#06b6d4', '#0284c7', '#facc15', '#38bdf8'],
          });
        } catch (e) {
          // ignore if canvas not supported
        }
      }, 700);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    closeBooking();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={resetAndClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-cyan-100 dark:border-cyan-900/40 overflow-hidden z-10 my-8"
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-sky-800 to-cyan-700 p-6 text-white relative">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>VIP Doorstep Valet Service</span>
          </div>

          <h3 className="text-2xl font-bold font-heading mt-1">
            {step === 4 ? 'Pickup Confirmed!' : 'Book Free Garment Pickup'}
          </h3>
          <p className="text-xs text-sky-200 mt-1">
            {step === 4
              ? 'Our driver has been dispatched to your queue'
              : 'Zero delivery fee. We supply complimentary FreshFold bags at your door.'}
          </p>

          {/* Stepper Dots (if not finished) */}
          {step < 4 && (
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step === num
                      ? 'w-8 bg-amber-400'
                      : step > num
                      ? 'w-4 bg-cyan-400'
                      : 'w-4 bg-white/30'
                  }`}
                />
              ))}
              <span className="text-[11px] font-mono text-cyan-200 ml-2">
                Step {step} of 3
              </span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Demo Mode Notice */}
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[11px] flex items-center justify-between">
            <span>ℹ️ <strong>Demo Mode:</strong> Bookings are simulated for testing.</span>
            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-400/20 font-bold">Local Demo</span>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                1. Select Primary Garment Service
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
                {SERVICES_DATA.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => setSelectedService(srv.id)}
                    type="button"
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      selectedService === srv.id
                        ? 'border-cyan-500 bg-cyan-50/70 dark:bg-cyan-950/40 ring-2 ring-cyan-400/50'
                        : 'border-slate-200 dark:border-slate-800 hover:border-cyan-300 dark:hover:border-cyan-700 bg-slate-50/50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {srv.title}
                      </span>
                      {srv.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                          {srv.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {srv.tagline}
                    </p>
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                      <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                        {srv.startingPrice}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">
                        ⏱ {srv.turnaround}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                2. Select Pickup Time & Priority
              </h4>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Select 30-Minute Convenient Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Today (Evening 6:00 PM - 7:30 PM)',
                    'Tomorrow (Morning 8:00 AM - 10:00 AM)',
                    'Tomorrow (Afternoon 1:00 PM - 3:00 PM)',
                    'Tomorrow (Evening 6:00 PM - 8:00 PM)',
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, pickupDate: slot })}
                      className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between ${
                        formData.pickupDate === slot
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 font-semibold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{slot}</span>
                      {formData.pickupDate === slot && (
                        <CheckCircle className="w-4 h-4 text-cyan-500" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Fragrance selection */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Signature Finish Fragrance
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {['Fresh Lavender', 'Ocean Breeze', '100% Fragrance Free'].map(
                      (perfume) => (
                        <button
                          key={perfume}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, perfumePreference: perfume })
                          }
                          className={`p-2.5 rounded-xl border text-center font-medium ${
                            formData.perfumePreference === perfume
                              ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 font-bold'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {perfume}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Express Rush Option */}
                <div className="mt-3 p-3.5 rounded-2xl border border-amber-300/60 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                      <span>⚡ Need it today? Express 6-Hour Rush</span>
                    </p>
                    <p className="text-[11px] text-amber-700/80 dark:text-amber-400/80 mt-0.5">
                      Guarantees doorstep return within 6 hours. (+$12.00 flat)
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.expressRush}
                    onChange={(e) =>
                      setFormData({ ...formData, expressRush: e.target.checked })
                    }
                    className="w-5 h-5 rounded text-amber-500 focus:ring-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                3. Pickup Address & Special Care Notes
              </h4>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number (for SMS Tracking)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Street Address & Apartment / Unit #
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Special Fabric Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Red wine spot on silk blouse, no starch on shirts, hang trousers"
                    value={formData.specialNotes}
                    onChange={(e) =>
                      setFormData({ ...formData, specialNotes: e.target.value })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-cyan-500"
                  />
                </div>

                {/* Guarantee badge */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/60 p-2.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>
                    <strong>$1,000 Garment Protection Guarantee</strong> & Zero-Contact Doorstep collection.
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 mx-auto flex items-center justify-center border-2 border-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                  Tracking ID: {orderId}
                </span>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-2 font-heading">
                  Your Pickup is Scheduled!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                  Our electric van driver will arrive with sanitized bags at{' '}
                  <strong className="text-slate-700 dark:text-slate-200">
                    {formData.pickupDate}
                  </strong>
                  . We will send an SMS alert 15 minutes before arrival.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-left border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {currentServiceObj.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fragrance:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formData.perfumePreference}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Fee:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    FREE (Valet Included)
                  </span>
                </div>
                {formData.expressRush && (
                  <div className="flex justify-between text-amber-600 font-semibold">
                    <span>Priority:</span>
                    <span>Express 6-Hour Rush</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                <button
                  onClick={() => {
                    const msg = encodeURIComponent(
                      `Hi FreshFold, I just booked pickup #${orderId} for ${formData.pickupDate}.`
                    );
                    window.open(`https://wa.me/15559482831?text=${msg}`, '_blank');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Track Live via WhatsApp</span>
                </button>
                <button
                  onClick={resetAndClose}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {step < 4 && (
          <div className="p-6 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 text-white font-semibold text-xs shadow-md shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>
                {isSubmitting
                  ? 'Confirming Slot...'
                  : step === 3
                  ? 'Confirm & Schedule Pickup'
                  : 'Continue'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
