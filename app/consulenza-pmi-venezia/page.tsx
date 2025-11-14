import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import CTA from '@/components/CTA';
import Card from '@/components/Card';
import Link from 'next/link';
import JSONLD from '@/components/JSONLD';

export const metadata = generateMetadata({
  title: 'Consulenza PMI Venezia – Organizza la tua azienda con KPI e processi chiari | Enrico Rizzi',
  description: 'Consulenza PMI a Venezia e provincia: turismo, servizi, manifatturiero, commercio. Metodo OSM, ruoli definiti, KPI chiari, processi documentati. Risultati tipici: +20% fatturato in 6 mesi con organizzazione più solida e team allineato. Check-up gratuito.',
  path: '/consulenza-pmi-venezia',
  keywords: 'consulente aziendale Venezia, consulenza PMI Venezia, consulente Venezia, organizzazione aziendale Venezia, KPI PMI Venezia',
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
              Consulente Aziendale Venezia – Come Aumentare Fatturato e Organizzare Meglio
            </h1>
            <p className="text-xl md:text-2xl opacity-95">
              Ti aiuto a migliorare la produttività dei dipendenti e mettere ordine nella tua azienda veneziana. In 90 giorni organizzazione chiara, in 6 mesi vedi i numeri concreti.
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
              description="Da oltre 10 anni lavoro dentro e a fianco delle PMI venete: prima nell'azienda di famiglia, oggi come consulente aziendale senior OSM."
              centered
            />
            <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed mt-8">
              <p className="mb-4">
                Opero come consulente aziendale a <strong>Venezia e provincia</strong>, aiutando le PMI del territorio a mettere ordine in ruoli, KPI e processi per crescere in modo strutturato.
              </p>
              <p className="mb-4">
                Le PMI di Venezia e provincia operano in un contesto unico: turismo, servizi, 
                manifatturiero e commercio. Necessitano di organizzazione solida, KPI chiari 
                e processi efficaci per competere e crescere. Il tessuto imprenditoriale veneziano 
                è ricco ma spesso manca di struttura organizzativa.
              </p>
              <p className="mb-4">
                Lavoro con aziende del <strong>Porto Marghera</strong>, 
                del <strong>settore turistico</strong> e della <strong>zona industriale di Mestre</strong>. 
                Conosco le specificità del territorio veneziano e le sfide delle PMI che operano in questo contesto unico.
              </p>
              <p className="mb-4">
                Opero come consulente OSM Partner Venezia-Rovigo, fondata nel 1998. Il metodo OSM 
                si adatta perfettamente alle realtà locali: ho lavorato con aziende del settore servizi, 
                manifatturiero e commerciali del territorio, ottenendo risultati concreti in termini di 
                organizzazione e crescita attraverso lo sviluppo delle competenze manageriali e delle risorse umane.
              </p>
              <p className="mb-4">
                <strong>Risultato tipico:</strong> PMI veneziana che in 90 giorni ha definito ruoli, 
                KPI e processi, passando da gestione reattiva a organizzazione proattiva. 
                In 6 mesi: +20% fatturato grazie a processi ottimizzati e team più efficace.
              </p>
              <p>
                Attraverso la <strong>tecnologia I-Profile</strong> e i <strong>corsi di formazione OSM</strong> 
                (Leadership, Vendite, Public Speaking, Gestione Finanziaria), affianco gli imprenditori 
                veneziani nel loro percorso di miglioramento verso la prosperità.
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

      {/* FAQ Locale */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Domande Frequenti - Consulente Aziendale Venezia"
              description="Risposte alle domande più comuni per PMI veneziane"
              centered
            />
            <div className="space-y-6 mt-8">
              <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
                <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2">
                  Fai incontri in presenza anche in centro storico o solo in terraferma?
                </h3>
                <p className="text-[var(--color-text)]">
                  Posso organizzare incontri sia in terraferma (Mestre, Marghera, ecc.) sia, dove ha senso, in centro storico. 
                  Alterniamo incontri in presenza e lavoro da remoto per ottimizzare il tempo di tutti, mantenendo comunque una presenza fisica in azienda nelle fasi più delicate.
                </p>
              </div>
              <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
                <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2">
                  Quanto tempo serve a una PMI veneziana per mettere ordine con KPI e processi?
                </h3>
                <p className="text-[var(--color-text)]">
                  In genere bastano 90 giorni per mettere le basi di ruoli, KPI e processi in una PMI veneziana motivata a cambiare. 
                  I successivi 3–6 mesi servono per consolidare le nuove abitudini, adattare l'organizzazione ai picchi stagionali e rendere il team autonomo nell'uso dei numeri.
                </p>
              </div>
              <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
                <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2">
                  Consulente aziendale Venezia: lavorate anche con aziende del settore turistico?
                </h3>
                <p className="text-[var(--color-text)]">
                  Sì, ho esperienza con PMI del settore turistico veneziano. Il metodo OSM si adatta perfettamente: 
                  organizzazione ruoli, KPI di occupazione e soddisfazione clienti, processi di vendita strutturati. 
                  Anche nel turismo, organizzazione e numeri fanno la differenza.
                </p>
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













