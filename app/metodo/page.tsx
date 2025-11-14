import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import Steps from '@/components/Steps';
import Accordion from '@/components/Accordion';
import CTA from '@/components/CTA';
import IPBadge from '@/components/IPBadge';
import Card from '@/components/Card';
import JSONLD from '@/components/JSONLD';

export const metadata = generateMetadata({
  title: 'Metodo consulenza PMI in 5 step – Da caos a organizzazione con KPI chiari | Enrico Rizzi',
  description: 'Metodo consulenza PMI in 5 step: Chi, Numeri, Processi, Persone, Espansione. Da azienda reattiva a organizzata e orientata ai risultati, con ruoli, KPI e riunioni strutturate. Pensato per PMI venete e aziende familiari.',
  path: '/metodo',
});

const steps = [
  {
    number: 1,
    title: 'Chi',
    description: 'Definiamo ruoli chiari, mansionari dettagliati e responsabilità precise per ogni posizione.',
    benefits: [
      'Ogni persona sa esattamente cosa deve fare',
      'Eliminati sovrapposizioni e conflitti di responsabilità',
      'Mansionari aggiornati e allineati agli obiettivi',
    ],
  },
  {
    number: 2,
    title: 'Numeri',
    description: 'Impostiamo KPI (Indicatori Chiave di Prestazione) pratici e cruscotto che guidano le decisioni quotidiane e strategiche.',
    benefits: [
      '12-15 KPI chiave monitorati mensilmente',
      'Cruscotto visivo accessibile a tutto il management',
      'Alert automatici su scostamenti critici',
      'Riunioni mensili basate sui numeri, non su opinioni',
    ],
  },
  {
    number: 3,
    title: 'Processi',
    description: 'Creiamo policy semplici, riunioni efficaci e flussi stabili che riducono il caos operativo.',
    benefits: [
      'Riunioni strutturate con agenda e KPI',
      'Processi documentati e replicabili',
      'Riduzione tempi morti e attese',
      'Migliore coordinamento tra reparti',
    ],
  },
  {
    number: 4,
    title: 'Persone',
    description: 'Sviluppiamo leadership, formazione mirata e incentivi corretti per motivare e trattenere.',
    benefits: [
      'Percorsi di formazione personalizzati',
      'Sistema di riconoscimento e incentivi allineato ai KPI',
      'Leadership più efficace e coinvolgente',
      'Riduzione turnover',
    ],
    iprofile: {
      title: 'i-Profile: dal potenziale al ruolo',
      description: 'Utilizzo i-Profile per mappare attitudini, individuare potenziale e prendere decisioni basate sui dati su collocazione nel ruolo, sviluppo e selezione.',
      benefits: [
        'Mappatura attitudinale del team',
        'Persona giusta al posto giusto',
        'Piani sviluppo personalizzati',
        'Screening selezione mirato',
      ],
      cta: {
        text: 'Scopri i-Profile',
        href: '/i-profile',
      },
    },
  },
  {
    number: 5,
    title: 'Espansione',
    description: 'Implementiamo strategie di vendita, marketing strutturato e partnership sul territorio.',
    benefits: [
      'Vendite più organizzate con pipeline chiara',
      'Marketing allineato agli obiettivi di crescita',
      'Partnership strategiche sul territorio Veneto',
      'Scalabilità del modello organizzativo',
    ],
  },
];

const faqs = [
  {
    question: 'Come funziona il metodo di consulenza PMI in 5 step?',
    answer: 'Il metodo in 5 step guida la PMI da caos a organizzazione, lavorando su chi, numeri, processi, persone ed espansione. Partiamo da ruoli e mansionari chiari, poi definiamo KPI e cruscotti, sistemiamo riunioni e processi, sviluppiamo le persone chiave e infine prepariamo l\'azienda a crescere in modo strutturato.',
  },
  {
    question: 'Possiamo applicare solo alcuni step del metodo e non tutti?',
    answer: 'Sì, in alcuni casi è possibile applicare solo una parte del metodo, ad esempio processi e KPI o solo organizzazione e mansionari. Durante il check-up verifichiamo se è sufficiente intervenire su uno o due step o se è meglio programmare un percorso completo per evitare di mettere "pezze" che durano poco.',
  },
  {
    question: 'Quanto dura in media un percorso completo con il metodo in 5 step?',
    answer: 'Un percorso completo con il metodo in 5 step dura tipicamente tra 6 e 12 mesi. I primi 90 giorni sono dedicati a mettere ordine su ruoli, processi e numeri base. I mesi successivi servono per stabilizzare le nuove abitudini, formare le persone chiave e consolidare i risultati economici.',
  },
  {
    question: 'Il metodo è adatto anche a PMI sotto i 10 dipendenti?',
    answer: 'Sì, il metodo è adatto anche a PMI tra 5 e 10 dipendenti, soprattutto se in crescita o in fase di passaggio generazionale. In aziende piccole spesso le stesse persone ricoprono più ruoli: definire chi fa cosa, quali KPI guardare e come organizzare le riunioni è ancora più critico per non bloccare la crescita.',
  },
  {
    question: 'Chi segue operativamente l\'implementazione del metodo in azienda?',
    answer: 'L\'implementazione viene seguita insieme all\'imprenditore e a una o più figure chiave interne (es. responsabile amministrativo, responsabile produzione o responsabile commerciale). Io porto metodo, strumenti e supporto; l\'azienda mette impegno, dati e decisioni. L\'obiettivo è rendere autonomo il management, non creare dipendenza dal consulente.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function MetodoPage() {
  return (
    <>
      <JSONLD data={faqSchema} />
      
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Metodo Consulenza PMI: 5 Step per Organizzare la Tua Azienda
            </h1>
            <p className="text-xl md:text-2xl opacity-95">
              Da caos a organizzazione: un percorso strutturato che porta risultati misurabili
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="I 5 Step del Metodo"
              description="Un percorso sequenziale che trasforma la tua PMI da reattiva a organizzata e orientata ai risultati."
              centered
            />
            <Steps steps={steps} />
          </div>
        </div>
      </section>

      {/* Cosa ottieni - Summary */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Cosa ottieni"
              description="Risultati concreti misurabili entro 6 mesi"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  title: '90 giorni',
                  description: 'Ordine organizzativo completo',
                  icon: '📋',
                },
                {
                  title: '6 mesi',
                  description: 'Risultati numerici visibili nei KPI',
                  icon: '📊',
                },
                {
                  title: 'Autonomia',
                  description: 'Sistema che funziona senza la mia presenza costante',
                  icon: '🎯',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[var(--radius-card)] p-6 text-center border border-[var(--color-line)]"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-subtext)]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionTitle
              title="Domande frequenti"
              description="Risposte alle domande più comuni sul metodo"
              centered
            />
            <Accordion items={faqs} className="mt-8" />
          </div>
        </div>
      </section>

      {/* CTA Sticky laterale - solo desktop */}
      <div className="hidden lg:block fixed right-8 bottom-8 z-40">
        <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-lg border border-[var(--color-line)] max-w-xs">
          <h3 className="font-heading font-bold text-lg text-[var(--color-text)] mb-3">
            Pronto a iniziare?
          </h3>
          <p className="text-sm text-[var(--color-subtext)] mb-4">
            Prenota il Check-up gratuito: 60' via Zoom oppure 90' in presenza (Venezia-Padova-Rovigo)
          </p>
          <CTA href="/contatti" variant="primary" size="base" className="w-full">
            Prenota ora →
          </CTA>
        </div>
      </div>
    </>
  );
}

