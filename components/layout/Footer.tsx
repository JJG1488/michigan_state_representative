import Link from 'next/link';
import { theme } from '@/theme.config';

const FOOTER_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Issues', href: '/issues' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block" aria-label="Home">
              <span className="text-3xl font-bold tracking-tight">
                <span className="text-white">C</span>
                <span className="text-green-400">C</span>
              </span>
            </Link>
            <p className="mt-3 text-lg font-semibold">{theme.candidate.name}</p>
            <p className="text-white/70 text-sm">for Michigan State Representative District 5</p>
            <p className="mt-2 text-white/60 text-sm italic">&ldquo;{theme.candidate.tagline}&rdquo;</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact + Email Signup */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">Stay Connected</h3>
            <div className="space-y-3 text-sm text-white/80">
              <p>
                <a href={`mailto:${theme.contact.email}`} className="hover:text-white transition-colors">
                  {theme.contact.email}
                </a>
              </p>
              {theme.contact.phone && (
                <p>
                  <a href={`tel:${theme.contact.phone.replace(/[^+\d]/g, '')}`} className="hover:text-white transition-colors">
                    {theme.contact.phone}
                  </a>
                </p>
              )}
              <div className="flex items-center gap-4 pt-2">
                {theme.social.facebook && (
                  <a
                    href={theme.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {theme.social.instagram && (
                  <a
                    href={theme.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MCFA Disclaimer — must be clearly visible */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-center text-sm text-white/90 font-medium">
            {theme.compliance.disclaimerText}
          </p>
          <p className="text-center text-xs text-white/60 mt-1">
            {theme.compliance.committeeAddress} &bull; Treasurer: {theme.compliance.treasurerName}
          </p>
          <p className="text-center text-xs text-white/40 mt-4">
            &copy; {new Date().getFullYear()} {theme.compliance.committeeName}. All rights reserved.
          </p>
          <p className="text-center text-xs text-white/30 mt-2 pb-16 md:pb-0">
            Website by James Gault
          </p>
        </div>
      </div>
    </footer>
  );
}
