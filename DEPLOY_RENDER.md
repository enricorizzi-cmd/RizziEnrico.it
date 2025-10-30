# 🚀 DEPLOY SU RENDER - Guida Completa

## 📋 PREREQUISITI

1. ✅ Account Render (gratis su [render.com](https://render.com))
2. ✅ Progetto GitHub (opzionale ma consigliato)
3. ✅ Supabase project (da configurare dopo)

---

## 🔧 OPZIONE 1: Deploy Manuale da Dashboard Render

### Step 1: Accedi a Render
1. Vai su [dashboard.render.com](https://dashboard.render.com)
2. Login o crea account (puoi usare GitHub)

### Step 2: Crea Nuovo Web Service
1. Click **"New +"** → **"Web Service"**
2. Connetti repository GitHub (o usa "Public Git repository")
3. Se non hai repo: usa "Deploy from Git repository"
   - URL: `https://github.com/tuousername/rizzienrico.it` (da creare)

### Step 3: Configura il Web Service

**Nome**: `rizzienrico-it` (o quello che preferisci)

**Configurazioni Build & Deploy**:
```
Environment:         Node
Region:              Oregon (o più vicino a te)
Branch:              main (o master)
Root Directory:      . (root del progetto)
Runtime:             Node
Build Command:       npm ci && npm run build
Start Command:       npm start
Instance Type:       Free (o Starter per migliore performance)
```

**Dettagli importanti**:
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm start`
- **Auto-Deploy**: Yes (si aggiorna automaticamente ai push)

---

## 🔧 OPZIONE 2: Deploy con Tool MCP (Più Veloce)

Posso crearlo direttamente per te se mi fornisci:
1. Repository GitHub URL (se hai già il repo)
2. Nome del service (es: "rizzienrico-it")

Oppure posso creare il service con configurazione base e poi puoi aggiungere il repo dopo.

---

## 📝 VARIABILI D'AMBIENTE

Dopo aver creato il service, aggiungi queste variabili d'ambiente in **Environment**:

### Base (Richieste)
```env
NEXT_PUBLIC_BASE_URL=https://your-service-name.onrender.com
NODE_ENV=production
```

### Supabase (Quando lo configuri)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Opzionali
```env
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=rizzienrico.it
NEXT_PUBLIC_CALENDLY_LINK=https://calendly.com/enrico-rizzi/diagnosi-30
NEXT_PUBLIC_WHATSAPP_NUMBER=39xxxxxxxxx
```

**Come aggiungere**:
1. Vai su **Environment** tab nel tuo service
2. Click **"Add Environment Variable"**
3. Aggiungi una variabile alla volta (chiave + valore)
4. Click **"Save Changes"**

---

## 🎯 BUILD & DEPLOY

### Prima Build
1. Click **"Manual Deploy"** → **"Deploy latest commit"**
2. Attendi 5-10 minuti (prima build è lenta)
3. Render installerà dipendenze, farà build, e partirà il server

### Auto-Deploy
Dopo la prima build, ogni push su `main` triggera automaticamente un nuovo deploy.

---

## ✅ VERIFICA DEPLOY

Dopo il deploy:

1. **URL del sito**: `https://your-service-name.onrender.com`
2. **Check homepage**: Dovrebbe caricare normalmente
3. **Check console**: Verifica eventuali errori
4. **SSL**: Render fornisce HTTPS automaticamente

---

## 🔗 DOMAIN CUSTOM (Opzionale)

1. Vai su **Settings** → **Custom Domains**
2. Aggiungi il tuo dominio (es: `rizzienrico.it`)
3. Render ti darà record DNS da configurare
4. Aggiungi record CNAME/A sul tuo DNS provider

---

## 📊 MONITORING

### Logs
- **Build Logs**: Vedi output durante build
- **Runtime Logs**: Logs del server in esecuzione

### Metrics
- CPU/Memory usage
- Request count
- Response time

---

## 🐛 TROUBLESHOOTING

### Build Fallisce
- **Problema**: Dipendenze non trovate
- **Soluzione**: Verifica `package.json` ha tutte le dipendenze

### App Non Parte
- **Check**: Start Command è `npm start`?
- **Check**: Variabili ENV configurate?
- **Check**: Logs per errori specifici

### 404 su Route
- **Problema**: Routing Next.js non riconosciuto
- **Soluzione**: Render deve gestire tutte le route (`/*`)

---

## 🎯 NEXT STEPS

1. ✅ Crea account Render
2. ✅ Crea Web Service (o fai creare a me)
3. ⏳ Push codice su GitHub (se non già fatto)
4. ⏳ Configura variabili ENV
5. ⏳ Deploy
6. ⏳ Setup Supabase dopo
7. ⏳ Configura dominio custom (opzionale)

---

## 🚀 VUOI CHE LO CREI IO?

Se vuoi, posso creare il web service direttamente con i tool MCP Render. Dimmi:
- Nome del service (es: "rizzienrico-it")
- Hai già il repository GitHub? Se sì, l'URL
- O preferisci crearlo manualmente seguendo questa guida?

**Ready to deploy! 🎯**

