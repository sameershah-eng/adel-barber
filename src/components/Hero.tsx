import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import { Phone, Calendar, ArrowUpRight, Star, Clock, Sparkles } from 'lucide-react';
import { businessData, PHONE_NUMBER } from '../data/business';
import { useBusinessHours } from '../hooks/useBusinessHours';
import { VelocityMarquee } from '../lib/motion';
import { SmartImage } from './SmartImage';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLElement>(null);
  const status = useBusinessHours();

  // Scroll parallax & stack effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3]);
  const secondaryImageParallax = useTransform(scrollYProgress, [0, 1], [0, -25]);

  // Desktop 3D Card Tilt on Mouse Move
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 20 });

  useEffect(() => {
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cardX = e.clientX - (rect.left + rect.width / 2);
      const cardY = e.clientY - (rect.top + rect.height / 2);

      rotateX.set((-cardY / (rect.height / 2)) * 5);
      rotateY.set((cardX / (rect.width / 2)) * 5);
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [rotateX, rotateY]);

  const [badgeHovered, setBadgeHovered] = useState(false);

  return (
    <motion.section
      ref={containerRef}
      style={{ scale: heroScale, opacity: heroOpacity }}
      className="relative min-h-[100svh] pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col justify-between overflow-hidden bg-[#FAF7F2] bg-grid-faint"
    >
      {/* Drifting Ambient Gradient Orbs (pointer-events-none, strictly background) */}
      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, -18, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-36 w-[34rem] h-[34rem] bg-[#B8572B]/10 rounded-full blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <motion.div
        animate={{
          x: [0, -35, 0],
          y: [0, 25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 right-0 w-[36rem] h-[36rem] bg-[#E9C46A]/14 rounded-full blur-[110px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Headlines & Editorial Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Live Status Pill & Address Eyebrow */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E8E0D2] shadow-xs text-xs font-medium text-[#1A1A1A]">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'
                  }`}
                />
                <span className="font-bold">{status.statusBadgeText}</span>
              </div>

              <div className="eyebrow-label text-[#B8572B]">
                17 Cloth Hall St · Huddersfield
              </div>
            </div>

            {/* Giant Masked Headline */}
            <div className="space-y-1">
              {/* Line 1: "Sharp cuts." */}
              <div className="overflow-hidden pb-1">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="hero-headline font-extrabold font-display text-[#1A1A1A] tracking-tight block"
                >
                  Sharp cuts.
                </motion.h1>
              </div>

              {/* Line 2: "No shortcuts." with "No" in Instrument Serif italic carrying signature gradient */}
              <div className="overflow-hidden pb-2">
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="hero-headline font-extrabold font-display text-[#1A1A1A] tracking-tight flex items-baseline gap-2 sm:gap-4 flex-wrap"
                >
                  <span className="font-serif italic font-normal text-signature-gradient pr-1">
                    No
                  </span>
                  <span>shortcuts.</span>
                </motion.div>
              </div>
            </div>

            {/* Sub-line */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-[#57534E] max-w-xl font-normal leading-relaxed"
            >
              Precision fades, beard work and hot towel shaves in the heart of Huddersfield. Every hair type, done properly.
            </motion.p>

            {/* Two Clean CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <a
                href={businessData.phone.telHref}
                className="px-7 py-4 rounded-full bg-signature-gradient text-white font-display font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all active:scale-97 flex items-center gap-2.5 cursor-pointer group"
              >
                <Phone className="w-4 h-4 text-[#E9C46A]" />
                <span>Call to Book</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="px-7 py-4 rounded-full bg-white/95 backdrop-blur-md border border-[#E8E0D2] text-[#1A1A1A] font-display font-bold text-xs uppercase tracking-wider hover:border-[#B8572B] hover:text-[#B8572B] transition-all active:scale-97 flex items-center gap-2.5 shadow-xs group cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#B8572B]" />
                <span>Book Online</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#57534E] group-hover:text-[#B8572B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: 3D Tilt Visual Stage (5 cols) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <motion.div
              ref={cardRef}
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-md sm:max-w-lg lg:max-w-none"
            >
              {/* Main Tall Portrait Image with Bulletproof SmartImage */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8E0D2] bg-[#FAF7F2] aspect-[4/5]">
                <SmartImage
                  src={businessData.images.hero.src}
                  fallbackSrc={businessData.images.hero.fallbackUrl}
                  alt={businessData.images.hero.alt}
                  priority={true}
                  aspectRatio="4/5"
                  className="w-full h-full object-cover"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/85 via-black/10 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                  <span className="eyebrow-label text-[#E9C46A]">
                    Master Barbers
                  </span>
                  <div className="text-xl font-bold font-display text-white mt-1">
                    Adel Barber Studio
                  </div>
                  <div className="text-xs text-white/70">
                    Cloth Hall Street · Huddersfield Town Centre
                  </div>
                </div>
              </div>

              {/* Overlapping Secondary Floating Image Card */}
              <motion.div
                style={{ y: secondaryImageParallax }}
                className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-44 sm:w-56 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white hidden sm:block z-10"
              >
                <SmartImage
                  src={businessData.images.heroSecondary.src}
                  fallbackSrc={businessData.images.heroSecondary.fallbackUrl}
                  alt={businessData.images.heroSecondary.alt}
                  aspectRatio="4/3"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* ROTATING CIRCULAR BADGE */}
              <div
                onClick={onOpenBooking}
                onMouseEnter={() => setBadgeHovered(true)}
                onMouseLeave={() => setBadgeHovered(false)}
                className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/95 backdrop-blur-md shadow-2xl border border-[#E8E0D2] flex items-center justify-center cursor-pointer group z-20"
              >
                <motion.svg
                  viewBox="0 0 100 100"
                  className="w-full h-full absolute inset-0 text-[#1A1A1A]"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: badgeHovered ? 4 : 12,
                    ease: 'linear',
                  }}
                >
                  <path
                    id="badgeCirclePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[7.2px] uppercase font-display font-bold tracking-[0.22em] fill-current">
                    <textPath href="#badgeCirclePath" startOffset="0%">
                      BOOK YOUR CHAIR • ADEL BARBER • HUDDERSFIELD •
                    </textPath>
                  </text>
                </motion.svg>

                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] group-hover:bg-[#B8572B] text-white flex items-center justify-center transition-colors shadow-xs">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:scale-110" />
                </div>
              </div>

              {/* Floating Glass Chips around image */}
              <div className="absolute top-1/4 -left-4 sm:-left-8 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E8E0D2] shadow-lg text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 z-20">
                <Star className="w-3.5 h-3.5 text-[#D98A3D] fill-current" />
                <span>4.9 Rated (120+)</span>
              </div>

              <div className="absolute top-1/2 -right-4 sm:-right-6 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E8E0D2] shadow-lg text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 z-20">
                <Sparkles className="w-3.5 h-3.5 text-[#B8572B]" />
                <span>All Hair Types</span>
              </div>

              <div className="absolute bottom-16 right-4 px-3.5 py-1.5 rounded-full bg-[#1F4E5A] text-white shadow-lg text-xs font-bold flex items-center gap-1.5 z-20">
                <Clock className="w-3.5 h-3.5 text-[#E9C46A]" />
                <span>Open 7 Days</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Hero Elements: Scroll Indicator & Infinite Rotated Marquee Ribbon */}
      <div className="mt-8 space-y-4 relative z-10">
        <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#57534E]/70">
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-0.5 h-4 bg-[#B8572B]"
          />
        </div>

        <div className="-rotate-2 w-[104%] -ml-[2%] overflow-hidden py-3 bg-[#1A1A1A] text-[#FAF7F2] border-y border-[#B8572B]/40 shadow-xl">
          <VelocityMarquee baseVelocity={1.5}>
            <span className="flex items-center gap-6 text-sm sm:text-base font-extrabold font-display tracking-wider uppercase px-4 select-none">
              <span>Fades</span>
              <span className="text-[#E9C46A]">✦</span>
              <span>Beard Trims</span>
              <span className="text-[#B8572B]">✦</span>
              <span>Hot Towel Shaves</span>
              <span className="text-[#E9C46A]">✦</span>
              <span>Head Shaves</span>
              <span className="text-[#B8572B]">✦</span>
              <span>African & Textured Hair</span>
              <span className="text-[#E9C46A]">✦</span>
              <span>Huddersfield Precision</span>
              <span className="text-[#B8572B]">✦</span>
            </span>
          </VelocityMarquee>
        </div>
      </div>
    </motion.section>
  );
};
