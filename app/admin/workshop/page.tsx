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

  useEffect(() => {
    fetchLeads();
    fetchStats();
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
          <h1 className="text-4xl font-bold mb-2 font-heading">
            Dashboard Workshop 12 Dicembre
          </h1>
          <p className="text-gray-600">Gestione registrazioni e lead</p>
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

