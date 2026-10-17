import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const Cursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Tight, light spring lag: stiffness 400, damping 30
  const springX = useSpring(mouseX, { stiffness: 400, damping: 30, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 30, mass: 0.1 });

  useEffect(() => {
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isPointerFine || isReduced) {
      setIsSupported(false);
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    setIsSupported(true);
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isSupported) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Small 8px Charcoal Dot (#1A1A1A) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#1A1A1A]"
      />

      {/* 32px (44px on hover) Charcoal Ring with subtle spring lag */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          width: isHovered ? 44 : 32,
          height: isHovered ? 44 : 32,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: isHovered ? '#B8572B' : 'rgba(26, 26, 26, 0.4)',
          backgroundColor: isHovered ? 'rgba(184, 87, 43, 0.1)' : 'transparent',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="fixed top-0 left-0 rounded-full border border-solid transition-[width,height,border-color,background-color]"
      />
    </div>
  );
};
