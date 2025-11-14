import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';

export const metadata = generateMetadata({
  title: 'Blog consulenza PMI – Guide pratiche su KPI, organizzazione e processi | Enrico Rizzi',
  description: 'Articoli pratici per PMI su KPI, controllo di gestione, mansionari, riunioni efficaci e crescita organizzata. Guide concrete per imprenditori e manager che vogliono gestire l\'azienda con numeri e metodo.',
  path: '/blog',
});

// Mock data - in produzione da Supabase
const posts = [
  {
    slug: 'kpi-per-pmi-guida-pratica',
    title: 'KPI per PMI: 5 indicatori essenziali da monitorare subito',
    excerpt: 'Inizia con questi 5 KPI base: fatturato, marginalità, incassi, lead, consegne. Come definirli, misurarli e usarli nelle decisioni.',
    tags: ['KPI', 'Controllo di Gestione'],
    publishedAt: '2024-01-15',
    author: 'Enrico Rizzi',
  },
  {
    slug: 'mansionari-osm-come-definirli',
    title: 'Mansionari OSM: come definirli per ruoli chiari',
    excerpt: 'Guida pratica per creare mansionari efficaci: struttura, contenuti, processo di revisione. Template gratuito incluso.',
    tags: ['Organizzazione', 'Mansionari'],
    publishedAt: '2024-01-10',
    author: 'Enrico Rizzi',
  },
  {
    slug: 'riunioni-effacesi-con-kpi',
    title: 'Riunioni efficaci: agenda strutturata e KPI',
    excerpt: 'Come trasformare riunioni caotiche in sessioni produttive basate sui numeri. Template agenda e best practice.',
    tags: ['Processi', 'Leadership'],
    publishedAt: '2024-01-05',
    author: 'Enrico Rizzi',
  },
];

export default function BlogPage() {
  return (
    <div className="py-16 bg-[var(--color-card)] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
            Blog Consulenza PMI: Guide Pratiche su KPI e Organizzazione
          </h1>
          <p className="text-xl text-[var(--color-subtext)] max-w-3xl mx-auto">
            Articoli pratici su organizzazione aziendale, KPI, processi e crescita per PMI.
          </p>
        </div>

        {/* Lista Post */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post) => (
            <Card
              key={post.slug}
              title={post.title}
              variant="blog"
              href={`/blog/${post.slug}`}
            >
              <p className="mb-4 text-sm">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-[var(--color-subtext)]">
                {new Date(post.publishedAt).toLocaleDateString('it-IT', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

