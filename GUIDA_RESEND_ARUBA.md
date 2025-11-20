# Guida: Verifica Dominio Resend su Aruba

## ⚠️ PROBLEMA: Aruba non supporta record MX!

Aruba **non permette di aggiungere record MX** nel pannello DNS. Questo è un problema perché Resend richiede un record MX per il feedback loop.

**Soluzione consigliata:** Usa **Cloudflare** per gestire i DNS (gratuito e supporta tutti i tipi di record).

I record che Resend richiede sono:
1. **Record DKIM** (TXT) - per `resend._domainkey`
2. **Record MX** (per il sottodominio `send`) - per feedback loop ⚠️ NON disponibile su Aruba
3. **Record SPF** (TXT) - per `send`
4. **Record DMARC** (TXT) - opzionale ma consigliato

## Step 1: Accedi al Pannello DNS di Aruba

1. Vai su https://admin.aruba.it
2. Accedi con le tue credenziali Aruba
3. Vai su **"Gestione Domini"** o **"DNS"**
4. Seleziona il dominio `rizzienrico.it`

## Step 2: Aggiungi i Record DNS da Resend

### Come trovare i record su Resend:

1. Vai su https://resend.com/domains
2. Clicca su **"Add Domain"**
3. Inserisci il dominio (es. `mail.rizzienrico.it` o `rizzienrico.it`)
4. Resend ti mostrerà i record da aggiungere

### Record da aggiungere su Aruba:

#### 1. Record DKIM (TXT) - Domain Verification
```
Tipo: TXT
Nome: resend._domainkey
Valore: [Resend ti fornirà questo valore univoco - copialo esattamente]
TTL: Auto (o 3600)
```

#### 2. Record MX per Feedback Loop
```
Tipo: MX
Nome: send
Valore: feedback-smtp.eu-west-1.amazonses.com (o quello fornito da Resend)
Priorità: 10
TTL: Auto (o 3600)
```

#### 3. Record SPF (TXT) per Sending
```
Tipo: TXT
Nome: send
Valore: v=spf1 include:amazonses.com ~all (o quello fornito da Resend)
TTL: Auto (o 3600)
```

#### 4. Record DMARC (TXT) - Opzionale
```
Tipo: TXT
Nome: _dmarc
Valore: v=DMARC1; p=none; rua=mailto:enricorizzi1991@gmail.com
TTL: Auto (o 3600)
```

## Step 3: Come Aggiungere i Record su Aruba

### Metodo A: Pannello DNS Aruba (se disponibile)

1. Nel pannello Aruba, cerca la sezione **"DNS"** o **"Zone DNS"**
2. Aggiungi i record nell'ordine seguente:

**Record 1: DKIM (TXT)**
- Clicca su **"Aggiungi Record"** o **"Nuovo Record"**
- Tipo: **TXT**
- Nome/Host: `resend._domainkey`
- Valore: [quello fornito da Resend]
- TTL: Auto o 3600
- Salva

**Record 2: MX per Feedback Loop**
- Clicca su **"Aggiungi Record"** o **"Nuovo Record"**
- Tipo: **MX**
- Nome/Host: `send`
- Valore: `feedback-smtp.eu-west-1.amazonses.com` (o quello fornito da Resend)
- Priorità: `10`
- TTL: Auto o 3600
- Salva

**Record 3: SPF (TXT)**
- Clicca su **"Aggiungi Record"** o **"Nuovo Record"**
- Tipo: **TXT**
- Nome/Host: `send`
- Valore: [quello fornito da Resend, tipo `v=spf1 include:amazonses.com ~all`]
- TTL: Auto o 3600
- Salva

**Record 4: DMARC (TXT) - Opzionale**
- Clicca su **"Aggiungi Record"** o **"Nuovo Record"**
- Tipo: **TXT**
- Nome/Host: `_dmarc`
- Valore: `v=DMARC1; p=none; rua=mailto:enricorizzi1991@gmail.com`
- TTL: Auto o 3600
- Salva

### Metodo B: Se non vedi l'opzione DNS nel pannello Aruba

Aruba potrebbe gestire i DNS in modo diverso:

1. **Controlla se hai accesso a "DNS Management"** o "Gestione DNS"
2. Se non lo vedi, potrebbe essere necessario:
   - Attivare il servizio DNS Management (potrebbe essere a pagamento)
   - Oppure usare un sottodominio dedicato (es. `mail.rizzienrico.it`)

### Metodo C: Usa un Sottodominio (Consigliato)

Se hai problemi con il dominio principale, usa un sottodominio:

1. Su Resend, aggiungi `mail.rizzienrico.it` invece di `rizzienrico.it`
2. Su Aruba, aggiungi i record con:
   - **Nome**: `mail` (non `@`)
   - **Valore**: quello fornito da Resend

## Step 4: Verifica i Record

Dopo aver aggiunto i record, verifica che siano corretti:

1. Vai su https://mxtoolbox.com/
2. Inserisci il dominio
3. Seleziona **"TXT Lookup"**
4. Verifica che i record siano visibili

**Nota**: La propagazione DNS può richiedere 5-15 minuti, a volte fino a 24 ore.

## Step 5: Verifica il Dominio su Resend

1. Torna su https://resend.com/domains
2. Clicca su **"Verify Domain"**
3. Attendi la verifica (di solito 5-15 minuti)

## Troubleshooting Aruba

### Non vedo l'opzione DNS

**Possibili cause:**
- Il servizio DNS Management non è attivo
- Devi attivarlo dal pannello Aruba (potrebbe essere a pagamento)
- Contatta il supporto Aruba per attivare la gestione DNS

**Soluzione alternativa:**
- Usa un sottodominio (`mail.rizzienrico.it`)
- Oppure cambia i nameserver di Aruba e gestisci i DNS altrove (es. Cloudflare)

### I record non si propagano

1. **Attendi fino a 24 ore**: La propagazione può richiedere tempo
2. **Verifica su mxtoolbox.com**: Controlla che i record siano visibili
3. **Controlla errori su Resend**: Vai su https://resend.com/domains e clicca sul dominio per vedere eventuali errori

### Aruba non permette record TXT o MX

Se Aruba non permette di aggiungere record TXT o MX:

1. **Contatta il supporto Aruba**: Chiedi come aggiungere record TXT per il dominio
2. **Usa Cloudflare**: 
   - Cambia i nameserver di Aruba con quelli di Cloudflare
   - Gestisci i DNS su Cloudflare (gratuito e più flessibile)

## ✅ SOLUZIONE: Usa Cloudflare (NECESSARIO per record MX)

**Aruba non supporta record MX**, quindi **DEVI usare Cloudflare** per gestire i DNS se vuoi verificare il dominio su Resend.

### Come migrare i DNS su Cloudflare:

1. **Crea un account gratuito** su https://cloudflare.com
2. **Aggiungi il dominio** `rizzienrico.it`
3. **Cloudflare ti darà 2 nameserver** (es. `ns1.cloudflare.com`, `ns2.cloudflare.com`)
4. **Vai su Aruba** → Gestione Domini → Modifica Nameserver
5. **Sostituisci i nameserver di Aruba** con quelli di Cloudflare
6. **Attendi la propagazione** (5-15 minuti, a volte fino a 24h)
7. **Su Cloudflare**, aggiungi tutti i record forniti da Resend:
   - DKIM (TXT)
   - MX per `send`
   - SPF (TXT) per `send`
   - DMARC (TXT) opzionale

**Vantaggi Cloudflare:**
- ✅ Gratuito
- ✅ Gestione DNS completa e intuitiva
- ✅ Propagazione veloce
- ✅ Nessun problema con record TXT

## Supporto

- **Resend Support**: support@resend.com
- **Aruba Support**: https://www.aruba.it/supporto
- **Cloudflare**: https://cloudflare.com (alternativa gratuita)

## Note Finali

⚠️ **IMPORTANTE**: 
- **Aruba NON supporta record MX** - devi usare Cloudflare
- Resend richiede: DKIM (TXT), **MX per `send`**, SPF (TXT) per `send`, DMARC (TXT) opzionale
- Il record MX è per il feedback loop (bounce/feedback emails)
- **Cloudflare è gratuito** e supporta tutti i tipi di record DNS
- La migrazione a Cloudflare è semplice e non richiede cambiamenti al sito

