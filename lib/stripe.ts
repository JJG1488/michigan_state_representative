import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2026-02-25.clover',
  typescript: true,
});

export const DONATION_CONFIG = {
  maxAmount: 1000 * 100, // $1,000 in cents
  minAmount: 1 * 100,    // $1 in cents
  currency: 'usd',
  employerRequiredThreshold: 100 * 100, // $100 in cents
} as const;
