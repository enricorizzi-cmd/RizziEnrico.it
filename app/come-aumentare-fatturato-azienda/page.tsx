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
  title: 'Come Aumentare il Fatturato della Mia Azienda – Strategie Concrete | Enrico Rizzi',
  description: 'Scopri come aumentare il fatturato della tua azienda veneta: migliorare produttività dipendenti, ottimizzare rete vendita, implementare controllo di gestione. Consulente Padova, Venezia, Rovigo.',
  path: '/come-aumentare-fatturato-azienda',
  keywords: 'come aumentare fatturato azienda, aumentare fatturato, incrementare vendite, migliorare produttività dipendenti, ottimizzare rete vendita, consulente aziendale Veneto',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

// Schema FAQPage
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Come posso aumentare il fatturato della mia azienda?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Per aumentare il fatturato devi lavorare su 3 leve principali: 1) Migliorare la produttività dei dipendenti con ruoli chiari e formazione mirata, 2) Ottimizzare la rete vendita con processi efficaci e KPI di vendita, 3) Implementare un controllo di gestione che ti mostri dove recuperare margini. Nel 2024 ho aiutato un\'azienda di Padova ad aumentare significativamente il fatturato con questo approccio.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto tempo serve per aumentare il fatturato?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Con il metodo OSM, in 90 giorni mettiamo ordine con ruoli chiari, controllo di gestione e processi efficaci. In 6 mesi vedi i risultati concreti: aumento fatturato, miglioramento produttività dipendenti, organizzazione che funziona. Ogni intervento è personalizzato sulla tua situazione.',
      },
    },
    {
      '@type': 'Question',
      name: 'Come migliorare la rete vendita per aumentare il fatturato?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Per migliorare la rete vendita: 1) Definisci processi di vendita chiari e standardizzati, 2) Implementa KPI di vendita (lead, conversioni, valore medio ordine), 3) Forma il team commerciale con tecniche di vendita efficaci, 4) Affianca i venditori sul campo per migliorare le performance. Lavoriamo molto con la rete vendita del cliente, riorganizzandola se necessario o semplicemente affiancando i venditori.',
      },
    },
  ],
};

export default function ComeAumentareFatturatoPage() {
  return (
    <>
      <JSONLD data={faqSchema} />
      <Hero
        h1="Come Aumentare il Fatturato della Tua Azienda: Strategie Concrete"
        subtitle="Scopri 3 leve pratiche per incrementare vendite e margini: migliorare produttività dipendenti, ottimizzare rete vendita, implementare controllo di gestione efficace."
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
              title="Il Problema: Fatturato che Non Cresce, Margini che Si Restringono"
              description="Molte aziende venete faticano ad aumentare il fatturato: rete vendita poco strutturata, produttività dei dipendenti bassa, mancanza di controllo di gestione. Il risultato? Vendite stagnanti, margini che si restringono."
              centered
            />
            <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-8 border border-[var(--color-line)] mt-8">
              <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
                Segnali che la tua azienda ha bisogno di aumentare il fatturato:
              </h3>
              <ul className="space-y-3 text-[var(--color-text)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold">•</span>
                  <span>Fatturato stagnante o in calo: vendite che non crescono</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold">•</span>
                  <span>Rete vendita poco efficace: venditori che non raggiungono gli obiettivi</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold">•</span>
                  <span>Produttività bassa: dipendenti che non rendono al massimo</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold">•</span>
                  <span>Mancanza di controllo: non sai dove recuperare margini</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Leve per Aumentare Fatturato */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="3 Leve Concrete per Aumentare il Fatturato"
            description="Strategie pratiche testate su centinaia di aziende venete. Non teoria, ma strumenti concreti che portano risultati misurabili."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                numero: '1',
                title: 'Migliorare la Produttività dei Dipendenti',
                description: 'Definiamo ruoli chiari, obiettivi misurabili e processi efficaci. Implementiamo un sistema che mostra a tutti i risultati e le aree di miglioramento.',
                risultato: 'Risultato: dipendenti più produttivi, efficienza aumentata.',
                dettagli: [
                  'Ruoli e responsabilità chiare',
                  'Obiettivi misurabili per ogni persona',
                  'Processi standardizzati',
                  'Formazione mirata e coaching',
                ],
              },
              {
                numero: '2',
                title: 'Ottimizzare la Rete Vendita',
                description: 'Lavoriamo molto con la rete vendita del cliente, riorganizzandola se necessario o semplicemente affiancando i venditori. Il nostro obiettivo è incrementare le vendite.',
                risultato: 'Risultato: vendite in crescita, fatturato aumentato.',
                dettagli: [
                  'Processi di vendita chiari',
                  'KPI di vendita (lead, conversioni, valore medio)',
                  'Formazione tecniche di vendita',
                  'Affiancamento sul campo',
                ],
              },
              {
                numero: '3',
                title: 'Implementare Controllo di Gestione',
                description: 'Dashboard mensili, alert automatici, piano di azione sugli scostamenti. Ti mostriamo dove recuperare margini e come ottimizzare i costi.',
                risultato: 'Risultato: decisioni informate, margini migliorati.',
                dettagli: [
                  'KPI pratici e cruscotto operativo',
                  'Alert su scostamenti',
                  'Analisi margini e costi',
                  'Piano di azione mensile',
                ],
              },
            ].map((leva) => (
              <Card
                key={leva.numero}
                title={leva.title}
                variant="service"
                href="/servizi"
              >
                <div className="text-4xl font-bold text-[var(--color-primary)] mb-3">{leva.numero}</div>
                <p className="text-sm mb-4">{leva.description}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-semibold text-[var(--color-text)]">Include:</p>
                  <ul className="text-xs text-[var(--color-subtext)] space-y-1">
                    {leva.dettagli.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm font-semibold text-[var(--color-success)]">{leva.risultato}</p>
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

      {/* Case Study Concreto */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Risultato Concreto: +25% Fatturato in 6 Mesi"
              description="Esempio reale di azienda padovana che ha aumentato il fatturato con il metodo OSM"
              centered
            />
            <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white rounded-[var(--radius-card)] p-8">
              <h3 className="font-heading text-2xl font-bold mb-6">
                PMI Manifatturiera Padova – +25% Fatturato
              </h3>
              <div className="space-y-4 text-lg">
                <div>
                  <strong>Contesto:</strong> Azienda 45 addetti, crescita rapida ma organizzazione insufficiente, rete vendita poco strutturata, fatturato stagnante.
                </div>
                <div>
                  <strong>Intervento:</strong> Metodo 5 Step: ruoli definiti, KPI implementati (fatturato, marginalità, lead, conversioni), processi vendita ottimizzati, formazione team commerciale, controllo di gestione operativo.
                </div>
                <div>
                  <strong>Risultati in 6 mesi:</strong>
                  <ul className="mt-2 space-y-2">
                    <li>• <strong>+25% fatturato</strong> grazie a rete vendita ottimizzata</li>
                    <li>• <strong>+20% produttività dipendenti</strong> con ruoli chiari e formazione</li>
                    <li>• <strong>-30% tempi consegna</strong> con processi efficaci</li>
                    <li>• <strong>Margini migliorati</strong> grazie a controllo di gestione</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/case-study" className="text-white hover:underline font-semibold text-lg">
                  Vedi tutti i case study →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Come Funziona */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Come Funziona: Da Fatturato Stagnante a Crescita Sostenibile"
              description="Un percorso strutturato che ti porta da vendite che non crescono a fatturato in aumento costante."
              centered
            />
            <div className="space-y-6 mt-8">
              {[
                {
                  step: 'Step 1: Analisi',
                  cosa: 'Check-up gratuito dove analizziamo insieme numeri e criticità della tua azienda. Identifichiamo dove recuperare margini e come aumentare le vendite.',
                },
                {
                  step: 'Step 2: Progettazione',
                  cosa: 'Definiamo il piano di intervento: rete vendita da ottimizzare, KPI da implementare, processi da creare. Tutto su misura per aumentare il fatturato.',
                },
                {
                  step: 'Step 3: Implementazione',
                  cosa: 'Mettiamo in pratica: ottimizziamo rete vendita, implementiamo controllo di gestione, miglioriamo produttività dipendenti. Affiancamento settimanale.',
                },
                {
                  step: 'Step 4: Monitoraggio',
                  cosa: 'Monitoriamo i risultati, ottimizziamo dove serve. In 6 mesi vedi i numeri concreti: aumento fatturato, miglioramento produttività, margini migliorati.',
                },
              ].map((step, index) => (
                <div key={index} className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
                  <h3 className="font-heading text-xl font-bold text-[var(--color-primary)] mb-2">{step.step}</h3>
                  <p className="text-[var(--color-text)]">{step.cosa}</p>
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
              title="Domande Frequenti su Come Aumentare il Fatturato"
              description="Risposte alle domande più comuni"
              centered
            />
            <Accordion items={[
              {
                question: 'Come posso aumentare il fatturato della mia azienda?',
                answer: 'Per aumentare il fatturato devi lavorare su 3 leve principali: 1) Migliorare la produttività dei dipendenti con ruoli chiari e formazione mirata, 2) Ottimizzare la rete vendita con processi efficaci e KPI di vendita, 3) Implementare un controllo di gestione che ti mostri dove recuperare margini. Nel 2024 ho aiutato un\'azienda di Padova ad aumentare significativamente il fatturato con questo approccio.',
              },
              {
                question: 'Quanto tempo serve per aumentare il fatturato?',
                answer: 'Con il metodo OSM, in 90 giorni mettiamo ordine con ruoli chiari, controllo di gestione e processi efficaci. In 6 mesi vedi i risultati concreti: aumento fatturato, miglioramento produttività dipendenti, organizzazione che funziona. Ogni intervento è personalizzato sulla tua situazione.',
              },
              {
                question: 'Come migliorare la rete vendita per aumentare il fatturato?',
                answer: 'Per migliorare la rete vendita: 1) Definisci processi di vendita chiari e standardizzati, 2) Implementa KPI di vendita (lead, conversioni, valore medio ordine), 3) Forma il team commerciale con tecniche di vendita efficaci, 4) Affianca i venditori sul campo per migliorare le performance. Lavoriamo molto con la rete vendita del cliente, riorganizzandola se necessario o semplicemente affiancando i venditori.',
              },
              {
                question: 'Quanto costa aumentare il fatturato della mia azienda?',
                answer: 'I servizi partono a partire da 700€. Offro sempre un check-up gratuito di 60 minuti (Zoom) o 90 minuti (in presenza) per valutare come aumentare il fatturato della tua azienda senza impegno.',
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
              Pronto ad Aumentare il Fatturato della Tua Azienda?
            </h2>
            <p className="text-center text-[var(--color-subtext)] mb-6">
              Prenota un check-up gratuito: analizziamo insieme numeri e criticità della tua azienda. 
              Ti mostro dove recuperare margini e come aumentare le vendite.
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

