import React, { useEffect, useRef, useState } from 'react';
import { useInView, useSpring, useMotionValue } from 'framer-motion';

interface CounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);

  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    stiffness: 90,
    damping: 20,
    mass: 0.8,
  });

  useEffect(() => {
    if (inView) {
      motionVal.set(value);
    }
  }, [inView, value, motionVal]);

  useEffect(() => {
    return springVal.on('change', (latest) => {
      setDisplayValue(Number(latest.toFixed(decimals)));
    });
  }, [springVal, decimals]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {decimals > 0 ? displayValue.toFixed(decimals) : displayValue}
      {suffix}
    </span>
  );
};
