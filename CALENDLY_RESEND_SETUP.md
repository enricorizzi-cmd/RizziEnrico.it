# 🔧 Guida Configurazione Calendly e Resend

## 📅 Configurazione Calendly

### Cosa serve per collegare Calendly al tuo account:

1. **Account Calendly** (gratuito o a pagamento)
   - Vai su https://calendly.com e crea/login nel tuo account
   - Se non hai un account, crealo con la stessa email che usi per il business (e.rizzi@osmpartnervenezia.it)

2. **Creare 2 eventi Calendly:**

#### Evento 1: Check-up via Zoom (60 minuti)
- Nome evento: "Check-up Aziendale Gratuito - Zoom"
- Durata: 60 minuti
- Tipo: Meeting virtuale (Zoom)
- Link che otterrai sarà tipo: `https://calendly.com/enrico-rizzi/check-up-zoom`

#### Evento 2: Check-up in presenza (90 minuti)
- Nome evento: "Check-up Aziendale Gratuito - In Presenza"
- Durata: 90 minuti
- Tipo: Meeting in presenza (puoi aggiungere indirizzo)
- Link che otterrai sarà tipo: `https://calendly.com/enrico-rizzi/check-up-presenza`

### Come ottenere i link Calendly:

1. Accedi a Calendly → **Event Types**
2. Clicca su ogni evento che hai creato
3. Vai su **Settings** → **Booking Page**
4. Copia l'URL completo (es: `https://calendly.com/enrico-rizzi/check-up-zoom`)
5. Aggiungi questi URL nelle variabili ambiente (vedi sotto)

### Variabili ambiente da configurare:

Aggiungi al tuo file `.env` o nelle variabili ambiente di Render:

```env
# Calendly URLs
NEXT_PUBLIC_CALENDLY_ZOOM_URL=https://calendly.com/enrico-rizzi/check-up-zoom
NEXT_PUBLIC_CALENDLY_PRESENCE_URL=https://calendly.com/enrico-rizzi/check-up-presenza
```

**Nota:** Sostituisci `enrico-rizzi` con il tuo username Calendly se diverso.

---

## 📧 Configurazione Resend (per invio email)

### Dove trovare la chiave Resend API:

1. **Crea account Resend:**
   - Vai su https://resend.com
   - Clicca su "Sign Up" e crea un account gratuito
   - Il piano gratuito include 3.000 email/mese (sufficiente per iniziare)

2. **Ottenere la API Key:**
   - Dopo il login, vai su **API Keys** nel menu laterale
   - Clicca su **Create API Key**
   - Scegli un nome (es: "rizzienrico.it Production")
   - Copia la chiave generata (inizia con `re_...`)
   - ⚠️ **IMPORTANTE**: Copiala subito, non la vedrai più!

3. **Verificare dominio (opzionale ma consigliato):**
   - Vai su **Domains** in Calendly
   - Aggiungi il tuo dominio (es: `rizzienrico.it`)
   - Aggiungi i record DNS che Resend ti fornisce nel tuo registrar
   - Questo permette di inviare email da `@rizzienrico.it` invece di `@resend.dev`

### Variabili ambiente da configurare:

Aggiungi al tuo file `.env` o nelle variabili ambiente di Render:

```env
# Resend Email Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=Enrico Rizzi <noreply@rizzienrico.it>
```

**Nota:** 
- `RESEND_API_KEY`: La chiave che hai copiato da Resend
- `FROM_EMAIL`: Se non hai verificato il dominio, usa un formato come `Enrico Rizzi <noreply@resend.dev>` (verrà generato automaticamente)

---

## 🚀 Configurazione su Render (produzione)

Se usi Render per il deploy:

1. Vai su **Dashboard Render** → Il tuo servizio web
2. Vai su **Environment** (variabili ambiente)
3. Aggiungi tutte le variabili sopra:
   - `NEXT_PUBLIC_CALENDLY_ZOOM_URL`
   - `NEXT_PUBLIC_CALENDLY_PRESENCE_URL`
   - `RESEND_API_KEY`
   - `FROM_EMAIL`

4. Riavvia il servizio dopo aver aggiunto le variabili

---

## ✅ Test

Dopo aver configurato tutto:

1. **Test Calendly:**
   - Vai su `/contatti` sul sito
   - Compila il form
   - Scegli "Via Zoom" o "In presenza"
   - Dopo l'invio, dovresti essere reindirizzato al link Calendly corretto

2. **Test Email:**
   - Invia una richiesta di contatto
   - Verifica che ricevi l'email di notifica (a e.rizzi@osmpartnervenezia.it)
   - Verifica che il lead riceve l'email di conferma
   - Controlla i log di Render se non funziona

---

## 🔍 Troubleshooting

### Email non vengono inviate:
- Verifica che `RESEND_API_KEY` sia corretta (inizia con `re_`)
- Controlla i log su Render per errori
- Verifica che il dominio sia verificato su Resend (se usi un dominio custom)

### Redirect Calendly non funziona:
- Verifica che gli URL Calendly siano corretti nelle variabili ambiente
- Testa manualmente gli URL Calendly nel browser
- Controlla che gli eventi siano attivi su Calendly

---

## 📚 Link utili

- **Calendly Docs**: https://help.calendly.com/
- **Resend Docs**: https://resend.com/docs
- **Resend Dashboard**: https://resend.com/api-keys

