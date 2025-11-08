'use client';

import { useState } from 'react';
import CTA from './CTA';
import ReactMarkdown from 'react-markdown';

export default function MansionariGeneratorAI() {
  const [departments, setDepartments] = useState<string[]>(['']);
  const [roles, setRoles] = useState<string[]>(['']);
  const [activities, setActivities] = useState<string[]>(['']);
  const [mansionari, setMansionari] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const addDepartment = () => setDepartments([...departments, '']);
  const addRole = () => setRoles([...roles, '']);
  const addActivity = () => setActivities([...activities, '']);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-mansionari', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          departments: departments.filter(d => d.trim()),
          roles: roles.filter(r => r.trim()),
          activities: activities.filter(a => a.trim()),
        }),
      });

      if (!response.ok) throw new Error('Errore nella generazione');

      const data = await response.json();
      setMansionari(data.mansionari);
    } catch (error) {
      console.error('Error:', error);
      alert('Errore nella generazione. Riprova.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
      <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-4">
        🤖 Generatore Mansionari AI
      </h3>
      <p className="text-sm text-[var(--color-subtext)] mb-6">
        Descrivi la tua struttura aziendale e genera mansionari completi seguendo lo standard OSM.
      </p>

      <div className="space-y-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Dipartimenti / Aree
          </label>
          {departments.map((dept, idx) => (
            <input
              key={idx}
              type="text"
              value={dept}
              onChange={(e) => {
                const newDepts = [...departments];
                newDepts[idx] = e.target.value;
                setDepartments(newDepts);
              }}
              className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg mb-2"
              placeholder="Es. Produzione, Vendite, Amministrazione..."
            />
          ))}
          <button
            type="button"
            onClick={addDepartment}
            className="text-sm text-[var(--color-primary)] hover:underline"
          >
            + Aggiungi dipartimento
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Ruoli Principali
          </label>
          {roles.map((role, idx) => (
            <input
              key={idx}
              type="text"
              value={role}
              onChange={(e) => {
                const newRoles = [...roles];
                newRoles[idx] = e.target.value;
                setRoles(newRoles);
              }}
              className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg mb-2"
              placeholder="Es. Direttore Produzione, Responsabile Vendite..."
            />
          ))}
          <button
            type="button"
            onClick={addRole}
            className="text-sm text-[var(--color-primary)] hover:underline"
          >
            + Aggiungi ruolo
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Attività Principali
          </label>
          {activities.map((activity, idx) => (
            <input
              key={idx}
              type="text"
              value={activity}
              onChange={(e) => {
                const newActivities = [...activities];
                newActivities[idx] = e.target.value;
                setActivities(newActivities);
              }}
              className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg mb-2"
              placeholder="Es. Gestione produzione, Vendita prodotti..."
            />
          ))}
          <button
            type="button"
            onClick={addActivity}
            className="text-sm text-[var(--color-primary)] hover:underline"
          >
            + Aggiungi attività
          </button>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity mb-6"
      >
        {isGenerating ? 'Generando mansionari...' : 'Genera con AI →'}
      </button>

      {mansionari && mansionari.mansionari && (
        <div className="space-y-4 border-t border-[var(--color-line)] pt-6">
          <h4 className="font-heading font-bold text-lg text-[var(--color-text)] mb-3">
            Mansionari Generati
          </h4>
          {mansionari.mansionari.map((mans: any, idx: number) => (
            <div
              key={idx}
              className="bg-[var(--color-card)] rounded-lg p-4 border border-[var(--color-line)]"
            >
              <div className="mb-2">
                <h5 className="font-semibold text-[var(--color-text)]">{mans.ruolo}</h5>
                <p className="text-xs text-[var(--color-subtext)]">{mans.dipartimento}</p>
              </div>
              <div className="text-sm text-[var(--color-text)] mb-3">
                <strong>Obiettivo:</strong>{' '}
                <span className="inline">
                  <ReactMarkdown className="prose prose-sm max-w-none [&>p]:inline [&>p]:m-0">
                    {mans.obiettivo}
                  </ReactMarkdown>
                </span>
              </div>
              <div className="mb-3">
                <strong className="text-sm text-[var(--color-text)]">Responsabilità:</strong>
                <ul className="list-disc list-inside text-sm text-[var(--color-subtext)] mt-1">
                  {mans.responsabilita?.map((resp: string, i: number) => (
                    <li key={i}>
                      <ReactMarkdown className="prose prose-sm max-w-none [&>p]:inline [&>p]:m-0">
                        {resp}
                      </ReactMarkdown>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-3">
                <strong className="text-sm text-[var(--color-text)]">Attività Operative:</strong>
                <ul className="list-disc list-inside text-sm text-[var(--color-subtext)] mt-1">
                  {mans.attivitaOperative?.slice(0, 5).map((att: string, i: number) => (
                    <li key={i}>
                      <ReactMarkdown className="prose prose-sm max-w-none [&>p]:inline [&>p]:m-0">
                        {att}
                      </ReactMarkdown>
                    </li>
                  ))}
                </ul>
              </div>
              {mans.kpi && mans.kpi.length > 0 && (
                <div>
                  <strong className="text-sm text-[var(--color-text)]">KPI di Riferimento:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {mans.kpi.map((kpi: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded"
                      >
                        {kpi}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <CTA href="/contatti" variant="primary" size="base" className="w-full mt-6">
            Personalizza mansionari →
          </CTA>
        </div>
      )}
    </div>
  );
}

