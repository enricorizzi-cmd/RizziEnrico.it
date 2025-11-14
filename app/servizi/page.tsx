import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import CTA from '@/components/CTA';
import Link from 'next/link';
import JSONLD from '@/components/JSONLD';

export const metadata = generateMetadata({
  title: 'Servizi di consulenza aziendale per PMI in Veneto – Organizzazione, KPI, digitalizzazione | Enrico Rizzi',
  description: 'Servizi di consulenza aziendale per PMI venete: Consulenza PMI continuativa, Organizzazione & Mansionari, KPI & Controllo di Gestione, Sviluppo Persone & Leadership, Digitalizzazione & Automazioni. Output concreti, tempistiche chiare, prezzi trasparenti.',
  path: '/servizi',
  keywords: 'servizi consulenza aziendale PMI Veneto, organizzazione aziendale PMI Veneto, consulenza PMI continuativa, organizzazione mansionari, KPI controllo gestione, sviluppo persone leadership, digitalizzazione PMI, automazioni PMI',
});

const services = [
  {
    slug: 'consulenza-pmi',
    title: 'Consulenza PMI',
    summary: 'Continuità operativa e passaggio generazionale. Organizzazione completa della tua azienda.',
    price: 'a partire da 700€',
    deliverables: ['Analisi organizzativa completa', 'Piano di intervento 90-180 giorni', 'Affiancamento settimanale'],
  },
  {
    slug: 'organizzazione-mansionari',
    title: 'Organizzazione & Mansionari',
    summary: 'Standard OSM: ruoli chiari, responsabilità definite, mansionari allineati agli obiettivi.',
    price: 'a partire da 700€',
    deliverables: ['Mansionari per tutte le posizioni', 'Definizione ruoli e responsabilità', 'Organigramma aggiornato'],
  },
  {
    slug: 'sviluppo-persone',
    title: 'Sviluppo Persone & Leadership',
    summary: 'Formazione mirata, coaching manageriale, team building strutturato per massimizzare il potenziale.',
    price: 'a partire da 700€',
    deliverables: ['Percorsi formativi personalizzati', 'Coaching 1-to-1 per manager', 'Team building con obiettivi chiari'],
  },
  {
    slug: 'kpi-controllo-gestione',
    title: 'KPI & Controllo di Gestione',
    summary: 'Dashboard mensili, alert automatici, piano di azione sugli scostamenti. Controllo semplice ma efficace.',
    price: 'a partire da 700€',
    deliverables: ['Dashboard KPI con 12-15 indicatori', 'Alert su scostamenti', 'Review mensile + piano azione'],
  },
  {
    slug: 'digitalizzazione-automazioni',
    title: 'Digitalizzazione & Automazioni per PMI',
    summary: 'Digitalizzazione pratica dei processi chiave: niente progetti IT infiniti, ma strumenti semplici per togliere carta, doppie registrazioni e lavori ripetitivi.',
    price: 'Da definire su preventivo',
    deliverables: [
      'Mappa dei flussi critici (ordini, offerte, interventi, magazzino, amministrazione)',
      'Scelta degli strumenti digitali minimi (gestionale, CRM, fogli condivisi, tool collaborativi, automazioni)',
      'Implementazione guidata e formazione al team',
      'Piano di miglioramento a 90–180 giorni',
    ],
  },
];

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

// BreadcrumbList schema per pagina servizi
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Servizi',
      item: `${baseUrl}/servizi`,
    },
  ],
};

// Schema JSON-LD Service per pagina servizi
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Consulenza Aziendale per PMI',
  provider: {
    '@type': 'Person',
    name: 'Enrico Rizzi',
    jobTitle: 'Consulente OSM',
    email: 'info@rizzienrico.it',
    telephone: '+393475290564',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Venezia',
    },
    {
      '@type': 'City',
      name: 'Padova',
    },
    {
      '@type': 'City',
      name: 'Rovigo',
    },
    {
      '@type': 'State',
      name: 'Veneto',
    },
  ],
  description: 'Servizi di consulenza per organizzazione, KPI, leadership e controllo di gestione per PMI venete. Consulenza productized con output concreti e tempistiche chiare.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Consulenza PMI',
      description: 'Supporto continuativo per crescita sostenibile e passaggio generazionale',
      price: '700',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '700',
        priceCurrency: 'EUR',
        unitText: 'MONTH',
      },
    },
    {
      '@type': 'Offer',
      name: 'Organizzazione & Mansionari',
      description: 'Ruoli chiari, responsabilità definite, mansionari allineati agli obiettivi',
      price: '700',
      priceCurrency: 'EUR',
    },
    {
      '@type': 'Offer',
      name: 'Sviluppo Persone & Leadership',
      description: 'Formazione mirata, coaching manageriale, team building strutturato',
      price: '700',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '700',
        priceCurrency: 'EUR',
        unitText: 'DAY',
      },
    },
    {
      '@type': 'Offer',
      name: 'KPI & Controllo di Gestione',
      description: 'Dashboard mensili, alert automatici, piano di azione sugli scostamenti',
      price: '700',
      priceCurrency: 'EUR',
    },
  ],
};

export default function ServiziPage() {
  return (
    <>
      <JSONLD data={serviceSchema} />
      <JSONLD data={breadcrumbSchema} />
      <div className="py-16 bg-[var(--color-card)] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
            Servizi Consulenza Aziendale per Migliorare la Tua Azienda
          </h1>
          <p className="text-xl text-[var(--color-subtext)] max-w-3xl mx-auto">
            Ti aiuto a <strong>aumentare il fatturato</strong>, <strong>migliorare la produttività dei dipendenti</strong> e <strong>mettere ordine</strong> nella tua azienda familiare. 
            Output concreti, tempistiche chiare, investimento trasparente. Consulente aziendale Padova, Venezia, Rovigo.
          </p>
        </div>

        {/* Box "In breve" */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-[var(--radius-card)] p-6 border-2 border-[var(--color-primary)] shadow-md">
            <h2 className="font-heading text-xl font-bold text-[var(--color-primary)] mb-3">
              In breve
            </h2>
            <p className="text-[var(--color-text)] leading-relaxed">
              La consulenza PMI di Enrico Rizzi è pensata per le piccole e medie imprese venete che vogliono passare da gestione "a sensazione" a gestione per numeri. 
              Lavoriamo su organizzazione, KPI e persone per aumentare fatturato, marginalità e produttività nel giro di 6 mesi.
            </p>
          </div>
        </div>

        {/* Lista Servizi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <Card
              key={service.slug}
              title={service.title}
              variant="service"
              href={`/servizi/${service.slug}`}
            >
              <p className="mb-4">{service.summary}</p>
              <div className="space-y-2 mb-4">
                <p className="text-sm font-semibold text-[var(--color-text)]">Include:</p>
                <ul className="text-sm text-[var(--color-subtext)] space-y-1">
                  {service.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-lg font-bold text-[var(--color-primary)] mb-4">
                {service.price}
              </div>
              <CTA href="/contatti" variant="primary" size="base" className="w-full mt-4">
                Richiedi informazioni →
              </CTA>
              <p className="text-xs text-[var(--color-subtext)] mt-3 text-center">
                Vuoi approfondire? <Link href={`/servizi/${service.slug}`} className="text-[var(--color-primary)] hover:underline" title={`Dettagli servizio ${service.title}`}>Vedi dettagli</Link> o <Link href="/contatti" className="text-[var(--color-primary)] hover:underline" title="Contatta Enrico Rizzi per informazioni">contattami</Link>. Scopri anche <Link href="/metodo" className="text-[var(--color-primary)] hover:underline" title="Il metodo OSM per organizzare la tua PMI">il metodo</Link> che applico.
              </p>
            </Card>
          ))}
        </div>

        {/* Info Digitalizzazione */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
            <p className="text-sm text-[var(--color-subtext)] text-center">
              Vuoi capire da dove partire con la digitalizzazione della tua PMI?{' '}
              <Link href="/contatti" className="text-[var(--color-primary)] hover:underline font-semibold" title="Prenota un check-up gratuito">
                Prenota il Check-up gratuito →
              </Link>
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-[var(--radius-card)] p-8 border border-[var(--color-line)]">
          <h2 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-4">
            Non Sai Come Organizzare Meglio la Tua Azienda?
          </h2>
          <p className="text-[var(--color-subtext)] mb-6">
            Prenota un check-up gratuito di 60 minuti. Analizziamo insieme numeri e criticità della tua azienda,
            ti mostro dove recuperare margini e come migliorare la produttività dei dipendenti.
          </p>
          <CTA href="/contatti" variant="primary" size="large">
            Prenota il Check-up gratuito →
          </CTA>
          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--color-subtext)]">
              Scopri anche: <Link href="/metodo" className="text-[var(--color-primary)] hover:underline font-semibold" title="Il metodo OSM per organizzare la tua PMI">il metodo</Link>, <Link href="/chi-sono" className="text-[var(--color-primary)] hover:underline font-semibold" title="Chi è Enrico Rizzi">chi sono</Link> e <Link href="/case-study" className="text-[var(--color-primary)] hover:underline font-semibold" title="Case study di PMI">case study</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

