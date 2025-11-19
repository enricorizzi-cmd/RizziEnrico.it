# ✅ Sistema Workshop "Automatizza la tua Azienda" - COMPLETATO

## 📋 Cosa è stato creato

### 1. Database Supabase
- ✅ Tabella `workshop_leads` con tutti i campi necessari
- ✅ Tabella `test_maturita_digitale` per i risultati del test
- ✅ Indici ottimizzati per performance
- ✅ RLS policies configurate

**File**: `supabase/workshop_schema.sql`

**Per applicare lo schema:**
```sql
-- Esegui questo script su Supabase SQL Editor
-- Vai su: https://supabase.com/dashboard/project/[PROJECT_ID]/sql
```

### 2. Landing Page Workshop
- ✅ Pagina `/workshop-12-dicembre` completamente responsive
- ✅ Form di registrazione completo con validazione
- ✅ Design moderno con branding OSM
- ✅ Mobile-first ottimizzato

**File**: `app/workshop-12-dicembre/page.tsx`

### 3. API Endpoints

#### Registrazione Workshop
- ✅ `POST /api/workshop/register` - Registra nuovo partecipante
- ✅ Invia email di conferma automatica
- ✅ Notifica Enrico via email

#### Dashboard Admin
- ✅ `GET /api/admin/workshop/leads` - Lista lead con filtri
- ✅ `PATCH /api/admin/workshop/leads/[id]` - Aggiorna lead
- ✅ `GET /api/admin/workshop/stats` - Statistiche KPI

#### Test Maturità Digitale
- ✅ `POST /api/test-maturita/submit` - Salva risultati test

#### Email Automatiche
- ✅ `POST /api/workshop/emails/reminder` - Reminder giorno prima (cron)
- ✅ `POST /api/workshop/emails/post-evento` - Email post-evento (3 tipi)
- ✅ `POST /api/workshop/emails/trigger-post-evento` - Trigger quando lead diventa "presente"

### 4. Dashboard Admin
- ✅ Pagina `/admin/workshop` con:
  - KPI principali (iscritti, presenti, tasso presenza, chiamate)
  - Statistiche per fonte e stato
  - Tabella lead filtrabile
  - Gestione stato lead
  - Incremento chiamate
  - Note per ogni lead

**File**: `app/admin/workshop/page.tsx`

### 5. Test Maturità Digitale
- ✅ Pagina `/test-maturita-digitale` interattiva
- ✅ 15 domande divise in 5 categorie
- ✅ Calcolo automatico punteggio e livello
- ✅ Raccomandazioni personalizzate
- ✅ CTA per check-up

**File**: `app/test-maturita-digitale/page.tsx`

### 6. Sistema Email Automatiche

#### Email di Conferma (automatica alla registrazione)
- ✅ Conferma iscrizione con dettagli evento
- ✅ Link al test maturità digitale
- ✅ Design HTML professionale

#### Reminder Giorno Prima (cron job)
- ✅ Email automatica il giorno prima del workshop
- ✅ Dettagli evento e cosa portare
- ✅ Link al test maturità digitale

#### Email Post-Evento (3 email)
1. **Immediata** (quando lead diventa "presente")
   - Ringraziamento
   - Link Starter Kit PDF
   - Link test maturità
   - CTA Check-up

2. **24 ore dopo**
   - Reminder Starter Kit
   - Promemoria condizioni speciali

3. **48 ore dopo**
   - Ultimi giorni condizioni speciali
   - CTA finale Check-up

## 🔧 Configurazione Necessaria

### 1. Variabili d'Ambiente (Render)

Aggiungi queste variabili su Render:

```env
# Cron Secret Token (genera una stringa casuale sicura)
CRON_SECRET_TOKEN=your-secret-token-here

# Calendly URL (già configurato probabilmente)
NEXT_PUBLIC_CALENDLY_CHECKUP_URL=https://calendly.com/enricorizzi/check-up-gratuito-in-azienda

# Base URL
NEXT_PUBLIC_BASE_URL=https://rizzienrico-it.onrender.com
```

### 2. Applicare Schema Supabase

1. Vai su: https://supabase.com/dashboard/project/[PROJECT_ID]/sql
2. Copia il contenuto di `supabase/workshop_schema.sql`
3. Esegui lo script SQL

### 3. Configurare Cron Job per Reminder

#### Opzione A: Usando Render Cron Jobs (Consigliato)

1. Vai su Render Dashboard → Cron Jobs → New Cron Job
2. Configurazione:
   - **Name**: `workshop-reminder`
   - **Schedule**: `0 18 11 12 *` (11 dicembre alle 18:00)
   - **Command**: 
     ```bash
     curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/reminder \
       -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN"
     ```
   - **Environment**: Production

#### Opzione B: Usando servizio esterno (cron-job.org, EasyCron, ecc.)

1. Crea un cron job che chiama:
   ```
   POST https://rizzienrico-it.onrender.com/api/workshop/emails/reminder
   Headers: Authorization: Bearer YOUR_CRON_SECRET_TOKEN
   ```
2. Programma per: 11 dicembre 2024, ore 18:00

#### Opzione C: Manuale (se cron non disponibile)

Il giorno prima del workshop (11 dicembre), chiama manualmente:
```bash
curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/reminder \
  -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN"
```

### 4. Configurare Email Post-Evento

Le email post-evento vengono triggerate automaticamente quando un lead viene segnato come "presente" nella dashboard.

Per le email 24h e 48h dopo, configura un cron job che:

1. **24h dopo il workshop** (13 dicembre, 18:00):
   ```bash
   curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/post-evento \
     -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"leadId": "LEAD_ID", "emailType": "24h"}'
   ```

2. **48h dopo il workshop** (14 dicembre, 18:00):
   ```bash
   curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/post-evento \
     -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"leadId": "LEAD_ID", "emailType": "48h"}'
   ```

**Nota**: Per automatizzare completamente, potresti creare uno script che:
1. Trova tutti i lead con stato "presente"
2. Controlla se hanno già ricevuto l'email 24h/48h
3. Invia le email mancanti

## 📊 KPI Tracciati

La dashboard mostra:
- ✅ Totale iscritti
- ✅ Lead per fonte (BNI, OSM, Social, Passaparola, Altro)
- ✅ Lead per stato
- ✅ Numero presenti
- ✅ Tasso presenza (presenti / confermati)
- ✅ Totale chiamate effettuate

## 🎯 Obiettivi

- **Target Iscritti**: 30
- **Target Conversioni**: 50% (15 check-up venduti)

## 📝 Note Importanti

1. **Starter Kit PDF**: Deve essere creato e caricato in `/public/download/starter-kit-digitalizzazione.pdf`
   - Oppure crea un endpoint che genera il PDF dinamicamente

2. **Indirizzo Workshop**: Aggiorna `WORKSHOP_LOCATION` nei file email con l'indirizzo esatto

3. **Accesso Dashboard**: La dashboard admin è pubblica. Considera di aggiungere autenticazione se necessario.

4. **Post Workshop**: Dopo il workshop, puoi cancellare:
   - La pagina `/workshop-12-dicembre`
   - La tabella `workshop_leads` (o esporta i dati prima)
   - Le API endpoint del workshop

## 🚀 Prossimi Passi

1. ✅ Applica schema Supabase
2. ✅ Configura variabili ambiente
3. ✅ Configura cron job reminder
4. ✅ Crea Starter Kit PDF
5. ✅ Aggiorna indirizzo workshop nelle email
6. ✅ Test completo del flusso:
   - Registrazione → Email conferma
   - Reminder (test manuale)
   - Segna presente → Email immediata
   - Email 24h e 48h (test manuale)

## 📞 Supporto

Per problemi o domande, controlla i log su Render e Supabase.

