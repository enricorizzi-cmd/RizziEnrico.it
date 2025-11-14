import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import CTA from '@/components/CTA';
import Testimonial from '@/components/Testimonial';
import ProfilePhoto from '@/components/ProfilePhoto';
import OSMBadge from '@/components/OSMBadge';
import IPBadge from '@/components/IPBadge';
import Accordion from '@/components/Accordion';
import JSONLD from '@/components/JSONLD';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Come Organizzare Meglio la Mia Azienda – Consulente Aziendale Veneto | Enrico Rizzi',
  description: 'Scopri come aumentare il fatturato e migliorare la produttività dei dipendenti. Mettere ordine nella tua azienda familiare in Veneto. Check-up gratuito consulenza aziendale Padova, Venezia, Rovigo.',
  keywords: 'come organizzare meglio la mia azienda, migliorare produttività dipendenti, aumentare fatturato azienda, mettere ordine in azienda, consulente aziendale Padova, consulente aziendale Venezia, consulente aziendale Rovigo, azienda familiare Veneto, passaggio generazionale azienda, controllo di gestione, KPI aziendali, organizzazione aziendale',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

// JSON-LD per Person e LocalBusiness
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Enrico Rizzi',
  jobTitle: 'Consulente OSM',
  description: 'Consulente OSM per PMI che vogliono crescere con metodo: persone, KPI e processi',
  image: `${baseUrl}/enrico-rizzi.jpg`,
  url: baseUrl,
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
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Enrico Rizzi - Consulente Organizzazione PMI',
  description: 'Consulenza organizzazione aziendale, KPI e controllo di gestione per PMI in Veneto',
  image: `${baseUrl}/enrico-rizzi.jpg`,
  url: baseUrl,
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
  telephone: '+393475290564',
  email: 'info@rizzienrico.it',
  priceRange: '€€',
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
  ],
};

// Schema FAQPage
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quanto costa una consulenza aziendale?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I servizi partono da €1.200 per interventi mirati. Consulenza continua da €2.500/mese. Offro sempre un check-up gratuito di 60 minuti (Zoom) o 90 minuti (in presenza) per valutare come organizzare meglio la tua azienda senza impegno.',
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
      name: 'Come posso migliorare la produttività dei dipendenti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ti aiuto a definire ruoli chiari, obiettivi misurabili e processi efficaci. Implementiamo un sistema di controllo di gestione che mostra a tutti i risultati e le aree di miglioramento. In questo modo i dipendenti sanno cosa fare e perché, aumentando naturalmente la produttività.',
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
            { label: 'PMI organizzate', value: '25+' },
            { label: 'Anni esperienza', value: '10+' },
            { label: 'Partner OSM', value: 'Venezia-Rovigo' },
          ],
        }}
      />

      {/* Perché Scegliermi */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Perché Scegliere un Consulente Aziendale per la Tua Azienda"
            description="Non sono un consulente generico: conosco le aziende venete e parlo la lingua degli imprenditori. Ti aiuto a mettere ordine e migliorare i risultati."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: "🎯",
                title: "Esperienza in PMI Locali",
                description: "10+ anni con imprenditori veneti. Conosco normative, mentalità e sfide del territorio."
              },
              {
                icon: "⚡",
                title: "Approccio Pratico",
                description: "Niente teoria fine a sé stessa. Soluzioni concrete, misurabili, orientate ai risultati."
              },
              {
                icon: "🔧",
                title: "Soluzioni Personalizzate",
                description: "Non pacchetti standard. Ogni PMI è diversa: analisi su misura e interventi mirati."
              },
              {
                icon: "🤝",
                title: "Affiancamento Continuo",
                description: "Non ti lascio solo dopo il progetto. Supporto sul lungo termine per garantire risultati."
              }
            ].map((point, index) => (
              <Card key={index} title={point.title} variant="service" href="/chi-sono">
                <div className="text-4xl mb-3">{point.icon}</div>
                <p className="text-sm">{point.description}</p>
                <p className="text-sm mt-3">
                  <Link href="/chi-sono" className="text-[var(--color-primary)] hover:underline font-semibold" title="Scopri chi è Enrico Rizzi e la sua esperienza con PMI venete">
                    Scopri di più su Enrico Rizzi →
                  </Link>
                </p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-[var(--color-subtext)]">
              Opero come consulente <strong>OSM Partner Venezia-Rovigo</strong>, fondata nel 1998. 
              Il metodo OSM è stato sviluppato attraverso un costante lavoro di ricerca e sviluppo 
              e grazie al monitoraggio di decine di migliaia di collaboratori all'interno delle aziende italiane. 
              Vuoi conoscere meglio il metodo? <Link href="/metodo" className="text-[var(--color-primary)] hover:underline font-semibold" title="Scopri il metodo OSM per organizzare la tua PMI">Scopri il metodo OSM</Link> o <Link href="/servizi" className="text-[var(--color-primary)] hover:underline font-semibold" title="Vedi tutti i servizi di consulenza PMI">vedi tutti i servizi</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Il Metodo */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Come Organizzare Meglio la Tua Azienda: 5 Step Pratici"
            description="Un percorso strutturato che ti aiuta a mettere ordine: ruoli chiari, numeri che guidano le decisioni, processi efficaci, persone motivate, crescita sostenibile."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: '1. Chi - Ruoli e Responsabilità Chiare',
                description: 'Ruoli chiari, mansionari, responsabilità definite.',
              },
              {
                title: '2. Numeri - KPI e Controllo di Gestione',
                description: 'KPI (Indicatori Chiave di Prestazione) pratici e cruscotto che guidano le scelte.',
              },
              {
                title: '3. Processi - Flussi Efficaci',
                description: 'Policy semplici, riunioni efficaci, flussi stabili.',
              },
              {
                title: '4. Persone - Leadership e Formazione',
                description: 'Leadership, formazione, incentivi corretti.',
              },
              {
                title: '5. Espansione - Vendite e Marketing',
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
                <p className="text-sm mt-3">
                  <Link href="/metodo" className="text-[var(--color-primary)] hover:underline font-semibold">
                    Approfondisci il metodo →
                  </Link>
                </p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <CTA href="/metodo" variant="secondary" size="large">
              Scopri il metodo completo →
            </CTA>
          </div>
          <div className="text-center mt-8">
            <CTA href="/contatti" variant="primary" size="large">
              Applica il Metodo alla Tua PMI - Check-up Gratuito →
            </CTA>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-[var(--color-subtext)]">
              Vuoi vedere esempi concreti? <Link href="/case-study" className="text-[var(--color-primary)] hover:underline font-semibold" title="Case study di PMI che hanno ottenuto risultati">Vedi i case study</Link> o <Link href="/servizi" className="text-[var(--color-primary)] hover:underline font-semibold" title="Scopri i servizi di consulenza">scopri i servizi</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Case Study in evidenza */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Case Study: PMI che Hanno Trasformato Organizzazione e Risultati"
            description="Esempi concreti di PMI venete che hanno ottenuto risultati misurabili con metodo e KPI."
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
                  <p><strong>Intervento:</strong> Organizzazione + cruscotto KPI</p>
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
          <div className="text-center mt-6">
            <p className="text-sm text-[var(--color-subtext)] mb-4">
              Vuoi risultati simili per la tua PMI? 
              <Link href="/contatti" className="text-[var(--color-primary)] hover:underline font-semibold ml-1" title="Prenota un check-up gratuito con Enrico Rizzi">
                Contattami per un check-up gratuito
              </Link> o <Link href="/servizi" className="text-[var(--color-primary)] hover:underline font-semibold ml-1" title="Scopri i servizi di consulenza PMI">
                scopri i servizi disponibili
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* i-Profile Strip */}
      <section className="py-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <IPBadge variant="inline" className="text-white" />
              <span className="text-sm opacity-90">Prodotto di punta</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
              Scopri il tuo profilo attitudinale
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Prendi decisioni sulle persone con più dati e meno rischi. 
              La persona giusta nel posto giusto non è fortuna: è metodo.
            </p>
            <CTA href="/i-profile" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
              Scopri i-Profile →
            </CTA>
          </div>
        </div>
      </section>

      {/* Servizi */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Servizi Consulenza Aziendale per Aziende Venete"
            description="Ti aiuto a migliorare la produttività, implementare controllo di gestione e organizzare meglio la tua azienda. Output concreti, tempistiche chiare, investimento trasparente."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Consulenza PMI – Aumenta Fatturato e Organizza la Tua Azienda',
                description: 'Supporto continuativo per crescita sostenibile. Gestione passaggio generazionale. Organizzazione completa con ruoli, KPI e processi.',
                result: 'Risultato: PMI strutturata, team motivato, numeri in crescita.',
                price: 'Da €2.500/mese',
              },
              {
                title: 'Organizzazione & Mansionari – Ruoli Chiari e Responsabilità Definite',
                description: 'Standard OSM: ruoli chiari, responsabilità definite, mansionari allineati agli obiettivi.',
                result: 'Risultato: organizzazione chiara, meno conflitti, efficienza aumentata.',
                price: 'Da €1.800',
              },
              {
                title: 'Sviluppo Persone & Leadership – Forma un Team Vincente',
                description: 'Formazione mirata, coaching manageriale, team building strutturato per massimizzare il potenziale.',
                result: 'Risultato: team motivato, competenze sviluppate, leadership efficace.',
                price: 'Da €1.200/giornata',
              },
              {
                title: 'KPI & Controllo di Gestione – Decisioni Basate sui Numeri',
                description: 'Dashboard mensili, alert automatici, piano di azione sugli scostamenti. Controllo semplice ma efficace.',
                result: 'Risultato: decisioni informate, problemi individuati tempestivamente, performance migliorate.',
                price: 'Da €1.500 setup + €800/mese',
              },
            ].map((service, index) => (
              <Card
                key={index}
                title={service.title}
                variant="service"
                href={`/servizi/${service.title.toLowerCase().replace(/\s+/g, '-').replace(/[–—]/g, '-')}`}
              >
                <p className="text-sm mb-3">{service.description}</p>
                <p className="text-sm font-semibold text-[var(--color-success)] mb-3">{service.result}</p>
                <div className="text-lg font-bold text-[var(--color-primary)] mb-3">
                  {service.price}
                </div>
                <p className="text-sm">
                  <Link href="/servizi" className="text-[var(--color-primary)] hover:underline font-semibold">
                    Vedi tutti i servizi →
                  </Link>
                </p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <CTA href="/contatti" variant="primary" size="large">
              Quale Servizio Fa per Te? Scoprilo Gratis →
            </CTA>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-[var(--color-subtext)]">
              Non sai quale servizio fa per te? 
              <Link href="/contatti" className="text-[var(--color-primary)] hover:underline font-semibold ml-1" title="Prenota un check-up gratuito per valutare le tue esigenze">
                Prenota un check-up gratuito
              </Link>
              {' '}e analizziamo insieme le tue esigenze. Oppure <Link href="/metodo" className="text-[var(--color-primary)] hover:underline font-semibold ml-1" title="Scopri il metodo OSM per organizzare la tua PMI">
                scopri il metodo
              </Link> che applico.
            </p>
          </div>
        </div>
      </section>

      {/* Form Inline nella Homepage */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto bg-white rounded-[var(--radius-card)] p-8 border border-[var(--color-line)] shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">
              Richiedi Check-up Gratuito
            </h2>
            <p className="text-center text-[var(--color-subtext)] mb-6">
              Compila il form e ti ricontatto entro 24 ore per fissare l'appuntamento
            </p>
            <div className="bg-[var(--color-success)]/10 border border-[var(--color-success)] rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎁</span>
                <div>
                  <strong className="text-[var(--color-success)]">Check-up Gratuito</strong>
                  <p className="text-sm text-[var(--color-subtext)]">Senza impegno • 60 min Zoom o 90 min in presenza</p>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Testimonianze Video */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Testimonianze: Cosa Dicono i Clienti che Hanno Implementato il Metodo"
            description="PMI venete che hanno ottenuto risultati concreti con organizzazione, KPI e metodo strutturato."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                quote: 'Prima rincorrevamo le urgenze. Con ruoli chiari, riunioni a KPI (Indicatori Chiave di Prestazione) e un cruscotto semplice, le consegne sono puntuali e il team sa cosa contare e quando.',
                authorName: 'Direttore Commerciale',
                role: 'Distribuzione ricambi',
                location: 'Padova',
                result: '+25% fatturato, -30% tempi consegna',
              },
              {
                quote: 'La pianificazione settimanale e i KPI di efficienza ci hanno tolto il caos. Oggi sappiamo dove intervenire ogni lunedì mattina.',
                authorName: 'Responsabile Produzione',
                role: 'Alimentare',
                location: 'Venezia',
                result: 'Efficienza +20%, tempi morti -40%',
              },
              {
                quote: 'Il passaggio generazionale non è più un tabù: mansionari, obiettivi e riunioni brevi ci hanno dato continuità e risultati.',
                authorName: 'Amministratore',
                role: 'Lattoneria & Coperture',
                location: 'Rovigo',
                result: 'Continuità operativa garantita',
              },
              {
                quote: 'Agenda interventi, priorità e feedback post-servizio: tempi morti giù e più soddisfazione clienti. Finalmente misuriamo la qualità.',
                authorName: 'Service Manager',
                role: 'Impianti clima/refrigerazione',
                location: 'Padova',
                result: 'Soddisfazione clienti +15%',
              },
            ].map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Local SEO */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4 text-center">
              Consulente Aziendale Padova, Venezia, Rovigo: Dove Opero
            </h2>
            <p className="text-lg text-[var(--color-subtext)] mb-6 text-center">
              Opero in Veneto con focus su Venezia, Padova e Rovigo. Conosco le dinamiche locali delle aziende familiari del territorio e ti aiuto a migliorare organizzazione e risultati concreti.
            </p>
            <ul className="space-y-3 mb-8 max-w-2xl mx-auto">
              <li className="flex items-start gap-3 text-[var(--color-text)]">
                <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Incontri in presenza (Venezia-Padova-Rovigo)</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--color-text)]">
                <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Check-up gratuito: 60' Zoom o 90' in presenza</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--color-text)]">
                <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Esperienza su manifatturiero, servizi, commercio</span>
              </li>
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
              <Link href="/consulenza-pmi-venezia" className="bg-white rounded-[var(--radius-card)] p-4 border border-[var(--color-line)] hover:shadow-md transition-shadow text-center">
                <h3 className="font-heading font-semibold text-[var(--color-text)] mb-2">Consulenza PMI Venezia</h3>
                <p className="text-sm text-[var(--color-subtext)]">Servizi per aziende veneziane</p>
              </Link>
              <Link href="/consulenza-pmi-padova" className="bg-white rounded-[var(--radius-card)] p-4 border border-[var(--color-line)] hover:shadow-md transition-shadow text-center">
                <h3 className="font-heading font-semibold text-[var(--color-text)] mb-2">Consulenza PMI Padova</h3>
                <p className="text-sm text-[var(--color-subtext)]">Servizi per aziende padovane</p>
              </Link>
              <Link href="/consulenza-pmi-rovigo" className="bg-white rounded-[var(--radius-card)] p-4 border border-[var(--color-line)] hover:shadow-md transition-shadow text-center">
                <h3 className="font-heading font-semibold text-[var(--color-text)] mb-2">Consulenza PMI Rovigo</h3>
                <p className="text-sm text-[var(--color-subtext)]">Servizi per aziende rodigine</p>
              </Link>
            </div>
            <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)] max-w-2xl mx-auto">
              <Accordion items={[
                {
                  question: 'Fate interventi anche fuori regione?',
                  answer: 'Sì, su valutazione.',
                },
                {
                  question: 'Quanto tempo serve per iniziare?',
                  answer: 'Dopo il check-up, calendario e piano.',
                },
              ]} />
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Enrico - Foto e Presentazione */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Foto */}
              <div className="md:col-span-1">
                <div className="relative inline-block mx-auto md:mx-0">
                  <ProfilePhoto src="/enrico-rizzi.jpg" size="md" alt="Enrico Rizzi consulente OSM PMI Veneto" />
                  {/* Badge OSM discreto */}
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-lg px-2 py-1 shadow-sm border border-[var(--color-line)]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] text-[var(--color-subtext)] font-medium">Partner</span>
                      <OSMBadge variant="small" useImage={true} />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Testo */}
              <div className="md:col-span-2 text-center md:text-left">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
                  Enrico Rizzi
                </h2>
                <p className="text-lg md:text-xl text-[var(--color-subtext)] mb-4">
                  Consulente OSM per PMI del Veneto
                </p>
                <p className="text-[var(--color-text)] mb-6 leading-relaxed">
                  Da oltre 10 anni aiuto imprenditori veneti a <strong>mettere ordine nella loro azienda</strong> e 
                  passare da organizzazione caotica a sistema strutturato orientato ai risultati. Metodo pratico,
                  numeri misurabili, zero fuffa.
                </p>
                <p className="text-[var(--color-text)] mb-6 leading-relaxed">
                  <strong>Risultato concreto:</strong> Nel 2024 ho aiutato un'azienda manifatturiera 
                  di Padova ad <strong>aumentare il fatturato del 25%</strong> migliorando la produttività dei dipendenti, 
                  ottimizzando la rete vendita e implementando un sistema di controllo di gestione efficace.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
                  <CTA href="/chi-sono" variant="primary">
                    La mia storia →
                  </CTA>
                  <CTA href="/contatti" variant="secondary">
                    Contattami →
                  </CTA>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-subtext)]">
                    <span>Partner</span>
                    <OSMBadge variant="footer" useImage={true} />
                  </div>
                </div>
                <div className="mt-6 text-center md:text-left">
                  <p className="text-sm text-[var(--color-subtext)]">
                    Scopri anche: <Link href="/servizi" className="text-[var(--color-primary)] hover:underline font-semibold" title="Servizi di consulenza PMI">servizi</Link>, <Link href="/metodo" className="text-[var(--color-primary)] hover:underline font-semibold" title="Metodo OSM">metodo</Link> e <Link href="/case-study" className="text-[var(--color-primary)] hover:underline font-semibold" title="Case study PMI">case study</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <CTA href="/contatti" variant="primary" size="large">
              Vuoi Risultati Simili? Contattami Ora →
            </CTA>
          </div>
        </div>
      </section>

      {/* Risultati in Numeri */}
      <section className="py-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "fino a +30%", label: "Aumento fatturato PMI clienti", icon: "📈" },
              { value: "-25%", label: "Riduzione tempi consegna", icon: "⏱️" },
              { value: "90", label: "Giorni per vedere ordine", icon: "📅" },
              { value: "25+", label: "PMI organizzate", icon: "🏢" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Domande Frequenti"
            description="Risposte alle domande più comuni sulla consulenza PMI"
            centered
          />
          <div className="max-w-3xl mx-auto">
            <Accordion items={[
              {
                question: 'Quanto costa una consulenza aziendale?',
                answer: 'I servizi partono da €1.200 per interventi mirati. Consulenza continua da €2.500/mese. Offro sempre un check-up gratuito di 60 minuti (Zoom) o 90 minuti (in presenza) per valutare come organizzare meglio la tua azienda senza impegno.'
              },
              {
                question: 'Come posso aumentare il fatturato della mia azienda?',
                answer: 'Ti aiuto a migliorare la produttività dei dipendenti, ottimizzare i processi e implementare un controllo di gestione efficace. In 90 giorni mettiamo ordine, in 6 mesi vedi i numeri concreti: aumento fatturato, riduzione costi, organizzazione chiara.'
              },
              {
                question: 'Come migliorare la produttività dei dipendenti?',
                answer: 'Definiamo ruoli chiari, obiettivi misurabili e processi efficaci. Implementiamo un sistema che mostra a tutti i risultati e le aree di miglioramento. I dipendenti sanno cosa fare e perché, aumentando naturalmente la produttività.'
              },
              {
                question: 'Fate consulenza per aziende familiari?',
                answer: 'Sì, ho particolare esperienza con aziende familiari venete. Ti aiuto a gestire meglio il personale, organizzare i processi e, se necessario, gestire il passaggio generazionale. Il metodo si adatta perfettamente alle specificità delle aziende familiari.'
              },
              {
                question: 'Consulente aziendale Padova, Venezia, Rovigo: fate interventi anche fuori Veneto?',
                answer: 'Opero principalmente in Veneto (Venezia, Padova, Rovigo) ma posso valutare interventi in altre regioni del Nord Italia su valutazione caso per caso.'
              },
              {
                question: 'Quanto tempo serve per mettere ordine nella mia azienda?',
                answer: 'In 90 giorni definiamo ruoli chiari, controllo di gestione e processi efficaci. In 6 mesi vedi i risultati concreti: aumento fatturato, miglioramento produttività, organizzazione che funziona. Ogni intervento è personalizzato sulla tua situazione.'
              }
            ]} />
          </div>
        </div>
      </section>

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
          <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
            Prenota ora →
          </CTA>
        </div>
      </section>
    </>
  );
}
