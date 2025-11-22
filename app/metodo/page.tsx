'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import CTA from '@/components/CTA';
import Accordion from '@/components/Accordion';
import Link from 'next/link';
import Card from '@/components/Card';

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
    icon: '👥'
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
    icon: '📊'
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
    icon: '⚙️'
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
    icon: '🎓'
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
    icon: '🚀'
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

export default function MetodoPage() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
      <Hero
        h1="Metodo Consulenza PMI"
        subtitle="5 Step per Organizzare la Tua Azienda. Da caos a organizzazione: un percorso strutturato che porta risultati misurabili."
        badge="Metodo"
        primaryCTA={{
          text: 'Check-up Gratuito',
          href: '/contatti',
        }}
        image="/enrico-rizzi.jpg" // Placeholder
      />

      {/* Steps */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionTitle
              title="I 5 Step del Metodo"
              description="Un percorso sequenziale che trasforma la tua PMI da reattiva a organizzata e orientata ai risultati."
              centered
            />

            <div className="space-y-12 mt-16">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row gap-8 items-start p-8 rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-bg-secondary)] hover:shadow-lg transition-all duration-500 group reveal-on-scroll is-visible`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-heading text-2xl font-bold text-[var(--color-text)]">
                        {step.title}
                      </h3>
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                    <p className="text-lg text-[var(--color-subtext)] mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="bg-white rounded-xl p-6 border border-[var(--color-line)]/50">
                      <h4 className="font-bold text-[var(--color-primary)] mb-3 text-sm uppercase tracking-wide">Benefici:</h4>
                      <ul className="space-y-2">
                        {step.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3 text-[var(--color-text)]">
                            <span className="text-[var(--color-success)] font-bold">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Digitalizzazione */}
      <section className="py-20 bg-[var(--color-bg-secondary)] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div
            ref={ref}
            className={`max-w-4xl mx-auto glass-panel p-10 rounded-[2rem] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          >
            <h2 className="font-heading text-3xl font-bold text-[var(--color-text)] mb-6 text-center">
              Digitalizzazione: lo strato che rende scalabile il metodo
            </h2>
            <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed">
              <p className="mb-6 text-center text-lg">
                In tutti e 5 gli step lavoriamo anche sulla <strong>digitalizzazione pratica della tua PMI</strong>.
                Non si tratta di "fare il gestionale nuovo", ma di rendere i processi fluidi.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/50 p-6 rounded-xl border border-white/60">
                  <h4 className="font-bold text-[var(--color-primary)] mb-2">Mansionari Digitali</h4>
                  <p className="text-sm">Check-list e flussi gestibili con strumenti semplici.</p>
                </div>
                <div className="bg-white/50 p-6 rounded-xl border border-white/60">
                  <h4 className="font-bold text-[var(--color-primary)] mb-2">Dashboard KPI</h4>
                  <p className="text-sm">Riunioni più veloci con dati aggiornati automaticamente.</p>
                </div>
                <div className="bg-white/50 p-6 rounded-xl border border-white/60">
                  <h4 className="font-bold text-[var(--color-primary)] mb-2">Automazioni</h4>
                  <p className="text-sm">Riduzione errori e lavori ripetitivi.</p>
                </div>
                <div className="bg-white/50 p-6 rounded-xl border border-white/60">
                  <h4 className="font-bold text-[var(--color-primary)] mb-2">Strumenti Giusti</h4>
                  <p className="text-sm">Ogni ruolo ha il suo tool, senza stravolgimenti.</p>
                </div>
              </div>
              <div className="text-center">
                <CTA href="/digitalizzazione-pmi-ai" variant="primary" className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                  Scopri di più su Digitalizzazione & AI →
                </CTA>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cosa ottieni */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Cosa ottieni"
            description="Risultati concreti misurabili entro 6 mesi"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
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
              <Card
                key={index}
                title={item.title}
                variant="default"
                className="text-center premium-card-hover h-full"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <p className="text-[var(--color-subtext)] text-lg">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionTitle
              title="Domande frequenti"
              description="Risposte alle domande più comuni sul metodo"
              centered
            />
            <Accordion items={faqs} className="mt-8 bg-white rounded-[var(--radius-card)] shadow-sm border border-[var(--color-line)] p-6" />
          </div>
        </div>
      </section>
    </>
  );
}
