'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Hero from '@/components/Hero';
import ContactForm from '@/components/ContactForm';
import SectionTitle from '@/components/SectionTitle';
import Link from 'next/link';

export default function ContattiPage() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
      <Hero
        h1="Contatti"
        subtitle="Prenota un Check-up gratuito per la tua azienda. Analizziamo insieme numeri, organizzazione e criticità."
        badge="Contatti"
        primaryCTA={{
          text: 'Scrivimi su WhatsApp',
          href: 'https://wa.me/393475290564',
        }}
        image="/enrico-rizzi.jpg" // Placeholder
      />

      <div className="py-20 bg-[var(--color-bg-secondary)] min-h-screen relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-primary)]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Info Contatto */}
              <div className="space-y-8">
                <div className="bg-white rounded-[var(--radius-card)] p-8 border border-[var(--color-line)] shadow-sm">
                  <h2 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-6">
                    Recapiti Diretti
                  </h2>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl">
                        📍
                      </div>
                      <div>
                        <p className="font-bold text-[var(--color-text)]">Dove opero</p>
                        <p className="text-[var(--color-subtext)]">Venezia, Padova, Rovigo e in tutto il Veneto.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl">
                        📞
                      </div>
                      <div>
                        <p className="font-bold text-[var(--color-text)]">Telefono / WhatsApp</p>
                        <p className="text-[var(--color-subtext)]">
                          <a href="tel:+393475290564" className="hover:text-[var(--color-primary)] transition-colors">+39 347 529 0564</a>
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl">
                        ✉️
                      </div>
                      <div>
                        <p className="font-bold text-[var(--color-text)]">Email</p>
                        <p className="text-[var(--color-subtext)]">
                          <a href="mailto:info@rizzienrico.it" className="hover:text-[var(--color-primary)] transition-colors">info@rizzienrico.it</a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-[var(--color-primary)] text-white rounded-[var(--radius-card)] p-8 shadow-lg">
                  <h3 className="font-heading text-xl font-bold mb-4">
                    Perché prenotare un Check-up?
                  </h3>
                  <ul className="space-y-3 text-white/90">
                    <li className="flex items-start gap-2">
                      <span className="font-bold">✓</span> Analisi preliminare gratuita
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">✓</span> Focus su numeri e organizzazione
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">✓</span> Nessun impegno vincolante
                    </li>
                  </ul>
                </div>
              </div>

              {/* Form */}
              <div
                ref={ref}
                className={`glass-panel rounded-[2rem] p-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              >
                <h2 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-2">
                  Scrivimi
                </h2>
                <p className="text-[var(--color-subtext)] mb-8">
                  Compila il form per richiedere informazioni o fissare un appuntamento.
                </p>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
