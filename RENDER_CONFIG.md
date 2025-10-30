# ⚙️ Configurazione Service Render - rizzienrico.it

**Service ID**: `srv-d41prqp5pdvs73fahp4g`  
**Dashboard**: https://dashboard.render.com/web/srv-d41prqp5pdvs73fahp4g

---

## 🔧 CONFIGURAZIONI DA APPLICARE

### 1. Build & Start Commands

Vai su **Settings** → **Build & Deploy** e imposta:

```
Build Command:
npm ci && npm run build

Start Command:
npm start
```

⚠️ **IMPORTANTE**: Usa `npm ci` (non `npm install`) per garantire build consistenti in produzione.

---

### 2. Environment Variables

Vai su **Environment** e aggiungi queste variabili:

#### Base (Obbligatorie)
```env
NODE_ENV=production
```

#### Base URL (Da aggiungere DOPO il primo deploy)
1. Fai il primo deploy
2. Copia l'URL del service (es: `https://rizzienrico-it.onrender.com`)
3. Aggiungi:
```env
NEXT_PUBLIC_BASE_URL=https://your-service-name.onrender.com
```

#### Supabase (Quando lo configuri più avanti)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

#### Opzionali
```env
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=rizzienrico.it
NEXT_PUBLIC_CALENDLY_LINK=https://calendly.com/enrico-rizzi/diagnosi-30
NEXT_PUBLIC_WHATSAPP_NUMBER=39xxxxxxxxx
```

---

### 3. Auto-Deploy

Vai su **Settings** → **Build & Deploy**:

- ✅ **Auto-Deploy**: Enabled
- **Branch**: `main` (o il branch che usi)
- ✅ Deploy on every push

---

### 4. Region & Plan

Verifica in **Settings**:
- **Region**: Oregon, Frankfurt, Singapore (scegli quello più vicino)
- **Instance Type**: Free (per iniziare, poi puoi scalare a Starter)

---

## 🚀 PRIMO DEPLOY

1. **Push il codice** su GitHub (se non già fatto):
   ```bash
   git add .
   git commit -m "Initial deploy setup"
   git push origin main
   ```

2. **Manual Deploy** (se non parte automatico):
   - Vai su **Deploys** tab
   - Click **"Manual Deploy"** → **"Deploy latest commit"**

3. **Monitora il Build**:
   - Vai su **Deploys** tab
   - Click sul deploy in corso
   - Verifica i **Build Logs** per eventuali errori

---

## ✅ CHECKLIST VERIFICA

Dopo il deploy, verifica:

- [ ] Build completa senza errori
- [ ] Service attivo (status: Live)
- [ ] Homepage carica correttamente
- [ ] URL accessibile: `https://your-service.onrender.com`
- [ ] HTTPS attivo (automatico su Render)
- [ ] Testa alcune route: `/metodo`, `/servizi`, `/blog`

---

## 🐛 TROUBLESHOOTING

### Build Fallisce
**Errore comune**: `Module not found`
- **Soluzione**: Verifica che tutte le dipendenze siano in `package.json`

**Errore**: `Build timeout`
- **Soluzione**: Free plan ha limiti, considera upgrade a Starter

### Service Non Parte
**Check**:
- ✅ Start Command è `npm start`?
- ✅ Variabili ENV configurate?
- ✅ Guarda **Runtime Logs** per errori

### 404 su Route Next.js
**Problema**: Render non route tutte le route a Next.js
- **Soluzione**: Next.js con App Router gestisce automaticamente, ma verifica che non ci siano proxy/redirect

---

## 📊 DOPO IL DEPLOY

Una volta live, potrai:
1. Testare tutte le funzionalità
2. Configurare dominio custom (opzionale)
3. Collegare Supabase quando lo crei
4. Monitorare performance e logs

---

## 🔗 LINK UTILI

- **Dashboard Service**: https://dashboard.render.com/web/srv-d41prqp5pdvs73fahp4g
- **Repository**: https://github.com/enricorizzi-cmd/RizziEnrico.it

**Preferisci che configuri qualcosa via API quando il service sarà visibile, o applica queste configurazioni manualmente?** 🚀

