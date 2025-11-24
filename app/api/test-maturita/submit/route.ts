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

    // Prepara dati per il salvataggio
    const insertData = {
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
      colli_bottiglia: body.colli_identificati || body.colli_bottiglia || null, // Salva array top 3 colli
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
    };

    // Log dimensioni dati per debug
    const dataSize = JSON.stringify(insertData).length;
    console.log('[TEST] 📊 Tentativo salvataggio test:', {
      email: validatedData.email,
      nome: validatedData.nome,
      cognome: validatedData.cognome,
      dataSize: `${(dataSize / 1024).toFixed(2)} KB`,
      timestamp: new Date().toISOString(),
    });

    const { data, error } = await supabase
      .from('test_maturita_digitale')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('[TEST] ❌ Errore Supabase durante salvataggio:', {
        error: error,
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        email: validatedData.email,
        nome: validatedData.nome,
        cognome: validatedData.cognome,
        dataSize: `${(dataSize / 1024).toFixed(2)} KB`,
        timestamp: new Date().toISOString(),
      });
      
      // Log dimensioni campi JSONB per identificare problemi
      if (body.profilazione) {
        console.error('[TEST] Dimensione profilazione:', JSON.stringify(body.profilazione).length, 'bytes');
      }
      if (body.roadmap_scalabilita) {
        console.error('[TEST] Dimensione roadmap_scalabilita:', JSON.stringify(body.roadmap_scalabilita).length, 'bytes');
      }
      if (body.roadmap_pilastri) {
        console.error('[TEST] Dimensione roadmap_pilastri:', JSON.stringify(body.roadmap_pilastri).length, 'bytes');
      }
      
      return NextResponse.json(
        { 
          error: 'Errore nel salvataggio',
          details: error.message || 'Errore sconosciuto',
          code: error.code,
        },
        { status: 500 }
      );
    }

    console.log('[TEST] ✅ Test salvato con successo:', {
      id: data.id,
      email: validatedData.email,
      timestamp: new Date().toISOString(),
    });

    // Prepara dati email
    const percentage = body.percentage || 0;
    const livelloMaturita = body.livello_maturita || 'Iniziale';
    const radarChartImage = body.radar_chart_image;
    const colliIdentificati = body.colli_identificati || [];
    const roadmapScalabilita = body.roadmap_scalabilita;
    const diagnosi = body.diagnosi;
    const prioritaAzione = body.priorita_azione || [];
    const capacitaCrescita = body.capacita_crescita || null;
    const nextSteps = body.next_steps || null;

    // Preparazione allegati
    const attachments = [];
    if (radarChartImage) {
      // Estrai base64 e rimuovi eventuali spazi/newline che potrebbero corrompere l'immagine
      let base64Data = radarChartImage.replace(/^data:\/image\/png;base64,/, "");
      base64Data = base64Data.replace(/\s/g, ""); // Rimuovi tutti gli spazi/newline
      
      // Valida che il base64 sia valido
      if (base64Data && base64Data.length > 0) {
        attachments.push({
          filename: 'radar-chart.png',
          content: base64Data,
          encoding: 'base64',
          contentType: 'image/png', // Content-type esplicito
          cid: 'radar-chart-image' // CID per riferimento inline nell'HTML
        });
        
        console.log('[TEST] 📎 Allegato radar chart preparato:', {
          filename: 'radar-chart.png',
          size: `${(base64Data.length * 3 / 4 / 1024).toFixed(2)} KB`, // Dimensione approssimativa
          hasContent: !!base64Data,
          timestamp: new Date().toISOString(),
        });
      } else {
        console.warn('[TEST] ⚠️ Base64 radar chart vuoto o non valido, allegato non aggiunto');
      }
    }

    // Email con risultati all'utente - TEMPLATE PREMIUM COMPATTO (70%)
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

      <!-- RADAR CHART - 7 PILASTRI -->
      ${radarChartImage ? `
      <div style="text-align: center; margin: 30px 0;">
        <h3 style="color: #7c3aed; font-size: 18px; margin-bottom: 10px; font-weight: 700;">📊 Analisi Radar - 7 Pilastri</h3>
        <img src="cid:radar-chart-image" alt="Radar Chart 7 Pilastri" style="width: 100%; max-width: 500px; height: auto; border-radius: 8px; border: 1px solid #e5e7eb;">
        <p style="font-size: 11px; color: #6b7280; margin-top: 8px;">Tuo Score (Viola) vs Media Settore (Blu) vs Top 10% (Verde)</p>
      </div>
      ` : ''}

      <!-- DIAGNOSI + CAPACITÀ CRESCITA -->
      ${diagnosi ? `
      <div style="margin: 30px 0;">
        <h3 style="color: #1f2937; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px;">📍 Diagnosi Personalizzata</h3>
        <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">${diagnosi.livello || ''}</p>
        ${capacitaCrescita ? `
        <div style="background: ${capacitaCrescita === '+30%' ? '#fff7ed' : capacitaCrescita === '+60%' ? '#fef9c3' : '#f0fdf4'}; border-left: 4px solid ${capacitaCrescita === '+30%' ? '#f97316' : capacitaCrescita === '+60%' ? '#eab308' : '#10b981'}; padding: 15px; border-radius: 0 8px 8px 0; margin-top: 15px;">
          <strong style="color: #1f2937;">📈 Capacità di Crescita Attuale: <span style="font-size: 20px; color: ${capacitaCrescita === '+30%' ? '#ea580c' : capacitaCrescita === '+60%' ? '#ca8a04' : '#059669'};">${capacitaCrescita}</span></strong>
        </div>
        ` : ''}
      </div>
      ` : ''}

      <!-- TOP 3 COLLI DI BOTTIGLIA -->
      <div style="margin: 30px 0;">
        <h3 style="color: #1f2937; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px;">⚠️ TOP 3 COLLI DI BOTTIGLIA</h3>
        
        ${colliIdentificati.length > 0 ? colliIdentificati.slice(0, 3).map((collo: any, idx: number) => `
        <div style="background: ${collo.severity === 'CRITICO' ? '#fef2f2' : collo.severity === 'ALTO' ? '#fff7ed' : '#fefce8'}; border-left: 4px solid ${collo.severity === 'CRITICO' ? '#ef4444' : collo.severity === 'ALTO' ? '#f97316' : '#eab308'}; padding: 15px; margin-bottom: 12px; border-radius: 0 8px 8px 0;">
          <div style="margin-bottom: 8px;">
            <span style="color: #6b7280; font-size: 16px; font-weight: 700; margin-right: 8px;">#${idx + 1}</span>
            <span style="background: ${collo.severity === 'CRITICO' ? '#ef4444' : collo.severity === 'ALTO' ? '#f97316' : '#eab308'}; color: white; font-size: 10px; font-weight: bold; padding: 3px 8px; border-radius: 10px; margin-right: 8px;">${collo.severity}</span>
          </div>
          <strong style="color: #1f2937; font-size: 15px;">${collo.specifico}</strong>
          <p style="margin: 8px 0 0 0; color: #4b5563; font-size: 13px;">✓ ${collo.raccomandazioni?.[0] || ''}</p>
        </div>
        `).join('') : '<p style="color: #6b7280;">Nessun collo critico identificato.</p>'}
      </div>

      <!-- TOP 3 PRIORITÀ D'AZIONE -->
      ${prioritaAzione.length > 0 ? `
      <div style="margin: 30px 0;">
        <h3 style="color: #1f2937; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px;">🎯 Priorità d'Azione</h3>
        
        ${prioritaAzione.slice(0, 3).map((priorita: any, idx: number) => `
        <div style="background: ${priorita.livello === 'CRITICA' ? '#fef2f2' : priorita.livello === 'ALTA' ? '#fff7ed' : '#fefce8'}; padding: 15px; margin-bottom: 12px; border-radius: 8px; border: 1px solid ${priorita.livello === 'CRITICA' ? '#fecaca' : priorita.livello === 'ALTA' ? '#fed7aa' : '#fef08a'};">
          <div style="margin-bottom: 8px;">
            <span style="background: ${priorita.livello === 'CRITICA' ? '#dc2626' : priorita.livello === 'ALTA' ? '#ea580c' : '#ca8a04'}; color: white; font-size: 10px; font-weight: bold; padding: 3px 8px; border-radius: 10px; text-transform: uppercase;">${priorita.livello}</span>
            <span style="background: #3b82f6; color: white; font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 10px; margin-left: 6px;">⏱️ ${priorita.tempo_implementazione}</span>
          </div>
          <strong style="color: #1f2937; font-size: 14px;">${idx + 1}. ${priorita.azione}</strong>
          <p style="margin: 6px 0 0 0; color: #6b7280; font-size: 12px;">📈 <strong>Impatto:</strong> ${priorita.impatto}</p>
        </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- ROADMAP SCALABILITÀ - 3 FASI -->
      ${roadmapScalabilita ? `
      <div style="margin: 30px 0;">
        <h3 style="color: #1f2937; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px;">🚀 Roadmap Scalabilità (3 Fasi)</h3>
        
        ${['fase1', 'fase2', 'fase3'].map((fase, faseIdx) => roadmapScalabilita[fase] ? `
        <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border: 1px solid #bbf7d0; margin-bottom: 12px;">
          <h4 style="margin: 0 0 8px 0; color: #166534; font-size: 15px;">Fase ${faseIdx + 1}: ${roadmapScalabilita[fase].titolo}</h4>
          <p style="margin: 0 0 10px 0; font-size: 12px; color: #15803d;"><strong>Durata:</strong> ${roadmapScalabilita[fase].durata} | <strong>Target:</strong> ${roadmapScalabilita[fase].target_crescita}</p>
          ${roadmapScalabilita[fase].azioni ? `
          <ul style="margin: 0; padding-left: 18px; color: #14532d; font-size: 13px;">
            ${roadmapScalabilita[fase].azioni.slice(0, 2).map((azione: string) => `<li style="margin-bottom: 4px;">${azione}</li>`).join('')}
          </ul>
          ` : ''}
        </div>
        ` : '').join('')}
      </div>
      ` : ''}

      <!-- NEXT STEPS -->
      ${nextSteps?.questa_settimana ? `
      <div style="margin: 30px 0;">
        <h3 style="color: #1f2937; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px;">🚀 I Tuoi Prossimi Passi</h3>
        
        <div style="background: #faf5ff; padding: 15px; border-radius: 8px; border: 1px solid #e9d5ff;">
          <h4 style="margin: 0 0 10px 0; color: #7c3aed; font-size: 14px; font-weight: 700;">⚡ QUESTA SETTIMANA</h4>
          <ul style="margin: 0; padding-left: 18px; color: #6b21a8; font-size: 13px;">
            ${nextSteps.questa_settimana.slice(0, 3).map((step: string) => `<li style="margin-bottom: 4px;">${step}</li>`).join('')}
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
    console.log('[TEST] 📧 Preparazione invio email risultato:', {
      to: validatedData.email,
      testId: data.id,
      timestamp: new Date().toISOString(),
    });

    Promise.all([
      validatedData.email ? sendEmail({
        to: validatedData.email,
        subject: `📊 Il Tuo Report Digitalizzazione Aziendale - ${livelloMaturita}`,
        html: userEmailHtml,
        text: userEmailText,
        attachments: attachments
      }).then(async (success) => {
        if (success) {
          console.log('[TEST] ✅ Email risultato inviata con successo:', {
            to: validatedData.email,
            testId: data.id,
            timestamp: new Date().toISOString(),
          });

          // Aggiorna metadata per tracciare email inviata
          const { data: currentTest } = await supabase
            .from('test_maturita_digitale')
            .select('metadata')
            .eq('id', data.id)
            .single();

          if (currentTest) {
            const metadata = (currentTest.metadata as any) || {};
            metadata.email_risultato_sent = new Date().toISOString();
            await supabase
              .from('test_maturita_digitale')
              .update({ metadata })
              .eq('id', data.id);
          }
        } else {
          console.error('[TEST] ❌ Email risultato NON inviata (sendEmail ha ritornato false):', {
            to: validatedData.email,
            testId: data.id,
            timestamp: new Date().toISOString(),
          });

          // Traccia anche i fallimenti
          const { data: currentTest } = await supabase
            .from('test_maturita_digitale')
            .select('metadata')
            .eq('id', data.id)
            .single();

          if (currentTest) {
            const metadata = (currentTest.metadata as any) || {};
            metadata.email_risultato_failed = new Date().toISOString();
            await supabase
              .from('test_maturita_digitale')
              .update({ metadata })
              .eq('id', data.id);
          }
        }
        return success;
      }).catch(async (err) => {
        console.error('[TEST] ❌ Errore invio email utente (non bloccante):', {
          error: err,
          message: err?.message,
          to: validatedData.email,
          testId: data.id,
          timestamp: new Date().toISOString(),
        });

        // Traccia errori nel database
        const { data: currentTest } = await supabase
          .from('test_maturita_digitale')
          .select('metadata')
          .eq('id', data.id)
          .single();

        if (currentTest) {
          const metadata = (currentTest.metadata as any) || {};
          metadata.email_risultato_error = {
            timestamp: new Date().toISOString(),
            message: err?.message || 'Unknown error',
          };
          await supabase
            .from('test_maturita_digitale')
            .update({ metadata })
            .eq('id', data.id);
        }

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

⚠️ TOP 3 COLLI DI BOTTIGLIA:
${colliIdentificati.slice(0, 3).map((c: any, i: number) => `${i + 1}. [${c.severity}] ${c.specifico}`).join('\n')}

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

