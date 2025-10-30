# 🔧 Setup OpenAI API Key su Render

## Passaggi

1. **Accedi al Dashboard Render**
   - Vai su https://dashboard.render.com
   - Seleziona il tuo servizio web

2. **Aggiungi Environment Variable**
   - Vai su "Environment" nel menu laterale
   - Clicca "Add Environment Variable"
   - **Key**: `OPENAI_API_KEY`
   - **Value**: [Inserisci la tua chiave OpenAI qui - inizia con `sk-proj-`]
   - Clicca "Save Changes"

3. **Riavvia il Servizio**
   - Dopo aver salvato, Render riavvierà automaticamente il servizio
   - Oppure clicca manualmente "Manual Deploy" > "Deploy latest commit"

## Verifica

- Verifica che la variabile `OPENAI_API_KEY` sia impostata correttamente
- Controlla i log del servizio per eventuali errori di autenticazione
- Testa l'AI Assistant sul sito live

## Sicurezza

⚠️ **IMPORTANTE**: 
- Non committare mai la chiave API nel repository
- La chiave deve essere solo nelle variabili d'ambiente di Render
- Assicurati che il formato della chiave sia corretto (deve iniziare con `sk-proj-`)
