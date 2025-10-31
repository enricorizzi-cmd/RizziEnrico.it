# 📸 Istruzioni Ottimizzazione Foto Enrico

## ⚠️ Problema Attuale

**File**: `public/enrico-rizzi.jpg`  
**Dimensione attuale**: ~15 MB (15,491 KB)  
**Obiettivo**: < 500 KB  
**Riduzione necessaria**: ~97%

## 🎯 Perché Ottimizzare?

- ⚡ Performance: Tempo di caricamento molto più veloce
- 📱 Mobile: Risparmio dati per utenti mobile
- 🌐 SEO: Google penalizza siti lenti
- 💰 CDN: Costi di bandwidth ridotti

## ✅ SOLUZIONE RAPIDA (Raccomandata)

### Opzione 1: Squoosh.app (Online, Gratuito) ⭐

1. **Vai su**: https://squoosh.app
2. **Carica** il file: `public/enrico-rizzi.jpg`
3. **Impostazioni**:
   - Formato: **MozJPEG** o **WebP**
   - Qualità: **80-85%**
   - Ridimensiona: Se > 2000px → **max 1200x1200px**
4. **Scarica** il file ottimizzato
5. **Sostituisci** `public/enrico-rizzi.jpg` con quello nuovo

### Opzione 2: TinyJPG (Online)

1. **Vai su**: https://tinyjpg.com
2. **Carica** il file
3. **Scarica** il file ottimizzato (automatico)
4. **Sostituisci** `public/enrico-rizzi.jpg`

### Opzione 3: PowerShell Script (Locale)

Se hai ImageMagick installato:

```powershell
# Installa ImageMagick: https://imagemagick.org/script/download.php
magick public/enrico-rizzi.jpg -resize 1200x1200> -quality 85 public/enrico-rizzi-optimized.jpg
```

## 📊 Risultati Attesi

**Prima**:
- Dimensione: 15 MB
- Caricamento: ~30-60 secondi su 4G

**Dopo**:
- Dimensione: ~200-400 KB
- Caricamento: ~1-3 secondi su 4G

## ✅ Dopo Ottimizzazione

1. **Sostituisci** `public/enrico-rizzi.jpg`
2. **Verifica** che l'immagine si veda correttamente
3. **Test** su mobile
4. **Commit** le modifiche

## 🔍 Verifica Dimensione

Dopo ottimizzazione, verifica:

```powershell
Get-ChildItem "public\enrico-rizzi.jpg" | Select-Object Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB,2)}}
```

Dovrebbe essere < 500 KB.

---

**⚠️ IMPORTANTE**: Il codice è già configurato per usare Next.js Image ottimizzato. L'ottimizzazione del file sorgente migliorerà ulteriormente le performance.

