# 🧪 TEST COMPLETO SITO LIVE - rizzienrico.it

**Data Test**: 31 Ottobre 2025  
**URL**: https://rizzienrico-it.onrender.com  
**Status Deploy**: ✅ LIVE

---

## 📱 1. TEST RESPONSIVE DESIGN

### Mobile (375px - iPhone SE)
- [ ] Header: Menu burger funziona
- [ ] Navigation: Mobile menu si apre/chiude
- [ ] Forms: Input full-width, touch-friendly
- [ ] Typography: Leggibile senza zoom (16px+)
- [ ] Images: Caricano e si adattano
- [ ] No horizontal scroll
- [ ] Buttons: Min 44x44px touch target
- [ ] AI Chat: Accessibile e usabile

### Tablet (768px - iPad)
- [ ] Layout: Grid responsive (2 colonne)
- [ ] Navigation: Menu appropriato
- [ ] Forms: Layout ottimizzato
- [ ] Cards: Side-by-side quando possibile

### Desktop (1920px)
- [ ] Layout: Full width ottimizzato
- [ ] Navigation: Menu desktop visibile
- [ ] Grid: 3-4 colonne dove appropriato
- [ ] Spacing: Adeguato

---

## 🗄️ 2. TEST DATABASE & INSERIMENTO DATI

### Schema DB Verifica
- [ ] Tabelle presenti: leads, bookings, resources, case_studies, services, events, blog_posts, testimonials, ai_sessions, ip_orders, ip_reports, ip_team_map, ip_hiring_comparison, consents
- [ ] Campi allineati con frontend
- [ ] RLS policies attive
- [ ] Indici creati

### Test Inserimento Dati

#### Contact Form (`/api/lead`)
- [ ] Form multi-step funziona
- [ ] Validazione client-side
- [ ] Submit salva su DB (tabella `leads`)
- [ ] Score calcolato correttamente
- [ ] Redirect Calendly se score >= 40
- [ ] Error handling funziona

#### Download Form (`/api/download`)
- [ ] Form compilabile
- [ ] Submit crea lead su DB
- [ ] Source = 'download'
- [ ] Score = 10

#### Event Registration (`/api/register-event`)
- [ ] Form compilabile
- [ ] QR code generato
- [ ] Lead salvato con source = 'event'

#### AI Lead Capture
- [ ] Dopo 2+ messaggi AI, chiede dati
- [ ] Lead salvato con source = 'ai'
- [ ] Session salvata su `ai_sessions`

---

## 🔗 3. TEST INTEGRAZIONI

### Calendly
- [ ] Link presente: `https://calendly.com/enrico-rizzi/check-up-aziendale-gratuito`
- [ ] Variabile ENV: `NEXT_PUBLIC_CALENDLY_CHECKUP_URL` configurata
- [ ] Redirect automatico dopo form con score alto
- [ ] Link presente in Hero homepage
- [ ] Link presente in ContactForm success
- [ ] Link presente in CTA varie pagine
- [ ] Iframe Calendly (se presente) funziona

### WhatsApp
- [ ] Widget fluttuante visibile
- [ ] Widget si espande correttamente
- [ ] Link WhatsApp: `https://wa.me/393475290564`
- [ ] Link con testo precompilato funziona
- [ ] Banner mobile Header con WhatsApp
- [ ] Link in pagina Contatti
- [ ] Link nei metadata lead

### Email
- [ ] Email contatti: `e.rizzi@osmpartnervenezia.it`
- [ ] Mailto links funzionano
- [ ] Email notification preparata (metadati lead)
- [ ] Email errori form contengono email corretta

---

## 🤖 4. TEST API AI

### AI Chat (`/api/ai/chat`)
- [ ] Chatbot risponde correttamente
- [ ] Rate limiting funziona (max 20 req/5min)
- [ ] Lead capture dopo 2+ messaggi
- [ ] Session ID univoco generato
- [ ] Error handling OpenAI
- [ ] Fallback a knowledge base locale

### Analisi KPI (`/api/ai/analyze-kpi`)
- [ ] Tool accessibile
- [ ] Input KPI accettato
- [ ] Analisi generata correttamente
- [ ] Output JSON valido
- [ ] Error handling

### Generatore Mansionari (`/api/ai/generate-mansionari`)
- [ ] Tool accessibile
- [ ] Input dipartimenti/ruoli accettato
- [ ] Mansionari generati
- [ ] Output JSON valido
- [ ] Error handling

---

## 🔍 5. TEST ALLINEAMENTO DB-FRONTEND

### Verifica Campi Leads
Frontend invia:
- name, email, phone, company
- size_employees, revenue_range, main_problem
- source, score

DB schema ha:
- ✅ name, email, phone, company
- ✅ size_employees, revenue_range, main_problem
- ✅ source, score
- ✅ notes, created_at

**Status**: ✅ Allineato

### Verifica Campi Bookings
Frontend invia:
- lead_id, type, datetime

DB schema ha:
- ✅ lead_id (FK), type, datetime
- ✅ created_at

**Status**: ✅ Allineato

### Verifica Campi AI Sessions
Frontend invia:
- lead_id, transcript, outcome

DB schema ha:
- ✅ lead_id (FK), transcript (JSONB), outcome
- ✅ created_at

**Status**: ✅ Allineato

---

## 🎨 6. TEST FUNZIONALITÀ VARIE

### Form e Validazione
- [ ] ContactForm: Validazione step-by-step
- [ ] DownloadForm: Validazione email
- [ ] EventRegistrationForm: Validazione completa
- [ ] Error messages visibili
- [ ] Success messages visibili

### Navigazione
- [ ] Menu mobile funziona
- [ ] Menu desktop funziona
- [ ] Links interni funzionano
- [ ] Footer links funzionano
- [ ] Breadcrumbs (se presenti)

### Contenuti
- [ ] Pagine caricano correttamente
- [ ] Immagini caricano
- [ ] Video embedded funzionano
- [ ] Grafici Chart.js responsive
- [ ] Accordion FAQ funziona

### Performance
- [ ] Page load < 3s
- [ ] Images lazy loading
- [ ] Font loading ottimizzato
- [ ] No console errors
- [ ] No 404 su risorse

---

## 🔒 7. TEST SICUREZZA

### Headers
- [ ] Security headers presenti (CSP, HSTS, XFO)
- [ ] CORS configurato correttamente
- [ ] XSS protection

### Rate Limiting
- [ ] API lead: Rate limit attivo
- [ ] API AI: Rate limit attivo
- [ ] Error 429 quando superato

### Input Validation
- [ ] SQL injection prevenuto (Supabase protegge)
- [ ] XSS prevenuto (React sanitizza)
- [ ] Email validation corretta
- [ ] Phone validation corretta

---

## 📊 8. TEST SEO

### Meta Tags
- [ ] Title presente ogni pagina
- [ ] Description presente
- [ ] OG tags presenti
- [ ] Twitter cards presenti

### Structured Data
- [ ] JSON-LD presente
- [ ] Schema.org valido
- [ ] Breadcrumbs structured data

### Sitemap & Robots
- [ ] /sitemap.xml accessibile
- [ ] /robots.txt presente
- [ ] Pagine indicizzabili

---

## ⚡ 9. TEST PERFORMANCE

### Lighthouse Scores (Target)
- [ ] Performance: > 80
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90

### Core Web Vitals
- [ ] LCP: < 2.5s
- [ ] FID: < 100ms
- [ ] CLS: < 0.1

---

## ✅ RISULTATI TEST

[Da compilare dopo esecuzione test]

---

## 🐛 ISSUE TROVATE

[Da compilare se ci sono problemi]

---

## 📝 NOTE

[Note aggiuntive durante i test]

