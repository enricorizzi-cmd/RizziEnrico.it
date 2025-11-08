# ⚠️ URGENTE: Ottimizzazione Immagine Enrico

## Problema
Il file `public/enrico-rizzi.jpg` è **15MB**, troppo pesante per il web.

## Obiettivo
Ridurre a **<500KB** (meglio <300KB) mantenendo qualità visiva accettabile.

## Soluzione Rapida

### Metodo 1: Squoosh.app (CONSIGLIATO - Online, Gratuito)
1. Vai su [https://squoosh.app](https://squoosh.app)
2. Clicca "Upload" e seleziona `public/enrico-rizzi.jpg`
3. **Impostazioni consigliate**:
   - **Format**: WebP
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

### Metodo 2: TinyJPG (Online, Alternativa)
1. Vai su [https://tinyjpg.com](https://tinyjpg.com)
2. Trascina `public/enrico-rizzi.jpg`
3. Attendi compressione automatica
4. Scarica file ottimizzato
5. Sostituisci originale

**Risultato atteso**: 300-600KB

## Verifica Dopo Ottimizzazione

Dopo l'ottimizzazione, verifica la dimensione:

```powershell
Get-ChildItem "public\enrico-rizzi.jpg" | Select-Object Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB,2)}}
```

Dovrebbe essere < 500 KB.

## Impatto Performance

**Prima**:
- Dimensione: 15 MB
- Caricamento: ~30-60 secondi su 4G
- LCP (Largest Contentful Paint): molto alto

**Dopo**:
- Dimensione: ~200-400 KB
- Caricamento: ~1-3 secondi su 4G
- LCP: <2.5s (target Google)

## Nota
Il codice è già configurato per usare Next.js Image ottimizzato con `priority` e `loading="eager"` nella Hero. L'ottimizzazione del file sorgente migliorerà ulteriormente le performance.




