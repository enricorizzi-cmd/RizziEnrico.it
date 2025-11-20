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
    
    // Calcola la data di 10 giorni fa
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    const tenDaysAgoStr = tenDaysAgo.toISOString().split('T')[0];
    
    // Verifica se siamo troppo vicini all'evento o se è già passato
    const workshopDate = new Date('2025-12-12');
    workshopDate.setHours(17, 0, 0, 0); // Workshop dalle ore 17.00
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
      .eq('evento', 'Workshop 12.12.2024') // Manteniamo per retrocompatibilità con lead esistenti
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
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="text-decoration: none; color: white;">
      <h1 style="color: white; margin: 0; font-size: 28px;">💡 Case Study Reale</h1>
    </a>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Ciao <strong>${lead.nome}</strong>,</p>
    
    <p>Vogliamo condividere con te due casi reali di successo che mostrano come la digitalizzazione può trasformare la gestione di una PMI.</p>
    
    <!-- Case History 1: Ristorante -->
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h3 style="margin-top: 0; color: #667eea;">🍽️ Case Study 1: Dal caos di Excel a un gestionale unico</h3>
      <p style="margin: 5px 0;"><strong>Settore:</strong> Ristorazione – ristoratore con più locali</p>
      <p style="margin: 5px 0;"><strong>Problema:</strong> Decine di file Excel sparsi per gestire flusso finanziario, food cost, margini e previsioni. Accesso ai numeri solo da PC in ufficio.</p>
      
      <div style="background: #e7f3ff; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <h4 style="margin-top: 0; color: #2196F3;">✅ Soluzione implementata:</h4>
        <ul style="line-height: 1.8; margin: 10px 0 0 0; padding-left: 20px;">
          <li>Gestionale unico accessibile da app mobile e sito web</li>
          <li>Monitoraggio flusso finanziario in tempo reale</li>
          <li>Food cost aggiornabile per singolo piatto</li>
          <li>Calcolo margini per piatto e per punto vendita</li>
          <li>Modulo di previsione con AI per incassi e flusso di cassa</li>
        </ul>
      </div>
      
      <div style="background: #d4edda; padding: 15px; margin: 15px 0; border-radius: 4px; border-left: 4px solid #28a745;">
        <h4 style="margin-top: 0; color: #155724;">🎯 Risultati:</h4>
        <ul style="line-height: 1.8; margin: 10px 0 0 0; padding-left: 20px;">
          <li><strong>Eliminati decine di file Excel</strong> sostituiti da un unico gestionale</li>
          <li>Il titolare vede <strong>in tempo reale</strong> flusso finanziario, budget e margini direttamente da smartphone</li>
          <li>Le scelte su menu e prezzi vengono fatte <strong>sui numeri, non più "a naso"</strong></li>
          <li>L'amministrazione ha <strong>ridotto drasticamente</strong> il tempo speso in attività manuali</li>
        </ul>
      </div>
    </div>
    
    <!-- Case History 2: Edilizia -->
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
      <h3 style="margin-top: 0; color: #28a745;">🏗️ Case Study 2: Da faldoni di carta a gestionale condiviso</h3>
      <p style="margin: 5px 0;"><strong>Settore:</strong> Edilizia</p>
      <p style="margin: 5px 0;"><strong>Problema:</strong> Faldoni di carta per ogni cantiere. Preventivi, ordini, fatture sparsi tra blocchi appunti, fogli A4, email e WhatsApp. Nessun controllo su margini cantieri fino alla chiusura lavori.</p>
      
      <div style="background: #e7f3ff; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <h4 style="margin-top: 0; color: #2196F3;">✅ Soluzione implementata:</h4>
        <ul style="line-height: 1.8; margin: 10px 0 0 0; padding-left: 20px;">
          <li>Un unico file Excel strutturato come gestionale, caricato in cloud</li>
          <li>Accessibile contemporaneamente da più utenti (ufficio, titolare, capocantiere)</li>
          <li>Sezioni dedicate: cantieri, clienti, subappalti, ordini, margini, fatturazione e incassi</li>
          <li>Accesso anche da tablet/smartphone durante visite in cantiere</li>
        </ul>
      </div>
      
      <div style="background: #d4edda; padding: 15px; margin: 15px 0; border-radius: 4px; border-left: 4px solid #28a745;">
        <h4 style="margin-top: 0; color: #155724;">🎯 Risultati:</h4>
        <ul style="line-height: 1.8; margin: 10px 0 0 0; padding-left: 20px;">
          <li><strong>Eliminata gran parte del cartaceo</strong> e dei doppioni di informazioni</li>
          <li>Possibile sapere in ogni momento <strong>quanti cantieri sono aperti</strong> e <strong>quanto si sta guadagnando</strong> su ciascuno</li>
          <li>Il titolare ha un <strong>quadro chiaro dei margini per cantiere</strong>, senza dover aspettare mesi</li>
          <li>Le informazioni non sono più "nella testa di uno", ma <strong>condivise</strong> in un unico strumento</li>
        </ul>
      </div>
    </div>
    
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>🎯 Al workshop vedrai:</strong></p>
      <ul style="line-height: 2; margin: 10px 0 0 0; padding-left: 20px;">
        <li>Come implementare soluzioni simili nella tua azienda</li>
        <li>Il sistema reale in azione (non teoria!)</li>
        <li>Come automatizzare processi e ridurre il lavoro manuale</li>
        <li>Dashboard e strumenti che puoi usare subito</li>
      </ul>
    </div>
    
    <div style="background: #e7f3ff; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0; border-radius: 4px;">
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
    
    <p style="margin-top: 30px;">Non vediamo l'ora di vederti! 🚀</p>
    
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

Vogliamo condividere con te due casi reali di successo che mostrano come la digitalizzazione può trasformare la gestione di una PMI.

🍽️ CASE STUDY 1: Dal caos di Excel a un gestionale unico
Settore: Ristorazione – ristoratore con più locali
Problema: Decine di file Excel sparsi per gestire flusso finanziario, food cost, margini e previsioni. Accesso ai numeri solo da PC in ufficio.

✅ Soluzione:
- Gestionale unico accessibile da app mobile e sito web
- Monitoraggio flusso finanziario in tempo reale
- Food cost aggiornabile per singolo piatto
- Calcolo margini per piatto e per punto vendita
- Modulo di previsione con AI per incassi e flusso di cassa

🎯 Risultati:
- Eliminati decine di file Excel sostituiti da un unico gestionale
- Il titolare vede in tempo reale flusso finanziario, budget e margini direttamente da smartphone
- Le scelte su menu e prezzi vengono fatte sui numeri, non più "a naso"
- L'amministrazione ha ridotto drasticamente il tempo speso in attività manuali

🏗️ CASE STUDY 2: Da faldoni di carta a gestionale condiviso
Settore: Edilizia
Problema: Faldoni di carta per ogni cantiere. Preventivi, ordini, fatture sparsi tra blocchi appunti, fogli A4, email e WhatsApp. Nessun controllo su margini cantieri fino alla chiusura lavori.

✅ Soluzione:
- Un unico file Excel strutturato come gestionale, caricato in cloud
- Accessibile contemporaneamente da più utenti (ufficio, titolare, capocantiere)
- Sezioni dedicate: cantieri, clienti, subappalti, ordini, margini, fatturazione e incassi
- Accesso anche da tablet/smartphone durante visite in cantiere

🎯 Risultati:
- Eliminata gran parte del cartaceo e dei doppioni di informazioni
- Possibile sapere in ogni momento quanti cantieri sono aperti e quanto si sta guadagnando su ciascuno
- Il titolare ha un quadro chiaro dei margini per cantiere, senza dover aspettare mesi
- Le informazioni non sono più "nella testa di uno", ma condivise in un unico strumento

🎯 Al workshop vedrai:
- Come implementare soluzioni simili nella tua azienda
- Il sistema reale in azione (non teoria!)
- Come automatizzare processi e ridurre il lavoro manuale
- Dashboard e strumenti che puoi usare subito

💡 Non dimenticare: Se non l'hai ancora fatto, compila il Test di Maturità Digitale:
${BASE_URL}/test-maturita-digitale

📅 Dettagli Evento:
Data: ${WORKSHOP_DATE}
Orario: ${WORKSHOP_TIME}
Luogo: ${WORKSHOP_LOCATION}

Non vediamo l'ora di vederti! 🚀

A presto,
Enrico Rizzi & Francesco Fusano
<a href="https://www.osmpartnervenezia.it/">OSM Partner Venezia</a>

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`;

        await Promise.all([
          sendEmail({
            to: lead.email,
            subject: '💡 Case Study: due PMI che hanno trasformato la loro gestione',
            html: emailHtml,
            text: emailText,
            unsubscribeUrl: `${BASE_URL}/unsubscribe?email=${encodeURIComponent(lead.email)}&lead=${encodeURIComponent(lead.id)}`,
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

