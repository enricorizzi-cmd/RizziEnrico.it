'use client';

import { useState } from 'react';
import CTA from './CTA';

export default function KPIAnalysisAI() {
  const [kpiData, setKpiData] = useState({
    fatturato: '',
    marginalita: '',
    dso: '',
    tempiConsegna: '',
    produttivitaAddetto: '',
  });
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/ai/analyze-kpi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kpiData }),
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
    <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
      <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
        🤖 Analisi KPI Automatica AI
      </h3>
      <p className="text-sm text-[var(--color-subtext)] mb-6">
        Inserisci i tuoi KPI principali e ricevi un'analisi automatica con criticità e suggerimenti.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Fatturato annuo (€)
          </label>
          <input
            type="number"
            value={kpiData.fatturato}
            onChange={(e) => setKpiData({ ...kpiData, fatturato: e.target.value })}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            placeholder="Es. 1000000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Marginalità operativa (%)
          </label>
          <input
            type="number"
            value={kpiData.marginalita}
            onChange={(e) => setKpiData({ ...kpiData, marginalita: e.target.value })}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            placeholder="Es. 15"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            DSO - Giorni medi incasso (giorni)
          </label>
          <input
            type="number"
            value={kpiData.dso}
            onChange={(e) => setKpiData({ ...kpiData, dso: e.target.value })}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            placeholder="Es. 60"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Tempi medi consegna (giorni)
          </label>
          <input
            type="number"
            value={kpiData.tempiConsegna}
            onChange={(e) => setKpiData({ ...kpiData, tempiConsegna: e.target.value })}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            placeholder="Es. 30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Produttività per addetto (€/anno)
          </label>
          <input
            type="number"
            value={kpiData.produttivitaAddetto}
            onChange={(e) => setKpiData({ ...kpiData, produttivitaAddetto: e.target.value })}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            placeholder="Es. 80000"
          />
        </div>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        className="w-full px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity mb-6"
      >
        {isAnalyzing ? 'Analizzando...' : 'Analizza con AI →'}
      </button>

      {analysis && (
        <div className="space-y-4 border-t border-[var(--color-line)] pt-6">
          <div>
            <h4 className="font-heading font-bold text-lg text-[var(--color-text)] mb-3">
              Sintesi
            </h4>
            <p className="text-sm text-[var(--color-text)]">{analysis.sintesi}</p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg text-[var(--color-text)] mb-3">
              Criticità Identificate
            </h4>
            <div className="space-y-3">
              {analysis.criticita?.map((crit: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-[var(--color-card)] rounded-lg p-4 border border-[var(--color-line)]"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-semibold text-[var(--color-text)]">{crit.titolo}</h5>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        crit.priorita === 'urgente'
                          ? 'bg-red-100 text-red-700'
                          : crit.priorita === 'importante'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {crit.priorita}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-subtext)] mb-2">{crit.descrizione}</p>
                  <p className="text-sm font-medium text-[var(--color-text)]">
                    💡 Azione: {crit.azione}
                  </p>
                  {crit.margineMiglioramento && (
                    <p className="text-xs text-[var(--color-primary)] mt-1">
                      Potenziale miglioramento: {crit.margineMiglioramento}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {analysis.prossimiPassi && analysis.prossimiPassi.length > 0 && (
            <div>
              <h4 className="font-heading font-bold text-lg text-[var(--color-text)] mb-3">
                Prossimi Passi
              </h4>
              <ul className="space-y-2">
                {analysis.prossimiPassi.map((passo: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[var(--color-text)]">
                    <span className="text-[var(--color-primary)] mt-1">→</span>
                    <span>{passo}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <CTA href="/contatti" variant="primary" size="base" className="w-full mt-6">
            Pianifica miglioramento →
          </CTA>
        </div>
      )}
    </div>
  );
}

