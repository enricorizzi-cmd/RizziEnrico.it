import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import Steps from '@/components/Steps';
import Accordion from '@/components/Accordion';
import CTA from '@/components/CTA';
import JSONLD from '@/components/JSONLD';

export const metadata = generateMetadata({
  title: 'Il Metodo in 5 Step - Da caos a organizzazione | Enrico Rizzi',
  description: 'Metodo strutturato per organizzare la tua PMI: Chi, Numeri, Processi, Persone, Espansione. In 90 giorni ordine, in 6 mesi risultati.',
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
    description: 'Impostiamo KPI pratici e dashboard che guidano le decisioni quotidiane e strategiche.',
    benefits: [
      '12-15 KPI chiave monitorati mensilmente',
      'Dashboard visiva accessibile a tutto il management',
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
    question: 'Quanto tempo richiede il metodo completo?',
    answer: 'Il metodo è strutturato in fasi: le prime 3 (Chi, Numeri, Processi) si completano in 90 giorni lavorativi. Le fasi 4 e 5 (Persone, Espansione) richiedono 3-4 mesi aggiuntivi. Il totale è circa 6 mesi per vedere i risultati numerici significativi.',
  },
  {
    question: 'Posso applicare solo alcuni step?',
    answer: 'Sì, anche se l\'approccio completo dà i migliori risultati. Possiamo partire dai step più critici per la tua azienda (spesso Numeri e Processi) e poi completare gli altri. Valutiamo insieme durante la diagnosi iniziale.',
  },
  {
    question: 'Cosa succede se non ho ancora dei KPI definiti?',
    answer: 'Partiamo da zero, niente panico! Iniziamo con 5-6 KPI base: fatturato, marginalità, incassi, lead, consegne, qualità. Poi li espandiamo gradualmente nel secondo step. L\'importante è iniziare a misurare qualcosa.',
  },
  {
    question: 'Il metodo funziona anche per aziende più piccole (5-10 persone)?',
    answer: 'Sì, anzi spesso è più veloce da implementare. Adattiamo il metodo alla dimensione: per piccole aziende ci concentriamo su KPI essenziali (5-8) e processi snelli. Il principio rimane lo stesso: ordine, misurazione, crescita.',
  },
  {
    question: 'Chi segue l\'implementazione in azienda?',
    answer: 'Io ti affianco per l\'implementazione completa, con incontri settimanali o quindicinali. I tuoi collaboratori vengono formati sui KPI e processi. L\'obiettivo è renderti autonomo nel tempo, con un sistema che funziona senza la mia presenza costante.',
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
              Il Metodo in 5 Step
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
            Prenota una diagnosi gratuita di 30 minuti
          </p>
          <CTA href="/contatti" variant="primary" size="base" className="w-full">
            Prenota ora →
          </CTA>
        </div>
      </div>
    </>
  );
}

