'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle, Phone } from 'lucide-react';
import { FAQS_DATA } from '@/data/mockData';

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS_DATA[0].id);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'Service & Pickup' },
    { id: 'eco', label: 'Eco & Chemical-Free' },
    { id: 'pricing', label: 'Pricing & Express' },
    { id: 'process', label: 'Garment Guarantee' },
  ];

  const filteredFaqs =
    activeCategory === 'all'
      ? FAQS_DATA
      : FAQS_DATA.filter((f) => f.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/30 border-t border-cyan-100/40 dark:border-cyan-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/70 dark:bg-cyan-950/50 border border-cyan-300/40 text-cyan-800 dark:text-cyan-300 text-xs font-bold tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Got Questions? We’ve Got Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            Frequently Asked{' '}
            <span className="gradient-text-ocean">Questions.</span>
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            Learn more about our strict zero-mixing policy, pickup convenience, and garment replacement guarantee.
          </p>

          {/* Category Tabs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <span className="font-heading">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-slate-400"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-3xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
              Have a special fabric inquiry?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Chat with our head textile concierge in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/15559482831"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge</span>
            </a>
            <a
              href="tel:+15559482831"
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-cyan-500" />
              <span>(555) 948-2831</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
