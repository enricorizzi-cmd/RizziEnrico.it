'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import CTA from '@/components/CTA';

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
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
      <Hero
        h1="Blog Consulenza PMI"
        subtitle="Guide pratiche su KPI, organizzazione e processi. Strumenti concreti per imprenditori che vogliono gestire l'azienda con i numeri."
        badge="Blog"
        primaryCTA={{
          text: 'Iscriviti alla Newsletter',
          href: '#newsletter',
        }}
        image="/enrico-rizzi.jpg" // Placeholder
      />

      <div className="py-20 bg-[var(--color-bg-secondary)] min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Intro */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xl text-[var(--color-subtext)]">
              Non solo teoria: qui trovi guide operative, template e casi studio per applicare subito il metodo nella tua azienda.
            </p>
          </div>

          {/* Lista Post */}
          <div
            ref={ref}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          >
            {posts.map((post) => (
              <Card
                key={post.slug}
                title={post.title}
                variant="blog"
                href={`/blog/${post.slug}`}
                className="premium-card-hover h-full bg-white border border-[var(--color-line)]"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded text-xs font-bold uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mb-6 text-[var(--color-subtext)] text-sm leading-relaxed">{post.excerpt}</p>
                <div className="mt-auto pt-4 border-t border-[var(--color-line)]/50 flex items-center justify-between text-xs text-[var(--color-subtext)]">
                  <span>{new Date(post.publishedAt).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span className="font-medium text-[var(--color-primary)]">Leggi tutto →</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Newsletter Box */}
          <div id="newsletter" className="max-w-4xl mx-auto bg-[var(--color-primary)] rounded-[2rem] p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay"></div>
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay"></div>
            </div>

            <div className="relative z-10">
              <h2 className="font-heading text-2xl font-bold mb-4">
                Resta aggiornato
              </h2>
              <p className="mb-8 opacity-90 max-w-lg mx-auto">
                Ricevi ogni mese consigli pratici su gestione aziendale, KPI e organizzazione. Niente spam, solo contenuti utili.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="La tua email aziendale"
                  className="px-6 py-3 rounded-lg text-[var(--color-text)] w-full focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="px-8 py-3 bg-white text-[var(--color-primary)] font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                  Iscriviti
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
