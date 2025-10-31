# ✅ Configurazione Completata

## 📅 Calendly

**Link configurato:**
- ✅ In presenza: https://calendly.com/enricorizzi/check-up-gratuito-in-azienda
- ⏳ Zoom: Presto disponibile (attualmente disabilitato nel form)

**Area servita:** Venezia-Padova-Rovigo

## 📧 Resend Email

**API Key configurata:**
- ✅ `re_xxxxxxxxxxxxx`
- ✅ Email sender: `Enrico Rizzi <noreply@rizzienrico.it>`

## 🔧 Variabili Ambiente da Configurare

Aggiungi queste variabili al tuo file `.env.local` (sviluppo) o nelle variabili ambiente di Render (produzione):

```env
# Calendly
NEXT_PUBLIC_CALENDLY_PRESENCE_URL=https://calendly.com/enricorizzi/check-up-gratuito-in-azienda
NEXT_PUBLIC_CALENDLY_ZOOM_URL=

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=Enrico Rizzi <noreply@rizzienrico.it>
```

## 🚀 Configurazione Render (Produzione)

1. Vai su **Render Dashboard** → Il tuo servizio web
2. Vai su **Environment**
3. Aggiungi tutte le variabili sopra
4. Riavvia il servizio

## ✨ Funzionalità Attive

- ✅ Form contatti con scelta Zoom/In presenza
- ✅ Zoom mostrato come "Presto disponibile" (non selezionabile)
- ✅ Solo "In presenza" disponibile per ora
- ✅ Redirect automatico a Calendly dopo invio form
- ✅ Invio email con Resend configurato
- ✅ Email di conferma al lead con link Calendly

## 📝 Note

- Quando vorrai abilitare Zoom, aggiungi `NEXT_PUBLIC_CALENDLY_ZOOM_URL` con il link dell'evento Zoom su Calendly
- Il form si aggiornerà automaticamente per mostrare entrambe le opzioni
