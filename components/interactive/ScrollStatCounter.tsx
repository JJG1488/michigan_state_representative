'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, useSpring, useMotionValue, motion } from 'framer-motion';
import { usePrefersReducedMotion, ANIMATION_CONFIG } from '@/lib/animations';

interface ScrollStatCounterProps {
  targetValue: number;
  prefix?: string;
  suffix?: string;
  direction?: 'up' | 'down';
  duration?: number;
  label?: string;
  pillarColor?: string;
  className?: string;
}

export default function ScrollStatCounter({
  targetValue,
  prefix = '',
  suffix = '',
  direction = 'up',
  duration = 1.5,
  label,
  pillarColor,
  className = '',
}: ScrollStatCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReduced = usePrefersReducedMotion();
  const [displayValue, setDisplayValue] = useState(direction === 'up' ? 0 : targetValue);

  const startValue = direction === 'up' ? 0 : targetValue;
  const endValue = direction === 'up' ? targetValue : 1;

  const motionValue = useMotionValue(startValue);
  const springValue = useSpring(motionValue, {
    ...ANIMATION_CONFIG.counterSpring,
    duration: duration * 1000,
  });

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  useEffect(() => {
    if (isInView && !prefersReduced) {
      if (direction === 'down') {
        const timer = setTimeout(() => {
          motionValue.set(endValue);
        }, 500);
        return () => clearTimeout(timer);
      } else {
        motionValue.set(endValue);
      }
    } else if (isInView && prefersReduced) {
      setDisplayValue(endValue);
    }
  }, [isInView, prefersReduced, motionValue, endValue, direction]);

  const formattedValue = new Intl.NumberFormat('en-US').format(displayValue);

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
        style={{ color: pillarColor }}
        aria-label={`${prefix}${targetValue}${suffix}${label ? `, ${label}` : ''}`}
      >
        {prefix}{formattedValue}{suffix}
      </motion.div>
      {label && (
        <p className="mt-3 text-lg sm:text-xl text-text-muted max-w-md mx-auto">{label}</p>
      )}
    </div>
  );
}
