'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { downloadSchema, type DownloadInput } from '@/lib/validators';
import { trackEvent } from './Analytics';

interface DownloadFormProps {
  resourceSlug: string;
  buttonText?: string;
}

export default function DownloadForm({ resourceSlug, buttonText }: DownloadFormProps) {
  // Determina il testo del bottone in base al resourceSlug se non fornito
  const getButtonText = () => {
    if (buttonText) return buttonText;
    if (resourceSlug === 'iprofile-guida') return 'Scarica Anteprima i-Profile';
    if (resourceSlug === 'iprofile-checklist') return 'Scarica Check-list Colloquio';
    return 'Scarica KPI Pack';
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DownloadInput>({
    resolver: zodResolver(downloadSchema),
    defaultValues: {
      resource_slug: resourceSlug,
    },
  });

  const onSubmit = async (data: DownloadInput) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Errore durante il download');
      }

      const result = await response.json();
      
      // Track download event
      trackEvent('download_lead_magnet', {
        resource_slug: resourceSlug,
        file: result.downloadUrl || resourceSlug,
        type: 'lead_magnet',
      });
      
      if (result.emailSent) {
        setSubmitSuccess(true);
      } else {
        // Download diretto se link disponibile
        if (result.downloadUrl) {
          window.open(result.downloadUrl, '_blank');
        }
      }
    } catch (error) {
      setSubmitError('Qualcosa è andato storto. Riprova o scrivi a e.rizzi@osmpartnervenezia.it');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[var(--color-success)] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
          Email inviata!
        </h3>
        <p className="text-[var(--color-subtext)]">
          Controlla la tua casella (anche spam) per il link di download.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register('resource_slug')} />
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Nome *
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

      <div className="flex items-start gap-2 text-sm text-[var(--color-subtext)]">
        <input
          type="checkbox"
          id="consent"
          required
          className="mt-1"
        />
        <label htmlFor="consent">
          Acconsento al trattamento dei dati per l'invio della risorsa e comunicazioni correlate.{' '}
          <a href="/privacy" className="text-[var(--color-primary)] hover:underline">
            Privacy Policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isSubmitting ? 'Invio in corso...' : getButtonText()}
      </button>

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
          {submitError}
        </div>
      )}
    </form>
  );
}

