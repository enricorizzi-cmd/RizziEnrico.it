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
  meeting_type: z.enum(['zoom', 'presence']).optional(),
  address: z.string().optional(),
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

// Schema per registrazione workshop
export const workshopRegistrationSchema = z.object({
  nome: z.string().min(2, 'Nome troppo corto').max(50),
  cognome: z.string().min(2, 'Cognome troppo corto').max(50),
  email: z.string().email('Email non valida'),
  telefono: z.string().min(10, 'Telefono non valido').max(20),
  azienda: z.string().min(2, 'Nome azienda richiesto').max(100),
  ruolo: z.string().min(2, 'Ruolo richiesto').max(100),
  provincia: z.string().min(2, 'Provincia richiesta').max(50),
  fonte: z.enum(['BNI', 'OSM', 'Social', 'Passaparola', 'Altro']),
  problema: z.string().optional(),
  evento: z.string().default('Workshop 12.12.2024'),
});

// Schema per test maturità digitale
export const testMaturitaSchema = z.object({
  workshop_lead_id: z.string().uuid().optional(),
  nome: z.string().min(2).optional(),
  cognome: z.string().min(2).optional(),
  email: z.string().email().optional(),
  azienda: z.string().optional(),
  risposte: z.record(z.any()),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
export type DownloadInput = z.infer<typeof downloadSchema>;
export type WorkshopRegistrationInput = z.infer<typeof workshopRegistrationSchema>;
export type TestMaturitaInput = z.infer<typeof testMaturitaSchema>;

