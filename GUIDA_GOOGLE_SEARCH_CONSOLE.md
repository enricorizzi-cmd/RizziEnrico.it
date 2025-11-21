# 🔍 Guida Completa: Monitorare Keyword e Posizionamento Google

**Data:** 14 Novembre 2025

---

## 🎯 OBIETTIVO

Capire con quali parole chiave il tuo sito **www.rizzienrico.it** arriva primo (o nelle prime posizioni) su Google.

---

## 📊 STRUMENTO PRINCIPALE: Google Search Console

**Google Search Console** è lo strumento **gratuito e ufficiale** di Google per monitorare:
- ✅ Con quali keyword gli utenti trovano il tuo sito
- ✅ In quale posizione sei su Google per ogni keyword
- ✅ Quante persone cliccano sul tuo sito (CTR)
- ✅ Quali pagine sono indicizzate
- ✅ Errori di indicizzazione
- ✅ Performance nel tempo

---

## 🚀 SETUP INIZIALE (15 minuti)

### Passo 1: Accedi a Google Search Console

1. Vai su: **https://search.google.com/search-console**
2. Accedi con il tuo account Google (quello usato per Google Analytics)
3. Clicca **"Aggiungi proprietà"**

### Passo 2: Aggiungi il Tuo Sito

1. Seleziona **"Prefisso URL"** (non dominio)
2. Inserisci: `https://www.rizzienrico.it` (o `https://rizzienrico.it` se non usi www)
3. Clicca **"Continua"**

### Passo 3: Verifica la Proprietà

Google ti chiederà di verificare che sei il proprietario del sito. Hai 3 opzioni:

#### **Opzione A: Tag HTML (CONSIGLIATO - Più Semplice)**

1. Google ti darà un **meta tag** tipo:
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```
2. Copia il **content** (la parte dopo `content="` e prima di `"`)
3. Aggiungilo al file `app/layout.tsx` nel `<head>`

#### **Opzione B: File HTML**

1. Google ti darà un file `.html` da scaricare
2. Caricalo nella cartella `public/` del tuo sito
3. Deploy e verifica

#### **Opzione C: Google Analytics** (se già configurato)

1. Se hai già Google Analytics attivo (hai `G-0PKBSWJH3V`)
2. Puoi verificare automaticamente tramite GA

---

## 📝 AGGIUNTA TAG VERIFICA AL SITO

Dopo aver scelto l'opzione A (tag HTML), aggiungiamo il tag al sito:

**File da modificare:** `app/layout.tsx`

Aggiungi nel `<head>`:
```tsx
<meta name="google-site-verification" content="IL_TUO_CODICE_QUI" />
```

**Nota:** Ti darò il codice esatto dopo che lo ottieni da Google Search Console.

---

## 🗺️ INVIO SITEMAP

Dopo la verifica, invia la sitemap a Google:

1. In Search Console, vai su **"Sitemap"** (menu laterale)
2. Inserisci: `https://www.rizzienrico.it/sitemap.xml`
3. Clicca **"Invia"**

**Il tuo sito ha già la sitemap configurata** in `app/sitemap.ts` ✅

---

## ⏰ TEMPI DI ATTESA

**IMPORTANTE:** Dato che hai appena lanciato il sito:

- ⏳ **Primi dati:** 3-7 giorni dopo la verifica
- ⏳ **Dati significativi:** 2-4 settimane
- ⏳ **Dati completi:** 1-3 mesi

**Perché?** Google deve:
1. Scansionare il tuo sito (crawling)
2. Indicizzare le pagine (indexing)
3. Raccogliere dati di ricerca (query)
4. Calcolare posizioni e CTR

---

## 📈 COME VEDERE LE KEYWORD

### Dopo 3-7 giorni:

1. Vai su **Google Search Console**
2. Menu laterale → **"Performance"** (o "Prestazioni")
3. Vedrai:
   - **Query:** Le keyword con cui gli utenti ti trovano
   - **Posizione media:** In quale posizione sei (1 = primo, 10 = prima pagina)
   - **Impressioni:** Quante volte il tuo sito appare nei risultati
   - **CTR:** Percentuale di click (clic/impressioni)
   - **Clic:** Quanti click ricevi

### Filtri Utili:

- **Periodo:** Scegli ultimi 3 mesi per vedere trend
- **Paese:** Filtra per "Italia" se vuoi solo ricerche italiane
- **Dispositivo:** Mobile vs Desktop
- **Tipo di ricerca:** Web, Immagini, Video

---

## 🎯 COSA CERCARE

### Keyword in Posizione 1-3 (Prima Pagina):

✅ **Queste sono le tue keyword vincenti!**
- Monitora se mantengono la posizione
- Ottimizza le pagine correlate
- Crea contenuti simili

### Keyword in Posizione 4-10:

🟡 **Potenziale da migliorare**
- Ottimizza meta title e description
- Migliora contenuto della pagina
- Aggiungi link interni

### Keyword in Posizione 11+:

🔴 **Opportunità di crescita**
- Analizza cosa fanno i competitor in posizione 1-3
- Migliora SEO on-page
- Crea backlink

---

## 🔗 COLLEGAMENTO CON GOOGLE ANALYTICS

Per dati più completi:

1. In Search Console → **Impostazioni** → **Associazioni**
2. Collega con il tuo account Google Analytics (`G-0PKBSWJH3V`)
3. In Google Analytics vedrai:
   - Da quale keyword arrivano gli utenti
   - Comportamento sul sito
   - Conversioni per keyword

---

## 📊 ALTRI STRUMENTI UTILI

### 1. Google Analytics 4 (Già Configurato ✅)

- Vai su: https://analytics.google.com
- **Acquisizione** → **Ricerca organica**
- Vedrai keyword e traffico

### 2. Google Keyword Planner (Gratuito)

- Vai su: https://ads.google.com/aw/keywordplanner
- Cerca keyword correlate
- Vedi volume di ricerca mensile
- Stima difficoltà SEO

### 3. Strumenti SEO Esterni (A Pagamento)

- **Ahrefs:** https://ahrefs.com (da €99/mese)
- **SEMrush:** https://semrush.com (da €119/mese)
- **Ubersuggest:** https://neilpatel.com/ubersuggest (da €29/mese)

**Nota:** Per un sito appena lanciato, Google Search Console è sufficiente.

---

## 🎯 KEYWORD TARGET PER IL TUO SITO

Basandomi sul tuo contenuto, ecco le keyword principali su cui monitorare:

### Keyword Principali:
1. **"consulente PMI Veneto"**
2. **"consulente aziendale Venezia"**
3. **"consulente aziendale Padova"**
4. **"consulente aziendale Rovigo"**
5. **"consulenza organizzazione PMI"**
6. **"KPI PMI Veneto"**
7. **"digitalizzazione PMI Veneto"**
8. **"metodo OSM PMI"**
9. **"Enrico Rizzi consulente"**
10. **"consulente passaggio generazionale"**

### Keyword Locali (Long-tail):
- "consulente PMI Venezia Mestre"
- "consulenza aziendale Padova centro"
- "consulente organizzazione Rovigo"
- "KPI aziendali consulente Veneto"

---

## 📅 CHECKLIST SETUP

- [ ] Accedi a Google Search Console
- [ ] Aggiungi proprietà `https://www.rizzienrico.it`
- [ ] Verifica proprietà (tag HTML o file)
- [ ] Invia sitemap `https://www.rizzienrico.it/sitemap.xml`
- [ ] Collega con Google Analytics
- [ ] Attendi 3-7 giorni per primi dati
- [ ] Monitora keyword ogni settimana

---

## 💡 CONSIGLI PRATICI

1. **Monitora settimanalmente** le prime 2-4 settimane
2. **Focalizzati su keyword locali** (Venezia, Padova, Rovigo) - meno competitive
3. **Ottimizza pagine con CTR basso** (< 2%) ma buone impressioni
4. **Crea contenuti** per keyword in posizione 4-10 per spingerle su
5. **Usa Google Keyword Planner** per trovare nuove keyword

---

## 🚨 COSA FARE SE NON VEDI DATI

### Dopo 7 giorni ancora nessun dato:

1. **Verifica indicizzazione:**
   - Search Console → **Copertura**
   - Controlla se le pagine sono indicizzate

2. **Verifica sitemap:**
   - Search Console → **Sitemap**
   - Controlla che sia processata correttamente

3. **Richiedi indicizzazione manuale:**
   - Search Console → **URL Inspection**
   - Inserisci URL pagina
   - Clicca **"Richiedi indicizzazione"**

4. **Verifica robots.txt:**
   - Il tuo `robots.txt` è configurato correttamente ✅

---

## 📞 SUPPORTO

Se hai problemi:
- Documentazione: https://support.google.com/webmasters
- Forum: https://support.google.com/webmasters/community

---

**Prossimo step:** Configura Google Search Console e aggiungi il tag di verifica al sito!








