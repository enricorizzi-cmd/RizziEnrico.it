import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

const TEST_EMAIL = 'enricorizzi1991@gmail.com';
const NOTIFICATION_EMAIL = 'enricorizzi1991@gmail.com';
const WORKSHOP_DATE = '12 dicembre 2024';
const WORKSHOP_TIME = '18:00';
const WORKSHOP_LOCATION = 'OSM Partner Venezia';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';
const CALENDLY_CHECKUP_URL = process.env.NEXT_PUBLIC_CALENDLY_CHECKUP_URL || 'https://calendly.com/enricorizzi/check-up-gratuito-in-azienda';

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
    
    // Crea un lead di test se non esiste
    const { data: existingLead } = await supabase
      .from('workshop_leads')
      .select('*')
      .eq('email', TEST_EMAIL)
      .eq('evento', 'Workshop 12.12.2024')
      .limit(1)
      .single();

    let testLead;
    if (existingLead) {
      testLead = existingLead;
    } else {
      const { data: newLead, error: createError } = await supabase
        .from('workshop_leads')
        .insert({
          nome: 'Test',
          cognome: 'Email',
          email: TEST_EMAIL,
          telefono: '0000000000',
          azienda: 'Test Azienda',
          ruolo: 'Titolare',
          provincia: 'Venezia',
          fonte: 'Altro',
          problema: 'Test invio email',
          evento: 'Workshop 12.12.2024',
          stato: 'nuovo',
        })
        .select()
        .single();

      if (createError) {
        return NextResponse.json(
          { error: 'Errore nella creazione lead di test' },
          { status: 500 }
        );
      }
      testLead = newLead;
    }

    const lead = testLead;
    const emailResults: Array<{ type: string; success: boolean; error?: string }> = [];

    // 1. Email Conferma Iscrizione
    try {
      const confirmEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Registrazione Confermata!</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${lead.nome}</strong>,</p>
    
    <p>Grazie per esserti iscritto al workshop:</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h2 style="margin-top: 0; color: #667eea;">"Automatizza la tua Azienda: AI & Digitalizzazione"</h2>
      <p style="margin: 10px 0;"><strong>📅 Data:</strong> ${WORKSHOP_DATE}</p>
      <p style="margin: 10px 0;"><strong>🕐 Orario:</strong> ${WORKSHOP_TIME}</p>
      <p style="margin: 10px 0;"><strong>📍 Luogo:</strong> ${WORKSHOP_LOCATION}</p>
    </div>
    
    <h3 style="color: #667eea; margin-top: 30px;">Cosa ti porterai a casa:</h3>
    <ul style="line-height: 2;">
      <li>✅ Un sistema concreto di digitalizzazione che puoi replicare</li>
      <li>✅ Demo live di automazioni e AI per PMI</li>
      <li>✅ Starter Kit: checklist pratica per digitalizzare la tua PMI</li>
      <li>✅ Accesso al test di maturità digitale</li>
    </ul>
    
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>💡 Prossimo passo:</strong> Compila il <a href="${BASE_URL}/test-maturita-digitale" style="color: #667eea; font-weight: bold;">Test di Maturità Digitale</a> per capire da dove partire.</p>
    </div>
    
    <p style="margin-top: 30px;">Riceverai un promemoria il giorno prima dell'evento con tutti i dettagli.</p>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <span style="color: #667eea;">OSM Partner Venezia</span></p>
  </div>
</body>
</html>`;

      const confirmEmailText = `Ciao ${lead.nome},

Grazie per esserti iscritto al workshop "Automatizza la tua Azienda: AI & Digitalizzazione"!

📅 Data: ${WORKSHOP_DATE}
🕐 Orario: ${WORKSHOP_TIME}
📍 Luogo: ${WORKSHOP_LOCATION}

Cosa ti porterai a casa:
✅ Un sistema concreto di digitalizzazione che puoi replicare
✅ Demo live di automazioni e AI per PMI
✅ Starter Kit: checklist pratica per digitalizzare la tua PMI
✅ Accesso al test di maturità digitale

💡 Prossimo passo: Compila il Test di Maturità Digitale qui:
${BASE_URL}/test-maturita-digitale

Riceverai un promemoria il giorno prima dell'evento.

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia`;

      await sendEmail({
        to: TEST_EMAIL,
        subject: '🎉 [TEST] Registrazione Workshop Confermata - Automatizza la tua Azienda',
        html: confirmEmailHtml,
        text: confirmEmailText,
        emailId: 'test_conferma',
        leadId: lead.id,
      });
      emailResults.push({ type: 'Conferma Iscrizione', success: true });
    } catch (error: any) {
      emailResults.push({ type: 'Conferma Iscrizione', success: false, error: error.message });
    }

    // 2. Email T+5
    try {
      const daysRemaining = 7; // Simulato
      const emailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🎯 Preparati al Meglio</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${lead.nome}</strong>,</p>
    
    <p>Siamo felici che tu sia iscritto al workshop <strong>"Automatizza la tua Azienda: AI & Digitalizzazione"</strong>!</p>
    
    <p>Mancano ancora <strong>${daysRemaining} giorni</strong> e vogliamo aiutarti a prepararti al meglio per trarre il massimo dall'evento.</p>
    
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
    </div>
    
    <p style="margin-top: 30px;">Ci vediamo presto! 🚀</p>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <span style="color: #667eea;">OSM Partner Venezia</span></p>
  </div>
</body>
</html>`;

      await sendEmail({
        to: TEST_EMAIL,
        subject: '🎯 [TEST] A 5 giorni dal workshop: preparati al meglio',
        html: emailHtml,
        text: `Test email T+5`,
        emailId: 'test_5_giorni',
        leadId: lead.id,
      });
      emailResults.push({ type: 'Email T+5', success: true });
    } catch (error: any) {
      emailResults.push({ type: 'Email T+5', success: false, error: error.message });
    }

    // 3. Email T+10
    try {
      const daysUntilWorkshop = 2; // Simulato
      const emailHtml = `
<!DOCTYPE html>
<html>
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
    </div>
    
    <p style="margin-top: 30px;">Non vediamo l'ora di vederti! 🚀</p>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <span style="color: #667eea;">OSM Partner Venezia</span></p>
  </div>
</body>
</html>`;

      await sendEmail({
        to: TEST_EMAIL,
        subject: '💡 [TEST] Case Study: come una PMI ha automatizzato in 30 giorni',
        html: emailHtml,
        text: `Test email T+10`,
        emailId: 'test_10_giorni',
        leadId: lead.id,
      });
      emailResults.push({ type: 'Email T+10', success: true });
    } catch (error: any) {
      emailResults.push({ type: 'Email T+10', success: false, error: error.message });
    }

    // 4. Email T-3
    try {
      const emailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">⏰ Solo 3 Giorni!</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${lead.nome}</strong>,</p>
    
    <p>Ci siamo quasi! Solo <strong>3 giorni</strong> al workshop "Automatizza la tua Azienda: AI & Digitalizzazione".</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; text-align: center;">
      <h2 style="margin-top: 0; color: #667eea; font-size: 32px;">📅 12 Dicembre 2024</h2>
      <p style="font-size: 24px; margin: 10px 0; color: #667eea;"><strong>🕐 18:00</strong></p>
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
    
    <p style="margin-top: 30px;">A presto! 🚀</p>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <span style="color: #667eea;">OSM Partner Venezia</span></p>
  </div>
</body>
</html>`;

      await sendEmail({
        to: TEST_EMAIL,
        subject: '⏰ [TEST] Solo 3 giorni! Preparati per il workshop',
        html: emailHtml,
        text: `Test email T-3`,
        emailId: 'test_3_giorni',
        leadId: lead.id,
      });
      emailResults.push({ type: 'Email T-3', success: true });
    } catch (error: any) {
      emailResults.push({ type: 'Email T-3', success: false, error: error.message });
    }

    // 5. Email T+0 (giorno evento)
    try {
      const emailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 32px;">🚀 Oggi è il Giorno!</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 20px; margin-bottom: 20px; font-weight: bold;">Ciao <strong>${lead.nome}</strong>,</p>
    
    <p style="font-size: 18px; margin-bottom: 20px;">Oggi è il giorno! Stasera alle <strong>18:00</strong> ti aspettiamo al workshop <strong>"Automatizza la tua Azienda: AI & Digitalizzazione"</strong>.</p>
    
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 8px; margin: 20px 0; text-align: center; color: white;">
      <h2 style="margin: 0; font-size: 28px;">📅 ${WORKSHOP_DATE}</h2>
      <p style="margin: 10px 0 0 0; font-size: 24px;"><strong>🕐 ${WORKSHOP_TIME}</strong></p>
      <p style="margin: 10px 0 0 0; font-size: 18px;">📍 ${WORKSHOP_LOCATION}</p>
    </div>
    
    <p style="margin-top: 30px; text-align: center; font-size: 18px; font-weight: bold; color: #667eea;">Ci vediamo stasera! 🎉</p>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <span style="color: #667eea;">OSM Partner Venezia</span></p>
  </div>
</body>
</html>`;

      await sendEmail({
        to: TEST_EMAIL,
        subject: '🚀 [TEST] Oggi è il giorno! Ti aspettiamo stasera alle 18:00',
        html: emailHtml,
        text: `Test email T+0`,
        emailId: 'test_giorno_evento',
        leadId: lead.id,
      });
      emailResults.push({ type: 'Email T+0', success: true });
    } catch (error: any) {
      emailResults.push({ type: 'Email T+0', success: false, error: error.message });
    }

    // 6. Email Post-Evento Immediata
    try {
      const emailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Grazie!</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${lead.nome}</strong>,</p>
    
    <p>Grazie per essere stato al workshop "Automatizza la tua Azienda: AI & Digitalizzazione"!</p>
    
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
    <span style="color: #667eea;">OSM Partner Venezia</span></p>
  </div>
</body>
</html>`;

      await sendEmail({
        to: TEST_EMAIL,
        subject: '🎉 [TEST] Grazie per essere stato al workshop!',
        html: emailHtml,
        text: `Test email post-evento`,
        emailId: 'test_post_immediata',
        leadId: lead.id,
      });
      emailResults.push({ type: 'Email Post-Evento Immediata', success: true });
    } catch (error: any) {
      emailResults.push({ type: 'Email Post-Evento Immediata', success: false, error: error.message });
    }

    return NextResponse.json({
      success: true,
      message: 'Test email completato',
      lead_id: lead.id,
      results: emailResults,
      total_sent: emailResults.filter(r => r.success).length,
      total_failed: emailResults.filter(r => !r.success).length,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

