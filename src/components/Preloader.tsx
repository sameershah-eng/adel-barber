import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let hasSeenPreloader = false;

    try {
      hasSeenPreloader = sessionStorage.getItem('adel_barber_intro') === 'true';
    } catch {
      hasSeenPreloader = false;
    }

    if (prefersReducedMotion || hasSeenPreloader) {
      setIsVisible(false);
      onComplete();
      return;
    }

    try {
      sessionStorage.setItem('adel_barber_intro', 'true');
    } catch {
      // Ignore if sessionStorage restricted
    }

    const duration = 1200; // ms
    const intervalTime = 16;
    const steps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = Math.min(100, Math.round((step / steps) * 100));
      setCount(current);

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onComplete(), 550);
        }, 150);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const brandLetters = 'ADEL BARBER'.split('');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '0%' }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-50 bg-[#FAF7F2] flex flex-col justify-between p-8 sm:p-14 pointer-events-auto"
        >
          {/* Top Info */}
          <div className="flex items-center justify-between text-xs font-mono font-semibold tracking-wider text-[#B8572B] uppercase">
            <span>17 Cloth Hall St · Huddersfield</span>
            <span>Est. Precision</span>
          </div>

          {/* Central Animated Letters */}
          <div className="text-center">
            <div className="overflow-hidden inline-flex items-center gap-1 sm:gap-2">
              {brandLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: '120%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-[#1A1A1A] ${
                    char === ' ' ? 'w-4 sm:w-6' : ''
                  }`}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="font-serif italic text-xl sm:text-2xl text-[#B8572B] mt-3"
            >
              Huddersfield&apos;s precision barbershop
            </motion.p>
          </div>

          {/* Bottom Counter & Bar */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-[0.18em] font-medium text-[#57534E]">
                Preparing Studio
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold font-display tabular-nums text-[#1A1A1A]">
                {count.toString().padStart(2, '0')}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-[#E8E0D2] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-signature-gradient"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
