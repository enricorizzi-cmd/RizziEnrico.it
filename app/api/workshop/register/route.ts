import { NextRequest, NextResponse } from 'next/server';
import { workshopRegistrationSchema } from '@/lib/validators';
import { createServerClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

const CONTACT_EMAIL = 'e.rizzi@osmpartnervenezia.it';
const WORKSHOP_DATE = '12 dicembre 2024';
const WORKSHOP_TIME = '18:00';
const WORKSHOP_LOCATION = 'OSM Partner Venezia'; // Da aggiornare con indirizzo esatto
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

    // Email di conferma al partecipante (PRIMA, così se fallisce il fallback arriva comunque)
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
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${validatedData.nome}</strong>,</p>
    
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
      <p style="margin: 0;"><strong>💡 Prossimo passo:</strong> Compila il <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'}/test-maturita-digitale" style="color: #667eea; font-weight: bold;">Test di Maturità Digitale</a> per capire da dove partire.</p>
    </div>
    
    <p style="margin-top: 30px;">Riceverai un promemoria il giorno prima dell'evento con tutti i dettagli.</p>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <span style="color: #667eea;">OSM Partner Venezia</span></p>
  </div>
</body>
</html>`;

    const confirmEmailText = `Ciao ${validatedData.nome},

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
${process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'}/test-maturita-digitale

Riceverai un promemoria il giorno prima dell'evento.

A presto,
Enrico Rizzi & Francesco Fusano
OSM Partner Venezia`;

    await sendEmail({
      to: validatedData.email,
      subject: '🎉 Registrazione Workshop Confermata - Automatizza la tua Azienda',
      html: confirmEmailHtml,
      text: confirmEmailText,
    });

    // Attendi 1 secondo per evitare rate limit prima di inviare la notifica admin
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Email di notifica a Enrico (DOPO, così non supera il rate limit)
    const emailSubject = `🎯 Nuova registrazione Workshop - ${validatedData.nome} ${validatedData.cognome}`;
    const emailText = `Nuova registrazione al Workshop "Automatizza la tua Azienda: AI & Digitalizzazione":

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

    await sendEmail({
      to: CONTACT_EMAIL,
      subject: emailSubject,
      text: emailText,
    });

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

