'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { theme } from '@/theme.config';
import { motion, AnimatePresence } from 'framer-motion';

const actBlueUrl = theme.donation.actBlueUrl;

const ALL_NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Issues', href: '/issues' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'District', href: '/district' },
  { label: 'Events', href: '/events' },
  { label: 'Research', href: '/research' },
] as const;

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div>
                  <span className="text-xl font-bold">
                    <span className="text-primary">C</span>
                    <span className="text-secondary">C</span>
                  </span>
                  <span className="block text-[10px] text-text-muted leading-tight">
                    MI State Rep District 5
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-text-muted hover:text-text rounded-lg transition-colors"
                  aria-label="Close navigation menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-4" aria-label="Mobile navigation">
                <div className="space-y-1 px-4">
                  {ALL_NAV_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block py-3 px-4 text-lg font-medium text-text hover:text-primary hover:bg-surface rounded-lg transition-all duration-200"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              <div className="p-4 border-t border-border space-y-3">
                <Link
                  href="/volunteer"
                  onClick={onClose}
                  className="block w-full text-center py-3 text-primary font-semibold border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all"
                >
                  Volunteer
                </Link>
                <a
                  href={actBlueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="block w-full text-center py-3 text-white font-semibold bg-secondary rounded-lg hover:bg-cta-green transition-all"
                >
                  Donate
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
