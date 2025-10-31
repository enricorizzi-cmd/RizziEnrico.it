'use client';

import { useState } from 'react';
import CTA from './CTA';

const questions = [
  {
    id: 1,
    question: 'Qual è la tua tolleranza al rischio negli investimenti?',
    options: [
      { value: 'conservative', label: 'Conservativa - Preferisco sicurezza e stabilità', score: 1 },
      { value: 'moderate', label: 'Moderata - Bilancio tra rischio e rendimento', score: 2 },
      { value: 'aggressive', label: 'Aggressiva - Cerco massimi rendimenti', score: 3 },
    ],
  },
  {
    id: 2,
    question: 'Quanto tempo dedichi alla gestione dei tuoi investimenti?',
    options: [
      { value: 'none', label: 'Nessuno - Preferisco gestione passiva', score: 1 },
      { value: 'little', label: 'Poco - Controllo mensile', score: 2 },
      { value: 'regular', label: 'Regolare - Monitoraggio settimanale', score: 3 },
      { value: 'extensive', label: 'Estensivo - Analisi quotidiana', score: 4 },
    ],
  },
  {
    id: 3,
    question: 'Come reagisci alle perdite temporanee del mercato?',
    options: [
      { value: 'panic', label: 'Panico - Vendo immediatamente', score: 1 },
      { value: 'worry', label: 'Preoccupazione - Monitoro attentamente', score: 2 },
      { value: 'calm', label: 'Calma - Resto investito', score: 3 },
      { value: 'opportunity', label: 'Opportunità - Aumento gli investimenti', score: 4 },
    ],
  },
  {
    id: 4,
    question: 'Quanto diversifichi il tuo portafoglio?',
    options: [
      { value: 'none', label: 'Non diversifico - Un solo tipo di investimento', score: 1 },
      { value: 'little', label: 'Poco - 2-3 categorie', score: 2 },
      { value: 'moderate', label: 'Moderatamente - 4-5 categorie', score: 3 },
      { value: 'high', label: 'Molto - Più di 5 categorie diversificate', score: 4 },
    ],
  },
  {
    id: 5,
    question: 'Qual è il tuo orizzonte temporale principale?',
    options: [
      { value: 'short', label: 'Breve termine (1-3 anni)', score: 1 },
      { value: 'medium', label: 'Medio termine (3-10 anni)', score: 2 },
      { value: 'long', label: 'Lungo termine (10+ anni)', score: 3 },
    ],
  },
  {
    id: 6,
    question: 'Come prendi decisioni di investimento?',
    options: [
      { value: 'emotion', label: 'Intuizione e istinto', score: 1 },
      { value: 'advice', label: 'Consigli di amici/famiglia', score: 1 },
      { value: 'research', label: 'Ricerca personale e analisi', score: 3 },
      { value: 'professional', label: 'Consulenza professionale', score: 4 },
    ],
  },
  {
    id: 7,
    question: 'Quanto sei informato su mercati finanziari e investimenti?',
    options: [
      { value: 'none', label: 'Principiante - So poco', score: 1 },
      { value: 'basic', label: 'Base - Conosco le basi', score: 2 },
      { value: 'intermediate', label: 'Intermedio - Ho buone conoscenze', score: 3 },
      { value: 'advanced', label: 'Avanzato - Sono molto informato', score: 4 },
    ],
  },
];

export default function InvestorQuestionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState('');
  const [insights, setInsights] = useState<string[]>([]);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // Calcola score e livello
      const calculatedScore = calculateScore({ ...answers, [questionId]: value });
      const calculatedLevel = getLevel(calculatedScore);
      const calculatedInsights = generateInsights({ ...answers, [questionId]: value }, calculatedLevel);
      
      setScore(calculatedScore);
      setLevel(calculatedLevel);
      setInsights(calculatedInsights);
      setCompleted(true);
    }
  };

  const calculateScore = (ans: { [key: number]: string }): number => {
    let totalScore = 0;
    questions.forEach((q) => {
      const answer = ans[q.id];
      const option = q.options.find((opt) => opt.value === answer);
      if (option) {
        totalScore += option.score;
      }
    });
    return totalScore;
  };

  const getLevel = (score: number): string => {
    const maxScore = questions.reduce((sum, q) => {
      const maxOption = q.options.reduce((max, opt) => Math.max(max, opt.score), 0);
      return sum + maxOption;
    }, 0);
    
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 80) return 'Avanzato';
    if (percentage >= 60) return 'Intermedio';
    if (percentage >= 40) return 'Principiante';
    return 'Iniziante';
  };

  const generateInsights = (ans: { [key: number]: string }, calculatedLevel: string): string[] => {
    const insights: string[] = [];
    
    // Analisi tolleranza rischio
    if (ans[1] === 'conservative') {
      insights.push('Profilo conservativo: privilegi la sicurezza. Considera diversificazione tra obbligazioni, immobiliare e oro per proteggere il capitale.');
    } else if (ans[1] === 'aggressive') {
      insights.push('Profilo aggressivo: sei orientato alla crescita. Valuta un mix tra azioni, crypto e partecipazioni in aziende per massimizzare i rendimenti.');
    }
    
    // Analisi diversificazione
    if (ans[4] === 'none' || ans[4] === 'little') {
      insights.push('Diversificazione limitata: considera di espandere il portafoglio tra immobiliare, oro, finanziario, crypto e aziende per ridurre il rischio.');
    }
    
    // Analisi orizzonte temporale
    if (ans[5] === 'short') {
      insights.push('Orizzonte breve termine: per obiettivi a 1-3 anni, privilegia liquidità e investimenti sicuri come obbligazioni o conti deposito.');
    } else if (ans[5] === 'long') {
      insights.push('Orizzonte lungo termine: hai tempo a disposizione. Puoi permetterti maggiori rischi con potenziale crescita, come azioni e crypto.');
    }
    
    // Analisi gestione
    if (ans[2] === 'none' || ans[2] === 'little') {
      insights.push('Gestione passiva: considera fondi indicizzati o ETF per diversificazione automatica senza monitoraggio continuo.');
    }
    
    // Analisi livello
    if (calculatedLevel === 'Iniziante' || calculatedLevel === 'Principiante') {
      insights.push('Livello iniziale: considera consulenza professionale per strutturare correttamente il tuo percorso verso 1,5 milioni.');
    }
    
    if (insights.length === 0) {
      insights.push('Profilo bilanciato: continua a diversificare e monitorare i tuoi investimenti per raggiungere l\'obiettivo di libertà finanziaria.');
    }

    return insights;
  };

  const resetQuestionnaire = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setCompleted(false);
    setScore(0);
    setLevel('');
    setInsights([]);
  };

  if (completed) {
    return (
      <div className="bg-white rounded-[var(--radius-card)] p-8 border border-[var(--color-line)]">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-2">
            Il tuo livello: {level}
          </h3>
          <p className="text-sm text-[var(--color-subtext)] mb-4">
            Score: {score} / {questions.reduce((sum, q) => {
              const maxOption = q.options.reduce((max, opt) => Math.max(max, opt.score), 0);
              return sum + maxOption;
            }, 0)}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className="bg-[var(--color-card)] rounded-lg p-4 border border-[var(--color-line)]"
            >
              <p className="text-sm text-[var(--color-text)]">{insight}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 rounded-lg p-6 border border-[var(--color-primary)]/20 mb-4">
          <p className="text-sm font-semibold text-[var(--color-text)] mb-2">
            💼 Vuoi migliorare il tuo approccio agli investimenti?
          </p>
          <p className="text-xs text-[var(--color-subtext)] mb-4">
            Prenota un check-up dedicato con Enrico Rizzi per ottenere una strategia personalizzata e raggiungere l'obiettivo di 1,5 milioni.
          </p>
          <CTA href="/contatti" variant="primary" size="base" className="w-full">
            Prenota Check-up Personalizzato →
          </CTA>
        </div>

        <button
          onClick={resetQuestionnaire}
          className="w-full text-sm text-[var(--color-subtext)] hover:text-[var(--color-primary)] transition-colors"
        >
          Rifai il questionario
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--color-text)]">
            Domanda {currentQuestion + 1} di {questions.length}
          </span>
          <span className="text-xs text-[var(--color-subtext)]">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-[var(--color-line)] rounded-full h-2">
          <div
            className="bg-[var(--color-primary)] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-6">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(question.id, option.value)}
            className="w-full text-left px-4 py-3 border-2 border-[var(--color-line)] rounded-lg hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all"
          >
            <span className="text-[var(--color-text)] font-medium">{option.label}</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-[var(--color-subtext)] text-center mt-6">
        Questionario di autovalutazione • I risultati sono indicativi
      </p>
    </div>
  );
}
