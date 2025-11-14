import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import Testimonial from '@/components/Testimonial';
import ProfilePhoto from '@/components/ProfilePhoto';
import OSMBadge from '@/components/OSMBadge';
import CTA from '@/components/CTA';
import JSONLD from '@/components/JSONLD';

export const metadata = generateMetadata({
  title: 'Chi sono - Consulente Aziendale Veneto che Aiuta a Mettere Ordine | Enrico Rizzi',
  description: 'Consulente aziendale con 10+ anni esperienza. Ti aiuto a aumentare il fatturato, migliorare la produttività e organizzare meglio la tua azienda familiare. Consulente Padova, Venezia, Rovigo.',
  path: '/chi-sono',
  keywords: 'Enrico Rizzi, consulente aziendale Veneto, consulente Padova, consulente Venezia, consulente Rovigo, come aumentare fatturato azienda, migliorare produttività dipendenti, passaggio generazionale azienda',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Enrico Rizzi',
  jobTitle: 'Consulente OSM',
  description: 'Consulente OSM per PMI che vogliono crescere con metodo: persone, KPI e processi',
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
    'Leadership',
    'Passaggio generazionale',
  ],
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
              Consulente Aziendale che Aiuta a Mettere Ordine e Aumentare il Fatturato
            </p>
            <p className="text-lg text-[var(--color-subtext)]">
              Consulente aziendale Padova, Venezia, Rovigo - Veneto
            </p>
          </div>

          {/* Bio */}
          <section className="mb-16">
            <SectionTitle title="La mia storia" />
            <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed">
              <p className="mb-4">
                Da oltre 10 anni aiuto imprenditori veneti a <strong>mettere ordine nella loro azienda</strong> e 
                passare da organizzazione caotica a sistema strutturato orientato ai risultati. Ho lavorato come Consulente Senior 
                in OSM e formatore, specializzandomi in come <strong>migliorare la produttività dei dipendenti</strong> e 
                tecniche di vendita per <strong>aumentare il fatturato</strong>.
              </p>
              <p className="mb-4">
                Conosco bene le sfide delle aziende familiari venete perché le vivo sul campo ogni giorno. 
                Non sono un teorico: parlo la lingua degli imprenditori e offro soluzioni pratiche 
                che funzionano nella realtà aziendale. Ti aiuto a capire <strong>come organizzare meglio la tua azienda</strong>.
              </p>
              <p className="mb-4">
                <strong>Risultato concreto:</strong> Nel 2024 ho aiutato un'azienda manifatturiera 
                di Padova ad <strong>aumentare il fatturato del 25%</strong> migliorando la produttività dei dipendenti, 
                ottimizzando la rete vendita e implementando un sistema di controllo di gestione efficace.
              </p>
              <p>
                Il mio approccio è pratico e basato sui numeri: non teoria, ma strumenti concreti
                che portano risultati misurabili. In 90 giorni mettiamo ordine nella tua azienda, in 6 mesi vedi i numeri concreti.
              </p>
            </div>
          </section>

          {/* Timeline Risultati */}
          <section className="mb-16">
            <SectionTitle title="Timeline Risultati" />
            <div className="space-y-8">
              {[
                { year: '2024', achievement: '25+ PMI organizzate con metodo strutturato' },
                { year: '2023', achievement: '100+ KPI dashboard attive e funzionanti' },
                { year: '2022', achievement: 'Network OSM consolidato in Veneto' },
                { year: '2020-2021', achievement: 'Specializzazione in passaggi generazionali' },
                { year: '2014', achievement: 'Certificazione OSM e inizio consulenza' },
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-heading font-bold">
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
                  description: 'Zero fuffa, solo strumenti pratici che funzionano nella realtà PMI.',
                },
                {
                  title: 'Numeri',
                  description: 'Decisioni basate su dati, non su opinioni o sensazioni.',
                },
                {
                  title: 'Metodo',
                  description: 'Approccio strutturato e replicabile, non improvvisazione.',
                },
                {
                  title: 'Territorio',
                  description: 'Conoscenza profonda del tessuto economico Veneto e delle sue specificità.',
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
            <ul className="space-y-3 text-[var(--color-text)]">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Certificazione OSM - Organizzazione Scientifica del Lavoro</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Formazione continua su KPI e Controllo di Gestione</span>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <section className="bg-[var(--color-primary)] text-white rounded-[var(--radius-card)] p-8 text-center">
            <h2 className="font-heading text-2xl font-bold mb-4">
              Pronto a lavorare insieme?
            </h2>
            <p className="mb-6 opacity-90">
              Prenota una diagnosi gratuita: analizziamo insieme numeri e criticità della tua PMI.
            </p>
            <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
              Prenota diagnosi 30' →
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

