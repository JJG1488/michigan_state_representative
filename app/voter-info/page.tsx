import type { Metadata } from 'next';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/shared/CTABanner';
import { MICHIGAN_VOTER_URLS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Voter Information',
  description: 'Register to vote, find your polling place, and learn about Michigan voting deadlines and options.',
};

export default function VoterInfoPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Voter Information"
            subtitle="Everything you need to make your voice heard this election."
          />

          <div className="space-y-8">
            {/* Registration Check */}
            <div className="p-6 rounded-xl bg-surface border border-border">
              <h3 className="text-xl font-bold text-text mb-3">Am I Registered to Vote?</h3>
              <p className="text-text-muted mb-4">
                Check your voter registration status with the Michigan Secretary of State.
              </p>
              <a
                href={MICHIGAN_VOTER_URLS.lookup}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-cta-hover transition-colors"
              >
                Check Registration
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            {/* How to Register */}
            <div className="p-6 rounded-xl bg-surface border border-border">
              <h3 className="text-xl font-bold text-text mb-3">How to Register</h3>
              <ol className="space-y-3 text-text-muted">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">1</span>
                  <span>Visit the Michigan Online Voter Registration portal</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">2</span>
                  <span>Have your Michigan driver&apos;s license or state ID ready</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">3</span>
                  <span>Complete the form and submit — it takes less than 5 minutes</span>
                </li>
              </ol>
              <a
                href={MICHIGAN_VOTER_URLS.register}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-cta-green transition-colors"
              >
                Register Online
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            {/* Key Dates */}
            <div className="p-6 rounded-xl bg-surface border border-border">
              <h3 className="text-xl font-bold text-text mb-4">Key Dates</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-start py-2 border-b border-border">
                  <span className="text-text font-medium">Registration Deadline</span>
                  <span className="text-text-muted text-sm">15 days before election (in-person available through Election Day)</span>
                </div>
                <div className="flex justify-between items-start py-2 border-b border-border">
                  <span className="text-text font-medium">Early Voting</span>
                  <span className="text-text-muted text-sm">9 days of early voting available</span>
                </div>
                <div className="flex justify-between items-start py-2 border-b border-border">
                  <span className="text-text font-medium">Absentee Voting</span>
                  <span className="text-text-muted text-sm">No-reason absentee available to all Michigan voters</span>
                </div>
                <div className="flex justify-between items-start py-2 border-b border-border">
                  <span className="text-text font-medium">Primary Election</span>
                  <span className="text-primary font-bold text-sm">August 4, 2026</span>
                </div>
                <div className="flex justify-between items-start py-2">
                  <span className="text-text font-medium">General Election</span>
                  <span className="text-primary font-bold text-sm">November 3, 2026</span>
                </div>
              </div>
            </div>

            {/* District Note */}
            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
              <h3 className="text-lg font-bold text-primary mb-2">Your District</h3>
              <p className="text-text-muted text-sm">
                This representative district covers <strong>Northwest Detroit</strong>, <strong>Oak Park</strong>, and <strong>Royal Oak Township</strong>.
                If you live in one of these communities, Candace Calloway is running to represent you.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
