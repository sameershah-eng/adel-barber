import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  Variants,
} from 'framer-motion';

// ============================================================================
// MOTION TOKENS & CURVES
// ============================================================================
export const easings = {
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  easeInOutQuart: [0.76, 0, 0.24, 1] as const,
  editorial: [0.22, 1, 0.36, 1] as const,
  gentleSpring: { stiffness: 180, damping: 24, mass: 0.6 },
  bouncySpring: { stiffness: 300, damping: 20 },
};

export const durations = {
  fast: 0.3,
  base: 0.6,
  slow: 1.1,
};

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================
export const maskRevealVariants: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number = 0) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: durations.slow,
      ease: easings.editorial,
      delay: i * 0.12,
    },
  }),
};

export const clipRevealVariants: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: {
      duration: durations.slow,
      ease: easings.editorial,
    },
  },
};

export const fadeUpVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: durations.base,
      ease: easings.easeOutExpo,
      delay: i * 0.08,
    },
  }),
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const scaleInVariants: Variants = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: durations.base,
      ease: easings.easeOutExpo,
    },
  },
};

// ============================================================================
// COMPONENT: <SplitText>
// Splits a headline into words/lines, each masked with overflow-hidden and staggered
// ============================================================================
interface SplitTextProps {
  children: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  highlightWords?: Record<string, string>; // word -> className for italic/gradient
}

export const SplitText: React.FC<SplitTextProps> = ({
  children,
  className = '',
  wordClassName = '',
  delay = 0,
  highlightWords = {},
}) => {
  const words = children.split(' ');

  return (
    <span className={`inline-block text-balance ${className}`}>
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
        const customStyle = highlightWords[cleanWord] || highlightWords[word] || '';

        return (
          <span
            key={`${word}-${idx}`}
            className="inline-block overflow-hidden align-top mr-[0.26em] last:mr-0 pb-[0.06em]"
          >
            <motion.span
              custom={idx + delay}
              variants={maskRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className={`inline-block ${wordClassName} ${customStyle}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

// ============================================================================
// COMPONENT: <Reveal>
// General scroll reveal with mask or fadeUp
// ============================================================================
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  type?: 'mask' | 'fadeUp' | 'clip' | 'scale';
  delay?: number;
  duration?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  type = 'fadeUp',
  delay = 0,
}) => {
  let selectedVariants = fadeUpVariants;
  if (type === 'clip') selectedVariants = clipRevealVariants;
  if (type === 'scale') selectedVariants = scaleInVariants;

  return (
    <motion.div
      variants={selectedVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// COMPONENT: <Magnetic>
// Pulls child gently toward pointer on desktop (max 12px)
// ============================================================================
interface MagneticProps {
  children: React.ReactElement;
  strength?: number; // max offset in px, default 10
  className?: string;
  magneticRadius?: number;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 10,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.2 });

  useEffect(() => {
    // Only enabled on pointer: fine
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < rect.width * 1.2) {
        x.set((distX / rect.width) * strength);
        y.set((distY / rect.height) * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
      data-magnetic="true"
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// COMPONENT: <ParallaxImage>
// Scroll-driven parallax with image inner scale
// ============================================================================
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  speed?: number; // e.g. -40 to 40
  loading?: 'lazy' | 'eager';
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  speed = 30,
  loading = 'lazy',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.05, 1.12]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        style={{ y, scale }}
        className={`w-full h-full object-cover transition-transform will-change-transform ${imageClassName}`}
      />
    </div>
  );
};

// ============================================================================
// COMPONENT: <Marquee>
// High-performance smooth marquee that reacts to scroll velocity and direction
// ============================================================================
interface VelocityMarqueeProps {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
}

export const VelocityMarquee: React.FC<VelocityMarqueeProps> = ({
  children,
  baseVelocity = 1.2,
  className = '',
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    const currentVelocity = velocityFactor.get();
    if (currentVelocity < 0) {
      directionFactor.current = -1;
    } else if (currentVelocity > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * Math.abs(currentVelocity);
    let nextX = baseX.get() - moveBy;

    // Reset when past 50%
    if (nextX <= -50) {
      nextX = 0;
    } else if (nextX > 0) {
      nextX = -50;
    }

    baseX.set(nextX);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap flex flex-nowrap ${className}`}>
      <motion.div className="flex shrink-0 items-center" style={{ x }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
};
