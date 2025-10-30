import { NextRequest, NextResponse } from 'next/server';
import { downloadSchema } from '@/lib/validators';
import { createServerClient } from '@/lib/supabase';

const CONTACT_EMAIL = 'e.rizzi@osmpartnervenezia.it';
const CONTACT_PHONE = '3475290564';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = downloadSchema.parse(body);
    
    const supabase = createServerClient();
    
    // Crea lead per tracking
    const { data: lead } = await supabase.from('leads').insert({
      name: validatedData.name,
      email: validatedData.email,
      source: 'download',
      score: 10, // Download indica interesse base
    }).select().single();

    // Email notification a Enrico (fallback semplice via mailto link)
    // In produzione: integrare Resend/SendGrid
    const emailSubject = encodeURIComponent(`Nuovo download KPI Pack - ${validatedData.name}`);
    const emailBody = encodeURIComponent(
      `Nuovo download richiesto:\n\n` +
      `Nome: ${validatedData.name}\n` +
      `Email: ${validatedData.email}\n` +
      `Timestamp: ${new Date().toISOString()}\n\n` +
      `Link download: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'}/resources/kpi-pack.xlsx`
    );
    
    // Salva info email per invio futuro (o usa webhook)
    await supabase.from('leads').update({
      metadata: {
        downloadRequested: true,
        emailNotification: `${CONTACT_EMAIL}?subject=${emailSubject}&body=${emailBody}`,
      },
    }).eq('id', lead?.id);

    // Link download diretto (per ora mock, in produzione: URL reale da storage)
    const downloadUrl = '/resources/kpi-pack.xlsx';
    
    return NextResponse.json({
      success: true,
      emailSent: false, // Verrà inviata manualmente o via webhook
      downloadUrl,
      contactEmail: CONTACT_EMAIL,
      message: 'Download disponibile. Controlla email o contatta direttamente.',
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
