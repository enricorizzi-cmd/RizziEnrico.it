import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import CTA from '@/components/CTA';
import Link from 'next/link';

export const metadata = generateMetadata({
  title: 'Servizi di Consulenza Aziendale per PMI in Veneto – Organizzazione, Leadership, KPI | Enrico Rizzi',
  description: 'Consulenza productized per PMI venete: Organizzazione, Mansionari, Sviluppo Persone, KPI e Controllo di Gestione. Prezzi trasparenti. Area servita: Venezia, Padova, Rovigo.',
  path: '/servizi',
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

export default function ServiziPage() {
  return (
    <div className="py-16 bg-[var(--color-card)] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
            Servizi Consulenza Aziendale per PMI Venete
          </h1>
          <p className="text-xl text-[var(--color-subtext)] max-w-3xl mx-auto">
            Consulenza productized con output concreti, tempistiche chiare e investimento trasparente.
            Ogni servizio ha deliverable definiti, tempi certi e possibilità di richiedere informazioni personalizzate.
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
                Vuoi approfondire? <Link href={`/servizi/${service.slug}`} className="text-[var(--color-primary)] hover:underline">Vedi dettagli</Link> o <Link href="/contatti" className="text-[var(--color-primary)] hover:underline">contattami</Link>
              </p>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-[var(--radius-card)] p-8 border border-[var(--color-line)]">
          <h2 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-4">
            Non sai quale servizio fa per te?
          </h2>
          <p className="text-[var(--color-subtext)] mb-6">
            Prenota una diagnosi gratuita di 30 minuti. Analizziamo insieme numeri e criticità,
            ti mostro dove recuperare margini.
          </p>
          <CTA href="/contatti" variant="primary" size="large">
            Prenota il Check-up gratuito →
          </CTA>
        </div>
      </div>
    </div>
  );
}

