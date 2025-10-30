# 🚀 TEST LOCALE - Guida Rapida

## ✅ Server Avviato!

Il sito è disponibile su: **http://localhost:3000**

---

## 🧪 COSA PUOI TESTARE

### ✅ Pagine Statiche (Funzionano 100%)
- ✅ **Home** → http://localhost:3000
- ✅ **Metodo** → http://localhost:3000/metodo
- ✅ **Servizi** → http://localhost:3000/servizi
- ✅ **Chi sono** → http://localhost:3000/chi-sono
- ✅ **Privacy** → http://localhost:3000/privacy
- ✅ **404** → http://localhost:3000/pagina-che-non-esiste

### ✅ Pagine Dinamiche (SSG - Funzionano)
- ✅ **Case Study** → http://localhost:3000/case-study
  - Dettaglio: http://localhost:3000/case-study/pmi-manifatturiera-45
- ✅ **Blog** → http://localhost:3000/blog
  - Post: http://localhost:3000/blog/kpi-per-pmi-guida-pratica
- ✅ **Eventi** → http://localhost:3000/eventi
  - Dettaglio: http://localhost:3000/eventi/workshop-kpi-venezia
- ✅ **Servizi** → http://localhost:3000/servizi/consulenza-pmi

### ⚠️ Funzionalità che Richiedono Supabase (Fallback Attivo)

#### Form Contatti
- ✅ **UI funziona**: http://localhost:3000/contatti
- ⚠️ **Submit**: Mostrerà errore (normale senza Supabase)
- 💡 **Workaround**: I form validano ma non salvano (mock)

#### Download KPI Pack
- ✅ **Form funziona**: http://localhost:3000/risorse
- ⚠️ **Download**: Non invia email (manca email service)

#### Mini-Tool KPI
- ✅ **Funzionano 100%** (calcoli client-side):
  - Spreco tempo
  - Break-even
  - Pricing

#### AI Assistant
- ✅ **Chatbot funziona** (clicca icona in basso a destra)
- ⚠️ **Lead capture**: Non salva su DB (manca Supabase)

---

## 🎨 COSA VEDRAI

### Design System
- ✅ Colori: Magenta (#A72868) come primary
- ✅ Font: Montserrat (heading) + Inter (body)
- ✅ Layout: Responsive mobile/desktop
- ✅ Componenti: Animazioni smooth

### Funzionalità WOW
- ✅ **AI Assistant**: Icona chat in basso a destra
- ✅ **PWA**: Installabile (chrome://flags/#beforeinstallprompt)
- ✅ **Analytics**: Tracking configurato (se hai ENV)

---

## 📋 CHECKLIST TEST RAPIDO

### Navigazione
- [ ] Home page carica correttamente
- [ ] Menu mobile funziona (burger icon)
- [ ] Link a tutte le pagine funzionano
- [ ] Footer links funzionano

### Form
- [ ] Form contatti: validazione funziona
- [ ] Form multi-step: navigazione step 1→2 OK
- [ ] Form risorse: download form funziona

### Componenti
- [ ] Hero: CTA funzionano
- [ ] Card: hover effects
- [ ] Accordion: FAQ si aprono/chiudono
- [ ] Steps: Timeline visibile

### Mini-Tool
- [ ] Spreco tempo: calcolo funziona
- [ ] Break-even: calcolo funziona
- [ ] Pricing: calcolo funziona

### AI Assistant
- [ ] Si apre cliccando icona
- [ ] Risponde a domande (prova: "metodo", "kpi", "prezzi")
- [ ] Chat scrolling funziona

### Responsive
- [ ] Mobile: menu burger funziona
- [ ] Tablet: layout si adatta
- [ ] Desktop: layout ottimale

---

## 🔧 COSA NON FUNZIONA (Normale senza Supabase)

1. **Salvataggio Lead**: I form validano ma non salvano
2. **Email**: Nessun invio email (manca email service)
3. **QR Code**: Genera ma non salva su storage
4. **Analytics**: Traccia solo se configuri Plausible/GA4

**TUTTO IL RESTO FUNZIONA PERFETTAMENTE!**

---

## 🛑 COME FERMARE IL SERVER

Premi `Ctrl+C` nel terminale dove sta girando `npm run dev`

---

## 💡 TIPS

- **Hot Reload**: Modifica file e vedi cambiamenti in tempo reale
- **Console Dev**: Apri DevTools per vedere eventuali warning
- **Network Tab**: Verifica chiamate API (dovrebbero fallire gracefully)

---

**Buon test! 🚀**

