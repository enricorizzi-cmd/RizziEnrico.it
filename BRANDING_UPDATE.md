# 🎨 Aggiornamento Branding - Enrico Rizzi

## ✅ Modifiche Applicate

### Obiettivo
**Massima visibilità di Enrico Rizzi** con **logo OSM discreto ma visibile** come partner.

### Strategia Implementata

#### 1. Header (Navbar)
- ✅ Logo "ER" + "Enrico Rizzi" ben visibile
- ✅ Badge OSM piccolo e discreto (solo desktop)
- ✅ Balance: ER grande, OSM partner badge piccolo

#### 2. Homepage
- ✅ **Nuova sezione con foto professionale** prominente
- ✅ Badge OSM piccolo accanto alla foto
- ✅ Enfasi su "Enrico Rizzi" come consulente
- ✅ Menzione OSM come "Partner" discreta

#### 3. Pagina "Chi sono"
- ✅ Foto grande e centrale
- ✅ Badge OSM discreto a lato
- ✅ Focus su Enrico, OSM come collaborazione

#### 4. Footer
- ✅ "Enrico Rizzi" come brand principale
- ✅ Logo OSM piccolo come "Partner"
- ✅ Non invasivo ma presente

#### 5. Metadata SEO
- ✅ Titolo: "Enrico Rizzi - Consulente Organizzazione PMI"
- ✅ OSM menzionato ma non prominente

---

## 📸 IMMAGINI DA AGGIUNGERE

### 1. Foto Profilo Enrico
**Percorso**: `/public/enrico-rizzi.jpg` o `.png`

**Utilizzo**:
- Homepage (sezione presentazione)
- Pagina "Chi sono" (hero grande)
- Eventualmente Header (se vuoi)

**Specifiche**:
- Formato: JPG o PNG
- Dimensioni: Minimo 800x800px (quadrato)
- Background: Bianco o neutro
- Qualità: Alta risoluzione

### 2. Logo ER (Opzionale)
Se hai un logo personale invece di solo testo "ER":
**Percorso**: `/public/logo-enrico-rizzi.svg`

### 3. Logo OSM Full (se necessario)
**Percorso**: `/public/logo-osm-full.svg`

---

## 🔧 COME AGGIUNGERE LE FOTO

### Metodo 1: Usa Component ProfilePhoto
Il componente `ProfilePhoto` gestisce automaticamente:

```tsx
// Con foto
<ProfilePhoto src="/enrico-rizzi.jpg" size="md" />

// Senza foto (mostra placeholder ER)
<ProfilePhoto size="md" />
```

**Una volta aggiunta la foto**:
1. Metti il file in `/public/enrico-rizzi.jpg`
2. Il componente la caricherà automaticamente
3. Nessuna modifica al codice necessaria

### Metodo 2: Sostituisci Placeholder
Cerca nel codice:
- `ProfilePhoto` senza `src` prop
- Sostituisci con `<ProfilePhoto src="/enrico-rizzi.jpg" />`

---

## ✅ RISULTATO

### Prima
- OSM troppo prominente
- Enrico meno visibile

### Dopo
- ✅ **Enrico Rizzi** massima visibilità
- ✅ Logo **ER** grande e chiaro
- ✅ OSM presente come "Partner" ma discreto
- ✅ Balance perfetto: è il TUO sito, OSM come collaborazione

---

## 📋 CHECKLIST IMMAGINI

- [ ] Foto Enrico professionale → `/public/enrico-rizzi.jpg`
- [ ] Logo OSM (se hai versione alta qualità) → `/public/logo-osm-full.svg`
- [ ] Logo ER personalizzato (opzionale) → `/public/logo-enrico-rizzi.svg`

**Una volta aggiunte le immagini, il componente ProfilePhoto le caricherà automaticamente!**

---

**Branding aggiornato: Enrico Rizzi in primo piano, OSM come partner discreto ma visibile! 🎯**

