import { z } from 'zod';

export const emailSchema = z.string().email('Please enter a valid email address');

export const volunteerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  phone: z.string().optional(),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  helpTypes: z.array(z.string()).min(1, 'Please select at least one way to help'),
  availability: z.array(z.string()).min(1, 'Please select your availability'),
});

export const yardSignSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  address: z.string().min(5, 'Please enter your street address'),
  city: z.string().min(2, 'Please enter your city'),
  state: z.string().default('MI'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  quantity: z.number().min(1).max(5),
  bumperSticker: z.boolean().default(false),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  subject: z.enum(['General', 'Press/Media', 'Partnership', 'Other']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const rsvpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  eventId: z.string(),
  numberAttending: z.number().min(1).max(10),
});

export const donationSchema = z.object({
  amount: z.number().min(1, 'Minimum donation is $1').max(1000, 'Maximum individual contribution is $1,000'),
  email: emailSchema,
  name: z.string().min(2, 'Name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  employer: z.string().optional(),
  occupation: z.string().optional(),
  isRecurring: z.boolean().default(false),
  complianceConfirmed: z.boolean().refine(val => val === true, 'You must confirm compliance'),
});

export const subscribeSchema = z.object({
  email: emailSchema,
});

export type VolunteerFormData = z.infer<typeof volunteerSchema>;
export type YardSignFormData = z.infer<typeof yardSignSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type RSVPFormData = z.infer<typeof rsvpSchema>;
export type DonationFormData = z.infer<typeof donationSchema>;
export type SubscribeFormData = z.infer<typeof subscribeSchema>;
