import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

const NOTIFICATION_EMAIL = 'enricorizzi1991@gmail.com';
const CALENDLY_CHECKUP_URL = process.env.NEXT_PUBLIC_CALENDLY_CHECKUP_URL || 'https://calendly.com/enricorizzi/check-up-gratuito-in-azienda';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

interface EmailTemplate {
  subject: string;
  html: (lead: any) => string;
  text: (lead: any) => string;
  delayHours: number;
}

const emailTemplates: EmailTemplate[] = [
  {
    delayHours: 0, // Subito dopo
    subject: '🎉 Grazie per essere stato al workshop!',
    html: (lead) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="text-decoration: none; color: white;">
      <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Grazie!</h1>
    </a>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
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
    <a href="https://www.osmpartnervenezia.it/" style="color: #667eea; text-decoration: none;">OSM Partner Venezia</a></p>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
      <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">📅 Vai alla pagina del Workshop</a>
    </div>
  </div>
</body>
</html>`,
    text: (lead) => `Ciao ${lead.nome},

Grazie per essere stato al workshop "Automatizza la tua Azienda: AI & Digitalizzazione"!

Speriamo che tu abbia trovato utili gli spunti e le demo che abbiamo condiviso.

📦 Materiali Promessi:
- Starter Kit: Checklist Digitalizzazione PMI: ${BASE_URL}/download/starter-kit-digitalizzazione
- Test di Maturità Digitale: ${BASE_URL}/test-maturita-digitale

🚀 Prossimo Passo: Vuoi applicare subito quello che hai visto? Prenota un Check-up Digitale Gratuito:
${CALENDLY_CHECKUP_URL}

A presto,
Enrico Rizzi & Francesco Fusano
<a href="https://www.osmpartnervenezia.it/">OSM Partner Venezia</a>

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
  },
  {
    delayHours: 24, // 24 ore dopo
    subject: '💡 Hai già scaricato lo Starter Kit?',
    html: (lead) => `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
  <div style="background: #f9f9f9; padding: 30px; border-radius: 10px;">
    <p style="font-size: 18px;">Ciao <strong>${lead.nome}</strong>,</p>
    
    <p>Come va con l'applicazione di quello che hai visto al workshop?</p>
    
      <p>Se non l'hai ancora fatto, ti ricordiamo di scaricare lo <a href="${BASE_URL}/download/starter-kit-digitalizzazione" style="color: #667eea; font-weight: bold;">Starter Kit</a> e compilare il <a href="${BASE_URL}/test-maturita-digitale" style="color: #667eea; font-weight: bold;">Test di Maturità Digitale</a>.</p>
    
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>💡 Ricorda:</strong> Le condizioni speciali workshop scadono tra 7 giorni. Se vuoi approfittarne, prenota il tuo <a href="${CALENDLY_CHECKUP_URL}" style="color: #667eea; font-weight: bold;">Check-up Digitale Gratuito</a>.</p>
    </div>
    
    <p>A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <a href="https://www.osmpartnervenezia.it/" style="color: #667eea; text-decoration: none;">OSM Partner Venezia</a></p>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
      <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">📅 Vai alla pagina del Workshop</a>
    </div>
  </div>
</body>
</html>`,
    text: (lead) => `Ciao ${lead.nome},

Come va con l'applicazione di quello che hai visto al workshop?

Se non l'hai ancora fatto, ti ricordiamo di scaricare lo Starter Kit e compilare il Test di Maturità Digitale.

💡 Ricorda: Le condizioni speciali workshop scadono tra 7 giorni. Se vuoi approfittarne, prenota il tuo Check-up Digitale Gratuito:
${CALENDLY_CHECKUP_URL}

A presto,
Enrico Rizzi & Francesco Fusano
<a href="https://www.osmpartnervenezia.it/">OSM Partner Venezia</a>

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
  },
  {
    delayHours: 48, // 48 ore dopo
    subject: '⏰ Ultimi giorni per le condizioni speciali workshop',
    html: (lead) => `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
  <div style="background: #f9f9f9; padding: 30px; border-radius: 10px;">
    <p style="font-size: 18px;">Ciao <strong>${lead.nome}</strong>,</p>
    
    <p>Ti scriviamo per ricordarti che le <strong>condizioni speciali workshop</strong> scadono tra pochi giorni.</p>
    
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>🎯 Cosa Include:</strong></p>
      <ul style="margin: 10px 0;">
        <li>Check-up Digitale Gratuito approfondito</li>
        <li>Sconto sul percorso 3 giornate</li>
        <li>Implementazione di 1 automazione compresa</li>
      </ul>
    </div>
    
    <p>Se vuoi approfittarne, prenota subito il tuo <a href="${CALENDLY_CHECKUP_URL}" style="color: #667eea; font-weight: bold;">Check-up Digitale Gratuito</a>.</p>
    
    <p>A presto,<br>
    <strong>Enrico Rizzi & Francesco Fusano</strong><br>
    <a href="https://www.osmpartnervenezia.it/" style="color: #667eea; text-decoration: none;">OSM Partner Venezia</a></p>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
      <a href="https://www.rizzienrico.it/workshop-12-dicembre" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">📅 Vai alla pagina del Workshop</a>
    </div>
  </div>
</body>
</html>`,
    text: (lead) => `Ciao ${lead.nome},

Ti scriviamo per ricordarti che le condizioni speciali workshop scadono tra pochi giorni.

🎯 Cosa Include:
- Check-up Digitale Gratuito approfondito
- Sconto sul percorso 3 giornate
- Implementazione di 1 automazione compresa

Se vuoi approfittarne, prenota subito il tuo Check-up Digitale Gratuito:
${CALENDLY_CHECKUP_URL}

A presto,
Enrico Rizzi & Francesco Fusano
<a href="https://www.osmpartnervenezia.it/">OSM Partner Venezia</a>

Vai alla pagina del Workshop: https://www.rizzienrico.it/workshop-12-dicembre`,
  },
];

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

    const body = await request.json();
    const { leadId, emailType } = body; // emailType: 'immediate', '24h', '48h'

    const supabase = createServerClient();

    // Trova il lead
    const { data: lead, error: leadError } = await supabase
      .from('workshop_leads')
      .select('*')
      .eq('id', leadId)
      .single();

    if (leadError || !lead) {
      return NextResponse.json(
        { error: 'Lead non trovato' },
        { status: 404 }
      );
    }

    // Determina quale template usare
    let template: EmailTemplate | null = null;
    if (emailType === 'immediate') {
      template = emailTemplates[0];
    } else if (emailType === '24h') {
      template = emailTemplates[1];
    } else if (emailType === '48h') {
      template = emailTemplates[2];
    }

    if (!template) {
      return NextResponse.json(
        { error: 'Tipo email non valido' },
        { status: 400 }
      );
    }

    // Invia email al lead e notifica a enricorizzi1991@gmail.com
    await Promise.all([
      sendEmail({
        to: lead.email,
        subject: template.subject,
        html: template.html(lead),
        text: template.text(lead),
        unsubscribeUrl: `${BASE_URL}/unsubscribe?email=${encodeURIComponent(lead.email)}&lead=${encodeURIComponent(lead.id)}`,
      }),
      new Promise(resolve => setTimeout(resolve, 500)).then(() => {
        const notificationText = `Email post-evento inviata a ${lead.nome} ${lead.cognome} (${lead.email}):
        
Tipo email: ${emailType}
Oggetto: ${template.subject}

ID Lead: ${lead.id}
Data invio: ${new Date().toLocaleString('it-IT')}`;
        
        return sendEmail({
          to: NOTIFICATION_EMAIL,
          subject: `📧 Email post-evento inviata - ${lead.nome} ${lead.cognome} (${emailType})`,
          text: notificationText,
        }).catch((err) => {
          console.error('[WORKSHOP] Errore invio notifica post-evento (non bloccante):', err);
          return false;
        });
      }),
    ]);

    // Aggiorna metadata per tracciare email inviate
    const metadata = (lead.metadata as any) || {};
    // Mappa emailType ai nomi usati nella dashboard
    const metadataKey = emailType === 'immediate' ? 'email_post_immediata_sent' 
                      : emailType === '24h' ? 'email_post_24h_sent'
                      : emailType === '48h' ? 'email_post_48h_sent'
                      : `email_${emailType}_sent`;
    metadata[metadataKey] = new Date().toISOString();

    await supabase
      .from('workshop_leads')
      .update({ metadata })
      .eq('id', leadId);

    return NextResponse.json({
      success: true,
      message: `Email ${emailType} inviata con successo`,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

