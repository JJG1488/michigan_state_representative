'use client';

import { motion } from 'framer-motion';

interface PulseButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  activeColor?: string;
  className?: string;
}

export default function PulseButton({
  children,
  onClick,
  isActive = false,
  activeColor = 'var(--color-primary)',
  className = '',
}: PulseButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`relative px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
        isActive
          ? 'text-white'
          : 'bg-white border-2 border-border text-text hover:border-primary'
      } ${className}`}
      style={isActive ? { backgroundColor: activeColor } : undefined}
    >
      {children}
    </motion.button>
  );
}
