'use client';

import { notFound } from 'next/navigation';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import JSONLD from '@/components/JSONLD';
import CTA from '@/components/CTA';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Mock data - in produzione da Supabase
const posts = {
  'kpi-per-pmi-guida-pratica': {
    title: 'KPI per PMI: 5 indicatori essenziali da monitorare subito',
    excerpt: 'Inizia con questi 5 KPI base: fatturato, marginalità, incassi, lead, consegne. Come definirli, misurarli e usarli nelle decisioni.',
    content: `# KPI per PMI: 5 indicatori essenziali
    
Molte PMI gestiscono l'azienda "a sensazione", senza numeri chiari. Ma come puoi migliorare se non misuri?

In questo articolo ti mostro i 5 KPI essenziali per iniziare subito a monitorare la tua PMI.

## 1. Fatturato

Il KPI più basilare ma spesso sottovalutato nella granularità.

**Cosa misurare:**
- Fatturato mensile vs budget/anno precedente
- Trend mese-su-mese
- Per reparto/prodotto/servizio

**Come usarlo:**
- Se il fatturato cala per 2 mesi consecutivi → azione immediata
- Confrontare con budget per identificare scostamenti

## 2. Marginalità Operativa

Non basta fatturare, devi guadagnare.

**Formula:** (Ricavi - Costi Variabili) / Ricavi × 100

**Target:** Dipende dal settore, ma generalmente 20-30% è un buon range per PMI.

**Come usarlo:**
- Se la marginalità scende → analizzare costi variabili
- Confrontare per prodotto per identificare margini negativi

## 3. Giorni Medi di Incasso (DSO)

Quanto tempo passa tra fatturazione e incasso?

**Formula:** (Crediti verso clienti / Fatturato annuo) × 365

**Target:** 30-60 giorni (dipende da settore)

**Come usarlo:**
- Se DSO aumenta → rischio liquidità
- Monitorare clienti con pagamenti ritardati

## 4. Lead Generati e Conversion Rate

Quante opportunità entrano e quante si convertono?

**KPI:**
- Lead generati mensilmente
- Conversion rate = Ordini / Lead × 100

**Target:** Conversion rate 10-20% (dipende da settore)

**Come usarlo:**
- Se lead calano → problema marketing/lead gen
- Se conversion rate cala → problema vendite

## 5. Tempi di Consegna

Quanto tempo passa dall'ordine alla consegna?

**Metrica:** Giorni medi dalla conferma ordine alla consegna

**Target:** Variabile per settore, ma stabilità è importante

**Come usarlo:**
- Tempi aumentano → problema operativo
- Variabilità alta → processi instabili

## Come iniziare

1. Scegli 3 KPI tra questi 5 (non tutti insieme!)
2. Definisci come raccogliere i dati
3. Misura per 1 mese
4. Analizza scostamenti e definisci azioni

Vuoi una dashboard preconfigurata? [Scarica il KPI Pack gratuito](/risorse).

---
*Enrico Rizzi - Consulente OSM per PMI*`,
    publishedAt: '2024-01-15',
    author: 'Enrico Rizzi',
    tags: ['KPI', 'Controllo di Gestione'],
  },
  'mansionari-osm-come-definirli': {
    title: 'Mansionari OSM: come definirli per ruoli chiari',
    excerpt: 'Guida pratica per creare mansionari efficaci: struttura, contenuti, processo di revisione.',
    content: `# Mansionari OSM: come definirli

Ruoli poco chiari generano conflitti, inefficienze e frustrazione. I mansionari sono la soluzione.

## Perché sono importanti

- Ogni persona sa esattamente cosa deve fare
- Eliminati conflitti di responsabilità
- Base solida per valutazioni e crescita

## Struttura di un mansionario efficace

### 1. Dati generali
- Posizione: Nome ruolo
- Dipartimento: Reparto di appartenenza
- Reporta a: Responsabile diretto

### 2. Obiettivo del ruolo
2-3 righe sul perché questo ruolo esiste.

### 3. Responsabilità principali
Elenca 5-7 responsabilità principali.

### 4. Attività quotidiane
Cosa fa concretamente questa persona ogni giorno.

### 5. KPI di riferimento
Quali indicatori misura questo ruolo (se applicabile).

### 6. Competenze richieste
- Formazione
- Esperienza
- Competenze tecniche

## Processo di creazione

1. **Intervista** la persona che ricopre il ruolo
2. **Osserva** le attività reali (non solo quelle teoriche)
3. **Scrivi** il mansionario con linguaggio chiaro
4. **Revisione** con la persona interessata
5. **Approvazione** del responsabile diretto

## Errori comuni

- Mansionari troppo generici
- Mansionari che non riflettono la realtà
- Nessun aggiornamento periodico

## Template gratuito

Vuoi un template Excel/Word preconfigurato? [Scarica qui](/risorse).

---
*Enrico Rizzi - Consulente OSM*`,
    publishedAt: '2024-01-10',
    author: 'Enrico Rizzi',
    tags: ['Organizzazione', 'Mansionari'],
  },
  'riunioni-effacesi-con-kpi': {
    title: 'Riunioni efficaci: agenda strutturata e KPI',
    excerpt: 'Come trasformare riunioni caotiche in sessioni produttive basate sui numeri.',
    content: `# Riunioni efficaci: agenda strutturata e KPI

Quante riunioni hai fatto quest'anno che si potevano evitare? Quante che non hanno prodotto risultati?

## Il problema

- Riunioni senza agenda → discussioni infinite
- Riunioni senza numeri → decisioni basate su opinioni
- Nessun follow-up → azioni che cadono nel vuoto

## La soluzione: riunioni basate su KPI

### 1. Agenda strutturata

**Prima parte (15 min):**
- KPI del periodo: scostamenti vs target
- Alert su indicatori critici

**Seconda parte (30 min):**
- Azioni del periodo precedente: stato di avanzamento
- Nuove azioni da decidere

**Terza parte (15 min):**
- Assegnazione responsabilità e scadenze
- Prossima riunione: data e focus

### 2. Preparazione pre-riunione

- Dashboard KPI condivisa 2 giorni prima
- Ogni partecipante prepara 3 punti da discutere

### 3. Regole di base

- Massimo 60 minuti
- Max 8 partecipanti
- Nessun telefono
- Un minuto per punto per rispettare i tempi

## Template agenda

1. **KPI del periodo** (15 min)
   - Fatturato: +5% vs target
   - Lead: -10% → azione richiesta
   
2. **Azioni precedenti** (30 min)
   - [ ] Implementazione CRM → 80% completo
   - [ ] Assunzione venditore → in corso
   
3. **Nuove azioni** (15 min)
   - Marketing: aumentare investimento lead gen
   - Operazioni: ridurre tempi consegna

## Follow-up

- File condiviso con azioni e responsabili
- Reminder automatico prima della prossima riunione
- Tracking in dashboard KPI

## Risultati attesi

- Riunioni più brevi e produttive
- Decisioni basate sui numeri
- Azioni che vengono implementate

Vuoi un template agenda preconfigurato? [Scarica il KPI Pack](/risorse).

---
*Enrico Rizzi - Consulente OSM*`,
    publishedAt: '2024-01-05',
    author: 'Enrico Rizzi',
    tags: ['Processi', 'Leadership'],
  },
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    return { title: 'Post non trovato' };
  }

  return generateSEOMetadata({
    title: `${post.title} - Blog | Enrico Rizzi`,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: 'Enrico Rizzi',
      jobTitle: 'Consulente aziendale OSM per PMI',
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: `${baseUrl}/blog/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Enrico Rizzi',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo-enrico-rizzi.png`,
      },
    },
    url: `${baseUrl}/blog/${slug}`,
  };

  return (
    <>
      <JSONLD data={articleSchema} />

      <article className="bg-white min-h-screen">
        {/* Header Premium */}
        <div className="bg-[var(--color-bg-secondary)] py-20 border-b border-[var(--color-line)]/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Link href="/blog" className="text-[var(--color-primary)] font-semibold hover:underline mb-6 inline-block">
                ← Torna al Blog
              </Link>
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-sm font-bold uppercase tracking-wide shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-[var(--color-subtext)]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <span className="font-medium text-[var(--color-text)]">{post.author}</span>
                </div>
                <span>•</span>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('it-IT', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            {/* Content */}
            <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 {...props} className="text-3xl font-bold mb-6 mt-12 first:mt-0 text-[var(--color-text)] font-heading" />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 {...props} className="text-2xl font-bold mb-4 mt-10 first:mt-0 text-[var(--color-text)] font-heading border-b border-[var(--color-line)] pb-2" />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 {...props} className="text-xl font-bold mb-3 mt-8 first:mt-0 text-[var(--color-text)] font-heading" />
                  ),
                  p: ({ node, ...props }) => (
                    <p {...props} className="mb-6 text-[var(--color-text)] leading-relaxed text-lg" />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul {...props} className="list-disc pl-6 mb-6 text-[var(--color-text)] space-y-2" />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol {...props} className="list-decimal pl-6 mb-6 text-[var(--color-text)] space-y-2" />
                  ),
                  li: ({ node, ...props }) => (
                    <li {...props} className="text-[var(--color-text)] text-lg" />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong {...props} className="font-bold text-[var(--color-primary)]" />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote {...props} className="border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-subtext)] my-8 bg-[var(--color-bg-secondary)] p-4 rounded-r-lg" />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      className="text-[var(--color-primary)] font-semibold underline hover:no-underline transition-all"
                      target={props.href?.startsWith('http') ? '_blank' : undefined}
                    />
                  ),
                  hr: ({ node, ...props }) => (
                    <hr {...props} className="my-12 border-[var(--color-line)]" />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* CTA */}
            <div className="mt-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-[2rem] p-10 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay"></div>
              </div>

              <div className="relative z-10 text-center">
                <h2 className="font-heading text-2xl font-bold mb-4">
                  Vuoi implementare questi consigli nella tua PMI?
                </h2>
                <p className="mb-8 opacity-90 text-lg">
                  Non lasciare che rimanga solo teoria. Prenota una diagnosi gratuita e vediamo come applicare il metodo alla tua realtà.
                </p>
                <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100 border-none shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Prenota diagnosi 30' →
                </CTA>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
