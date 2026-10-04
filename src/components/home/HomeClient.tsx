'use client';

import React, { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import PageLoader from '@/components/common/PageLoader';
import CustomCursor from '@/components/common/CustomCursor';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import BookingModal from '@/components/common/BookingModal';
import AuthModal from '@/components/common/AuthModal';
import Footer from '@/components/common/Footer';

import CinematicStore3D from '@/components/3d/CinematicStore3D';
import HeroOverlay from '@/components/sections/HeroOverlay';
import ServicesSection from '@/components/sections/ServicesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import PricingSection from '@/components/sections/PricingSection';
import BeforeAfterSection from '@/components/sections/BeforeAfterSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FaqSection from '@/components/sections/FaqSection';
import { useBooking } from '@/context/BookingContext';

export default function HomeClient() {
  const { openBooking } = useBooking();
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackHeight = trackRef.current.scrollHeight - window.innerHeight;
      if (trackHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / trackHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExplore = () => {
    if (!trackRef.current) return;
    const trackHeight = trackRef.current.scrollHeight - window.innerHeight;
    const targetScroll = trackHeight * 0.15; // move past storefront through the doors
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // Hero overlay opacity: visible at start, fades smoothly as camera enters shop
  const heroOpacity = Math.max(0, 1 - scrollProgress * 7);
  const heroPointerEvents = heroOpacity > 0.05 ? 'auto' : 'none';

  return (
    <main className="relative min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950">
      {/* Preloader */}
      <PageLoader />

      {/* Interactive Cursor Effect */}
      <CustomCursor />

      {/* Sticky Header */}
      <Navbar />

      {/* 3D Walkthrough Scroll Track (500vh for smooth scroll choreography) */}
      <div id="tour" ref={trackRef} className="relative h-[550vh] w-full">
        {/* Sticky 3D WebGL Canvas & Floating HUD */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <CinematicStore3D
            scrollProgress={scrollProgress}
            onOpenBooking={openBooking}
            onSceneChange={(idx) => setActiveScene(idx)}
          />

          {/* Hero Section Overlay (fades out as you move inside) */}
          <div
            className="absolute inset-0 z-20 transition-opacity duration-300 pointer-events-none"
            style={{
              opacity: heroOpacity,
              pointerEvents: heroPointerEvents as 'auto' | 'none',
            }}
          >
            <HeroOverlay onExplore={handleExplore} />
          </div>
        </div>
      </div>

      {/* Continuation of Website Sections */}
      <div className="relative z-20 bg-slate-950">
        {/* Services Section with 3D Tilt Cards */}
        <ServicesSection />

        {/* How It Works 5-Stage Timeline (Pickup -> Wash -> Dry -> Fold -> Deliver) */}
        <HowItWorksSection />

        {/* Interactive Pricing Estimator & Per-Kg Plans */}
        <PricingSection />

        {/* Before / After Draggable Stain Comparison Slider */}
        <BeforeAfterSection />

        {/* Customer Testimonials Carousel & Press */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Footer with Store Locations & Live Concierge */}
        <Footer />
      </div>

      {/* Floating Interactive WhatsApp Widget */}
      <WhatsAppButton />

      {/* Interactive Pickup Valet Booking Wizard Modal */}
      <BookingModal />

      {/* Auth / Profile Modal */}
      <AuthModal />
    </main>
  );
}
