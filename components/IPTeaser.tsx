'use client';

import { useState } from 'react';
import CTA from './CTA';

const questions = [
  {
    id: 1,
    question: 'Preferisci lavorare su progetti a lungo termine o su task rapidi?',
    trait: 'orientamento_temporale',
    options: [
      { value: 'long', label: 'Progetti a lungo termine', score: { strategico: 3, operativo: 1 } },
      { value: 'short', label: 'Task rapidi e concreti', score: { operativo: 3, strategico: 1 } },
      { value: 'both', label: 'Entrambi in equilibrio', score: { strategico: 2, operativo: 2 } },
    ],
  },
  {
    id: 2,
    question: 'Come gestisci meglio le informazioni e i processi?',
    trait: 'organizzazione',
    options: [
      { value: 'structure', label: 'Strutturate e organizzate con procedure chiare', score: { organizzazione: 3, flessibilità: 1 } },
      { value: 'flexible', label: 'Flessibili e adattabili al contesto', score: { flessibilità: 3, organizzazione: 1 } },
      { value: 'mix', label: 'Mix: struttura quando serve, flessibilità quando serve', score: { organizzazione: 2, flessibilità: 2 } },
    ],
  },
  {
    id: 3,
    question: 'In una riunione o situazione di gruppo, preferisci:',
    trait: 'leadership',
    options: [
      { value: 'lead', label: 'Guidare e presentare le mie idee', score: { leadership: 3, collaborazione: 1 } },
      { value: 'observe', label: 'Osservare, analizzare e contribuire quando richiesto', score: { analisi: 3, leadership: 1 } },
      { value: 'collaborate', label: 'Collaborare attivamente con il team', score: { collaborazione: 3, leadership: 2 } },
    ],
  },
  {
    id: 4,
    question: 'Quando prendi decisioni importanti, ti basi più su:',
    trait: 'decision_making',
    options: [
      { value: 'data', label: 'Dati, numeri e analisi oggettive', score: { analitico: 3, intuitivo: 1 } },
      { value: 'intuition', label: 'Intuizione, esperienza e istinto', score: { intuitivo: 3, analitico: 1 } },
      { value: 'both', label: 'Combinazione di dati e intuizione', score: { analitico: 2, intuitivo: 2 } },
    ],
  },
  {
    id: 5,
    question: 'Come gestisci meglio lo stress e la pressione?',
    trait: 'gestione_stress',
    options: [
      { value: 'plan', label: 'Pianificando preventivamente per evitare sorprese', score: { pianificazione: 3, adattabilità: 1 } },
      { value: 'adapt', label: 'Adattandomi rapidamente al momento', score: { adattabilità: 3, pianificazione: 1 } },
      { value: 'delegate', label: 'Delegando quando possibile e concentrandomi sul prioritario', score: { delega: 3, autonomia: 2 } },
    ],
  },
  {
    id: 6,
    question: 'Preferisci lavorare:',
    trait: 'autonomia',
    options: [
      { value: 'alone', label: 'In autonomia, con obiettivi chiari e libertà operativa', score: { autonomia: 3, collaborazione: 1 } },
      { value: 'team', label: 'In team, con confronto continuo e supporto reciproco', score: { collaborazione: 3, autonomia: 1 } },
      { value: 'mix_work', label: 'Mix: autonomia per le mie attività, team per progetti complessi', score: { autonomia: 2, collaborazione: 2 } },
    ],
  },
  {
    id: 7,
    question: 'Cosa ti motiva di più nel lavoro?',
    trait: 'motivazione',
    options: [
      { value: 'results', label: 'Raggiungere risultati concreti e misurabili', score: { risultati: 3, processo: 1 } },
      { value: 'process', label: 'Migliorare processi e creare soluzioni innovative', score: { processo: 3, risultati: 1 } },
      { value: 'people', label: 'Sviluppare le persone e costruire relazioni', score: { relazioni: 3, risultati: 2 } },
    ],
  },
  {
    id: 8,
    question: 'Come comunichi meglio le tue idee?',
    trait: 'comunicazione',
    options: [
      { value: 'direct', label: 'Direttamente, in modo chiaro e conciso', score: { comunicazione_diretta: 3, comunicazione_empatica: 1 } },
      { value: 'detailed', label: 'Con dettagli, esempi e contesto completo', score: { comunicazione_dettagliata: 3, comunicazione_diretta: 1 } },
      { value: 'adaptive', label: 'Adatto lo stile al contesto e all\'interlocutore', score: { comunicazione_adattiva: 3, comunicazione_diretta: 2 } },
    ],
  },
];

export default function IPTeaser() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [completed, setCompleted] = useState(false);
  const [profile, setProfile] = useState<{
    tratti: { [key: string]: number };
    puntiForza: string[];
    areeMiglioramento: string[];
    suggerimenti: string[];
  } | null>(null);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // Calcola profilo completo
      const calculatedProfile = calculateProfile({ ...answers, [questionId]: value });
      setProfile(calculatedProfile);
      setCompleted(true);
    }
  };

  const calculateProfile = (ans: { [key: number]: string }) => {
    const tratti: { [key: string]: number } = {};
    const puntiForza: string[] = [];
    const areeMiglioramento: string[] = [];
    const suggerimenti: string[] = [];

    // Calcola punteggi per ogni tratto
    questions.forEach((q) => {
      const answer = ans[q.id];
      const option = q.options.find((opt) => opt.value === answer);
      if (option && option.score) {
        Object.entries(option.score).forEach(([trait, score]) => {
          tratti[trait] = (tratti[trait] || 0) + score;
        });
      }
    });

    // Identifica punti di forza (tratti con punteggio >= 6)
    const trattiOrdinati = Object.entries(tratti)
      .sort(([, a], [, b]) => b - a);

    trattiOrdinati.slice(0, 3).forEach(([trait, score]) => {
      if (score >= 6) {
        switch (trait) {
          case 'strategico':
            puntiForza.push('Orientamento strategico: eccelli nella visione a lungo termine e nella pianificazione');
            break;
          case 'operativo':
            puntiForza.push('Orientamento operativo: sei efficace nell\'esecuzione rapida e nella gestione di task concreti');
            break;
          case 'organizzazione':
            puntiForza.push('Organizzazione: punti di forza nella strutturazione e nella gestione di processi');
            break;
          case 'leadership':
            puntiForza.push('Leadership: tendenza naturale a guidare e influenzare gli altri');
            break;
          case 'analitico':
            puntiForza.push('Approccio analitico: decisioni basate su dati e evidenze oggettive');
            break;
          case 'collaborazione':
            puntiForza.push('Collaborazione: efficacia nel lavorare in team e costruire relazioni');
            break;
          case 'autonomia':
            puntiForza.push('Autonomia: capacità di lavorare in modo indipendente con risultati concreti');
            break;
          case 'risultati':
            puntiForza.push('Orientamento ai risultati: focus su obiettivi misurabili e performance');
            break;
        }
      }
    });

    // Identifica aree di miglioramento (tratti con punteggio <= 4)
    trattiOrdinati.slice(-3).forEach(([trait, score]) => {
      if (score <= 4) {
        switch (trait) {
          case 'flessibilità':
            areeMiglioramento.push('Flessibilità: potresti beneficiare di maggiore adattabilità ai cambiamenti');
            break;
          case 'pianificazione':
            areeMiglioramento.push('Pianificazione: sviluppo della capacità di anticipare e organizzare preventivamente');
            break;
          case 'comunicazione_dettagliata':
            areeMiglioramento.push('Comunicazione: potenziamento della capacità di esprimere idee in modo dettagliato');
            break;
        }
      }
    });

    // Suggerimenti basati sul profilo
    if (tratti.leadership >= 6 && tratti.collaborazione <= 4) {
      suggerimenti.push('Considera di bilanciare leadership e collaborazione: coinvolgi di più il team nelle decisioni');
    }
    if (tratti.analitico >= 6 && tratti.intuitivo <= 4) {
      suggerimenti.push('Valuta di integrare più intuizione nelle decisioni rapide quando i dati sono limitati');
    }
    if (tratti.organizzazione >= 6 && tratti.flessibilità <= 4) {
      suggerimenti.push('Sviluppa maggiore flessibilità per gestire situazioni impreviste e cambiamenti rapidi');
    }
    if (tratti.autonomia >= 6 && tratti.collaborazione <= 4) {
      suggerimenti.push('Migliora la collaborazione: condividi di più informazioni e coinvolgi il team');
    }

    if (suggerimenti.length === 0) {
      suggerimenti.push('Profilo bilanciato: continua a sviluppare tutti gli aspetti per massimizzare il tuo potenziale');
    }

    return { tratti, puntiForza, areeMiglioramento, suggerimenti };
  };

  const resetQuestionnaire = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setCompleted(false);
    setProfile(null);
  };

  if (completed && profile) {
    return (
      <div className="bg-white rounded-[var(--radius-card)] p-8 border border-[var(--color-line)]">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-2">
            Il tuo profilo attitudinale preliminare
          </h3>
          <p className="text-sm text-[var(--color-subtext)] mb-6">
            Questo è solo un teaser. L'analisi completa i-Profile misura 10 tratti chiave con questionario esteso OSM.
          </p>
        </div>

        {/* Punti di Forza */}
        {profile.puntiForza.length > 0 && (
          <div className="mb-6">
            <h4 className="font-heading font-bold text-lg text-[var(--color-text)] mb-3 flex items-center gap-2">
              <span className="text-green-600">✓</span>
              Punti di Forza
            </h4>
            <div className="space-y-2">
              {profile.puntiForza.map((punto, idx) => (
                <div
                  key={idx}
                  className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4"
                >
                  <p className="text-sm text-green-900">{punto}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aree di Miglioramento */}
        {profile.areeMiglioramento.length > 0 && (
          <div className="mb-6">
            <h4 className="font-heading font-bold text-lg text-[var(--color-text)] mb-3 flex items-center gap-2">
              <span className="text-blue-600">📈</span>
              Aree di Sviluppo
            </h4>
            <div className="space-y-2">
              {profile.areeMiglioramento.map((area, idx) => (
                <div
                  key={idx}
                  className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4"
                >
                  <p className="text-sm text-blue-900">{area}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggerimenti */}
        {profile.suggerimenti.length > 0 && (
          <div className="mb-6">
            <h4 className="font-heading font-bold text-lg text-[var(--color-text)] mb-3 flex items-center gap-2">
              <span className="text-[var(--color-primary)]">💡</span>
              Suggerimenti Pratici
            </h4>
            <div className="space-y-2">
              {profile.suggerimenti.map((suggerimento, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--color-card)] rounded-lg p-4 border border-[var(--color-line)]"
                >
                  <p className="text-sm text-[var(--color-text)]">{suggerimento}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA per i-Profile completo */}
        <div className="bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 rounded-lg p-6 border border-[var(--color-primary)]/20 mb-4">
          <p className="text-sm font-semibold text-[var(--color-text)] mb-2">
            📊 Vuoi l'analisi completa i-Profile?
          </p>
          <p className="text-xs text-[var(--color-subtext)] mb-4">
            L'i-Profile ufficiale OSM misura 10 tratti attitudinali con questionario esteso (242 domande nella fase di sviluppo) e ti dà:
          </p>
          <ul className="text-xs text-[var(--color-subtext)] space-y-1 mb-4 list-disc list-inside">
            <li>Report completo con evidenze attitudinali dettagliate</li>
            <li>Punti di forza e aree di miglioramento specifici</li>
            <li>Debrief 60-90 minuti con piano d'azione personalizzato</li>
            <li>Check-list comportamenti da monitorare nei prossimi 90 giorni</li>
          </ul>
          <CTA href="/i-profile" variant="primary" size="base" className="w-full">
            Scopri i-Profile completo →
          </CTA>
        </div>

        <button
          onClick={resetQuestionnaire}
          className="w-full text-sm text-[var(--color-subtext)] hover:text-[var(--color-primary)] transition-colors"
        >
          Rifai il questionario
        </button>

        <p className="text-xs text-[var(--color-subtext)] text-center mt-4">
          ⚠️ Disclaimer: Questo teaser non sostituisce l'i-Profile ufficiale OSM. I risultati sono indicativi.
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
