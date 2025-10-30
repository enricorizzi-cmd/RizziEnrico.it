import { NextRequest, NextResponse } from 'next/server';
import { eventRegistrationSchema } from '@/lib/validators';
import { createServerClient } from '@/lib/supabase';
import QRCode from 'qrcode';

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

    // TODO: Salva QR code su storage (Supabase Storage o S3) e restituisci URL pubblico
    // Per ora restituiamo base64 (non ideale in produzione)

    return NextResponse.json({
      success: true,
      registrationId,
      qrCodeUrl,
      message: 'Registrazione completata',
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

