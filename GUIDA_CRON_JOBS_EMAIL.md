# 📅 GUIDA CONFIGURAZIONE CRON JOBS - EMAIL WORKSHOP

Questa guida spiega come configurare i cron jobs per l'invio automatico delle email del workshop.

## 🎯 EMAIL DA CONFIGURARE

### **Email Pre-Evento:**
1. ✅ **Email Conferma Iscrizione** - Automatica alla registrazione (già implementata)
2. ⏰ **Email T+5** - 5 giorni dopo l'iscrizione
3. ⏰ **Email T+10** - 10 giorni dopo l'iscrizione
4. ⏰ **Email T-3** - 3 giorni prima dell'evento (9 dicembre 2024, ore 10:00)
5. ✅ **Email T-1** - 1 giorno prima (già configurata)
6. ⏰ **Email T+0** - Giorno evento (12 dicembre 2024, ore 10:00)

### **Email Post-Evento:**
7. ✅ **Email Post-Immediata** - Automatica quando segnato "presente" (già implementata)
8. ✅ **Email Post-24h** - 24h dopo evento (già implementata)
9. ✅ **Email Post-48h** - 48h dopo evento (già implementata)

---

## 🔧 CONFIGURAZIONE SU RENDER

### **Opzione 1: Render Cron Jobs (Consigliato)**

Render supporta cron jobs nativi. Vai su: **Dashboard → Cron Jobs → New Cron Job**

#### **1. Email T+5 (Giornaliero)**

- **Name**: `workshop-email-5-giorni`
- **Schedule**: `0 10 * * *` (Ogni giorno alle 10:00)
- **Command**: 
  ```bash
  curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/follow-up-5-giorni \
    -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN"
  ```
- **Environment**: Production

#### **2. Email T+10 (Giornaliero)**

- **Name**: `workshop-email-10-giorni`
- **Schedule**: `0 10 * * *` (Ogni giorno alle 10:00)
- **Command**: 
  ```bash
  curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/follow-up-10-giorni \
    -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN"
  ```
- **Environment**: Production

#### **3. Email T-3 (Una volta - 9 dicembre 2024)**

- **Name**: `workshop-email-3-giorni`
- **Schedule**: `0 10 9 12 *` (9 dicembre 2024, ore 10:00)
- **Command**: 
  ```bash
  curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/countdown-3-giorni \
    -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN"
  ```
- **Environment**: Production

#### **4. Email T+0 (Una volta - 12 dicembre 2024)**

- **Name**: `workshop-email-giorno-evento`
- **Schedule**: `0 10 12 12 *` (12 dicembre 2024, ore 10:00)
- **Command**: 
  ```bash
  curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/reminder-giorno-evento \
    -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN"
  ```
- **Environment**: Production

---

## 🔧 CONFIGURAZIONE CON SERVIZI ESTERNI

Se Render non supporta cron jobs o preferisci un servizio esterno:

### **Opzione 2: cron-job.org (Gratuito)**

1. Vai su: https://cron-job.org
2. Crea account gratuito
3. Crea nuovo cron job per ogni email

**Configurazione esempio (Email T+5):**
- **Title**: Workshop Email T+5
- **URL**: `https://rizzienrico-it.onrender.com/api/workshop/emails/follow-up-5-giorni`
- **Method**: POST
- **Headers**: 
  ```
  Authorization: Bearer YOUR_CRON_SECRET_TOKEN
  Content-Type: application/json
  ```
- **Schedule**: Ogni giorno alle 10:00

### **Opzione 3: EasyCron**

1. Vai su: https://www.easycron.com
2. Crea account
3. Configura cron job simile a cron-job.org

### **Opzione 4: GitHub Actions (Se il repo è su GitHub)**

Crea file `.github/workflows/workshop-emails.yml`:

```yaml
name: Workshop Email Automation

on:
  schedule:
    # Email T+5 e T+10: ogni giorno alle 10:00 UTC
    - cron: '0 10 * * *'
    # Email T-3: 9 dicembre 2024, 10:00 UTC
    - cron: '0 10 9 12 *'
    # Email T+0: 12 dicembre 2024, 10:00 UTC
    - cron: '0 10 12 12 *'
  workflow_dispatch: # Permette esecuzione manuale

jobs:
  send-emails:
    runs-on: ubuntu-latest
    steps:
      - name: Send Email T+5
        if: github.event.schedule == '0 10 * * *'
        run: |
          curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/follow-up-5-giorni \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET_TOKEN }}"
      
      - name: Send Email T+10
        if: github.event.schedule == '0 10 * * *'
        run: |
          curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/follow-up-10-giorni \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET_TOKEN }}"
      
      - name: Send Email T-3
        if: github.event.schedule == '0 10 9 12 *'
        run: |
          curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/countdown-3-giorni \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET_TOKEN }}"
      
      - name: Send Email T+0
        if: github.event.schedule == '0 10 12 12 *'
        run: |
          curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/reminder-giorno-evento \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET_TOKEN }}"
```

**Aggiungi secret su GitHub:**
- Vai su: Repository → Settings → Secrets → Actions
- Aggiungi: `CRON_SECRET_TOKEN` con il valore della variabile d'ambiente

---

## 🔐 VARIABILE D'AMBIENTE NECESSARIA

Assicurati che la variabile d'ambiente `CRON_SECRET_TOKEN` sia configurata su Render:

1. Vai su: **Dashboard → Environment → Environment Variables**
2. Aggiungi:
   - **Key**: `CRON_SECRET_TOKEN`
   - **Value**: [Genera una stringa casuale sicura, es: `openssl rand -hex 32`]

**⚠️ IMPORTANTE**: Usa lo stesso token in tutti i cron jobs!

---

## ✅ VERIFICA CONFIGURAZIONE

### **Test Manuale**

Puoi testare ogni endpoint manualmente:

```bash
# Email T+5
curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/follow-up-5-giorni \
  -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN"

# Email T+10
curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/follow-up-10-giorni \
  -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN"

# Email T-3
curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/countdown-3-giorni \
  -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN"

# Email T+0
curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/reminder-giorno-evento \
  -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN"
```

### **Test Invio Massivo**

Per testare tutte le email insieme su `enricorizzi1991@gmail.com`:

```bash
curl -X POST https://rizzienrico-it.onrender.com/api/admin/workshop/test-emails \
  -H "Authorization: Bearer YOUR_CRON_SECRET_TOKEN"
```

Oppure iscriviti al workshop con l'email `enricorizzi1991@gmail.com` - tutte le email partiranno automaticamente!

---

## 📊 MONITORAGGIO

### **Log Render**

Controlla i log su Render per verificare l'esecuzione:
- **Dashboard → Logs → Filter by**: `[WORKSHOP]` o `[EMAIL]`

### **Dashboard Analisi**

Vai su: `/admin/workshop/analisi-email` per vedere:
- Quante email sono state inviate
- A chi sono state inviate
- Quando sono state inviate
- Dettagli completi per ogni tipo di email

---

## 🐛 TROUBLESHOOTING

### **Cron job non esegue**

1. Verifica che il token sia corretto
2. Controlla i log Render per errori
3. Verifica che l'URL sia corretto (controlla il dominio)
4. Assicurati che il servizio Render sia attivo

### **Email non inviate**

1. Controlla i log per errori SMTP
2. Verifica variabili d'ambiente SMTP
3. Controlla che i lead esistano nel database
4. Verifica che i lead abbiano lo stato corretto (`nuovo` o `confermato`)

### **Email duplicate**

Il sistema controlla automaticamente se un'email è già stata inviata tramite il campo `metadata` nel database. Se vedi duplicati:
1. Controlla il campo `metadata` del lead in Supabase
2. Verifica che il cron job non venga eseguito più volte

---

## 📝 NOTE IMPORTANTI

1. **Logica Intelligente**: Le email T+5 e T+10 non vengono inviate se:
   - Il workshop è già passato
   - L'iscrizione è avvenuta troppo vicino al workshop (meno di 5/10 giorni prima)

2. **Tracking**: Tutte le email includono tracking automatico per:
   - Aperture (pixel tracking)
   - Click su link (link tracking)
   - Visualizza statistiche su `/admin/workshop/analisi-email`

3. **Test Email**: Se ti iscrivi con `enricorizzi1991@gmail.com`, tutte le email partiranno automaticamente per test.

4. **Notifiche**: Ogni email inviata genera una notifica a `enricorizzi1991@gmail.com` con i dettagli.

---

**Documento creato il:** 20 Novembre 2024  
**Workshop:** 12 Dicembre 2024  
**Status:** ✅ Configurazione Completa

