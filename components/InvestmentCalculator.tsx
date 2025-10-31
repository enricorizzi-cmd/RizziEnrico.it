'use client';

import { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import CTA from './CTA';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CalculationResult {
  years: number[];
  simpleInterest: number[];
  compoundInterest: number[];
  finalSimple: number;
  finalCompound: number;
  totalContributed: number;
  gainSimple: number;
  gainCompound: number;
}

export default function InvestmentCalculator() {
  const [currentAge, setCurrentAge] = useState<number>(35);
  const [retirementAge, setRetirementAge] = useState<number>(67);
  const [currentInvestments, setCurrentInvestments] = useState<number>(50000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualReturn, setAnnualReturn] = useState<number>(10);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const years = useMemo(() => retirementAge - currentAge, [currentAge, retirementAge]);

  const calculateResults = useMemo((): CalculationResult => {
    if (years <= 0 || annualReturn < 0) {
      return {
        years: [],
        simpleInterest: [],
        compoundInterest: [],
        finalSimple: currentInvestments,
        finalCompound: currentInvestments,
        totalContributed: 0,
        gainSimple: 0,
        gainCompound: 0,
      };
    }

    const yearLabels: number[] = [];
    const simpleInterestValues: number[] = [];
    const compoundInterestValues: number[] = [];

    let simpleTotal = currentInvestments;
    let compoundTotal = currentInvestments;
    const yearlyContribution = monthlyContribution * 12;
    const annualReturnDecimal = annualReturn / 100;

    for (let year = 0; year <= years; year++) {
      yearLabels.push(year);
      
      // Interesse semplice: interesse solo sul capitale iniziale, contributi accumulano senza interesse
      if (year === 0) {
        simpleTotal = currentInvestments;
      } else {
        // Interesse solo sul capitale iniziale, contributi si sommano senza interessi
        const interestOnInitial = currentInvestments * annualReturnDecimal * year;
        const contributionsTotal = yearlyContribution * year;
        simpleTotal = currentInvestments + interestOnInitial + contributionsTotal;
      }
      simpleInterestValues.push(simpleTotal);

      // Interesse composto: su tutto il capitale accumulato
      if (year === 0) {
        compoundTotal = currentInvestments;
      } else {
        compoundTotal = compoundTotal * (1 + annualReturnDecimal) + yearlyContribution;
      }
      compoundInterestValues.push(compoundTotal);
    }

    const totalContributed = currentInvestments + (yearlyContribution * years);
    const finalSimple = simpleInterestValues[simpleInterestValues.length - 1] || currentInvestments;
    const finalCompound = compoundInterestValues[compoundInterestValues.length - 1] || currentInvestments;
    const gainSimple = finalSimple - totalContributed;
    const gainCompound = finalCompound - totalContributed;

    return {
      years: yearLabels,
      simpleInterest: simpleInterestValues,
      compoundInterest: compoundInterestValues,
      finalSimple,
      finalCompound,
      totalContributed,
      gainSimple,
      gainCompound,
    };
  }, [currentAge, retirementAge, currentInvestments, monthlyContribution, annualReturn, years]);

  const chartData = {
    labels: calculateResults.years.map((y) => `${y + currentAge} anni`),
    datasets: [
      {
        label: 'Interesse Semplice',
        data: calculateResults.simpleInterest,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Interesse Composto',
        data: calculateResults.compoundInterest,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: €${context.parsed.y.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '€' + value.toLocaleString('it-IT');
          },
        },
      },
    },
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/ai/analyze-investment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentAge,
          retirementAge,
          currentInvestments,
          monthlyContribution,
          annualReturn,
          years,
          finalSimple: calculateResults.finalSimple,
          finalCompound: calculateResults.finalCompound,
          totalContributed: calculateResults.totalContributed,
          gainSimple: calculateResults.gainSimple,
          gainCompound: calculateResults.gainCompound,
        }),
      });

      if (!response.ok) throw new Error('Errore nell\'analisi');

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error:', error);
      alert('Errore nell\'analisi. Riprova.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
          Calcolatore di Investimento
        </h2>
        <p className="text-lg text-[var(--color-subtext)] max-w-2xl mx-auto">
          Inserisci i tuoi dati per calcolare il patrimonio futuro con interesse semplice e composto
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
          <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-6">
            Inserisci le tue informazioni
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Età attuale
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                min="18"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Età pensionamento
              </label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                min="currentAge"
                max="100"
              />
              <p className="text-xs text-[var(--color-subtext)] mt-1">
                Se sei nato nel 1960 o dopo, puoi andare in pensione a 67 anni con pensione completa.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Quanto hai già investito?
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text)]">€</span>
                <input
                  type="number"
                  value={currentInvestments}
                  onChange={(e) => setCurrentInvestments(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 border border-[var(--color-line)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  min="0"
                  step="1000"
                />
              </div>
              <p className="text-xs text-[var(--color-subtext)] mt-1">
                Totale di tutti i tuoi conti investimento, inclusi 401(k), IRA, fondi comuni, ecc.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Contributo mensile
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text)]">€</span>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 border border-[var(--color-line)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  min="0"
                  step="50"
                />
              </div>
              <p className="text-xs text-[var(--color-subtext)] mt-1">
                Importo che investi ogni mese. Si raccomanda di investire il 15% dello stipendio.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Rendimento annuo atteso
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  className="w-full px-4 py-2 pr-8 border border-[var(--color-line)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  min="0"
                  max="30"
                  step="0.5"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text)]">%</span>
              </div>
              <p className="text-xs text-[var(--color-subtext)] mt-1">
                Rendimento che pensi genereranno i tuoi investimenti nel tempo. Storicamente, il rendimento a 30 anni dell'S&P 500 è stato circa il 10-12%.¹
              </p>
            </div>
          </div>
        </div>

        {/* Risultati */}
        <div className="space-y-6">
          {/* Risultati Principali */}
          <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/80 text-white rounded-[var(--radius-card)] p-8">
            <h3 className="font-heading text-xl font-bold mb-6 text-center">
              Patrimonio a {retirementAge} anni
            </h3>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-xs opacity-90 mb-1">Interesse Semplice</div>
                <div className="text-2xl font-bold">
                  €{calculateResults.finalSimple.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-xs opacity-90 mb-1">Interesse Composto</div>
                <div className="text-2xl font-bold">
                  €{calculateResults.finalCompound.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
            <div className="border-t border-white/20 pt-6 mt-6">
              <h4 className="font-semibold mb-4 text-center">Guadagno Totale</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-xs opacity-90 mb-1">Interesse Semplice</div>
                  <div className="text-xl font-bold">
                    €{calculateResults.gainSimple.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-xs opacity-90 mb-1">Interesse Composto</div>
                  <div className="text-xl font-bold">
                    €{calculateResults.gainCompound.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/20 text-center text-sm opacity-90">
              <div>Totale versato: €{calculateResults.totalContributed.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</div>
              <div className="mt-2">
                Differenza composto vs semplice: €{(calculateResults.finalCompound - calculateResults.finalSimple).toLocaleString('it-IT', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Grafico */}
          <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
            <h3 className="font-heading text-lg font-bold text-[var(--color-text)] mb-4">
              Andamento Patrimonio
            </h3>
            <div className="h-64 md:h-80">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Analisi AI */}
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || years <= 0}
            className="w-full px-6 py-4 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Analizzando con AI...</span>
              </>
            ) : (
              <>
                <span>🤖</span>
                <span>Analisi Personalizzata by Enrico Rizzi con AI →</span>
              </>
            )}
          </button>

          {analysis && (
            <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
              <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
                Analisi Personalizzata
              </h3>
              <div className="prose prose-sm max-w-none">
                <div className="text-[var(--color-text)] whitespace-pre-line">
                  {analysis.report}
                </div>
                {analysis.recommendations && analysis.recommendations.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-[var(--color-text)] mb-3">Raccomandazioni:</h4>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((rec: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[var(--color-text)]">
                          <span className="text-[var(--color-primary)] mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
