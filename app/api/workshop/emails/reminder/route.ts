import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

const NOTIFICATION_EMAIL = 'enricorizzi1991@gmail.com';
const WORKSHOP_DATE = 'Venerdì 12 dicembre 2025';
const WORKSHOP_TIME = 'dalle ore 17.00 (accettazione dalle ore 16.30)';
const WORKSHOP_LOCATION = 'OSM Venezia - Via Sertorio Orsato 22, Venezia';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

export async function POST(request: NextRequest) {
  try {
    // Verifica autorizzazione (puoi aggiungere un token segreto)
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.CRON_SECRET_TOKEN;
    
    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = createServerClient();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDateStr = tomorrow.toISOString().split('T')[0];

    // Trova tutti gli iscritti all'evento
    // Nota: qui assumiamo che l'evento sia il 12 dicembre 2025
    // Per un sistema più flessibile, potresti controllare la data evento
    const { data: leads, error } = await supabase
      .from('workshop_leads')
      .select('*')
      .eq('evento', 'Workshop 12.12.2024'); // Manteniamo per retrocompatibilità con lead esistenti

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Errore nel caricamento lead' },
        { status: 500 }
      );
    }

    // Verifica se oggi è l'11 dicembre (giorno prima del workshop)
    const today = new Date();
    const workshopDate = new Date('2025-12-12');
    const daysUntilWorkshop = Math.floor((workshopDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilWorkshop !== 1) {
      return NextResponse.json({
        message: `Non è il giorno prima del workshop. Giorni rimanenti: ${daysUntilWorkshop}`,
        leads_found: leads?.length || 0,
      });
    }

    let sent = 0;
    let errors = 0;

    for (const lead of leads || []) {
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
      <h1 style="color: white; margin: 0; font-size: 28px;">📅 Promemoria Workshop</h1>
    </a>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${lead.nome}</strong>,</p>
    
    <p>Ti ricordiamo che <strong>domani</strong> si terrà il workshop:</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h2 style="margin-top: 0; color: #667eea;">"Automatizza la tua Azienda: AI & Digitalizzazione"</h2>
      <p style="margin: 10px 0;"><strong>📅 Data:</strong> ${WORKSHOP_DATE}</p>
      <p style="margin: 10px 0;"><strong>🕐 Orario:</strong> ${WORKSHOP_TIME}</p>
      <p style="margin: 10px 0;"><strong>📍 Luogo:</strong> ${WORKSHOP_LOCATION}</p>
    </div>
    
    <h3 style="color: #667eea; margin-top: 30px;">Cosa portare:</h3>
    <ul style="line-height: 2;">
      <li>📱 Smartphone o tablet (opzionale, per vedere la demo)</li>
      <li>📝 Qualche dato aziendale se vuoi fare domande specifiche</li>
      <li>💡 La voglia di mettere ordine nella tua digitalizzazione!</li>
    </ul>
    
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>💡 Non dimenticare:</strong> Se non l'hai ancora fatto, compila il <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'}/test-maturita-digitale" style="color: #667eea; font-weight: bold;">Test di Maturità Digitale</a> prima del workshop.</p>
    </div>
    
    <p style="margin-top: 30px;">Ci vediamo domani! 🚀</p>
    
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

Ti ricordiamo che DOMANI si terrà il workshop "Automatizza la tua Azienda: AI & Digitalizzazione"!

📅 Data: ${WORKSHOP_DATE}
🕐 Orario: ${WORKSHOP_TIME}
📍 Luogo: ${WORKSHOP_LOCATION}

Cosa portare:
📱 Smartphone o tablet (opzionale)
📝 Qualche dato aziendale se vuoi fare domande specifiche
💡 La voglia di mettere ordine nella tua digitalizzazione!

💡 Non dimenticare: Se non l'hai ancora fatto, compila il Test di Maturità Digitale qui:
${process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'}/test-maturita-digitale

Ci vediamo domani! 🚀

A presto,
Enrico Rizzi & Francesco Fusano
<a href="https://www.osmpartnervenezia.it/">OSM Partner Venezia</a>

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`;

        await Promise.all([
          sendEmail({
            to: lead.email,
            subject: '📅 Promemoria Workshop - Domani dalle ore 17.00',
            html: emailHtml,
            text: emailText,
            unsubscribeUrl: `${BASE_URL}/unsubscribe?email=${encodeURIComponent(lead.email)}&lead=${encodeURIComponent(lead.id)}`,
          }),
          new Promise(resolve => setTimeout(resolve, 500)).then(() => {
            const notificationText = `Promemoria workshop inviato a ${lead.nome} ${lead.cognome} (${lead.email}):
            
ID Lead: ${lead.id}
Data invio: ${new Date().toLocaleString('it-IT')}`;
            
            return sendEmail({
              to: NOTIFICATION_EMAIL,
              subject: `📅 Promemoria workshop inviato - ${lead.nome} ${lead.cognome}`,
              text: notificationText,
            }).catch((err) => {
              console.error('[WORKSHOP] Errore invio notifica reminder (non bloccante):', err);
              return false;
            });
          }),
        ]);

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

