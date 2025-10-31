import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const {
      currentAge,
      retirementAge,
      currentInvestments,
      monthlyContribution,
      annualReturn,
      years,
      finalSimple,
      finalCompound,
      totalContributed,
      gainSimple,
      gainCompound,
    } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const targetWealth = 1500000; // 1.5 milioni
    const gap = targetWealth - finalCompound;
    const monthlyContributionNeeded = gap > 0 ? 
      calculateMonthlyContributionNeeded(currentInvestments, annualReturn, years, targetWealth) : 
      monthlyContribution;

    const prompt = `Sei Enrico Rizzi, consulente finanziario esperto. Analizza questa situazione di investimento e fornisci un'analisi completa e personalizzata.

DATI INSERITI:
- Età attuale: ${currentAge} anni
- Età pensionamento: ${retirementAge} anni
- Anni rimanenti: ${years} anni
- Investimenti attuali: €${currentInvestments.toLocaleString('it-IT')}
- Contributo mensile: €${monthlyContribution.toLocaleString('it-IT')}
- Rendimento annuo atteso: ${annualReturn}%

RISULTATI CALCOLATI:
- Patrimonio finale con interesse semplice: €${finalSimple.toLocaleString('it-IT')}
- Patrimonio finale con interesse composto: €${finalCompound.toLocaleString('it-IT')}
- Totale versato: €${totalContributed.toLocaleString('it-IT')}
- Guadagno interesse semplice: €${gainSimple.toLocaleString('it-IT')}
- Guadagno interesse composto: €${gainCompound.toLocaleString('it-IT')}
- Differenza tra composto e semplice: €${(finalCompound - finalSimple).toLocaleString('it-IT')}

OBIETTIVO:
Raggiungere €1.500.000 di patrimonio da mettere a rendita per ottenere libertà finanziaria.
Con un rendimento anche pessimisticamente del 7%, questo genererebbe €105.000 annui di rendita passiva.

Fornisci un'analisi completa che includa:

1. SINTESI DELLA SITUAZIONE (2-3 paragrafi):
   - Analisi del percorso attuale
   - Quanto manca per raggiungere 1,5 milioni (gap: €${gap > 0 ? gap.toLocaleString('it-IT') : 0})
   - Tempo necessario se la strategia resta invariata

2. STRATEGIA PER RAGGIUNGERE 1,5 MILIONI:
   - Contributo mensile necessario se c'è un gap
   - Strategia di diversificazione tra:
     * Immobiliare (rendimento stabile, protezione inflazione)
     * Oro (riserva valore, hedge inflazione)
     * Finanziario (liquidità, crescita)
     * Crypto (potenziale crescita alta, alto rischio)
     * Aziende (equity, partecipazioni, rendimenti elevati)
   - Proporzioni suggerite per diversificazione ottimale

3. PIANO PER LIBERTÀ FINANZIARIA:
   - Calcolo rendita passiva con patrimonio a 1,5M al 7% annuo
   - Quanto tempo manca per raggiungere l'obiettivo
   - Strategia di accumulo fase per fase

4. RACCOMANDAZIONI SPECIFICHE (lista puntata):
   - Aumentare contributo mensile se necessario
   - Strategia di diversificazione con % per categoria
   - Timing e approccio graduale
   - Gestione del rischio

Rispondi in formato JSON:
{
  "report": "... (testo completo dell'analisi in formato markdown leggibile)",
  "recommendations": ["raccomandazione 1", "raccomandazione 2", ...]
}

L'analisi deve essere pratica, motivante, e orientata all'azione. Usa un tono professionale ma accessibile.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Sei Enrico Rizzi, consulente finanziario esperto. Fornisci analisi pratiche, concrete e orientate all\'azione per aiutare le persone a raggiungere l\'indipendenza finanziaria attraverso investimenti diversificati.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(completion.choices[0]?.message?.content || '{}');

    return NextResponse.json({
      success: true,
      analysis,
      usage: completion.usage,
    });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Errore nell\'analisi: ' + (error.message || 'Unknown error') },
      { status: 500 }
    );
  }
}

function calculateMonthlyContributionNeeded(
  currentInvestments: number,
  annualReturn: number,
  years: number,
  target: number
): number {
  const r = annualReturn / 100 / 12; // Tasso mensile
  const n = years * 12; // Numero di mesi
  
  // FV = PV * (1+r)^n + PMT * [((1+r)^n - 1) / r]
  // Risolviamo per PMT:
  // PMT = (FV - PV * (1+r)^n) / [((1+r)^n - 1) / r]
  
  const futureValueOfCurrent = currentInvestments * Math.pow(1 + r, n);
  const remaining = target - futureValueOfCurrent;
  
  if (remaining <= 0) return 0;
  
  const annuityFactor = r > 0 ? ((Math.pow(1 + r, n) - 1) / r) : n;
  const monthlyNeeded = remaining / annuityFactor;
  
  return Math.max(0, Math.ceil(monthlyNeeded));
}
