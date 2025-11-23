import { NextRequest, NextResponse } from 'next/server';

// Mappatura tipo email -> contenuto (oggetto e testo)
const EMAIL_CONTENTS: Record<string, { subject: string; text: string }> = {
  'email_conferma_iscrizione_sent': {
    subject: '🎉 Registrazione Workshop Confermata - Ai in Azienda',
    text: `Ciao [NOME],

Grazie per esserti iscritto al workshop "AI in Azienda: Più Tempo, Più Clienti, Meno Sprechi"!

📅 Data: Venerdì 12 dicembre 2025
🕐 Orario: dalle ore 17.00 (accettazione dalle ore 16.30)
📍 Luogo: OSM Venezia - Via Sertorio Orsato 22, Venezia

Cosa ti porterai a casa:
✅ Un sistema concreto di digitalizzazione che puoi replicare
✅ Demo live di automazioni e AI per PMI
✅ Starter Kit: checklist pratica per digitalizzare la tua PMI
✅ Accesso al test di maturità digitale

💡 Prossimo passo: Compila il Test di Maturità Digitale qui:
https://rizzienrico.it/test-maturita-digitale

Riceverai un promemoria il giorno prima dell'evento.

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia: https://www.osmpartnervenezia.it/

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
  },
  'email_5_giorni_sent': {
    subject: '🎯 Preparati al meglio per il workshop',
    text: `Ciao [NOME],

Siamo felici che tu sia iscritto al workshop "AI in Azienda: Più Tempo, Più Clienti, Meno Sprechi"!

Vogliamo aiutarti a prepararti al meglio per trarre il massimo dall'evento.

Cosa vedrai al workshop:
✅ Un sistema reale in azione: landing page + CRM + automazioni + AI
✅ Demo live di automazioni email e follow-up automatici
✅ Dashboard in tempo reale con lead, fonti e conversioni
✅ AI Copy Sprint: genereremo contenuti insieme in pochi minuti

📅 Dettagli Evento:
Data: Venerdì 12 dicembre 2025
Orario: dalle ore 17.00 (accettazione dalle ore 16.30)
Luogo: OSM Venezia - Via Sertorio Orsato 22, Venezia

Ci vediamo presto! 🚀

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia: https://www.osmpartnervenezia.it/

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
  },
  'email_10_giorni_sent': {
    subject: '💡 Case Study: due PMI che hanno trasformato la loro gestione',
    text: `Ciao [NOME],

Manca poco al workshop e vogliamo condividere con te due casi reali di successo che mostrano come la digitalizzazione può trasformare la gestione di una PMI.

🍽️ Case Study 1: Dal caos di Excel a un gestionale unico
Settore: Ristorazione – ristoratore con più locali
Problema: Decine di file Excel sparsi per gestire flusso finanziario, food cost, margini e previsioni.

✅ Soluzione implementata:
- Gestionale unico accessibile da app mobile e sito web
- Monitoraggio flusso finanziario in tempo reale
- Food cost aggiornabile per singolo piatto
- Calcolo margini per piatto e per punto vendita
- Modulo di previsione con AI per incassi e flusso di cassa

🎯 Risultati:
- Eliminati decine di file Excel sostituiti da un unico gestionale
- Il titolare vede in tempo reale flusso finanziario, budget e margini direttamente da smartphone
- Le scelte su menu e prezzi vengono fatte sui numeri, non più "a naso"

🏗️ Case Study 2: Da faldoni di carta a gestionale condiviso
Settore: Edilizia
Problema: Faldoni di carta per ogni cantiere. Preventivi, ordini, fatture sparsi tra blocchi appunti, fogli A4, email e WhatsApp.

✅ Soluzione implementata:
- Un unico file Excel strutturato come gestionale, caricato in cloud
- Accessibile contemporaneamente da più utenti
- Sezioni dedicate: cantieri, clienti, subappalti, ordini, margini, fatturazione e incassi

🎯 Risultati:
- Eliminata gran parte del cartaceo e dei doppioni di informazioni
- Possibile sapere in ogni momento quanti cantieri sono aperti e quanto si sta guadagnando su ciascuno
- Il titolare ha un quadro chiaro dei margini per cantiere, senza dover aspettare mesi

🎯 Al workshop vedrai:
- Come implementare soluzioni simili nella tua azienda
- Il sistema reale in azione (non teoria!)
- Come automatizzare processi e ridurre il lavoro manuale
- Dashboard e strumenti che puoi usare subito

📅 Dettagli Evento:
Data: Venerdì 12 dicembre 2025
Orario: dalle ore 17.00 (accettazione dalle ore 16.30)
Luogo: OSM Venezia - Via Sertorio Orsato 22, Venezia

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia: https://www.osmpartnervenezia.it/

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
  },
  'email_3_giorni_sent': {
    subject: '📋 Preparati per il workshop',
    text: `Ciao [NOME],

Manca poco al workshop "AI in Azienda: Più Tempo, Più Clienti, Meno Sprechi".

📅 Dettagli Evento:
Data: Venerdì 12 dicembre 2025
Orario: dalle ore 17.00 (accettazione dalle ore 16.30)
Luogo: OSM Venezia - Via Sertorio Orsato 22, Venezia

📋 Preparazione Pratica:
✅ Cosa portare:
- 📱 Smartphone o tablet (opzionale, per vedere la demo)
- 📝 Qualche dato aziendale se vuoi fare domande specifiche
- 💡 La voglia di mettere ordine nella tua digitalizzazione!

💡 Non dimenticare: Se non l'hai ancora fatto, compila il Test di Maturità Digitale prima del workshop.

A presto! 🚀

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia: https://www.osmpartnervenezia.it/

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
  },
  'email_giorno_evento_sent': {
    subject: '🚀 Oggi è il giorno! Ti aspettiamo dalle ore 17.00',
    text: `Ciao [NOME],

Oggi è il giorno del workshop "AI in Azienda: Più Tempo, Più Clienti, Meno Sprechi"!

Ti aspettiamo dalle ore 17.00 (accettazione dalle ore 16.30) presso:
OSM Venezia - Via Sertorio Orsato 22, Venezia

Non vediamo l'ora di vederti! 🚀

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia: https://www.osmpartnervenezia.it/

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
  },
  'email_post_immediata_sent': {
    subject: '🎉 Grazie per essere stato al workshop!',
    text: `Ciao [NOME],

Grazie per essere stato al workshop "AI in Azienda: Più Tempo, Più Clienti, Meno Sprechi"!

Speriamo che tu abbia trovato utili gli spunti e le demo che abbiamo condiviso.

📦 Materiali Promessi:
- Starter Kit: Checklist Digitalizzazione PMI (PDF)
- Test di Maturità Digitale (se non l'hai ancora compilato)

🚀 Prossimo Passo: Vuoi applicare subito quello che hai visto? Prenota un Check-up Digitale Gratuito e scopri come possiamo aiutarti a digitalizzare la tua azienda.

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia: https://www.osmpartnervenezia.it/

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
  },
  'email_post_24h_sent': {
    subject: '📧 Come stai? Hai domande sul workshop?',
    text: `Ciao [NOME],

Come stai dopo il workshop di ieri?

Speriamo che tu abbia trovato utili gli spunti e le demo che abbiamo condiviso.

Se hai domande o vuoi approfondire qualcosa, siamo qui per aiutarti.

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia: https://www.osmpartnervenezia.it/`,
  },
  'email_post_48h_sent': {
    subject: '💡 Ultima opportunità: Check-up Digitale Gratuito',
    text: `Ciao [NOME],

È passato qualche giorno dal workshop e speriamo che tu stia già pensando a come applicare quello che hai visto.

Se vuoi approfondire e capire come possiamo aiutarti a digitalizzare la tua azienda, ti offriamo un Check-up Digitale Gratuito.

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia: https://www.osmpartnervenezia.it/`,
  },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const emailType = searchParams.get('type');

    if (!emailType) {
      return NextResponse.json(
        { error: 'Tipo email richiesto' },
        { status: 400 }
      );
    }

    const content = EMAIL_CONTENTS[emailType];

    if (!content) {
      return NextResponse.json(
        { error: 'Tipo email non trovato' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      type: emailType,
      subject: content.subject,
      text: content.text,
    });
  } catch (error: any) {
    console.error('Errore recupero contenuto email:', error);
    return NextResponse.json(
      { error: 'Errore nel recupero contenuto' },
      { status: 500 }
    );
  }
}

