'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/theme.config';
import { issueSchema } from '@/lib/validations';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

interface IssueFormProps {
  subjectPrefix?: string;
  className?: string;
}

export default function IssueForm({ subjectPrefix = 'Constituent Message', className = '' }: IssueFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const web3formsKey = theme.forms.web3formsKey;

  if (!web3formsKey) {
    return (
      <div className={className}>
        <p className="text-text-muted text-sm">
          Send us a message at{' '}
          <a href={`mailto:${theme.contact.email}?subject=${encodeURIComponent(subjectPrefix)}`} className="text-primary hover:underline">
            {theme.contact.email}
          </a>.
        </p>
      </div>
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = issueSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus('submitting');
    setErrors({});

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `${subjectPrefix}: ${formData.name}`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          botcheck: '',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
      } else {
        setErrors({ form: 'Something went wrong. Please try again.' });
        setStatus('idle');
      }
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' });
      setStatus('idle');
    }
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-8"
          >
            <h3 className="text-xl font-bold text-text mb-2">Thank You!</h3>
            <p className="text-text-muted">
              Your message has been sent. Candace reads every one.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Honeypot */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Your name"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
              />
            </div>

            <Textarea
              label="Your Message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              placeholder="What issue matters most to you? What are you dealing with in your neighborhood?"
            />

            {errors.form && (
              <p className="text-sm text-red-500" role="alert">{errors.form}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-cta-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
