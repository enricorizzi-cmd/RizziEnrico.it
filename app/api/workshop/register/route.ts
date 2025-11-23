import { NextRequest, NextResponse } from 'next/server';
import { workshopRegistrationSchema } from '@/lib/validators';
import { createServerClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';
import { generateICS, generateGoogleCalendarUrl, generateMapsUrl } from '@/lib/calendar';

const NOTIFICATION_EMAIL = 'enricorizzi1991@gmail.com';
const WORKSHOP_DATE = 'Venerdì 12 dicembre 2025';
const WORKSHOP_TIME = 'dalle ore 17.00 (accettazione dalle ore 16.30)';
const WORKSHOP_LOCATION = 'OSM Venezia - Via Sertorio Orsato 22, Venezia';
const CALENDLY_CHECKUP_URL = process.env.NEXT_PUBLIC_CALENDLY_CHECKUP_URL || 'https://calendly.com/enricorizzi/check-up-gratuito-in-azienda';

export async function POST(request: NextRequest) {
  try {
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 50 * 1024) {
      return NextResponse.json(
        { error: 'Richiesta troppo grande' },
        { status: 413 }
      );
    }

    const body = await request.json();
    const validatedData = workshopRegistrationSchema.parse(body);

    const supabase = createServerClient();

    // Salva registrazione
    const { data: lead, error } = await supabase
      .from('workshop_leads')
      .insert({
        nome: validatedData.nome,
        cognome: validatedData.cognome,
        email: validatedData.email,
        telefono: validatedData.telefono,
        azienda: validatedData.azienda,
        ruolo: validatedData.ruolo,
        provincia: validatedData.provincia,
        fonte: validatedData.fonte,
        problema: validatedData.problema,
        evento: validatedData.evento,
        stato: 'nuovo',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Errore nel salvataggio' },
        { status: 500 }
      );
    }

    // Verifica configurazione SMTP prima di preparare l'email
    const SMTP_CONFIGURED = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
    console.log('[WORKSHOP] 🔍 Verifica configurazione SMTP:', {
      SMTP_HOST: process.env.SMTP_HOST ? '✅ configurato' : '❌ mancante',
      SMTP_USER: process.env.SMTP_USER ? '✅ configurato' : '❌ mancante',
      SMTP_PASS: process.env.SMTP_PASS ? '✅ configurato' : '❌ mancante',
      SMTP_PORT: process.env.SMTP_PORT || '587 (default)',
      FROM_EMAIL: process.env.FROM_EMAIL || 'info@rizzienrico.it (default)',
      configured: SMTP_CONFIGURED,
    });

    if (!SMTP_CONFIGURED) {
      console.error('[WORKSHOP] ⚠️ ATTENZIONE: Configurazione SMTP incompleta! L\'email non verrà inviata.');
    }

    // Email di conferma al partecipante (PRIMA, così se fallisce il fallback arriva comunque)
    const confirmEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="text-decoration: none; color: white;">
      <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Registrazione Confermata!</h1>
    </a>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px; color: #1a1a1a;">Ciao <strong style="color: #000000;">${validatedData.nome}</strong>,</p>
    
    <p style="color: #1a1a1a;">Grazie per esserti iscritto al workshop:</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h2 style="margin-top: 0; color: #667eea;  font-size: 32px;">"Più Tempo, Più organizzazione, meno stress: AI in Azienda"</h2>
      <p style="margin: 10px 0;">
        <strong>📅 Data:</strong> 
        <a href="${generateGoogleCalendarUrl({
      title: 'Più Tempo, Più organizzazione, meno stress: AI in Azienda',
      description: 'Workshop esclusivo OSM',
      startDate: new Date('2025-12-12T17:00:00'),
      endDate: new Date('2025-12-12T19:00:00'),
      location: WORKSHOP_LOCATION,
    })}" style="color: #667eea; text-decoration: underline;">${WORKSHOP_DATE}</a>
        <span style="margin-left: 10px; font-size: 12px;">
          (<a href="data:text/calendar;charset=utf-8,${encodeURIComponent(generateICS({
      title: 'Ai in Azienda',
      description: 'Workshop esclusivo OSM',
      startDate: new Date('2025-12-12T17:00:00'),
      endDate: new Date('2025-12-12T19:00:00'),
      location: WORKSHOP_LOCATION,
    }))}" download="workshop-12-dicembre.ics" style="color: #667eea; text-decoration: underline;">Aggiungi al calendario</a>)
        </span>
      </p>
      <p style="margin: 10px 0;">
        <strong>🕐 Orario:</strong> 
        <a href="${generateGoogleCalendarUrl({
      title: 'Ai in Azienda',
      description: 'Workshop esclusivo OSM',
      startDate: new Date('2025-12-12T17:00:00'),
      endDate: new Date('2025-12-12T19:00:00'),
      location: WORKSHOP_LOCATION,
    })}" style="color: #667eea; text-decoration: underline;">${WORKSHOP_TIME}</a>
      </p>
      <p style="margin: 10px 0;">
        <strong>📍 Luogo:</strong> 
        <a href="${generateMapsUrl(WORKSHOP_LOCATION)}" style="color: #667eea; text-decoration: underline;">${WORKSHOP_LOCATION}</a>
      </p>
    </div>
    
    <h3 style="color: #667eea; margin-top: 30px;">Cosa ti porterai a casa:</h3>
    <ul style="line-height: 2; color: #1a1a1a;">
      <li>✅ Un sistema concreto di digitalizzazione che puoi replicare</li>
      <li>✅ Demo live di automazioni e AI per PMI</li>
      <li>✅ Starter Kit: checklist pratica per digitalizzare la tua PMI</li>
      <li>✅ Accesso al test di maturità digitale</li>
    </ul>
    
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0; color: #1a1a1a;"><strong style="color: #000000;">💡 Prossimo passo:</strong> Compila il <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'}/test-maturita-digitale" style="color: #4a5568; font-weight: bold; text-decoration: underline;">Test di Maturità Digitale</a> per capire da dove partire.</p>
    </div>
    
    <p style="margin-top: 30px; color: #1a1a1a;">Riceverai un promemoria il giorno prima dell'evento con tutti i dettagli.</p>
    
    <p style="margin-top: 30px; color: #1a1a1a;">A presto,<br>
    <strong style="color: #000000;">Enrico Rizzi & Francesco Fusano</strong><br>
    <a href="https://www.osmpartnervenezia.it/" style="color: #4a5568; text-decoration: underline;">OSM Partner Venezia</a></p>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
      <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">📅 Vai alla pagina del Workshop</a>
    </div>
  </div>
</body>
</html>`;

    const confirmEmailText = `Ciao ${validatedData.nome},

Grazie per esserti iscritto al workshop "Ai in Azienda"!

📅 Data: ${WORKSHOP_DATE}
🕐 Orario: ${WORKSHOP_TIME}
📍 Luogo: ${WORKSHOP_LOCATION}

Cosa ti porterai a casa:
✅ Un sistema concreto di digitalizzazione che puoi replicare
✅ Demo live di automazioni e AI per PMI
✅ Starter Kit: checklist pratica per digitalizzare la tua PMI
✅ Accesso al test di maturità digitale

💡 Prossimo passo: Compila il Test di Maturità Digitale qui:
${process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'}/test-maturita-digitale

Riceverai un promemoria il giorno prima dell'evento.

A presto,
Enrico Rizzi & Francesco Fusano
<a href="https://www.osmpartnervenezia.it/">OSM Partner Venezia</a>

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`;

    // Invia email in modo asincrono (non bloccare la risposta)
    // Le email vengono inviate in background, se falliscono non blocca la risposta
    console.log('[WORKSHOP] 📧 Preparazione invio email conferma:', {
      to: validatedData.email,
      leadId: lead.id,
      timestamp: new Date().toISOString(),
    });

    Promise.all([
      sendEmail({
        to: validatedData.email,
        subject: '🎉 Registrazione Workshop Confermata - Ai in Azienda',
        html: confirmEmailHtml,
        text: confirmEmailText,
        emailId: 'email_conferma_iscrizione',
        leadId: lead.id,
        unsubscribeUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'}/unsubscribe?email=${encodeURIComponent(validatedData.email)}&lead=${encodeURIComponent(lead.id)}`,
      }).then(async (success) => {
        if (success) {
          console.log('[WORKSHOP] ✅ Email conferma inviata con successo:', {
            to: validatedData.email,
            leadId: lead.id,
            timestamp: new Date().toISOString(),
          });

          // Aggiorna metadata per tracciare email conferma inviata
          const { data: currentLead } = await supabase
            .from('workshop_leads')
            .select('metadata')
            .eq('id', lead.id)
            .single();

          if (currentLead) {
            const metadata = (currentLead.metadata as any) || {};
            metadata.email_conferma_iscrizione_sent = new Date().toISOString();
            await supabase
              .from('workshop_leads')
              .update({ metadata })
              .eq('id', lead.id);
          }
        } else {
          console.error('[WORKSHOP] ❌ Email conferma NON inviata (sendEmail ha ritornato false):', {
            to: validatedData.email,
            leadId: lead.id,
            timestamp: new Date().toISOString(),
          });
        }
      }).catch((err) => {
        console.error('[WORKSHOP] ❌ Errore invio email conferma (non bloccante):', {
          error: err,
          message: err?.message,
          stack: err?.stack,
          to: validatedData.email,
          leadId: lead.id,
          timestamp: new Date().toISOString(),
        });
        return false;
      }),
      new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
        const emailSubject = `🎯 Nuova registrazione Workshop - ${validatedData.nome} ${validatedData.cognome}`;
        const emailText = `Nuova registrazione al Workshop "Ai in Azienda":

📋 Dati registrazione:
Nome: ${validatedData.nome} ${validatedData.cognome}
Email: ${validatedData.email}
Telefono: ${validatedData.telefono}
Azienda: ${validatedData.azienda}
Ruolo: ${validatedData.ruolo}
Provincia: ${validatedData.provincia}
Fonte: ${validatedData.fonte}
${validatedData.problema ? `Problema principale: ${validatedData.problema}` : ''}

ID Lead: ${lead.id}
Data registrazione: ${new Date().toLocaleString('it-IT')}

📊 Dashboard: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'}/admin/workshop`;

        return sendEmail({
          to: NOTIFICATION_EMAIL,
          subject: emailSubject,
          text: emailText,
        }).catch((err) => {
          console.error('[WORKSHOP] Errore invio email NOTIFICATION_EMAIL (non bloccante):', err);
          return false;
        });
      })
    ]).catch((err) => {
      console.error('[WORKSHOP] Errore generale invio email (non bloccante):', err);
    });

    // REGOLA SPECIALE: Se l'email è enricorizzi1991@gmail.com, invia tutte le email automaticamente per test
    if (validatedData.email.toLowerCase() === 'enricorizzi1991@gmail.com') {
      console.log('[WORKSHOP] 🧪 Email di test rilevata - Invio automatico di tutte le email');

      // Invia tutte le email in sequenza con delay
      Promise.all([
        // Email T+5 (simulata)
        new Promise(resolve => setTimeout(resolve, 2000)).then(async () => {
          try {
            const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="text-decoration: none; color: white;">
      <h1 style="color: white; margin: 0; font-size: 28px;">🎯 Preparati al Meglio</h1>
    </a>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${validatedData.nome}</strong>,</p>
    
    <p>Siamo felici che tu sia iscritto al workshop <strong>"Ai in Azienda"</strong>!</p>
    
    <p>Vogliamo aiutarti a prepararti al meglio per trarre il massimo dall'evento.</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h3 style="margin-top: 0; color: #667eea;">Cosa vedrai al workshop:</h3>
      <ul style="line-height: 2;">
        <li>✅ Un sistema reale in azione: landing page + CRM + automazioni + AI</li>
        <li>✅ Demo live di automazioni email e follow-up automatici</li>
        <li>✅ Dashboard in tempo reale con lead, fonti e conversioni</li>
        <li>✅ AI Copy Sprint: genereremo contenuti insieme in pochi minuti</li>
      </ul>
    </div>
    
    <p style="margin-top: 30px;">Ci vediamo presto! 🚀</p>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <a href="https://www.osmpartnervenezia.it/" style="color: #667eea; text-decoration: none;">OSM Partner Venezia</a></p>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
      <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">📅 Vai alla pagina del Workshop</a>
    </div>
  </div>
</body>
</html>`;

            await sendEmail({
              to: validatedData.email,
              subject: '🎯 [AUTO-TEST] Preparati al meglio per il workshop',
              html: emailHtml,
              text: `Test automatico email T+5`,
              emailId: 'auto_test_5_giorni',
              leadId: lead.id,
              unsubscribeUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'}/unsubscribe?email=${encodeURIComponent(validatedData.email)}&lead=${encodeURIComponent(lead.id)}`,
            });

            // Aggiorna metadata per tracciare email inviata
            const { data: currentLead } = await supabase
              .from('workshop_leads')
              .select('metadata')
              .eq('id', lead.id)
              .single();

            if (currentLead) {
              const metadata = (currentLead.metadata as any) || {};
              metadata.email_5_giorni_sent = new Date().toISOString();
              await supabase
                .from('workshop_leads')
                .update({ metadata })
                .eq('id', lead.id);
            }
          } catch (err) {
            console.error('[WORKSHOP] Errore invio email T+5 automatica:', err);
          }
        }),
        // Email T+10 (simulata) - con case study completi
        new Promise(resolve => setTimeout(resolve, 4000)).then(async () => {
          try {
            const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="text-decoration: none; color: white;">
      <h1 style="color: white; margin: 0; font-size: 28px;">💡 Case Study Reale</h1>
    </a>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${validatedData.nome}</strong>,</p>
    
    <p>Manca poco al workshop e vogliamo condividere con te due casi reali di successo che mostrano come la digitalizzazione può trasformare la gestione di una PMI.</p>
    
    <!-- Case History 1: Ristorante -->
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h3 style="margin-top: 0; color: #667eea;">🍽️ Case Study 1: Dal caos di Excel a un gestionale unico</h3>
      <p style="margin: 5px 0;"><strong>Settore:</strong> Ristorazione – ristoratore con più locali</p>
      <p style="margin: 5px 0;"><strong>Problema:</strong> Decine di file Excel sparsi per gestire flusso finanziario, food cost, margini e previsioni. Accesso ai numeri solo da PC in ufficio.</p>
      
      <div style="background: #e7f3ff; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <h4 style="margin-top: 0; color: #2196F3;">✅ Soluzione implementata:</h4>
        <ul style="line-height: 1.8; margin: 10px 0 0 0; padding-left: 20px;">
          <li>Gestionale unico accessibile da app mobile e sito web</li>
          <li>Monitoraggio flusso finanziario in tempo reale</li>
          <li>Food cost aggiornabile per singolo piatto</li>
          <li>Calcolo margini per piatto e per punto vendita</li>
          <li>Modulo di previsione con AI per incassi e flusso di cassa</li>
        </ul>
      </div>
      
      <div style="background: #d4edda; padding: 15px; margin: 15px 0; border-radius: 4px; border-left: 4px solid #28a745;">
        <h4 style="margin-top: 0; color: #155724;">🎯 Risultati:</h4>
        <ul style="line-height: 1.8; margin: 10px 0 0 0; padding-left: 20px;">
          <li><strong>Eliminati decine di file Excel</strong> sostituiti da un unico gestionale</li>
          <li>Il titolare vede <strong>in tempo reale</strong> flusso finanziario, budget e margini direttamente da smartphone</li>
          <li>Le scelte su menu e prezzi vengono fatte <strong>sui numeri, non più "a naso"</strong></li>
          <li>L'amministrazione ha <strong>ridotto drasticamente</strong> il tempo speso in attività manuali</li>
        </ul>
      </div>
    </div>
    
    <!-- Case History 2: Edilizia -->
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
      <h3 style="margin-top: 0; color: #28a745;">🏗️ Case Study 2: Da faldoni di carta a gestionale condiviso</h3>
      <p style="margin: 5px 0;"><strong>Settore:</strong> Edilizia</p>
      <p style="margin: 5px 0;"><strong>Problema:</strong> Faldoni di carta per ogni cantiere. Preventivi, ordini, fatture sparsi tra blocchi appunti, fogli A4, email e WhatsApp. Nessun controllo su margini cantieri fino alla chiusura lavori.</p>
      
      <div style="background: #e7f3ff; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <h4 style="margin-top: 0; color: #2196F3;">✅ Soluzione implementata:</h4>
        <ul style="line-height: 1.8; margin: 10px 0 0 0; padding-left: 20px;">
          <li>Un unico file Excel strutturato come gestionale, caricato in cloud</li>
          <li>Accessibile contemporaneamente da più utenti (ufficio, titolare, capocantiere)</li>
          <li>Sezioni dedicate: cantieri, clienti, subappalti, ordini, margini, fatturazione e incassi</li>
          <li>Accesso anche da tablet/smartphone durante visite in cantiere</li>
        </ul>
      </div>
      
      <div style="background: #d4edda; padding: 15px; margin: 15px 0; border-radius: 4px; border-left: 4px solid #28a745;">
        <h4 style="margin-top: 0; color: #155724;">🎯 Risultati:</h4>
        <ul style="line-height: 1.8; margin: 10px 0 0 0; padding-left: 20px;">
          <li><strong>Eliminata gran parte del cartaceo</strong> e dei doppioni di informazioni</li>
          <li>Possibile sapere in ogni momento <strong>quanti cantieri sono aperti</strong> e <strong>quanto si sta guadagnando</strong> su ciascuno</li>
          <li>Il titolare ha un <strong>quadro chiaro dei margini per cantiere</strong>, senza dover aspettare mesi</li>
          <li>Le informazioni non sono più "nella testa di uno", ma <strong>condivise</strong> in un unico strumento</li>
        </ul>
      </div>
    </div>
    
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>🎯 Al workshop vedrai:</strong></p>
      <ul style="line-height: 2; margin: 10px 0 0 0; padding-left: 20px;">
        <li>Come implementare soluzioni simili nella tua azienda</li>
        <li>Il sistema reale in azione (non teoria!)</li>
        <li>Come automatizzare processi e ridurre il lavoro manuale</li>
        <li>Dashboard e strumenti che puoi usare subito</li>
      </ul>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h3 style="margin-top: 0; color: #667eea;">📅 Dettagli Evento:</h3>
      <p style="margin: 5px 0;"><strong>Data:</strong> ${WORKSHOP_DATE}</p>
      <p style="margin: 5px 0;"><strong>Orario:</strong> ${WORKSHOP_TIME}</p>
      <p style="margin: 5px 0;"><strong>Luogo:</strong> ${WORKSHOP_LOCATION}</p>
    </div>
    
    <p style="margin-top: 30px;">Non vediamo l'ora di vederti! 🚀</p>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <a href="https://www.osmpartnervenezia.it/" style="color: #667eea; text-decoration: none;">OSM Partner Venezia</a></p>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
      <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">📅 Vai alla pagina del Workshop</a>
    </div>
  </div>
</body>
</html>`;

            await sendEmail({
              to: validatedData.email,
              subject: '💡 [AUTO-TEST] Case Study Reale: due PMI trasformate dalla digitalizzazione',
              html: emailHtml,
              text: `Test automatico email T+10`,
              emailId: 'auto_test_10_giorni',
              leadId: lead.id,
              unsubscribeUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'}/unsubscribe?email=${encodeURIComponent(validatedData.email)}&lead=${encodeURIComponent(lead.id)}`,
            });

            // Aggiorna metadata per tracciare email inviata
            const { data: currentLead } = await supabase
              .from('workshop_leads')
              .select('metadata')
              .eq('id', lead.id)
              .single();

            if (currentLead) {
              const metadata = (currentLead.metadata as any) || {};
              metadata.email_10_giorni_sent = new Date().toISOString();
              await supabase
                .from('workshop_leads')
                .update({ metadata })
                .eq('id', lead.id);
            }
          } catch (err) {
            console.error('[WORKSHOP] Errore invio email T+10 automatica:', err);
          }
        }),
        // Email T-3 (simulata)
        new Promise(resolve => setTimeout(resolve, 6000)).then(async () => {
          try {
            const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="text-decoration: none; color: white;">
      <h1 style="color: white; margin: 0; font-size: 28px;">📋 Preparati per il Workshop</h1>
    </a>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${validatedData.nome}</strong>,</p>
    
    <p>Manca poco al workshop "Ai in Azienda".</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h3 style="margin-top: 0; color: #667eea;">📅 Dettagli Evento:</h3>
      <p style="margin: 5px 0;"><strong>Data:</strong> ${WORKSHOP_DATE}</p>
      <p style="margin: 5px 0;"><strong>Orario:</strong> ${WORKSHOP_TIME}</p>
      <p style="margin: 5px 0;"><strong>Luogo:</strong> ${WORKSHOP_LOCATION}</p>
    </div>
    
    <h3 style="color: #667eea; margin-top: 30px;">📋 Preparazione Pratica:</h3>
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 10px 0;"><strong>✅ Cosa portare:</strong></p>
      <ul style="line-height: 2;">
        <li>📱 Smartphone o tablet (opzionale, per vedere la demo)</li>
        <li>📝 Qualche dato aziendale se vuoi fare domande specifiche</li>
        <li>💡 La voglia di mettere ordine nella tua digitalizzazione!</li>
      </ul>
    </div>
    
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>💡 Non dimenticare:</strong> Se non l'hai ancora fatto, compila il <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'}/test-maturita-digitale" style="color: #667eea; font-weight: bold;">Test di Maturità Digitale</a> prima del workshop.</p>
    </div>
    
    <p style="margin-top: 30px;">A presto! 🚀</p>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <a href="https://www.osmpartnervenezia.it/" style="color: #667eea; text-decoration: none;">OSM Partner Venezia</a></p>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
      <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">📅 Vai alla pagina del Workshop</a>
    </div>
  </div>
</body>
</html>`;

            await sendEmail({
              to: validatedData.email,
              subject: '📋 [AUTO-TEST] Preparati per il workshop',
              html: emailHtml,
              text: `Test automatico email T-3`,
              emailId: 'auto_test_3_giorni',
              leadId: lead.id,
              unsubscribeUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'}/unsubscribe?email=${encodeURIComponent(validatedData.email)}&lead=${encodeURIComponent(lead.id)}`,
            });

            // Aggiorna metadata per tracciare email inviata
            const { data: currentLead } = await supabase
              .from('workshop_leads')
              .select('metadata')
              .eq('id', lead.id)
              .single();

            if (currentLead) {
              const metadata = (currentLead.metadata as any) || {};
              metadata.email_3_giorni_sent = new Date().toISOString();
              await supabase
                .from('workshop_leads')
                .update({ metadata })
                .eq('id', lead.id);
            }
          } catch (err) {
            console.error('[WORKSHOP] Errore invio email T-3 automatica:', err);
          }
        }),
        // Email T+0 (simulata)
        new Promise(resolve => setTimeout(resolve, 8000)).then(async () => {
          try {
            const emailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 32px;">🚀 Oggi è il Giorno!</h1>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 20px; margin-bottom: 20px; font-weight: bold;">Ciao <strong>${validatedData.nome}</strong>,</p>
    
    <p style="font-size: 18px; margin-bottom: 20px;">Oggi è il giorno! Ti aspettiamo al workshop <strong>dalle ore 17.00</strong> (accettazione dalle ore 16.30).</p>
    
    <p style="margin-top: 30px; text-align: center; font-size: 18px; font-weight: bold; color: #667eea;">Ci vediamo stasera! 🎉</p>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <a href="https://www.osmpartnervenezia.it/" style="color: #667eea; text-decoration: none;">OSM Partner Venezia</a></p>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
      <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">📅 Vai alla pagina del Workshop</a>
    </div>
  </div>
</body>
</html>`;

            await sendEmail({
              to: validatedData.email,
              subject: '🚀 [AUTO-TEST] Oggi è il giorno! Ti aspettiamo dalle ore 17.00',
              html: emailHtml,
              text: `Test automatico email T+0`,
              emailId: 'auto_test_giorno_evento',
              leadId: lead.id,
            });

            // Aggiorna metadata per tracciare email inviata
            const { data: currentLead } = await supabase
              .from('workshop_leads')
              .select('metadata')
              .eq('id', lead.id)
              .single();

            if (currentLead) {
              const metadata = (currentLead.metadata as any) || {};
              metadata.email_giorno_evento_sent = new Date().toISOString();
              await supabase
                .from('workshop_leads')
                .update({ metadata })
                .eq('id', lead.id);
            }
          } catch (err) {
            console.error('[WORKSHOP] Errore invio email T+0 automatica:', err);
          }
        }),
        // Email Post-Immediata (simulata)
        new Promise(resolve => setTimeout(resolve, 10000)).then(async () => {
          try {
            const CALENDLY_CHECKUP_URL = process.env.NEXT_PUBLIC_CALENDLY_CHECKUP_URL || 'https://calendly.com/enricorizzi/check-up-gratuito-in-azienda';
            const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

            const emailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Grazie!</h1>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${validatedData.nome}</strong>,</p>
    
    <p>Grazie per essere stato al workshop "Ai in Azienda"!</p>
    
    <p>Speriamo che tu abbia trovato utili gli spunti e le demo che abbiamo condiviso.</p>
    
    <h3 style="color: #667eea; margin-top: 30px;">📦 Materiali Promessi</h3>
    <ul style="line-height: 2;">
      <li><a href="${BASE_URL}/download/starter-kit-digitalizzazione" style="color: #667eea; font-weight: bold;">Starter Kit: Checklist Digitalizzazione PMI</a> (PDF)</li>
      <li><a href="${BASE_URL}/test-maturita-digitale" style="color: #667eea; font-weight: bold;">Test di Maturità Digitale</a> (se non l'hai ancora compilato)</li>
    </ul>
    
    <div style="background: #e7f3ff; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>🚀 Prossimo Passo:</strong> Vuoi applicare subito quello che hai visto? Prenota un <a href="${CALENDLY_CHECKUP_URL}" style="color: #667eea; font-weight: bold;">Check-up Digitale Gratuito</a> e scopri come possiamo aiutarti a digitalizzare la tua azienda.</p>
    </div>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <a href="https://www.osmpartnervenezia.it/" style="color: #667eea; text-decoration: none;">OSM Partner Venezia</a></p>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
      <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">📅 Vai alla pagina del Workshop</a>
    </div>
  </div>
</body>
</html>`;

            await sendEmail({
              to: validatedData.email,
              subject: '🎉 [AUTO-TEST] Grazie per essere stato al workshop!',
              html: emailHtml,
              text: `Test automatico email post-immediata`,
              emailId: 'auto_test_post_immediata',
              leadId: lead.id,
            });

            // Aggiorna metadata per tracciare email inviata
            const { data: currentLead } = await supabase
              .from('workshop_leads')
              .select('metadata')
              .eq('id', lead.id)
              .single();

            if (currentLead) {
              const metadata = (currentLead.metadata as any) || {};
              metadata.email_post_immediata_sent = new Date().toISOString();
              // Nota: post-evento usa 'immediate' ma dashboard cerca 'post_immediata'
              await supabase
                .from('workshop_leads')
                .update({ metadata })
                .eq('id', lead.id);
            }
          } catch (err) {
            console.error('[WORKSHOP] Errore invio email post-immediata automatica:', err);
          }
        }),
        // Email Post-24h (simulata)
        new Promise(resolve => setTimeout(resolve, 12000)).then(async () => {
          try {
            const CALENDLY_CHECKUP_URL = process.env.NEXT_PUBLIC_CALENDLY_CHECKUP_URL || 'https://calendly.com/enricorizzi/check-up-gratuito-in-azienda';
            const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

            const emailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
  <div style="background: #f9f9f9; padding: 30px; border-radius: 10px;">
    <p style="font-size: 18px;">Ciao <strong>${validatedData.nome}</strong>,</p>
    
    <p>Come va con l'applicazione di quello che hai visto al workshop?</p>
    
    <p>Se non l'hai ancora fatto, ti ricordiamo di scaricare lo <a href="${BASE_URL}/download/starter-kit-digitalizzazione" style="color: #667eea; font-weight: bold;">Starter Kit</a> e compilare il <a href="${BASE_URL}/test-maturita-digitale" style="color: #667eea; font-weight: bold;">Test di Maturità Digitale</a>.</p>
    
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>💡 Ricorda:</strong> Le condizioni speciali workshop scadono tra 7 giorni. Se vuoi approfittarne, prenota il tuo <a href="${CALENDLY_CHECKUP_URL}" style="color: #667eea; font-weight: bold;">Check-up Digitale Gratuito</a>.</p>
    </div>
    
    <p>A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <a href="https://www.osmpartnervenezia.it/" style="color: #667eea; text-decoration: none;">OSM Partner Venezia</a></p>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
      <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">📅 Vai alla pagina del Workshop</a>
    </div>
  </div>
</body>
</html>`;

            await sendEmail({
              to: validatedData.email,
              subject: '💡 [AUTO-TEST] Hai già scaricato lo Starter Kit?',
              html: emailHtml,
              text: `Test automatico email post-24h`,
              emailId: 'auto_test_post_24h',
              leadId: lead.id,
            });

            // Aggiorna metadata per tracciare email inviata
            const { data: currentLead } = await supabase
              .from('workshop_leads')
              .select('metadata')
              .eq('id', lead.id)
              .single();

            if (currentLead) {
              const metadata = (currentLead.metadata as any) || {};
              metadata.email_post_24h_sent = new Date().toISOString();
              await supabase
                .from('workshop_leads')
                .update({ metadata })
                .eq('id', lead.id);
            }
          } catch (err) {
            console.error('[WORKSHOP] Errore invio email post-24h automatica:', err);
          }
        }),
        // Email Post-48h (simulata)
        new Promise(resolve => setTimeout(resolve, 14000)).then(async () => {
          try {
            const CALENDLY_CHECKUP_URL = process.env.NEXT_PUBLIC_CALENDLY_CHECKUP_URL || 'https://calendly.com/enricorizzi/check-up-gratuito-in-azienda';
            const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

            const emailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
  <div style="background: #f9f9f9; padding: 30px; border-radius: 10px;">
    <p style="font-size: 18px;">Ciao <strong>${validatedData.nome}</strong>,</p>
    
    <p>Ultimi giorni per approfittare delle condizioni speciali workshop!</p>
    
    <p>Se vuoi applicare subito quello che hai visto e ottenere un supporto personalizzato, prenota il tuo <a href="${CALENDLY_CHECKUP_URL}" style="color: #667eea; font-weight: bold;">Check-up Digitale Gratuito</a>.</p>
    
    <div style="background: #f8d7da; border-left: 4px solid #dc3545; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>⏰ Ultima chiamata:</strong> Le condizioni speciali scadono tra 5 giorni. Non perdere questa opportunità!</p>
    </div>
    
    <p>Ricorda anche di scaricare lo <a href="${BASE_URL}/download/starter-kit-digitalizzazione" style="color: #667eea; font-weight: bold;">Starter Kit</a> se non l'hai ancora fatto.</p>
    
    <p>A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <a href="https://www.osmpartnervenezia.it/" style="color: #667eea; text-decoration: none;">OSM Partner Venezia</a></p>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
      <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">📅 Vai alla pagina del Workshop</a>
    </div>
  </div>
</body>
</html>`;

            await sendEmail({
              to: validatedData.email,
              subject: '⏰ [AUTO-TEST] Ultimi giorni condizioni speciali workshop',
              html: emailHtml,
              text: `Test automatico email post-48h`,
              emailId: 'auto_test_post_48h',
              leadId: lead.id,
            });

            // Aggiorna metadata per tracciare email inviata
            const { data: currentLead } = await supabase
              .from('workshop_leads')
              .select('metadata')
              .eq('id', lead.id)
              .single();

            if (currentLead) {
              const metadata = (currentLead.metadata as any) || {};
              metadata.email_post_48h_sent = new Date().toISOString();
              await supabase
                .from('workshop_leads')
                .update({ metadata })
                .eq('id', lead.id);
            }
          } catch (err) {
            console.error('[WORKSHOP] Errore invio email post-48h automatica:', err);
          }
        }),
      ]).catch((err) => {
        console.error('[WORKSHOP] Errore invio email automatiche test:', err);
      });
    }

    // Ritorna subito la risposta senza aspettare le email
    return NextResponse.json({
      success: true,
      id: lead.id,
      message: 'Registrazione completata. Email di conferma inviata.',
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dati non validi', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

