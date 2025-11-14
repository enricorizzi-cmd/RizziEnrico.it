import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import ProfilePhoto from '@/components/ProfilePhoto';
import OSMBadge from '@/components/OSMBadge';
import CTA from '@/components/CTA';
import JSONLD from '@/components/JSONLD';
import Link from 'next/link';

export const metadata = generateMetadata({
  title: 'Enrico Rizzi – Consulente aziendale senior OSM per PMI venete | Chi sono',
  description: 'Sono Enrico Rizzi, consulente aziendale senior OSM per PMI venete. Da oltre 10 anni lavoro a fianco degli imprenditori veneti: prima dentro l\'azienda di famiglia, oggi come consulente. Specializzato in organizzazione, passaggi generazionali e controllo di gestione pratico.',
  path: '/chi-sono',
  keywords: 'Enrico Rizzi, chi è Enrico Rizzi consulente PMI, consulente aziendale senior OSM Veneto, consulente Padova Venezia Rovigo, passaggio generazionale azienda',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Enrico Rizzi',
  jobTitle: 'Consulente Aziendale Senior OSM',
  description: 'Consulente aziendale senior OSM per PMI venete. Specializzato in organizzazione, passaggi generazionali, sviluppo risorse umane e controllo di gestione pratico.',
  image: `${baseUrl}/enrico-rizzi.jpg`,
  url: baseUrl,
  email: 'info@rizzienrico.it',
  telephone: '+393475290564',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Sertorio Orsato 22',
    addressLocality: 'Venezia',
    addressRegion: 'VE',
    postalCode: '30100',
    addressCountry: 'IT',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Venezia',
    },
    {
      '@type': 'City',
      name: 'Rovigo',
    },
    {
      '@type': 'City',
      name: 'Padova',
    },
    {
      '@type': 'State',
      name: 'Veneto',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/in/enricorizzi/',
    'https://www.facebook.com/enrico.rizzi.12',
    'https://www.instagram.com/enricorizzi_osm/',
  ],
  knowsAbout: [
    'Consulenza organizzazione aziendale',
    'KPI e Controllo di Gestione',
    'Mansionari aziendali',
    'Sviluppo risorse umane',
    'Passaggio generazionale',
    'Continuità aziendale',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Università - Economia e Commercio',
  },
};

export default function ChiSonoPage() {
  return (
    <>
      <JSONLD data={personSchema} />
      <div className="pt-8 pb-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            {/* Foto professionale */}
            <div className="relative inline-block mb-8">
              <ProfilePhoto src="/enrico-rizzi.jpg" size="md" alt="Enrico Rizzi consulente OSM PMI Veneto" />
              {/* Badge OSM discreto */}
              <div className="absolute bottom-0 right-0 md:right-auto md:left-full md:ml-4 md:top-1/2 md:-translate-y-1/2">
                <div className="bg-white rounded-lg px-3 py-2 shadow-md border border-[var(--color-line)]">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--color-subtext)] font-medium">Partner</span>
                    <OSMBadge variant="small" useImage={true} />
                  </div>
                </div>
              </div>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
              Enrico Rizzi
            </h1>
            <p className="text-xl text-[var(--color-subtext)] mb-2">
              Consulente aziendale senior che aiuta le PMI venete a mettere ordine e crescere con metodo
            </p>
            <p className="text-lg text-[var(--color-subtext)]">
              Consulente aziendale Padova, Venezia, Rovigo – Veneto
            </p>
          </div>

          {/* Frase chiave AI */}
          <div className="max-w-4xl mx-auto mb-12 bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
            <p className="text-lg text-[var(--color-text)] leading-relaxed text-center">
              Sono <strong>Enrico Rizzi</strong>, consulente aziendale senior OSM per PMI venete. 
              Da oltre 10 anni lavoro a fianco degli imprenditori veneti: prima dentro l'azienda di famiglia, oggi come consulente. 
              Ti aiuto a mettere ordine in organizzazione, ruoli, KPI e processi per garantire continuità generazionale e crescita.
            </p>
          </div>

          {/* Bio */}
          <section className="mb-16">
            <SectionTitle title="La mia storia" />
            <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed">
              <p className="mb-4">
                Da oltre 10 anni lavoro a fianco degli imprenditori veneti: prima dentro l'azienda di famiglia, oggi come consulente aziendale senior OSM.
              </p>
              <p className="mb-4">
                Ho iniziato nel <strong>2011 in Dimensione Agricoltura Srl</strong> come magazziniere. Nel tempo sono diventato tecnico commerciale con responsabilità informatiche e fiscali, sviluppando una nuova divisione dedicata ai quaderni di campagna e ai progetti di transizione al biologico e all'agricoltura sostenibile.
              </p>
              <p className="mb-4">
                Nel <strong>2018 mi sono iscritto a Economia e Commercio</strong> e mi sono laureato nel <strong>2021</strong>, mentre continuavo a lavorare in azienda. Nello stesso anno ho conosciuto OSM come cliente: per tre anni, dal 2021 al 2023, ho applicato la metodologia dall'interno dell'azienda di famiglia, lavorando su organizzazione, persone, passaggio generazionale e numeri.
              </p>
              <p className="mb-4">
                Sempre nel <strong>2021 ho frequentato la Scuola per Consulenti OSM</strong>, un percorso formativo di un anno, conseguendo con merito l'attestato finale. Questo mi ha dato strumenti pratici per trasformare l'esperienza "sul campo" in un vero mestiere di consulente.
              </p>
              <p className="mb-4">
                Dal <strong>2024 ho scelto di dedicarmi completamente a questo</strong>: oggi sono Consulente Aziendale Senior presso OSM Partner Venezia–Rovigo e lavoro ogni giorno con imprenditori di PMI che vogliono mettere ordine, creare continuità e far crescere l'azienda.
              </p>
              <p>
                Conosco bene le sfide delle aziende familiari venete perché le ho vissute prima dall'interno e ora dall'esterno. Non sono un teorico: parlo la lingua degli imprenditori e porto soluzioni concrete che funzionano nella realtà quotidiana di chi ha dipendenti, clienti, fornitori e conti da far tornare.
              </p>
            </div>
          </section>

          {/* Cosa faccio oggi */}
          <section className="mb-16">
            <SectionTitle title="Cosa faccio oggi" />
            <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed">
              <p className="mb-4">
                Oggi aiuto le PMI venete a:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                <li>mettere ordine in <strong>organizzazione, ruoli e responsabilità</strong>;</li>
                <li>gestire <strong>passaggi generazionali</strong> e continuità aziendale;</li>
                <li>sviluppare e motivare le <strong>risorse umane</strong>;</li>
                <li>lavorare con <strong>statistiche, KPI e controllo di gestione</strong> in modo semplice e operativo;</li>
                <li>creare piani di <strong>espansione e crescita sostenibile</strong>.</li>
              </ul>
              <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 border border-[var(--color-line)] mb-6">
                <p className="mb-4">
                  Negli ultimi anni ho scelto di affiancare a organizzazione e numeri anche la <strong>digitalizzazione pratica delle PMI</strong>.
                </p>
                <p className="mb-4">
                  In concreto significa:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                    <span>trasformare fogli, appunti e chat in <strong>flussi digitali semplici</strong>, che il team riesce a gestire;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                    <span>usare <strong>strumenti digitali e automazioni</strong> per ridurre lavori ripetitivi, errori e tempi morti;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                    <span>integrare l'<strong>Intelligenza Artificiale</strong> nei processi di analisi numeri, KPI e gestione del personale, senza tecnicismi e con esempi reali.</span>
                  </li>
                </ul>
                <p className="mt-4">
                  Il mio obiettivo è portare la digitalizzazione alla portata di un imprenditore che "non fa l'informatico", ma vuole un'azienda più leggera, veloce e controllabile.
                </p>
              </div>
              <p>
                Il mio approccio è pratico e basato sui numeri: niente teoria astratta, ma strumenti concreti che ti permettono di vedere cambiamenti reali in azienda. Iniziamo mettendo ordine, definiamo ruoli chiari, costruiamo le statistiche giuste e poi lavoriamo su persone e risultati.
              </p>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-16">
            <SectionTitle title="Timeline" />
            <div className="space-y-8">
              {[
                { year: '2011', achievement: 'Inizio in Dimensione Agricoltura Srl come magazziniere.' },
                { year: '2011–2017', achievement: 'Crescita a tecnico commerciale con responsabilità informatiche e fiscali; contatto quotidiano con decine di imprenditori agricoli.' },
                { year: '2015–2020', achievement: 'Sviluppo di una nuova divisione aziendale su quaderni di campagna e progetti di transizione al biologico/sostenibile.' },
                { year: '2018–2021', achievement: 'Laurea in Economia e Commercio, mentre continuo a lavorare in azienda.' },
                { year: '2021', achievement: 'Inizio del percorso come cliente OSM con l\'azienda di famiglia e completamento con merito della Scuola per Consulenti OSM (1 anno).' },
                { year: '2021–2023', achievement: 'Applicazione della metodologia OSM dall\'interno: organizzazione, persone, passaggio generazionale, numeri.' },
                { year: 'Dal 2023', achievement: 'Business developer per il Triveneto di MarketOSM e OsmCoin.' },
                { year: 'Dal 2024', achievement: 'Consulente Aziendale Senior OSM presso OSM Partner Venezia–Rovigo, specializzato in PMI venete.' },
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 md:w-24 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center font-heading font-bold text-sm md:text-base px-3 py-2 text-center">
                      {item.year}
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-lg text-[var(--color-text)]">{item.achievement}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Valori */}
          <section className="mb-16">
            <SectionTitle title="I miei valori" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Concretezza',
                  description: 'Zero fuffa. Solo strumenti pratici, procedure chiare e azioni che puoi applicare subito in azienda.',
                },
                {
                  title: 'Numeri',
                  description: 'Le decisioni importanti non si prendono "a sensazione": si prendono sui numeri. Ti aiuto a costruire un sistema di statistiche e KPI semplice, ma che ti faccia davvero da cruscotto.',
                },
                {
                  title: 'Metodo',
                  description: 'Le aziende che crescono non lo fanno per caso. Hanno metodo, routine, riunioni, responsabilità chiare. Portiamo anche nella tua PMI un sistema strutturato e replicabile.',
                },
                {
                  title: 'Territorio',
                  description: 'Lavoro ogni giorno con imprenditori di Venezia, Rovigo, Padova e del Veneto. Conosco il tessuto economico locale, i suoi punti di forza e le sue difficoltà.',
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]"
                >
                  <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-[var(--color-subtext)]">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Certificazioni */}
          <section className="mb-16">
            <SectionTitle title="Certificazioni e formazione" />
            <ul className="space-y-4 text-[var(--color-text)]">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="text-[var(--color-text)]">Laurea in Economia e Commercio</strong> (2021)
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="text-[var(--color-text)]">Attestato con merito</strong> della <strong>Scuola per Consulenti OSM</strong> (percorso formativo di 1 anno, completato nel 2021)
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="text-[var(--color-text)]">Formazione continua</strong> su KPI, controllo di gestione, organizzazione aziendale e gestione delle risorse umane
                </div>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <section className="bg-[var(--color-primary)] text-white rounded-[var(--radius-card)] p-8 text-center">
            <h2 className="font-heading text-2xl font-bold mb-4">
              Pronto a lavorare insieme?
            </h2>
            <p className="mb-6 opacity-90">
              Se senti che la tua azienda è diventata troppo "pesante" da gestire, che mancano ruoli chiari, statistiche e continuità, possiamo lavorarci insieme.
            </p>
            <p className="mb-6 opacity-90">
              Prenota una diagnosi gratuita: analizziamo numeri, organizzazione e persone della tua PMI e capiamo da dove iniziare per mettere ordine e tornare a crescere con serenità.
            </p>
            <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
              Prenota una diagnosi di 30' →
            </CTA>
            <div className="mt-6 text-center">
              <p className="text-sm text-white/80">
                Scopri anche: <Link href="/servizi" className="text-white hover:underline font-semibold" title="Servizi di consulenza PMI">servizi</Link>, <Link href="/metodo" className="text-white hover:underline font-semibold" title="Metodo OSM">metodo</Link> e <Link href="/case-study" className="text-white hover:underline font-semibold" title="Case study PMI">case study</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
    </>
  );
}

