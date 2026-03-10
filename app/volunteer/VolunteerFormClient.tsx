'use client';

import { useState } from 'react';

const HELP_TYPES = [
  'Door Knocking',
  'Phone Banking',
  'Event Setup',
  'Social Media',
  'Data Entry',
  'Other',
];

const AVAILABILITY = ['Weekdays', 'Weekends', 'Evenings'];

export default function VolunteerFormClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    helpTypes: [] as string[],
    availability: [] as string[],
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleCheckbox = (field: 'helpTypes' | 'availability', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-text mb-2">Thank You!</h3>
        <p className="text-text-muted">We&apos;ll be in touch soon with volunteer opportunities. Together, we&apos;ll make a difference.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vol-name" className="block text-sm font-medium text-text mb-1">Full Name *</label>
          <input id="vol-name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="vol-email" className="block text-sm font-medium text-text mb-1">Email *</label>
          <input id="vol-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="vol-phone" className="block text-sm font-medium text-text mb-1">Phone</label>
          <input id="vol-phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="vol-zip" className="block text-sm font-medium text-text mb-1">ZIP Code *</label>
          <input id="vol-zip" type="text" required value={formData.zipCode} onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-text mb-3">How would you like to help? *</legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {HELP_TYPES.map((type) => (
            <label key={type} className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${formData.helpTypes.includes(type) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
              <input type="checkbox" checked={formData.helpTypes.includes(type)} onChange={() => handleCheckbox('helpTypes', type)} className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
              <span className="text-sm text-text">{type}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="block text-sm font-medium text-text mb-3">Availability *</legend>
        <div className="flex flex-wrap gap-3">
          {AVAILABILITY.map((time) => (
            <label key={time} className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${formData.availability.includes(time) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
              <input type="checkbox" checked={formData.availability.includes(time)} onChange={() => handleCheckbox('availability', time)} className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
              <span className="text-sm text-text">{time}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {status === 'error' && <p className="text-red-500 text-sm" role="alert">Something went wrong. Please try again.</p>}

      <button type="submit" disabled={status === 'loading'} className="w-full py-4 text-lg font-bold text-white bg-primary rounded-lg hover:bg-cta-hover transition-colors disabled:opacity-50">
        {status === 'loading' ? 'Submitting...' : 'Sign Up to Volunteer'}
      </button>
    </form>
  );
}
