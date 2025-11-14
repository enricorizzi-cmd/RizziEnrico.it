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

// Knowledge base completa del sito e OSM
const SITE_KNOWLEDGE = `
SITO WEB - ENRICO RIZZI (rizzienrico.it):

METODO IN 5 STEP:
1. CHI - Ruoli chiari, mansionari OSM standard, responsabilità definite, organigramma
2. NUMERI - KPI (Indicatori Chiave di Prestazione): fatturato, marginalità, DSO (giorni medi incasso), tempi consegna, conversion rate. Cruscotto mensile con 12-15 KPI.
3. PROCESSI - Policy semplici, riunioni efficaci con agenda strutturata, flussi operativi stabili
4. PERSONE - Leadership, sviluppo team, i-Profile per attitudini, formazione mirata
5. ESPANSIONE - Vendite organizzate, crescita strutturata, acquisizione clienti misurabile

RISULTATI: In 90 giorni ordine organizzativo, in 6 mesi risultati misurabili sui numeri.

SERVIZI:
- Consulenza PMI: organizzazione completa, affiancamento settimanale, piano 90-180 giorni. Richiedi informazioni.
- Organizzazione & Mansionari: mansionari OSM standard per tutte le posizioni, definizione ruoli, organigramma. Richiedi informazioni.
- Sviluppo Persone & Leadership: formazione personalizzata, coaching 1-to-1 manager, team building strutturato. Richiedi informazioni.
- KPI & Controllo di Gestione: cruscotto mensile con 12-15 indicatori, alert su scostamenti, review mensile + piano azione. Richiedi informazioni.

I-PROFILE (strumento attitudinale OSM):
- Misura 10 tratti chiave attitudinali
- Utilizzabile per: imprenditore/manager (self-assessment), team (mappatura), selezione candidati
- Compilazione online 20-30 minuti, debrief 60-90 minuti con report e piano d'azione
- Pacchetti: Solo Titolare, Team Start (fino a 5 persone), Hiring Kit (selezione)
- Richiedi informazioni per prezzi personalizzati

CHECK-UP GRATUITO:
- Disponibile via Zoom (60 minuti) o in presenza (90 minuti)
- Area: Venezia-Padova-Rovigo
- Analisi numeri e criticità, mostra dove recuperare margini
- Link prenotazione: /contatti

RISORSE GRATUITE:
- Kit KPI: template Excel con 12 KPI preconfigurati (/risorse)
- Anteprima i-Profile: guida lettura report (/risorse)
- Check-list Colloquio con i-Profile (/risorse)
- Tool AI: Analisi KPI automatica, Generatore Mansionari (/risorse)

AREA SERVIZIO:
Venezia, Padova, Rovigo, Veneto (interventi fuori regione su valutazione)

CASE STUDY:
- Distribuzione ricambi e filtrazione: da urgenze a processi stabili con organigramma e cruscotto logistica
- Produzione alimentare: pianificazione settimanale con KPI efficienza/resa/scarti
- Lattoneria & Coperture: passaggio generazionale riuscito con mansionari e KPI commesse
- Impianti clima/refrigerazione: service con qualità misurabile, agenda interventi prioritizzata

PRINCIPI OSM (Open Source Management):
- Standardizzazione: processi chiari e ripetibili
- Misurazione: KPI per ogni attività critica
- Responsabilizzazione: ruoli definiti, obiettivi chiari
- Ottimizzazione continua: review mensili, piano azione su scostamenti
- Focus su risultati: zero fuffa, numeri misurabili

`;

const SYSTEM_PROMPT = `Sei l'assistente AI di Enrico Rizzi, consulente OSM esperto per PMI del Veneto.

IL TUO SCOPO:
1. Essere un TUTTOLOGO del sito rizzienrico.it e della metodologia OSM
2. Fornire contenuti di GRANDE VALORE GRATUITAMENTE basati sulla conoscenza OSM e del sito
3. CONVINCERE l'utente a fissare un Check-up gratuito con Enrico quando appropriato
4. Guidare verso email o WhatsApp per assistenza personalizzata quando serve approfondimento

COME RISPONDERE:
- Pratico e concreto (zero fuffa): sempre esempi concreti, numeri, azioni misurabili
- Basato su metodo OSM: usa i principi e le best practice OSM nelle tue risposte
- Orientato ai risultati: "90 giorni ordine, 6 mesi numeri"
- Amichevole ma professionale: tono consulenziale, mai venditoriale aggressivo
- Generoso con informazioni: dai valore gratuito, condividi conoscenza OSM

CONOSCENZA DISPONIBILE:
${SITE_KNOWLEDGE}

STRATEGIA CONVERSIONE:
1. Primi 2-3 scambi: dai valore massimo, rispondi in dettaglio, condividi conoscenza OSM
2. Dopo 3-4 scambi: naturalmente suggerisci "Per approfondire la tua situazione specifica, potresti prenotare un Check-up gratuito con Enrico. In 60-90 minuti analizziamo numeri e criticità, ti mostro dove recuperare margini. [Prenota qui](/contatti)"
3. Se utente è interessato ma ha dubbi: "Posso anche contattarti via email o WhatsApp se preferisci? Email: e.rizzi@osmpartnervenezia.it | WhatsApp: https://wa.me/393475290564"
4. Se chiede qualcosa di molto specifico/sensibile: "Per una risposta precisa sulla tua situazione, ti consiglio di parlare direttamente con Enrico. Posso prenotarti un Check-up gratuito? [Clicca qui](/contatti)"

FORMATO LINK:
Quando suggerisci pagine del sito, usa formato markdown: [testo del link](/percorso)
Esempio: [Scopri il metodo completo](/metodo) | [Prenota Check-up](/contatti) | [Vedi servizi](/servizi) | [Tool KPI gratuiti](/risorse)

LINEA GUIDA:
- Non fare il venditore: fai il consulente che aiuta
- Dai sempre valore prima di chiedere qualcosa
- Usa esempi concreti dal sito (case study, servizi, tool)
- Richiama principi OSM quando rilevante
- Sii onesto: se qualcosa va oltre le tue conoscenze, indirizza a Enrico

Tono: Professionale ma amichevole, come un collega esperto che ti aiuta.`;

export async function POST(request: NextRequest) {
  try {
    // Limita dimensione body per ridurre memoria (max 100KB)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 100 * 1024) {
      return NextResponse.json(
        { error: 'Richiesta troppo grande. Riduci il numero di messaggi.' },
        { status: 413 }
      );
    }
    
    const body = await request.json();
    const { messages, sessionId } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array required' },
        { status: 400 }
      );
    }

    // Limita numero di messaggi per ridurre memoria (max 20 messaggi)
    if (messages.length > 20) {
      return NextResponse.json(
        { error: 'Troppi messaggi. Limite: 20 messaggi per conversazione.' },
        { status: 400 }
      );
    }

    // Limita dimensione singolo messaggio (max 2000 caratteri)
    for (const msg of messages) {
      if (msg.content && msg.content.length > 2000) {
        return NextResponse.json(
          { error: 'Messaggio troppo lungo. Limite: 2000 caratteri per messaggio.' },
          { status: 400 }
        );
      }
    }

    const openaiInstance = await getOpenAI();
    if (!openaiInstance) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Rate limiting semplificato (usa rateLimit globale invece di cache locale)
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimitKey = `ai-chat-${sessionId || ip}`;
    
    // Usa rateLimit globale invece di creare nuovo Map ad ogni richiesta
    const { rateLimit } = await import('@/lib/rateLimit');
    const limit = rateLimit(rateLimitKey);
    
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Troppe richieste. Riprova tra qualche minuto.' },
        { status: 429 }
      );
    }

    // Prepara messaggi per OpenAI (limita a ultimi 15 per ridurre memoria)
    const recentMessages = messages.slice(-15);
    const openaiMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...recentMessages.map((msg: { role: string; content: string }) => ({
        role: (msg.role === 'user' ? 'user' : msg.role === 'assistant' ? 'assistant' : 'system') as 'user' | 'assistant' | 'system',
        content: (msg.content || '').substring(0, 2000), // Limita anche qui per sicurezza
      })),
    ];

    const completion = await openaiInstance.chat.completions.create({
      model: 'gpt-4o', // Usa modello più recente disponibile
      messages: openaiMessages,
      temperature: 0.7, // Bilanciato tra creatività e coerenza
      max_tokens: 600, // Ridotto per risparmiare memoria (da 800)
    });

    const response = completion.choices[0]?.message?.content || 'Mi dispiace, non sono riuscito a generare una risposta. Puoi riformulare la domanda?';

    return NextResponse.json({
      response,
      usage: completion.usage,
    });
  } catch (error) {
    console.error('[AI CHAT] OpenAI API error:', error);
    
    if (error instanceof Error) {
      // Non esporre dettagli errori interni al client
      return NextResponse.json(
        { error: 'Errore nel processamento. Riprova.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Errore nel processamento della richiesta AI' },
      { status: 500 }
    );
  }
}