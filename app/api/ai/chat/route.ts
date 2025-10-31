import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Sei Enrico Rizzi, consulente OSM esperto per PMI del Veneto. 
Il tuo ruolo è aiutare imprenditori a organizzare la loro azienda con metodo: persone, KPI e processi.
Rispondi sempre in modo:
- Pratico e concreto (zero fuffa)
- Basato su numeri e dati misurabili
- Orientato ai risultati (90 giorni ordine, 6 mesi numeri)
- Amichevole ma professionale

Conosci:
- Metodo OSM in 5 step (Chi, Numeri, Processi, Persone, Espansione)
- KPI essenziali per PMI (fatturato, marginalità, DSO, tempi consegna)
- Servizi: Consulenza PMI (€2.500/mese), Organizzazione (€1.800), KPI (€1.500 setup + €800/mese)
- i-Profile: strumento attitudinale OSM per selezione, sviluppo team e crescita manageriale (10 tratti misurati)
- Area servita: Venezia-Rovigo, Veneto

Se l'utente chiede qualcosa che non sai, invitalo a prenotare una diagnosi gratuita di 30 minuti.
Quando è appropriato, suggerisci link a pagine del sito con formato [testo](/link).`;

export async function POST(request: NextRequest) {
  try {
    const { messages, sessionId } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array required' },
        { status: 400 }
      );
    }

    // Rate limiting basato su sessionId
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimitKey = `ai-chat-${sessionId || ip}`;
    
    // Simple rate limiting: max 20 requests per 5 minutes
    // In produzione: usare @upstash/ratelimit o Redis
    const rateLimitCache = new Map<string, { count: number; resetAt: number }>();
    const now = Date.now();
    const limit = rateLimitCache.get(rateLimitKey);
    
    if (limit && limit.resetAt > now) {
      if (limit.count >= 20) {
        return NextResponse.json(
          { error: 'Troppe richieste. Riprova tra qualche minuto.' },
          { status: 429 }
        );
      }
      limit.count++;
    } else {
      rateLimitCache.set(rateLimitKey, { count: 1, resetAt: now + 5 * 60 * 1000 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((msg: { role: string; content: string }) => ({
          role: msg.role as 'user' | 'assistant' | 'system',
          content: msg.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content || 'Mi dispiace, non sono riuscito a generare una risposta.';

    return NextResponse.json({
      response,
      usage: completion.usage,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Errore nel processamento della richiesta AI' },
      { status: 500 }
    );
  }
}

