'use client';

import { useState } from 'react';
import { theme } from '@/theme.config';
import PulseButton from '@/components/animation/PulseButton';
import DonationImpact from '@/components/interactive/DonationImpact';

export default function DonateClient() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: 'MI',
    zipCode: '',
    employer: '',
    occupation: '',
  });
  const [complianceConfirmed, setComplianceConfirmed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const amount = selectedAmount || (customAmount ? parseInt(customAmount, 10) : 0);
  const showEmployerFields = amount > 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount < 1 || amount > 1000) {
      setErrorMessage('Please select a valid donation amount ($1 - $1,000).');
      return;
    }
    if (!complianceConfirmed) {
      setErrorMessage('Please confirm the compliance statement.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          isRecurring,
          complianceConfirmed,
          ...formData,
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-text mb-2">Thank You!</h3>
        <p className="text-text-muted">
          Your contribution of ${amount} powers the movement for stronger communities. We&apos;ll send a confirmation to {formData.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ActBlue Primary Option */}
      {theme.donation.actBlueUrl && (
        <div className="p-6 rounded-xl bg-blue-50 border-2 border-blue-200 text-center">
          <p className="font-semibold text-text mb-3">Preferred: Donate via ActBlue</p>
          <a
            href={theme.donation.actBlueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Donate via ActBlue
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <p className="mt-4 text-sm text-text-muted">Or use the form below for alternative payment methods</p>
          <hr className="mt-6 border-blue-200" />
        </div>
      )}

      {/* Amount Selection */}
      <div>
        <label className="block text-sm font-semibold text-text mb-3">Select Amount</label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {theme.donation.suggestedAmounts.map((amt) => (
            <PulseButton
              key={amt}
              onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
              isActive={selectedAmount === amt && !customAmount}
              activeColor={theme.colors.secondary}
            >
              ${amt}
            </PulseButton>
          ))}
        </div>

        <div className="mt-3">
          <label htmlFor="custom-amount" className="sr-only">Custom amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-medium">$</span>
            <input
              id="custom-amount"
              type="number"
              min="1"
              max="1000"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
              placeholder="Custom amount"
              className="w-full pl-8 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <DonationImpact selectedAmount={amount || null} />

      {/* Recurring Toggle */}
      {theme.donation.enableRecurring && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsRecurring(!isRecurring)}
            className={`relative w-12 h-6 rounded-full transition-colors ${isRecurring ? 'bg-secondary' : 'bg-gray-300'}`}
            role="switch"
            aria-checked={isRecurring}
            aria-label="Make this a monthly recurring donation"
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${isRecurring ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
          <span className="text-sm text-text">Make this a monthly donation</span>
        </div>
      )}

      {/* Donor Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-text">Your Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="donor-name" className="block text-sm font-medium text-text mb-1">Full Name *</label>
            <input id="donor-name" name="name" type="text" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="donor-email" className="block text-sm font-medium text-text mb-1">Email *</label>
            <input id="donor-email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="donor-address" className="block text-sm font-medium text-text mb-1">Address *</label>
            <input id="donor-address" name="address" type="text" required value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="donor-city" className="block text-sm font-medium text-text mb-1">City *</label>
            <input id="donor-city" name="city" type="text" required value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="donor-state" className="block text-sm font-medium text-text mb-1">State *</label>
              <input id="donor-state" name="state" type="text" required value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="donor-zip" className="block text-sm font-medium text-text mb-1">ZIP *</label>
              <input id="donor-zip" name="zipCode" type="text" required value={formData.zipCode} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        </div>

        {/* Employer/Occupation (required for >$100) */}
        {showEmployerFields && (
          <div className="grid sm:grid-cols-2 gap-4 p-4 bg-surface rounded-lg border border-border">
            <p className="sm:col-span-2 text-xs text-text-muted">Required for contributions over $100 per Michigan Campaign Finance Act.</p>
            <div>
              <label htmlFor="donor-employer" className="block text-sm font-medium text-text mb-1">Employer *</label>
              <input id="donor-employer" name="employer" type="text" required value={formData.employer} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="donor-occupation" className="block text-sm font-medium text-text mb-1">Occupation *</label>
              <input id="donor-occupation" name="occupation" type="text" required value={formData.occupation} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        )}
      </div>

      {/* Compliance Checkbox */}
      <div className="flex items-start gap-3">
        <input
          id="compliance"
          type="checkbox"
          checked={complianceConfirmed}
          onChange={(e) => setComplianceConfirmed(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
          required
        />
        <label htmlFor="compliance" className="text-sm text-text-muted">
          I confirm this contribution is from my personal funds, not from a corporation or labor organization. I am a U.S. citizen or permanent resident. I am making this contribution voluntarily and not on behalf of another person or entity.
        </label>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm" role="alert">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !amount}
        className="w-full py-4 text-lg font-bold text-white bg-secondary rounded-lg hover:bg-cta-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Processing...' : `Contribute $${amount || '...'}`}
      </button>

      <p className="text-center text-xs text-text-muted">
        {theme.compliance.disclaimerText}
      </p>
    </form>
  );
}
