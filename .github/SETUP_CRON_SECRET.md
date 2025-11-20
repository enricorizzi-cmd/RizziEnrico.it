# 🔐 Setup CRON_SECRET_TOKEN per GitHub Actions

## ✅ Token Generato e Configurato

**Token generato:** `37889fe9d856a2cd0df8d6a037dec6282385e6cd3101c331bb1dd82aad5b6223`

**Status:**
- ✅ Configurato su Render (variabile d'ambiente)
- ⏳ Da configurare su GitHub Actions (secret)

---

## 📋 Istruzioni per Configurare Secret su GitHub

### **Metodo 1: Via Web Interface (Consigliato)**

1. Vai su: https://github.com/enricorizzi-cmd/RizziEnrico.it/settings/secrets/actions
2. Clicca su **"New repository secret"**
3. Compila:
   - **Name**: `CRON_SECRET_TOKEN`
   - **Secret**: `37889fe9d856a2cd0df8d6a037dec6282385e6cd3101c331bb1dd82aad5b6223`
4. Clicca **"Add secret"**

### **Metodo 2: Via GitHub CLI**

Se hai GitHub CLI installato:

```bash
gh secret set CRON_SECRET_TOKEN --repo enricorizzi-cmd/RizziEnrico.it --body "37889fe9d856a2cd0df8d6a037dec6282385e6cd3101c331bb1dd82aad5b6223"
```

---

## ✅ Verifica Configurazione

Dopo aver configurato il secret, verifica che tutto funzioni:

1. Vai su: https://github.com/enricorizzi-cmd/RizziEnrico.it/actions
2. Seleziona "Workshop Email Automation"
3. Clicca "Run workflow" → "Run workflow"
4. Verifica che il workflow venga eseguito senza errori

---

**⚠️ IMPORTANTE:** 
- Il token su GitHub e Render devono essere **identici**
- Non condividere mai questo token pubblicamente
- Se compromesso, rigenera un nuovo token e aggiorna entrambe le piattaforme

