import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import { createServerClient } from '@/lib/supabase';

export const metadata = generateMetadata({
  title: 'Case Study - Storie di successo PMI organizzate | Enrico Rizzi',
  description: 'Case study di PMI che hanno trasformato organizzazione e risultati con metodo e KPI. Risultati misurabili e testimonianze reali.',
  path: '/case-study',
});

interface CaseStudy {
  slug: string;
  title: string;
  sector: string;
  size: string;
  context: string;
  cover_image?: string;
}

export default async function CaseStudyPage() {
  // In produzione: fetch da Supabase
  // Per ora: dati mock
  const cases: CaseStudy[] = [
    {
      slug: 'pmi-manifatturiera-45',
      title: 'Da attività reattiva a processi stabili',
      sector: 'Manifatturiero',
      size: '45 addetti',
      context: 'PMI manifatturiera che ha implementato organizzazione e KPI dashboard',
    },
    {
      slug: 'passaggio-generazionale',
      title: 'Passaggio generazionale riuscito',
      sector: 'Servizi',
      size: '28 addetti',
      context: 'Transizione leadership con metodo strutturato',
    },
    {
      slug: 'crescita-vendite',
      title: '+35% fatturato in 12 mesi',
      sector: 'Commercio',
      size: '15 addetti',
      context: 'Organizzazione vendite e marketing con KPI chiari',
    },
  ];

  return (
    <div className="py-16 bg-[var(--color-card)] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
            Case Study
          </h1>
          <p className="text-xl text-[var(--color-subtext)] max-w-3xl mx-auto">
            PMI che hanno trasformato organizzazione e risultati con metodo e KPI.
            Storie reali con numeri misurabili.
          </p>
        </div>

        {/* Filtri */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          <button className="px-4 py-2 bg-white border border-[var(--color-line)] rounded-lg text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-card)] transition-colors">
            Tutti i settori
          </button>
          <button className="px-4 py-2 bg-white border border-[var(--color-line)] rounded-lg text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-card)] transition-colors">
            Manifatturiero
          </button>
          <button className="px-4 py-2 bg-white border border-[var(--color-line)] rounded-lg text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-card)] transition-colors">
            Servizi
          </button>
          <button className="px-4 py-2 bg-white border border-[var(--color-line)] rounded-lg text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-card)] transition-colors">
            10-50 addetti
          </button>
        </div>

        {/* Lista Case */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem) => (
            <Card
              key={caseItem.slug}
              title={caseItem.title}
              variant="case"
              href={`/case-study/${caseItem.slug}`}
            >
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded text-xs font-medium">
                    {caseItem.sector}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {caseItem.size}
                  </span>
                </div>
                <p className="text-[var(--color-subtext)]">{caseItem.context}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

