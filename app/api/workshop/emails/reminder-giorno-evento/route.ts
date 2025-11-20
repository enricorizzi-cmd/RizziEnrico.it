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
    
    // Verifica se oggi è il giorno del workshop (12 dicembre)
    const today = new Date();
    const workshopDate = new Date('2024-12-12');
    const todayStr = today.toISOString().split('T')[0];
    const workshopDateStr = workshopDate.toISOString().split('T')[0];
    
    if (todayStr !== workshopDateStr) {
      return NextResponse.json({
        message: `Non è il giorno del workshop. Oggi: ${todayStr}, Workshop: ${workshopDateStr}`,
        sent: 0,
        errors: 0,
      });
    }
    
    // Trova tutti i lead con stato nuovo/confermato
    const { data: leads, error } = await supabase
      .from('workshop_leads')
      .select('*')
      .in('stato', ['nuovo', 'confermato'])
      .eq('evento', 'Workshop 12.12.2024');

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
        message: 'Nessun lead trovato',
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
        if (metadata.email_giorno_evento_sent) {
          continue;
        }

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="text-decoration: none; color: white;">
      <h1 style="color: white; margin: 0; font-size: 32px;">🚀 Oggi è il Giorno!</h1>
    </a>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 20px; margin-bottom: 20px; font-weight: bold;">Ciao <strong>${lead.nome}</strong>,</p>
    
    <p style="font-size: 18px; margin-bottom: 20px;">Oggi è il giorno! Ti aspettiamo al workshop <strong>"Automatizza la tua Azienda: AI & Digitalizzazione"</strong> <strong>dalle ore 17.00</strong> (accettazione dalle ore 16.30).</p>
    
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 8px; margin: 20px 0; text-align: center; color: white;">
      <h2 style="margin: 0; font-size: 28px;">
        <a href="${generateGoogleCalendarUrl({
          title: 'Automatizza la tua Azienda: AI & Digitalizzazione',
          description: 'Workshop esclusivo OSM',
          startDate: new Date('2025-12-12T17:00:00'),
          endDate: new Date('2025-12-12T19:00:00'),
          location: WORKSHOP_LOCATION,
        })}" style="color: white; text-decoration: underline;">📅 ${WORKSHOP_DATE}</a>
        <span style="margin-left: 10px; font-size: 12px;">
          (<a href="data:text/calendar;charset=utf-8,${encodeURIComponent(generateICS({
            title: 'Automatizza la tua Azienda: AI & Digitalizzazione',
            description: 'Workshop esclusivo OSM',
            startDate: new Date('2025-12-12T17:00:00'),
            endDate: new Date('2025-12-12T19:00:00'),
            location: WORKSHOP_LOCATION,
          }))}" download="workshop-12-dicembre.ics" style="color: white; text-decoration: underline; opacity: 0.9;">Aggiungi al calendario</a>)
        </span>
      </h2>
      <p style="margin: 10px 0 0 0; font-size: 24px;">
        <a href="${generateGoogleCalendarUrl({
          title: 'Automatizza la tua Azienda: AI & Digitalizzazione',
          description: 'Workshop esclusivo OSM',
          startDate: new Date('2025-12-12T17:00:00'),
          endDate: new Date('2025-12-12T19:00:00'),
          location: WORKSHOP_LOCATION,
        })}" style="color: white; text-decoration: underline;"><strong>🕐 ${WORKSHOP_TIME}</strong></a>
      </p>
      <p style="margin: 10px 0 0 0; font-size: 18px;">
        <a href="${generateMapsUrl(WORKSHOP_LOCATION)}" style="color: white; text-decoration: underline;">📍 ${WORKSHOP_LOCATION}</a>
      </p>
    </div>
    
    <div style="background: #e7f3ff; border-left: 4px solid #2196F3; padding: 20px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0; font-size: 16px;"><strong>💡 Siamo entusiasti di condividere con te:</strong></p>
      <ul style="line-height: 2; margin: 10px 0 0 0;">
        <li>Un sistema che funziona davvero (non solo teoria!)</li>
        <li>Automazioni in azione, live e pratiche</li>
        <li>Demo di AI per generare contenuti in pochi minuti</li>
        <li>Dashboard real-time con lead che arrivano</li>
      </ul>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h3 style="margin-top: 0; color: #667eea;">📍 Info Pratiche:</h3>
      <p style="margin: 5px 0;"><strong>Luogo:</strong> ${WORKSHOP_LOCATION}</p>
      <p style="margin: 5px 0;"><strong>Indirizzo:</strong> Via Sertorio Orsato 22, Venezia</p>
      <p style="margin: 5px 0;"><strong>🕐 Inizio:</strong> dalle ore 17.00 (accettazione dalle ore 16.30)</p>
      <p style="margin: 5px 0;"><strong>☕ Caffè e networking incluso</strong></p>
      <p style="margin: 15px 0 5px 0;"><strong>📞 Contatto emergenze:</strong> Rispondi a questa email o chiama [telefono]</p>
    </div>
    
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>💡 Ultimo reminder:</strong> Se non l'hai ancora fatto, compila il <a href="${BASE_URL}/test-maturita-digitale" style="color: #667eea; font-weight: bold;">Test di Maturità Digitale</a> per personalizzare l'esperienza.</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://maps.google.com/?q=${encodeURIComponent(WORKSHOP_LOCATION)}" style="display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">📍 Apri in Google Maps</a>
    </div>
    
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

        const emailText = `Ciao ${lead.nome},

🚀 OGGI È IL GIORNO!

Ti aspettiamo al workshop "Automatizza la tua Azienda: AI & Digitalizzazione" dalle ore 17.00 (accettazione dalle ore 16.30).

📅 ${WORKSHOP_DATE} - 🕐 ${WORKSHOP_TIME}
📍 ${WORKSHOP_LOCATION}

💡 Siamo entusiasti di condividere con te:
- Un sistema che funziona davvero (non solo teoria!)
- Automazioni in azione, live e pratiche
- Demo di AI per generare contenuti in pochi minuti
- Dashboard real-time con lead che arrivano

📍 Info Pratiche:
Luogo: ${WORKSHOP_LOCATION}
Indirizzo: [Da aggiornare con indirizzo completo]
🕐 Inizio: dalle ore 17.00 (accettazione dalle ore 16.30)
☕ Caffè e networking incluso
📞 Contatto emergenze: Rispondi a questa email o chiama [telefono]

💡 Ultimo reminder: Se non l'hai ancora fatto, compila il Test di Maturità Digitale:
${BASE_URL}/test-maturita-digitale

Apri in Google Maps: https://maps.google.com/?q=${encodeURIComponent(WORKSHOP_LOCATION)}

Ci vediamo stasera! 🎉

A presto,
Enrico Rizzi & Francesco Fusano
<a href="https://www.osmpartnervenezia.it/">OSM Partner Venezia</a>

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`;

        await Promise.all([
          sendEmail({
            to: lead.email,
            subject: '🚀 Oggi è il giorno! Ti aspettiamo dalle ore 17.00',
            html: emailHtml,
            text: emailText,
          }),
          new Promise(resolve => setTimeout(resolve, 500)).then(() => {
            const notificationText = `Email reminder giorno evento inviata a ${lead.nome} ${lead.cognome} (${lead.email}):
            
ID Lead: ${lead.id}
Data invio: ${new Date().toLocaleString('it-IT')}`;
            
            return sendEmail({
              to: NOTIFICATION_EMAIL,
              subject: `📧 Email giorno evento inviata - ${lead.nome} ${lead.cognome}`,
              text: notificationText,
            }).catch((err) => {
              console.error('[WORKSHOP] Errore invio notifica giorno evento (non bloccante):', err);
              return false;
            });
          }),
        ]);

        // Aggiorna metadata
        metadata.email_giorno_evento_sent = new Date().toISOString();
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

