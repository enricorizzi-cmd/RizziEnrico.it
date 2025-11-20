import { NextRequest, NextResponse } from 'next/server';
import { eventRegistrationSchema } from '@/lib/validators';
import { createServerClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

const NOTIFICATION_EMAIL = 'enricorizzi1991@gmail.com';

export async function POST(request: NextRequest) {
  try {
    // Limita dimensione body per ridurre memoria (max 50KB per form)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 50 * 1024) {
      return NextResponse.json(
        { error: 'Richiesta troppo grande' },
        { status: 413 }
      );
    }
    const body = await request.json();
    const validatedData = eventRegistrationSchema.parse(body);
    
    const supabase = createServerClient();
    
    // Salva registrazione (potresti avere una tabella event_registrations)
    // Per ora salviamo come lead
    const { data: lead } = await supabase.from('leads').insert({
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      phone: validatedData.phone,
      source: 'event',
      score: 20,
    }).select().single();

    const registrationId = lead?.id || `event-${Date.now()}`;

    // Invia email di conferma a Enrico
    const emailSubject = `Nuova registrazione evento - ${validatedData.event_slug}`;
    const emailText = `Nuova registrazione evento:

Nome: ${validatedData.name}
Email: ${validatedData.email}
Azienda: ${validatedData.company || 'Non specificato'}
Telefono: ${validatedData.phone || 'Non specificato'}
Evento: ${validatedData.event_slug}
ID Registrazione: ${registrationId}`;

    // Invia email solo a NOTIFICATION_EMAIL
    await sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: emailSubject,
      text: emailText,
    });

    // Invia email di conferma all'utente
    if (validatedData.email) {
      await sendEmail({
        to: validatedData.email,
        subject: `Conferma registrazione evento - ${validatedData.event_slug}`,
        text: `Gentile ${validatedData.name},

La tua registrazione all'evento "${validatedData.event_slug}" è stata confermata!

ID Registrazione: ${registrationId}

Riceverai ulteriori dettagli via email a breve.

A presto,
Enrico Rizzi
Consulente OSM per PMI`,
      });
    }

    return NextResponse.json({
      success: true,
      registrationId,
      message: 'Registrazione completata. Email di conferma inviata.',
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dati non validi' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

