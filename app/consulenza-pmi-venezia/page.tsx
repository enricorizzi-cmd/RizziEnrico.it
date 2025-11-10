import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import CTA from '@/components/CTA';
import Card from '@/components/Card';
import Link from 'next/link';
import JSONLD from '@/components/JSONLD';

export const metadata = generateMetadata({
  title: 'Consulente PMI Venezia – Ottimizza la tua azienda con KPI e Processi | Enrico Rizzi',
  description: 'Consulenza organizzazione aziendale per PMI di Venezia. Metodo OSM: ruoli chiari, KPI, processi efficaci. In 90 giorni ordine, in 6 mesi risultati misurabili. Check-up gratuito.',
  path: '/consulenza-pmi-venezia',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Enrico Rizzi - Consulente PMI Venezia',
  description: 'Consulenza organizzazione aziendale, KPI e controllo di gestione per PMI di Venezia',
  url: `${baseUrl}/consulenza-pmi-venezia`,
  areaServed: {
    '@type': 'City',
    name: 'Venezia',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Sertorio Orsato 22',
    addressLocality: 'Venezia',
    addressRegion: 'VE',
    postalCode: '30100',
    addressCountry: 'IT',
  },
};

export default function ConsulenzaPMIVeneziaPage() {
  return (
    <>
      <JSONLD data={localBusinessSchema} />
      
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Consulente PMI Venezia – Organizzazione e KPI per Aziende Venete
            </h1>
            <p className="text-xl md:text-2xl opacity-95">
              Metodo OSM per PMI di Venezia: in 90 giorni ordine organizzativo, in 6 mesi risultati misurabili
            </p>
          </div>
        </div>
      </section>

      {/* Contesto Locale */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Consulenza PMI a Venezia: Conosco le Sfide del Territorio"
              description="Opero a Venezia e provincia da oltre 10 anni. Conosco le dinamiche delle PMI locali: turismo, servizi, manifatturiero, commercio."
              centered
            />
            <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed mt-8">
              <p className="mb-4">
                Le PMI di Venezia e provincia operano in un contesto unico: turismo, servizi, 
                manifatturiero e commercio. Necessitano di organizzazione solida, KPI chiari 
                e processi efficaci per competere e crescere. Il tessuto imprenditoriale veneziano 
                è ricco ma spesso manca di struttura organizzativa.
              </p>
              <p className="mb-4">
                Il mio metodo OSM si adatta perfettamente alle realtà locali: ho lavorato con 
                aziende del settore servizi, manifatturiero e commerciali del territorio, 
                ottenendo risultati concreti in termini di organizzazione e crescita.
              </p>
              <p>
                <strong>Risultato tipico:</strong> PMI veneziana che in 90 giorni ha definito ruoli, 
                KPI e processi, passando da gestione reattiva a organizzazione proattiva. 
                In 6 mesi: +20% fatturato grazie a processi ottimizzati e team più efficace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi per Venezia */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Servizi Consulenza per PMI di Venezia"
              description="Consulenza productized con output concreti e tempistiche chiare"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {[
                {
                  title: 'Consulenza PMI Venezia',
                  description: 'Supporto continuativo per crescita sostenibile. Organizzazione completa con ruoli, KPI e processi.',
                  href: '/servizi/consulenza-pmi',
                },
                {
                  title: 'Organizzazione & Mansionari',
                  description: 'Ruoli chiari, responsabilità definite, mansionari allineati agli obiettivi.',
                  href: '/servizi/organizzazione-mansionari',
                },
                {
                  title: 'KPI & Controllo di Gestione',
                  description: 'Dashboard mensili, alert automatici, decisioni basate sui numeri.',
                  href: '/servizi/kpi-controllo-gestione',
                },
                {
                  title: 'Sviluppo Persone & Leadership',
                  description: 'Formazione mirata, coaching manageriale, team building strutturato.',
                  href: '/servizi/sviluppo-persone',
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  title={service.title}
                  variant="service"
                  href={service.href}
                >
                  <p className="text-sm">{service.description}</p>
                  <p className="text-sm mt-3">
                    <Link href={service.href} className="text-[var(--color-primary)] hover:underline font-semibold">
                      Scopri di più →
                    </Link>
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Locale */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Case Study: PMI di Venezia che Hanno Ottenuto Risultati"
              description="Esempi concreti di aziende veneziane che hanno implementato il metodo OSM"
              centered
            />
            <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-8 border border-[var(--color-line)] mt-8">
              <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
                PMI Servizi Venezia – Organizzazione e Processi Efficaci
              </h3>
              <div className="space-y-3 text-[var(--color-text)]">
                <p><strong>Contesto:</strong> Azienda servizi 30 addetti, crescita rapida ma organizzazione insufficiente, processi poco definiti.</p>
                <p><strong>Intervento:</strong> Metodo 5 Step: ruoli definiti, KPI implementati, processi documentati, riunioni strutturate, formazione team.</p>
                <p><strong>Risultati:</strong> Efficienza +20%, tempi morti -40%, soddisfazione clienti aumentata, team più motivato.</p>
              </div>
              <div className="mt-6">
                <Link href="/case-study" className="text-[var(--color-primary)] hover:underline font-semibold">
                  Vedi tutti i case study →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-primary)] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Pronto a organizzare la tua PMI di Venezia?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Prenota un Check-up gratuito: 60' via Zoom o 90' in presenza a Venezia. 
            Analizziamo insieme numeri e criticità della tua azienda.
          </p>
          <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
            Prenota Check-up Gratuito →
          </CTA>
          <p className="text-sm mt-6 opacity-75">
            Opero anche a Padova e Rovigo. <Link href="/consulenza-pmi-padova" className="underline">Vedi servizi Padova</Link> o <Link href="/consulenza-pmi-rovigo" className="underline">Rovigo</Link>
          </p>
        </div>
      </section>
    </>
  );
}



