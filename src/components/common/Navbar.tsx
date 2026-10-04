'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  PhoneCall,
  Calendar,
  Waves,
  User,
  LayoutDashboard,
  ShieldAlert,
  Truck,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useBooking } from '@/context/BookingContext';
import { useAuth } from '@/context/AuthContext';
import NotificationsBell from '@/components/common/NotificationsBell';
import { BRAND_CONFIG } from '@/config/brand.config';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { openBooking } = useBooking();
  const { currentUser, openAuthModal, isAdmin } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          setIsVisible(false);
        } else if (lastScrollY - currentScrollY > 10) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: '3D Store Tour', href: '/#tour' },
    { name: 'Services', href: '/#services' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Results', href: '/#results' },
    { name: 'Reviews', href: '/#testimonials' },
    { name: 'Track Order', href: '/track' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-md shadow-cyan-900/5 dark:shadow-black/40 border-b border-cyan-100/60 dark:border-cyan-900/30 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-300">
                <Waves className="w-5 h-5 text-white animate-pulse" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white dark:border-slate-900" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-900 via-sky-700 to-cyan-600 dark:from-white dark:via-sky-200 dark:to-cyan-400 bg-clip-text text-transparent font-heading">
                  {BRAND_CONFIG.logo.title}
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 -mt-1">
                  {BRAND_CONFIG.logo.subtext}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-slate-100/70 dark:bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-cyan-200/40 dark:border-cyan-800/40 backdrop-blur-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-full transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="px-3 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  Admin Portal
                </Link>
              )}
            </nav>

            {/* Right Action Icons & Auth */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Notification Bell */}
              <NotificationsBell />

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Dark Mode"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* User Avatar / Account Switcher Button */}
              <button
                onClick={openAuthModal}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all text-xs"
                title="Account / Switch Profile"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden border border-cyan-400 bg-slate-200 dark:bg-slate-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 max-w-[85px] truncate">
                  {currentUser?.name.split(' ')[0] || 'Account'}
                </span>
              </button>

              {/* Demo Mode Guide */}
              <Link
                href="/demo"
                className="px-3 py-2 rounded-full bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/70 dark:hover:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Guided client presentation mode"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-current" />
                <span>Demo Tour</span>
              </Link>

              {/* Book Pickup CTA */}
              <Link
                href="/book"
                className="relative group overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Pickup</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <NotificationsBell />
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-300"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-[68px] z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-cyan-100 dark:border-cyan-900/50 shadow-xl lg:hidden overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 text-xs font-bold text-amber-600 dark:text-amber-400 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/30"
                >
                  Admin Portal
                </Link>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4 text-cyan-500" />
                  <span>Switch Account / Sign In</span>
                </button>

                <Link
                  href="/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Pickup (Free Valet)</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
