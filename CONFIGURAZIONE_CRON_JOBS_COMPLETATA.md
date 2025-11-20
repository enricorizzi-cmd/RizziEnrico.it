# ✅ CONFIGURAZIONE CRON JOBS - COMPLETATA

## 🎯 WORKFLOW GITHUB ACTIONS CREATO

Ho creato il workflow GitHub Actions per automatizzare l'invio delle email del workshop.

**File creato:** `.github/workflows/workshop-emails.yml`

### **Cron Jobs Configurati:**

1. **Email T+5 e T+10** - Ogni giorno alle 10:00 UTC (11:00/12:00 ora italiana)
2. **Email T-3** - 9 dicembre 2024, ore 10:00 UTC
3. **Email T+0** - 12 dicembre 2024, ore 10:00 UTC

---

## 🔐 CONFIGURAZIONE NECESSARIA

### **1. Configurare Secret su GitHub**

**⚠️ IMPORTANTE:** Devi configurare il secret `CRON_SECRET_TOKEN` su GitHub Actions:

1. Vai su: https://github.com/enricorizzi-cmd/RizziEnrico.it/settings/secrets/actions
2. Clicca su **"New repository secret"**
3. Aggiungi:
   - **Name**: `CRON_SECRET_TOKEN`
   - **Value**: [Usa lo stesso valore della variabile d'ambiente su Render]

**Come generare un token sicuro:**
```bash
# Su Linux/Mac
openssl rand -hex 32

# Su Windows PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

### **2. Verificare Variabile d'Ambiente su Render**

Assicurati che `CRON_SECRET_TOKEN` sia configurato su Render:

1. Vai su: https://dashboard.render.com/web/srv-d41prqp5pdvs73fahp4g/environment
2. Verifica che esista `CRON_SECRET_TOKEN`
3. Se non esiste, aggiungilo con lo **stesso valore** del secret GitHub

**⚠️ CRITICO:** Il token su GitHub e Render devono essere **identici**!

---

## ✅ VERIFICA CONFIGURAZIONE

### **Test Manuale del Workflow**

Puoi testare il workflow manualmente:

1. Vai su: https://github.com/enricorizzi-cmd/RizziEnrico.it/actions
2. Seleziona "Workshop Email Automation"
3. Clicca "Run workflow" → "Run workflow"
4. Verifica che i job vengano eseguiti correttamente

### **Test Endpoint Singoli**

Puoi anche testare ogni endpoint direttamente:

```bash
# Sostituisci YOUR_TOKEN con il valore di CRON_SECRET_TOKEN

# Email T+5
curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/follow-up-5-giorni \
  -H "Authorization: Bearer YOUR_TOKEN"

# Email T+10
curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/follow-up-10-giorni \
  -H "Authorization: Bearer YOUR_TOKEN"

# Email T-3
curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/countdown-3-giorni \
  -H "Authorization: Bearer YOUR_TOKEN"

# Email T+0
curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/reminder-giorno-evento \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📅 SCHEDULE CRON

### **Fuso Orario**

GitHub Actions usa **UTC**. Gli orari configurati sono:
- **10:00 UTC** = **11:00 CET** (ora italiana inverno) / **12:00 CEST** (ora italiana estate)

Se vuoi cambiare l'orario, modifica il cron schedule nel file `.github/workflows/workshop-emails.yml`.

**Esempi:**
- `0 9 * * *` = 09:00 UTC = 10:00/11:00 ora italiana
- `0 11 * * *` = 11:00 UTC = 12:00/13:00 ora italiana

### **Date Specifiche**

- **Email T-3**: 9 dicembre 2024, 10:00 UTC
- **Email T+0**: 12 dicembre 2024, 10:00 UTC

Queste date sono hardcoded nel cron schedule e verranno eseguite automaticamente.

---

## 🔍 MONITORAGGIO

### **GitHub Actions**

Monitora l'esecuzione dei workflow:
- **Dashboard**: https://github.com/enricorizzi-cmd/RizziEnrico.it/actions
- **Log**: Clicca su ogni run per vedere i dettagli
- **Status**: Verifica che tutti gli step siano completati con successo

### **Render Logs**

Verifica i log su Render per vedere se le email sono state inviate:
- **Dashboard**: https://dashboard.render.com/web/srv-d41prqp5pdvs73fahp4g/logs
- **Filtra per**: `[WORKSHOP]` o `[EMAIL]`

### **Dashboard Analisi**

Vai su `/admin/workshop/analisi-email` per vedere:
- Quante email sono state inviate
- A chi sono state inviate
- Quando sono state inviate

---

## 🐛 TROUBLESHOOTING

### **Workflow non esegue**

1. Verifica che il secret `CRON_SECRET_TOKEN` sia configurato su GitHub
2. Controlla che il workflow sia abilitato (Actions → Settings → Allow all actions)
3. Verifica che il cron schedule sia corretto

### **401 Unauthorized**

1. Verifica che `CRON_SECRET_TOKEN` su GitHub sia identico a quello su Render
2. Controlla che il token sia corretto nel header Authorization
3. Verifica che la variabile d'ambiente su Render sia configurata

### **Email non inviate**

1. Controlla i log Render per errori SMTP
2. Verifica variabili d'ambiente SMTP
3. Controlla che i lead esistano nel database
4. Verifica che i lead abbiano lo stato corretto (`nuovo` o `confermato`)

---

## 📝 NOTE IMPORTANTI

1. **GitHub Actions è gratuito** per repository pubblici con limiti ragionevoli
2. **I workflow vengono eseguiti anche su push** se configurato (attualmente solo su schedule)
3. **Puoi eseguire manualmente** i workflow dalla pagina Actions
4. **I log sono visibili** per 90 giorni su GitHub

---

**Configurazione completata il:** 20 Novembre 2024  
**Status:** ✅ Workflow creato - Richiede configurazione secret su GitHub  
**Prossimo passo:** Configurare `CRON_SECRET_TOKEN` su GitHub Actions

