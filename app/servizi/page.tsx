import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import CTA from '@/components/CTA';
import Link from 'next/link';
import JSONLD from '@/components/JSONLD';

export const metadata = generateMetadata({
  title: 'Servizi Consulenza Aziendale – Come Migliorare Produttività e Organizzazione',
  description: 'Scopri come aumentare il fatturato, migliorare la produttività dei dipendenti e mettere ordine nella tua azienda. Servizi consulenza aziendale Padova, Venezia, Rovigo. Prezzi trasparenti.',
  path: '/servizi',
  keywords: 'servizi consulenza aziendale, migliorare produttività dipendenti, aumentare fatturato azienda, organizzazione aziendale, controllo di gestione, consulente aziendale Padova, consulente aziendale Venezia, consulente aziendale Rovigo, passaggio generazionale azienda',
});

const services = [
  {
    slug: 'consulenza-pmi',
    title: 'Consulenza PMI',
    summary: 'Continuità operativa e passaggio generazionale. Organizzazione completa della tua azienda.',
    price: 'Da €2.500/mese',
    deliverables: ['Analisi organizzativa completa', 'Piano di intervento 90-180 giorni', 'Affiancamento settimanale'],
  },
  {
    slug: 'organizzazione-mansionari',
    title: 'Organizzazione & Mansionari',
    summary: 'Standard OSM: ruoli chiari, responsabilità definite, mansionari allineati agli obiettivi.',
    price: 'Da €1.800',
    deliverables: ['Mansionari per tutte le posizioni', 'Definizione ruoli e responsabilità', 'Organigramma aggiornato'],
  },
  {
    slug: 'sviluppo-persone',
    title: 'Sviluppo Persone & Leadership',
    summary: 'Formazione mirata, coaching manageriale, team building strutturato per massimizzare il potenziale.',
    price: 'Da €1.200/giornata',
    deliverables: ['Percorsi formativi personalizzati', 'Coaching 1-to-1 per manager', 'Team building con obiettivi chiari'],
  },
  {
    slug: 'kpi-controllo-gestione',
    title: 'KPI & Controllo di Gestione',
    summary: 'Dashboard mensili, alert automatici, piano di azione sugli scostamenti. Controllo semplice ma efficace.',
    price: 'Da €1.500 setup + €800/mese',
    deliverables: ['Dashboard KPI con 12-15 indicatori', 'Alert su scostamenti', 'Review mensile + piano azione'],
  },
];

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

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
      price: '2500',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '2500',
        priceCurrency: 'EUR',
        unitText: 'MONTH',
      },
    },
    {
      '@type': 'Offer',
      name: 'Organizzazione & Mansionari',
      description: 'Ruoli chiari, responsabilità definite, mansionari allineati agli obiettivi',
      price: '1800',
      priceCurrency: 'EUR',
    },
    {
      '@type': 'Offer',
      name: 'Sviluppo Persone & Leadership',
      description: 'Formazione mirata, coaching manageriale, team building strutturato',
      price: '1200',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '1200',
        priceCurrency: 'EUR',
        unitText: 'DAY',
      },
    },
    {
      '@type': 'Offer',
      name: 'KPI & Controllo di Gestione',
      description: 'Dashboard mensili, alert automatici, piano di azione sugli scostamenti',
      price: '1500',
      priceCurrency: 'EUR',
    },
  ],
};

export default function ServiziPage() {
  return (
    <>
      <JSONLD data={serviceSchema} />
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

