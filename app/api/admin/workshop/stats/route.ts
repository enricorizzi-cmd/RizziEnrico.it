import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();

    // Totale iscritti
    const { count: totaleIscritti } = await supabase
      .from('workshop_leads')
      .select('*', { count: 'exact', head: true });

    // Lead per fonte
    const { data: perFonteData } = await supabase
      .from('workshop_leads')
      .select('fonte');

    const perFonte: Record<string, number> = {};
    perFonteData?.forEach((lead) => {
      perFonte[lead.fonte] = (perFonte[lead.fonte] || 0) + 1;
    });

    // Lead per stato
    const { data: perStatoData } = await supabase
      .from('workshop_leads')
      .select('stato');

    const perStato: Record<string, number> = {};
    perStatoData?.forEach((lead) => {
      perStato[lead.stato] = (perStato[lead.stato] || 0) + 1;
    });

    // Presenti
    const { count: presenti } = await supabase
      .from('workshop_leads')
      .select('*', { count: 'exact', head: true })
      .eq('stato', 'presente');

    // Confermati
    const { count: confermati } = await supabase
      .from('workshop_leads')
      .select('*', { count: 'exact', head: true })
      .eq('stato', 'confermato');

    // Totale chiamate
    const { data: chiamateData } = await supabase
      .from('workshop_leads')
      .select('numero_chiamate');

    const totaleChiamate = chiamateData?.reduce((sum, lead) => sum + (lead.numero_chiamate || 0), 0) || 0;

    // Tasso presenza: presenti / totale iscritti
    const tassoPresenza = totaleIscritti && totaleIscritti > 0 
      ? ((presenti || 0) / totaleIscritti) * 100 
      : 0;

    return NextResponse.json({
      totale_iscritti: totaleIscritti || 0,
      per_fonte: perFonte,
      per_stato: perStato,
      presenti: presenti || 0,
      confermati: confermati || 0,
      tasso_presenza: tassoPresenza,
      totale_chiamate: totaleChiamate,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

