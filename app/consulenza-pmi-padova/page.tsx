import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import CTA from '@/components/CTA';
import Card from '@/components/Card';
import Link from 'next/link';
import JSONLD from '@/components/JSONLD';

export const metadata = generateMetadata({
  title: 'Consulenza PMI Padova – Consulente aziendale per organizzazione, KPI e crescita | Enrico Rizzi',
  description: 'Consulente aziendale per PMI di Padova e provincia. Organizzazione completa con ruoli chiari, KPI e processi stabili. Esperienza su manifatturiero, servizi e commercio padovano. Caso reale: +25% fatturato in 6 mesi. Check-up gratuito a Padova.',
  path: '/consulenza-pmi-padova',
  keywords: 'consulente aziendale Padova, consulenza PMI Padova, consulente Padova, organizzazione aziendale Padova, KPI PMI Padova',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Enrico Rizzi - Consulente PMI Padova',
  description: 'Consulenza organizzazione aziendale, KPI e controllo di gestione per PMI di Padova',
  url: `${baseUrl}/consulenza-pmi-padova`,
  areaServed: {
    '@type': 'City',
    name: 'Padova',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Padova',
    addressRegion: 'PD',
    addressCountry: 'IT',
  },
};

export default function ConsulenzaPMIPadovaPage() {
  return (
    <>
      <JSONLD data={localBusinessSchema} />
      
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Consulente Aziendale Padova – Come Aumentare Fatturato e Organizzare Meglio
            </h1>
            <p className="text-xl md:text-2xl opacity-95">
              Ti aiuto a migliorare la produttività dei dipendenti e mettere ordine nella tua azienda padovana. In 90 giorni organizzazione chiara, in 6 mesi vedi i numeri concreti.
            </p>
          </div>
        </div>
      </section>

      {/* Contesto Locale */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Consulenza PMI a Padova: Conosco le Sfide del Territorio"
              description="Opero a Padova e provincia da oltre 10 anni. Conosco le dinamiche delle PMI locali: manifatturiero avanzato, servizi, commercio, distribuzione."
              centered
            />
            <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed mt-8">
              <p className="mb-4">
                Le PMI di Padova e provincia operano in un contesto competitivo: necessitano di 
                organizzazione solida, KPI chiari e processi efficaci per crescere. Il tessuto 
                imprenditoriale padovano è dinamico ma spesso manca di struttura organizzativa.
              </p>
              <p className="mb-4">
                Il mio metodo OSM si adatta perfettamente alle realtà locali: ho lavorato con 
                aziende manifatturiere, del settore servizi e commerciali del territorio, 
                ottenendo risultati concreti in termini di organizzazione e crescita.
              </p>
              <p>
                <strong>Risultato concreto:</strong> Nel 2024 ho aiutato un'azienda manifatturiera 
                di Padova ad aumentare significativamente il fatturato ottimizzando la rete vendita e 
                implementando KPI mirati. In 90 giorni: ruoli definiti, processi documentati, 
                cruscotto KPI operativo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi per Padova */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Servizi Consulenza per PMI di Padova"
              description="Consulenza productized con output concreti e tempistiche chiare"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {[
                {
                  title: 'Consulenza PMI Padova',
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
              title="Case Study: PMI di Padova che Hanno Ottenuto Risultati"
              description="Esempi concreti di aziende padovane che hanno implementato il metodo OSM"
              centered
            />
            <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-8 border border-[var(--color-line)] mt-8">
              <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
                PMI Manifatturiera Padova – +25% Fatturato con KPI e Organizzazione
              </h3>
              <div className="space-y-3 text-[var(--color-text)]">
                <p><strong>Contesto:</strong> Azienda 45 addetti, crescita rapida ma organizzazione insufficiente, rete vendita poco strutturata.</p>
                <p><strong>Intervento:</strong> Metodo 5 Step: ruoli definiti, KPI implementati (fatturato, marginalità, lead, conversioni), processi vendita ottimizzati, formazione team commerciale.</p>
                <p><strong>Risultati:</strong> +25% fatturato in 6 mesi, tempi consegna ridotti del 30%, soddisfazione clienti aumentata.</p>
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
              title="Domande Frequenti - Consulente Aziendale Padova"
              description="Risposte alle domande più comuni per PMI padovane"
              centered
            />
            <div className="space-y-6 mt-8">
              <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
                <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2">
                  Perché scegliere un consulente aziendale a Padova invece di una figura interna?
                </h3>
                <p className="text-[var(--color-text)]">
                  Un consulente esterno a Padova porta metodo, esperienza su più PMI locali e una visione meno condizionata dalla storia interna. 
                  In molte aziende padovane la figura interna è troppo coinvolta nelle dinamiche quotidiane; con un consulente puoi mettere sul tavolo numeri, ruoli e priorità in modo neutrale e strutturato.
                </p>
              </div>
              <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
                <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2">
                  Conosci davvero le realtà produttive della provincia di Padova?
                </h3>
                <p className="text-[var(--color-text)]">
                  Sì, lavoro da anni con PMI manifatturiere, commerciali e di servizi della provincia di Padova. 
                  Ho seguito aziende in zona industriale padovana e in diversi comuni della provincia. Il metodo è lo stesso, ma gli esempi, i casi e le soluzioni tengono conto del tessuto produttivo locale.
                </p>
              </div>
              <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
                <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2">
                  Come funziona il check-up gratuito per una PMI di Padova?
                </h3>
                <p className="text-[var(--color-text)]">
                  Per le PMI di Padova il check-up gratuito può essere fatto via Zoom (60 minuti) o in presenza (90 minuti). 
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
            Pronto a organizzare la tua PMI di Padova?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Prenota un Check-up gratuito: 60' via Zoom o 90' in presenza a Padova. 
            Analizziamo insieme numeri e criticità della tua azienda.
          </p>
          <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
            Prenota Check-up Gratuito →
          </CTA>
          <p className="text-sm mt-6 opacity-75">
            Opero anche a Venezia e Rovigo. <Link href="/consulenza-pmi-venezia" className="underline">Vedi servizi Venezia</Link> o <Link href="/consulenza-pmi-rovigo" className="underline">Rovigo</Link>
          </p>
        </div>
      </section>
    </>
  );
}













