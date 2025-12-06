import { NextRequest, NextResponse } from 'next/server';

// Mappatura tipo email -> contenuto (oggetto e testo)
const EMAIL_CONTENTS: Record<string, { subject: string; text: string }> = {
  'email_conferma_iscrizione_sent': {
    subject: '🎉 Registrazione Workshop Confermata - AI EXPERIENCE',
    text: `Ciao [NOME],

Grazie per esserti iscritto al workshop "AI EXPERIENCE"!

📅 Data: Venerdì 12 dicembre 2025
🕐 Orario: dalle ore 17.00 (accettazione dalle ore 16.30)
📍 Luogo: Hotel Belstay Mestre, Rotonda Romea, 1 - Venezia

I 2 Temi Principali:
📈 Marketing e Vendite
Con il marketing e le vendite ti aiutiamo ad avere contatti che diventano contratti

⚡ Semplificazione Digitale
Con la semplificazione digitale dei processi e AI ti aiutiamo a guadagnare tempo e ad avere una organizzazione efficiente e le tue persone sono produttive

Cosa riceverai inoltre:
✅ Starter Kit: checklist pratica per digitalizzare la tua PMI
✅ Accesso al test di maturità digitale

💡 Prossimo passo: Compila il Test Digitalizzazione Aziendale qui:
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

Siamo felici che tu sia iscritto al workshop "Più Clienti, Più Organizzazione Grazie all'AI"!

Vogliamo aiutarti a prepararti al meglio per trarre il massimo dall'evento.

Cosa vedrai al workshop:
✅ Un sistema reale in azione: landing page + CRM + automazioni + AI
✅ Demo live di automazioni email e follow-up automatici
✅ Dashboard in tempo reale con lead, fonti e conversioni
✅ AI Copy Sprint: genereremo contenuti insieme in pochi minuti

💡 Prossimo passo importante:
Per trarre il massimo dal workshop, ti consigliamo di compilare il Test Digitalizzazione Aziendale:
https://rizzienrico.it/test-maturita-digitale

Ti aiuterà a capire da dove partire e a personalizzare l'esperienza del workshop.

🎯 Anticipazione: Al workshop faremo una demo live di come l'AI può generare contenuti in pochi minuti.

📅 Dettagli Evento:
Data: Venerdì 12 dicembre 2025
Orario: dalle ore 17.00 (accettazione dalle ore 16.30)
Luogo: Hotel Belstay Mestre, Rotonda Romea, 1 - Venezia

Ci vediamo presto! 🚀

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia: https://www.osmpartnervenezia.it/

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
  },
  'email_10_giorni_sent': {
    subject: '💡 Case Study: due PMI che hanno trasformato la loro gestione',
    text: `Ciao [NOME],

Vogliamo condividere con te due casi reali di successo che mostrano come la digitalizzazione può trasformare la gestione di una PMI.

🍽️ CASE STUDY 1: Dal caos di Excel a un gestionale unico
Settore: Ristorazione – ristoratore con più locali
Problema: Decine di file Excel sparsi per gestire flusso finanziario, food cost, margini e previsioni. Accesso ai numeri solo da PC in ufficio.

✅ Soluzione:
- Gestionale unico accessibile da app mobile e sito web
- Monitoraggio flusso finanziario in tempo reale
- Food cost aggiornabile per singolo piatto
- Calcolo margini per piatto e per punto vendita
- Modulo di previsione con AI per incassi e flusso di cassa

🎯 Risultati:
- Eliminati decine di file Excel sostituiti da un unico gestionale
- Il titolare vede in tempo reale flusso finanziario, budget e margini direttamente da smartphone
- Le scelte su menu e prezzi vengono fatte sui numeri, non più "a naso"
- L'amministrazione ha ridotto drasticamente il tempo speso in attività manuali

🏗️ CASE STUDY 2: Da faldoni di carta a gestionale condiviso
Settore: Edilizia
Problema: Faldoni di carta per ogni cantiere. Preventivi, ordini, fatture sparsi tra blocchi appunti, fogli A4, email e WhatsApp. Nessun controllo su margini cantieri fino alla chiusura lavori.

✅ Soluzione:
- Un unico file Excel strutturato come gestionale, caricato in cloud
- Accessibile contemporaneamente da più utenti (ufficio, titolare, capocantiere)
- Sezioni dedicate: cantieri, clienti, subappalti, ordini, margini, fatturazione e incassi
- Accesso anche da tablet/smartphone durante visite in cantiere

🎯 Risultati:
- Eliminata gran parte del cartaceo e dei doppioni di informazioni
- Possibile sapere in ogni momento quanti cantieri sono aperti e quanto si sta guadagnando su ciascuno
- Il titolare ha un quadro chiaro dei margini per cantiere, senza dover aspettare mesi
- Le informazioni non sono più "nella testa di uno", ma condivise in un unico strumento

🎯 Al workshop vedrai:
- Come implementare soluzioni simili nella tua azienda
- Il sistema reale in azione (non teoria!)
- Come automatizzare processi e ridurre il lavoro manuale
- Dashboard e strumenti che puoi usare subito

💡 Non dimenticare: Se non l'hai ancora fatto, compila il Test Digitalizzazione Aziendale:
https://rizzienrico.it/test-maturita-digitale

📅 Dettagli Evento:
Data: Venerdì 12 dicembre 2025
Orario: dalle ore 17.00 (accettazione dalle ore 16.30)
Luogo: Hotel Belstay Mestre, Rotonda Romea, 1 - Venezia

Non vediamo l'ora di vederti! 🚀

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia: https://www.osmpartnervenezia.it/

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
  },
  'email_3_giorni_sent': {
    subject: '📋 Preparati per il workshop',
    text: `Ciao [NOME],

Il workshop "Più Clienti, Più Organizzazione Grazie all'AI" si avvicina!

📅 Venerdì 12 dicembre 2025 - 🕐 dalle ore 17.00 (accettazione dalle ore 16.30)

📋 Preparazione Pratica:
✅ Cosa portare:
- Smartphone o tablet (opzionale, per vedere la demo)
- Qualche dato aziendale se vuoi fare domande specifiche
- La voglia di mettere ordine nella tua digitalizzazione!

💼 Se vuoi, porta dati su:
- Numero di lead attuali che gestisci
- Processi manuali che vorresti automatizzare
- Obiettivi di digitalizzazione per il 2025

🎯 Cosa vedrai al workshop:
✅ Sistema CRM live con lead in tempo reale
✅ Automazioni email e follow-up automatici
✅ Dashboard con numeri, fonti e conversioni
✅ Demo AI: genereremo contenuti insieme in pochi minuti

💡 Non dimenticare: Se non l'hai ancora fatto, compila il Test Digitalizzazione Aziendale:
https://rizzienrico.it/test-maturita-digitale

📍 Informazioni Logistiche:
Luogo: Hotel Belstay Mestre, Rotonda Romea, 1 - Venezia
Indirizzo: Rotonda Romea, 1 - Venezia
Parcheggio: Disponibile
Mezzi pubblici: [Da aggiornare]
📞 Contatto emergenze: Rispondi a questa email o chiama [telefono]

Apri in Google Maps: https://maps.google.com/?q=OSM+Venezia+-+Via+Sertorio+Orsato+22%2C+Venezia

A presto! 🚀

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia: https://www.osmpartnervenezia.it/

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
  },
  'email_giorno_evento_sent': {
    subject: '🚀 Oggi è il giorno! Ti aspettiamo dalle ore 17.00',
    text: `Ciao [NOME],

🚀 OGGI È IL GIORNO!

Ti aspettiamo al workshop "Più Clienti, Più Organizzazione Grazie all'AI" dalle ore 17.00 (accettazione dalle ore 16.30).

📅 Venerdì 12 dicembre 2025 - 🕐 dalle ore 17.00 (accettazione dalle ore 16.30)
📍 Hotel Belstay Mestre, Rotonda Romea, 1 - Venezia

💡 Siamo entusiasti di condividere con te:
- Un sistema che funziona davvero (non solo teoria!)
- Automazioni in azione, live e pratiche
- Demo di AI per generare contenuti in pochi minuti
- Dashboard real-time con lead che arrivano

📍 Info Pratiche:
Luogo: Hotel Belstay Mestre, Rotonda Romea, 1 - Venezia
Indirizzo: Rotonda Romea, 1 - Venezia
🕐 Inizio: dalle ore 17.00 (accettazione dalle ore 16.30)
☕ Caffè e networking incluso
📞 Contatto emergenze: Rispondi a questa email o chiama [telefono]

💡 Ultimo reminder: Se non l'hai ancora fatto, compila il Test Digitalizzazione Aziendale:
https://rizzienrico.it/test-maturita-digitale

Apri in Google Maps: https://maps.google.com/?q=OSM+Venezia+-+Via+Sertorio+Orsato+22%2C+Venezia

Ci vediamo stasera! 🎉

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia: https://www.osmpartnervenezia.it/

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
  },
  'email_post_immediata_sent': {
    subject: '🎉 Grazie per essere stato al workshop!',
    text: `Ciao [NOME],

Grazie per essere stato al workshop "Più Clienti, Più Organizzazione Grazie all'AI"!

Speriamo che tu abbia trovato utili gli spunti e le demo che abbiamo condiviso.

📦 Materiali Promessi:
- Starter Kit: Checklist Digitalizzazione PMI: https://rizzienrico.it/download/starter-kit-digitalizzazione
- Test Digitalizzazione Aziendale: https://rizzienrico.it/test-maturita-digitale

🚀 Prossimo Passo: Vuoi applicare subito quello che hai visto? Prenota un Check-up Digitale Gratuito:
https://calendly.com/enricorizzi/check-up-gratuito-in-azienda

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia: https://www.osmpartnervenezia.it/

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
  },
  'email_post_24h_sent': {
    subject: '💡 Hai già scaricato lo Starter Kit?',
    text: `Ciao [NOME],

Come va con l'applicazione di quello che hai visto al workshop?

Se non l'hai ancora fatto, ti ricordiamo di scaricare lo Starter Kit e compilare il Test Digitalizzazione Aziendale.

💡 Ricorda: Le condizioni speciali workshop scadono tra 7 giorni. Se vuoi approfittarne, prenota il tuo Check-up Digitale Gratuito:
https://calendly.com/enricorizzi/check-up-gratuito-in-azienda

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia: https://www.osmpartnervenezia.it/

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
  },
  'email_post_48h_sent': {
    subject: '⏰ Ultimi giorni per le condizioni speciali workshop',
    text: `Ciao [NOME],

Ti scriviamo per ricordarti che le condizioni speciali workshop scadono tra pochi giorni.

🎯 Cosa Include:
- Check-up Digitale Gratuito approfondito
- Sconto sul percorso 3 giornate
- Implementazione di 1 automazione compresa

Se vuoi approfittarne, prenota subito il tuo Check-up Digitale Gratuito:
https://calendly.com/enricorizzi/check-up-gratuito-in-azienda

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia: https://www.osmpartnervenezia.it/

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
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

