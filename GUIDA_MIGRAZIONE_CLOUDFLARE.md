# Guida: Migrazione DNS da Aruba a Cloudflare

## Perché migrare?

**Aruba non supporta record MX**, ma Resend richiede un record MX per il feedback loop. Cloudflare supporta tutti i tipi di record DNS ed è gratuito.

## Step 1: Crea Account Cloudflare

1. Vai su https://cloudflare.com
2. Clicca su **"Sign Up"** (in alto a destra)
3. Inserisci email e password
4. Verifica l'email

## Step 2: Aggiungi il Dominio

1. Una volta loggato, clicca su **"Add a Site"**
2. Inserisci `rizzienrico.it`
3. Clicca **"Add site"**
4. Cloudflare inizierà a scansionare i record DNS esistenti

## Step 3: Scegli il Piano

1. Cloudflare ti chiederà di scegliere un piano
2. Seleziona **"Free"** (gratuito)
3. Clicca **"Continue"**

## Step 4: Verifica i Record DNS Esistenti

1. Cloudflare mostrerà tutti i record DNS trovati
2. **Verifica che tutti i record importanti siano presenti**:
   - Record A per `www` e `@`
   - Record CNAME se presenti
   - Altri record necessari per il sito
3. Se mancano record, aggiungili manualmente dopo

## Step 5: Ottieni i Nameserver di Cloudflare

1. Cloudflare ti mostrerà i **2 nameserver** da usare
2. Esempio:
   - `ns1.cloudflare.com`
   - `ns2.cloudflare.com`
3. **Copia questi nomi** - ti serviranno per Aruba

## Step 6: Aggiorna i Nameserver su Aruba

1. Vai su https://admin.aruba.it
2. Accedi con le tue credenziali
3. Vai su **"Gestione Domini"**
4. Seleziona il dominio `rizzienrico.it`
5. Cerca **"Nameserver"** o **"DNS"** o **"Modifica Nameserver"**
6. Sostituisci i nameserver di Aruba con quelli di Cloudflare:
   - Nameserver 1: `ns1.cloudflare.com`
   - Nameserver 2: `ns2.cloudflare.com`
7. Salva le modifiche

## Step 7: Attendi la Propagazione DNS

1. La propagazione può richiedere **5-15 minuti**, a volte fino a **24 ore**
2. Puoi verificare lo stato su https://dnschecker.org
3. Inserisci `rizzienrico.it` e verifica che i nameserver siano aggiornati

## Step 8: Aggiungi i Record Resend su Cloudflare

Una volta che i DNS sono propagati:

1. Vai su https://dash.cloudflare.com
2. Seleziona il dominio `rizzienrico.it`
3. Vai su **"DNS"** → **"Records"**
4. Clicca **"Add record"**

### Record 1: DKIM (TXT)
- Tipo: **TXT**
- Nome: `resend._domainkey`
- Conteuto: [quello fornito da Resend]
- TTL: Auto
- Salva

### Record 2: MX per Feedback Loop
- Tipo: **MX**
- Nome: `send`
- Conteuto: `feedback-smtp.eu-west-1.amazonses.com` (o quello fornito da Resend)
- Priorità: `10`
- TTL: Auto
- Salva

### Record 3: SPF (TXT)
- Tipo: **TXT**
- Nome: `send`
- Conteuto: [quello fornito da Resend, tipo `v=spf1 include:amazonses.com ~all`]
- TTL: Auto
- Salva

### Record 4: DMARC (TXT) - Opzionale
- Tipo: **TXT**
- Nome: `_dmarc`
- Conteuto: `v=DMARC1; p=none; rua=mailto:enricorizzi1991@gmail.com`
- TTL: Auto
- Salva

## Step 9: Verifica il Dominio su Resend

1. Vai su https://resend.com/domains
2. Clicca su **"Verify Domain"**
3. Attendi la verifica (5-15 minuti)

## Vantaggi Cloudflare

✅ **Gratuito** - Piano base gratuito per sempre
✅ **Supporta tutti i record DNS** - MX, TXT, A, AAAA, CNAME, SRV, ecc.
✅ **Propagazione veloce** - DNS aggiornati in pochi minuti
✅ **Interfaccia intuitiva** - Facile da usare
✅ **CDN incluso** - Migliora le performance del sito
✅ **Sicurezza** - Protezione DDoS inclusa

## Note Importanti

⚠️ **Durante la migrazione:**
- Il sito continuerà a funzionare normalmente
- Potrebbero esserci brevi interruzioni durante la propagazione (di solito nessuna)
- I record DNS esistenti vengono copiati automaticamente da Cloudflare

⚠️ **Dopo la migrazione:**
- I DNS sono gestiti da Cloudflare, non più da Aruba
- Puoi continuare a usare Aruba per l'hosting del sito
- Cloudflare gestisce solo i DNS, non l'hosting

## Supporto

- **Cloudflare Support**: https://support.cloudflare.com
- **Cloudflare Docs**: https://developers.cloudflare.com/dns



