'use client';

import { useState } from 'react';

const SUBJECTS = ['General', 'Press/Media', 'Partnership', 'Other'] as const;

export default function ContactFormClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General' as typeof SUBJECTS[number],
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
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
        <div className="text-5xl mb-4">✉️</div>
        <h3 className="text-2xl font-bold text-text mb-2">Message Sent!</h3>
        <p className="text-text-muted">Thank you for reaching out. We&apos;ll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-text mb-1">Name *</label>
          <input id="contact-name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-text mb-1">Email *</label>
          <input id="contact-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-text mb-1">Subject</label>
        <select id="contact-subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value as typeof SUBJECTS[number] })} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary">
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-text mb-1">Message *</label>
        <textarea id="contact-message" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-y" />
      </div>

      {status === 'error' && <p className="text-red-500 text-sm" role="alert">Something went wrong. Please try again.</p>}

      <button type="submit" disabled={status === 'loading'} className="w-full py-4 text-lg font-bold text-white bg-primary rounded-lg hover:bg-cta-hover transition-colors disabled:opacity-50">
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
