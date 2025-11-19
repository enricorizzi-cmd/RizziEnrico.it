import { NextRequest, NextResponse } from 'next/server';
import { testMaturitaSchema } from '@/lib/validators';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = testMaturitaSchema.parse({
      risposte: body.risposte,
      nome: body.nome,
      cognome: body.cognome,
      email: body.email,
      azienda: body.azienda,
    });

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('test_maturita_digitale')
      .insert({
        nome: validatedData.nome,
        cognome: validatedData.cognome,
        email: validatedData.email,
        azienda: validatedData.azienda,
        risposte: validatedData.risposte,
        punteggio_totale: body.punteggio_totale || 0,
        punteggio_per_categoria: body.punteggio_per_categoria || {},
        livello_maturita: body.livello_maturita || 'Iniziale',
        raccomandazioni: body.raccomandazioni || [],
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

    return NextResponse.json({
      success: true,
      id: data.id,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dati non validi', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

