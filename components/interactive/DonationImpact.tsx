'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { IMPACT_MESSAGES, DEFAULT_IMPACT_MESSAGE } from '@/lib/constants';
import { ANIMATION_CONFIG } from '@/lib/animations';

interface DonationImpactProps {
  selectedAmount: number | null;
  className?: string;
}

export default function DonationImpact({ selectedAmount, className = '' }: DonationImpactProps) {
  if (selectedAmount === null) return null;

  const message = IMPACT_MESSAGES[selectedAmount] || DEFAULT_IMPACT_MESSAGE;

  return (
    <div className={`min-h-[3rem] ${className}`} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.p
          key={selectedAmount}
          initial={ANIMATION_CONFIG.impactMessage.initial}
          animate={ANIMATION_CONFIG.impactMessage.animate}
          exit={ANIMATION_CONFIG.impactMessage.exit}
          className="text-center text-text-muted text-sm sm:text-base italic"
        >
          &ldquo;{message}&rdquo;
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
