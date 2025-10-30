'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

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
      response: 'Servizi productized con prezzi chiari: Consulenza PMI da €2.500/mese, Organizzazione da €1.800, KPI da €1.500 setup + €800/mese. Ogni servizio ha deliverable definiti. [Vedi tutti i servizi](/servizi)',
    },
    prenota: {
      keywords: ['prenota', 'appuntamento', 'incontro', 'diagnosi'],
      response: 'Prenota una diagnosi gratuita di 30 minuti. Analizziamo insieme numeri e criticità, ti mostro dove recuperare margini. [Prenota ora](/contatti)',
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
        content: 'Ciao! Sono l\'assistente di Enrico. Dimmi in due righe la tua azienda e il problema principale, poi ti propongo la soluzione giusta.',
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
      await supabase.from('leads').insert({
        name,
        email,
        company,
        main_problem: problem,
        source: 'ai',
        score: 30,
      });

      // Log conversazione
      await supabase.from('ai_sessions').insert({
        transcript: messages,
        outcome: 'info',
      });

      setLeadCaptured(true);
    } catch (error) {
      console.error('Error capturing lead:', error);
    }
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

    // Simula risposta (in produzione: API call)
    setTimeout(() => {
      const answer = findRelevantAnswer(input);
      const assistantMessage: Message = {
        role: 'assistant',
        content: answer || 'Scusa, non ho capito. Puoi riformulare?',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      // Se non abbiamo ancora catturato il lead e ci sono 3+ messaggi, chiediamo dati
      if (!leadCaptured && messages.length >= 3 && messages.length % 3 === 0) {
        // In produzione: mostriamo form per lead
      }
    }, 1000);
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
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {/* Parse links in response */}
              {msg.role === 'assistant' && msg.content.includes('[') && (
                <div className="mt-2 text-sm">
                  {msg.content.match(/\[([^\]]+)\]\(([^)]+)\)/g)?.map((link, i) => {
                    const match = link.match(/\[([^\]]+)\]\(([^)]+)\)/);
                    if (match) {
                      return (
                        <a
                          key={i}
                          href={match[2]}
                          className="text-[var(--color-primary)] underline"
                          target={match[2].startsWith('http') ? '_blank' : undefined}
                        >
                          {match[1]}
                        </a>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[var(--color-card)] rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[var(--color-subtext)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-[var(--color-subtext)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-[var(--color-subtext)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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

