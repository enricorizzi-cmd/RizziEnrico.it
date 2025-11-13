# Ottimizzazioni Render per Next.js (Piano Free/Starter 512MB)

## 🎯 Problema
Il servizio raggiunge il limite di memoria (512 MB) causando crash e deploy falliti.

## ✅ Ottimizzazioni Implementate

### 1. Next.js Config (`next.config.ts`)
- ✅ `output: 'standalone'` - Riduce drasticamente dimensione app (50-70% meno dipendenze)
- ✅ `onDemandEntries` ottimizzato - Mantiene solo 2 pagine in memoria invece di 5
- ✅ `optimizePackageImports` - Riduce bundle size delle librerie pesanti
- ✅ Ridotte dimensioni immagini supportate
- ✅ `serverExternalPackages` - Esternalizza librerie pesanti come sharp

### 2. Package.json
- ✅ Script `start` con `NODE_OPTIONS` ottimizzato (350MB invece di 400MB)
- ✅ `--expose-gc` per garbage collection aggressivo

### 3. NPM Config (`.npmrc`)
- ✅ Disabilita progress, audit, fund per ridurre memoria durante install
- ✅ Ridotti socket e retry per installazione più leggera

## 🔧 Configurazioni Render Dashboard

### Environment Variables da aggiungere su Render:

```bash
# Limita memoria Node.js (già nello script start, ma per sicurezza)
NODE_OPTIONS=--max-old-space-size=350 --expose-gc

# Ottimizza Next.js per produzione
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production

# Riduce memoria durante build
CI=true
```

### Build Command su Render:
```bash
npm install && npm run build
```

### Start Command su Render:
```bash
npm start
```
(Lo script npm start ora include già NODE_OPTIONS ottimizzato)

## 📊 Ulteriori Ottimizzazioni (se necessario)

### A. Disabilita Image Optimization
Se le immagini causano ancora problemi:

```typescript
// In next.config.ts
images: {
  unoptimized: true, // Disabilita ottimizzazione immagini lato server
}
```

### B. Riduci ulteriormente deviceSizes
```typescript
deviceSizes: [640, 828, 1200], // Solo 3 sizes invece di 5
imageSizes: [32, 64, 96],      // Solo 3 sizes invece di 6
```

### C. Lazy Load Components Pesanti
Per componenti con Chart.js o librerie pesanti:

```typescript
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  ssr: false,
  loading: () => <p>Caricamento...</p>
});
```

### D. Usa Edge Runtime dove possibile
Per API routes leggere:

```typescript
export const runtime = 'edge';
```

## 🚀 Risultato Atteso

Con queste ottimizzazioni, l'uso di memoria dovrebbe ridursi del **40-60%**:
- Prima: ~500-512 MB (crash)
- Dopo: ~250-350 MB (stabile)

## ⚠️ Note Importanti

1. **Standalone Build**: Con `output: 'standalone'`, Next.js copia solo i file necessari in `.next/standalone/`. Questo riduce drasticamente le dipendenze.

2. **Primo Deploy**: Il primo build potrebbe ancora usare molta memoria. Dai 2-3 tentativi se fallisce.

3. **Monitoring**: Tieni d'occhio le metriche su Render dopo il deploy. Se ancora problemi, considera:
   - Disabilitare `unoptimized: true` per le immagini
   - Ridurre ulteriormente `max-old-space-size` a 300MB

4. **Cache**: Render fa cache delle `node_modules`. Se hai problemi, fai "Clear build cache" dalla dashboard.

## 🆘 Se Ancora Fallisce

Ultima risorsa (senza upgrade piano):
1. Disabilita completamente image optimization: `unoptimized: true`
2. Riduci `NODE_OPTIONS` a `--max-old-space-size=300`
3. Considera di usare CDN esterno per immagini (Cloudinary, ImageKit free tier)

