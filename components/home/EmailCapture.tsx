'use client';

import { useState } from 'react';
import SectionReveal from '@/components/animation/SectionReveal';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-primary">
      <SectionReveal>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Stay in the Fight
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Get updates on the campaign and ways to make a difference in your community.
          </p>

          {status === 'success' ? (
            <p className="text-green-300 text-lg font-medium">
              Thank you for joining the movement!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <label htmlFor="email-capture" className="sr-only">Email address</label>
              <input
                id="email-capture"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-white"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-cta-green transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Joining...' : 'Join'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-red-300 text-sm">Something went wrong. Please try again.</p>
          )}
        </div>
      </SectionReveal>
    </section>
  );
}
