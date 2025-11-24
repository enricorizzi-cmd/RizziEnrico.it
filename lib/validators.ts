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
  problema: z.string().min(5, 'Descrivi il problema principale (minimo 5 caratteri)'),
  evento: z.string(),
});

// Schema per form iniziale test maturità digitale
export const testMaturitaFormSchema = z.object({
  nome: z.string().min(2, 'Nome deve contenere almeno 2 caratteri'),
  cognome: z.string().min(2, 'Cognome deve contenere almeno 2 caratteri'),
  email: z.string().email('Email non valida'),
  telefono: z.string().min(10, 'Telefono deve contenere almeno 10 caratteri').max(20, 'Telefono troppo lungo'),
  azienda: z.string().min(2, 'Nome azienda richiesto (minimo 2 caratteri)').max(100, 'Nome azienda troppo lungo'),
});

// Schema per test maturità digitale completo (con risposte)
export const testMaturitaSchema = z.object({
  workshop_lead_id: z.string().uuid().optional(),
  nome: z.string().min(2).optional(),
  cognome: z.string().min(2).optional(),
  email: z.string().email().optional(),
  telefono: z.string().min(10, 'Telefono deve contenere almeno 10 caratteri').max(20, 'Telefono troppo lungo'),
  azienda: z.string().min(2, 'Nome azienda richiesto (minimo 2 caratteri)').max(100, 'Nome azienda troppo lungo'),
  risposte: z.record(z.string(), z.any()),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
export type DownloadInput = z.infer<typeof downloadSchema>;
export type WorkshopRegistrationInput = z.infer<typeof workshopRegistrationSchema>;
export type TestMaturitaFormInput = z.infer<typeof testMaturitaFormSchema>;
export type TestMaturitaInput = z.infer<typeof testMaturitaSchema>;

