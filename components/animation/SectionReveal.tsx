'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePrefersReducedMotion, ANIMATION_CONFIG } from '@/lib/animations';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionReveal({ children, className = '', delay = 0 }: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReduced = usePrefersReducedMotion();

  const variants = prefersReduced ? ANIMATION_CONFIG.reducedMotion : ANIMATION_CONFIG.sectionReveal;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...variants.visible,
          transition: { ...variants.visible.transition, delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
