import Link from 'next/link';
import CTA from '@/components/CTA';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-card)]">
      <div className="text-center px-4">
        <h1 className="font-heading text-6xl md:text-8xl font-bold text-[var(--color-primary)] mb-4">
          404
        </h1>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">
          Pagina non trovata
        </h2>
        <p className="text-[var(--color-subtext)] mb-8 max-w-md mx-auto">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTA href="/" variant="primary" size="large">
            Torna alla Home
          </CTA>
          <CTA href="/contatti" variant="secondary" size="large">
            Contatti
          </CTA>
        </div>
      </div>
    </div>
  );
}

