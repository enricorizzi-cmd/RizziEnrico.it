import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    
    const stato = searchParams.get('stato');
    const fonte = searchParams.get('fonte');

    let query = supabase
      .from('workshop_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (stato && stato !== 'tutti') {
      query = query.eq('stato', stato);
    }

    if (fonte && fonte !== 'tutti') {
      query = query.eq('fonte', fonte);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Errore nel caricamento' },
        { status: 500 }
      );
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



