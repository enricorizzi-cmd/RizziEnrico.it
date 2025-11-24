import { generateMetadata } from '@/lib/seo';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import CTA from '@/components/CTA';
import IPBadge from '@/components/IPBadge';
import IPBenefitList from '@/components/IPBenefitList';
import IPUseCasesTabs from '@/components/IPUseCasesTabs';
import IPPackages from '@/components/IPPackages';
import Accordion from '@/components/Accordion';
import JSONLD from '@/components/JSONLD';
import DownloadForm from '@/components/DownloadForm';
import IPTeaser from '@/components/IPTeaser';

export const metadata = generateMetadata({
  title: 'i-Profile: Analisi Attitudinale Professionale per PMI | Enrico Rizzi',
  description: 'Misura attitudini, individua potenziale e prendi decisioni basate sui dati. Strumento OSM per selezione, sviluppo team e crescita manageriale. Venezia-Rovigo.',
  path: '/i-profile',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

// JSON-LD per Service
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Analisi Attitudinale i-Profile + Debrief',
  description: 'Strumento attitudinale professionale OSM per individuare punti di forza e aree di miglioramento. Utilizzabile per imprenditori/manager, gestione team e ricerca & selezione.',
  provider: {
    '@type': 'Person',
    name: 'Enrico Rizzi',
    jobTitle: 'Consulente OSM',
  },
  areaServed: {
    '@type': 'State',
    name: 'Veneto',
  },
  url: `${baseUrl}/i-profile`,
};

// FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'È un test clinico?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, è uno strumento attitudinale professionale per decisioni HR. Non è un test clinico o psicodiagnostico.',
      },
    },
    {
      '@type': 'Question',
      name: 'Valido per ogni settore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì: attitudini trasversali (ruolo-agnostiche) con contestualizzazione in debrief.',
      },
    },
    {
      '@type': 'Question',
      name: 'Può sostituire il colloquio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No: integra e migliora la qualità dei colloqui. Non sostituisce il giudizio umano.',
      },
    },
    {
      '@type': 'Question',
      name: 'Privacy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dati trattati nel rispetto del GDPR, con consensi espliciti e tempi di conservazione chiari.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto dura?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Compilazione online 20-30 minuti, debrief 60-90 minuti.',
      },
    },
  ],
};

export default function IProfilePage() {
  const useCases = [
    {
      id: 'self',
      title: 'Imprenditore/Manager',
      subtitle: 'Fotografia delle abitudini manageriali',
      description: 'Self-assessment per identificare punti di forza e aree da potenziare nella leadership, delega e organizzazione.',
      benefits: [
        'Roadmap personale per leadership',
        'Focus su 2-3 comportamenti driver',
        'Miglioramento efficacia riunioni',
        'Piano sviluppo personalizzato',
      ],
      cta: {
        text: 'Prenota il tuo i-Profile',
        href: '/contatti',
      },
    },
    {
      id: 'team',
      title: 'Team & Collaboratori',
      subtitle: 'Mappatura organizzativa',
      description: 'Persona giusta al posto giusto: riduzione turnover e piani di crescita per ruolo.',
      benefits: [
        'Mappa team ruoli-attitudini',
        'Spostamenti consigliati',
        'Piani formativi personalizzati',
        'Riduzione turnover',
        'Aumento autonomia e soddisfazione',
      ],
      cta: {
        text: 'Mappa il tuo team',
        href: '/contatti',
      },
    },
    {
      id: 'hiring',
      title: 'Selezione Candidati',
      subtitle: 'Pre-screening e intervista guidata',
      description: 'Screening attitudinale, match ruolo e velocizzazione del time-to-hire con evidenze oggettive.',
      benefits: [
        'Screening mirato su short-list',
        'Colloqui focalizzati su evidenze',
        'Report comparativo candidati',
        'Riduzione bias e rischi',
        'Time-to-hire più rapido',
      ],
      cta: {
        text: 'Migliora le tue selezioni',
        href: '/contatti',
      },
    },
  ];

  const packages = [
    {
      id: 'solo',
      name: 'Solo Titolare',
      subtitle: 'i-Profile + Debrief individuale',
      includes: [
        'Report i-Profile completo',
        'Debrief 60-90 minuti',
        'Action plan personalizzato',
        'Check-list comportamenti da monitorare',
      ],
      cta: {
        text: 'Richiedi informazioni',
        href: '/contatti',
      },
    },
    {
      id: 'team',
      name: 'Team Start',
      subtitle: 'Fino a 5 persone',
      includes: [
        'i-Profile per 5 persone',
        'Mappa Team completa',
        'Debrief collettivo 2h',
        'Piano spostamenti consigliati',
        'KPI comportamentali trimestre',
      ],
      popular: true,
      cta: {
        text: 'Richiedi informazioni',
        href: '/contatti',
      },
    },
    {
      id: 'hiring',
      name: 'Hiring Kit',
      subtitle: 'Selezione supportata',
      includes: [
        'i-Profile candidati short-list',
        'Griglia colloquio guidata',
        'Report comparativo',
        'Supporto decisione finale',
        'Follow-up primo trimestre',
      ],
      cta: {
        text: 'Richiedi informazioni',
        href: '/contatti',
      },
    },
  ];

  const faqs = [
    {
      question: 'È un test clinico?',
      answer: 'No, è uno strumento attitudinale professionale per decisioni HR. Non è un test clinico o psicodiagnostico. Misura tratti chiave che influenzano la produttività e i comportamenti al lavoro.',
    },
    {
      question: 'Valido per ogni settore?',
      answer: 'Sì: attitudini trasversali (ruolo-agnostiche) con contestualizzazione in debrief. OSM ha validato lo strumento con oltre 150.000 profili in diversi settori.',
    },
    {
      question: 'Può sostituire il colloquio?',
      answer: 'No: integra e migliora la qualità dei colloqui. Non sostituisce il giudizio umano. Usa i risultati per condurre colloqui più focalizzati e obiettivi.',
    },
    {
      question: 'Privacy?',
      answer: 'Dati trattati nel rispetto del GDPR, con consensi espliciti e tempi di conservazione chiari. Solo i dati necessari vengono raccolti.',
    },
    {
      question: 'Quanto dura?',
      answer: 'Compilazione online: 20-30 minuti. Debrief: 60-90 minuti. Il report viene generato automaticamente dopo la compilazione.',
    },
    {
      question: 'Cosa misura esattamente?',
      answer: 'Un set di 10 ingredienti/tratti chiave che influenzano la produttività e i comportamenti al lavoro. Questionario esteso OSM (242 domande nella fase di sviluppo) con validazione scientifica.',
    },
    {
      question: 'È adatto al mio settore?',
      answer: 'Sì. Le attitudini misurate sono trasversali; in debrief le contestualizziamo al ruolo e al settore.',
    },
    {
      question: 'Come lo uso in selezione?',
      answer: 'Lo applichiamo alla short-list: guida i colloqui su evidenze attitudinali e ci aiuta a confrontare candidati in modo oggettivo.',
    },
    {
      question: 'Serve per forza farlo a tutto il team?',
      answer: 'No. Puoi partire da una singola figura chiave (titolare/manager) e poi estenderlo ai ruoli strategici.',
    },
    {
      question: 'Come gestite la privacy?',
      answer: 'Con consenso informato, finalità chiare e tempi di conservazione limitati. Nessuna decisione è automatica: lo strumento non sostituisce il giudizio umano.',
    },
    {
      question: 'Quanto dura e cosa ricevo?',
      answer: 'Compilazione online (circa 20–30 minuti) e debrief 60–90 minuti con report e piano d\'azione dei prossimi 90 giorni.',
    },
    {
      question: 'Quanto costa?',
      answer: 'I prezzi variano in base a singolo, team o selezione. Richiedi informazioni per avere la proposta più adatta.',
    },
  ];

  return (
    <>
      <JSONLD data={serviceSchema} />
      <JSONLD data={faqSchema} />

      <Hero
        h1="i-Profile: il tuo vantaggio competitivo nella scelta e crescita delle persone"
        subtitle="Misura attitudini, individua potenziale e prendi decisioni basate sui dati."
        image="/images/i-profile-hero.jpg"
        primaryCTA={{
          text: 'Prenota i-Profile + Debrief',
          href: '/contatti',
        }}
        secondaryCTA={{
          text: 'Scarica Esempio Report',
          href: '/risorse',
        }}
      />

      {/* Come funziona */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Come funziona"
            description="Tre step semplici per ottenere evidenze attitudinali e piano d'azione"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card
              title="1. Compilazione online"
              variant="service"
            >
              <p className="text-sm text-[var(--color-subtext)] mb-4">
                Questionario attitudinale online (20-30 minuti). Link tracciato per accesso diretto alla piattaforma OSM ufficiale.
              </p>
              <IPBadge variant="small" />
            </Card>
            <Card
              title="2. Report strutturato"
              variant="service"
            >
              <p className="text-sm text-[var(--color-subtext)] mb-4">
                Report completo con tratti/ingredienti misurati, punti di forza evidenziati e aree di miglioramento identificate.
              </p>
              <IPBadge variant="small" />
            </Card>
            <Card
              title="3. Debrief operativo"
              variant="service"
            >
              <p className="text-sm text-[var(--color-subtext)] mb-4">
                Sessione 60-90 minuti per interpretare i risultati e costruire insieme un piano d'azione personalizzato per i prossimi 90 giorni.
              </p>
              <IPBadge variant="small" />
            </Card>
          </div>
        </div>
      </section>

      {/* Mini-Check Attitudinale */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-[var(--radius-card)] p-8 md:p-12 border border-[var(--color-line)] max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="font-heading text-3xl font-bold text-[var(--color-text)] mb-4">
                Mini-Check Attitudinale i-Profile
              </h2>
              <p className="text-lg text-[var(--color-subtext)] mb-2">
                Prova un teaser di 8 domande per scoprire il tuo profilo attitudinale preliminare
              </p>
              <p className="text-sm text-[var(--color-subtext)]">
                Non è l'i-Profile ufficiale OSM, ma ti dà un'anteprima gratuita dei tuoi tratti attitudinali
              </p>
            </div>
            <IPTeaser />
          </div>
        </div>
      </section>

      {/* A chi è utile */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="A chi è utile"
            description="Tre contesti d'uso per massimizzare i risultati"
            centered
          />
          <div className="max-w-4xl mx-auto">
            <IPUseCasesTabs useCases={useCases} />
          </div>
        </div>
      </section>

      {/* Cosa ottieni (PFV) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Cosa ottieni"
            description="Deliverable concreti e utilizzabili subito"
            centered
          />
          <div className="max-w-3xl mx-auto">
            <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-8 border border-[var(--color-line)]">
              <IPBenefitList
                benefits={[
                  'Report i-Profile ufficiale OSM con evidenze attitudinali complete',
                  'Sessione di debrief 60-90 minuti con piano d\'azione sintetico',
                  'Check-list colloquio guidata (per selezione) e scheda di ruolo (per team)',
                  'Raccomandazioni KPI/behavioral da monitorare nel primo trimestre',
                  'Mappa Team (per pacchetti team) con matrice ruoli-attitudini',
                  'Report comparativo candidati (per hiring) con motivazione scelta',
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pacchetti e prezzi */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Pacchetti e prezzi"
            description="Scegli il pacchetto più adatto alle tue esigenze"
            centered
          />
          <IPPackages packages={packages} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Domande frequenti"
            description="Risposte alle domande più comuni su i-Profile"
            centered
          />
          <div className="max-w-3xl mx-auto">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Case Study"
            description="Risultati concreti con i-Profile"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card
              title="Selezione"
              variant="case"
              href="/case-study"
            >
              <div className="space-y-2 text-sm">
                <p><strong>Contesto:</strong> Selezione posizione chiave</p>
                <p><strong>Intervento:</strong> i-Profile su 30 candidati → short-list 6</p>
                <p><strong>Risultati:</strong> Colloqui più rapidi, turnover 12 mesi ↓</p>
                <div className="mt-2">
                  <IPBadge variant="small" />
                </div>
              </div>
            </Card>
            <Card
              title="Team Mapping"
              variant="case"
              href="/case-study"
            >
              <div className="space-y-2 text-sm">
                <p><strong>Contesto:</strong> Riorganizzazione team</p>
                <p><strong>Intervento:</strong> i-Profile + mappa team 15 persone</p>
                <p><strong>Risultati:</strong> Riallocazione ruoli, +autonomia, +soddisfazione</p>
                <div className="mt-2">
                  <IPBadge variant="small" />
                </div>
              </div>
            </Card>
            <Card
              title="Titolare"
              variant="case"
              href="/case-study"
            >
              <div className="space-y-2 text-sm">
                <p><strong>Contesto:</strong> Sviluppo leadership</p>
                <p><strong>Intervento:</strong> i-Profile titolare + debrief</p>
                <p><strong>Risultati:</strong> Focus su 2-3 comportamenti driver, meeting più efficaci</p>
                <div className="mt-2">
                  <IPBadge variant="small" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-16 bg-[var(--color-primary)] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Pronto a prendere decisioni migliori sulle persone?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Prenota i-Profile + Debrief e ottieni evidenze attitudinali con piano d'azione chiaro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
              Prenota i-Profile + Debrief →
            </CTA>
            <CTA href="/contatti" variant="secondary" size="large" className="bg-white/10 text-white border-2 border-white hover:bg-white/20">
              Parla con me 30' →
            </CTA>
          </div>
        </div>
      </section>
    </>
  );
}

