# 🔧 Setup Rapido Google Search Console

## Passo 1: Ottieni il Tag di Verifica

1. Vai su: https://search.google.com/search-console
2. Aggiungi proprietà: `https://www.rizzienrico.it`
3. Scegli **"Tag HTML"** come metodo di verifica
4. Copia il **content** del meta tag (la parte tra `content="..."`)

## Passo 2: Aggiungi al Sito

Apri `app/layout.tsx` e aggiungi nel `<head>` (dopo la riga 62):

```tsx
{/* Google Search Console Verification */}
<meta name="google-site-verification" content="IL_TUO_CODICE_QUI" />
```

**Esempio completo:**
```tsx
<head>
  {/* Preconnect a font Google per migliorare performance */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  {/* Preconnect a domini third-party per analytics */}
  <link rel="preconnect" href="https://plausible.io" crossOrigin="anonymous" />
  <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
  <link rel="dns-prefetch" href="https://plausible.io" />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
  
  {/* Google Search Console Verification - AGGIUNGI QUI */}
  <meta name="google-site-verification" content="IL_TUO_CODICE_QUI" />
</head>
```

## Passo 3: Deploy e Verifica

1. Fai commit e push
2. Attendi il deploy
3. Torna su Google Search Console
4. Clicca **"Verifica"**

## Passo 4: Invia Sitemap

Dopo la verifica:
1. Search Console → **Sitemap**
2. Inserisci: `https://www.rizzienrico.it/sitemap.xml`
3. Clicca **"Invia"**

## ⏰ Quando Vedrai i Dati

- **Primi dati:** 3-7 giorni
- **Dati completi:** 2-4 settimane

---

**Nota:** Il tuo sito ha già:
- ✅ Sitemap configurata (`app/sitemap.ts`)
- ✅ Robots.txt configurato (`public/robots.txt`)
- ✅ Google Analytics attivo (`G-0PKBSWJH3V`)

Basta aggiungere il tag di verifica!







