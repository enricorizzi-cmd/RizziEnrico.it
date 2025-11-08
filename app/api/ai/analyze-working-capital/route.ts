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
    const body = await request.json();
    const {
      fatturato,
      costiFissi,
      costiVariabili,
      creditiCommerciali,
      valoreMagazzino,
      debitiCommerciali,
      cicloCapitale,
      capitaleCircolante,
      giorniMagazzino,
      dso,
      dpo,
    } = body;

    const prompt = `Analizza i dati finanziari di una PMI e fornisci raccomandazioni concrete per ottimizzare il ciclo del capitale circolante.

Dati aziendali:
- Fatturato annuo: €${fatturato?.toLocaleString('it-IT')}
- Costi fissi: €${costiFissi?.toLocaleString('it-IT')}
- Costi variabili: €${costiVariabili?.toLocaleString('it-IT')}
- Crediti commerciali: €${creditiCommerciali?.toLocaleString('it-IT')}
- Valore magazzino: €${valoreMagazzino?.toLocaleString('it-IT')}
- Debiti commerciali: €${debitiCommerciali?.toLocaleString('it-IT')}

Metriche calcolate:
- Ciclo del capitale circolante: ${Math.round(cicloCapitale)} giorni
- Giorni magazzino: ${Math.round(giorniMagazzino)} giorni
- DSO (Days Sales Outstanding): ${Math.round(dso)} giorni
- DPO (Days Payable Outstanding): ${Math.round(dpo)} giorni
- Capitale circolante: €${capitaleCircolante?.toLocaleString('it-IT')}

Fornisci:
1. Una sintesi breve (2-3 righe) sulla situazione del capitale circolante
2. Un elenco di 3-5 raccomandazioni concrete e pratiche per ottimizzare il ciclo, migliorare i flussi di cassa e ridurre il fabbisogno di capitale circolante

Rispondi in formato JSON con questa struttura:
{
  "sintesi": "sintesi breve...",
  "raccomandazioni": ["raccomandazione 1", "raccomandazione 2", ...]
}

Sii pratico, concreto e orientato all'azione. Evita teoria, concentrati su azioni misurabili per una PMI.`;

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
          content: 'Sei un consulente finanziario esperto per PMI. Fornisci analisi concrete e raccomandazioni pratiche.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content || '{}';
    const analysis = JSON.parse(content);

    return NextResponse.json({
      success: true,
      analysis,
      usage: completion.usage,
    });
  } catch (error) {
    console.error('Error analyzing working capital:', error);
    return NextResponse.json(
      { error: 'Errore nell\'analisi' },
      { status: 500 }
    );
  }
}

