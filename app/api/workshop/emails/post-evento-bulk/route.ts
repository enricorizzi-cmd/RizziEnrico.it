import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

const NOTIFICATION_EMAIL = 'enricorizzi1991@gmail.com';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

// Endpoint per inviare email post-evento immediata a tutti gli iscritti
// Viene chiamato alle 19:00 del 12 dicembre 2025
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
    
    // Trova tutti i lead iscritti che non hanno ancora ricevuto l'email post-evento immediata
    const { data: leads, error } = await supabase
      .from('workshop_leads')
      .select('*')
      .eq('evento', 'Workshop 12.12.2024') // Manteniamo per retrocompatibilità
      .is('metadata->email_post_immediata_sent', null); // Solo quelli che non l'hanno ancora ricevuta

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Errore nel caricamento lead' },
        { status: 500 }
      );
    }

    if (!leads || leads.length === 0) {
      return NextResponse.json({
        message: 'Nessun iscritto da notificare o tutti hanno già ricevuto l\'email',
        sent: 0,
        errors: 0,
      });
    }

    const cronSecret = process.env.CRON_SECRET_TOKEN;
    if (!cronSecret) {
      return NextResponse.json(
        { error: 'CRON_SECRET_TOKEN non configurato' },
        { status: 500 }
      );
    }

    // Invia email post-evento immediata a tutti gli iscritti
    const results = await Promise.allSettled(
      leads.map(async (lead) => {
        try {
          const response = await fetch(
            `${BASE_URL}/api/workshop/emails/post-evento`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cronSecret}`,
              },
              body: JSON.stringify({ leadId: lead.id, emailType: 'immediate' }),
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
          }

          return { leadId: lead.id, email: lead.email, success: true };
        } catch (error: any) {
          console.error(`Errore invio email per lead ${lead.id}:`, error);
          return { leadId: lead.id, email: lead.email, success: false, error: error.message };
        }
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const failed = results.length - successful;

    // Notifica a enricorizzi1991@gmail.com
    const notificationText = `Email post-evento immediata inviate alle 19:00 del 12 dicembre 2025:

Totale iscritti: ${leads.length}
Email inviate con successo: ${successful}
Errori: ${failed}

Dettagli:
${results.map((r, i) => {
  if (r.status === 'fulfilled') {
    return `- ${leads[i].nome} ${leads[i].cognome} (${leads[i].email}): ${r.value.success ? '✅ Inviata' : `❌ Errore: ${r.value.error}`}`;
  }
  return `- ${leads[i].nome} ${leads[i].cognome} (${leads[i].email}): ❌ Errore: ${r.reason}`;
}).join('\n')}`;

    try {
      const { sendEmail } = await import('@/lib/email');
      await sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: `📧 Email post-evento immediata inviate - ${successful}/${leads.length} successo`,
        text: notificationText,
      });
    } catch (notifError) {
      console.error('Errore invio notifica (non bloccante):', notifError);
    }

    return NextResponse.json({
      success: true,
      message: `Email post-evento immediata inviate: ${successful} successo, ${failed} errori`,
      sent: successful,
      errors: failed,
      total: leads.length,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

