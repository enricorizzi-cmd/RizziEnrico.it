# 📊 Piano di Miglioramenti SEO e Performance
## www.rizzienrico.it

**Data creazione:** 14 Novembre 2025  
**Basato su:** SEO Audit (SEOptimer) + PageSpeed Insights

---

## 🎯 OBIETTIVI

1. **SEO**: Migliorare visibilità e ranking su Google per keyword target
2. **Performance**: Raggiungere Core Web Vitals ottimali (LCP < 2.5s, CLS < 0.1, INP < 200ms)
3. **Accessibilità**: Migliorare score accessibilità per utenti con disabilità
4. **Best Practices**: Allineare il sito alle best practices moderne

---

## 🔴 PRIORITÀ ALTA - Azioni Immediate

### 1. PERFORMANCE - Ottimizzazione Immagini

**Problema comune:** Immagini troppo pesanti causano LCP lento

**Azioni:**
- [ ] **Verificare e ottimizzare tutte le immagini**
  - Controllare dimensione file (obiettivo: <200KB per immagini hero)
  - Convertire in WebP/AVIF dove possibile
  - Implementare lazy loading per immagini below-the-fold
  - Usare `next/image` con `priority` solo per LCP image

**File da verificare:**
- `public/` - tutte le immagini statiche
- Componenti che usano immagini: `Hero.tsx`, `ProfilePhoto.tsx`, `Card.tsx`

**Implementazione:**
```tsx
// Esempio ottimizzazione hero image
<Image
  src="/hero-image.jpg"
  alt="..."
  width={1200}
  height={630}
  priority // Solo per LCP image
  quality={85}
  format="webp"
/>
```

---

### 2. PERFORMANCE - Ridurre JavaScript non utilizzato

**Problema comune:** Bundle JS troppo grande causa TBT (Total Blocking Time) alto

**Azioni:**
- [ ] **Analizzare bundle size**
  - Eseguire `npm run build` e controllare output
  - Identificare librerie pesanti non utilizzate
  - Implementare code splitting per route pesanti

- [ ] **Ottimizzare import dinamici**
  - Convertire componenti pesanti in dynamic imports
  - Lazy load componenti non critici (calcolatori, grafici)

**File da ottimizzare:**
- `app/calcolatore-investimento/page.tsx` - può essere lazy loaded
- Componenti Chart.js - già ottimizzati ma verificare

**Implementazione:**
```tsx
// Dynamic import per componenti pesanti
const CalcolatoreInvestimento = dynamic(
  () => import('@/components/CalcolatoreInvestimento'),
  { ssr: false, loading: () => <div>Caricamento...</div> }
);
```

---

### 3. SEO - Meta Tags Mancanti o Non Ottimali

**Problema comune:** Alcune pagine potrebbero avere meta tags non ottimizzati

**Azioni:**
- [ ] **Verificare tutte le pagine con Google Rich Results Test**
  - Homepage: `/`
  - Servizi: `/servizi`
  - Digitalizzazione: `/digitalizzazione-pmi-ai` (nuova pagina)
  - Pagine locali: `/consulenza-pmi-venezia`, `/consulenza-pmi-padova`, `/consulenza-pmi-rovigo`

- [ ] **Aggiungere meta tags mancanti**
  - Verificare che ogni pagina abbia `title` unico (<60 caratteri)
  - Verificare che ogni pagina abbia `description` unica (<160 caratteri)
  - Aggiungere `canonical` URL se necessario

**File da verificare:**
- Tutte le pagine in `app/` che non usano `generateMetadata`

---

### 4. SEO - Schema Markup Completo

**Problema comune:** Schema JSON-LD potrebbero essere incompleti o non validati

**Azioni:**
- [ ] **Validare tutti gli schema JSON-LD**
  - Usare [Google Rich Results Test](https://search.google.com/test/rich-results)
  - Verificare LocalBusiness schema (homepage)
  - Verificare Person schema (chi-sono)
  - Verificare Service schema (servizi)
  - Verificare FAQPage schema (homepage)

- [ ] **Aggiungere schema mancanti**
  - BreadcrumbList per navigazione
  - Article schema per blog posts
  - Event schema per pagina eventi

**File da verificare:**
- `app/page.tsx` - LocalBusiness + FAQPage
- `app/chi-sono/page.tsx` - Person
- `app/servizi/page.tsx` - Service
- `app/eventi/page.tsx` - Event (da aggiungere)

---

### 5. PERFORMANCE - Font Loading Ottimizzato

**Problema comune:** Font non caricati correttamente causano FOIT/FOUT

**Azioni:**
- [ ] **Verificare font loading**
  - Font già configurati con `display: swap` ✅
  - Verificare che `preload` sia attivo per font critici
  - Considerare `font-display: optional` per font non critici

**File da verificare:**
- `app/layout.tsx` - configurazione font Inter e Montserrat

**Miglioramento possibile:**
```tsx
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap", // ✅ Già presente
  preload: true, // ✅ Già presente
  adjustFontFallback: true, // Aggiungere per migliorare CLS
});
```

---

## 🟠 PRIORITÀ MEDIA - Azioni da Completare entro 2 Settimane

### 6. SEO - Link Interni Strategici

**Problema comune:** Link interni non ottimizzati per SEO

**Azioni:**
- [ ] **Aggiungere link interni contestuali**
  - Link da homepage a pagine servizi con anchor text descrittivi
  - Link tra pagine correlate (es: servizi → digitalizzazione)
  - Link da footer a pagine importanti

- [ ] **Verificare anchor text**
  - Evitare "clicca qui" o "leggi di più"
  - Usare keyword descrittive: "Consulenza PMI Venezia", "Digitalizzazione PMI"

**File da verificare:**
- `app/page.tsx` - link interni nella homepage
- `components/Footer.tsx` - link footer

---

### 7. SEO - Contenuti Ottimizzati per Keyword

**Problema comune:** Contenuti potrebbero non essere ottimizzati per keyword target

**Azioni:**
- [ ] **Analizzare keyword target**
  - Consulenza PMI Veneto
  - Consulente aziendale Venezia/Padova/Rovigo
  - Digitalizzazione PMI
  - KPI PMI
  - Organizzazione aziendale

- [ ] **Ottimizzare contenuti**
  - Assicurarsi che keyword principali appaiano in H1, H2, primi 100 caratteri
  - Aggiungere varianti semantiche delle keyword
  - Evitare keyword stuffing

**File da verificare:**
- Tutte le pagine principali

---

### 8. PERFORMANCE - Caching e CDN

**Problema comune:** Risorse statiche non cachate correttamente

**Azioni:**
- [ ] **Configurare caching headers**
  - Verificare che immagini statiche abbiano cache headers appropriati
  - Configurare cache per font, CSS, JS

- [ ] **Considerare CDN**
  - Se hosting su Render, verificare se CDN è incluso
  - Considerare Cloudflare o Vercel per CDN globale

**File da verificare:**
- `middleware.ts` - aggiungere cache headers se necessario
- Configurazione hosting (Render)

**Implementazione cache headers:**
```tsx
// In middleware.ts
if (request.nextUrl.pathname.startsWith('/_next/static')) {
  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
}
```

---

### 9. SEO - Sitemap e Robots.txt

**Problema comune:** Sitemap potrebbe non essere completa o aggiornata

**Azioni:**
- [ ] **Verificare sitemap.xml**
  - Assicurarsi che tutte le pagine importanti siano incluse
  - Verificare che `/digitalizzazione-pmi-ai` sia inclusa ✅ (già fatto)
  - Aggiungere `lastModified` accurati

- [ ] **Verificare robots.txt**
  - Assicurarsi che non blocchi risorse importanti
  - Verificare che punti alla sitemap

**File da verificare:**
- `app/sitemap.ts` - già presente ✅
- `app/robots.ts` - già presente ✅
- `public/robots.txt` - verificare coerenza

---

### 10. ACCESSIBILITÀ - Miglioramenti A11y

**Problema comune:** Score accessibilità potrebbe essere migliorabile

**Azioni:**
- [ ] **Verificare accessibilità**
  - Usare Lighthouse per audit accessibilità
  - Verificare contrasto colori (WCAG AA minimo)
  - Assicurarsi che tutti i link abbiano testo descrittivo
  - Verificare che immagini abbiano alt text appropriato

- [ ] **Miglioramenti specifici**
  - Aggiungere `aria-label` dove necessario
  - Verificare navigazione da tastiera
  - Assicurarsi che form abbiano label associati

**File da verificare:**
- Tutti i componenti principali
- Form in `app/contatti/page.tsx`

---

## 🟢 PRIORITÀ BASSA - Miglioramenti Futuri

### 11. SEO - Contenuti Aggiuntivi

**Azioni:**
- [ ] **Aggiungere blog posts regolari**
  - Articoli su temi: KPI, organizzazione, digitalizzazione PMI
  - Aggiornare regolarmente per segnali freshness

- [ ] **Aggiungere case study dettagliati**
  - Pagine dedicate per ogni case study
  - Schema Article per ogni case study

---

### 12. PERFORMANCE - Monitoring e Analytics

**Azioni:**
- [ ] **Configurare monitoring performance**
  - Google Search Console già configurato ✅
  - Considerare Real User Monitoring (RUM)
  - Monitorare Core Web Vitals nel tempo

- [ ] **Analytics avanzati**
  - Configurare eventi personalizzati in GA4
  - Tracciare conversioni (form submissions, CTA clicks)

---

### 13. SEO - Link Building e Local SEO

**Azioni:**
- [ ] **Local SEO**
  - Verificare presenza su Google Business Profile
  - Ottenere recensioni Google
  - Listare su directory locali (Yellow Pages, Pagine Gialle)

- [ ] **Link building**
  - Ottenere link da siti locali veneti
  - Partecipare a eventi e ottenere menzioni
  - Guest posting su blog settore

---

## 📋 CHECKLIST IMPLEMENTAZIONE

### Fase 1 - Performance (Settimana 1)
- [ ] Ottimizzare tutte le immagini
- [ ] Implementare lazy loading per immagini below-fold
- [ ] Analizzare e ridurre bundle JS
- [ ] Configurare cache headers

### Fase 2 - SEO Tecnico (Settimana 2)
- [ ] Validare tutti gli schema JSON-LD
- [ ] Verificare meta tags su tutte le pagine
- [ ] Aggiungere schema mancanti (BreadcrumbList, Event)
- [ ] Verificare sitemap completa

### Fase 3 - Contenuti e Link (Settimana 3)
- [ ] Ottimizzare contenuti per keyword
- [ ] Aggiungere link interni strategici
- [ ] Verificare anchor text

### Fase 4 - Accessibilità (Settimana 4)
- [ ] Audit accessibilità completo
- [ ] Correggere problemi contrasto
- [ ] Migliorare navigazione da tastiera
- [ ] Verificare form accessibility

---

## 🔧 STRUMENTI CONSIGLIATI

### Testing SEO
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org Validator](https://validator.schema.org/)

### Testing Performance
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### Testing Accessibilità
- [WAVE](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- Lighthouse Accessibility Audit

---

## 📊 METRICHE DA MONITORARE

### SEO Metrics
- **Posizioni keyword** su Google Search Console
- **CTR da SERP** (Click-Through Rate)
- **Impressions** e **Clicks**
- **Schema markup errors** in Search Console

### Performance Metrics
- **LCP** (Largest Contentful Paint) - Target: < 2.5s
- **CLS** (Cumulative Layout Shift) - Target: < 0.1
- **INP** (Interaction to Next Paint) - Target: < 200ms
- **FCP** (First Contentful Paint) - Target: < 1.8s
- **TBT** (Total Blocking Time) - Target: < 200ms

### Accessibilità Metrics
- **Lighthouse Accessibility Score** - Target: > 90
- **WCAG Compliance** - Target: AA minimo

---

## 🚀 PROSSIMI STEP IMMEDIATI

1. **Oggi:**
   - Eseguire audit completo con Lighthouse
   - Identificare problemi critici di performance
   - Verificare schema JSON-LD con Rich Results Test

2. **Questa settimana:**
   - Ottimizzare immagini più pesanti
   - Implementare miglioramenti performance prioritari
   - Validare e correggere schema markup

3. **Prossime 2 settimane:**
   - Completare ottimizzazioni SEO tecniche
   - Migliorare contenuti e link interni
   - Audit accessibilità completo

---

## 📝 NOTE IMPORTANTI

- **Testare sempre** dopo ogni modifica
- **Monitorare** metriche nel tempo
- **Documentare** tutte le modifiche apportate
- **Backup** prima di modifiche importanti

---

**Prossimo aggiornamento:** Dopo implementazione Fase 1

