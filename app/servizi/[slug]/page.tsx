import { notFound } from 'next/navigation';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import Accordion from '@/components/Accordion';
import CTA from '@/components/CTA';
import JSONLD from '@/components/JSONLD';

const services = {
  'consulenza-pmi': {
    title: 'Consulenza PMI',
    hero: {
      problem: 'La tua PMI è cresciuta ma ora il caos organizzativo limita ulteriormente la crescita. Sovrapposizioni, mancanza di processi, riunioni che non portano risultati.',
      solution: 'Organizzazione completa della tua azienda con metodo OSM: ruoli chiari, KPI, processi stabili, persone motivate.',
      result: 'In 90 giorni ordine organizzativo, in 6 mesi risultati numerici misurabili. Da reattiva a proattiva.',
    },
    deliverables: [
      'Analisi organizzativa completa (2 settimane)',
      'Piano di intervento dettagliato 90-180 giorni',
      'Affiancamento settimanale o quindicinale',
      'Implementazione Metodo 5 Step',
      'Formazione del management sui KPI',
      'Supporto per passaggio generazionale (se applicabile)',
    ],
    timelines: 'Set-up: 2-4 settimane. Affiancamento: minimo 6 mesi (consigliato 12 mesi per risultati stabili).',
    kpis: [
      'Fatturato e trend crescita',
      'Marginalità operativa',
      'Giorni medi di incasso',
      'Lead generati e tasso conversione',
      'Tempi di consegna',
      'Soddisfazione clienti (NPS)',
      'Turnover del personale',
      'Produttività per addetto',
    ],
    priceFrom: 2500,
    faq: [
      {
        question: 'Come funziona l\'affiancamento?',
        answer: 'Incontri settimanali o quindicinali da 2-3 ore. Lavoriamo insieme su priorità immediate e su implementazione del metodo. Ti formo per renderti autonomo nel tempo.',
      },
      {
        question: 'Può funzionare anche per passaggio generazionale?',
        answer: 'Sì, è uno dei casi d\'uso principali. Affianco il nuovo management nella fase di transizione, garantendo continuità operativa e trasferimento conoscenze strutturato.',
      },
      {
        question: 'Cosa succede dopo i 12 mesi?',
        answer: 'Diventi autonomo con un sistema funzionante. Possiamo continuare con supporto ridotto (1 incontro/mese) o chiudere. L\'obiettivo è che tu non abbia bisogno di me indefinitamente.',
      },
    ],
  },
  'organizzazione-mansionari': {
    title: 'Organizzazione & Mansionari',
    hero: {
      problem: 'Ruoli poco chiari, responsabilità sovrapposte, mansioni che cambiano nel tempo senza documentazione. Conflitti e inefficienze.',
      solution: 'Mansionari standard OSM per tutte le posizioni, con ruoli chiari e responsabilità definite. Organigramma aggiornato.',
      result: 'Ogni persona sa esattamente cosa deve fare. Eliminati conflitti e sovrapposizioni. Base solida per crescita organizzata.',
    },
    deliverables: [
      'Mansionari dettagliati per tutte le posizioni',
      'Definizione chiara di ruoli e responsabilità',
      'Organigramma aggiornato con reporting lines',
      'Processo di revisione e aggiornamento mansionari',
      'Documentazione in formato digitale (PDF/Google Docs)',
    ],
    timelines: '4-6 settimane: raccolta info, stesura mansionari, revisione con i diretti interessati, finalizzazione.',
    kpis: [
      'Copertura mansionari (% posizioni documentate)',
      'Chiarezza ruoli (survey interna)',
      'Riduzione conflitti riportati',
    ],
    priceFrom: 1800,
    faq: [
      {
        question: 'Quante posizioni posso includere?',
        answer: 'Fino a 30-40 posizioni. Per aziende più grandi facciamo un pacchetto personalizzato. Ogni mansionario è dettagliato con responsabilità, attività quotidiane, KPI di riferimento.',
      },
      {
        question: 'I mansionari vengono aggiornati nel tempo?',
        answer: 'Sì, definiamo un processo di revisione semestrale o annuale. Incluso nel servizio: 1 revisione gratuita entro 6 mesi dalla consegna.',
      },
    ],
  },
  'sviluppo-persone': {
    title: 'Sviluppo Persone & Leadership',
    hero: {
      problem: 'Persone motivate ma senza direzione chiara. Manager che gestiscono male i team. Formazione generica che non porta risultati.',
      solution: 'Percorsi formativi personalizzati, coaching manageriale mirato, team building con obiettivi misurabili.',
      result: 'Team più coesi, manager più efficaci, crescita professionale allineata agli obiettivi aziendali.',
    },
    deliverables: [
      'Analisi gap competenze (2 settimane)',
      'Percorsi formativi personalizzati per ruolo',
      'Coaching 1-to-1 per manager (8-12 sessioni)',
      'Team building strutturato con obiettivi chiari',
      'Sistema di riconoscimento e incentivi',
      'Follow-up e misurazione risultati',
    ],
    timelines: 'Durata: 3-6 mesi. Formazione: 1-2 giornate per percorso. Coaching: 1 sessione settimanale o quindicinale.',
    kpis: [
      'Soddisfazione lavorativa (survey)',
      'Riduzione turnover',
      'Performance individuali (valutazione)',
      'Efficacia leadership (360 feedback)',
    ],
    priceFrom: 1200,
    faq: [
      {
        question: 'Quante persone posso includere?',
        answer: 'Fino a 10-15 persone per percorso formativo. Per coaching, massimo 5 manager contemporaneamente per garantire qualità. Team building: fino a 30 partecipanti.',
      },
      {
        question: 'Fornite anche materiali formativi?',
        answer: 'Sì, slide, guide pratiche e template. Tutti i materiali sono personalizzati sulla tua realtà aziendale.',
      },
    ],
  },
  'kpi-controllo-gestione': {
    title: 'KPI & Controllo di Gestione',
    hero: {
      problem: 'Gestisci l\'azienda "a sensazione". Non hai dashboard chiare, KPI non definiti, riunioni senza numeri concreti.',
      solution: 'Cruscotto KPI mensile con 12-15 indicatori chiave. Dashboard visiva, alert automatici, review mensile strutturata.',
      result: 'Decisioni basate sui numeri, non su opinioni. Visibilità immediata su scostamenti e aree di miglioramento.',
    },
    deliverables: [
      'Set-up dashboard KPI (2-4 settimane)',
      '12-15 KPI chiave monitorati mensilmente',
      'Dashboard visiva (Google Sheets/Excel o software dedicato)',
      'Alert automatici su scostamenti critici',
      'Review mensile con analisi e piano di azione',
      'Formazione del team sui KPI',
    ],
    timelines: 'Set-up: 2-4 settimane. Monitoraggio mensile: review di 2-3 ore + analisi e report.',
    kpis: [
      'Fatturato vs budget',
      'Marginalità operativa',
      'Giorni medi di incasso (DSO)',
      'Lead generati e conversion rate',
      'Costo per lead (CPL)',
      'Tempi di consegna',
      'ROI campagne marketing',
      'Produttività per addetto',
      'Soddisfazione clienti (NPS)',
      'Assenteismo e turnover',
    ],
    priceFrom: 1500,
    monthlyFee: 800,
    faq: [
      {
        question: 'Non ho KPI definiti, da dove partiamo?',
        answer: 'Nessun problema! Partiamo da 5-6 KPI base: fatturato, marginalità, incassi, lead, consegne. Poi li espandiamo gradualmente. L\'importante è iniziare a misurare qualcosa.',
      },
      {
        question: 'Che software usate per la dashboard?',
        answer: 'Di base usiamo Google Sheets (accessibile a tutti) o Excel. Se preferisci software dedicato (es. PowerBI, Tableau), posso integrare. Costo software escluso dal servizio.',
      },
      {
        question: 'Cosa succede se non riesco a raccogliere i dati per alcuni KPI?',
        answer: 'Ti aiuto a definire i processi di raccolta dati. Spesso bastano piccole modifiche ai flussi esistenti. Se alcuni dati non sono disponibili, partiamo con quelli che hai.',
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];

  if (!service) {
    return {
      title: 'Servizio non trovato',
    };
  }

  return generateSEOMetadata({
    title: `${service.title} - Servizi | Enrico Rizzi`,
    description: service.hero.solution,
    path: `/servizi/${slug}`,
  });
}

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export default async function ServizioPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];

  if (!service) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.hero.solution,
    areaServed: {
      '@type': 'State',
      name: 'Veneto',
    },
    provider: {
      '@type': 'Person',
      name: 'Enrico Rizzi',
    },
    offers: {
      '@type': 'Offer',
      price: service.priceFrom,
      priceCurrency: 'EUR',
    },
  };

  // Simula case correlati (in produzione da DB)
  const relatedCases = [
    {
      slug: 'case-1',
      title: 'PMI manifatturiera: da caos a processi',
      context: 'Azienda 45 addetti, organizzazione insufficiente',
    },
    {
      slug: 'case-2',
      title: 'Passaggio generazionale riuscito',
      context: 'Transizione leadership con metodo strutturato',
    },
  ];

  return (
    <>
      <JSONLD data={serviceSchema} />
      
      {/* Hero Problema → Soluzione → Risultato */}
      <section className="bg-gradient-to-b from-[var(--color-card)] to-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title={service.title}
              description={service.hero.solution}
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">Il Problema</h3>
                <p className="text-red-800 text-sm">{service.hero.problem}</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">La Soluzione</h3>
                <p className="text-blue-800 text-sm">{service.hero.solution}</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Il Risultato</h3>
                <p className="text-green-800 text-sm">{service.hero.result}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cosa Include */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle title="Cosa include" centered />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {service.deliverables.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-[var(--color-card)] p-4 rounded-lg">
                  <svg className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--color-text)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tempistiche & KPI */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
                  Tempistiche
                </h3>
                <p className="text-[var(--color-subtext)]">{service.timelines}</p>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
                  KPI Monitorati
                </h3>
                <ul className="space-y-2">
                  {service.kpis.map((kpi, index) => (
                    <li key={index} className="text-[var(--color-subtext)] flex items-start gap-2">
                      <span className="text-[var(--color-primary)]">•</span>
                      <span>{kpi}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prezzo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-heading text-3xl font-bold text-[var(--color-text)] mb-4">
              Investimento
            </h3>
            <div className="bg-[var(--color-primary)] text-white rounded-[var(--radius-card)] p-8 inline-block">
              <div className="text-4xl font-bold mb-2">
                Da €{service.priceFrom.toLocaleString('it-IT')}
                {'monthlyFee' in service && service.monthlyFee && (
                  <span className="text-2xl"> + €{service.monthlyFee.toLocaleString('it-IT')}/mese</span>
                )}
              </div>
              <p className="text-sm opacity-90">
                {'monthlyFee' in service && service.monthlyFee ? 'Setup iniziale + monitoraggio mensile' : 'Servizio completo'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Correlati */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle title="Case Study correlati" centered />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {relatedCases.map((caseItem, index) => (
                <Card
                  key={index}
                  title={caseItem.title}
                  variant="case"
                  href={`/case-study/${caseItem.slug}`}
                >
                  <p className="text-sm text-[var(--color-subtext)]">{caseItem.context}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionTitle title="Domande frequenti" centered />
            <Accordion items={service.faq} className="mt-8" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-primary)] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Pronto a iniziare?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Prenota una diagnosi gratuita: analizziamo insieme se questo servizio fa per te.
          </p>
          <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
            Prenota diagnosi 30' →
          </CTA>
        </div>
      </section>
    </>
  );
}

