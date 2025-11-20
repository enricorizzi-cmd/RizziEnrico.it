import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// Dynamic import per evitare errori in build time se API key non presente
let OpenAI: any;
let openai: any;

async function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  
  if (!OpenAI) {
    OpenAI = (await import('openai')).default;
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  
  return openai;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();

    // Ottieni tutti i problemi dai lead
    const { data: leads, error } = await supabase
      .from('workshop_leads')
      .select('problema')
      .eq('evento', 'Workshop 12.12.2024')
      .not('problema', 'is', null)
      .neq('problema', '');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Errore nel caricamento problemi' },
        { status: 500 }
      );
    }

    if (!leads || leads.length === 0) {
      return NextResponse.json({
        insights: {
          categorie: [],
          problemi_principali: [],
          sintesi: 'Nessun problema segnalato ancora.',
          totale_problemi: 0,
        },
      });
    }

    // Raggruppa problemi per frequenza
    const problemiTesto = leads
      .map(lead => lead.problema)
      .filter((p): p is string => !!p);

    // Se non c'è OpenAI, restituisci analisi base
    const openaiInstance = await getOpenAI();
    if (!openaiInstance) {
      // Analisi base senza AI
      const problemiUnici = [...new Set(problemiTesto)];
      return NextResponse.json({
        insights: {
          categorie: [],
          problemi_principali: problemiUnici.slice(0, 10).map((p, i) => ({
            problema: p,
            frequenza: problemiTesto.filter(pr => pr === p).length,
            priorita: 'media',
            categoria: 'Non categorizzato',
          })),
          sintesi: `${problemiTesto.length} problemi segnalati. Analisi AI non disponibile (chiave API non configurata).`,
          totale_problemi: problemiTesto.length,
        },
      });
    }

    // Prepara prompt per OpenAI
    const problemiLista = problemiTesto.map((p, i) => `${i + 1}. ${p}`).join('\n');
    
    const prompt = `Analizza i seguenti problemi segnalati da iscritti a un workshop sulla digitalizzazione aziendale e AI.

PROBLEMI SEGNALATI (${problemiTesto.length} totali):
${problemiLista}

Compito:
1. Categorizza i problemi in categorie logiche (es: "Digitalizzazione Processi", "Marketing Digitale", "Gestione Dati", "Automazioni", "Presenza Online", "AI & Innovazione", etc.)
2. Identifica i problemi più frequenti e rilevanti
3. Raggruppa problemi simili
4. Ordina per priorità e frequenza

Rispondi in formato JSON:
{
  "categorie": [
    {
      "nome": "Nome categoria",
      "problemi": ["problema 1", "problema 2"],
      "frequenza": 5,
      "priorita": "alta|media|bassa"
    }
  ],
  "problemi_principali": [
    {
      "problema": "Testo problema originale",
      "frequenza": 3,
      "categoria": "Nome categoria",
      "priorita": "alta|media|bassa",
      "rilevanza": "breve descrizione perché è rilevante"
    }
  ],
  "sintesi": "Breve sintesi (2-3 frasi) delle principali problematiche emerse",
  "raccomandazioni": ["raccomandazione 1", "raccomandazione 2"]
}

Ordina i problemi_principali per frequenza decrescente, poi per priorità. Massimo 10 problemi principali.`;

    const completion = await openaiInstance.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Sei un consulente esperto in digitalizzazione aziendale. Analizza problemi reali di PMI e categorizzali in modo logico e utile. Sii preciso e pratico.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
      max_tokens: 2000,
    });

    const analysis = JSON.parse(completion.choices[0]?.message?.content || '{}');

    return NextResponse.json({
      insights: {
        ...analysis,
        totale_problemi: problemiTesto.length,
        problemi_analizzati: problemiTesto.length,
      },
      usage: completion.usage,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Errore nell\'analisi problemi' },
      { status: 500 }
    );
  }
}

