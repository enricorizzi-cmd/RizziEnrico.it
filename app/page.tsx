import Hero from '@/components/Hero';
import JSONLD from '@/components/JSONLD';
import { generateMetadata } from '@/lib/seo';

// New Components
import HomeWhyChoose from '@/components/home/HomeWhyChoose';
import HomeMethod from '@/components/home/HomeMethod';
import HomeCaseStudy from '@/components/home/HomeCaseStudy';
import HomeProfile from '@/components/home/HomeProfile';
import HomeServices from '@/components/home/HomeServices';
import HomeContact from '@/components/home/HomeContact';
import HomeTestimonials from '@/components/home/HomeTestimonials';
import HomeLocalSEO from '@/components/home/HomeLocalSEO';
import HomeBio from '@/components/home/HomeBio';
import HomeStats from '@/components/home/HomeStats';
import HomeFAQ from '@/components/home/HomeFAQ';

export const metadata = generateMetadata({
  title: 'Consulente aziendale PMI Veneto – Aumenta fatturato e organizza la tua azienda | Enrico Rizzi',
  description: 'Consulente aziendale per PMI venete (Venezia, Padova, Rovigo). In 90 giorni mettiamo ordine su ruoli, KPI e processi, in 6 mesi vedi numeri concreti su fatturato e produttività. Check-up gratuito.',
  keywords: 'consulente aziendale PMI Veneto, aumentare fatturato azienda, migliorare produttività dipendenti, organizzare meglio azienda, consulente Padova, consulente Venezia, consulente Rovigo, azienda familiare Veneto, passaggio generazionale azienda, controllo di gestione, KPI aziendali, organizzazione aziendale',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

// JSON-LD per Person e LocalBusiness
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Enrico Rizzi',
  jobTitle: 'Consulente aziendale OSM per PMI',
  description: 'Consulente aziendale OSM specializzato in PMI venete (Venezia, Padova, Rovigo). Aiuta le aziende familiari a mettere ordine in ruoli, KPI e processi per aumentare fatturato e produttività.',
  image: `${baseUrl}/enrico-rizzi.jpg`,
  url: baseUrl,
  worksFor: {
    '@type': 'Organization',
    name: 'Open Source Management (OSM)',
    url: 'https://www.opensourcemanagement.it',
  },
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
    'https://www.linkedin.com/in/enricorizzi/',
    'https://www.facebook.com/enrico.rizzi.12',
    'https://www.instagram.com/enricorizzi_osm/',
    'https://www.osmpartnervenezia.it',
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Enrico Rizzi - Consulente aziendale PMI Veneto',
  description: 'Consulenza aziendale per PMI venete (Venezia, Padova, Rovigo). Organizzazione, KPI e controllo di gestione per aumentare fatturato e produttività.',
  image: `${baseUrl}/enrico-rizzi.jpg`,
  url: baseUrl,
  areaServed: ['Venezia', 'Padova', 'Rovigo', 'Veneto', 'Italia'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Sertorio Orsato 22',
    addressLocality: 'Venezia',
    addressRegion: 'Veneto',
    postalCode: '30100',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '45.4408',
    longitude: '12.3155',
  },
  telephone: '+39 347 529 0564',
  email: 'info@rizzienrico.it',
  priceRange: '$$$',
  openingHours: 'Mo-Fr 09:00-18:00',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  sameAs: [
    'https://www.linkedin.com/in/enricorizzi/',
    'https://www.facebook.com/enrico.rizzi.12',
    'https://www.instagram.com/enricorizzi_osm/',
    'https://www.osmpartnervenezia.it',
  ],
};

// BreadcrumbList schema per homepage (migliora navigazione SEO)
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
  ],
};

// Schema FAQPage
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quanto costa una consulenza aziendale per PMI venete?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I miei interventi partono a partire da 700€. Il primo check-up di 60 minuti su Zoom o 90 minuti in presenza è gratuito.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto tempo serve per vedere risultati concreti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In 90 giorni mettiamo ordine con ruoli chiari, controllo di gestione e processi definiti. In 6 mesi vedi i numeri concreti: aumento fatturato, miglioramento produttività dipendenti, organizzazione efficace. Ogni intervento è personalizzato, quindi i tempi possono variare in base alla complessità della tua azienda.',
      },
    },
    {
      '@type': 'Question',
      name: 'Come posso aumentare il fatturato della mia azienda in Veneto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lavoriamo su organizzazione, KPI e controllo di gestione. In 90 giorni mettiamo ordine su ruoli e numeri, in 6 mesi vediamo risultati concreti su fatturato, marginalità e tempi di consegna.',
      },
    },
    {
      '@type': 'Question',
      name: 'Come può una PMI veneta migliorare la produttività dei dipendenti senza assumere altre persone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Definiamo mansionari chiari, introduciamo KPI di produttività e riunioni brevi a numeri. In questo modo ogni reparto sa cosa deve fare, cosa misurare e con quale obiettivo. I dipendenti sanno cosa fare e perché, aumentando naturalmente la produttività.',
      },
    },
    {
      '@type': 'Question',
      name: 'Come funziona il check-up gratuito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Il check-up è una sessione di 60 minuti via Zoom o 90 minuti in presenza dove analizziamo insieme numeri e criticità della tua azienda. Ti mostro dove recuperare margini, come mettere ordine e migliorare l\'organizzazione. Senza impegno, è l\'occasione per capire se posso aiutarti a raggiungere i tuoi obiettivi.',
      },
    },
    {
      '@type': 'Question',
      name: 'Fate consulenza anche per aziende familiari?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì, ho particolare esperienza con aziende familiari venete. Ti aiuto a gestire meglio il personale, organizzare i processi e, se necessario, gestire il passaggio generazionale. Il metodo si adatta perfettamente alle specificità delle aziende familiari.',
      },
    },
    {
      '@type': 'Question',
      name: 'Consulente aziendale Padova, Venezia, Rovigo: fate interventi anche fuori Veneto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Opero principalmente in Veneto (Venezia, Padova, Rovigo) ma posso valutare interventi in altre regioni del Nord Italia su valutazione caso per caso.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JSONLD data={personSchema} />
      <JSONLD data={localBusinessSchema} />
      <JSONLD data={faqSchema} />
      <JSONLD data={breadcrumbSchema} />

      <Hero
        h1="Come aumentare il fatturato della tua azienda veneta"
        subtitle="Migliora la produttività dei dipendenti e metti ordine nella tua azienda familiare. In 90 giorni organizzazione chiara, in 6 mesi vedi i numeri concreti."
        badge="Consulente Aziendale • Venezia-Padova-Rovigo"
        image="/enrico-rizzi.jpg"
        primaryCTA={{
          text: 'Contattami Ora - Check-up Gratuito',
          href: '/contatti',
        }}
        secondaryCTA={{
          text: 'Scarica Kit KPI',
          href: '/risorse',
        }}
        proofStrip={{
          stats: [
            { label: 'Anni esperienza', value: '10+' },
            { label: 'Partner OSM', value: 'Venezia-Rovigo' },
            { label: 'Consulente Senior', value: 'OSM' },
          ],
        }}
      />

      {/* Frase definizionale AI-ready */}
      <section className="py-8 bg-white border-b border-[var(--color-line)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-[var(--color-text)] text-center leading-relaxed">
              <strong>Enrico Rizzi</strong> è un consulente aziendale senior OSM specializzato in PMI venete (Venezia, Padova, Rovigo).
              Aiuta le aziende familiari a mettere ordine in ruoli, KPI, processi e digitalizzazione per aumentare fatturato e produttività.
            </p>
          </div>
        </div>
      </section>

      <HomeWhyChoose />
      <HomeMethod />
      <HomeCaseStudy />
      <HomeProfile />
      <HomeServices />
      <HomeContact />
      <HomeTestimonials />
      <HomeLocalSEO />
      <HomeBio />
      <HomeStats />
      <HomeFAQ />

      {/* CTA Finale */}
      <section className="py-16 bg-[var(--color-primary)] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Pronto a Mettere Ordine nella Tua Azienda?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Scopri come aumentare il fatturato e migliorare la produttività dei dipendenti.
            Prenota il Check-up gratuito: porta numeri e criticità, ti mostro dove recuperare margini.
          </p>
          <div className="inline-block">
            <a
              href="/contatti"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-[var(--color-primary)] bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Prenota ora →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
