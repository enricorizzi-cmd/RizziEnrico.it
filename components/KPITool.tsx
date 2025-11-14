'use client';

import { useState } from 'react';
import CTA from './CTA';

interface KPIToolProps {
  toolType: 'waste-cost' | 'inventory-turnover' | 'working-capital-cycle';
  className?: string;
}

export default function KPITool({ toolType, className = '' }: KPIToolProps) {
  if (toolType === 'waste-cost') {
    return <WasteCostTool />;
  } else if (toolType === 'inventory-turnover') {
    return <InventoryTurnoverTool />;
  } else if (toolType === 'working-capital-cycle') {
    return <WorkingCapitalCycleTool />;
  }

  return null;
}

function WasteCostTool() {
  const [addetti, setAddetti] = useState(10);
  const [costoOrario, setCostoOrario] = useState(25);
  const [minutiSpreco, setMinutiSpreco] = useState(30);
  const [giorniLavorativi, setGiorniLavorativi] = useState(220);

  const costoGiornaliero = addetti * (costoOrario * minutiSpreco / 60);
  const costoAnnuo = costoGiornaliero * giorniLavorativi;

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
      <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
        Calcola il costo dello spreco di tempo
      </h3>
      <p className="text-sm text-[var(--color-subtext)] mb-6">
        Quanto costa ogni giorno il tempo perso dalla tua azienda? Scopri il costo reale dello spreco.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Numero addetti
          </label>
          <input
            type="number"
            value={addetti}
            onChange={(e) => setAddetti(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Costo orario medio (€)
          </label>
          <input
            type="number"
            value={costoOrario}
            onChange={(e) => setCostoOrario(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
            step="0.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Minuti di spreco al giorno per addetto
          </label>
          <input
            type="number"
            value={minutiSpreco}
            onChange={(e) => setMinutiSpreco(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Giorni lavorativi all'anno
          </label>
          <input
            type="number"
            value={giorniLavorativi}
            onChange={(e) => setGiorniLavorativi(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
      </div>

      <div className="bg-[var(--color-primary)] text-white rounded-lg p-6 mb-6">
        <div className="text-center">
          <div className="text-sm opacity-90 mb-2">Costo giornaliero</div>
          <div className="text-3xl font-bold">€{costoGiornaliero.toFixed(2)}</div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 text-center">
          <div className="text-sm opacity-90 mb-2">Costo annuo</div>
          <div className="text-3xl font-bold">€{costoAnnuo.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</div>
        </div>
      </div>

      <CTA href="/contatti" variant="primary" size="base" className="w-full">
        Scopri come azzerarlo →
      </CTA>
    </div>
  );
}

function InventoryTurnoverTool() {
  const [costoVenduto, setCostoVenduto] = useState(300000);
  const [valoreMagazzinoMedio, setValoreMagazzinoMedio] = useState(50000);

  const rotazione = valoreMagazzinoMedio > 0 ? costoVenduto / valoreMagazzinoMedio : 0;
  const giorniRotazione = rotazione > 0 ? 365 / rotazione : 0;

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
      <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
        Rotazione di Magazzino
      </h3>
      <p className="text-sm text-[var(--color-subtext)] mb-6">
        Quante volte all'anno il magazzino si rinnova? Indica efficienza gestione scorte.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Costo del venduto annuo (€)
          </label>
          <input
            type="number"
            value={costoVenduto}
            onChange={(e) => setCostoVenduto(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Valore magazzino medio (€)
          </label>
          <input
            type="number"
            value={valoreMagazzinoMedio}
            onChange={(e) => setValoreMagazzinoMedio(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
      </div>

      <div className="bg-[var(--color-primary)] text-white rounded-lg p-6 mb-6">
        <div className="text-center mb-4">
          <div className="text-sm opacity-90 mb-2">Rotazione annua</div>
          <div className={`text-3xl font-bold ${rotazione >= 6 ? 'text-green-200' : rotazione >= 4 ? 'text-yellow-200' : 'text-red-200'}`}>
            {rotazione.toFixed(2)} volte
          </div>
        </div>
        <div className="pt-4 border-t border-white/20 text-center">
          <div className="text-sm opacity-90 mb-2">Giorni di rotazione</div>
          <div className={`text-2xl font-bold ${giorniRotazione <= 60 ? 'text-green-200' : giorniRotazione <= 90 ? 'text-yellow-200' : 'text-red-200'}`}>
            {Math.round(giorniRotazione)} giorni
          </div>
        </div>
        <div className="mt-4 text-xs opacity-75 text-center">
          Benchmark PMI: 4-6 rotazioni/anno ottimale
        </div>
      </div>

      <CTA href="/contatti" variant="primary" size="base" className="w-full">
        Ottimizza magazzino →
      </CTA>
    </div>
  );
}

function WorkingCapitalCycleTool() {
  const [fatturato, setFatturato] = useState(1000000);
  const [costiFissi, setCostiFissi] = useState(200000);
  const [costiVariabili, setCostiVariabili] = useState(600000);
  const [creditiCommerciali, setCreditiCommerciali] = useState(150000);
  const [valoreMagazzino, setValoreMagazzino] = useState(80000);
  const [debitiCommerciali, setDebitiCommerciali] = useState(120000);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const costoVenduto = costiVariabili;
  const rotazioneMagazzino = valoreMagazzino > 0 ? costoVenduto / valoreMagazzino : 0;
  const giorniMagazzino = rotazioneMagazzino > 0 ? 365 / rotazioneMagazzino : 0;
  const dso = fatturato > 0 ? (creditiCommerciali / fatturato) * 365 : 0;
  const dpo = costoVenduto > 0 ? (debitiCommerciali / costoVenduto) * 365 : 0;
  const cicloCapitale = giorniMagazzino + dso - dpo;
  const capitaleCircolante = creditiCommerciali + valoreMagazzino - debitiCommerciali;

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/ai/analyze-working-capital', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fatturato,
          costiFissi,
          costiVariabili,
          creditiCommerciali,
          valoreMagazzino,
          debitiCommerciali,
          cicloCapitale,
          capitaleCircolante,
          giorniMagazzino,
          dso,
          dpo,
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
    <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
      <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
        🤖 Ciclo del Capitale Circolante (con Intelligenza Artificiale)
      </h3>
      <p className="text-sm text-[var(--color-subtext)] mb-6">
        Calcola quanto tempo impiega il capitale a tornare liquidità: giorni magazzino + giorni incasso (DSO - giorni medi di incasso) - giorni pagamento (DPO - giorni medi di pagamento).
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Fatturato annuo (€)
          </label>
          <input
            type="number"
            value={fatturato}
            onChange={(e) => setFatturato(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Costi fissi annui (€)
          </label>
          <input
            type="number"
            value={costiFissi}
            onChange={(e) => setCostiFissi(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Costi variabili annui (€)
          </label>
          <input
            type="number"
            value={costiVariabili}
            onChange={(e) => setCostiVariabili(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Crediti commerciali (€)
          </label>
          <input
            type="number"
            value={creditiCommerciali}
            onChange={(e) => setCreditiCommerciali(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Valore magazzino (€)
          </label>
          <input
            type="number"
            value={valoreMagazzino}
            onChange={(e) => setValoreMagazzino(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Debiti commerciali (€)
          </label>
          <input
            type="number"
            value={debitiCommerciali}
            onChange={(e) => setDebitiCommerciali(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
      </div>

      <div className="bg-[var(--color-primary)] text-white rounded-lg p-6 mb-6">
        <div className="text-center mb-4">
          <div className="text-sm opacity-90 mb-2">Ciclo Capitale Circolante</div>
          <div className={`text-3xl font-bold ${cicloCapitale <= 60 ? 'text-green-200' : cicloCapitale <= 90 ? 'text-yellow-200' : 'text-red-200'}`}>
            {Math.round(cicloCapitale)} giorni
          </div>
        </div>
        <div className="pt-4 border-t border-white/20 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="opacity-90">Giorni magazzino:</span>
            <span className="font-semibold">{Math.round(giorniMagazzino)} giorni</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-90">DSO (giorni incasso):</span>
            <span className="font-semibold">{Math.round(dso)} giorni</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-90">DPO (giorni pagamento):</span>
            <span className="font-semibold">-{Math.round(dpo)} giorni</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 text-center">
          <div className="text-sm opacity-90 mb-2">Capitale Circolante</div>
          <div className={`text-2xl font-bold ${capitaleCircolante >= 0 ? 'text-green-200' : 'text-red-200'}`}>
            €{capitaleCircolante.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        className="w-full px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity mb-4"
      >
        {isAnalyzing ? 'Analizzando con AI...' : '🤖 Analizza con AI →'}
      </button>

      {analysis && (
        <div className="space-y-4 border-t border-[var(--color-line)] pt-6">
          <div>
            <h4 className="font-heading font-bold text-lg text-[var(--color-text)] mb-3">
              Analisi AI
            </h4>
            <p className="text-sm text-[var(--color-text)] mb-4">{analysis.sintesi}</p>
            
            {analysis.raccomandazioni && analysis.raccomandazioni.length > 0 && (
              <div>
                <h5 className="font-semibold text-[var(--color-text)] mb-2">Raccomandazioni:</h5>
                <ul className="space-y-2">
                  {analysis.raccomandazioni.map((rec: string, idx: number) => (
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

      <CTA href="/contatti" variant="primary" size="base" className="w-full mt-4">
        Ottimizza capitale circolante →
      </CTA>
    </div>
  );
}

