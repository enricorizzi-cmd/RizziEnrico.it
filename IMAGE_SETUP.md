# 📸 Setup Immagini - Guida

## ✅ File Copiati

1. **Foto Enrico**: `public/enrico-rizzi.jpg` (da "Impact 17-10-2025-13.jpg")
   - ⚠️ **Attenzione**: File originale 15MB - da ottimizzare per web!

2. **Logo Enrico**: `public/logo-enrico-rizzi.png` (da "Enrico Rizzi black (2).png")

3. **Logo OSM**: `public/logo-osm-partner.png` (da "Logo Parnern Colori.png")

---

## 🔧 OTTIMIZZAZIONE IMMAGINI (IMPORTANTE!)

### Foto Enrico (15MB → Obiettivo: <500KB)

**Opzione 1: Online (Consigliato)**
1. Vai su [Squoosh.app](https://squoosh.app) o [TinyPNG](https://tinypng.com)
2. Carica `public/enrico-rizzi.jpg`
3. Riduci qualità a 80-85%
4. Riduci dimensioni se > 2000px
5. Salva come `enrico-rizzi-optimized.jpg`
6. Sostituisci il file

**Opzione 2: Photoshop/GIMP**
- Ridimensiona a max 1200x1200px
- Qualità JPEG: 85%
- Salva per web

**Opzione 3: Next.js Image Component**
Il componente usa già Next/Image che ottimizza, ma il file iniziale è troppo pesante.

### Logo OSM
- ✅ Dovrebbe essere già leggero (76KB è OK)
- Verifica che sia trasparente se necessario

### Logo Enrico
- ✅ PNG 490KB - accettabile ma si può ottimizzare

---

## 🎯 DOVE SONO USATE LE IMMAGINI

### Foto Enrico (`/enrico-rizzi.jpg`)
- ✅ Homepage: Sezione "Enrico Rizzi"
- ✅ Pagina "Chi sono": Hero grande
- ✅ Component `ProfilePhoto` (automatico)

### Logo OSM (`/logo-osm-partner.png`)
- ✅ Header: Badge "Partner" (desktop)
- ✅ Homepage: Badge accanto foto
- ✅ Chi sono: Badge a lato foto
- ✅ Footer: Badge piccolo

### Logo Enrico (`/logo-enrico-rizzi.png`)
- 🔜 Disponibile ma non ancora integrato
- Può essere usato in Header al posto di testo "ER" se preferisci

---

## 🚀 PROSSIMI STEP

1. **Ottimizza foto Enrico** (15MB → <500KB)
2. **Test locale**: Verifica che immagini si vedano
3. **Push su GitHub**: Render farà auto-deploy

---

**Le immagini sono integrate! Testa in locale per vedere come appaiono! 🎨**


