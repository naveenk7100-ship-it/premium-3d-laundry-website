'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles } from 'lucide-react';

import { BRAND_CONFIG } from '@/config/brand.config';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleWhatsAppClick = () => {
    window.open(BRAND_CONFIG.contact.whatsappLink, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip greeting */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-3 max-w-xs bg-white dark:bg-slate-900 border border-emerald-500/30 rounded-2xl p-3 shadow-xl shadow-emerald-950/10 dark:shadow-black/50 text-slate-800 dark:text-slate-100 text-xs relative flex items-start gap-2.5"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mt-1 shrink-0" />
            <div className="flex-1 pr-4">
              <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                Chat on WhatsApp
              </p>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                Instant quotes & pickup tracking in under 2 minutes!
              </p>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleWhatsAppClick}
        aria-label="Chat on WhatsApp"
        className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center shadow-xl shadow-emerald-600/30 border-2 border-white dark:border-slate-800 focus:outline-none"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 text-[9px] font-bold text-slate-900 items-center justify-center">
            1
          </span>
        </span>
        <MessageCircle className="w-7 h-7 fill-white/10" />
      </motion.button>
    </div>
  );
}
