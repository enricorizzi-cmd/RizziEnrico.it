import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// Questo endpoint viene chiamato quando un lead viene segnato come "presente"
// Triggera le 3 email post-evento con i delay appropriati

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId } = body;

    if (!leadId) {
      return NextResponse.json(
        { error: 'leadId richiesto' },
        { status: 400 }
      );
    }

    const cronSecret = process.env.CRON_SECRET_TOKEN;
    if (!cronSecret) {
      return NextResponse.json(
        { error: 'CRON_SECRET_TOKEN non configurato' },
        { status: 500 }
      );
    }

    // Triggera email immediata
    const immediateResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/workshop/emails/post-evento`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cronSecret}`,
        },
        body: JSON.stringify({ leadId, emailType: 'immediate' }),
      }
    );

    // Programma email 24h dopo (usando un sistema di scheduling esterno o cron)
    // Per ora, salva nel metadata che deve essere inviata
    const supabase = createServerClient();
    const { data: lead } = await supabase
      .from('workshop_leads')
      .select('metadata')
      .eq('id', leadId)
      .single();

    const metadata = (lead?.metadata as any) || {};
    metadata.email_24h_scheduled = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    metadata.email_48h_scheduled = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    await supabase
      .from('workshop_leads')
      .update({ metadata })
      .eq('id', leadId);

    return NextResponse.json({
      success: true,
      message: 'Email post-evento programmate',
      immediate_sent: immediateResponse.ok,
      scheduled_24h: metadata.email_24h_scheduled,
      scheduled_48h: metadata.email_48h_scheduled,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}



