import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, leadId } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email richiesta' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Se abbiamo il leadId, aggiorna il lead specifico
    if (leadId) {
      const { error } = await supabase
        .from('workshop_leads')
        .update({ 
          metadata: {
            unsubscribed: true,
            unsubscribed_at: new Date().toISOString(),
          }
        })
        .eq('id', leadId)
        .eq('email', email);

      if (error) {
        console.error('Errore aggiornamento lead:', error);
      }
    }

    // In alternativa, potresti avere una tabella dedicata per le disiscrizioni
    // Per ora aggiorniamo solo il metadata del lead se disponibile

    return NextResponse.json({
      success: true,
      message: 'Sei stato disiscritto con successo. Non riceverai più email relative al workshop.',
    });
  } catch (error: any) {
    console.error('Errore disiscrizione:', error);
    return NextResponse.json(
      { error: 'Errore durante la disiscrizione' },
      { status: 500 }
    );
  }
}

