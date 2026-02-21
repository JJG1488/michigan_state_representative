import type { Metadata } from 'next';
import Link from 'next/link';
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
      icon: '🤝',
      cta: 'Sign Up to Volunteer',
      color: '#060951',
    },
    {
      title: 'Donate',
      description: 'Every dollar stays local — powering outreach across NW Detroit, Oak Park, and Royal Oak Township.',
      href: '/donate',
      icon: '💙',
      cta: 'Make a Contribution',
      color: '#065124',
    },
    {
      title: 'Yard Sign',
      description: 'Show your support and let your neighbors know you stand with Candace.',
      href: '/yard-signs',
      icon: '🏡',
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
              <span className="text-4xl mb-4">{action.icon}</span>
              <h3 className="text-xl font-bold text-text mb-2">{action.title}</h3>
              <p className="text-text-muted text-sm mb-6 flex-1">{action.description}</p>
              <Link
                href={action.href}
                className="block text-center py-3 text-white font-semibold rounded-lg transition-colors"
                style={{ backgroundColor: action.color }}
              >
                {action.cta}
              </Link>
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
