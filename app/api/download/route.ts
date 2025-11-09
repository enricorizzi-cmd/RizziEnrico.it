import { NextRequest, NextResponse } from 'next/server';
import { downloadSchema } from '@/lib/validators';
import { createServerClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

const CONTACT_EMAIL = 'e.rizzi@osmpartnervenezia.it';
const CONTACT_PHONE = '3475290564';

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
    const validatedData = downloadSchema.parse(body);
    
    const supabase = createServerClient();
    
    // Crea lead per tracking
    const { data: lead } = await supabase.from('leads').insert({
      name: validatedData.name,
      email: validatedData.email,
      source: 'download',
      score: 10, // Download indica interesse base
    }).select().single();

    // Invia email a Enrico
    const emailSubject = `Nuovo download KPI Pack - ${validatedData.name}`;
    const emailText = `Nuovo download richiesto:

Nome: ${validatedData.name}
Email: ${validatedData.email}
Timestamp: ${new Date().toISOString()}

Link download: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'}/resources/kpi-pack.xlsx`;

    const emailSentToEnrico = await sendEmail({
      to: CONTACT_EMAIL,
      subject: emailSubject,
      text: emailText,
    });

    // Invia email al richiedente con link download
    const downloadUrl = '/resources/kpi-pack.xlsx';
    const emailSentToUser = await sendEmail({
      to: validatedData.email,
      subject: 'KPI Pack - Link di download',
      text: `Gentile ${validatedData.name},

Grazie per aver scaricato il KPI Pack!

Ecco il link per il download:
${process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it'}${downloadUrl}

Il KPI Pack include 12 KPI chiave preconfigurati per iniziare subito a misurare la tua PMI.

Se hai domande o vuoi approfondire, sono a disposizione:
- Email: ${CONTACT_EMAIL}
- Telefono: ${CONTACT_PHONE}

A presto,
Enrico Rizzi
Consulente OSM per PMI`,
    });
    
    // Salva info email
    if (lead?.id) {
      await supabase.from('leads').update({
        metadata: {
          downloadRequested: true,
          emailSent: emailSentToUser,
        },
      }).eq('id', lead.id);
    }
    
    return NextResponse.json({
      success: true,
      emailSent: emailSentToUser,
      downloadUrl,
      contactEmail: CONTACT_EMAIL,
      message: emailSentToUser 
        ? 'Email inviata! Controlla la tua casella per il link di download.' 
        : 'Download disponibile. Controlla email o contatta direttamente.',
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
