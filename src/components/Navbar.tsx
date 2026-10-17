import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Phone, Calendar, Clock, MapPin } from 'lucide-react';
import { businessData } from '../data/business';
import { useBusinessHours } from '../hooks/useBusinessHours';

interface NavbarProps {
  onOpenBooking: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const status = useBusinessHours();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      // Morph into floating pill after 40px scroll
      setIsScrolled(window.scrollY >= 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Services', href: '#services', number: '01' },
    { label: 'About', href: '#about', number: '02' },
    { label: 'Why Us', href: '#why-us', number: '03' },
    { label: 'Gallery', href: '#gallery', number: '04' },
    { label: 'Hours', href: '#hours', number: '05' },
    { label: 'Location', href: '#location', number: '06' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -90; // Offset for floating pill navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Outer fixed container: ALWAYS fixed & visible at top, never hidden on scroll */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center w-full transition-all duration-300 ${
          isScrolled
            ? 'pt-4 px-4 sm:px-6'
            : 'pt-6 px-6 sm:px-8'
        }`}
        style={{
          paddingTop: isScrolled
            ? 'max(16px, env(safe-area-inset-top, 16px))'
            : 'max(24px, env(safe-area-inset-top, 24px))',
        }}
      >
        {/* Floating Morphing Pill Header */}
        <motion.header
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`pointer-events-auto relative overflow-hidden transition-all duration-300 ${
            isScrolled
              ? 'w-full max-w-[900px] rounded-full bg-[#FAF7F2]/75 backdrop-blur-[16px] backdrop-saturate-180 border border-[#E8E0D2] shadow-[0_10px_35px_rgba(26,26,26,0.08)] px-5 sm:px-6 py-2.5'
              : 'w-full max-w-7xl bg-transparent border-transparent px-2 sm:px-4 py-2 shadow-none'
          }`}
        >
          {/* Thin 2px gradient scroll-progress bar along bottom edge of pill */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-signature-gradient origin-left"
            style={{ scaleX }}
          />

          <div className="flex items-center justify-between gap-4 sm:gap-6 lg:gap-8">
            {/* Logo Left + Pulsing Status Dot with Tooltip */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <a
                href="#"
                className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-[#1A1A1A] hover:text-[#B8572B] transition-colors whitespace-nowrap"
              >
                <span>Adel Barber</span>
              </a>

              {/* Status Dot with Tooltip */}
              <div
                className="relative flex items-center"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full cursor-help ${
                    status.isOpen
                      ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse'
                      : 'bg-stone-400'
                  }`}
                  aria-label={status.statusBadgeText}
                />

                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute top-6 left-0 z-50 px-3 py-1.5 rounded-lg bg-[#1A1A1A] text-white text-[11px] whitespace-nowrap shadow-lg font-medium pointer-events-none"
                    >
                      {status.statusBadgeText}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Links Centre with sliding layoutId pill & text roll-up */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-medium text-[#57534E]">
              {navLinks.map((link) => {
                const id = link.href.replace('#', '');
                const isActive = activeSection === id;

                return (
                  <button
                    key={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="relative px-3 lg:px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors whitespace-nowrap group cursor-pointer"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 rounded-full bg-[#1A1A1A] shadow-xs"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Roll-up hover text effect */}
                    <span
                      className={`relative z-10 block h-4 overflow-hidden ${
                        isActive ? 'text-white' : 'text-[#57534E] group-hover:text-[#1A1A1A]'
                      }`}
                    >
                      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                        {link.label}
                      </span>
                      <span className="block absolute top-full left-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full text-[#B8572B]">
                        {link.label}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* "Book Now" CTA Right with arrow animation + Mobile Hamburger */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenBooking}
                className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-signature-gradient text-white font-display font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-97 group cursor-pointer"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Animated Two-Line Hamburger Morphing into X */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                className="md:hidden w-10 h-10 rounded-full bg-white/80 border border-[#E8E0D2] flex flex-col items-center justify-center gap-1.5 p-2 shadow-xs cursor-pointer"
              >
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-5 h-0.5 bg-[#1A1A1A] block origin-center"
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-5 h-0.5 bg-[#1A1A1A] block origin-center"
                />
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Full-Screen Circle Expanding Overlay Menu for Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-[#FAF7F2] flex flex-col justify-between p-6 sm:p-10 md:hidden overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between border-b border-[#E8E0D2] pb-4">
              <span className="text-xl font-extrabold font-display text-[#1A1A1A]">
                Adel Barber
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white border border-[#E8E0D2] flex items-center justify-center font-bold text-sm text-[#1A1A1A] cursor-pointer"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Giant Staggered Masked Nav Links (Clash Display clamp 2.5-4rem) */}
            <div className="py-8 space-y-4">
              {navLinks.map((link, idx) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + idx * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-left w-full flex items-baseline justify-between py-2 group cursor-pointer"
                    >
                      <span className="text-4xl sm:text-5xl font-extrabold font-display text-[#1A1A1A] group-hover:text-[#B8572B] transition-colors tracking-tight">
                        {link.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#B8572B]">
                        {link.number}
                      </span>
                    </button>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Bottom Meta & Actions */}
            <div className="pt-6 border-t border-[#E8E0D2] space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#57534E]">
                <Clock className="w-3.5 h-3.5 text-[#B8572B]" />
                <span>{status.statusBadgeText}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#57534E]">
                <MapPin className="w-3.5 h-3.5 text-[#1F4E5A]" />
                <span>17 Cloth Hall St, Huddersfield, HD1 2DX</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={businessData.phone.telHref}
                  className="py-3 px-4 rounded-xl bg-white border border-[#E8E0D2] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#B8572B]" />
                  <span>Call Shop</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="py-3 px-4 rounded-xl bg-signature-gradient text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#E9C46A]" />
                  <span>Book Online</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
