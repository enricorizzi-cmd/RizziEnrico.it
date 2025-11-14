import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import CTA from '@/components/CTA';
import Card from '@/components/Card';
import Link from 'next/link';
import JSONLD from '@/components/JSONLD';

export const metadata = generateMetadata({
  title: 'Consulenza PMI Rovigo – Passaggio generazionale, KPI e organizzazione | Enrico Rizzi',
  description: 'Consulenza PMI a Rovigo e provincia per aziende manifatturiere, servizi, commercio e agricoltura. Focus su passaggio generazionale, KPI e organizzazione. Caso reale: +15% fatturato in 8 mesi e transizione di leadership riuscita. Check-up gratuito a Rovigo.',
  path: '/consulenza-pmi-rovigo',
  keywords: 'consulente aziendale Rovigo, consulenza PMI Rovigo, consulente Rovigo, passaggio generazionale Rovigo, organizzazione aziendale Rovigo',
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
              Consulente Aziendale Rovigo – Come Aumentare Fatturato e Organizzare Meglio
            </h1>
            <p className="text-xl md:text-2xl opacity-95">
              Ti aiuto a migliorare la produttività dei dipendenti e mettere ordine nella tua azienda rodigina. In 90 giorni organizzazione chiara, in 6 mesi vedi i numeri concreti.
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
                Opero come consulente aziendale a Rovigo, lavorando con aziende del <strong>Polesine</strong>, 
                del <strong>settore agricolo e agroalimentare</strong> e della <strong>zona industriale di Rovigo</strong>. 
                Ho particolare esperienza con aziende familiari rodigine che affrontano il passaggio generazionale.
              </p>
              <p className="mb-4">
                Opero come consulente OSM Partner Venezia-Rovigo, fondata nel 1998. Il metodo OSM 
                si adatta perfettamente alle realtà locali: ho lavorato con aziende manifatturiere, 
                del settore servizi e commerciali del territorio, ottenendo risultati concreti in termini di 
                organizzazione e crescita attraverso lo sviluppo delle competenze manageriali e delle risorse umane.
              </p>
              <p className="mb-4">
                <strong>Risultato tipico:</strong> PMI rodigine che in 90 giorni ha definito ruoli, 
                KPI e processi, passando da gestione reattiva a organizzazione proattiva. 
                In 6 mesi: +20% fatturato grazie a vendite più strutturate e processi ottimizzati.
              </p>
              <p>
                Attraverso la <strong>tecnologia I-Profile</strong> e i <strong>corsi di formazione OSM</strong> 
                (Leadership, Vendite, Public Speaking, Gestione Finanziaria), affianco gli imprenditori 
                rodigini nel loro percorso di miglioramento verso la prosperità. La sede OSM Partner Venezia-Rovigo 
                si trova a Lendinara (RO), in P.le Kennedy 8/E.
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

      {/* FAQ Locale */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Domande Frequenti - Consulente Aziendale Rovigo"
              description="Risposte alle domande più comuni per PMI rodigine"
              centered
            />
            <div className="space-y-6 mt-8">
              <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
                <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2">
                  In cosa aiuti concretamente le PMI di Rovigo e provincia?
                </h3>
                <p className="text-[var(--color-text)]">
                  Aiuto le PMI di Rovigo a gestire passaggi generazionali, organizzare meglio ruoli e reparti e introdurre KPI chiari. 
                  Nel territorio rodigino spesso le aziende sono solide ma molto familiari: lavoriamo su struttura, responsabilità, controllo di gestione e crescita sostenibile, senza snaturare l'identità dell'impresa.
                </p>
              </div>
              <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
                <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2">
                  Come gestisci il passaggio generazionale nelle aziende familiari di Rovigo?
                </h3>
                <p className="text-[var(--color-text)]">
                  Parto da una mappatura chiara di ruoli attuali, aspettative della famiglia e obiettivi aziendali. 
                  Applichiamo il metodo in 5 step con particolare attenzione a deleghe, formazione del nuovo management, KPI di controllo e comunicazione interna, così il passaggio non resta solo "annunciato" ma diventa operativo.
                </p>
              </div>
              <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
                <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2">
                  Come funziona il check-up gratuito per una PMI di Rovigo?
                </h3>
                <p className="text-[var(--color-text)]">
                  Per le PMI di Rovigo il check-up gratuito può essere fatto via Zoom (60 minuti) o in presenza (90 minuti, anche presso la sede OSM Partner Venezia-Rovigo a Lendinara). 
                  Analizziamo numeri essenziali, struttura organizzativa, ruoli chiave e problemi principali. Alla fine hai una fotografia chiara di dove stai perdendo tempo, margini e opportunità.
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













