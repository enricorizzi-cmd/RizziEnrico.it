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
    
    // Verifica se oggi è 3 giorni prima del workshop (9 dicembre)
    const today = new Date();
    const workshopDate = new Date('2024-12-12');
    const daysUntilWorkshop = Math.ceil((workshopDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilWorkshop !== 3) {
      return NextResponse.json({
        message: `Non sono 3 giorni prima del workshop. Giorni rimanenti: ${daysUntilWorkshop}`,
        sent: 0,
        errors: 0,
      });
    }
    
    // Trova tutti i lead con stato nuovo/confermato
    const { data: leads, error } = await supabase
      .from('workshop_leads')
      .select('*')
      .in('stato', ['nuovo', 'confermato'])
      .eq('evento', 'Workshop 12.12.2024'); // Manteniamo per retrocompatibilità con lead esistenti

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
        if (metadata.email_3_giorni_sent) {
          continue;
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
      <h1 style="color: white; margin: 0; font-size: 28px;">📋 Preparati per il Workshop</h1>
    </a>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${lead.nome}</strong>,</p>
    
    <p>Il workshop "Automatizza la tua Azienda: AI & Digitalizzazione" si avvicina!</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; text-align: center;">
      <h2 style="margin-top: 0; color: #667eea; font-size: 32px;">📅 ${WORKSHOP_DATE}</h2>
      <p style="font-size: 24px; margin: 10px 0; color: #667eea;"><strong>🕐 ${WORKSHOP_TIME}</strong></p>
    </div>
    
    <h3 style="color: #667eea; margin-top: 30px;">📋 Preparazione Pratica:</h3>
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 10px 0;"><strong>✅ Cosa portare:</strong></p>
      <ul style="line-height: 2;">
        <li>📱 Smartphone o tablet (opzionale, per vedere la demo)</li>
        <li>📝 Qualche dato aziendale se vuoi fare domande specifiche</li>
        <li>💡 La voglia di mettere ordine nella tua digitalizzazione!</li>
      </ul>
      
      <p style="margin: 20px 0 10px 0;"><strong>💼 Se vuoi, porta dati su:</strong></p>
      <ul style="line-height: 2;">
        <li>Numero di lead attuali che gestisci</li>
        <li>Processi manuali che vorresti automatizzare</li>
        <li>Obiettivi di digitalizzazione per il 2025</li>
      </ul>
    </div>
    
    <h3 style="color: #667eea; margin-top: 30px;">🎯 Cosa vedrai al workshop:</h3>
    <div style="background: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <ul style="line-height: 2;">
        <li>✅ Sistema CRM live con lead in tempo reale</li>
        <li>✅ Automazioni email e follow-up automatici</li>
        <li>✅ Dashboard con numeri, fonti e conversioni</li>
        <li>✅ <strong>Demo AI:</strong> genereremo contenuti insieme in pochi minuti</li>
      </ul>
    </div>
    
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>💡 Non dimenticare:</strong> Se non l'hai ancora fatto, compila il <a href="${BASE_URL}/test-maturita-digitale" style="color: #667eea; font-weight: bold;">Test di Maturità Digitale</a> per personalizzare l'esperienza del workshop.</p>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h3 style="margin-top: 0; color: #667eea;">📅 Dettagli Evento:</h3>
      <p style="margin: 5px 0;">
        <strong>Data:</strong> 
        <a href="${generateGoogleCalendarUrl({
          title: 'Automatizza la tua Azienda: AI & Digitalizzazione',
          description: 'Workshop esclusivo OSM',
          startDate: new Date('2025-12-12T17:00:00'),
          endDate: new Date('2025-12-12T19:00:00'),
          location: WORKSHOP_LOCATION,
        })}" style="color: #667eea; text-decoration: underline;">${WORKSHOP_DATE}</a>
        <span style="margin-left: 10px; font-size: 12px;">
          (<a href="data:text/calendar;charset=utf-8,${encodeURIComponent(generateICS({
            title: 'Automatizza la tua Azienda: AI & Digitalizzazione',
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
          title: 'Automatizza la tua Azienda: AI & Digitalizzazione',
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

        const emailText = `Ciao ${lead.nome},

Il workshop "Automatizza la tua Azienda: AI & Digitalizzazione" si avvicina!

📅 ${WORKSHOP_DATE} - 🕐 ${WORKSHOP_TIME}

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

💡 Non dimenticare: Se non l'hai ancora fatto, compila il Test di Maturità Digitale:
${BASE_URL}/test-maturita-digitale

📍 Informazioni Logistiche:
Luogo: ${WORKSHOP_LOCATION}
Indirizzo: [Da aggiornare con indirizzo completo]
Parcheggio: Disponibile
Mezzi pubblici: [Da aggiornare]
📞 Contatto emergenze: Rispondi a questa email o chiama [telefono]

Apri in Google Maps: https://maps.google.com/?q=${encodeURIComponent(WORKSHOP_LOCATION)}

A presto! 🚀

A presto,
Enrico Rizzi & Francesco Fusano
<a href="https://www.osmpartnervenezia.it/">OSM Partner Venezia</a>

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`;

        await Promise.all([
          sendEmail({
            to: lead.email,
            subject: '📋 Preparati per il workshop',
            html: emailHtml,
            text: emailText,
            unsubscribeUrl: `${BASE_URL}/unsubscribe?email=${encodeURIComponent(lead.email)}&lead=${encodeURIComponent(lead.id)}`,
          }),
          new Promise(resolve => setTimeout(resolve, 500)).then(() => {
            const notificationText = `Email countdown 3 giorni inviata a ${lead.nome} ${lead.cognome} (${lead.email}):
            
ID Lead: ${lead.id}
Data invio: ${new Date().toLocaleString('it-IT')}`;
            
            return sendEmail({
              to: NOTIFICATION_EMAIL,
              subject: `📧 Email 3 giorni inviata - ${lead.nome} ${lead.cognome}`,
              text: notificationText,
            }).catch((err) => {
              console.error('[WORKSHOP] Errore invio notifica 3 giorni (non bloccante):', err);
              return false;
            });
          }),
        ]);

        // Aggiorna metadata
        metadata.email_3_giorni_sent = new Date().toISOString();
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

