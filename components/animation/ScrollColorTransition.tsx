'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollColorTransitionProps {
  children: React.ReactNode;
  fromColor: string;
  toColor: string;
  className?: string;
}

export default function ScrollColorTransition({
  children,
  fromColor,
  toColor,
  className = '',
}: ScrollColorTransitionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgroundColor = useTransform(scrollYProgress, [0, 1], [fromColor, toColor]);

  return (
    <motion.div ref={ref} style={{ backgroundColor }} className={className}>
      {children}
    </motion.div>
  );
}
