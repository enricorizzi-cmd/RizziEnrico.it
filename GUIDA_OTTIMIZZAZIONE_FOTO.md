# 📸 Guida Ottimizzazione Foto Enrico

## ⚠️ Problema Attuale
Il file `public/enrico-rizzi.jpg` è **15MB**, troppo pesante per il web.

## 🎯 Obiettivo
Ridurre a **<500KB** mantenendo qualità visiva accettabile.

---

## 🚀 Metodo 1: Squoosh.app (CONSIGLIATO - Online, Gratuito)

### Passi:
1. Vai su [https://squoosh.app](https://squoosh.app)
2. Clicca "Upload" e seleziona `public/enrico-rizzi.jpg`
3. **Impostazioni consigliate**:
   - **Format**: JPEG (se non già JPEG)
   - **Quality**: 80-85%
   - **Resize**: 
     - Se > 2000px: riduci a max **1200x1200px**
     - Mantieni aspect ratio
4. Clicca "Download"
5. Sostituisci il file originale:
   ```
   Sovrascrivi: public/enrico-rizzi.jpg
   ```

**Risultato atteso**: 200-500KB

---

## 🚀 Metodo 2: TinyJPG (Online, Alternativa)

1. Vai su [https://tinyjpg.com](https://tinyjpg.com)
2. Trascina `public/enrico-rizzi.jpg`
3. Attendi compressione automatica
4. Scarica file ottimizzato
5. Sostituisci originale

**Risultato atteso**: 300-600KB

---

## 🚀 Metodo 3: Photoshop/GIMP (Se hai software)

### Photoshop:
1. Apri `public/enrico-rizzi.jpg`
2. **Image → Image Size**:
   - Width: max 1200px
   - Height: auto (mantieni aspect ratio)
   - Resolution: 72 dpi
3. **File → Export → Save for Web**:
   - Format: JPEG
   - Quality: 80-85%
   - Optimize: ✓
4. Salva come `enrico-rizzi.jpg` (sovrascrivi)

### GIMP:
1. Apri file
2. **Image → Scale Image**:
   - Width: 1200px (mantieni aspect ratio)
3. **File → Export As**:
   - Nome: `enrico-rizzi.jpg`
   - Qualità: 80-85%
4. Esporta

---

## 🚀 Metodo 4: PowerShell Script (Automatico)

Se hai ImageMagick installato:

```powershell
magick public\enrico-rizzi.jpg -resize 1200x1200> -quality 85 public\enrico-rizzi-optimized.jpg
```

Poi rinomina manualmente.

---

## ✅ Verifica Risultato

Dopo l'ottimizzazione:

```powershell
$file = "public\enrico-rizzi.jpg"
$size = (Get-Item $file).Length / 1KB
Write-Host "Dimensione: $([math]::Round($size, 2)) KB"
```

**Target**: <500KB

---

## 🔄 Dopo Ottimizzazione

1. ✅ File ottimizzato salvato in `public/enrico-rizzi.jpg`
2. ✅ Commit e push su GitHub
3. ✅ Render farà auto-deploy
4. ✅ Foto si caricherà più velocemente

---

## 📝 Note

- Next.js Image component ottimizza automaticamente, ma il file originale grande rallenta il primo caricamento
- 1200x1200px è sufficiente per web (le foto profilo non necessitano risoluzione più alta)
- 80-85% qualità mantiene ottima qualità visiva con compressione significativa

---

**Raccomandazione**: Usa **Squoosh.app** (metodo 1) - è il più semplice e veloce!

