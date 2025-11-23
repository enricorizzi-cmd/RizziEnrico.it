import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';
import { generateICS, generateGoogleCalendarUrl, generateMapsUrl } from '@/lib/calendar';

const NOTIFICATION_EMAIL = 'enricorizzi1991@gmail.com';
const WORKSHOP_DATE = 'Venerdì 12 dicembre 2025';
const WORKSHOP_TIME = 'dalle ore 17.00 (accettazione dalle ore 16.30)';
const WORKSHOP_LOCATION = 'OSM Venezia - Via Sertorio Orsato 22, Venezia';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.CRON_SECRET_TOKEN;

    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = createServerClient();

    // Calcola la data di 5 giorni fa
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    const fiveDaysAgoStr = fiveDaysAgo.toISOString().split('T')[0];

    // Trova tutti i lead iscritti 5 giorni fa che non hanno già ricevuto questa email
    const { data: leads, error } = await supabase
      .from('workshop_leads')
      .select('*')
      .eq('evento', 'Workshop 12.12.2024') // Manteniamo per retrocompatibilità con lead esistenti
      .gte('created_at', `${fiveDaysAgoStr}T00:00:00`)
      .lt('created_at', `${fiveDaysAgoStr}T23:59:59`);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Errore nel caricamento lead' },
        { status: 500 }
      );
    }

    if (!leads || leads.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Nessun lead trovato per questa data',
        sent: 0,
        errors: 0,
      });
    }

    let sent = 0;
    let errors = 0;

    for (const lead of leads) {
      try {
        // Controlla se ha già ricevuto questa email
        const metadata = (lead.metadata as any) || {};
        if (metadata.email_5_giorni_sent) {
          continue; // Salta se già inviata
        }

        // Calcola giorni rimanenti fino al workshop
        const workshopDate = new Date('2025-12-12');
        workshopDate.setHours(17, 0, 0, 0); // Workshop dalle ore 17.00
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const daysRemaining = Math.ceil((workshopDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        // NON inviare se:
        // 1. Workshop già passato
        // 2. Manca meno di 3 giorni (troppo vicino, useremo email T-3)
        // 3. L'iscrizione è avvenuta troppo vicino al workshop (meno di 5 giorni prima)
        const registrationDate = new Date(lead.created_at);
        registrationDate.setHours(0, 0, 0, 0);
        const daysFromRegistration = Math.ceil((today.getTime() - registrationDate.getTime()) / (1000 * 60 * 60 * 24));
        const daysFromRegistrationToWorkshop = Math.ceil((workshopDate.getTime() - registrationDate.getTime()) / (1000 * 60 * 60 * 24));

        if (daysRemaining <= 0) {
          console.log(`Lead ${lead.id}: Workshop già passato, email T+5 saltata`);
          continue; // Workshop già passato
        }

        if (daysRemaining < 3) {
          console.log(`Lead ${lead.id}: Troppo vicino al workshop (${daysRemaining} giorni), email T+5 saltata`);
          continue; // Troppo vicino, useremo email T-3
        }

        if (daysFromRegistrationToWorkshop < 5) {
          console.log(`Lead ${lead.id}: Iscritto troppo vicino al workshop (${daysFromRegistrationToWorkshop} giorni prima), email T+5 saltata`);
          continue; // Iscritto troppo tardi, non ha senso inviare email T+5
        }

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
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${lead.nome}</strong>,</p>
    
    <p>Siamo felici che tu sia iscritto al workshop <strong>"AI in Azienda: Più Tempo, Più Clienti, Meno Sprechi"</strong>!</p>
    
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
    
    <div style="background: #e7f3ff; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>💡 Prossimo passo importante:</strong></p>
      <p style="margin: 10px 0 0 0;">Per trarre il massimo dal workshop, ti consigliamo di compilare il <a href="${BASE_URL}/test-maturita-digitale" style="color: #667eea; font-weight: bold;">Test di Maturità Digitale</a>.</p>
      <p style="margin: 10px 0 0 0;">Ti aiuterà a capire da dove partire e a personalizzare l'esperienza del workshop in base alle tue esigenze.</p>
    </div>
    
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>🎯 Anticipazione:</strong> Al workshop faremo una <strong>demo live</strong> di come l'AI può generare titoli, post, email e script in pochi minuti. Vedrai una dashboard in tempo reale con i lead che arrivano.</p>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h3 style="margin-top: 0; color: #667eea;">📅 Dettagli Evento:</h3>
      <p style="margin: 5px 0;">
        <strong>Data:</strong> 
        <a href="${generateGoogleCalendarUrl({
          title: 'AI in Azienda: Più Tempo, Più Clienti, Meno Sprechi',
          description: 'Workshop esclusivo OSM',
          startDate: new Date('2025-12-12T17:00:00'),
          endDate: new Date('2025-12-12T19:00:00'),
          location: WORKSHOP_LOCATION,
        })}" style="color: #667eea; text-decoration: underline;">${WORKSHOP_DATE}</a>
        <span style="margin-left: 10px; font-size: 12px;">
          (<a href="data:text/calendar;charset=utf-8,${encodeURIComponent(generateICS({
          title: 'AI in Azienda: Più Tempo, Più Clienti, Meno Sprechi',
          description: 'Workshop esclusivo OSM',
          startDate: new Date('2025-12-12T17:00:00'),
          endDate: new Date('2025-12-12T19:00:00'),
          location: WORKSHOP_LOCATION,
        }))}" download="workshop-12-dicembre.ics" style="color: #667eea; text-decoration: underline;">Aggiungi al calendario</a>)
        </span>
      </p>
      <p style="margin: 5px 0;">
        <strong>🕐 Orario:</strong> 
        <a href="${generateGoogleCalendarUrl({
          title: 'AI in Azienda: Più Tempo, Più Clienti, Meno Sprechi',
          description: 'Workshop esclusivo OSM',
          startDate: new Date('2025-12-12T17:00:00'),
          endDate: new Date('2025-12-12T19:00:00'),
          location: WORKSHOP_LOCATION,
        })}" style="color: #667eea; text-decoration: underline;">${WORKSHOP_TIME}</a>
      </p>
      <p style="margin: 5px 0;">
        <strong>📍 Luogo:</strong> 
        <a href="${generateMapsUrl(WORKSHOP_LOCATION)}" style="color: #667eea; text-decoration: underline;">${WORKSHOP_LOCATION}</a>
      </p>
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

        const emailText = `Ciao ${lead.nome},

Siamo felici che tu sia iscritto al workshop "AI in Azienda: Più Tempo, Più Clienti, Meno Sprechi"!

Vogliamo aiutarti a prepararti al meglio per trarre il massimo dall'evento.

Cosa vedrai al workshop:
✅ Un sistema reale in azione: landing page + CRM + automazioni + AI
✅ Demo live di automazioni email e follow-up automatici
✅ Dashboard in tempo reale con lead, fonti e conversioni
✅ AI Copy Sprint: genereremo contenuti insieme in pochi minuti

💡 Prossimo passo importante:
Per trarre il massimo dal workshop, ti consigliamo di compilare il Test di Maturità Digitale:
${BASE_URL}/test-maturita-digitale

Ti aiuterà a capire da dove partire e a personalizzare l'esperienza del workshop.

🎯 Anticipazione: Al workshop faremo una demo live di come l'AI può generare contenuti in pochi minuti.

📅 Dettagli Evento:
Data: ${WORKSHOP_DATE}
Orario: ${WORKSHOP_TIME}
Luogo: ${WORKSHOP_LOCATION}

Ci vediamo presto! 🚀

A presto,
Enrico Rizzi & Francesco Fusano
<a href="https://www.osmpartnervenezia.it/">OSM Partner Venezia</a>

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`;

        await Promise.all([
          sendEmail({
            to: lead.email,
            subject: '🎯 Preparati al meglio per il workshop',
            html: emailHtml,
            text: emailText,
            unsubscribeUrl: `${BASE_URL}/unsubscribe?email=${encodeURIComponent(lead.email)}&lead=${encodeURIComponent(lead.id)}`,
          }),
          new Promise(resolve => setTimeout(resolve, 500)).then(() => {
            const notificationText = `Email follow-up 5 giorni inviata a ${lead.nome} ${lead.cognome} (${lead.email}):
            
ID Lead: ${lead.id}
Data invio: ${new Date().toLocaleString('it-IT')}
Giorni rimanenti: ${daysRemaining}`;

            return sendEmail({
              to: NOTIFICATION_EMAIL,
              subject: `📧 Email 5 giorni inviata - ${lead.nome} ${lead.cognome}`,
              text: notificationText,
            }).catch((err) => {
              console.error('[WORKSHOP] Errore invio notifica 5 giorni (non bloccante):', err);
              return false;
            });
          }),
        ]);

        // Aggiorna metadata per tracciare invio
        metadata.email_5_giorni_sent = new Date().toISOString();
        await supabase
          .from('workshop_leads')
          .update({ metadata })
          .eq('id', lead.id);

        sent++;
      } catch (error) {
        console.error(`Error sending email to ${lead.email}:`, error);
        errors++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Email inviate: ${sent}, Errori: ${errors}`,
      total_leads: leads?.length || 0,
      sent,
      errors,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

