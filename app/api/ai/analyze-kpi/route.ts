import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { kpiData } = await request.json();

    if (!kpiData) {
      return NextResponse.json(
        { error: 'KPI data required' },
        { status: 400 }
      );
    }

    const prompt = `Analizza questi KPI di una PMI e fornisci:
1. Identificazione di 3-5 criticità principali
2. Priorità delle azioni (urgente/importante/media)
3. Suggerimenti concreti per migliorare ogni criticità
4. Stima margine di miglioramento potenziale

KPI forniti:
${JSON.stringify(kpiData, null, 2)}

Rispondi in formato JSON:
{
  "criticita": [
    {
      "titolo": "...",
      "descrizione": "...",
      "priorita": "urgente|importante|media",
      "azione": "...",
      "margineMiglioramento": "..."
    }
  ],
  "sintesi": "...",
  "prossimiPassi": ["...", "..."]
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Sei un consulente OSM esperto. Analizza KPI e fornisci consigli pratici e concreti basati su numeri.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(completion.choices[0]?.message?.content || '{}');

    return NextResponse.json({
      success: true,
      analysis,
      usage: completion.usage,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Errore nell\'analisi KPI' },
      { status: 500 }
    );
  }
}

