'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ANIMATION_CONFIG } from '@/lib/animations';

interface InfographicFlipCardProps {
  pillarIcon: string;
  pillarTitle: string;
  pillarColor: string;
  heroStat: {
    value: string;
    label: string;
  };
  description: string;
  solutions: string[];
  learnMoreHref: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function InfographicFlipCard({
  pillarIcon,
  pillarTitle,
  pillarColor,
  heroStat,
  description,
  solutions,
  learnMoreHref,
  isExpanded: controlledExpanded,
  onToggle,
}: InfographicFlipCardProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-xl border border-border shadow-sm overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
      style={{
        borderLeftWidth: isExpanded ? '4px' : '1px',
        borderLeftColor: isExpanded ? pillarColor : undefined,
      }}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`${pillarTitle}: ${heroStat.value} ${heroStat.label}. Click to ${isExpanded ? 'collapse' : 'expand'} details.`}
    >
      <div className="p-6 sm:p-8">
        {/* Always visible: Header + Stat */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl" aria-hidden="true">{pillarIcon}</span>
          <h3 className="text-lg font-bold text-text">{pillarTitle}</h3>
        </div>

        <div className="mb-4">
          <span
            className="text-4xl sm:text-5xl font-bold"
            style={{ color: pillarColor }}
          >
            {heroStat.value}
          </span>
          <span className="block mt-1 text-text-muted text-sm sm:text-base">
            {heroStat.label}
          </span>
        </div>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <motion.p
                variants={ANIMATION_CONFIG.staggerItem}
                initial="hidden"
                animate="visible"
                className="text-text-muted mb-4 leading-relaxed"
              >
                {description}
              </motion.p>

              <ul className="space-y-2 mb-6">
                {solutions.map((solution, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 text-sm text-text"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: pillarColor }} />
                    {solution}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: solutions.length * 0.1 }}
              >
                <Link
                  href={learnMoreHref}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:underline"
                  style={{ color: pillarColor }}
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand indicator */}
        {!isExpanded && (
          <p className="text-xs text-text-muted mt-2">Tap to learn more</p>
        )}
      </div>
    </motion.div>
  );
}
