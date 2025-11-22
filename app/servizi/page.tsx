'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import CTA from '@/components/CTA';
import Link from 'next/link';

const services = [
  {
    slug: 'consulenza-pmi',
    title: 'Consulenza PMI',
    summary: 'Continuità operativa e passaggio generazionale. Organizzazione completa della tua azienda.',
    price: 'a partire da 700€',
    deliverables: ['Analisi organizzativa completa', 'Piano di intervento 90-180 giorni', 'Affiancamento settimanale'],
    span: 'bento-span-2 bento-row-2',
    highlight: true,
    icon: '🚀'
  },
  {
    slug: 'organizzazione-mansionari',
    title: 'Organizzazione & Mansionari',
    summary: 'Standard OSM: ruoli chiari, responsabilità definite, mansionari allineati agli obiettivi.',
    price: 'a partire da 700€',
    deliverables: ['Mansionari per tutte le posizioni', 'Definizione ruoli e responsabilità', 'Organigramma aggiornato'],
    span: '',
    highlight: false,
    icon: '📋'
  },
  {
    slug: 'sviluppo-persone',
    title: 'Sviluppo Persone & Leadership',
    summary: 'Formazione mirata, coaching manageriale, team building strutturato per massimizzare il potenziale.',
    price: 'a partire da 700€',
    deliverables: ['Percorsi formativi personalizzati', 'Coaching 1-to-1 per manager', 'Team building con obiettivi chiari'],
    span: '',
    highlight: false,
    icon: '👥'
  },
  {
    slug: 'kpi-controllo-gestione',
    title: 'KPI & Controllo di Gestione',
    summary: 'Dashboard mensili, alert automatici, piano di azione sugli scostamenti. Controllo semplice ma efficace.',
    price: 'a partire da 700€',
    deliverables: ['Dashboard KPI con 12-15 indicatori', 'Alert su scostamenti', 'Review mensile + piano azione'],
    span: 'bento-span-2',
    highlight: true,
    icon: '📊'
  },
  {
    slug: 'digitalizzazione-automazioni',
    title: 'Digitalizzazione & Automazioni',
    summary: 'Digitalizzazione pratica dei processi chiave: strumenti semplici per togliere carta e lavori ripetitivi.',
    price: 'Su preventivo',
    deliverables: ['Mappa dei flussi critici', 'Scelta strumenti digitali', 'Implementazione guidata'],
    span: 'bento-span-2',
    highlight: false,
    icon: '💻'
  },
];

export default function ServiziPage() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
      <Hero
        h1="Servizi Consulenza Aziendale"
        subtitle="Ti aiuto a aumentare il fatturato, migliorare la produttività e mettere ordine nella tua azienda familiare. Output concreti, tempistiche chiare."
        badge="Servizi"
        primaryCTA={{
          text: 'Check-up Gratuito',
          href: '/contatti',
        }}
        secondaryCTA={{
          text: 'Vedi Metodo',
          href: '/metodo',
        }}
        image="/enrico-rizzi.jpg" // Placeholder, idealmente un'immagine diversa
      />

      <div className="py-20 bg-[var(--color-bg-secondary)] min-h-screen overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Box "In breve" */}
          <div
            ref={ref}
            className={`max-w-4xl mx-auto mb-16 glass-panel p-8 rounded-[2rem] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          >
            <h2 className="font-heading text-2xl font-bold text-[var(--color-primary)] mb-4">
              In breve
            </h2>
            <p className="text-[var(--color-text)] leading-relaxed text-lg">
              La consulenza PMI di Enrico Rizzi è pensata per le piccole e medie imprese venete che vogliono passare da gestione "a sensazione" a gestione per numeri.
              Lavoriamo su organizzazione, KPI e persone per aumentare fatturato, marginalità e produttività nel giro di 6 mesi.
            </p>
          </div>

          {/* Bento Grid Servizi */}
          <div className="bento-grid mb-20">
            {services.map((service, index) => (
              <Card
                key={service.slug}
                title={service.title}
                variant="service"
                href={`/servizi/${service.slug}`}
                className={`${service.span} premium-card-hover h-full flex flex-col ${service.highlight ? 'border-[var(--color-primary)]/30 bg-white shadow-lg' : ''}`}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <p className="mb-6 text-[var(--color-subtext)] leading-relaxed">{service.summary}</p>

                <div className="space-y-3 mb-8 flex-grow">
                  <p className="text-sm font-semibold text-[var(--color-text)] uppercase tracking-wide opacity-80">Include:</p>
                  <ul className="text-sm text-[var(--color-subtext)] space-y-2">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--color-success)]">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-[var(--color-line)]/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-bold text-[var(--color-primary)]">
                      {service.price}
                    </div>
                  </div>
                  <CTA href={`/servizi/${service.slug}`} variant={service.highlight ? 'primary' : 'secondary'} size="base" className="w-full">
                    Dettagli Servizio →
                  </CTA>
                </div>
              </Card>
            ))}
          </div>

          {/* Info Digitalizzazione */}
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <div className="bg-white rounded-[var(--radius-card)] p-8 border border-[var(--color-line)] shadow-sm hover:shadow-md transition-all">
              <p className="text-lg text-[var(--color-text)] mb-4">
                Vuoi capire da dove partire con la digitalizzazione della tua PMI?
              </p>
              <Link href="/contatti" className="text-[var(--color-primary)] font-bold hover:underline text-xl">
                Prenota il Check-up gratuito →
              </Link>
            </div>
          </div>

          {/* CTA Finale */}
          <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-[2rem] p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay"></div>
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay"></div>
            </div>

            <div className="relative z-10">
              <h2 className="font-heading text-3xl font-bold mb-4">
                Non Sai Come Organizzare Meglio la Tua Azienda?
              </h2>
              <p className="opacity-90 mb-8 text-lg max-w-2xl mx-auto">
                Prenota un check-up gratuito di 60 minuti. Analizziamo insieme numeri e criticità della tua azienda.
              </p>
              <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100 border-none shadow-lg hover:shadow-xl hover:-translate-y-1">
                Prenota il Check-up gratuito →
              </CTA>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
