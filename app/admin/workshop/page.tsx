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
  tasso_conferme: number;
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
  const [viewingProblema, setViewingProblema] = useState<string | null>(null);

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
    // Avvia la chiamata
    window.location.href = `tel:${lead.telefono.replace(/\s/g, '')}`;
  };

  const confirmParticipation = (lead: WorkshopLead) => {
    updateLead(lead.id, { stato: 'confermato' });
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
    <div className="min-h-screen bg-[var(--color-background)] py-8 relative overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-blue-400/20 blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-indigo-400/20 blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 font-heading text-[var(--color-text)]">
                Dashboard Workshop 12 Dicembre
              </h1>
              <p className="text-[var(--color-subtext)]">Gestione registrazioni e lead</p>
            </div>
            <div className="flex gap-4">
              <a
                href="/admin/workshop/slide"
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold shadow-lg hover:shadow-cyan-500/30"
              >
                🎯 Slide Workshop
              </a>
              <a
                href="/admin/workshop/analisi-email"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow-lg hover:shadow-purple-500/30"
              >
                📧 Analisi Email
              </a>
              <a
                href="/admin/test-maturita/analisi"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-blue-500/30"
              >
                📊 Analisi Test
              </a>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <div className="glass p-6 rounded-[var(--radius-card)] border border-[var(--color-line)]">
              <div className="text-3xl font-bold text-purple-600 mb-1">{stats.totale_iscritti}</div>
              <div className="text-[var(--color-subtext)] text-sm font-medium uppercase tracking-wide">Totale Iscritti</div>
            </div>
            <div className="glass p-6 rounded-[var(--radius-card)] border border-[var(--color-line)]">
              <div className="text-3xl font-bold text-indigo-600 mb-1">{stats.confermati}</div>
              <div className="text-[var(--color-subtext)] text-sm font-medium uppercase tracking-wide">Confermati</div>
            </div>
            <div className="glass p-6 rounded-[var(--radius-card)] border border-[var(--color-line)]">
              <div className="text-3xl font-bold text-cyan-600 mb-1">
                {stats.tasso_conferme.toFixed(1)}%
              </div>
              <div className="text-[var(--color-subtext)] text-sm font-medium uppercase tracking-wide">Tasso Conferme</div>
            </div>
            <div className="glass p-6 rounded-[var(--radius-card)] border border-[var(--color-line)]">
              <div className="text-3xl font-bold text-green-600 mb-1">{stats.presenti}</div>
              <div className="text-[var(--color-subtext)] text-sm font-medium uppercase tracking-wide">Presenti</div>
            </div>
            <div className="glass p-6 rounded-[var(--radius-card)] border border-[var(--color-line)]">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {stats.tasso_presenza.toFixed(1)}%
              </div>
              <div className="text-[var(--color-subtext)] text-sm font-medium uppercase tracking-wide">Tasso Presenza</div>
            </div>
            <div className="glass p-6 rounded-[var(--radius-card)] border border-[var(--color-line)]">
              <div className="text-3xl font-bold text-orange-600 mb-1">{stats.totale_chiamate}</div>
              <div className="text-[var(--color-subtext)] text-sm font-medium uppercase tracking-wide">Totale Chiamate</div>
            </div>
          </div>
        )}

        {/* Grafici */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Grafico a Torta - Lead per Fonte */}
            {stats.per_fonte && Object.keys(stats.per_fonte).length > 0 && (
              <div className="glass p-6 rounded-[var(--radius-card)] border border-[var(--color-line)]">
                <h2 className="text-xl font-bold mb-4 font-heading text-[var(--color-text)]">Lead per Fonte</h2>
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
                          labels: { color: '#4B5563' }
                        },
                      },
                    }}
                  />
                </div>
              </div>
            )}

            {/* Grafico a Barre - Lead per Stato */}
            {stats.per_stato && Object.keys(stats.per_stato).length > 0 && (
              <div className="glass p-6 rounded-[var(--radius-card)] border border-[var(--color-line)]">
                <h2 className="text-xl font-bold mb-4 font-heading text-[var(--color-text)]">Lead per Stato</h2>
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
                            color: '#6B7280'
                          },
                          grid: {
                            color: 'rgba(0,0,0,0.05)'
                          }
                        },
                        x: {
                          ticks: {
                            color: '#6B7280'
                          },
                          grid: {
                            display: false
                          }
                        }
                      },
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Filtri */}
        <div className="glass p-6 rounded-[var(--radius-card)] border border-[var(--color-line)] mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[var(--color-text)]">Filtra per Stato</label>
              <select
                value={filters.stato}
                onChange={(e) => setFilters({ ...filters, stato: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/80"
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
              <label className="block text-sm font-semibold mb-2 text-[var(--color-text)]">Filtra per Fonte</label>
              <select
                value={filters.fonte}
                onChange={(e) => setFilters({ ...filters, fonte: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/80"
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
        <div className="glass rounded-[var(--radius-card)] border border-[var(--color-line)] overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            {leads.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <div className="text-4xl mb-4">🔍</div>
                <p>Nessun lead trovato con i filtri selezionati.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50/80 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Nome / Azienda
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Contatti
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Fonte
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Problema Segnalato
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Note
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Stato
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Chiamate
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/40 divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-purple-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-gray-900">
                          {lead.nome} {lead.cognome}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">{lead.azienda}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">{lead.ruolo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-2">
                          <a
                            href={`mailto:${lead.email}?subject=Workshop AI EXPERIENCE del 12 Dicembre`}
                            className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-800 flex items-center justify-center transition-colors"
                            title="Invia email"
                          >
                            ✉️
                          </a>
                          <span>{lead.email}</span>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                          <a
                            href={`https://wa.me/${lead.telefono.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Buongiorno ${lead.nome},
ti contatto riguardo l'iscrizione al workshop AI EXPERIENCE del 12 Dicembre.
Chiedo di confermarmi la tua presenza rispondendo a questo messaggio così da poterti aggiungere nel gruppo whatsapp dedicato ad aggiornamenti e info importanti.
Non vediamo l'ora di averti nostro ospite.

Grazie, a presto!

Rizzi Enrico - Osm`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-800 flex items-center justify-center transition-colors"
                            title="Invia messaggio WhatsApp"
                          >
                            📱
                          </a>
                          <span>{lead.telefono}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1 pl-6">{lead.provincia}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                          {lead.fonte}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">
                          {lead.problema ? (
                            <div
                              className="bg-red-50 p-2 rounded border border-red-100 text-xs text-red-800 cursor-pointer hover:bg-red-100 transition-colors"
                              onClick={() => setViewingProblema(lead.problema || null)}
                              title="Clicca per vedere il testo completo"
                            >
                              <span
                                className="block overflow-hidden text-ellipsis"
                                style={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  maxHeight: '3em'
                                }}
                              >
                                {lead.problema}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400 italic text-xs">Nessun problema</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <div className="text-sm text-gray-900 max-w-xs flex-1">
                            {lead.note ? (
                              <span
                                className="block overflow-hidden text-ellipsis bg-yellow-50 p-2 rounded border border-yellow-100 text-xs text-yellow-800"
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
                              <span className="text-gray-400 italic text-xs">Nessuna nota</span>
                            )}
                          </div>
                          <button
                            onClick={() => setEditingLead(lead)}
                            className="text-gray-400 hover:text-purple-600 p-1 transition-colors"
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
                          className={`text-xs font-semibold border rounded px-2 py-1 focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer ${lead.stato === 'nuovo' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            lead.stato === 'contattato' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                              lead.stato === 'confermato' ? 'bg-green-50 text-green-700 border-green-200' :
                                'bg-gray-50 text-gray-700 border-gray-200'
                            }`}
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
                        <div className="text-sm font-bold text-center w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                          {lead.numero_chiamate}
                        </div>
                        {lead.ultima_chiamata && (
                          <div className="text-[10px] text-gray-500 text-center mt-1">
                            {new Date(lead.ultima_chiamata).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' })}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2 justify-center items-center">
                          <div className="flex flex-col items-center gap-1">
                            <button
                              onClick={() => incrementCalls(lead)}
                              className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 flex items-center justify-center transition-colors"
                              title="Chiama"
                            >
                              📞
                            </button>
                            <span className="text-[10px] text-gray-500">Chiama</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <button
                              onClick={() => confirmParticipation(lead)}
                              className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-800 flex items-center justify-center transition-colors"
                              title="Conferma partecipazione"
                            >
                              ✓
                            </button>
                            <span className="text-[10px] text-gray-500">Conferma</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <button
                              onClick={() => markPresent(lead)}
                              className="w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-800 flex items-center justify-center transition-colors"
                              title="Registra presenza"
                            >
                              ✅
                            </button>
                            <span className="text-[10px] text-gray-500">Presenza</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Riquadro Insight AI */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-purple-50/90 via-blue-50/90 to-indigo-50/90 backdrop-blur-md rounded-[var(--radius-card)] shadow-lg p-6 border border-purple-200/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-3 rounded-xl shadow-lg shadow-purple-500/20">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 font-heading">Insight AI - Analisi Problemi</h2>
                  <p className="text-sm text-gray-600">Analisi intelligente dei problemi segnalati dagli iscritti</p>
                </div>
              </div>
              {loadingInsights && (
                <div className="text-sm text-purple-600 font-medium animate-pulse">Analizzando...</div>
              )}
            </div>

            {insights && (
              <div className="space-y-6">
                {/* Sintesi */}
                {insights.sintesi && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-5 border-l-4 border-purple-600 shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <span>📋</span> Sintesi
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{insights.sintesi}</p>
                    <div className="mt-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {insights.totale_problemi} problemi analizzati
                    </div>
                  </div>
                )}

                {/* Problemi Principali */}
                {insights.problemi_principali && insights.problemi_principali.length > 0 && (
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-5 border border-white/50">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <span>🎯</span> Problemi Principali
                    </h3>
                    <div className="space-y-3">
                      {insights.problemi_principali.slice(0, 5).map((problema, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-l-4 transition-all hover:shadow-md ${problema.priorita === 'alta'
                            ? 'bg-red-50/80 border-red-500'
                            : problema.priorita === 'media'
                              ? 'bg-yellow-50/80 border-yellow-500'
                              : 'bg-blue-50/80 border-blue-500'
                            }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/80 shadow-sm">
                                  {problema.categoria}
                                </span>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm ${problema.priorita === 'alta'
                                  ? 'bg-red-100 text-red-700'
                                  : problema.priorita === 'media'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-blue-100 text-blue-700'
                                  }`}>
                                  {problema.priorita}
                                </span>
                                <span className="text-xs text-gray-500 font-medium ml-auto">
                                  {problema.frequenza} {problema.frequenza === 1 ? 'segnalazione' : 'segnalazioni'}
                                </span>
                              </div>
                              <p className="text-gray-800 font-medium">{problema.problema}</p>
                              {problema.rilevanza && (
                                <p className="text-sm text-gray-600 mt-2 italic border-t border-gray-200/50 pt-2">{problema.rilevanza}</p>
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
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-5 border border-white/50">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <span>📁</span> Categorie
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {insights.categorie.map((categoria, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50/80 rounded-lg border border-gray-200/60 hover:border-purple-200 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-gray-800">{categoria.nome}</span>
                            <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-100">
                              {categoria.frequenza} {categoria.frequenza === 1 ? 'problema' : 'problemi'}
                            </span>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-2">
                            {categoria.problemi.slice(0, 3).map((p, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-purple-400 mt-1">•</span>
                                <span className="flex-1">{p}</span>
                              </li>
                            ))}
                            {categoria.problemi.length > 3 && (
                              <li className="text-xs text-purple-600 font-medium pl-4">
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
                  <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/90 rounded-lg p-5 border border-blue-200/60">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <span>💡</span> Raccomandazioni Strategiche
                    </h3>
                    <ul className="space-y-3">
                      {insights.raccomandazioni.map((rec, index) => (
                        <li key={index} className="flex items-start text-gray-700 bg-white/60 p-3 rounded-lg border border-blue-100/50">
                          <span className="mr-3 text-blue-600 font-bold">→</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(!insights.problemi_principali || insights.problemi_principali.length === 0) && (
                  <div className="bg-white/60 rounded-lg p-8 text-center text-gray-500">
                    <p className="text-lg">Nessun problema segnalato ancora.</p>
                    <p className="text-sm mt-2 opacity-75">I problemi verranno analizzati automaticamente quando disponibili.</p>
                  </div>
                )}
              </div>
            )}

            {!insights && !loadingInsights && (
              <div className="bg-white/60 rounded-lg p-8 text-center text-gray-500">
                <p>Caricamento insight...</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Note */}
        {editingLead && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-up">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold font-heading text-gray-900">
                  Note per {editingLead.nome} {editingLead.cognome}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{editingLead.azienda}</p>
              </div>
              <div className="p-6">
                <textarea
                  value={editingLead.note || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, note: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none"
                  placeholder="Aggiungi note..."
                  autoFocus
                />
              </div>
              <div className="p-6 bg-gray-50 flex gap-4">
                <button
                  onClick={() => updateLead(editingLead.id, { note: editingLead.note })}
                  className="flex-1 bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 font-semibold shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Salva Note
                </button>
                <button
                  onClick={() => setEditingLead(null)}
                  className="flex-1 bg-white text-gray-700 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 font-semibold transition-all"
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Problema */}
        {viewingProblema && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setViewingProblema(null)}>
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold font-heading text-gray-900">
                  Problema Segnalato
                </h3>
              </div>
              <div className="p-6">
                <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-sm text-red-800 whitespace-pre-wrap">
                  {viewingProblema}
                </div>
              </div>
              <div className="p-6 bg-gray-50 flex justify-end">
                <button
                  onClick={() => setViewingProblema(null)}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

