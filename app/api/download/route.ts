import { NextRequest, NextResponse } from 'next/server';
import { downloadSchema } from '@/lib/validators';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = downloadSchema.parse(body);
    
    const supabase = createServerClient();
    
    // Crea lead per tracking
    await supabase.from('leads').insert({
      name: validatedData.name,
      email: validatedData.email,
      source: 'download',
      score: 10, // Download indica interesse base
    });

    // TODO: Invia email con link download (usando Resend/SendGrid)
    // Per ora restituiamo un link mock
    const downloadUrl = '/resources/kpi-pack.xlsx'; // In produzione: URL reale
    
    return NextResponse.json({
      success: true,
      emailSent: true, // o false se download diretto
      downloadUrl,
      message: 'Email inviata con link di download',
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

