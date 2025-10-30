'use client';

import { useState } from 'react';
import CTA from './CTA';

const questions = [
  {
    id: 1,
    question: 'Preferisci lavorare su progetti a lungo termine o su task rapidi?',
    options: [
      { value: 'long', label: 'Progetti a lungo termine' },
      { value: 'short', label: 'Task rapidi' },
      { value: 'both', label: 'Entrambi in equilibrio' },
    ],
  },
  {
    id: 2,
    question: 'Come gestisci meglio le informazioni?',
    options: [
      { value: 'structure', label: 'Strutturate e organizzate' },
      { value: 'flexible', label: 'Flessibili e adattabili' },
      { value: 'mix', label: 'Mix di entrambi' },
    ],
  },
  {
    id: 3,
    question: 'In una riunione, preferisci:',
    options: [
      { value: 'lead', label: 'Guidare e presentare' },
      { value: 'observe', label: 'Osservare e analizzare' },
      { value: 'collaborate', label: 'Collaborare attivamente' },
    ],
  },
  {
    id: 4,
    question: 'Quando prendi decisioni, ti basi più su:',
    options: [
      { value: 'data', label: 'Dati e analisi' },
      { value: 'intuition', label: 'Intuizione ed esperienza' },
      { value: 'both', label: 'Combinazione di entrambi' },
    ],
  },
  {
    id: 5,
    question: 'Come gestisci lo stress?',
    options: [
      { value: 'plan', label: 'Pianificando preventivamente' },
      { value: 'adapt', label: 'Adattandoti al momento' },
      { value: 'delegate', label: 'Delegando quando possibile' },
    ],
  },
];

export default function IPTeaser() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [completed, setCompleted] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // Calcola insights
      const calculatedInsights = calculateInsights(answers);
      setInsights(calculatedInsights);
      setCompleted(true);
    }
  };

  const calculateInsights = (ans: { [key: number]: string }): string[] => {
    // Logica semplificata per generare insights
    const insights: string[] = [];
    
    if (ans[1] === 'structure') {
      insights.push('Preferenza per struttura e organizzazione: potresti eccellere in ruoli che richiedono pianificazione e gestione processi.');
    }
    if (ans[2] === 'lead') {
      insights.push('Tendenza alla leadership: potenziale per ruoli di gestione e coordinamento team.');
    }
    if (ans[4] === 'data') {
      insights.push('Approccio data-driven: orientato a decisioni basate su evidenze e analisi.');
    }

    if (insights.length === 0) {
      insights.push('Profilo bilanciato: adattabile a diversi contesti organizzativi.');
    }

    return insights;
  };

  if (completed) {
    return (
      <div className="bg-white rounded-[var(--radius-card)] p-8 border border-[var(--color-line)]">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-2">
            I tuoi insight preliminari
          </h3>
          <p className="text-sm text-[var(--color-subtext)] mb-6">
            Questo è solo un teaser. L'analisi completa i-Profile ti darà un quadro dettagliato.
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

        <div className="bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 rounded-lg p-6 border border-[var(--color-primary)]/20">
          <p className="text-sm font-semibold text-[var(--color-text)] mb-2">
            📊 Vuoi l'analisi completa?
          </p>
          <p className="text-xs text-[var(--color-subtext)] mb-4">
            L'i-Profile completo misura 10 tratti attitudinali con questionario esteso OSM (242 domande nella fase di sviluppo) e ti dà:
          </p>
          <ul className="text-xs text-[var(--color-subtext)] space-y-1 mb-4 list-disc list-inside">
            <li>Report completo con evidenze attitudinali</li>
            <li>Punti di forza e aree di miglioramento</li>
            <li>Debrief 60-90 minuti con piano d'azione</li>
          </ul>
          <CTA href="/i-profile" variant="primary" size="base" className="w-full">
            Scopri i-Profile completo →
          </CTA>
        </div>

        <p className="text-xs text-[var(--color-subtext)] text-center mt-4">
          ⚠️ Disclaimer: Questo teaser non sostituisce l'i-Profile ufficiale OSM.
        </p>
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
        Mini-check attitudinale • Non è l'i-Profile ufficiale
      </p>
    </div>
  );
}

