import type { Metadata } from 'next';
import Link from 'next/link';
import { theme } from '@/theme.config';
import SectionHeader from '@/components/shared/SectionHeader';

export const metadata: Metadata = {
  title: 'Get Involved',
  description: 'Join the movement — volunteer, donate, or request a yard sign for Candace Calloway\'s campaign.',
};

export default function GetInvolvedPage() {
  const actions = [
    {
      title: 'Volunteer',
      description: 'Door knocking, phone banking, event setup, and more. Your time makes the difference.',
      href: '/volunteer',
      // icon: (
      //   <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#060951" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      //     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      //     <circle cx="9" cy="7" r="4" />
      //     <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      //     <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      //   </svg>
      // ),
      cta: 'Sign Up to Volunteer',
      color: '#060951',
    },
    {
      title: 'Donate',
      description: 'Every dollar stays local — powering outreach across NW Detroit, Oak Park, and Royal Oak Township.',
      href: theme.donation.actBlueUrl,
      external: true,
      // icon: (
      //   <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#065124" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      //     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      //   </svg>
      // ),
      cta: 'Make a Contribution',
      color: '#065124',
    },
    {
      title: 'Yard Sign',
      description: 'Show your support and let your neighbors know you stand with Candace.',
      href: '/yard-signs',
      // icon: (
      //   <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0D3D2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      //     <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      //     <polyline points="9 22 9 12 15 12 15 22" />
      //   </svg>
      // ),
      cta: 'Request a Yard Sign',
      color: '#0D3D2B',
    },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Get Involved"
          subtitle="This campaign is powered by people like you. Every action — no matter how small — brings us closer to the community we deserve."
        />

        <div className="grid sm:grid-cols-3 gap-6">
          {actions.map((action) => (
            <div
              key={action.title}
              className="flex flex-col p-6 rounded-xl border border-border hover:shadow-lg transition-shadow bg-white"
            >
              {/* <div className="mb-4">{action.icon}</div> */}
              <h3 className="text-xl font-bold text-text mb-2">{action.title}</h3>
              <p className="text-text-muted text-sm mb-6 flex-1">{action.description}</p>
              {'external' in action ? (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-3 text-white font-semibold rounded-lg transition-colors"
                  style={{ backgroundColor: action.color }}
                >
                  {action.cta}
                </a>
              ) : (
                <Link
                  href={action.href}
                  className="block text-center py-3 text-white font-semibold rounded-lg transition-colors"
                  style={{ backgroundColor: action.color }}
                >
                  {action.cta}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-xl bg-primary text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Not Sure Where to Start?</h3>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Sign up with your email and we&apos;ll keep you in the loop on upcoming events and ways to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
