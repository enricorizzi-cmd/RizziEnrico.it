import { generateMetadata } from '@/lib/seo';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import CTA from '@/components/CTA';
import Accordion from '@/components/Accordion';
import ContactForm from '@/components/ContactForm';
import JSONLD from '@/components/JSONLD';
import Link from 'next/link';

export const metadata = generateMetadata({
  title: 'Come Migliorare la Produttività dei Dipendenti – Strategie Concrete | Enrico Rizzi',
  description: 'Scopri come migliorare la produttività dei dipendenti: ruoli chiari, obiettivi misurabili, processi efficaci, formazione mirata. Consulente aziendale Padova, Venezia, Rovigo.',
  path: '/migliorare-produttivita-dipendenti',
  keywords: 'come migliorare produttività dipendenti, aumentare produttività dipendenti, migliorare efficienza dipendenti, formazione dipendenti, gestione personale, consulente aziendale Veneto',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

// Schema FAQPage
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Come migliorare la produttività dei dipendenti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Per migliorare la produttività dei dipendenti devi: 1) Definire ruoli e responsabilità chiare, 2) Stabilire obiettivi misurabili per ogni persona, 3) Creare processi efficaci e standardizzati, 4) Fornire formazione mirata e coaching, 5) Implementare un sistema di controllo che mostri risultati e aree di miglioramento. I dipendenti sanno cosa fare e perché, aumentando naturalmente la produttività.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto tempo serve per migliorare la produttività dei dipendenti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Con il metodo OSM, in 90 giorni definiamo ruoli chiari, obiettivi misurabili e processi efficaci. In 6 mesi vedi i risultati concreti: produttività aumentata del 20-30%, efficienza migliorata, team più motivato. Ogni intervento è personalizzato sulla tua situazione.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quali sono i principali problemi che riducono la produttività dei dipendenti?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I principali problemi sono: ruoli e responsabilità non chiari (i dipendenti non sanno cosa fare), mancanza di obiettivi misurabili (non sanno se stanno facendo bene), processi improvvisati (ogni volta si fa diversamente), mancanza di formazione (non hanno le competenze), clima aziendale negativo (non sono motivati). Il metodo OSM risolve tutti questi problemi.',
      },
    },
  ],
};

export default function MigliorareProduttivitaDipendentiPage() {
  return (
    <>
      <JSONLD data={faqSchema} />
      <Hero
        h1="Come Migliorare la Produttività dei Dipendenti: Strategie Concrete"
        subtitle="Scopri 5 elementi pratici per aumentare efficienza e risultati del tuo team: ruoli chiari, obiettivi misurabili, processi efficaci, formazione mirata, controllo risultati."
        badge="Consulente Aziendale • Venezia-Padova-Rovigo"
        primaryCTA={{
          text: 'Prenota Check-up Gratuito',
          href: '/contatti',
        }}
        secondaryCTA={{
          text: 'Scopri i Servizi',
          href: '/servizi',
        }}
      />

      {/* Problema */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Il Problema: Dipendenti Poco Produttivi, Efficienza Bassa"
              description="Molte aziende venete faticano a migliorare la produttività dei dipendenti: ruoli non chiari, obiettivi assenti, processi improvvisati, mancanza di formazione. Il risultato? Efficienza bassa, risultati insoddisfacenti."
              centered
            />
            <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-8 border border-[var(--color-line)] mt-8">
              <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
                Segnali che la produttività dei dipendenti è bassa:
              </h3>
              <ul className="space-y-3 text-[var(--color-text)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold">•</span>
                  <span>Ruoli non chiari: "Chi fa cosa?" è una domanda frequente</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold">•</span>
                  <span>Obiettivi assenti: i dipendenti non sanno se stanno facendo bene</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold">•</span>
                  <span>Processi improvvisati: ogni volta si fa in modo diverso</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold">•</span>
                  <span>Mancanza di formazione: competenze insufficienti</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold">•</span>
                  <span>Clima negativo: dipendenti demotivati</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Elementi per Migliorare Produttività */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="5 Elementi Concreti per Migliorare la Produttività dei Dipendenti"
            description="Strategie pratiche testate su centinaia di aziende venete. Non teoria, ma strumenti concreti che portano risultati misurabili."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {[
              {
                numero: '1',
                title: 'Ruoli e Responsabilità Chiare',
                description: 'Definiamo chi fa cosa, con mansionari chiari e responsabilità precise. Eliminiamo ambiguità.',
                risultato: 'Risultato: ogni persona sa esattamente cosa fare.',
              },
              {
                numero: '2',
                title: 'Obiettivi Misurabili',
                description: 'Stabiliamo obiettivi chiari e misurabili per ogni persona. KPI individuali che guidano le azioni.',
                risultato: 'Risultato: i dipendenti sanno se stanno facendo bene.',
              },
              {
                numero: '3',
                title: 'Processi Efficaci',
                description: 'Creiamo processi standardizzati per le attività principali. Policy semplici, flussi chiari.',
                risultato: 'Risultato: efficienza aumentata, errori ridotti.',
              },
              {
                numero: '4',
                title: 'Formazione Mirata',
                description: 'Forniamo formazione mirata e coaching individuale. Sviluppiamo le competenze necessarie.',
                risultato: 'Risultato: dipendenti più competenti e motivati.',
              },
              {
                numero: '5',
                title: 'Controllo Risultati',
                description: 'Implementiamo un sistema che mostra risultati e aree di miglioramento. Feedback continuo.',
                risultato: 'Risultato: miglioramento continuo della produttività.',
              },
            ].map((elemento) => (
              <Card
                key={elemento.numero}
                title={elemento.title}
                variant="service"
                href="/servizi"
              >
                <div className="text-4xl font-bold text-[var(--color-primary)] mb-3">{elemento.numero}</div>
                <p className="text-sm mb-3">{elemento.description}</p>
                <p className="text-sm font-semibold text-[var(--color-success)]">{elemento.risultato}</p>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <CTA href="/servizi" variant="secondary" size="large">
              Scopri i Servizi Completi →
            </CTA>
          </div>
        </div>
      </section>

      {/* Come Funziona */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Come Funziona: Da Produttività Bassa a Team Efficace"
              description="Un percorso strutturato che ti porta da dipendenti poco produttivi a team efficace e motivato."
              centered
            />
            <div className="space-y-6 mt-8">
              {[
                {
                  fase: 'Fase 1: Analisi Clima e Produttività',
                  cosa: 'Studio del clima aziendale, della motivazione del personale e della produttività delle risorse. Identifichiamo dove intervenire.',
                },
                {
                  fase: 'Fase 2: Definizione Ruoli e Obiettivi',
                  cosa: 'Definiamo ruoli chiari, responsabilità precise, obiettivi misurabili per ogni persona. Mansionari allineati agli obiettivi.',
                },
                {
                  fase: 'Fase 3: Creazione Processi',
                  cosa: 'Creiamo processi standardizzati per le attività principali. Policy semplici, flussi chiari, riunioni efficaci.',
                },
                {
                  fase: 'Fase 4: Formazione e Coaching',
                  cosa: 'Forniamo formazione mirata, coaching individuale per manager, team building strutturato. Sviluppiamo le competenze.',
                },
                {
                  fase: 'Fase 5: Monitoraggio e Ottimizzazione',
                  cosa: 'Monitoriamo i risultati, ottimizziamo dove serve. In 6 mesi vedi i risultati concreti: produttività aumentata del 20-30%.',
                },
              ].map((fase, index) => (
                <div key={index} className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
                  <h3 className="font-heading text-xl font-bold text-[var(--color-primary)] mb-2">{fase.fase}</h3>
                  <p className="text-[var(--color-text)]">{fase.cosa}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Risultati Concreti */}
      <section className="py-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
              Risultati Concreti che Puoi Ottenere
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { valore: '+20-30%', cosa: 'Aumento produttività dipendenti' },
                { valore: '-40%', cosa: 'Riduzione tempi morti' },
                { valore: '+15%', cosa: 'Miglioramento efficienza' },
              ].map((risultato, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{risultato.valore}</div>
                  <div className="text-lg opacity-90">{risultato.cosa}</div>
                </div>
              ))}
            </div>
            <p className="text-lg mb-8 opacity-90">
              Nel 2024 ho aiutato un'azienda manifatturiera di Padova a migliorare la produttività dei dipendenti del 25% 
              definendo ruoli chiari, obiettivi misurabili e processi efficaci. Il team è più motivato e i risultati sono misurabili.
            </p>
            <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
              Vuoi Risultati Simili? Contattami →
            </CTA>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionTitle
              title="Domande Frequenti su Come Migliorare la Produttività dei Dipendenti"
              description="Risposte alle domande più comuni"
              centered
            />
            <Accordion items={[
              {
                question: 'Come migliorare la produttività dei dipendenti?',
                answer: 'Per migliorare la produttività dei dipendenti devi: 1) Definire ruoli e responsabilità chiare, 2) Stabilire obiettivi misurabili per ogni persona, 3) Creare processi efficaci e standardizzati, 4) Fornire formazione mirata e coaching, 5) Implementare un sistema di controllo che mostri risultati e aree di miglioramento. I dipendenti sanno cosa fare e perché, aumentando naturalmente la produttività.',
              },
              {
                question: 'Quanto tempo serve per migliorare la produttività dei dipendenti?',
                answer: 'Con il metodo OSM, in 90 giorni definiamo ruoli chiari, obiettivi misurabili e processi efficaci. In 6 mesi vedi i risultati concreti: produttività aumentata del 20-30%, efficienza migliorata, team più motivato. Ogni intervento è personalizzato sulla tua situazione.',
              },
              {
                question: 'Quali sono i principali problemi che riducono la produttività dei dipendenti?',
                answer: 'I principali problemi sono: ruoli e responsabilità non chiari (i dipendenti non sanno cosa fare), mancanza di obiettivi misurabili (non sanno se stanno facendo bene), processi improvvisati (ogni volta si fa diversamente), mancanza di formazione (non hanno le competenze), clima aziendale negativo (non sono motivati). Il metodo OSM risolve tutti questi problemi.',
              },
              {
                question: 'Quanto costa migliorare la produttività dei dipendenti?',
                answer: 'I servizi partono a partire da 700€. Offro sempre un check-up gratuito di 60 minuti (Zoom) o 90 minuti (in presenza) per valutare come migliorare la produttività dei dipendenti nella tua azienda senza impegno.',
              },
            ]} />
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-[var(--radius-card)] p-8 border border-[var(--color-line)] shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">
              Pronto a Migliorare la Produttività dei Tuoi Dipendenti?
            </h2>
            <p className="text-center text-[var(--color-subtext)] mb-6">
              Prenota un check-up gratuito: analizziamo insieme la situazione della tua azienda. 
              Ti mostro come migliorare la produttività dei dipendenti con ruoli chiari, obiettivi misurabili e processi efficaci.
            </p>
            <ContactForm />
            <div className="mt-6 text-center">
              <p className="text-sm text-[var(--color-subtext)]">
                Oppure <Link href="/contatti" className="text-[var(--color-primary)] hover:underline font-semibold">contattami direttamente</Link> per maggiori informazioni.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

