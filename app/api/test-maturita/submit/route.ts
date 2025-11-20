import { NextRequest, NextResponse } from 'next/server';
import { testMaturitaSchema } from '@/lib/validators';
import { createServerClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

const CONTACT_EMAIL = 'e.rizzi@osmpartnervenezia.it';
const NOTIFICATION_EMAIL = 'enricorizzi1991@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = testMaturitaSchema.parse({
      risposte: body.risposte,
      nome: body.nome,
      cognome: body.cognome,
      email: body.email,
      azienda: body.azienda,
    });

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('test_maturita_digitale')
      .insert({
        nome: validatedData.nome,
        cognome: validatedData.cognome,
        email: validatedData.email,
        azienda: validatedData.azienda,
        risposte: validatedData.risposte,
        punteggio_totale: body.punteggio_totale || 0,
        punteggio_per_categoria: body.punteggio_per_categoria || {},
        livello_maturita: body.livello_maturita || 'Iniziale',
        raccomandazioni: body.raccomandazioni || [],
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

    // Prepara risultati per email
    const percentage = body.percentage || 0;
    const livelloMaturita = body.livello_maturita || 'Iniziale';
    const punteggioPerCategoria = body.punteggio_per_categoria || {};
    const raccomandazioni = body.raccomandazioni || [];

    // Email con risultati all'utente
    const userEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">📊 Risultati Test di Maturità Digitale</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${validatedData.nome}</strong>,</p>
    
    <p>Grazie per aver completato il Test di Maturità Digitale!</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; text-align: center;">
      <h2 style="margin-top: 0; color: #667eea;">Il Tuo Livello di Maturità</h2>
      <div style="font-size: 48px; font-weight: bold; color: #667eea; margin: 10px 0;">
        ${percentage.toFixed(0)}%
      </div>
      <div style="font-size: 24px; font-weight: semibold; color: #333; margin-bottom: 10px;">
        ${livelloMaturita}
      </div>
    </div>
    
    <h3 style="color: #667eea; margin-top: 30px;">Punteggio per Categoria:</h3>
    ${Object.entries(punteggioPerCategoria).map(([category, score]: [string, any]) => {
      // Calcola max per categoria (semplificato, dovresti passare anche questo)
      const categoryMax = 10; // Placeholder
      const percentage = (score / categoryMax) * 100;
      return `
        <div style="margin: 15px 0;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="font-weight: semibold;">${category}</span>
            <span style="color: #666;">${score} / ${categoryMax} (${percentage.toFixed(0)}%)</span>
          </div>
          <div style="width: 100%; background: #e0e0e0; border-radius: 4px; height: 8px;">
            <div style="background: ${percentage >= 70 ? '#4caf50' : percentage >= 40 ? '#ff9800' : '#f44336'}; height: 8px; border-radius: 4px; width: ${percentage}%;"></div>
          </div>
        </div>
      `;
    }).join('')}
    
    ${raccomandazioni.length > 0 ? `
      <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; margin: 20px 0; border-radius: 4px;">
        <h3 style="margin-top: 0; color: #1976d2;">💡 Raccomandazioni</h3>
        <ul style="margin: 0; padding-left: 20px;">
          ${raccomandazioni.map((rec: string) => `<li style="margin: 5px 0;">${rec}</li>`).join('')}
        </ul>
      </div>
    ` : ''}
    
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>💡 Prossimo passo:</strong> Prenota un Check-up Digitale Gratuito per scoprire come migliorare la tua maturità digitale.</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.NEXT_PUBLIC_CALENDLY_CHECKUP_URL || 'https://calendly.com/enricorizzi/check-up-gratuito-in-azienda'}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Prenota Check-up Gratuito</a>
    </div>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi</strong><br>
    <span style="color: #667eea;">OSM Partner Venezia</span></p>
  </div>
</body>
</html>`;

    const userEmailText = `Ciao ${validatedData.nome},

Grazie per aver completato il Test di Maturità Digitale!

Il Tuo Livello di Maturità: ${percentage.toFixed(0)}% - ${livelloMaturita}

Punteggio per Categoria:
${Object.entries(punteggioPerCategoria).map(([category, score]: [string, any]) => `- ${category}: ${score} punti`).join('\n')}

${raccomandazioni.length > 0 ? `\nRaccomandazioni:\n${raccomandazioni.map((rec: string) => `- ${rec}`).join('\n')}\n` : ''}

💡 Prossimo passo: Prenota un Check-up Digitale Gratuito per scoprire come migliorare la tua maturità digitale.

${process.env.NEXT_PUBLIC_CALENDLY_CHECKUP_URL || 'https://calendly.com/enricorizzi/check-up-gratuito-in-azienda'}

A presto,
Enrico Rizzi
OSM Partner Venezia`;

    // Invia email in modo asincrono (non bloccare la risposta)
    // Le email vengono inviate in background, se falliscono non blocca la risposta
    Promise.all([
      validatedData.email ? sendEmail({
        to: validatedData.email,
        subject: `📊 Risultati Test di Maturità Digitale - ${livelloMaturita}`,
        html: userEmailHtml,
        text: userEmailText,
      }).catch((err) => {
        console.error('[TEST] Errore invio email utente (non bloccante):', err);
        return false;
      }) : Promise.resolve(true),
      new Promise(resolve => setTimeout(resolve, 500)).then(() => {
        const notificationText = `Nuova compilazione Test di Maturità Digitale:

📋 Dati compilatore:
Nome: ${validatedData.nome} ${validatedData.cognome}
Email: ${validatedData.email}
${validatedData.azienda ? `Azienda: ${validatedData.azienda}` : ''}

📊 Risultati:
Livello: ${livelloMaturita}
Punteggio: ${percentage.toFixed(0)}%
Punteggio totale: ${body.punteggio_totale || 0}

Punteggio per Categoria:
${Object.entries(punteggioPerCategoria).map(([category, score]: [string, any]) => `- ${category}: ${score}`).join('\n')}

${raccomandazioni.length > 0 ? `\nRaccomandazioni:\n${raccomandazioni.map((rec: string) => `- ${rec}`).join('\n')}\n` : ''}

ID Test: ${data.id}
Data compilazione: ${new Date().toLocaleString('it-IT')}`;

        return sendEmail({
          to: NOTIFICATION_EMAIL,
          subject: `📊 Nuova compilazione Test Maturità Digitale - ${validatedData.nome} ${validatedData.cognome} (${livelloMaturita})`,
          text: notificationText,
        }).catch((err) => {
          console.error('[TEST] Errore invio email notifica (non bloccante):', err);
          return false;
        });
      })
    ]).catch((err) => {
      console.error('[TEST] Errore generale invio email (non bloccante):', err);
    });

    // Ritorna subito la risposta senza aspettare le email
    return NextResponse.json({
      success: true,
      id: data.id,
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

