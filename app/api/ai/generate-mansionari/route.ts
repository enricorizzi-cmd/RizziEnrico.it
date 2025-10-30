import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { departments, roles, activities } = await request.json();

    if (!departments || !Array.isArray(departments)) {
      return NextResponse.json(
        { error: 'Departments array required' },
        { status: 400 }
      );
    }

    const prompt = `Genera mansionari OSM standard per questa struttura aziendale.

Dipartimenti: ${departments.join(', ')}
Ruoli: ${roles?.join(', ') || 'Da definire'}
Attività principali: ${activities?.join(', ') || 'Da definire'}

Genera mansionari completi seguendo lo standard OSM:
- Obiettivo del ruolo
- Responsabilità principali (3-5)
- Attività operative (lista dettagliata)
- KPI di riferimento
- Relazioni con altri ruoli

Formato JSON:
{
  "mansionari": [
    {
      "ruolo": "...",
      "dipartimento": "...",
      "obiettivo": "...",
      "responsabilita": ["...", "..."],
      "attivitaOperative": ["...", "..."],
      "kpi": ["...", "..."],
      "relazioni": ["...", "..."]
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Sei un esperto OSM. Genera mansionari completi, chiari e strutturati seguendo lo standard OSM.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
      response_format: { type: 'json_object' },
    });

    const mansionari = JSON.parse(completion.choices[0]?.message?.content || '{}');

    return NextResponse.json({
      success: true,
      mansionari,
      usage: completion.usage,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Errore nella generazione mansionari' },
      { status: 500 }
    );
  }
}

