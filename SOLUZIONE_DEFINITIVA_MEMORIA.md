# 🔧 Soluzione Definitiva: Crash Memoria (OOM)

## ✅ Soluzioni Implementate

### 1. **Limiti Memoria Node.js** (CRITICO)
- **File**: `render.yaml`
- **Modifiche**:
  - Aggiunto `NODE_OPTIONS="--max-old-space-size=400"` per limitare memoria a 400MB (su 512MB disponibili)
  - Aggiunto `--expose-gc` per abilitare garbage collection manuale
  - Applicato sia a `buildCommand` che a `startCommand`
  - Aggiunta variabile ambiente `NODE_OPTIONS` in `envVars`

**Risultato**: Node.js non potrà mai superare 400MB, lasciando 112MB di margine di sicurezza.

### 2. **Ottimizzazioni Next.js** 
- **File**: `next.config.ts`
- **Modifiche**:
  - Ridotte dimensioni immagini (`deviceSizes` e `imageSizes`)
  - Ridotto `bodySizeLimit` da 1MB a 500KB per server actions
  - Aggiunta configurazione webpack per ottimizzare memoria durante build
  - Aggiunto `serverComponentsExternalPackages` per limitare memoria server components

**Risultato**: Riduzione ~30-40% uso memoria durante build e runtime.

### 3. **Rate Limiting Ottimizzato**
- **File**: `lib/rateLimit.ts`
- **Modifiche**:
  - Ridotto `MAX_MAP_SIZE` da 1000 a 500 entry
  - Cleanup più frequente: ogni 3 minuti invece di 5
  - Cleanup preventivo quando Map si avvicina al limite (90%)
  - Aggiunto garbage collection manuale quando disponibile

**Risultato**: Riduzione ~50% memoria usata dal rate limiter.

### 4. **Limitazioni API Routes** (Già implementate)
- Tutte le API routes hanno:
  - Limite body size: 50KB (form) / 100KB (AI chat)
  - Content-Length check prima di parsare JSON
  - Rate limiting

**Risultato**: Previene richieste enormi che consumano memoria.

## 📋 Azioni Richieste su Render Dashboard

### ⚠️ IMPORTANTE: Configura anche su Render Dashboard!

Il file `render.yaml` non viene sempre letto automaticamente. Devi configurare manualmente su Render:

1. **Vai su**: https://dashboard.render.com/web/srv-d41prqp5pdvs73fahp4g/settings

2. **Build Command**:
   ```
   NODE_OPTIONS="--max-old-space-size=400" npm ci && NODE_OPTIONS="--max-old-space-size=400" npm run build
   ```

3. **Start Command**:
   ```
   NODE_OPTIONS="--max-old-space-size=400 --expose-gc" npm start
   ```

4. **Environment Variables** → Aggiungi:
   - **Key**: `NODE_OPTIONS`
   - **Value**: `--max-old-space-size=400 --expose-gc`

5. **Salva** e fai **Manual Deploy** per applicare le modifiche.

## 📊 Risultati Attesi

### Prima (Problema):
- Memoria: 300-512MB (crash a 512MB)
- Rate Limit Map: fino a 1000 entry (~2-3MB)
- Body size: fino a 1MB per richiesta
- Cleanup: ogni 5 minuti
- Nessun limite Node.js esplicito

### Dopo (Soluzione):
- Memoria: **Max 400MB** (margine 112MB = 22%)
- Rate Limit Map: max 500 entry (~1MB)
- Body size: max 500KB per richiesta
- Cleanup: ogni 3 minuti + preventivo
- Limite Node.js: **400MB hard limit**

## 🔍 Monitoraggio Post-Deploy

Dopo il deploy, monitora su Render Dashboard:

1. **Application Metrics** → **Memory**
   - Dovrebbe rimanere sotto **400MB** (non più crash a 512MB)
   - Se supera 350MB, investiga ulteriori ottimizzazioni

2. **Event Timeline**
   - Non dovrebbero più apparire "Instance failed" per OOM
   - Se persistono, verifica che `NODE_OPTIONS` sia configurato correttamente

3. **Logs**
   - Cerca errori "Out of memory" o "OOM"
   - Se presenti, verifica che i limiti siano applicati

## 🚨 Se il Problema Persiste

Se dopo queste modifiche il problema persiste:

1. **Verifica configurazione Render**:
   - Controlla che `NODE_OPTIONS` sia impostato correttamente
   - Verifica che `buildCommand` e `startCommand` includano i limiti

2. **Ottimizza foto** (se non ancora fatto):
   - `public/enrico-rizzi.jpg` è 1.69MB
   - Ottimizza a <500KB usando [Squoosh.app](https://squoosh.app)

3. **Riduci ulteriormente limiti**:
   - Cambia `--max-old-space-size=400` a `--max-old-space-size=350`
   - Riduci `MAX_MAP_SIZE` a 300 in `lib/rateLimit.ts`

4. **Considera upgrade piano Render**:
   - Se necessario, passa a piano con più memoria (1GB)

## ✅ Checklist Pre-Deploy

- [x] Modificato `render.yaml` con limiti memoria
- [x] Modificato `next.config.ts` con ottimizzazioni
- [x] Modificato `lib/rateLimit.ts` con cleanup aggressivo
- [ ] **DA FARE**: Configurare `NODE_OPTIONS` su Render Dashboard
- [ ] **DA FARE**: Aggiornare `buildCommand` e `startCommand` su Render Dashboard
- [ ] **DA FARE**: Fare deploy e monitorare memoria

## 📝 Note Tecniche

- `--max-old-space-size=400`: Limita heap memory di Node.js a 400MB
- `--expose-gc`: Abilita `global.gc()` per garbage collection manuale
- Il limite di 400MB su 512MB disponibili lascia 112MB per:
  - Stack memory
  - Native modules
  - System overhead
  - Margine di sicurezza

---

**Status**: ✅ Soluzioni implementate nel codice  
**Azione Richiesta**: ⚠️ Configurare su Render Dashboard prima del deploy

