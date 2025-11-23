import { NextRequest, NextResponse } from 'next/server';
import { testMaturitaSchema } from '@/lib/validators';
import { createServerClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

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
        livello_description: body.livello_description || null,
        percentage: body.percentage || null,
        // Campi premium v2.0
        profilazione: body.profilazione || null,
        colli_bottiglia: body.colli_bottiglia || null,
        collo_bottiglia_primario: body.collo_bottiglia_primario || null,
        capacita_crescita: body.capacita_crescita || null,
        diagnosi: body.diagnosi || null,
        priorita_azione: body.priorita_azione || null,
        roadmap_scalabilita: body.roadmap_scalabilita || null,
        investimento_suggerito: body.investimento_suggerito || null,
        benchmark: body.benchmark || null,
        roadmap_pilastri: body.roadmap_pilastri || null,
        risorse_bonus: body.risorse_bonus || null,
        next_steps: body.next_steps || null,
        // Campi legacy (per retrocompatibilità)
        quick_wins: body.quick_wins || null,
        piano_30_60_90: body.piano_30_60_90 || null,
        roi_stimato: body.roi_stimato || null,
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
    const radarChartImage = body.radar_chart_image;
    const colliIdentificati = body.colli_identificati || [];
    const roadmapScalabilita = body.roadmap_scalabilita;
    const diagnosi = body.diagnosi;

    // Preparazione allegati
    const attachments = [];
    if (radarChartImage) {
      const base64Data = radarChartImage.replace(/^data:image\/png;base64,/, "");
      attachments.push({
        filename: 'radar-chart.png',
        content: base64Data,
        encoding: 'base64',
        cid: 'radar-chart-image'
      });
    }

    // Email con risultati all'utente - TEMPLATE PREMIUM
    const userEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f4f5;">
  
  <!-- HEADER -->
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 0 0 20px 20px;">
    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">Test Digitalizzazione Aziendale</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Report Ufficiale dei Risultati</p>
  </div>
  
  <div style="padding: 20px;">
    
    <!-- INTRO -->
    <div style="background: white; padding: 30px; border-radius: 16px; margin-top: -30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <p style="font-size: 18px; margin-bottom: 20px; color: #4b5563;">Ciao <strong>${validatedData.nome}</strong>,</p>
      <p style="color: #4b5563;">Ecco l'analisi completa della maturità digitale della tua azienda. Abbiamo analizzato le tue risposte per identificare i punti di forza e, soprattutto, i colli di bottiglia che stanno frenando la tua crescita.</p>
      
      <!-- SCORE CARD -->
      <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f3f4f6; border-radius: 12px;">
        <p style="margin: 0; font-size: 14px; text-transform: uppercase; color: #6b7280; font-weight: 600;">Il Tuo Digital Score</p>
        <div style="font-size: 56px; font-weight: 800; color: #7c3aed; line-height: 1;">${percentage.toFixed(0)}%</div>
        <div style="font-size: 20px; font-weight: 600; color: #4b5563; margin-top: 5px;">${livelloMaturita}</div>
        <div style="margin-top: 15px; height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden;">
          <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #7c3aed, #2563eb);"></div>
        </div>
      </div>

      <!-- RADAR CHART -->
      ${radarChartImage ? `
      <div style="text-align: center; margin: 30px 0;">
        <h3 style="color: #1f2937; font-size: 18px; margin-bottom: 15px;">📊 La Tua Mappa Digitale</h3>
        <img src="cid:radar-chart-image" alt="Radar Chart Risultati" style="width: 100%; max-width: 500px; height: auto; border-radius: 8px; border: 1px solid #e5e7eb;">
        <p style="font-size: 12px; color: #6b7280; margin-top: 10px;">Confronto: Tuo Score (Viola) vs Media Settore (Blu) vs Top 10% (Verde)</p>
      </div>
      ` : ''}

      <!-- DIAGNOSI & COLLI DI BOTTIGLIA -->
      <div style="margin: 40px 0;">
        <h3 style="color: #1f2937; font-size: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">🚫 Colli di Bottiglia Identificati</h3>
        
        ${colliIdentificati.length > 0 ? colliIdentificati.map((collo: any) => `
        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin-bottom: 15px; border-radius: 0 8px 8px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="background: #ef4444; color: white; font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 10px; margin-right: 10px;">${collo.severity}</span>
            <strong style="color: #991b1b; font-size: 16px;">${collo.specifico}</strong>
          </div>
          <p style="margin: 0; color: #7f1d1d; font-size: 14px;">${collo.raccomandazioni[0]}</p>
        </div>
        `).join('') : '<p>Nessun collo di bottiglia critico identificato.</p>'}
      </div>

      <!-- ROADMAP SCALABILITÀ -->
      ${roadmapScalabilita ? `
      <div style="margin: 40px 0;">
        <h3 style="color: #1f2937; font-size: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">🚀 Roadmap di Scalabilità</h3>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; border: 1px solid #bbf7d0;">
          <h4 style="margin: 0 0 10px 0; color: #166534;">Fase 1: ${roadmapScalabilita.fase1.titolo}</h4>
          <p style="margin: 0 0 15px 0; font-size: 14px; color: #15803d;">Durata stimata: ${roadmapScalabilita.fase1.durata}</p>
          <ul style="margin: 0; padding-left: 20px; color: #14532d;">
            ${roadmapScalabilita.fase1.azioni.map((azione: string) => `<li style="margin-bottom: 5px;">${azione}</li>`).join('')}
          </ul>
        </div>
      </div>
      ` : ''}

      <!-- CTA -->
      <div style="background: #fffbeb; border: 1px solid #fcd34d; padding: 25px; border-radius: 12px; margin: 40px 0; text-align: center;">
        <h3 style="margin: 0 0 10px 0; color: #92400e;">Vuoi implementare questo piano?</h3>
        <p style="margin: 0 0 20px 0; color: #b45309; font-size: 14px;">Prenota una sessione strategica gratuita di 45 minuti per analizzare questi risultati insieme.</p>
        <a href="${process.env.NEXT_PUBLIC_CALENDLY_CHECKUP_URL || 'https://calendly.com/enricorizzi/check-up-gratuito-in-azienda'}" style="display: inline-block; background: #d97706; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Prenota Check-up Gratuito</a>
      </div>

      <p style="margin-top: 30px; font-size: 14px; color: #6b7280; text-align: center;">
        A presto,<br>
        <strong>Enrico Rizzi</strong><br>
        OSM Partner Venezia
      </p>
    </div>
    
    <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #9ca3af;">
      &copy; ${new Date().getFullYear()} Enrico Rizzi. Tutti i diritti riservati.
    </div>
  </div>
</body>
</html>`;

    const userEmailText = `Ciao ${validatedData.nome},

Ecco i risultati del tuo Test Digitalizzazione Aziendale.

IL TUO SCORE: ${percentage.toFixed(0)}% - ${livelloMaturita}

COLLI DI BOTTIGLIA IDENTIFICATI:
${colliIdentificati.map((c: any) => `- [${c.severity}] ${c.specifico}: ${c.raccomandazioni[0]}`).join('\n')}

ROADMAP SCALABILITÀ - FASE 1:
${roadmapScalabilita?.fase1.titolo} (${roadmapScalabilita?.fase1.durata})
${roadmapScalabilita?.fase1.azioni.map((a: string) => `- ${a}`).join('\n')}

Prenota il tuo Check-up Gratuito qui:
${process.env.NEXT_PUBLIC_CALENDLY_CHECKUP_URL || 'https://calendly.com/enricorizzi/check-up-gratuito-in-azienda'}

A presto,
Enrico Rizzi`;

    // Invia email in modo asincrono (non bloccare la risposta)
    Promise.all([
      validatedData.email ? sendEmail({
        to: validatedData.email,
        subject: `📊 Il Tuo Report Digitalizzazione Aziendale - ${livelloMaturita}`,
        html: userEmailHtml,
        text: userEmailText,
        attachments: attachments
      }).catch((err) => {
        console.error('[TEST] Errore invio email utente (non bloccante):', err);
        return false;
      }) : Promise.resolve(true),
      new Promise(resolve => setTimeout(resolve, 500)).then(() => {
        const notificationText = `Nuova compilazione Test Digitalizzazione Aziendale:

📋 Dati compilatore:
Nome: ${validatedData.nome} ${validatedData.cognome}
Email: ${validatedData.email}
${validatedData.azienda ? `Azienda: ${validatedData.azienda}` : ''}

📊 Risultati:
Livello: ${livelloMaturita}
Punteggio: ${percentage.toFixed(0)}%
Collo Primario: ${body.collo_bottiglia_primario}

ID Test: ${data.id}
Data compilazione: ${new Date().toLocaleString('it-IT')}`;

        return sendEmail({
          to: NOTIFICATION_EMAIL,
          subject: `🔔 LEAD TEST: ${validatedData.nome} ${validatedData.cognome} (${percentage.toFixed(0)}%)`,
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

