import { NextRequest, NextResponse } from 'next/server';

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

    const openaiInstance = await getOpenAI();
    if (!openaiInstance) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const completion = await openaiInstance.chat.completions.create({
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

