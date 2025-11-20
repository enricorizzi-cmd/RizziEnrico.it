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

    // Ottieni tutti i test compilati con risultati aggregati
    const { data: tests, error } = await supabase
      .from('test_maturita_digitale')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Errore nel caricamento test' },
        { status: 500 }
      );
    }

    if (!tests || tests.length === 0) {
      return NextResponse.json({
        insights: {
          analisi_aggregata: 'Nessun test completato ancora.',
          tendenze_principali: [],
          aree_critiche: [],
          raccomandazioni: [],
          totale_test: 0,
        },
      });
    }

    // Prepara dati aggregati per l'analisi
    const datiAggregati = {
      totale_test: tests.length,
      distribuzione_livelli: tests.reduce((acc: Record<string, number>, test) => {
        const livello = test.livello_maturita || 'Non definito';
        acc[livello] = (acc[livello] || 0) + 1;
        return acc;
      }, {}),
      punteggio_medio: tests.reduce((sum, test) => sum + (test.punteggio_totale || 0), 0) / tests.length,
      categorie_mediocri: tests.reduce((acc: Record<string, number[]>, test) => {
        const punteggiPerCategoria = test.punteggio_per_categoria as Record<string, number> || {};
        Object.entries(punteggiPerCategoria).forEach(([cat, score]) => {
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(score);
        });
        return acc;
      }, {}),
    };

    // Calcola medie per categoria
    const medieCategorie = Object.entries(datiAggregati.categorie_mediocri).map(([cat, scores]) => ({
      categoria: cat,
      media: scores.reduce((a, b) => a + b, 0) / scores.length,
      test_count: scores.length,
    })).sort((a, b) => a.media - b.media);

    // Se non c'è OpenAI, restituisci analisi base
    const openaiInstance = await getOpenAI();
    if (!openaiInstance) {
      return NextResponse.json({
        insights: {
          analisi_aggregata: `Analisi base: ${tests.length} test completati. Punteggio medio: ${datiAggregati.punteggio_medio.toFixed(1)}. Analisi AI non disponibile (chiave API non configurata).`,
          tendenze_principali: [
            `Livello più comune: ${Object.entries(datiAggregati.distribuzione_livelli).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}`,
            `Categoria più debole: ${medieCategorie[0]?.categoria || 'N/A'} (media: ${medieCategorie[0]?.media.toFixed(1) || 0})`,
          ],
          aree_critiche: medieCategorie.slice(0, 3).map(c => ({
            categoria: c.categoria,
            punteggio_medio: c.media,
            test_coinvolti: c.test_count,
          })),
          raccomandazioni: [
            'Configurare OPENAI_API_KEY per analisi AI avanzata',
            'Focus su categoria più debole per miglioramenti',
          ],
          totale_test: tests.length,
        },
      });
    }

    // Prepara prompt per OpenAI
    const prompt = `Analizza i risultati aggregati di ${tests.length} test di maturità digitale compilati da PMI.

DATI AGGREGATI:
- Totale test: ${tests.length}
- Punteggio medio: ${datiAggregati.punteggio_medio.toFixed(1)}/100
- Distribuzione livelli: ${JSON.stringify(datiAggregati.distribuzione_livelli)}
- Medie per categoria (ordine crescente, le più basse sono le più critiche):
${medieCategorie.map(c => `  - ${c.categoria}: ${c.media.toFixed(1)} (${c.test_count} test)`).join('\n')}

Compito:
1. Analizza le tendenze principali emerse dai test
2. Identifica le aree critiche (categorie con punteggi più bassi)
3. Fornisci raccomandazioni concrete per migliorare la maturità digitale delle PMI
4. Suggerisci focus specifici per il workshop basati sui dati

Rispondi in formato JSON:
{
  "analisi_aggregata": "Sintesi completa (2-3 paragrafi) delle tendenze principali emerse",
  "tendenze_principali": [
    "tendenza 1",
    "tendenza 2",
    "tendenza 3"
  ],
  "aree_critiche": [
    {
      "categoria": "Nome categoria",
      "problema": "Descrizione del problema",
      "impatto": "Impatto sul business",
      "priorita": "alta|media|bassa"
    }
  ],
  "raccomandazioni": [
    "raccomandazione 1",
    "raccomandazione 2",
    "raccomandazione 3"
  ],
  "focus_workshop": [
    "argomento da approfondire 1",
    "argomento da approfondire 2"
  ]
}

Sii pratico, concreto e orientato all'azione.`;

    const completion = await openaiInstance.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Sei un consulente esperto in digitalizzazione aziendale. Analizza risultati aggregati di test di maturità digitale e fornisci insights pratici e azioni concrete. Sii preciso e orientato ai risultati.',
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
        totale_test: tests.length,
      },
    });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Errore nell\'analisi AI', details: error.message },
      { status: 500 }
    );
  }
}

