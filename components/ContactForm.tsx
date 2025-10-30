'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema, type LeadInput } from '@/lib/validators';
import { trackEvent } from './Analytics';

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadInput) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'invio');
      }

      const result = await response.json();
      setSubmitSuccess(true);
      
      // Track event
      trackEvent('lead_submit', {
        score: result.score,
        source: data.source || 'form',
      });
      
      // Redirect to calendar if score is high
      if (result.score >= 50) {
        // Could redirect to Calendly/TidyCal here
        setTimeout(() => {
          window.location.href = process.env.NEXT_PUBLIC_CALENDLY_LINK || '#';
        }, 2000);
      }
    } catch (error) {
      setSubmitError('Qualcosa è andato storto. Riprova o scrivi a enrico@rizzienrico.it');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStep = watch();

  if (submitSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[var(--color-success)] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">
          Grazie!
        </h2>
        <p className="text-[var(--color-subtext)] mb-4">
          Ti ho scritto via email. Controlla anche la posta indesiderata.
        </p>
        <p className="text-sm text-[var(--color-subtext)]">
          Ti contatterò entro 24 ore per concordare l'appuntamento.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Step 1: Info base */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Nome e Cognome *
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="w-full px-4 py-3 border border-[var(--color-line)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              placeholder="Mario Rossi"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-[var(--color-error)]">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Email *
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full px-4 py-3 border border-[var(--color-line)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              placeholder="mario.rossi@azienda.it"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-[var(--color-error)]">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Telefono
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className="w-full px-4 py-3 border border-[var(--color-line)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              placeholder="+39 123 456 7890"
            />
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Continua →
          </button>
        </div>
      )}

      {/* Step 2: Qualificazione */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Azienda
            </label>
            <input
              id="company"
              type="text"
              {...register('company')}
              className="w-full px-4 py-3 border border-[var(--color-line)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              placeholder="Nome azienda"
            />
          </div>

          <div>
            <label htmlFor="size_employees" className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Numero di collaboratori
            </label>
            <input
              id="size_employees"
              type="number"
              {...register('size_employees', { valueAsNumber: true })}
              className="w-full px-4 py-3 border border-[var(--color-line)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              placeholder="Es: 45"
            />
          </div>

          <div>
            <label htmlFor="revenue_range" className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Fatturato (range)
            </label>
            <select
              id="revenue_range"
              {...register('revenue_range')}
              className="w-full px-4 py-3 border border-[var(--color-line)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            >
              <option value="">Seleziona...</option>
              <option value="100k-500k">€100k - €500k</option>
              <option value="500k-1M">€500k - €1M</option>
              <option value="1M-5M">€1M - €5M</option>
              <option value="5M-10M">€5M - €10M</option>
              <option value="10M+">€10M+</option>
            </select>
          </div>

          <div>
            <label htmlFor="main_problem" className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Problema principale
            </label>
            <textarea
              id="main_problem"
              {...register('main_problem')}
              rows={3}
              className="w-full px-4 py-3 border border-[var(--color-line)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              placeholder="Descrivi brevemente la criticità principale della tua PMI..."
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 px-6 py-3 border border-[var(--color-line)] text-[var(--color-text)] font-semibold rounded-lg hover:bg-[var(--color-card)] transition-colors"
            >
              ← Indietro
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? 'Invio in corso...' : 'Invia richiesta'}
            </button>
          </div>
        </div>
      )}

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
          {submitError}
        </div>
      )}
    </form>
  );
}

