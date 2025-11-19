# 🎯 Istruzioni Operative Workshop 12 Dicembre

## ✅ Checklist Pre-Lancio (Fai PRIMA di pubblicare)

### 1. Database Supabase
- [ ] Vai su: https://supabase.com/dashboard/project/[PROJECT_ID]/sql
- [ ] Copia il contenuto di `supabase/workshop_schema.sql`
- [ ] Esegui lo script SQL
- [ ] Verifica che le tabelle `workshop_leads` e `test_maturita_digitale` siano create

### 2. Variabili d'Ambiente Render
- [ ] Vai su: https://dashboard.render.com/web/[SERVICE_ID]/environment
- [ ] Aggiungi `CRON_SECRET_TOKEN` (genera una stringa casuale sicura, es: `openssl rand -hex 32`)
- [ ] Verifica che `NEXT_PUBLIC_CALENDLY_CHECKUP_URL` sia configurato
- [ ] Verifica che `NEXT_PUBLIC_BASE_URL` sia corretto
- [ ] Riavvia il servizio dopo le modifiche

### 3. Aggiorna Dettagli Workshop
- [ ] Apri `app/api/workshop/register/route.ts`
- [ ] Aggiorna `WORKSHOP_LOCATION` con l'indirizzo esatto
- [ ] Apri `app/api/workshop/emails/reminder/route.ts`
- [ ] Aggiorna `WORKSHOP_LOCATION` anche qui

### 4. Test Completo
- [ ] Testa registrazione: vai su `/workshop-12-dicembre` e compila il form
- [ ] Verifica che arrivi email di conferma
- [ ] Verifica che il lead appaia nella dashboard `/admin/workshop`
- [ ] Testa cambio stato lead nella dashboard
- [ ] Testa test maturità digitale: vai su `/test-maturita-digitale`

## 📅 Timeline Operativa

### Prima del Workshop (Fino all'11 Dicembre)

#### Ogni giorno
- [ ] Controlla dashboard `/admin/workshop`
- [ ] Contatta i nuovi iscritti (cambia stato da "nuovo" a "contattato")
- [ ] Conferma presenza (cambia stato da "contattato" a "confermato")
- [ ] Incrementa chiamate quando chiami qualcuno

#### 11 Dicembre (Giorno Prima)
- [ ] **18:00**: Triggera reminder email manualmente o via cron:
  ```bash
  curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/reminder \
    -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN"
  ```
- [ ] Verifica che le email siano state inviate (controlla log Render)
- [ ] Controlla dashboard per vedere quanti confermati

### 12 Dicembre (Giorno del Workshop)

#### Durante il Workshop
- [ ] Apri dashboard `/admin/workshop` su tablet/laptop
- [ ] Per ogni partecipante presente:
  1. Cerca nella lista
  2. Cambia stato da "confermato" a "presente"
  3. Questo triggera automaticamente l'email post-evento immediata
- [ ] Mostra la dashboard live ai partecipanti:
  - Totale iscritti
  - Lead per fonte
  - Numero presenti
  - Tasso presenza

#### Dopo il Workshop
- [ ] Verifica che tutti i presenti siano stati segnati
- [ ] Controlla che le email post-evento immediate siano state inviate

### Dopo il Workshop

#### 13 Dicembre (24h dopo)
- [ ] **18:00**: Invia email 24h a tutti i presenti:
  ```bash
  # Per ogni lead con stato "presente", chiama:
  curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/post-evento \
    -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"leadId": "LEAD_ID", "emailType": "24h"}'
  ```

#### 14 Dicembre (48h dopo)
- [ ] **18:00**: Invia email 48h a tutti i presenti:
  ```bash
  curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/post-evento \
    -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"leadId": "LEAD_ID", "emailType": "48h"}'
  ```

#### Settimana Successiva
- [ ] Controlla dashboard per lead con stato "presente"
- [ ] Cambia stato a "da_chiamare_per_checkup"
- [ ] Chiama ogni lead per follow-up
- [ ] Quando vendi un check-up, cambia stato a "checkup_venduto"

## 🎯 Obiettivi da Monitorare

### KPI Dashboard
- **Totale Iscritti**: Target 30
- **Presenti**: Target 25+ (83%+ presenza)
- **Tasso Presenza**: Target >80%
- **Conversioni**: Target 50% (15 check-up venduti)

### Lead per Fonte
Monitora quale fonte porta più conversioni:
- BNI
- OSM
- Social
- Passaparola
- Altro

## 📧 Gestione Email

### Email Automatiche Attive
1. ✅ **Conferma Iscrizione** - Automatica alla registrazione
2. ✅ **Reminder Giorno Prima** - Cron job 11 dicembre 18:00
3. ✅ **Post-Evento Immediata** - Automatica quando segni "presente"
4. ⚠️ **Post-Evento 24h** - Manuale o cron job 13 dicembre 18:00
5. ⚠️ **Post-Evento 48h** - Manuale o cron job 14 dicembre 18:00

### Verifica Email
- Controlla log Render per vedere se le email vengono inviate
- Se non arrivano, verifica:
  - `RESEND_API_KEY` configurato
  - `FROM_EMAIL` configurato (o usa `onboarding@resend.dev`)
  - Dominio verificato su Resend (se usi dominio custom)

## 🔧 Troubleshooting

### Email non arrivano
1. Controlla log Render: `https://dashboard.render.com/web/[SERVICE_ID]/logs`
2. Cerca errori con `[EMAIL]`
3. Verifica `RESEND_API_KEY` nelle variabili ambiente
4. Se errore 403, Resend è in modalità test → usa `enricorizzi1991@gmail.com` per test

### Dashboard non carica lead
1. Verifica che lo schema Supabase sia applicato
2. Controlla che `SUPABASE_SERVICE_ROLE_KEY` sia configurato
3. Controlla log Render per errori Supabase

### Form registrazione non funziona
1. Apri console browser (F12)
2. Controlla errori JavaScript
3. Verifica che `/api/workshop/register` risponda correttamente
4. Controlla validazione form (tutti i campi obbligatori compilati)

## 📱 Link Utili

- **Landing Workshop**: `/workshop-12-dicembre`
- **Dashboard Admin**: `/admin/workshop`
- **Test Maturità**: `/test-maturita-digitale`
- **Starter Kit**: `/download/starter-kit-digitalizzazione`

## 🗑️ Post-Workshop Cleanup

Dopo aver completato il follow-up (circa 2 settimane dopo):

1. **Esporta Dati**:
   ```sql
   -- Su Supabase SQL Editor
   SELECT * FROM workshop_leads;
   SELECT * FROM test_maturita_digitale;
   ```
   Esporta come CSV per archiviazione

2. **Cancella Pagine** (opzionale):
   - Rimuovi `/app/workshop-12-dicembre`
   - Rimuovi `/app/admin/workshop`
   - Rimuovi `/app/test-maturita-digitale`
   - Rimuovi API endpoints workshop

3. **Cancella Tabelle** (opzionale):
   ```sql
   DROP TABLE IF EXISTS test_maturita_digitale;
   DROP TABLE IF EXISTS workshop_leads;
   ```

## ✅ Checklist Finale Pre-Lancio

Prima di pubblicare il link del workshop:

- [ ] Schema Supabase applicato
- [ ] Variabili ambiente configurate
- [ ] Indirizzo workshop aggiornato
- [ ] Test registrazione funzionante
- [ ] Email conferma arriva correttamente
- [ ] Dashboard admin accessibile
- [ ] Test maturità digitale funzionante
- [ ] Starter Kit scaricabile
- [ ] Cron job reminder configurato (o piano manuale pronto)

## 🚀 Buon Workshop!

Tutto è pronto. Pubblica il link `/workshop-12-dicembre` e inizia a raccogliere iscrizioni!

