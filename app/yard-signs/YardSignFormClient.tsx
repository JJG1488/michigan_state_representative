'use client';

import { useState } from 'react';

export default function YardSignFormClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: 'MI',
    zipCode: '',
    quantity: 1,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/yard-sign', {
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
        <div className="text-5xl mb-4">🏡</div>
        <h3 className="text-2xl font-bold text-text mb-2">Sign Requested!</h3>
        <p className="text-text-muted">We&apos;ll be in touch about delivery or pickup. Thank you for showing your support!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ys-name" className="block text-sm font-medium text-text mb-1">Full Name *</label>
          <input id="ys-name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="ys-email" className="block text-sm font-medium text-text mb-1">Email *</label>
          <input id="ys-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>
      <div>
        <label htmlFor="ys-address" className="block text-sm font-medium text-text mb-1">Street Address *</label>
        <input id="ys-address" type="text" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="ys-city" className="block text-sm font-medium text-text mb-1">City *</label>
          <input id="ys-city" type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="ys-state" className="block text-sm font-medium text-text mb-1">State</label>
          <input id="ys-state" type="text" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="ys-zip" className="block text-sm font-medium text-text mb-1">ZIP *</label>
          <input id="ys-zip" type="text" required value={formData.zipCode} onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>
      <div>
        <label htmlFor="ys-qty" className="block text-sm font-medium text-text mb-1">Quantity</label>
        <select id="ys-qty" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary">
          {[1, 2, 3, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
      {status === 'error' && <p className="text-red-500 text-sm" role="alert">Something went wrong. Please try again.</p>}

      <button type="submit" disabled={status === 'loading'} className="w-full py-4 text-lg font-bold text-white bg-secondary rounded-lg hover:bg-cta-green transition-colors disabled:opacity-50">
        {status === 'loading' ? 'Submitting...' : 'Request Yard Sign'}
      </button>
    </form>
  );
}
