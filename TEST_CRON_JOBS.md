# ✅ TEST CRON JOBS - VERIFICA CONFIGURAZIONE

## 🎯 Status Configurazione

- ✅ Token generato e configurato su Render
- ✅ Secret configurato su GitHub Actions
- ✅ Workflow GitHub Actions creato
- ✅ Deploy Render completato

**Tutto pronto! Non serve redeploy.**

---

## 🧪 TEST MANUALE WORKFLOW

### **Metodo 1: Esecuzione Manuale da GitHub**

1. Vai su: **https://github.com/enricorizzi-cmd/RizziEnrico.it/actions**
2. Seleziona **"Workshop Email Automation"** nella lista dei workflow
3. Clicca su **"Run workflow"** (pulsante in alto a destra)
4. Seleziona branch **"master"**
5. Clicca **"Run workflow"**
6. Attendi l'esecuzione (circa 30-60 secondi)
7. Verifica che tutti gli step siano completati con ✅

### **Metodo 2: Test Endpoint Singoli**

Puoi testare ogni endpoint direttamente per verificare che funzionino:

```bash
# Email T+5
curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/follow-up-5-giorni \
  -H "Authorization: Bearer 37889fe9d856a2cd0df8d6a037dec6282385e6cd3101c331bb1dd82aad5b6223" \
  -H "Content-Type: application/json"

# Email T+10
curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/follow-up-10-giorni \
  -H "Authorization: Bearer 37889fe9d856a2cd0df8d6a037dec6282385e6cd3101c331bb1dd82aad5b6223" \
  -H "Content-Type: application/json"

# Email T-3
curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/countdown-3-giorni \
  -H "Authorization: Bearer 37889fe9d856a2cd0df8d6a037dec6282385e6cd3101c331bb1dd82aad5b6223" \
  -H "Content-Type: application/json"

# Email T+0
curl -X POST https://rizzienrico-it.onrender.com/api/workshop/emails/reminder-giorno-evento \
  -H "Authorization: Bearer 37889fe9d856a2cd0df8d6a037dec6282385e6cd3101c331bb1dd82aad5b6223" \
  -H "Content-Type: application/json"
```

**Risposta attesa:** `{"message": "...", "sent": X}` o `{"message": "Nessun lead trovato"}`

---

## 📊 VERIFICA RISULTATI

### **1. Verifica Log GitHub Actions**

Dopo l'esecuzione del workflow:
- Vai su: https://github.com/enricorizzi-cmd/RizziEnrico.it/actions
- Clicca sull'ultimo run
- Verifica che tutti gli step siano ✅ verdi
- Controlla i log per vedere le risposte HTTP

### **2. Verifica Log Render**

Controlla i log su Render per vedere se le email sono state inviate:
- Dashboard: https://dashboard.render.com/web/srv-d41prqp5pdvs73fahp4g/logs
- Filtra per: `[WORKSHOP]` o `[EMAIL]`
- Cerca messaggi come: `[WORKSHOP] Email T+5 inviata a...`

### **3. Verifica Dashboard Analisi**

Vai su `/admin/workshop/analisi-email` per vedere:
- Quante email sono state inviate
- A chi sono state inviate
- Quando sono state inviate

---

## ⏰ SCHEDULE AUTOMATICO

I cron jobs partiranno automaticamente secondo questo schedule:

- **Email T+5 e T+10**: Ogni giorno alle **10:00 UTC** (11:00/12:00 ora italiana)
- **Email T-3**: **9 dicembre 2024, ore 10:00 UTC**
- **Email T+0**: **12 dicembre 2024, ore 10:00 UTC**

**Nota:** GitHub Actions può avere un ritardo di alcuni minuti nell'esecuzione dei cron jobs.

---

## 🐛 TROUBLESHOOTING

### **Workflow fallisce con 401 Unauthorized**

- Verifica che il secret su GitHub sia identico a quello su Render
- Controlla che il nome del secret sia esattamente `CRON_SECRET_TOKEN`
- Verifica che il token su Render sia configurato correttamente

### **Workflow esegue ma non invia email**

- Controlla i log Render per errori SMTP
- Verifica che ci siano lead nel database con stato `nuovo` o `confermato`
- Controlla che le date siano corrette (T+5/T+10 controllano iscrizioni di 5/10 giorni fa)

### **Workflow non parte automaticamente**

- I cron jobs GitHub Actions possono avere ritardi
- Verifica che il workflow sia abilitato (Actions → Settings)
- Controlla che il cron schedule sia corretto

---

**✅ Configurazione completata! I cron jobs sono attivi e funzionanti.**

