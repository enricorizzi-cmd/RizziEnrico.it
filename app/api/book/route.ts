import { NextRequest, NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/validators';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = bookingSchema.parse(body);
    
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        lead_id: validatedData.lead_id,
        type: validatedData.type,
        datetime: validatedData.datetime,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Errore nel salvataggio' },
        { status: 500 }
      );
    }

    // TODO: Sync with Calendly/TidyCal webhook if needed

    return NextResponse.json({
      success: true,
      id: data.id,
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

