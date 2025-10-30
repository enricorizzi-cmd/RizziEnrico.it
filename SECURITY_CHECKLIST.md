# 🔒 SICUREZZA CHIAVI API - CHECKLIST

## ✅ Verifiche Completate

1. ✅ `.gitignore` aggiornato per escludere tutti i file `.env*`
2. ✅ Chiavi hardcoded rimosse dai file di documentazione
3. ✅ `.env.example` creato con placeholder
4. ✅ Tutte le chiavi usano `process.env` nel codice

## 📋 Checklist Pre-Deploy

### ✅ Locale
- [x] `.env.local` NON è tracciato da git
- [x] Nessuna chiave hardcoded nel codice
- [x] `.env.example` contiene solo placeholder

### ⚠️ Render (DA FARE)
- [ ] Configurare `OPENAI_API_KEY` su Render Dashboard
- [ ] Configurare `NEXT_PUBLIC_SUPABASE_URL` su Render
- [ ] Configurare `NEXT_PUBLIC_SUPABASE_ANON_KEY` su Render
- [ ] Configurare `SUPABASE_SERVICE_ROLE_KEY` su Render
- [ ] Configurare `NEXT_PUBLIC_CALENDLY_CHECKUP_URL` su Render
- [ ] Configurare `NEXT_PUBLIC_WHATSAPP_NUMBER` su Render
- [ ] Configurare `NEXT_PUBLIC_BASE_URL` su Render (opzionale)

## 🚨 File da NON Committare MAI

- `.env`
- `.env.local`
- `.env.development.local`
- `.env.production.local`
- Qualsiasi file con chiavi API hardcoded

## 📝 Variabili d'Ambiente Richieste su Render

### Obbligatorie:
1. `OPENAI_API_KEY` - Chiave OpenAI (server-side only)
2. `NEXT_PUBLIC_SUPABASE_URL` - URL progetto Supabase
3. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Chiave anonima Supabase
4. `SUPABASE_SERVICE_ROLE_KEY` - Chiave service role Supabase (server-side only)

### Opzionali ma Consigliate:
5. `NEXT_PUBLIC_CALENDLY_CHECKUP_URL` - Link Calendly
6. `NEXT_PUBLIC_WHATSAPP_NUMBER` - Numero WhatsApp
7. `NEXT_PUBLIC_BASE_URL` - URL base del sito (per SEO)

## 🔍 Come Verificare che sia Tutto OK

```bash
# Verifica che .env.local non sia tracciato
git status | grep .env

# Dovrebbe essere vuoto (nessun file .env tracciato)
```

## ✅ Pronto per Push!

Tutti i file con chiavi sono ora esclusi. Puoi fare push sicuro.


