'use client';

import { useState } from 'react';
import CTA from './CTA';

interface KPIToolProps {
  toolType: 'waste-cost' | 'breakeven' | 'pricing';
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

