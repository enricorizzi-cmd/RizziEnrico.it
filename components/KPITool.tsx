'use client';

import { useState } from 'react';
import CTA from './CTA';

interface KPIToolProps {
  toolType: 'waste-cost' | 'breakeven' | 'pricing' | 'roi' | 'productivity' | 'margin' | 'inventory-days' | 'turnover';
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
  } else if (toolType === 'roi') {
    return <ROITool />;
  } else if (toolType === 'productivity') {
    return <ProductivityTool />;
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

function ROITool() {
  const [investimento, setInvestimento] = useState(10000);
  const [ricavo, setRicavo] = useState(15000);

  const roi = investimento > 0 ? ((ricavo - investimento) / investimento) * 100 : 0;
  const guadagnoNetto = ricavo - investimento;

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
      <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
        Calcola il ROI
      </h3>
      <p className="text-sm text-[var(--color-subtext)] mb-6">
        Return on Investment: quanto rende il tuo investimento?
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Investimento iniziale (€)
          </label>
          <input
            type="number"
            value={investimento}
            onChange={(e) => setInvestimento(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Ricavo totale ottenuto (€)
          </label>
          <input
            type="number"
            value={ricavo}
            onChange={(e) => setRicavo(Number(e.target.value))}
            className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg"
            min="0"
          />
        </div>
      </div>

      <div className="bg-[var(--color-primary)] text-white rounded-lg p-6 mb-6">
        <div className="text-center mb-4">
          <div className="text-sm opacity-90 mb-2">ROI</div>
          <div className={`text-3xl font-bold ${roi >= 0 ? 'text-green-200' : 'text-red-200'}`}>
            {roi.toFixed(1)}%
          </div>
        </div>
        <div className="pt-4 border-t border-white/20 text-center">
          <div className="text-sm opacity-90 mb-2">Guadagno Netto</div>
          <div className={`text-2xl font-bold ${guadagnoNetto >= 0 ? 'text-green-200' : 'text-red-200'}`}>
            €{guadagnoNetto.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <CTA href="/contatti" variant="primary" size="base" className="w-full">
        Calcola ROI consulenza →
      </CTA>
    </div>
  );
}

function ProductivityTool() {
  const [fatturato, setFatturato] = useState(1000000);
  const [addetti, setAddetti] = useState(20);

  const produttivita = addetti > 0 ? fatturato / addetti : 0;

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
      <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
        Produttività per Addetto
      </h3>
      <p className="text-sm text-[var(--color-subtext)] mb-6">
        Quanto fattura ogni addetto nella tua azienda?
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
      </div>

      <div className="bg-[var(--color-primary)] text-white rounded-lg p-6 mb-6">
        <div className="text-center">
          <div className="text-sm opacity-90 mb-2">Produttività per addetto</div>
          <div className="text-3xl font-bold">€{produttivita.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</div>
          <div className="mt-4 text-xs opacity-75">
            Benchmark PMI: €50.000 - €80.000
          </div>
        </div>
      </div>

      <CTA href="/contatti" variant="primary" size="base" className="w-full">
        Migliora produttività →
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

