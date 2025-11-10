import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import CTA from '@/components/CTA';
import Card from '@/components/Card';
import Link from 'next/link';
import JSONLD from '@/components/JSONLD';

export const metadata = generateMetadata({
  title: 'Consulente PMI Rovigo – Ottimizza la tua azienda con KPI e Processi | Enrico Rizzi',
  description: 'Consulenza organizzazione aziendale per PMI di Rovigo. Metodo OSM: ruoli chiari, KPI, processi efficaci. In 90 giorni ordine, in 6 mesi risultati misurabili. Check-up gratuito.',
  path: '/consulenza-pmi-rovigo',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Enrico Rizzi - Consulente PMI Rovigo',
  description: 'Consulenza organizzazione aziendale, KPI e controllo di gestione per PMI di Rovigo',
  url: `${baseUrl}/consulenza-pmi-rovigo`,
  areaServed: {
    '@type': 'City',
    name: 'Rovigo',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rovigo',
    addressRegion: 'RO',
    addressCountry: 'IT',
  },
};

export default function ConsulenzaPMIRovigoPage() {
  return (
    <>
      <JSONLD data={localBusinessSchema} />
      
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Consulente PMI Rovigo – Organizzazione e KPI per Aziende Venete
            </h1>
            <p className="text-xl md:text-2xl opacity-95">
              Metodo OSM per PMI di Rovigo: in 90 giorni ordine organizzativo, in 6 mesi risultati misurabili
            </p>
          </div>
        </div>
      </section>

      {/* Contesto Locale */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Consulenza PMI a Rovigo: Conosco le Sfide del Territorio"
              description="Opero a Rovigo e provincia da oltre 10 anni. Conosco le dinamiche delle PMI locali: manifatturiero, servizi, commercio, agricoltura."
              centered
            />
            <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed mt-8">
              <p className="mb-4">
                Le PMI di Rovigo e provincia affrontano sfide specifiche: passaggio generazionale, 
                organizzazione in crescita, necessità di misurare performance con KPI chiari. 
                Il tessuto imprenditoriale rodigino è solido ma spesso manca di struttura organizzativa.
              </p>
              <p className="mb-4">
                Il mio metodo OSM si adatta perfettamente alle realtà locali: ho lavorato con 
                aziende manifatturiere, del settore servizi e commerciali del territorio, 
                ottenendo risultati concreti in termini di organizzazione e crescita.
              </p>
              <p>
                <strong>Risultato tipico:</strong> PMI rodigine che in 90 giorni ha definito ruoli, 
                KPI e processi, passando da gestione reattiva a organizzazione proattiva. 
                In 6 mesi: +20% fatturato grazie a vendite più strutturate e processi ottimizzati.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi per Rovigo */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Servizi Consulenza per PMI di Rovigo"
              description="Consulenza productized con output concreti e tempistiche chiare"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {[
                {
                  title: 'Consulenza PMI Rovigo',
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
              title="Case Study: PMI di Rovigo che Hanno Ottenuto Risultati"
              description="Esempi concreti di aziende rodigine che hanno implementato il metodo OSM"
              centered
            />
            <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-8 border border-[var(--color-line)] mt-8">
              <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
                PMI Manifatturiera Rovigo – Passaggio Generazionale Riuscito
              </h3>
              <div className="space-y-3 text-[var(--color-text)]">
                <p><strong>Contesto:</strong> Azienda familiare 35 addetti, passaggio generazionale in corso, organizzazione poco strutturata.</p>
                <p><strong>Intervento:</strong> Metodo 5 Step completo: ruoli definiti, KPI implementati, processi documentati, formazione del nuovo management.</p>
                <p><strong>Risultati:</strong> Continuità operativa garantita, +15% fatturato in 8 mesi, team motivato e allineato.</p>
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
            Pronto a organizzare la tua PMI di Rovigo?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Prenota un Check-up gratuito: 60' via Zoom o 90' in presenza a Rovigo. 
            Analizziamo insieme numeri e criticità della tua azienda.
          </p>
          <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
            Prenota Check-up Gratuito →
          </CTA>
          <p className="text-sm mt-6 opacity-75">
            Opero anche a Padova e Venezia. <Link href="/consulenza-pmi-padova" className="underline">Vedi servizi Padova</Link> o <Link href="/consulenza-pmi-venezia" className="underline">Venezia</Link>
          </p>
        </div>
      </section>
    </>
  );
}


