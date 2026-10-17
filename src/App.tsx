import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Cursor } from './components/Cursor';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Hours } from './components/Hours';
import { Location } from './components/Location';
import { BookingCTA } from './components/BookingCTA';
import { Footer } from './components/Footer';
import { MobileBookBar } from './components/MobileBookBar';
import { BookingModal } from './components/BookingModal';
import { BackToTop } from './components/BackToTop';
import { useScrollSpy } from './hooks/useScrollSpy';
import { ServiceItem } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Check prefers-reduced-motion
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  const activeSection = useScrollSpy([
    'services',
    'about',
    'why-us',
    'gallery',
    'hours',
    'location',
  ]);

  const handleOpenBooking = (service?: ServiceItem) => {
    setSelectedService(service || null);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#1A1A1A] selection:bg-[#B8572B]/20 selection:text-[#1A1A1A] bg-grain overflow-x-hidden font-body">
      {/* Award-Winning Preloader */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Contextual Custom Cursor (Desktop pointer only) */}
      <Cursor />

      {/* Primary Floating Morphing Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* Section 01: About & Huddersfield Heritage */}
        <About />

        {/* Section 02: Menu & Treatments */}
        <Services onSelectService={(service) => handleOpenBooking(service)} />

        {/* Section 03: Why Choose Us (Bento Grid) */}
        <WhyUs />

        {/* Section 04: Visual Showcase Marquee & Lightbox */}
        <Gallery />

        {/* Section 05: Verified Reviews & 4.9 Rating */}
        <Reviews />

        {/* Section 06: Weekly Opening Hours */}
        <Hours />

        {/* Section 07: Location, Directions, and Map */}
        <Location />

        {/* Final Conversion Band */}
        <BookingCTA onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Action Bar (<768px) */}
      <MobileBookBar onOpenBooking={() => handleOpenBooking()} />

      {/* Back to Top Floating Button */}
      <BackToTop />

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        selectedService={selectedService}
      />
    </div>
  );
}
