import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2, 'Nome troppo corto').max(100),
  email: z.string().email('Email non valida'),
  phone: z.string().optional(),
  company: z.string().optional(),
  size_employees: z.number().int().positive().optional(),
  revenue_range: z.string().optional(),
  main_problem: z.string().optional(),
  source: z.string().optional(),
});

export const bookingSchema = z.object({
  lead_id: z.string().uuid(),
  type: z.enum(['diagnosi30', 'onsite']),
  datetime: z.string().datetime(),
});

export const eventRegistrationSchema = z.object({
  event_slug: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
});

export const downloadSchema = z.object({
  resource_slug: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
export type DownloadInput = z.infer<typeof downloadSchema>;

