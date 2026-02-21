'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, useSpring, useMotionValue, useTransform, motion } from 'framer-motion';
import { usePrefersReducedMotion, ANIMATION_CONFIG } from '@/lib/animations';

interface CounterAnimationProps {
  targetValue: number;
  prefix?: string;
  suffix?: string;
  direction?: 'up' | 'down';
  duration?: number;
  className?: string;
}

export default function CounterAnimation({
  targetValue,
  prefix = '',
  suffix = '',
  direction = 'up',
  duration = 1.5,
  className = '',
}: CounterAnimationProps) {
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

  const rounded = useTransform(springValue, (val) => Math.round(val));

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (isInView && !prefersReduced) {
      if (direction === 'down') {
        // Brief pause at start value before counting down
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
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}{formattedValue}{suffix}
    </motion.span>
  );
}
