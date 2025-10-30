# Sito Enrico Rizzi - Consulente OSM per PMI

Sito personale realizzato con Next.js 16, TypeScript, TailwindCSS e Supabase.

## Stack Tecnologico

- **Framework**: Next.js 16 (App Router)
- **Linguaggio**: TypeScript
- **Styling**: TailwindCSS 4
- **Database**: Supabase (PostgreSQL)
- **Validazione**: Zod
- **Forms**: React Hook Form
- **Grafici**: Chart.js / React Chart.js 2
- **Hosting**: Render (configurabile)

## Setup Locale

1. **Clona il repository e installa le dipendenze:**
   ```bash
   npm install
   ```

2. **Configura le variabili d'ambiente:**
   
   Crea un file `.env.local` nella root del progetto:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_CALENDLY_LINK=your_calendly_link
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=rizzienrico.it
   ```

3. **Avvia il server di sviluppo:**
   ```bash
   npm run dev
   ```

4. **Apri [http://localhost:3000](http://localhost:3000)**

## Struttura Progetto

```
rizzienrico.it/
├── app/
│   ├── (public)/          # Pagine marketing
│   │   ├── page.tsx       # Home
│   │   ├── metodo/
│   │   ├── servizi/
│   │   ├── case-study/
│   │   ├── eventi/
│   │   ├── risorse/
│   │   ├── blog/
│   │   ├── chi-sono/
│   │   └── contatti/
│   ├── api/               # API routes
│   │   ├── lead/
│   │   ├── book/
│   │   ├── register-event/
│   │   └── download/
│   └── layout.tsx
├── components/            # Componenti riusabili
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Card.tsx
│   ├── CTA.tsx
│   └── ...
├── lib/                   # Utilities
│   ├── supabase.ts
│   ├── validators.ts
│   ├── seo.ts
│   └── scoring.ts
└── public/                # Asset statici
```

## Setup Supabase

Esegui gli script SQL per creare le tabelle necessarie (vedi `supabase/schema.sql`).

Tabelle principali:
- `leads` - Lead generati da form e AI
- `bookings` - Appuntamenti prenotati
- `case_studies` - Case study pubblicati
- `services` - Servizi offerti
- `events` - Eventi e speaking
- `blog_posts` - Post blog
- `testimonials` - Testimonianze

## Deploy su Render

1. Crea un nuovo Web Service su Render
2. Connetti il repository GitHub
3. Configura:
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm run start`
   - **Environment**: Node 20 LTS
4. Aggiungi tutte le variabili d'ambiente necessarie

## Funzionalità Implementate

### Sprint 1 (Fondamenta)
- ✅ Setup Next.js + TypeScript + TailwindCSS
- ✅ Design System completo (token CSS)
- ✅ Header/Footer responsive
- ✅ Home page con Hero, Metodo preview, Servizi, Case Study
- ✅ Pagina Contatti con form multi-step
- ✅ API routes per lead e booking
- ✅ SEO base (metadata, JSON-LD)

### Prossimi Sprint

**Sprint 2**: Metodo completa, Pagine Servizi, Case Study dettaglio, Risorse (KPI Pack), Blog, Eventi, PWA

**Sprint 3**: AI Assistant, Mini-tool KPI, Testimonianze video, QR eventi, Ottimizzazioni CWV/AA

## Note

- Il design system usa token CSS custom per coerenza
- I font Montserrat e Inter sono caricati via Google Fonts
- La validazione form usa Zod + React Hook Form
- Il sistema di scoring lead è basato su dimensione azienda, fatturato e problem relevance

## Licenza

Proprietario: Enrico Rizzi
