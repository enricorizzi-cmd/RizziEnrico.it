import { NextRequest, NextResponse } from 'next/server';
import { workshopRegistrationSchema } from '@/lib/validators';
import { createServerClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

const CONTACT_EMAIL = 'e.rizzi@osmpartnervenezia.it';
const NOTIFICATION_EMAIL = 'enricorizzi1991@gmail.com';
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

    // Invia email in modo asincrono (non bloccare la risposta)
    // Le email vengono inviate in background, se falliscono non blocca la risposta
    Promise.all([
      sendEmail({
        to: validatedData.email,
        subject: '🎉 Registrazione Workshop Confermata - Automatizza la tua Azienda',
        html: confirmEmailHtml,
        text: confirmEmailText,
        emailId: 'email_conferma_iscrizione',
        leadId: lead.id,
      }).then(async () => {
        // Aggiorna metadata per tracciare email conferma inviata
        const { data: currentLead } = await supabase
          .from('workshop_leads')
          .select('metadata')
          .eq('id', lead.id)
          .single();
        
        if (currentLead) {
          const metadata = (currentLead.metadata as any) || {};
          metadata.email_conferma_iscrizione_sent = new Date().toISOString();
          await supabase
            .from('workshop_leads')
            .update({ metadata })
            .eq('id', lead.id);
        }
      }).catch((err) => {
        console.error('[WORKSHOP] Errore invio email conferma (non bloccante):', err);
        return false;
      }),
      new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
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

        return Promise.all([
          sendEmail({
            to: CONTACT_EMAIL,
            subject: emailSubject,
            text: emailText,
          }).catch((err) => {
            console.error('[WORKSHOP] Errore invio email CONTACT_EMAIL (non bloccante):', err);
            return false;
          }),
          sendEmail({
            to: NOTIFICATION_EMAIL,
            subject: emailSubject,
            text: emailText,
          }).catch((err) => {
            console.error('[WORKSHOP] Errore invio email NOTIFICATION_EMAIL (non bloccante):', err);
            return false;
          }),
        ]);
      })
    ]).catch((err) => {
      console.error('[WORKSHOP] Errore generale invio email (non bloccante):', err);
    });

    // REGOLA SPECIALE: Se l'email è enricorizzi1991@gmail.com, invia tutte le email automaticamente per test
    if (validatedData.email.toLowerCase() === 'enricorizzi1991@gmail.com') {
      console.log('[WORKSHOP] 🧪 Email di test rilevata - Invio automatico di tutte le email');
      
      // Invia tutte le email in sequenza con delay
      Promise.all([
        // Email T+5 (simulata)
        new Promise(resolve => setTimeout(resolve, 2000)).then(async () => {
          try {
            const daysRemaining = 7;
            const emailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🎯 Preparati al Meglio</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${validatedData.nome}</strong>,</p>
    
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
    
    <p style="margin-top: 30px;">Ci vediamo presto! 🚀</p>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <span style="color: #667eea;">OSM Partner Venezia</span></p>
  </div>
</body>
</html>`;

            await sendEmail({
              to: validatedData.email,
              subject: '🎯 [AUTO-TEST] A 5 giorni dal workshop: preparati al meglio',
              html: emailHtml,
              text: `Test automatico email T+5`,
              emailId: 'auto_test_5_giorni',
              leadId: lead.id,
            });

            // Aggiorna metadata per tracciare email inviata
            const { data: currentLead } = await supabase
              .from('workshop_leads')
              .select('metadata')
              .eq('id', lead.id)
              .single();
            
            if (currentLead) {
              const metadata = (currentLead.metadata as any) || {};
              metadata.email_5_giorni_sent = new Date().toISOString();
              await supabase
                .from('workshop_leads')
                .update({ metadata })
                .eq('id', lead.id);
            }
          } catch (err) {
            console.error('[WORKSHOP] Errore invio email T+5 automatica:', err);
          }
        }),
        // Email T+10 (simulata)
        new Promise(resolve => setTimeout(resolve, 4000)).then(async () => {
          try {
            const daysUntilWorkshop = 2;
            const emailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">💡 Case Study Reale</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${validatedData.nome}</strong>,</p>
    
    <p>Mancano solo <strong>${daysUntilWorkshop} giorni</strong> al workshop e vogliamo condividere con te un caso reale di successo.</p>
    
    <p style="margin-top: 30px;">Non vediamo l'ora di vederti! 🚀</p>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <span style="color: #667eea;">OSM Partner Venezia</span></p>
  </div>
</body>
</html>`;

            await sendEmail({
              to: validatedData.email,
              subject: '💡 [AUTO-TEST] Case Study: come una PMI ha automatizzato in 30 giorni',
              html: emailHtml,
              text: `Test automatico email T+10`,
              emailId: 'auto_test_10_giorni',
              leadId: lead.id,
            });

            // Aggiorna metadata per tracciare email inviata
            const { data: currentLead } = await supabase
              .from('workshop_leads')
              .select('metadata')
              .eq('id', lead.id)
              .single();
            
            if (currentLead) {
              const metadata = (currentLead.metadata as any) || {};
              metadata.email_10_giorni_sent = new Date().toISOString();
              await supabase
                .from('workshop_leads')
                .update({ metadata })
                .eq('id', lead.id);
            }
          } catch (err) {
            console.error('[WORKSHOP] Errore invio email T+10 automatica:', err);
          }
        }),
        // Email T-3 (simulata)
        new Promise(resolve => setTimeout(resolve, 6000)).then(async () => {
          try {
            const emailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">⏰ Solo 3 Giorni!</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${validatedData.nome}</strong>,</p>
    
    <p>Ci siamo quasi! Solo <strong>3 giorni</strong> al workshop "Automatizza la tua Azienda: AI & Digitalizzazione".</p>
    
    <p style="margin-top: 30px;">A presto! 🚀</p>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <span style="color: #667eea;">OSM Partner Venezia</span></p>
  </div>
</body>
</html>`;

            await sendEmail({
              to: validatedData.email,
              subject: '⏰ [AUTO-TEST] Solo 3 giorni! Preparati per il workshop',
              html: emailHtml,
              text: `Test automatico email T-3`,
              emailId: 'auto_test_3_giorni',
              leadId: lead.id,
            });

            // Aggiorna metadata per tracciare email inviata
            const { data: currentLead } = await supabase
              .from('workshop_leads')
              .select('metadata')
              .eq('id', lead.id)
              .single();
            
            if (currentLead) {
              const metadata = (currentLead.metadata as any) || {};
              metadata.email_3_giorni_sent = new Date().toISOString();
              await supabase
                .from('workshop_leads')
                .update({ metadata })
                .eq('id', lead.id);
            }
          } catch (err) {
            console.error('[WORKSHOP] Errore invio email T-3 automatica:', err);
          }
        }),
        // Email T+0 (simulata)
        new Promise(resolve => setTimeout(resolve, 8000)).then(async () => {
          try {
            const emailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 32px;">🚀 Oggi è il Giorno!</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 20px; margin-bottom: 20px; font-weight: bold;">Ciao <strong>${validatedData.nome}</strong>,</p>
    
    <p style="font-size: 18px; margin-bottom: 20px;">Oggi è il giorno! Stasera alle <strong>18:00</strong> ti aspettiamo al workshop.</p>
    
    <p style="margin-top: 30px; text-align: center; font-size: 18px; font-weight: bold; color: #667eea;">Ci vediamo stasera! 🎉</p>
    
    <p style="margin-top: 30px;">A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <span style="color: #667eea;">OSM Partner Venezia</span></p>
  </div>
</body>
</html>`;

            await sendEmail({
              to: validatedData.email,
              subject: '🚀 [AUTO-TEST] Oggi è il giorno! Ti aspettiamo stasera alle 18:00',
              html: emailHtml,
              text: `Test automatico email T+0`,
              emailId: 'auto_test_giorno_evento',
              leadId: lead.id,
            });

            // Aggiorna metadata per tracciare email inviata
            const { data: currentLead } = await supabase
              .from('workshop_leads')
              .select('metadata')
              .eq('id', lead.id)
              .single();
            
            if (currentLead) {
              const metadata = (currentLead.metadata as any) || {};
              metadata.email_giorno_evento_sent = new Date().toISOString();
              await supabase
                .from('workshop_leads')
                .update({ metadata })
                .eq('id', lead.id);
            }
          } catch (err) {
            console.error('[WORKSHOP] Errore invio email T+0 automatica:', err);
          }
        }),
      ]).catch((err) => {
        console.error('[WORKSHOP] Errore invio email automatiche test:', err);
      });
    }

    // Ritorna subito la risposta senza aspettare le email
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

