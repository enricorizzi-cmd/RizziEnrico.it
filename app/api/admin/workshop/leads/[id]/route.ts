import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const supabase = createServerClient();

    // Se lo stato viene cambiato in "presente", triggera le email post-evento
    const wasPresent = body.stato === 'presente';
    
    const { data, error } = await supabase
      .from('workshop_leads')
      .update(body)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Errore nell\'aggiornamento' },
        { status: 500 }
      );
    }

    // Se è stato segnato come presente, triggera le email post-evento
    if (wasPresent && data) {
      try {
        const cronSecret = process.env.CRON_SECRET_TOKEN;
        if (cronSecret) {
          await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/workshop/emails/trigger-post-evento`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cronSecret}`,
              },
              body: JSON.stringify({ leadId: params.id }),
            }
          );
        }
      } catch (emailError) {
        console.error('Error triggering post-event emails:', emailError);
        // Non bloccare l'aggiornamento se le email falliscono
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

