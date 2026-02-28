import Link from 'next/link';
import { theme } from '@/theme.config';

const FOOTER_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Issues', href: '/issues' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Donate', href: '/donate' },
  { label: 'District', href: '/district' },
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
          <p className="text-center text-xs text-white/30 mt-2">
            Website by James Gault
          </p>
        </div>
      </div>
    </footer>
  );
}
