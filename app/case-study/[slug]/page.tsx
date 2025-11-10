import { notFound } from 'next/navigation';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import Testimonial from '@/components/Testimonial';
import CTA from '@/components/CTA';
import ClientKPIChart from '@/app/components/ClientKPIChart';

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
      'Riunioni mensili basate su KPI (prima: riunioni caotiche)',
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
      'Transizione completata senza interruzioni operative',
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
      'Lead tracking funzionante (prima: zero)',
      'Conversion rate migliorato del 40%',
      'Marketing ROI misurabile e positivo',
    ],
    testimonial: {
      quote: 'Prima vendevamo "a caso". Ora abbiamo una pipeline chiara, obiettivi misurabili, marketing che funziona. Il team è più motivato e i risultati si vedono.',
      authorName: 'Anna Verdi',
      role: 'Titolare',
      company: 'Azienda Commerciale',
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
    <div className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex gap-3 mb-4">
              <span className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded text-sm font-medium">
                {caseItem.sector}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                {caseItem.size}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
              {caseItem.title}
            </h1>
          </div>

          {/* Contesto */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-4">
              Contesto
            </h2>
            <p className="text-lg text-[var(--color-subtext)] leading-relaxed whitespace-pre-line">
              {caseItem.context}
            </p>
          </section>

          {/* Problema */}
          <section className="mb-12 bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <h2 className="font-heading text-2xl font-bold text-red-900 mb-4">
              Il Problema
            </h2>
            <p className="text-red-800 leading-relaxed whitespace-pre-line">
              {caseItem.problem}
            </p>
          </section>

          {/* Intervento */}
          <section className="mb-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h2 className="font-heading text-2xl font-bold text-blue-900 mb-4">
              L'Intervento
            </h2>
            <p className="text-blue-800 leading-relaxed whitespace-pre-line">
              {caseItem.intervention}
            </p>
          </section>

          {/* KPI Prima/Dopo */}
          <section className="mb-12">
            <SectionTitle title="KPI: Prima vs Dopo" centered />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-red-700 mb-4">Prima</h3>
                <ClientKPIChart data={caseItem.kpiBefore} />
              </div>
              <div>
                <h3 className="font-semibold text-green-700 mb-4">Dopo</h3>
                <ClientKPIChart data={caseItem.kpiAfter} />
              </div>
            </div>
          </section>

          {/* Risultati */}
          <section className="mb-12 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h2 className="font-heading text-2xl font-bold text-green-900 mb-4">
              Risultati Ottenuti
            </h2>
            <ul className="space-y-2">
              {caseItem.results.map((result, index) => (
                <li key={index} className="flex items-start gap-2 text-green-800">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">{result}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Testimonianza */}
          <section className="mb-12">
            <Testimonial {...caseItem.testimonial} />
          </section>

          {/* CTA */}
          <section className="bg-[var(--color-primary)] text-white rounded-[var(--radius-card)] p-8 text-center">
            <h2 className="font-heading text-2xl font-bold mb-4">
              Vuoi risultati simili?
            </h2>
            <p className="mb-6 opacity-90">
              Prenota una diagnosi gratuita e scopri come possiamo applicare il metodo alla tua PMI.
            </p>
            <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
              Prenota diagnosi 30' →
            </CTA>
          </section>
        </div>
      </div>
    </div>
  );
}

