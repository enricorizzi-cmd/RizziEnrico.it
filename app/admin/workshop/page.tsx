'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface WorkshopLead {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  azienda: string;
  ruolo: string;
  provincia: string;
  fonte: string;
  problema: string | null;
  stato: string;
  numero_chiamate: number;
  ultima_chiamata: string | null;
  note: string | null;
  created_at: string;
}

interface DashboardStats {
  totale_iscritti: number;
  per_fonte: Record<string, number>;
  per_stato: Record<string, number>;
  presenti: number;
  tasso_presenza: number;
  totale_chiamate: number;
  confermati: number;
}

interface ProblemInsight {
  problema: string;
  frequenza: number;
  categoria: string;
  priorita: 'alta' | 'media' | 'bassa';
  rilevanza?: string;
}

interface Insights {
  categorie: Array<{
    nome: string;
    problemi: string[];
    frequenza: number;
    priorita: 'alta' | 'media' | 'bassa';
  }>;
  problemi_principali: ProblemInsight[];
  sintesi: string;
  raccomandazioni?: string[];
  totale_problemi: number;
  problemi_analizzati?: number;
}

export default function WorkshopAdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<WorkshopLead[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    stato: 'tutti',
    fonte: 'tutti',
  });
  const [editingLead, setEditingLead] = useState<WorkshopLead | null>(null);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    fetchLeads();
    fetchStats();
    fetchInsights();
  }, [filters]);

  const fetchLeads = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.stato !== 'tutti') params.append('stato', filters.stato);
      if (filters.fonte !== 'tutti') params.append('fonte', filters.fonte);

      const response = await fetch(`/api/admin/workshop/leads?${params.toString()}`);
      if (!response.ok) throw new Error('Errore nel caricamento');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/workshop/stats');
      if (!response.ok) throw new Error('Errore nel caricamento stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchInsights = async () => {
    setLoadingInsights(true);
    try {
      const response = await fetch('/api/admin/workshop/insights');
      if (!response.ok) throw new Error('Errore nel caricamento insights');
      const data = await response.json();
      setInsights(data.insights);
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setLoadingInsights(false);
    }
  };

  const updateLead = async (leadId: string, updates: Partial<WorkshopLead>) => {
    try {
      const response = await fetch(`/api/admin/workshop/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Errore nell\'aggiornamento');
      await fetchLeads();
      await fetchStats();
      setEditingLead(null);
    } catch (error) {
      console.error('Error updating lead:', error);
      alert('Errore nell\'aggiornamento');
    }
  };

  const incrementCalls = (lead: WorkshopLead) => {
    updateLead(lead.id, {
      numero_chiamate: lead.numero_chiamate + 1,
      ultima_chiamata: new Date().toISOString(),
    });
  };

  const markPresent = (lead: WorkshopLead) => {
    updateLead(lead.id, { stato: 'presente' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 font-heading">
                Dashboard Workshop 12 Dicembre
              </h1>
              <p className="text-gray-600">Gestione registrazioni e lead</p>
            </div>
            <div className="flex gap-4">
              <a
                href="/admin/workshop/analisi-email"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                📧 Analisi Email
              </a>
              <a
                href="/admin/test-maturita/analisi"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                📊 Analisi Test
              </a>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl font-bold text-purple-600">{stats.totale_iscritti}</div>
              <div className="text-gray-600">Totale Iscritti</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl font-bold text-green-600">{stats.presenti}</div>
              <div className="text-gray-600">Presenti</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl font-bold text-blue-600">
                {stats.tasso_presenza.toFixed(1)}%
              </div>
              <div className="text-gray-600">Tasso Presenza</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl font-bold text-orange-600">{stats.totale_chiamate}</div>
              <div className="text-gray-600">Totale Chiamate</div>
            </div>
          </div>
        )}

        {/* Grafici */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Grafico a Torta - Lead per Fonte */}
            {stats.per_fonte && Object.keys(stats.per_fonte).length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Lead per Fonte</h2>
                <div className="h-64">
                  <Pie
                    data={{
                      labels: Object.keys(stats.per_fonte),
                      datasets: [
                        {
                          label: 'Lead',
                          data: Object.values(stats.per_fonte),
                          backgroundColor: [
                            'rgba(147, 51, 234, 0.8)',
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(239, 68, 68, 0.8)',
                          ],
                          borderColor: [
                            'rgba(147, 51, 234, 1)',
                            'rgba(59, 130, 246, 1)',
                            'rgba(16, 185, 129, 1)',
                            'rgba(245, 158, 11, 1)',
                            'rgba(239, 68, 68, 1)',
                          ],
                          borderWidth: 2,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                        },
                      },
                    }}
                  />
                </div>
              </div>
            )}

            {/* Grafico a Barre - Lead per Stato */}
            {stats.per_stato && Object.keys(stats.per_stato).length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Lead per Stato</h2>
                <div className="h-64">
                  <Bar
                    data={{
                      labels: Object.keys(stats.per_stato).map((s) => 
                        s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ')
                      ),
                      datasets: [
                        {
                          label: 'Numero Lead',
                          data: Object.values(stats.per_stato),
                          backgroundColor: 'rgba(59, 130, 246, 0.8)',
                          borderColor: 'rgba(59, 130, 246, 1)',
                          borderWidth: 2,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            stepSize: 1,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Riquadro Insight AI */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-3 rounded-lg">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Insight AI - Analisi Problemi</h2>
                  <p className="text-sm text-gray-600">Analisi intelligente dei problemi segnalati dagli iscritti</p>
                </div>
              </div>
              {loadingInsights && (
                <div className="text-sm text-gray-500">Analizzando...</div>
              )}
            </div>

            {insights && (
              <div className="space-y-6">
                {/* Sintesi */}
                {insights.sintesi && (
                  <div className="bg-white rounded-lg p-4 border-l-4 border-purple-600">
                    <h3 className="font-semibold text-gray-800 mb-2">📋 Sintesi</h3>
                    <p className="text-gray-700">{insights.sintesi}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      {insights.totale_problemi} problemi analizzati
                    </div>
                  </div>
                )}

                {/* Problemi Principali */}
                {insights.problemi_principali && insights.problemi_principali.length > 0 && (
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">🎯 Problemi Principali</h3>
                    <div className="space-y-3">
                      {insights.problemi_principali.slice(0, 5).map((problema, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border-l-4 ${
                            problema.priorita === 'alta'
                              ? 'bg-red-50 border-red-500'
                              : problema.priorita === 'media'
                              ? 'bg-yellow-50 border-yellow-500'
                              : 'bg-blue-50 border-blue-500'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold px-2 py-1 rounded bg-white">
                                  {problema.categoria}
                                </span>
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                  problema.priorita === 'alta'
                                    ? 'bg-red-100 text-red-700'
                                    : problema.priorita === 'media'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {problema.priorita.toUpperCase()}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {problema.frequenza} {problema.frequenza === 1 ? 'volta' : 'volte'}
                                </span>
                              </div>
                              <p className="text-gray-800 font-medium">{problema.problema}</p>
                              {problema.rilevanza && (
                                <p className="text-sm text-gray-600 mt-1">{problema.rilevanza}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categorie */}
                {insights.categorie && insights.categorie.length > 0 && (
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">📁 Categorie</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {insights.categorie.map((categoria, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-800">{categoria.nome}</span>
                            <span className="text-xs text-gray-500">
                              {categoria.frequenza} {categoria.frequenza === 1 ? 'problema' : 'problemi'}
                            </span>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {categoria.problemi.slice(0, 3).map((p, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="flex-1">{p}</span>
                              </li>
                            ))}
                            {categoria.problemi.length > 3 && (
                              <li className="text-xs text-gray-500">
                                +{categoria.problemi.length - 3} altri
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Raccomandazioni */}
                {insights.raccomandazioni && insights.raccomandazioni.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-gray-800 mb-3">💡 Raccomandazioni</h3>
                    <ul className="space-y-2">
                      {insights.raccomandazioni.map((rec, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="mr-2 text-blue-600">→</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(!insights.problemi_principali || insights.problemi_principali.length === 0) && (
                  <div className="bg-white rounded-lg p-6 text-center text-gray-500">
                    <p>Nessun problema segnalato ancora.</p>
                    <p className="text-sm mt-2">I problemi verranno analizzati automaticamente quando disponibili.</p>
                  </div>
                )}
              </div>
            )}

            {!insights && !loadingInsights && (
              <div className="bg-white rounded-lg p-6 text-center text-gray-500">
                <p>Caricamento insight...</p>
              </div>
            )}
          </div>
        </div>

        {/* Filtri */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Filtra per Stato</label>
              <select
                value={filters.stato}
                onChange={(e) => setFilters({ ...filters, stato: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="tutti">Tutti</option>
                <option value="nuovo">Nuovo</option>
                <option value="contattato">Contattato</option>
                <option value="confermato">Confermato</option>
                <option value="presente">Presente</option>
                <option value="no_show">No Show</option>
                <option value="non_interessato">Non Interessato</option>
                <option value="da_chiamare_per_checkup">Da Chiamare per Check-up</option>
                <option value="in_valutazione">In Valutazione</option>
                <option value="checkup_venduto">Check-up Venduto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Filtra per Fonte</label>
              <select
                value={filters.fonte}
                onChange={(e) => setFilters({ ...filters, fonte: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="tutti">Tutte</option>
                <option value="BNI">BNI</option>
                <option value="OSM">OSM</option>
                <option value="Social">Social</option>
                <option value="Passaparola">Passaparola</option>
                <option value="Altro">Altro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabella Lead */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            {leads.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Nessun lead trovato con i filtri selezionati.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome / Azienda
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contatti
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fonte
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Problema Segnalato
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Note
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stato
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chiamate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {lead.nome} {lead.cognome}
                      </div>
                      <div className="text-sm text-gray-500">{lead.azienda}</div>
                      <div className="text-xs text-gray-400">{lead.ruolo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.email}</div>
                      <div className="text-sm text-gray-500">{lead.telefono}</div>
                      <div className="text-xs text-gray-400">{lead.provincia}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {lead.fonte}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        {lead.problema ? (
                          <span 
                            className="block overflow-hidden text-ellipsis" 
                            style={{ 
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              maxHeight: '3em'
                            }}
                            title={lead.problema}
                          >
                            {lead.problema}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic">Nessun problema segnalato</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-900 max-w-xs flex-1">
                          {lead.note ? (
                            <span 
                              className="block overflow-hidden text-ellipsis"
                              style={{ 
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                maxHeight: '3em'
                              }}
                              title={lead.note}
                            >
                              {lead.note}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">Nessuna nota</span>
                          )}
                        </div>
                        <button
                          onClick={() => setEditingLead(lead)}
                          className="text-purple-600 hover:text-purple-900 p-1"
                          title="Modifica note"
                        >
                          ✏️
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={lead.stato}
                        onChange={(e) => updateLead(lead.id, { stato: e.target.value })}
                        className="text-sm border rounded px-2 py-1"
                      >
                        <option value="nuovo">Nuovo</option>
                        <option value="contattato">Contattato</option>
                        <option value="confermato">Confermato</option>
                        <option value="presente">Presente</option>
                        <option value="no_show">No Show</option>
                        <option value="non_interessato">Non Interessato</option>
                        <option value="da_chiamare_per_checkup">Da Chiamare per Check-up</option>
                        <option value="in_valutazione">In Valutazione</option>
                        <option value="checkup_venduto">Check-up Venduto</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">{lead.numero_chiamate}</div>
                      {lead.ultima_chiamata && (
                        <div className="text-xs text-gray-500">
                          {new Date(lead.ultima_chiamata).toLocaleDateString('it-IT')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => incrementCalls(lead)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Incrementa chiamate"
                        >
                          📞
                        </button>
                        <button
                          onClick={() => markPresent(lead)}
                          className="text-green-600 hover:text-green-900"
                          title="Segna presente"
                        >
                          ✅
                        </button>
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Modal Note */}
        {editingLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">
                Note per {editingLead.nome} {editingLead.cognome}
              </h3>
              <textarea
                value={editingLead.note || ''}
                onChange={(e) => setEditingLead({ ...editingLead, note: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border rounded-lg mb-4"
                placeholder="Aggiungi note..."
              />
              <div className="flex gap-4">
                <button
                  onClick={() => updateLead(editingLead.id, { note: editingLead.note })}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                >
                  Salva
                </button>
                <button
                  onClick={() => setEditingLead(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

