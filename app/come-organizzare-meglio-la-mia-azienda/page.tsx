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
  title: 'Come Organizzare Meglio la Mia Azienda – Guida Pratica per Imprenditori Veneti',
  description: 'Scopri 5 step concreti per mettere ordine nella tua azienda: ruoli chiari, controllo di gestione, processi efficaci. Consulente aziendale Padova, Venezia, Rovigo. Check-up gratuito.',
  path: '/come-organizzare-meglio-la-mia-azienda',
  keywords: 'come organizzare meglio la mia azienda, mettere ordine in azienda, organizzazione aziendale, consulente aziendale Veneto, riorganizzazione aziendale, consulente Padova, consulente Venezia, consulente Rovigo',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

// Schema FAQPage per questa pagina
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Come posso organizzare meglio la mia azienda?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Per organizzare meglio la tua azienda devi partire da 5 elementi fondamentali: definire ruoli e responsabilità chiare, implementare un sistema di controllo di gestione con KPI, creare processi efficaci, sviluppare le persone con formazione mirata, e ottimizzare vendite e marketing. In 90 giorni puoi mettere ordine, in 6 mesi vedi i risultati concreti.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto tempo serve per organizzare meglio un\'azienda?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Con il metodo OSM, in 90 giorni definiamo ruoli chiari, controllo di gestione e processi efficaci. In 6 mesi vedi i risultati concreti: aumento fatturato, miglioramento produttività, organizzazione che funziona. Ogni intervento è personalizzato sulla tua situazione specifica.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quali sono i primi passi per mettere ordine in azienda?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I primi passi sono: 1) Analisi della situazione attuale (chi fa cosa, dove sono i colli di bottiglia), 2) Definizione di ruoli e responsabilità chiare, 3) Implementazione di un sistema di controllo di gestione semplice ma efficace, 4) Creazione di processi standardizzati per le attività principali. Ti aiuto a partire dal check-up gratuito dove analizziamo insieme la tua situazione.',
      },
    },
  ],
};

export default function ComeOrganizzareMeglioAziendaPage() {
  return (
    <>
      <JSONLD data={faqSchema} />
      <Hero
        h1="Come Organizzare Meglio la Mia Azienda: 5 Step Pratici"
        subtitle="Scopri un metodo concreto per mettere ordine nella tua azienda familiare. Ruoli chiari, controllo di gestione, processi efficaci. In 90 giorni organizzazione chiara, in 6 mesi vedi i numeri concreti."
        badge="Consulente Aziendale • Venezia-Padova-Rovigo"
        primaryCTA={{
          text: 'Prenota Check-up Gratuito',
          href: '/contatti',
        }}
        secondaryCTA={{
          text: 'Scopri il Metodo',
          href: '/metodo',
        }}
      />

      {/* Problema */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Il Problema: Azienda Caotica, Risultati Insoddisfacenti"
              description="Molte aziende familiari venete faticano a mettere ordine nei processi interni. Ruoli non chiari, mancanza di controllo di gestione, processi improvvisati. Il risultato? Stress, inefficienze, fatturato che non cresce."
              centered
            />
            <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-8 border border-[var(--color-line)]">
              <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
                Segnali che la tua azienda ha bisogno di organizzazione:
              </h3>
              <ul className="space-y-3 text-[var(--color-text)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold">•</span>
                  <span>Ruoli e responsabilità non chiari: "Chi fa cosa?" è una domanda frequente</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold">•</span>
                  <span>Mancanza di controllo di gestione: non sai dove stai andando perché non misuri</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold">•</span>
                  <span>Processi improvvisati: ogni volta si fa in modo diverso</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold">•</span>
                  <span>Produttività dei dipendenti bassa: non sanno cosa fare e perché</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold">•</span>
                  <span>Fatturato che non cresce: vendite non ottimizzate, margini che si restringono</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Soluzione: 5 Step */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="La Soluzione: 5 Step per Organizzare Meglio la Tua Azienda"
            description="Un metodo pratico e strutturato, testato su centinaia di aziende venete. Non teoria, ma strumenti concreti che portano risultati misurabili."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {[
              {
                step: '1',
                title: 'Chi - Ruoli e Responsabilità Chiare',
                description: 'Definiamo chi fa cosa, con mansionari chiari e responsabilità precise. Eliminiamo ambiguità e conflitti.',
                result: 'Risultato: ogni persona sa esattamente cosa fare e perché.',
              },
              {
                step: '2',
                title: 'Numeri - Controllo di Gestione',
                description: 'Implementiamo KPI pratici e un cruscotto che guidi le decisioni. Misuriamo quello che conta davvero.',
                result: 'Risultato: decisioni basate su dati, non su sensazioni.',
              },
              {
                step: '3',
                title: 'Processi - Flussi Efficaci',
                description: 'Creiamo processi standardizzati per le attività principali. Policy semplici, riunioni efficaci.',
                result: 'Risultato: efficienza aumentata, errori ridotti.',
              },
              {
                step: '4',
                title: 'Persone - Leadership e Formazione',
                description: 'Sviluppiamo le competenze del team con formazione mirata e coaching. Leadership efficace.',
                result: 'Risultato: team motivato, produttività aumentata.',
              },
              {
                step: '5',
                title: 'Espansione - Vendite e Marketing',
                description: 'Ottimizziamo la rete vendita, miglioriamo il marketing. Aumentiamo fatturato e margini.',
                result: 'Risultato: vendite in crescita, fatturato aumentato.',
              },
            ].map((item) => (
              <Card
                key={item.step}
                title={item.title}
                variant="service"
                href="/metodo"
              >
                <div className="text-4xl font-bold text-[var(--color-primary)] mb-3">{item.step}</div>
                <p className="text-sm mb-3">{item.description}</p>
                <p className="text-sm font-semibold text-[var(--color-success)]">{item.result}</p>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <CTA href="/metodo" variant="secondary" size="large">
              Scopri il Metodo Completo →
            </CTA>
          </div>
        </div>
      </section>

      {/* Come Funziona */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Come Funziona: Da Caos a Organizzazione in 90 Giorni"
              description="Un percorso strutturato che ti porta da organizzazione caotica a sistema strutturato orientato ai risultati."
              centered
            />
            <div className="space-y-8">
              {[
                {
                  fase: 'Fase 1: Analisi (Settimane 1-2)',
                  cosa: 'Check-up gratuito dove analizziamo insieme numeri e criticità della tua azienda. Identifichiamo dove recuperare margini e come organizzarti meglio.',
                },
                {
                  fase: 'Fase 2: Progettazione (Settimane 3-4)',
                  cosa: 'Definiamo il piano di intervento: ruoli da chiarire, KPI da implementare, processi da creare. Tutto su misura per la tua azienda.',
                },
                {
                  fase: 'Fase 3: Implementazione (Settimane 5-12)',
                  cosa: 'Mettiamo in pratica: definiamo ruoli e mansionari, implementiamo controllo di gestione, creiamo processi efficaci. Affiancamento settimanale.',
                },
                {
                  fase: 'Fase 4: Monitoraggio e Ottimizzazione (Mesi 4-6)',
                  cosa: 'Monitoriamo i risultati, ottimizziamo dove serve. In 6 mesi vedi i numeri concreti: aumento fatturato, miglioramento produttività.',
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
                { valore: 'fino a +30%', cosa: 'Aumento fatturato' },
                { valore: '-25%', cosa: 'Riduzione tempi consegna' },
                { valore: '+20%', cosa: 'Miglioramento produttività dipendenti' },
              ].map((risultato, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{risultato.valore}</div>
                  <div className="text-lg opacity-90">{risultato.cosa}</div>
                </div>
              ))}
            </div>
            <p className="text-lg mb-8 opacity-90">
              Nel 2024 ho aiutato un'azienda manifatturiera di Padova ad aumentare significativamente il fatturato 
              migliorando la produttività dei dipendenti e implementando un sistema di controllo di gestione efficace.
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
              title="Domande Frequenti su Come Organizzare Meglio la Tua Azienda"
              description="Risposte alle domande più comuni"
              centered
            />
            <Accordion items={[
              {
                question: 'Come posso organizzare meglio la mia azienda?',
                answer: 'Per organizzare meglio la tua azienda devi partire da 5 elementi fondamentali: definire ruoli e responsabilità chiare, implementare un sistema di controllo di gestione con KPI, creare processi efficaci, sviluppare le persone con formazione mirata, e ottimizzare vendite e marketing. In 90 giorni puoi mettere ordine, in 6 mesi vedi i risultati concreti.',
              },
              {
                question: 'Quanto tempo serve per organizzare meglio un\'azienda?',
                answer: 'Con il metodo OSM, in 90 giorni definiamo ruoli chiari, controllo di gestione e processi efficaci. In 6 mesi vedi i risultati concreti: aumento fatturato, miglioramento produttività, organizzazione che funziona. Ogni intervento è personalizzato sulla tua situazione specifica.',
              },
              {
                question: 'Quali sono i primi passi per mettere ordine in azienda?',
                answer: 'I primi passi sono: 1) Analisi della situazione attuale (chi fa cosa, dove sono i colli di bottiglia), 2) Definizione di ruoli e responsabilità chiare, 3) Implementazione di un sistema di controllo di gestione semplice ma efficace, 4) Creazione di processi standardizzati per le attività principali. Ti aiuto a partire dal check-up gratuito dove analizziamo insieme la tua situazione.',
              },
              {
                question: 'Quanto costa organizzare meglio la mia azienda?',
                answer: 'I servizi partono da €1.200 per interventi mirati. Consulenza continua da €2.500/mese. Offro sempre un check-up gratuito di 60 minuti (Zoom) o 90 minuti (in presenza) per valutare come organizzare meglio la tua azienda senza impegno.',
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
              Pronto a Mettere Ordine nella Tua Azienda?
            </h2>
            <p className="text-center text-[var(--color-subtext)] mb-6">
              Prenota un check-up gratuito: analizziamo insieme numeri e criticità della tua azienda. 
              Ti mostro dove recuperare margini e come organizzarti meglio.
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

