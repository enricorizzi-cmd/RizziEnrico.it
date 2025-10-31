# 📊 Verifica Plausible Analytics

## ✅ Configurazione Codice
Il codice è già configurato in `components/Analytics.tsx` e caricato nel layout.

## 🔍 Verifica Variabile Ambiente su Render

### Passo 1: Controlla Dashboard Render
1. Vai su: https://dashboard.render.com/web/srv-d41prqp5pdvs73fahp4g/environment
2. Cerca la variabile: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
3. Verifica che sia impostata a: `rizzienrico.it` (o il tuo dominio)

### Passo 2: Se Mancante, Aggiungi
1. Clicca "Add Environment Variable"
2. **Key**: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
3. **Value**: `rizzienrico-it.onrender.com` (o il tuo dominio finale)
4. Salva → Render farà auto-deploy

---

## 🔍 Verifica Dashboard Plausible

### Passo 1: Accedi a Plausible
1. Vai su: https://plausible.io
2. Accedi con il tuo account

### Passo 2: Verifica Dominio
1. Verifica che il dominio `rizzienrico-it.onrender.com` (o il tuo dominio) sia registrato
2. Se non registrato:
   - Clicca "Add Site"
   - Inserisci dominio
   - Copia il codice di verifica se richiesto

---

## 🧪 Test Funzionamento

### Metodo 1: Verifica Console Browser
1. Apri il sito: https://rizzienrico-it.onrender.com
2. Apri DevTools (F12)
3. Vai su **Console**
4. Cerca: `plausible` nello script caricato
5. Verifica Network tab: dovresti vedere richieste a `plausible.io`

### Metodo 2: Verifica Dashboard Plausible
1. Dopo 1-2 minuti dalla visita
2. Controlla dashboard Plausible
3. Dovresti vedere visite in tempo reale

---

## 🔧 Se Non Funziona

### Problema: Script non caricato
- **Causa**: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` non configurato
- **Soluzione**: Aggiungi variabile ENV su Render

### Problema: Visite non registrate
- **Causa**: Dominio non registrato su Plausible
- **Soluzione**: Registra dominio su Plausible.io

### Problema: CORS/Blocco
- **Causa**: Browser blocker o CSP troppo restrittivo
- **Soluzione**: Verifica `middleware.ts` CSP headers

---

## 📝 Configurazione Attuale

**Codice**: ✅ Configurato (`components/Analytics.tsx`)  
**Layout**: ✅ Caricato (`app/layout.tsx`)  
**CSP**: ✅ Permesso (`middleware.ts`)

**Manca solo**: Verifica variabile ENV su Render!

---

## ✅ Quick Check

Esegui questo comando per verificare variabili ENV (se hai accesso SSH):
```bash
# Non disponibile via API Render, verifica manualmente nel dashboard
```

**Oppure**: Controlla direttamente nel dashboard Render:
https://dashboard.render.com/web/srv-d41prqp5pdvs73fahp4g/environment

