'use client';

import { useState } from 'react';
import Link from 'next/link';
import { theme } from '@/theme.config';
import MobileNav from './MobileNav';

const actBlueUrl = theme.donation.actBlueUrl;

const NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Issues', href: '/issues' },
  { label: 'Media', href: '/media' },
  { label: 'Get Involved', href: '/get-involved' },
] as const;

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" aria-label="Candace Calloway - Home">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight">
                <span className="text-primary">C</span>
                <span className="text-secondary">C</span>
              </span>
              <span className="hidden sm:block text-sm font-medium text-text-muted leading-tight">
                Candace Calloway
                <span className="block text-xs text-text-muted/70 font-normal">
                  For MI State Rep District 5
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-text font-medium hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/volunteer"
                className="px-5 py-2.5 text-sm font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
              >
                Volunteer
              </Link>
              <a
                href={actBlueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-secondary rounded-lg hover:bg-cta-green transition-all duration-200"
              >
                Donate
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 text-text rounded-lg hover:bg-surface transition-colors"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileNavOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Mobile Fixed Donate Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-secondary p-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <a
          href={actBlueUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-3 text-white font-bold text-lg rounded-lg bg-primary hover:bg-cta-hover transition-colors"
        >
          Donate Now
        </a>
      </div>
    </>
  );
}
