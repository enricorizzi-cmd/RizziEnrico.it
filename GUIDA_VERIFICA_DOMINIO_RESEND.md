# Guida: Verifica Dominio su Resend

## Problema Attuale
Resend è in **modalità test**, quindi può inviare email solo a `enricorizzi1991@gmail.com`. Per inviare a tutti i destinatari, devi verificare un dominio.

## Soluzione: Verifica Dominio

### Step 1: Accedi a Resend
1. Vai su https://resend.com/domains
2. Accedi con il tuo account Resend
3. Clicca su **"Add Domain"**

### Step 2: Aggiungi il Dominio
**Opzioni consigliate:**
- **Opzione A (Consigliata)**: Usa un sottodominio dedicato
  - Dominio: `mail.rizzienrico.it`
  - Vantaggi: Non interferisce con email esistenti, più facile da gestire
  
- **Opzione B**: Usa il dominio principale
  - Dominio: `rizzienrico.it`
  - Vantaggi: Email più "pulite" (es. `noreply@rizzienrico.it`)

### Step 3: Configura i Record DNS

Resend ti mostrerà i record DNS da aggiungere. Esempio tipico:

#### Record SPF (TXT)
```
Nome: @ (o mail se usi sottodominio)
Valore: v=spf1 include:resend.com ~all
TTL: 3600
```

#### Record DKIM (TXT)
```
Nome: resend._domainkey (o mail._domainkey se usi sottodominio)
Valore: [Resend ti fornirà questo valore univoco]
TTL: 3600
```

#### Record DMARC (TXT) - Opzionale ma consigliato
```
Nome: _dmarc
Valore: v=DMARC1; p=none; rua=mailto:enricorizzi1991@gmail.com
TTL: 3600
```

### Step 4: Aggiungi i Record nel Tuo Provider DNS

**Se usi Cloudflare:**
1. Vai su https://dash.cloudflare.com
2. Seleziona il dominio `rizzienrico.it`
3. Vai su **DNS** → **Records**
4. Clicca **Add record**
5. Aggiungi tutti i record forniti da Resend

**Se usi un altro provider (GoDaddy, Namecheap, ecc.):**
1. Accedi al pannello DNS del tuo provider
2. Aggiungi i record TXT forniti da Resend
3. Salva le modifiche

### Step 5: Verifica il Dominio su Resend

1. Torna su https://resend.com/domains
2. Clicca su **"Verify Domain"** accanto al dominio aggiunto
3. Attendi la verifica (di solito 5-15 minuti, può richiedere fino a 24h)
4. Quando vedi lo status **"Verified"** ✅, sei pronto!

### Step 6: Aggiorna la Variabile d'Ambiente su Render

1. Vai su https://dashboard.render.com/web/srv-d41prqp5pdvs73fahp4g/environment
2. Cerca la variabile `FROM_EMAIL`
3. Aggiorna il valore con:
   - Se usi sottodominio: `Enrico Rizzi <noreply@mail.rizzienrico.it>`
   - Se usi dominio principale: `Enrico Rizzi <noreply@rizzienrico.it>`
4. Clicca **Save Changes**
5. Render riavvierà automaticamente il servizio

### Step 7: Test

1. Fai una nuova registrazione al workshop
2. Verifica che l'email arrivi al lead (non solo il fallback)
3. Controlla i log su Render per confermare l'invio

## Troubleshooting

### Il dominio non si verifica
- **Attendi fino a 24 ore**: La propagazione DNS può richiedere tempo
- **Verifica i record DNS**: Usa https://mxtoolbox.com/ per controllare che i record siano corretti
- **Controlla errori su Resend**: Vai su https://resend.com/domains e clicca sul dominio per vedere eventuali errori

### Le email non arrivano dopo la verifica
- **Verifica FROM_EMAIL**: Assicurati che la variabile su Render sia aggiornata
- **Controlla i log**: Vai su Render → Logs per vedere eventuali errori
- **Test con Resend Dashboard**: Vai su https://resend.com/emails e prova a inviare una email di test

### Record DNS non funzionano
- **Usa un sottodominio**: Se hai problemi con il dominio principale, usa `mail.rizzienrico.it`
- **Contatta il supporto DNS**: Se non riesci a configurare i record, contatta il supporto del tuo provider DNS

## Note Importanti

⚠️ **Durante la verifica del dominio:**
- Il sistema continuerà a funzionare con `onboarding@resend.dev`
- Il fallback continuerà a funzionare
- Le email ai lead potrebbero non arrivare fino alla verifica completa

✅ **Dopo la verifica:**
- Potrai inviare email a qualsiasi destinatario
- Le email avranno un aspetto più professionale (da `@rizzienrico.it`)
- Migliorerà la deliverability (meno probabilità di finire in spam)

## Supporto

- **Resend Docs**: https://resend.com/docs
- **Resend Support**: support@resend.com
- **Render Support**: https://render.com/docs



