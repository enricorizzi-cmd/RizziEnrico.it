# 🔧 ISTRUZIONI: Aggiornare Build Command su Render

## ⚠️ IMPORTANTE
L'API Render **NON permette** di modificare il build command tramite API. Deve essere fatto manualmente dalla dashboard.

---

## 🎯 COSA FARE

### Step 1: Accedi alla Dashboard Render
Vai su: **https://dashboard.render.com/web/srv-d41prqp5pdvs73fahp4g/settings**

### Step 2: Modifica Build Command
1. Nella pagina Settings, scrolla fino a **"Build & Deploy"**
2. Trova il campo **"Build Command"**
3. **CAMBIA** da:
   ```bash
   npm install; npm run build
   ```
4. **A**:
   ```bash
   npm ci && npm run build
   ```

### Step 3: Salva
1. Clicca **"Save Changes"** in fondo alla pagina
2. Render riavvierà automaticamente il servizio

### Step 4: Triggera Nuovo Deploy
1. Vai su: **https://dashboard.render.com/web/srv-d41prqp5pdvs73fahp4g/deploys**
2. Clicca **"Manual Deploy"** → **"Deploy latest commit"**
3. Questo triggererà un nuovo deploy con il build command aggiornato

---

## ✅ VERIFICA

Dopo il deploy, verifica:
1. **Log Build**: Controlla che il build sia riuscito
2. **Deploy Status**: Dovrebbe essere "live" invece di "build_failed"
3. **Build Time**: Dovrebbe essere più veloce con `npm ci`

---

## 🔍 PERCHÉ `npm ci` È MEGLIO?

- ✅ **Più veloce**: Non risolve dipendenze, usa direttamente il lockfile
- ✅ **Più consistente**: Stessa versione dipendenze in ogni build
- ✅ **Fail-fast**: Fallisce se package.json e package-lock.json non sono sincronizzati
- ✅ **Best practice**: Raccomandato per produzione da npm

---

## 📋 LINK UTILI

- **Settings**: https://dashboard.render.com/web/srv-d41prqp5pdvs73fahp4g/settings
- **Deploys**: https://dashboard.render.com/web/srv-d41prqp5pdvs73fahp4g/deploys
- **Dashboard**: https://dashboard.render.com/web/srv-d41prqp5pdvs73fahp4g

---

**Nota**: Il file `render.yaml` nel repository è già aggiornato con `npm ci && npm run build` come riferimento, ma la configurazione su Render deve essere aggiornata manualmente.

