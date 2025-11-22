'use client';

import { notFound } from 'next/navigation';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import Testimonial from '@/components/Testimonial';
import CTA from '@/components/CTA';
import ClientKPIChart from '@/components/ClientKPIChart';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const cases = {
  'pmi-manifatturiera-45': {
    title: 'Da attività reattiva a processi stabili',
    sector: 'Manifatturiero',
    size: '45 addetti',
    context: 'PMI manifatturiera del Veneto, fatturato €8M, in crescita ma con organizzazione insufficiente che limitava ulteriori sviluppo.',
    problem: 'Riunioni senza agenda, KPI non definiti, processi variabili a seconda delle persone. Tempi di consegna imprevedibili, conflitti tra reparti.',
    intervention: 'Implementazione Metodo 5 Step in 6 mesi:\n1. Ruoli e mansionari per 30 posizioni\n2. Dashboard KPI con 12 indicatori chiave\n3. Riunioni mensili strutturate\n4. Formazione manageriale\n5. Organizzazione vendite',
    kpiBefore: {
      labels: ['Genn', 'Febb', 'Mar', 'Apr', 'Mag', 'Giu'],
      datasets: [{
        label: 'Fatturato (€M)',
        data: [0.65, 0.58, 0.72, 0.68, 0.75, 0.70],
        borderColor: '#DC2626',
      }],
    },
    kpiAfter: {
      labels: ['Genn', 'Febb', 'Mar', 'Apr', 'Mag', 'Giu'],
      datasets: [{
        label: 'Fatturato (€M)',
        data: [0.72, 0.85, 0.92, 0.88, 0.95, 1.02],
        borderColor: '#16A34A',
      }],
    },
    results: [
      '+42% fatturato in 6 mesi',
      '-25% tempi di consegna medi',
      'Riunioni mensili basate su KPI',
      'Riduzione conflitti tra reparti del 60%',
    ],
    testimonial: {
      quote: 'Prima gestivamo tutto "a sensazione". Ora abbiamo numeri chiari, processi definiti, riunioni efficaci. In 6 mesi abbiamo recuperato margini che non sapevamo di avere.',
      authorName: 'Mario Rossi',
      role: 'Amministratore Delegato',
      company: 'Azienda Manifatturiera Veneto',
    },
  },
  'passaggio-generazionale': {
    title: 'Passaggio generazionale riuscito',
    sector: 'Servizi',
    size: '28 addetti',
    context: 'Azienda familiare, passaggio generazionale da padre a figlio. Necessità di modernizzare organizzazione mantenendo patrimonio conoscenze.',
    problem: 'Transizione difficile: nuovo management senza esperienza, team abituato a gestione precedente, mancanza di processi documentati.',
    intervention: 'Affiancamento 12 mesi:\n1. Documentazione processi esistenti\n2. Formazione nuova leadership\n3. Dashboard KPI per monitorare transizione\n4. Team building per coesione\n5. Piano crescita strutturato',
    kpiBefore: {
      labels: ['Genn', 'Febb', 'Mar', 'Apr', 'Mag', 'Giu'],
      datasets: [{
        label: 'Turnover (%)',
        data: [15, 18, 12, 20, 16, 22],
        borderColor: '#DC2626',
      }],
    },
    kpiAfter: {
      labels: ['Genn', 'Febb', 'Mar', 'Apr', 'Mag', 'Giu'],
      datasets: [{
        label: 'Turnover (%)',
        data: [12, 8, 6, 5, 4, 3],
        borderColor: '#16A34A',
      }],
    },
    results: [
      'Transizione completata senza interruzioni',
      '-75% turnover in 6 mesi',
      'Team allineato al nuovo management',
      'Processi documentati e replicabili',
    ],
    testimonial: {
      quote: 'Il passaggio era critico. Grazie al metodo strutturato, abbiamo mantenuto continuità operativa e migliorato anche l\'organizzazione. Il team ora è più unito.',
      authorName: 'Luigi Bianchi',
      role: 'Nuovo AD',
      company: 'Azienda Servizi Familiare',
    },
  },
  'crescita-vendite': {
    title: '+35% fatturato in 12 mesi',
    sector: 'Commercio',
    size: '15 addetti',
    context: 'Azienda commerciale, buoni prodotti ma vendite stagnanti. Team vendite poco organizzato, mancanza di pipeline chiara.',
    problem: 'Vendite casuali, nessun tracking lead, marketing non misurabile, team senza obiettivi chiari.',
    intervention: 'Organizzazione vendite e marketing:\n1. Pipeline vendite strutturata\n2. KPI: lead, conversion rate, CPL\n3. Processo vendita documentato\n4. Marketing allineato agli obiettivi\n5. Incentivi basati su risultati',
    kpiBefore: {
      labels: ['Genn', 'Febb', 'Mar', 'Apr', 'Mag', 'Giu'],
      datasets: [{
        label: 'Fatturato mensile (€k)',
        data: [85, 92, 88, 95, 90, 98],
        borderColor: '#DC2626',
      }],
    },
    kpiAfter: {
      labels: ['Genn', 'Febb', 'Mar', 'Apr', 'Mag', 'Giu'],
      datasets: [{
        label: 'Fatturato mensile (€k)',
        data: [98, 105, 112, 118, 125, 132],
        borderColor: '#16A34A',
      }],
    },
    results: [
      '+35% fatturato in 12 mesi',
      'Lead tracking funzionante',
      'Conversion rate migliorato del 40%',
      'Marketing ROI misurabile',
    ],
    testimonial: {
      quote: 'Prima vendevamo "a caso". Ora abbiamo una pipeline chiara, obiettivi misurabili, marketing che funziona. Il team è più motivato e i risultati si vedono.',
      authorName: 'Anna Verdi',
      role: 'Titolare',
      company: 'Azienda Commerciale',
    },
  },
  'distribuzione-ricambi-filtri': {
    title: 'Distribuzione ricambi e filtrazione: da urgenze a processi stabili',
    sector: 'Commercio B2B',
    size: '45+ addetti',
    context: 'Azienda di distribuzione ricambi e filtri, fatturato €12M. Ruoli sovrapposti, riunioni inutili, KPI assenti in logistica. Processi reattivi basati su urgenze continue.',
    problem: 'Ruoli sovrapposti tra magazzino e logistica, riunioni senza agenda che duravano ore, assenza totale di KPI per monitorare performance. "Fuoco da spegnere" continuo, puntualità consegne imprevedibile.',
    intervention: 'Organizzazione logistica e magazzino:\n1. Organigramma chiaro con ruoli definiti\n2. Mansionari per posizioni operative\n3. Cruscotto KPI logistica: puntualità, scorte, efficienza\n4. Riunioni settimanali strutturate con agenda\n5. Processi standardizzati per ordini e spedizioni',
    kpiBefore: {
      labels: ['Genn', 'Febb', 'Mar', 'Apr', 'Mag', 'Giu'],
      datasets: [{
        label: 'Puntualità consegne (%)',
        data: [68, 72, 65, 70, 75, 73],
        borderColor: '#DC2626',
      }],
    },
    kpiAfter: {
      labels: ['Genn', 'Febb', 'Mar', 'Apr', 'Mag', 'Giu'],
      datasets: [{
        label: 'Puntualità consegne (%)',
        data: [85, 88, 92, 90, 94, 96],
        borderColor: '#16A34A',
      }],
    },
    results: [
      'Processo stabile e prevedibile',
      '+28% puntualità consegne',
      'Riduzione "fuoco da spegnere" del 70%',
      'Riunioni efficaci: da 2 ore a 45 minuti',
    ],
    testimonial: {
      quote: 'Prima era tutto "fuoco da spegnere". Ora abbiamo processi stabili, numeri chiari, riunioni che servono davvero. La logistica funziona e i clienti sono più soddisfatti.',
      authorName: 'Giuseppe Neri',
      role: 'Direttore Operativo',
      company: 'Distribuzione Ricambi Veneto',
    },
  },
  'produzione-alimentare-polenta': {
    title: 'Produzione alimentare: pianificazione e qualità con KPI',
    sector: 'Alimentare',
    size: 'Linee produzione',
    context: 'Azienda di produzione alimentare specializzata in polenta e prodotti a base di mais, fatturato €15M. Programmazione reattiva, dati sparsi, assenza indicatori qualità.',
    problem: 'Programmazione produzione basata su urgenze, dati di produzione sparsi in fogli Excel, assenza totale di indicatori qualità. Scarti elevati, efficienza linee non monitorata, decisioni "a sensazione".',
    intervention: 'Organizzazione produzione e qualità:\n1. Piano settimanale strutturato per linee\n2. KPI efficienza linee: ore/uomo, resa, scarti\n3. Dashboard produzione in tempo reale\n4. Processi qualità documentati\n5. Riunioni produzione giornaliere con numeri',
    kpiBefore: {
      labels: ['Genn', 'Febb', 'Mar', 'Apr', 'Mag', 'Giu'],
      datasets: [{
        label: 'Scarti (%)',
        data: [8.5, 9.2, 7.8, 8.9, 9.1, 8.7],
        borderColor: '#DC2626',
      }],
    },
    kpiAfter: {
      labels: ['Genn', 'Febb', 'Mar', 'Apr', 'Mag', 'Giu'],
      datasets: [{
        label: 'Scarti (%)',
        data: [6.2, 5.8, 5.5, 5.2, 4.9, 4.7],
        borderColor: '#16A34A',
      }],
    },
    results: [
      'Pianificazione stabile (prima: reattiva)',
      '-45% scarti in 6 mesi',
      'Decisioni basate su numeri',
      'Efficienza linee monitorata e migliorata',
    ],
    testimonial: {
      quote: 'Prima programmavamo "a occhio". Ora abbiamo numeri chiari, pianificazione stabile, qualità misurabile. Gli scarti sono diminuiti e l\'efficienza è migliorata.',
      authorName: 'Marco Ferrari',
      role: 'Direttore Produzione',
      company: 'Produzione Alimentare Veneto',
    },
  },
  'lattoneria-coperture-cantiere': {
    title: 'Lattoneria & Coperture: passaggio generazionale riuscito',
    sector: 'Edile/Impiantistico',
    size: 'Cantiere',
    context: 'Azienda di lattoneria e coperture, passaggio generazionale da padre a figlio. Know-how nelle persone, poco tracciamento avanzamento lavori. Necessità continuità direzionale.',
    problem: 'Know-how non documentato, avanzamento lavori tracciato "a memoria", marginalità commesse non chiara. Passaggio generazionale rischioso senza processi.',
    intervention: 'Documentazione e controllo commesse:\n1. Mansionari per ruoli cantiere/ufficio\n2. KPI avanzamento lavori e marginalità commessa\n3. Processi cantiere documentati\n4. Formazione nuova leadership\n5. Dashboard commesse in tempo reale',
    kpiBefore: {
      labels: ['Genn', 'Febb', 'Mar', 'Apr', 'Mag', 'Giu'],
      datasets: [{
        label: 'Marginalità commesse (%)',
        data: [18, 15, 20, 17, 19, 16],
        borderColor: '#DC2626',
      }],
    },
    kpiAfter: {
      labels: ['Genn', 'Febb', 'Mar', 'Apr', 'Mag', 'Giu'],
      datasets: [{
        label: 'Marginalità commesse (%)',
        data: [22, 24, 26, 25, 28, 27],
        borderColor: '#16A34A',
      }],
    },
    results: [
      'Continuità direzionale garantita',
      'Controllo commesse in tempo reale',
      '+35% marginalità media commesse',
      'Processi documentati e replicabili',
    ],
    testimonial: {
      quote: 'Il passaggio generazionale era critico. Grazie alla documentazione e ai KPI, abbiamo mantenuto continuità e migliorato anche i risultati. Ora abbiamo più controllo e ordine.',
      authorName: 'Andrea Conti',
      role: 'Nuovo Titolare',
      company: 'Lattoneria & Coperture Veneto',
    },
  },
  'impianti-clima-refrigerazione-service': {
    title: 'Impianti clima/refrigerazione: service con qualità misurabile',
    sector: 'Service tecnico',
    size: 'Team service',
    context: 'Azienda di installazione e manutenzione impianti clima e refrigerazione, fatturato €6M. Priorità confuse, reportistica carente, qualità service non misurabile.',
    problem: 'Priorità interventi confuse, reportistica post-servizio assente, tempi intervento non tracciati. Qualità service non misurabile, rientri frequenti, clienti insoddisfatti.',
    intervention: 'Organizzazione service e qualità:\n1. Agenda interventi con priorità chiare\n2. Feedback post-servizio sistematico\n3. KPI: tempi intervento, first-time-fix, ticket aperti\n4. Processo service documentato\n5. Dashboard service in tempo reale',
    kpiBefore: {
      labels: ['Genn', 'Febb', 'Mar', 'Apr', 'Mag', 'Giu'],
      datasets: [{
        label: 'First-time-fix (%)',
        data: [65, 68, 62, 70, 67, 69],
        borderColor: '#DC2626',
      }],
    },
    kpiAfter: {
      labels: ['Genn', 'Febb', 'Mar', 'Apr', 'Mag', 'Giu'],
      datasets: [{
        label: 'First-time-fix (%)',
        data: [78, 82, 85, 88, 90, 92],
        borderColor: '#16A34A',
      }],
    },
    results: [
      'Tempi intervento ridotti del 30%',
      'Qualità percepita in crescita',
      '-60% rientri su stessi problemi',
      'Ticket aperti monitorati e gestiti',
    ],
    testimonial: {
      quote: 'Prima gli interventi erano "a caso". Ora abbiamo priorità chiare, feedback sistematico, qualità misurabile. I clienti sono più soddisfatti e i rientri sono diminuiti.',
      authorName: 'Roberto Marini',
      role: 'Responsabile Service',
      company: 'Impianti Clima Veneto',
    },
  },
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const caseItem = cases[slug as keyof typeof cases];

  if (!caseItem) {
    return { title: 'Case Study non trovato' };
  }

  return generateSEOMetadata({
    title: `${caseItem.title} - Case Study | Enrico Rizzi`,
    description: caseItem.context,
    path: `/case-study/${slug}`,
  });
}

export async function generateStaticParams() {
  return Object.keys(cases).map((slug) => ({ slug }));
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const caseItem = cases[slug as keyof typeof cases];

  if (!caseItem) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header Premium */}
      <div className="bg-[var(--color-bg-secondary)] py-20 border-b border-[var(--color-line)]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/case-study" className="text-[var(--color-primary)] font-semibold hover:underline mb-6 inline-block">
              ← Torna ai Case Study
            </Link>
            <div className="flex gap-3 mb-6">
              <span className="px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-sm font-bold uppercase tracking-wide shadow-sm">
                {caseItem.sector}
              </span>
              <span className="px-3 py-1 bg-white text-[var(--color-text)] border border-[var(--color-line)] rounded-full text-sm font-medium">
                {caseItem.size}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight">
              {caseItem.title}
            </h1>
            <p className="text-xl text-[var(--color-subtext)] leading-relaxed max-w-3xl">
              {caseItem.context}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Grid Problema/Soluzione */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-red-50/50 rounded-[2rem] p-8 border border-red-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-xl">⚠️</div>
                <h2 className="font-heading text-2xl font-bold text-red-900">
                  Il Problema
                </h2>
              </div>
              <p className="text-red-900/80 leading-relaxed whitespace-pre-line text-lg">
                {caseItem.problem}
              </p>
            </div>

            <div className="bg-blue-50/50 rounded-[2rem] p-8 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">🛠️</div>
                <h2 className="font-heading text-2xl font-bold text-blue-900">
                  L'Intervento
                </h2>
              </div>
              <p className="text-blue-900/80 leading-relaxed whitespace-pre-line text-lg">
                {caseItem.intervention}
              </p>
            </div>
          </div>

          {/* KPI Prima/Dopo */}
          <section className="mb-20">
            <SectionTitle title="I Numeri Parlano" description="Risultati misurabili ottenuti grazie al metodo." centered />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white p-6 rounded-2xl border border-[var(--color-line)] shadow-sm">
                <h3 className="font-bold text-red-600 mb-4 text-center uppercase tracking-wide text-sm">Prima dell'intervento</h3>
                <ClientKPIChart data={caseItem.kpiBefore} />
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[var(--color-line)] shadow-sm ring-2 ring-green-500/20">
                <h3 className="font-bold text-green-600 mb-4 text-center uppercase tracking-wide text-sm">Dopo l'intervento</h3>
                <ClientKPIChart data={caseItem.kpiAfter} />
              </div>
            </div>
          </section>

          {/* Risultati - Bento Style */}
          <section className="mb-20">
            <h2 className="font-heading text-3xl font-bold text-[var(--color-text)] mb-8 text-center">
              Risultati Concreti
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseItem.results.map((result, index) => (
                <div key={index} className="flex items-center gap-4 bg-[var(--color-bg-secondary)] p-6 rounded-xl border border-[var(--color-line)]/50">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-bold text-[var(--color-text)] text-lg">{result}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonianza */}
          <section className="mb-20">
            <Testimonial {...caseItem.testimonial} />
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-[2rem] p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay"></div>
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay"></div>
            </div>

            <div className="relative z-10">
              <h2 className="font-heading text-3xl font-bold mb-4">
                Vuoi ottenere risultati simili?
              </h2>
              <p className="mb-8 opacity-90 text-lg max-w-2xl mx-auto">
                Ogni azienda è diversa, ma il metodo è universale. Prenota una diagnosi gratuita e scopri come applicarlo alla tua realtà.
              </p>
              <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100 border-none shadow-lg hover:shadow-xl hover:-translate-y-1">
                Prenota diagnosi 30' →
              </CTA>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
