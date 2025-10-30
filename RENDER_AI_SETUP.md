# 🚀 DEPLOY AI SU RENDER

## Setup Variabile d'Ambiente

### 1. Vai su Render Dashboard
URL: https://dashboard.render.com/web/srv-d41prqp5pdvs73fahp4g

### 2. Aggiungi Environment Variable

1. Clicca su "Environment" nel menu laterale
2. Clicca "Add Environment Variable"
3. Inserisci:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: `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`
4. Clicca "Save Changes"

### 3. Riavvia il Servizio

1. Vai su "Events" o "Manual Deploy"
2. Clicca "Manual Deploy" → "Deploy latest commit"
3. Attendi il deploy completo (2-3 minuti)

## Verifica Funzionamento

Dopo il deploy, verifica che funzioni:

1. **AI Assistant**: Apri il sito, clicca sul bottone chat in basso a destra
2. **Analisi KPI**: Vai su `/risorse` e prova il tool "Analisi KPI Automatica AI"
3. **Generatore Mansionari**: Vai su `/risorse` e prova il tool "Generatore Mansionari AI"

## Troubleshooting

### Se l'AI non risponde:
- Verifica che la variabile `OPENAI_API_KEY` sia impostata correttamente
- Controlla i log su Render per errori API
- Verifica che il servizio sia stato riavviato dopo l'aggiunta della variabile

### Se vedi errori 500:
- Controlla i log Render per dettagli errori OpenAI
- Verifica che la chiave API sia valida
- Assicurati che il formato della chiave sia corretto (deve iniziare con `sk-proj-`)

## Costi

- **Stima**: €50-150/mese per utilizzo normale
- **Monitoraggio**: Puoi monitorare l'utilizzo su OpenAI Dashboard
- **Ottimizzazione**: Le risposte vengono cachate per ridurre costi

---

✅ **Dopo il deploy, tutte le funzionalità AI saranno attive!**

