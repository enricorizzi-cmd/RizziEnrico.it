'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventRegistrationSchema, type EventRegistrationInput } from '@/lib/validators';

interface EventRegistrationFormProps {
  eventSlug: string;
}

export default function EventRegistrationForm({ eventSlug }: EventRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventRegistrationInput>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: {
      event_slug: eventSlug,
    },
  });

  const onSubmit = async (data: EventRegistrationInput) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/register-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Errore durante la registrazione');
      }

      const result = await response.json();
      setSubmitSuccess(true);
    } catch (error) {
      alert('Errore durante la registrazione. Riprova.');
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
          Registrazione completata!
        </h3>
        <p className="text-[var(--color-subtext)] mb-4">
          Ti abbiamo inviato una email di conferma.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register('event_slug')} />
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Nome e Cognome *
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-4 py-3 border border-[var(--color-line)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
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
        />
        {errors.email && (
          <p className="mt-1 text-sm text-[var(--color-error)]">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Azienda
        </label>
        <input
          id="company"
          type="text"
          {...register('company')}
          className="w-full px-4 py-3 border border-[var(--color-line)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
        />
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
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isSubmitting ? 'Registrazione in corso...' : 'Registrati all\'evento'}
      </button>
    </form>
  );
}

