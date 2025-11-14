import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import CTA from '@/components/CTA';
import Hero from '@/components/Hero';
import JSONLD from '@/components/JSONLD';
import Link from 'next/link';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

// BreadcrumbList schema per pagina digitalizzazione
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
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Digitalizzazione & AI',
      item: `${baseUrl}/digitalizzazione-pmi-ai`,
    },
  ],
};

export const metadata = generateMetadata({
  title: 'Digitalizzazione & Intelligenza Artificiale per PMI venete | Enrico Rizzi',
  description: 'Digitalizzazione pratica e Intelligenza Artificiale per PMI di Venezia, Padova e Rovigo. Mappiamo processi, scegliamo gli strumenti giusti, automatizziamo il lavoro ripetitivo e trasformiamo dati e KPI in decisioni. Check-up digitale gratuito.',
  path: '/digitalizzazione-pmi-ai',
  keywords: 'digitalizzazione PMI Veneto, digitalizzazione PMI Padova Venezia Rovigo, consulente digitalizzazione PMI, AI per PMI, automazioni PMI, consulente digitalizzazione azienda veneta',
});

export default function DigitalizzazionePMIPage() {
  return (
    <>
      <JSONLD data={breadcrumbSchema} />
      {/* Hero */}
      <Hero
        h1="Digitalizzazione & Intelligenza Artificiale per PMI"
        subtitle="Da azienda 'tutta in testa alle persone' ad azienda che lavora con processi digitali chiari, dati aggiornati e automazioni semplici."
        primaryCTA={{
          text: 'Prenota Check-up Digitale Gratuito',
          href: '/contatti',
        }}
        secondaryCTA={{
          text: 'Scopri il Metodo',
          href: '/metodo',
        }}
      />

      {/* Sezione 1 - Hero descrittivo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-[var(--color-subtext)] mb-8 text-center">
              Digitalizzazione pratica per PMI di <strong>Venezia, Padova e Rovigo</strong>: niente progetti IT infiniti, ma strumenti concreti per togliere carta, doppie registrazioni e lavori ripetitivi. Con in più l'<strong>Intelligenza Artificiale</strong> a supporto delle decisioni.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                'Mappiamo i processi critici (ordini, offerte, interventi, magazzino, amministrazione).',
                'Scegliamo solo gli strumenti digitali essenziali che il tuo team può usare davvero.',
                'Automatizziamo il lavoro ripetitivo e portiamo i KPI in dashboard aggiornate.',
                'Introduciamo AI e automazioni dove servono, senza rivoluzionare tutto in una volta.',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-[var(--color-card)] p-4 rounded-lg">
                  <span className="text-[var(--color-primary)] font-bold mt-1">✓</span>
                  <span className="text-[var(--color-text)]">{item}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <CTA href="/contatti" variant="primary" size="large">
                Prenota un Check-up Digitale Gratuito
              </CTA>
              <p className="text-sm text-[var(--color-subtext)] mt-3">
                60' per capire da dove partire con la digitalizzazione della tua PMI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 2 - Perché falliscono */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Perché molte PMI 'falliscono' sulla digitalizzazione"
              description="I problemi reali che incontro nelle aziende venete"
              centered
            />
            <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed mt-8">
              <p className="mb-4">
                La maggior parte delle PMI non ha bisogno dell'ennesimo gestionale miracoloso o di parole come "Industry 4.0" e "cloud native". Ha bisogno di <strong>processi chiari</strong> e strumenti digitali che:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                  <span>facciano davvero risparmiare tempo,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                  <span>non mandino in tilt il personale,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                  <span>parlino la lingua dell'imprenditore (fatturato, margini, tempi, errori, incassi).</span>
                </li>
              </ul>
              <p className="mb-4">
                I problemi tipici che incontro nelle aziende venete:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                  <span>ogni reparto usa il <strong>proprio file Excel</strong> e nessuno è allineato;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                  <span>dati inseriti due o tre volte in posti diversi;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                  <span>decisioni prese "a sensazione" perché i numeri <strong>arrivano tardi</strong> o non sono affidabili;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                  <span>gestionali costosi usati al 20% delle potenzialità;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                  <span>progetti IT partiti e mai davvero <strong>entrati in produzione</strong>.</span>
                </li>
              </ul>
              <p className="mb-0">
                La digitalizzazione non è "comprare un software": è <strong>progettare il modo in cui la tua azienda lavora</strong> e poi usare la tecnologia per renderlo più veloce, sicuro e misurabile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 3 - Cosa significa */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Cosa intendo per Digitalizzazione & AI nelle PMI"
              description="Versione PMI, non Silicon Valley"
              centered
            />
            <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed mt-8">
              <p className="mb-6">
                Quando parlo di <strong>digitalizzazione e Intelligenza Artificiale per PMI</strong>, non parlo di fantascienza o di progetti IT ingestibili.
              </p>
              <p className="mb-4">
                Parlo di:
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="bg-[var(--color-card)] rounded-lg p-6 border border-[var(--color-line)]">
                  <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-3">
                    Processi chiari → strumenti digitali semplici
                  </h3>
                  <p className="mb-3">
                    Mappiamo come girano oggi ordini, offerte, preventivi, interventi, magazzino, amministrazione, HR. Poi capiamo quali passaggi possono essere:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                      <span>eliminati,</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                      <span>semplificati,</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                      <span><strong>automatizzati</strong>.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[var(--color-card)] rounded-lg p-6 border border-[var(--color-line)]">
                  <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-3">
                    Un'unica fonte di verità per i numeri
                  </h3>
                  <p>
                    KPI e cruscotti <strong>collegati ai dati reali</strong>, non ai fogli sparsi. In questo modo, quando apri una dashboard, i numeri sono aggiornati e affidabili.
                  </p>
                </div>

                <div className="bg-[var(--color-card)] rounded-lg p-6 border border-[var(--color-line)]">
                  <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-3">
                    Automazioni per togliere lavoro ripetitivo
                  </h3>
                  <p>
                    Invii automatici di report, reminder, aggiornamenti di stato, allineamenti tra gestionale, fogli e CRM. Meno copia-incolla, meno errori.
                  </p>
                </div>

                <div className="bg-[var(--color-card)] rounded-lg p-6 border border-[var(--color-line)]">
                  <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-3">
                    Intelligenza Artificiale come assistente, non come "giocattolo"
                  </h3>
                  <p className="mb-3">
                    Usiamo l'AI per:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                      <span>analizzare KPI e individuare pattern che non si vedono a occhio;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                      <span>riassumere dati e report complessi;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                      <span>generare bozze di procedure, mansionari, comunicazioni interne.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-center text-lg font-semibold text-[var(--color-text)]">
                L'obiettivo è sempre uno: <strong>un'azienda che lavora meglio, con meno caos e più controllo</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 4 - Roadmap 5 step */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Roadmap in 5 step: come lavoriamo"
              description="Ogni progetto è personalizzato, ma la struttura è sempre la stessa"
              centered
            />
            <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed mt-8">
              <p className="mb-8 text-center">
                Ti mostro come lavoriamo su digitalizzazione e AI in modo pratico, con risultati leggibili anche da chi "non è tecnologico".
              </p>

              <div className="space-y-8">
                {[
                  {
                    step: '1',
                    title: 'Diagnosi digitale & mappa dei processi',
                    content: [
                      'Analisi di come girano oggi: ordini, offerte e preventivi, produzione / erogazione servizio, magazzino / logistica, amministrazione, gestione clienti e fornitori.',
                      'Individuazione dei colli di bottiglia e dei punti in cui i dati si perdono o si duplicano.',
                      'Mappa visiva "AS IS" che ti mostra come lavora la tua azienda oggi.',
                    ],
                    output: 'Report di diagnosi digitale con 3–5 priorità chiare da cui partire.',
                  },
                  {
                    step: '2',
                    title: 'Fondamenta digitali',
                    content: [
                      'Definizione degli standard minimi per lavorare: struttura delle cartelle condivise, naming file, flussi di approvazione documenti, gestione degli accessi.',
                      'Scelta degli strumenti digitali base (senza cambiare tutto in una volta): gestionale e moduli già presenti da sfruttare meglio, fogli condivisi ben strutturati, eventuale CRM leggero, strumenti di collaborazione interna.',
                    ],
                    output: '"Pacchetto di base" con cui tutta l\'azienda inizia a lavorare nello stesso modo.',
                  },
                  {
                    step: '3',
                    title: 'KPI & cruscotti digitali',
                    content: [
                      'Traduzione dei tuoi KPI chiave in cruscotti digitali semplici e leggibili.',
                      'Collegamento (dove possibile) con le fonti dati esistenti per aggiornamento automatico.',
                      'Definizione delle riunioni a KPI: quali numeri guardare, con che frequenza, chi deve esserci, che decisioni prendere.',
                    ],
                    output: 'Dashboard KPI operative + calendario riunioni a numeri.',
                  },
                  {
                    step: '4',
                    title: 'Automazioni dei processi critici',
                    content: [
                      'Identificazione dei passaggi "manuali" ripetitivi ad alto spreco di tempo.',
                      'Progettazione e implementazione di automazioni (esempi): passaggio da form online / preventivi a CRM o gestionale, promemoria automatici per scadenze, consegne, attività cruciali, invio automatico di report periodici a imprenditore e responsabili.',
                    ],
                    output: '2–3 automazioni chiave attive che tagliano ore di lavoro ripetitivo ogni settimana.',
                  },
                  {
                    step: '5',
                    title: 'AI a supporto di decisioni, persone e numeri',
                    content: [
                      'Implementazione di assistenti AI per: analizzare KPI e trend, riassumere report e verbali di riunione, generare bozze di procedure, mansionari, comunicazioni.',
                      'Formazione mirata ai responsabili su come usare l\'AI nel quotidiano (non per giocare, ma per lavorare meglio).',
                      'Revisione trimestrale per capire dove spingere di più su AI e automazioni.',
                    ],
                    output: 'AI integrata nella gestione quotidiana dell\'azienda, non come gadget ma come strumento di lavoro.',
                  },
                ].map((item) => (
                  <div key={item.step} className="bg-white rounded-lg p-6 border border-[var(--color-line)]">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-heading font-bold text-xl">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-3">
                          {item.title}
                        </h3>
                        <ul className="space-y-2 mb-4">
                          {item.content.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-[var(--color-card)] rounded p-3 border border-[var(--color-line)]">
                          <p className="text-sm font-semibold text-[var(--color-text)] mb-1">Output:</p>
                          <p className="text-sm text-[var(--color-subtext)]">{item.output}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 5 - A chi è dedicato */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Per quali PMI è pensato questo tipo di intervento"
              description="Il percorso Digitalizzazione & AI per PMI è ideale se..."
              centered
            />
            <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Ideale se:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span>hai tra <strong>5 e 50 collaboratori</strong>;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span>hai già un gestionale, ma lo usate poco o ognuno lo usa a modo suo;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span>senti che l'azienda è diventata <strong>"pesante da gestire"</strong> e ti manca il cruscotto;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span>vuoi usare <strong>Intelligenza Artificiale e automazioni</strong>, ma non hai nessuno interno che possa guidare il progetto;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span>lavori in Veneto (<strong>Venezia, Padova, Rovigo</strong>) e vuoi un consulente che <strong>conosce le PMI del territorio</strong>.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
                    <span className="text-red-600">✗</span>
                    Non è l'intervento giusto se:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold mt-1">•</span>
                      <span>cerchi solo "il software magico da comprare";</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold mt-1">•</span>
                      <span>non sei disposto a mettere in discussione <strong>come lavora oggi l'azienda</strong>;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold mt-1">•</span>
                      <span>vuoi un progetto IT gigantesco... ma non vuoi mettere risorse interne per seguirlo.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 6 - Cosa ottieni */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Cosa ti porti a casa dalla digitalizzazione fatta così"
              description="Risultati concreti e misurabili"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {[
                'Una mappa chiara dei processi della tua PMI.',
                'Un set di strumenti digitali essenziali, realmente utilizzati dal team.',
                'Cruscotti KPI leggibili, collegati a dati il più possibile aggiornati automaticamente.',
                'Alcune automazioni chiave che liberano ore ogni settimana.',
                'Una prima integrazione dell\'Intelligenza Artificiale nel lavoro quotidiano.',
                'Un metodo replicabile, che puoi continuare a far evolvere anche senza di me.',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-[var(--color-line)]">
                  <span className="text-[var(--color-primary)] font-bold mt-1">✓</span>
                  <span className="text-[var(--color-text)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 7 - Perché lavorare con me */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Perché posso aiutarti sulla digitalizzazione della tua PMI"
              description="Ho iniziato dentro una PMI, non in una software house"
              centered
            />
            <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed mt-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                  <span>Ho iniziato nel <strong>2011</strong> dentro la PMI di famiglia, non in una software house.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                  <span>Ho vissuto sulla mia pelle cosa significa <strong>gestire persone, ordini, magazzino, clienti e fornitori</strong> in un'azienda veneta reale.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                  <span>Sono <strong>consulente aziendale senior OSM</strong> e lavoro ogni giorno su: organizzazione, KPI, passaggi generazionali, sviluppo delle persone.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] font-bold mt-1">•</span>
                  <span>Negli ultimi anni ho affiancato questi pilastri con la <strong>digitalizzazione pratica</strong>: dashboard, automazioni, strumenti online, Intelligenza Artificiale al servizio degli imprenditori.</span>
                </li>
              </ul>
              <p className="mt-6 text-center text-lg font-semibold">
                Il mio obiettivo non è trasformarti in un informatico, ma darti <strong>un'azienda più leggera, veloce e controllabile</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 8 - CTA finale */}
      <section className="py-16 bg-[var(--color-primary)] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Pronto a fare il primo passo?
            </h2>
            <p className="text-xl mb-6 opacity-95">
              Possiamo partire da un <strong>Check-up Digitale Gratuito</strong> di 60 minuti (Zoom) o 90 minuti in presenza (Venezia–Padova–Rovigo).
            </p>
            <div className="bg-white/10 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
              <p className="mb-4 font-semibold">Porti:</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>come lavori oggi,</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>quali strumenti usi,</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>dove senti il caos o gli sprechi.</span>
                </li>
              </ul>
              <p className="mb-4 font-semibold">Ti mostro:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>dove stai perdendo tempo e soldi,</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>da quali <strong>2–3 interventi digitali</strong> partire,</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>che tipo di progetto può servirti (anche in più step).</span>
                </li>
              </ul>
            </div>
            <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
              Prenota il Check-up Digitale →
            </CTA>
            <p className="text-sm mt-4 opacity-90">
              Oppure <Link href="https://wa.me/393475290564" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">scrivimi su WhatsApp</Link> per un primo confronto veloce.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

