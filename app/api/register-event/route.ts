import { NextRequest, NextResponse } from 'next/server';
import { eventRegistrationSchema } from '@/lib/validators';
import { createServerClient } from '@/lib/supabase';
import QRCode from 'qrcode';
import { sendEmail } from '@/lib/email';

const CONTACT_EMAIL = 'e.rizzi@osmpartnervenezia.it';

export async function POST(request: NextRequest) {
  try {
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

    // Genera QR code
    const registrationId = lead?.id || `event-${Date.now()}`;
    const qrData = JSON.stringify({
      event: validatedData.event_slug,
      registrationId,
      name: validatedData.name,
    });

    const qrCodeUrl = await QRCode.toDataURL(qrData);

    // Invia email di conferma a Enrico
    const emailSubject = `Nuova registrazione evento - ${validatedData.event_slug}`;
    const emailText = `Nuova registrazione evento:

Nome: ${validatedData.name}
Email: ${validatedData.email}
Azienda: ${validatedData.company || 'Non specificato'}
Telefono: ${validatedData.phone || 'Non specificato'}
Evento: ${validatedData.event_slug}
ID Registrazione: ${registrationId}`;

    await sendEmail({
      to: CONTACT_EMAIL,
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
      qrCodeUrl,
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

