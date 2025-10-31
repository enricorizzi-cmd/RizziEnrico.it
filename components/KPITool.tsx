'use client';

import { useState } from 'react';
import CTA from './CTA';

interface KPIToolProps {
  toolType: 'waste-cost' | 'breakeven' | 'pricing' | 'inventory-turnover' | 'working-capital-cycle' | 'margin' | 'inventory-days' | 'turnover';
  className?: string;
}

export default function KPITool({ toolType, className = '' }: KPIToolProps) {
  const [results, setResults] = useState<{ [key: string]: number | string } | null>(null);

  if (toolType === 'waste-cost') {
    return <WasteCostTool />;
  } else if (toolType === 'breakeven') {
    return <BreakevenTool />;
  } else if (toolType === 'pricing') {
    return <PricingTool />;
  } else if (toolType === 'inventory-turnover') {
    return <InventoryTurnoverTool />;
  } else if (toolType === 'working-capital-cycle') {
    return <WorkingCapitalCycleTool />;
  } else if (toolType === 'margin') {
    return <MarginTool />;
  } else if (toolType === 'inventory-days') {
    return <InventoryDaysTool />;
  } else if (toolType === 'turnover') {
    return <TurnoverTool />;
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

function BreakevenTool() {
  const [costiFissi, setCostiFissi] = useState(10000);
  const [prezzo, setPrezzo] = useState(100);
  const [costoVariabile, setCostoVariabile] = useState(60);

  const margineUnitario = prezzo - costoVariabile;
  const quantitaBreakEven = margineUnitario > 0 ? costiFissi / margineUnitario : 0;

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
      <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
        Calcola il Break-Even
      </h3>
      <p className="text-sm text-[var(--color-subtext)] mb-6">
        Quante unità devi vendere per coprire i costi fissi?
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Costi fissi mensili (€)
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
            Prezzo di vendita unitario (€)
          </label>
          <input
            type="number"
            value={prezzo}
            onChange={(e) => setPrezzo(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Costo variabile unitario (€)
          </label>
          <input
            type="number"
            value={costoVariabile}
            onChange={(e) => setCostoVariabile(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
      </div>

      <div className="bg-[var(--color-primary)] text-white rounded-lg p-6 mb-6">
        <div className="text-center">
          <div className="text-sm opacity-90 mb-2">Quantità Break-Even</div>
          <div className="text-3xl font-bold">
            {quantitaBreakEven > 0 ? Math.ceil(quantitaBreakEven) : 'Non raggiungibile'}
          </div>
          {quantitaBreakEven > 0 && (
            <div className="mt-2 text-sm opacity-90">
              Margine unitario: €{margineUnitario.toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PricingTool() {
  const [costoVariabile, setCostoVariabile] = useState(50);
  const [incidenzaCF, setIncidenzaCF] = useState(0.3);
  const [margineDesiderato, setMargineDesiderato] = useState(0.15);

  const prezzoBase = costoVariabile / (1 - incidenzaCF);
  const prezzoConMargine = costoVariabile / (1 - incidenzaCF - margineDesiderato);

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
      <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
        Calcola il Prezzo
      </h3>
      <p className="text-sm text-[var(--color-subtext)] mb-6">
        Prezzo da costo variabile + ricarico fisso e margine desiderato.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Costo variabile unitario (€)
          </label>
          <input
            type="number"
            value={costoVariabile}
            onChange={(e) => setCostoVariabile(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Incidenza costi fissi (0.1 = 10%)
          </label>
          <input
            type="number"
            value={incidenzaCF}
            onChange={(e) => setIncidenzaCF(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
            max="1"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Margine desiderato (0.15 = 15%)
          </label>
          <input
            type="number"
            value={margineDesiderato}
            onChange={(e) => setMargineDesiderato(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
            max="1"
            step="0.01"
          />
        </div>
      </div>

      <div className="bg-[var(--color-primary)] text-white rounded-lg p-6 mb-6">
        <div className="text-center mb-4">
          <div className="text-sm opacity-90 mb-2">Prezzo base (CF coperti)</div>
          <div className="text-2xl font-bold">€{prezzoBase.toFixed(2)}</div>
        </div>
        <div className="pt-4 border-t border-white/20 text-center">
          <div className="text-sm opacity-90 mb-2">Prezzo con margine {Math.round(margineDesiderato * 100)}%</div>
          <div className="text-2xl font-bold">€{prezzoConMargine.toFixed(2)}</div>
        </div>
      </div>
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
        🤖 Ciclo del Capitale Circolante (con AI)
      </h3>
      <p className="text-sm text-[var(--color-subtext)] mb-6">
        Calcola quanto tempo impiega il capitale a tornare liquidità: giorni magazzino + giorni incasso - giorni pagamento.
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

function MarginTool() {
  const [fatturato, setFatturato] = useState(100000);
  const [costiTotali, setCostiTotali] = useState(75000);

  const margineOperativo = fatturato > 0 ? ((fatturato - costiTotali) / fatturato) * 100 : 0;
  const utileOperativo = fatturato - costiTotali;

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
      <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
        Margine Operativo
      </h3>
      <p className="text-sm text-[var(--color-subtext)] mb-6">
        Qual è la redditività operativa della tua azienda?
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Fatturato (€)
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
            Costi totali (€)
          </label>
          <input
            type="number"
            value={costiTotali}
            onChange={(e) => setCostiTotali(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
      </div>

      <div className="bg-[var(--color-primary)] text-white rounded-lg p-6 mb-6">
        <div className="text-center mb-4">
          <div className="text-sm opacity-90 mb-2">Margine Operativo</div>
          <div className={`text-3xl font-bold ${margineOperativo >= 10 ? 'text-green-200' : margineOperativo >= 5 ? 'text-yellow-200' : 'text-red-200'}`}>
            {margineOperativo.toFixed(1)}%
          </div>
        </div>
        <div className="pt-4 border-t border-white/20 text-center">
          <div className="text-sm opacity-90 mb-2">Utile Operativo</div>
          <div className={`text-2xl font-bold ${utileOperativo >= 0 ? 'text-green-200' : 'text-red-200'}`}>
            €{utileOperativo.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <CTA href="/contatti" variant="primary" size="base" className="w-full">
        Migliora margini →
      </CTA>
    </div>
  );
}

function InventoryDaysTool() {
  const [valoreMagazzino, setValoreMagazzino] = useState(50000);
  const [costoVenduto, setCostoVenduto] = useState(300000);
  const [giorni, setGiorni] = useState(365);

  const giorniMagazzino = costoVenduto > 0 ? (valoreMagazzino / (costoVenduto / giorni)) : 0;

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
      <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
        Giorni di Magazzino
      </h3>
      <p className="text-sm text-[var(--color-subtext)] mb-6">
        Quanti giorni di scorte hai in magazzino?
      </p>

      <div className="space-y-4 mb-6">
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
            Periodo di riferimento (giorni)
          </label>
          <input
            type="number"
            value={giorni}
            onChange={(e) => setGiorni(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="1"
          />
        </div>
      </div>

      <div className="bg-[var(--color-primary)] text-white rounded-lg p-6 mb-6">
        <div className="text-center">
          <div className="text-sm opacity-90 mb-2">Giorni di magazzino</div>
          <div className={`text-3xl font-bold ${giorniMagazzino <= 60 ? 'text-green-200' : giorniMagazzino <= 90 ? 'text-yellow-200' : 'text-red-200'}`}>
            {Math.round(giorniMagazzino)} giorni
          </div>
          <div className="mt-4 text-xs opacity-75">
            Benchmark: 30-60 giorni ottimale
          </div>
        </div>
      </div>

      <CTA href="/contatti" variant="primary" size="base" className="w-full">
        Ottimizza magazzino →
      </CTA>
    </div>
  );
}

function TurnoverTool() {
  const [uscite, setUscite] = useState(3);
  const [addettiMedio, setAddettiMedio] = useState(20);
  const [periodo, setPeriodo] = useState(12);

  const turnover = addettiMedio > 0 ? (uscite / addettiMedio) * 100 : 0;

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
      <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
        Tasso di Turnover
      </h3>
      <p className="text-sm text-[var(--color-subtext)] mb-6">
        Quanto è stabile il tuo team? Calcola il turnover del personale.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Uscite dal personale (n°)
          </label>
          <input
            type="number"
            value={uscite}
            onChange={(e) => setUscite(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Addetti medio periodo (n°)
          </label>
          <input
            type="number"
            value={addettiMedio}
            onChange={(e) => setAddettiMedio(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Periodo (mesi)
          </label>
          <input
            type="number"
            value={periodo}
            onChange={(e) => setPeriodo(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="1"
          />
        </div>
      </div>

      <div className="bg-[var(--color-primary)] text-white rounded-lg p-6 mb-6">
        <div className="text-center">
          <div className="text-sm opacity-90 mb-2">Tasso di Turnover</div>
          <div className={`text-3xl font-bold ${turnover <= 10 ? 'text-green-200' : turnover <= 20 ? 'text-yellow-200' : 'text-red-200'}`}>
            {turnover.toFixed(1)}%
          </div>
          <div className="mt-4 text-xs opacity-75">
            Benchmark PMI: {'<'}10% ottimale
          </div>
        </div>
      </div>

      <CTA href="/contatti" variant="primary" size="base" className="w-full">
        Riduci turnover →
      </CTA>
    </div>
  );
}

