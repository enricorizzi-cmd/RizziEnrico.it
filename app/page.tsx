import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import CTA from '@/components/CTA';
import Testimonial from '@/components/Testimonial';
import JSONLD from '@/components/JSONLD';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Organizzo la tua PMI per crescere: persone, KPI, processi',
  description: 'In 90 giorni mettiamo ordine. In 6 mesi vedi i numeri. Consulente OSM per PMI in Veneto (Venezia-Rovigo).',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

// JSON-LD per Person e LocalBusiness
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Enrico Rizzi',
  jobTitle: 'Consulente OSM',
  description: 'Consulente OSM per PMI che vogliono crescere con metodo: persone, KPI e processi',
  areaServed: {
    '@type': 'State',
    name: 'Veneto',
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Veneto',
    addressLocality: 'Venezia - Rovigo',
  },
  sameAs: [
    // Aggiungi qui i link a LinkedIn, ecc.
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Enrico Rizzi - Consulenza OSM',
  description: 'Consulenza organizzazione aziendale, KPI e controllo di gestione per PMI',
  areaServed: {
    '@type': 'State',
    name: 'Veneto',
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Veneto',
    addressLocality: 'Venezia - Rovigo',
  },
  url: baseUrl,
};

export default function HomePage() {
  return (
    <>
      <JSONLD data={personSchema} />
      <JSONLD data={localBusinessSchema} />
      <Hero
        h1="Organizzo la tua PMI per crescere: persone, KPI, processi."
        subtitle="In 90 giorni mettiamo ordine. In 6 mesi vedi i numeri."
        primaryCTA={{
          text: 'Prenota diagnosi 30\'',
          href: '/contatti',
        }}
        secondaryCTA={{
          text: 'Scarica KPI Pack',
          href: '/risorse',
        }}
        proofStrip={{
          stats: [
            { label: 'PMI organizzate', value: '25+' },
            { label: 'KPI attivi', value: '100+' },
            { label: 'Anni esperienza', value: '10+' },
          ],
        }}
      />

      {/* Il Metodo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Il Metodo in 5 Step"
            description="Un percorso strutturato che porta da caos a organizzazione: chi, numeri, processi, persone, espansione."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: '1. Chi',
                description: 'Ruoli chiari, mansionari, responsabilità definite.',
              },
              {
                title: '2. Numeri',
                description: 'KPI pratici e dashboard che guidano le scelte.',
              },
              {
                title: '3. Processi',
                description: 'Policy semplici, riunioni efficaci, flussi stabili.',
              },
              {
                title: '4. Persone',
                description: 'Leadership, formazione, incentivi corretti.',
              },
              {
                title: '5. Espansione',
                description: 'Vendite, marketing, partnership sul territorio.',
              },
            ].map((step, index) => (
              <Card
                key={index}
                title={step.title}
                variant="service"
                href="/metodo"
              >
                <p className="text-sm">{step.description}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <CTA href="/metodo" variant="secondary" size="large">
              Scopri il metodo completo →
            </CTA>
          </div>
        </div>
      </section>

      {/* Case Study in evidenza */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Case Study"
            description="PMI che hanno trasformato organizzazione e risultati con metodo e KPI."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                title={`Case Study ${i}`}
                variant="case"
                href="/case-study/case-1"
              >
                <div className="space-y-2 text-sm">
                  <p><strong>Contesto:</strong> PMI manifatturiera 45 addetti</p>
                  <p><strong>Intervento:</strong> Organizzazione + KPI dashboard</p>
                  <p><strong>Risultati:</strong> +X% fatturato, -Y% tempi consegna</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <CTA href="/case-study" variant="secondary" size="large">
              Vedi tutti i Case Study →
            </CTA>
          </div>
        </div>
      </section>

      {/* Servizi */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Servizi"
            description="Consulenza productized con output concreti, tempistiche chiare e investimento trasparente."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Consulenza PMI',
                description: 'Continuità e passaggio generazionale. Organizzazione completa.',
                price: 'Da €X',
              },
              {
                title: 'Organizzazione & Mansionari',
                description: 'Standard OSM: ruoli chiari, responsabilità definite.',
                price: 'Da €Y',
              },
              {
                title: 'Sviluppo Persone & Leadership',
                description: 'Formazione, coaching, team building strutturato.',
                price: 'Da €Z',
              },
              {
                title: 'KPI & Controllo di Gestione',
                description: 'Dashboard mensili, alert scostamenti, piano azione.',
                price: 'Da €W',
              },
            ].map((service, index) => (
              <Card
                key={index}
                title={service.title}
                variant="service"
                href={`/servizi/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <p className="text-sm mb-4">{service.description}</p>
                <div className="text-lg font-bold text-[var(--color-primary)]">
                  {service.price}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonianze Video */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Testimonianze"
            description="Cosa dicono i clienti che hanno implementato il metodo"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: 'Prima gestivamo tutto "a sensazione". Ora abbiamo numeri chiari, processi definiti. In 6 mesi abbiamo recuperato margini che non sapevamo di avere.',
                authorName: 'Mario Rossi',
                role: 'Amministratore Delegato',
                company: 'PMI Manifatturiera',
              },
              {
                quote: 'Il passaggio generazionale era critico. Grazie al metodo, abbiamo mantenuto continuità operativa e migliorato anche l\'organizzazione.',
                authorName: 'Luigi Bianchi',
                role: 'Nuovo AD',
                company: 'Azienda Familiare',
              },
            ].map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-16 bg-[var(--color-primary)] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Pronto a mettere ordine nella tua PMI?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Prenota 30 minuti gratuiti: porta numeri e criticità, ti mostro dove recuperare margini.
          </p>
          <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
            Prenota ora →
          </CTA>
        </div>
      </section>
    </>
  );
}
