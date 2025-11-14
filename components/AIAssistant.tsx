'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Knowledge base (in produzione: caricata da API o file)
  const knowledgeBase = {
    metodo: {
      keywords: ['metodo', 'step', 'processo', 'organizzazione'],
      response: 'Il metodo è strutturato in 5 step: 1) Chi - ruoli chiari, 2) Numeri - KPI, 3) Processi - riunioni efficaci, 4) Persone - leadership, 5) Espansione - vendite. In 90 giorni ordine, in 6 mesi risultati. [Scopri di più](/metodo)',
    },
    kpi: {
      keywords: ['kpi', 'indicatori', 'dashboard', 'controllo'],
      response: 'I KPI essenziali per PMI sono: fatturato, marginalità, incassi (DSO), lead e conversion rate, tempi di consegna. Monitoriamo 12-15 KPI mensilmente con dashboard visiva. [Vedi servizio KPI](/servizi/kpi-controllo-gestione)',
    },
    prezzi: {
      keywords: ['prezzo', 'costo', 'investimento', 'quanto costa'],
      response: 'Servizi productized con prezzi chiari: a partire da 700€. Ogni servizio ha deliverable definiti. [Vedi tutti i servizi](/servizi)',
    },
    prenota: {
      keywords: ['prenota', 'appuntamento', 'incontro', 'check-up', 'checkup', 'diagnosi'],
      response: 'Prenota un check-up aziendale gratuito di 60 minuti (via Zoom) o 90 minuti (in presenza). Analizziamo insieme numeri e criticità, ti mostro dove recuperare margini. [Prenota ora](/contatti)',
    },
    iprofile: {
      keywords: ['iprofile', 'i-profile', 'attitudinale', 'profilo', 'selezione', 'mappatura team', 'colloquio', 'tratti'],
      response: 'i-Profile è uno strumento attitudinale professionale OSM che misura 10 tratti chiave per individuare potenziale e prendere decisioni su collocazione, sviluppo e selezione. Utilizzabile per imprenditori/manager (self-assessment), gestione team (mappatura) e selezione candidati (screening). Compilazione online 20-30 minuti, debrief 60-90 minuti. [Scopri i-Profile](/i-profile)',
    },
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Inizializza con messaggio di benvenuto
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: 'Ciao! Sono l\'assistente AI di Enrico Rizzi, consulente OSM per PMI del Veneto. Sono qui per aiutarti a organizzare la tua azienda con metodo: persone, KPI (Indicatori Chiave di Prestazione) e processi.\n\nPosso rispondere a domande su:\n- Il metodo OSM in 5 step\n- KPI e controllo di gestione\n- Servizi di consulenza\n- i-Profile (strumento attitudinale)\n- Risorse gratuite disponibili\n\nDimmi qual è la criticità principale della tua PMI e ti propongo la soluzione più adatta!',
        timestamp: new Date(),
      }]);
    }
  }, [isOpen]);

  const findRelevantAnswer = (query: string): string | null => {
    const queryLower = query.toLowerCase();
    
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => queryLower.includes(keyword))) {
        return data.response;
      }
    }

    // Default response
    return 'Posso aiutarti su: metodo di organizzazione, KPI, servizi e prezzi. Descrivi meglio la tua esigenza o [vedi tutte le risorse](/risorse).';
  };

  const captureLead = async (name: string, email: string, company: string, problem: string) => {
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          main_problem: problem,
          source: 'ai',
          size_employees: null,
          revenue_range: null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Log conversazione su Supabase (se tabella esiste)
        try {
          await supabase.from('ai_sessions').insert({
            lead_id: data.id,
            transcript: messages,
            outcome: 'lead_captured',
            score: data.score || 30,
          });
        } catch (e) {
          // Ignora se tabella non esiste ancora
          // AI sessions table not available - silent in production
        }

        setLeadCaptured(true);
        return data;
      }
    } catch (error) {
      console.error('Error capturing lead:', error);
    }
    return null;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Chiamata API OpenAI
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          sessionId: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Errore nella chiamata API');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || 'Mi dispiace, non sono riuscito a generare una risposta.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Se non abbiamo ancora catturato il lead e ci sono 3+ messaggi, chiediamo dati
      if (!leadCaptured && messages.length >= 2) {
        // Dopo 3 scambi, chiediamo contatti per continuare
        const leadPromptMessage: Message = {
          role: 'assistant',
          content: 'Per darti consigli più personalizzati, puoi lasciarmi nome, email e azienda? Così posso aiutarti meglio!',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, leadPromptMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      // Fallback alla knowledge base locale
      const answer = findRelevantAnswer(input);
      const assistantMessage: Message = {
        role: 'assistant',
        content: answer || 'Scusa, non sono riuscito a elaborare la risposta. Puoi riformulare?',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-[var(--color-primary)] text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50"
        aria-label="Apri assistente AI"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-2rem)] md:w-96 h-[600px] max-h-[90vh] bg-white rounded-[var(--radius-card)] shadow-2xl flex flex-col z-50 border border-[var(--color-line)]">
      {/* Header */}
      <div className="bg-[var(--color-primary)] text-white p-4 rounded-t-[var(--radius-card)] flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Assistente Enrico</h3>
          <p className="text-sm opacity-90">Ti aiuto a trovare la soluzione giusta</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:opacity-70"
          aria-label="Chiudi"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === 'user'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-card)] text-[var(--color-text)]'
              }`}
            >
              {msg.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        className="text-[var(--color-primary)] underline"
                        target={props.href?.startsWith('http') ? '_blank' : undefined}
                      />
                    ),
                    p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />,
                    ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-4 mb-2" />,
                    ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-4 mb-2" />,
                    li: ({ node, ...props }) => <li {...props} className="mb-1" />,
                    strong: ({ node, ...props }) => <strong {...props} className="font-semibold" />,
                    h1: ({ node, ...props }) => <h1 {...props} className="text-xl font-bold mb-2 mt-4 first:mt-0" />,
                    h2: ({ node, ...props }) => <h2 {...props} className="text-lg font-bold mb-2 mt-4 first:mt-0" />,
                    h3: ({ node, ...props }) => <h3 {...props} className="text-base font-bold mb-2 mt-3 first:mt-0" />,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{msg.content}</div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[var(--color-card)] rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[var(--color-subtext)] rounded-full animate-bounce loading-dot-1"></div>
                <div className="w-2 h-2 bg-[var(--color-subtext)] rounded-full animate-bounce loading-dot-2"></div>
                <div className="w-2 h-2 bg-[var(--color-subtext)] rounded-full animate-bounce loading-dot-3"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--color-line)]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrivi un messaggio..."
            className="flex-1 px-4 py-2 border border-[var(--color-line)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

