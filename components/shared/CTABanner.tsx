import Link from 'next/link';
import { theme } from '@/theme.config';

const actBlueUrl = theme.donation.actBlueUrl;

interface CTABannerProps {
  className?: string;
}

export default function CTABanner({ className = '' }: CTABannerProps) {
  return (
    <section className={`bg-primary py-16 sm:py-20 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Lead with Hope?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          Join the movement for a stronger, more affordable, and better-educated community.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={actBlueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-primary bg-white rounded-lg hover:bg-gray-100 transition-colors"
          >
            Donate
          </a>
          <Link
            href="/volunteer"
            className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors"
          >
            Volunteer
          </Link>
          <Link
            href="/yard-signs"
            className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors"
          >
            Get a Yard Sign
          </Link>
        </div>
      </div>
    </section>
  );
}
