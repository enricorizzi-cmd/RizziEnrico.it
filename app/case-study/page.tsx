'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import CTA from '@/components/CTA';

// Mock data
const cases = [
  {
    slug: 'distribuzione-ricambi-filtri',
    title: 'Distribuzione ricambi e filtrazione: da urgenze a processi stabili',
    sector: 'Commercio B2B',
    size: '45+ addetti',
    context: 'Ruoli sovrapposti, riunioni inutili, KPI assenti in logistica. Soluzione: organigramma, mansionari, cruscotto logistica. Risultati: processo stabile, puntualità alta e meno "fuoco da spegnere".',
    span: 'bento-span-2'
  },
  {
    slug: 'produzione-alimentare-polenta',
    title: 'Produzione alimentare: pianificazione e qualità con KPI',
    sector: 'Alimentare',
    size: 'Linee produzione',
    context: 'Programmazione reattiva, dati sparsi, assenza indicatori qualità. Soluzione: piano settimanale per linee, KPI efficienza/resa/scarti. Risultati: pianificazione stabile, decisioni basate su numeri, meno scarti.',
    span: ''
  },
  {
    slug: 'lattoneria-coperture-cantiere',
    title: 'Lattoneria & Coperture: passaggio generazionale riuscito',
    sector: 'Edile/Impiantistico',
    size: 'Cantiere',
    context: 'Know-how nelle persone, poco tracciamento avanzamento. Soluzione: mansionari per ruoli cantiere/ufficio, KPI avanzamento e marginalità commessa. Risultati: continuità direzionale, controllo commesse, più ordine.',
    span: ''
  },
  {
    slug: 'impianti-clima-refrigerazione-service',
    title: 'Impianti clima/refrigerazione: service con qualità misurabile',
    sector: 'Service tecnico',
    size: 'Team service',
    context: 'Priorità confuse, reportistica carente. Soluzione: agenda interventi con priorità, feedback post-servizio, KPI tempi/first-time-fix/ticket aperti. Risultati: tempi ridotti, qualità percepita in crescita, meno rientri.',
    span: 'bento-span-2'
  },
];

export default function CaseStudyPage() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
      <Hero
        h1="Case Study PMI Venete"
        subtitle="Storie di successo con Metodo e KPI. Risultati concreti e misurabili ottenuti da imprenditori come te."
        badge="Case Study"
        primaryCTA={{
          text: 'Prenota Check-up',
          href: '/contatti',
        }}
        image="/enrico-rizzi.jpg" // Placeholder
      />

      <div className="py-20 bg-[var(--color-bg-secondary)] min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Filtri */}
          <div className="mb-12 flex flex-wrap gap-3 justify-center">
            {['Tutti i settori', 'Manifatturiero', 'Servizi', '10-50 addetti'].map((filter, i) => (
              <button
                key={i}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${i === 0 ? 'bg-[var(--color-primary)] text-white shadow-md' : 'bg-white text-[var(--color-text)] border border-[var(--color-line)] hover:bg-gray-50'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Lista Case - Bento Grid */}
          <div
            ref={ref}
            className={`bento-grid transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          >
            {cases.map((caseItem, index) => (
              <Card
                key={caseItem.slug}
                title={caseItem.title}
                variant="case"
                href={`/case-study/${caseItem.slug}`}
                className={`${caseItem.span} premium-card-hover h-full bg-white border border-[var(--color-line)]`}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-xs font-bold uppercase tracking-wide">
                    {caseItem.sector}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    {caseItem.size}
                  </span>
                </div>
                <p className="text-[var(--color-subtext)] leading-relaxed mb-6">{caseItem.context}</p>
                <div className="mt-auto pt-4 border-t border-[var(--color-line)]/50">
                  <span className="text-[var(--color-primary)] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Leggi storia completa <span>→</span>
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Finale */}
          <div className="mt-20 text-center">
            <div className="bg-white rounded-[2rem] p-12 border border-[var(--color-line)] shadow-sm max-w-4xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-4">
                Vuoi ottenere risultati simili?
              </h2>
              <p className="text-[var(--color-subtext)] mb-8 text-lg">
                Non serve stravolgere l'azienda. Spesso basta mettere ordine nei ruoli e iniziare a misurare le cose giuste.
              </p>
              <CTA href="/contatti" variant="primary" size="large">
                Parliamo della tua azienda →
              </CTA>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
