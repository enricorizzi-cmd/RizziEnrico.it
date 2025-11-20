import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

const NOTIFICATION_EMAIL = 'enricorizzi1991@gmail.com';
const WORKSHOP_DATE = '12 dicembre 2024';
const WORKSHOP_TIME = '18:00';
const WORKSHOP_LOCATION = 'OSM Partner Venezia';
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
    
    // Calcola la data di 10 giorni fa
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    const tenDaysAgoStr = tenDaysAgo.toISOString().split('T')[0];
    
    // Verifica se siamo troppo vicini all'evento o se è già passato
    const workshopDate = new Date('2024-12-12');
    workshopDate.setHours(18, 0, 0, 0); // Workshop alle 18:00
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysUntilWorkshop = Math.ceil((workshopDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilWorkshop <= 0) {
      return NextResponse.json({
        success: true,
        message: `Workshop già passato. Email saltata.`,
        sent: 0,
        errors: 0,
      });
    }
    
    if (daysUntilWorkshop < 3) {
      return NextResponse.json({
        success: true,
        message: `Troppo vicini all'evento (${daysUntilWorkshop} giorni). Email saltata.`,
        sent: 0,
        errors: 0,
      });
    }
    
    // Trova lead iscritti 10 giorni fa
    const { data: leads, error } = await supabase
      .from('workshop_leads')
      .select('*')
      .in('stato', ['nuovo', 'confermato'])
      .eq('evento', 'Workshop 12.12.2024')
      .gte('created_at', `${tenDaysAgoStr}T00:00:00`)
      .lt('created_at', `${tenDaysAgoStr}T23:59:59`);

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
        if (metadata.email_10_giorni_sent) {
          continue;
        }

        // Calcola giorni rimanenti fino al workshop
        const registrationDate = new Date(lead.created_at);
        registrationDate.setHours(0, 0, 0, 0);
        const daysFromRegistrationToWorkshop = Math.ceil((workshopDate.getTime() - registrationDate.getTime()) / (1000 * 60 * 60 * 24));

        // NON inviare se:
        // 1. L'iscrizione è avvenuta troppo vicino al workshop (meno di 10 giorni prima)
        if (daysFromRegistrationToWorkshop < 10) {
          console.log(`Lead ${lead.id}: Iscritto troppo vicino al workshop (${daysFromRegistrationToWorkshop} giorni prima), email T+10 saltata`);
          continue; // Iscritto troppo tardi, non ha senso inviare email T+10
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
    <h1 style="color: white; margin: 0; font-size: 28px;">💡 Case Study Reale</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${lead.nome}</strong>,</p>
    
    <p>Mancano solo <strong>${daysUntilWorkshop} giorni</strong> al workshop e vogliamo condividere con te un caso reale di successo.</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h3 style="margin-top: 0; color: #667eea;">📊 Case Study: PMI Veneta</h3>
      <p><strong>Azienda:</strong> PMI manifatturiera, 15 dipendenti, fatturato 8M€</p>
      <p><strong>Problema iniziale:</strong> Lead gestiti manualmente, email perse, nessuna automazione</p>
      <p><strong>Soluzione implementata:</strong> Sistema completo (landing + CRM + automazioni) in 30 giorni</p>
      
      <div style="background: #e7f3ff; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <h4 style="margin-top: 0; color: #2196F3;">🎯 Risultati in 30 giorni:</h4>
        <ul style="line-height: 2; margin: 0;">
          <li>✅ <strong>+40%</strong> lead gestiti senza aumentare personale</li>
          <li>✅ <strong>-60%</strong> tempo speso su attività ripetitive</li>
          <li>✅ <strong>100%</strong> lead seguiti (prima il 30% si perdeva)</li>
          <li>✅ <strong>Dashboard real-time</strong> per vedere numeri in tempo reale</li>
        </ul>
      </div>
      
      <p style="font-style: italic; color: #666;">"Finalmente ho messo ordine nella digitalizzazione. Ora so esattamente da dove arrivano i lead e posso seguire tutti senza perdere nessuno." - Imprenditore</p>
    </div>
    
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>🎯 Al workshop vedrai esattamente come hanno fatto:</strong></p>
      <ul style="line-height: 2; margin: 10px 0 0 0;">
        <li>Step-by-step il processo di implementazione</li>
        <li>Il sistema reale in azione (non teoria!)</li>
        <li>Come hanno automatizzato email e follow-up</li>
        <li>La dashboard che usano ogni giorno</li>
      </ul>
    </div>
    
    <div style="background: #e7f3ff; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>💡 Non dimenticare:</strong> Se non l'hai ancora fatto, compila il <a href="${BASE_URL}/test-maturita-digitale" style="color: #667eea; font-weight: bold;">Test di Maturità Digitale</a> per personalizzare l'esperienza del workshop.</p>
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
    <span style="color: #667eea;">OSM Partner Venezia</span></p>
  </div>
</body>
</html>`;

        const emailText = `Ciao ${lead.nome},

Mancano solo ${daysUntilWorkshop} giorni al workshop e vogliamo condividere con te un caso reale di successo.

📊 Case Study: PMI Veneta
Azienda: PMI manifatturiera, 15 dipendenti, fatturato 8M€
Problema iniziale: Lead gestiti manualmente, email perse, nessuna automazione
Soluzione implementata: Sistema completo (landing + CRM + automazioni) in 30 giorni

🎯 Risultati in 30 giorni:
✅ +40% lead gestiti senza aumentare personale
✅ -60% tempo speso su attività ripetitive
✅ 100% lead seguiti (prima il 30% si perdeva)
✅ Dashboard real-time per vedere numeri in tempo reale

"Finalmente ho messo ordine nella digitalizzazione. Ora so esattamente da dove arrivano i lead e posso seguire tutti senza perdere nessuno." - Imprenditore

🎯 Al workshop vedrai esattamente come hanno fatto:
- Step-by-step il processo di implementazione
- Il sistema reale in azione (non teoria!)
- Come hanno automatizzato email e follow-up
- La dashboard che usano ogni giorno

💡 Non dimenticare: Se non l'hai ancora fatto, compila il Test di Maturità Digitale:
${BASE_URL}/test-maturita-digitale

📅 Dettagli Evento:
Data: ${WORKSHOP_DATE}
Orario: ${WORKSHOP_TIME}
Luogo: ${WORKSHOP_LOCATION}

Non vediamo l'ora di vederti! 🚀

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia`;

        await Promise.all([
          sendEmail({
            to: lead.email,
            subject: '💡 Case Study: come una PMI ha automatizzato in 30 giorni',
            html: emailHtml,
            text: emailText,
          }),
          new Promise(resolve => setTimeout(resolve, 500)).then(() => {
            const notificationText = `Email follow-up 10 giorni inviata a ${lead.nome} ${lead.cognome} (${lead.email}):
            
ID Lead: ${lead.id}
Data invio: ${new Date().toLocaleString('it-IT')}
Giorni rimanenti: ${daysUntilWorkshop}`;
            
            return sendEmail({
              to: NOTIFICATION_EMAIL,
              subject: `📧 Email 10 giorni inviata - ${lead.nome} ${lead.cognome}`,
              text: notificationText,
            }).catch((err) => {
              console.error('[WORKSHOP] Errore invio notifica 10 giorni (non bloccante):', err);
              return false;
            });
          }),
        ]);

        // Aggiorna metadata
        metadata.email_10_giorni_sent = new Date().toISOString();
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

