'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Pie, Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TestStats {
  summary: {
    total_tests: number;
    average_score: number;
    average_level: string | null;
    level_distribution: Array<{
      level: string;
      count: number;
      percentage: number;
    }>;
  };
  by_level: Record<string, number>;
  by_category: Record<string, { total: number; average: number }>;
  score_distribution: Array<{ range: string; count: number }>;
  timeline: Array<{ date: string; count: number }>;
  bottlenecks: Array<{ name: string; count: number; severity: string }>;
  diagnosi_distribution: Record<string, number>;
  recent_tests: Array<{
    id: string;
    nome: string;
    cognome: string;
    email: string;
    punteggio: number;
    livello: string;
    created_at: string;
  }>;
}

const LEVEL_COLORS: Record<string, string> = {
  'Principiante': '#ef4444',
  'Intermedio': '#f59e0b',
  'Avanzato': '#10b981',
  'Esperto': '#3b82f6',
  'Non definito': '#6b7280',
};

const SEVERITY_COLORS: Record<string, string> = {
  'RISCHIO CRITICO': '#ef4444',
  'RISCHIO ALTO': '#f97316',
  'MEDIA': '#eab308',
  'BASSA': '#22c55e',
};

export default function TestMaturitaAnalyticsDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<TestStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [loadingInsights, setLoadingInsights] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchAIInsights();
  }, []);

  const fetchAIInsights = async () => {
    try {
      const response = await fetch('/api/admin/test-maturita/insights');
      if (!response.ok) throw new Error('Errore nel caricamento');
      const data = await response.json();
      setAiInsights(data.insights);
    } catch (error) {
      console.error('Error fetching AI insights:', error);
    } finally {
      setLoadingInsights(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/test-maturita/stats');
      if (!response.ok) throw new Error('Errore nel caricamento');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center py-12 text-red-600 bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Errore nel caricamento</h2>
          <p>Impossibile recuperare i dati statistici.</p>
        </div>
      </div>
    );
  }

  // Grafico distribuzione livelli
  const levelData = {
    labels: stats.summary.level_distribution.map(l => l.level),
    datasets: [
      {
        data: stats.summary.level_distribution.map(l => l.count),
        backgroundColor: stats.summary.level_distribution.map(l =>
          LEVEL_COLORS[l.level] || '#6b7280'
        ),
        borderWidth: 0,
      },
    ],
  };

  // Grafico Radar (Media Categorie)
  const radarData = {
    labels: Object.keys(stats.by_category),
    datasets: [
      {
        label: 'Media Settore',
        data: Object.values(stats.by_category).map(c => c.average),
        backgroundColor: 'rgba(124, 58, 237, 0.2)',
        borderColor: 'rgba(124, 58, 237, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(124, 58, 237, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(124, 58, 237, 1)',
      },
    ],
  };

  // Grafico distribuzione punteggi
  const scoreDistributionData = {
    labels: stats.score_distribution.map(s => s.range),
    datasets: [
      {
        label: 'Numero di test',
        data: stats.score_distribution.map(s => s.count),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderRadius: 6,
      },
    ],
  };

  // Timeline test compilati
  const timelineData = {
    labels: stats.timeline.map(t => new Date(t.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' })),
    datasets: [
      {
        label: 'Test compilati',
        data: stats.timeline.map(t => t.count),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600">
              Analytics Digitalizzazione Aziendale
            </h1>
            <p className="text-gray-500 mt-1 text-lg">Panoramica completa delle performance e dei trend.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/test-maturita/archivio"
              className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm flex items-center gap-2"
            >
              📂 Archivio
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              🔄 Aggiorna
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Totale Test</div>
              <div className="text-4xl font-bold text-gray-900">{stats.summary.total_tests}</div>
              <div className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1">
                <span>📈 +{stats.recent_tests.length} questa settimana</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Score Medio</div>
              <div className="text-4xl font-bold text-blue-600">{stats.summary.average_score.toFixed(0)}%</div>
              <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${stats.summary.average_score}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Livello Comune</div>
              <div className="text-3xl font-bold text-green-600 truncate" title={stats.summary.average_level || 'N/A'}>
                {stats.summary.average_level || 'N/A'}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Basato sulla maggioranza dei test
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Colli Critici</div>
              <div className="text-4xl font-bold text-orange-600">
                {stats.bottlenecks.length > 0 ? stats.bottlenecks[0].count : 0}
              </div>
              <div className="mt-2 text-xs text-gray-500 truncate">
                {stats.bottlenecks.length > 0 ? stats.bottlenecks[0].name : 'Nessun dato'}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Charts */}
          <div className="lg:col-span-2 space-y-8">

            {/* Radar & Timeline Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Radar Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
                  Media Settoriale (Radar)
                </h3>
                <div className="aspect-square relative">
                  <Radar
                    data={radarData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        r: {
                          beginAtZero: true,
                          max: 100,
                          ticks: { stepSize: 20, display: false },
                          grid: { color: 'rgba(0,0,0,0.05)' },
                          pointLabels: {
                            font: { size: 11, weight: 'bold' },
                            color: '#4b5563'
                          }
                        }
                      },
                      plugins: {
                        legend: { display: false }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                  Trend Temporale
                </h3>
                <div className="flex-grow relative min-h-[250px]">
                  <Line
                    data={timelineData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: { beginAtZero: true, grid: { display: false } },
                        x: { grid: { display: false } }
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* AI Insights Panel (Full Width) */}
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <span className="text-2xl">✨</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">AI Strategic Insights</h2>
                {loadingInsights && <span className="text-sm text-purple-600 animate-pulse ml-auto">Generazione analisi in corso...</span>}
              </div>

              {loadingInsights ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-purple-200/50 rounded w-3/4"></div>
                  <div className="h-4 bg-purple-200/50 rounded w-full"></div>
                  <div className="h-4 bg-purple-200/50 rounded w-5/6"></div>
                </div>
              ) : aiInsights ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  <div className="space-y-6">
                    <div className="bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-purple-100">
                      <h3 className="font-bold text-purple-800 mb-3 text-sm uppercase tracking-wide">📊 Analisi Aggregata</h3>
                      <p className="text-gray-700 leading-relaxed text-sm">{aiInsights.analisi_aggregata}</p>
                    </div>

                    {aiInsights.aree_critiche?.length > 0 && (
                      <div className="bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-red-100">
                        <h3 className="font-bold text-red-700 mb-3 text-sm uppercase tracking-wide">⚠️ Aree Critiche</h3>
                        <div className="space-y-3">
                          {aiInsights.aree_critiche.map((area: any, idx: number) => (
                            <div key={idx} className="flex gap-3 items-start">
                              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded mt-0.5">{idx + 1}</span>
                              <div>
                                <p className="font-bold text-gray-800 text-sm">{area.categoria}</p>
                                <p className="text-xs text-gray-600 mt-0.5">{area.problema}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {aiInsights.raccomandazioni?.length > 0 && (
                      <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-green-100 shadow-sm">
                        <h3 className="font-bold text-green-800 mb-3 text-sm uppercase tracking-wide">✅ Raccomandazioni Strategiche</h3>
                        <ul className="space-y-3">
                          {aiInsights.raccomandazioni.map((rec: string, idx: number) => (
                            <li key={idx} className="flex gap-3 text-sm text-gray-700">
                              <span className="text-green-500 flex-shrink-0">✓</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {aiInsights.focus_workshop?.length > 0 && (
                      <div className="bg-indigo-600 text-white p-5 rounded-xl shadow-lg">
                        <h3 className="font-bold text-indigo-100 mb-3 text-sm uppercase tracking-wide">🎯 Focus Workshop Suggeriti</h3>
                        <ul className="space-y-2">
                          {aiInsights.focus_workshop.map((focus: string, idx: number) => (
                            <li key={idx} className="flex gap-2 text-sm font-medium">
                              <span className="text-indigo-300">•</span>
                              <span>{focus}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">Nessun insight disponibile.</div>
              )}
            </div>

          </div>

          {/* Right Column: Stats & Lists */}
          <div className="space-y-8">

            {/* Top Bottlenecks */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
                Top Colli di Bottiglia
              </h3>
              <div className="space-y-4">
                {stats.bottlenecks.length > 0 ? (
                  stats.bottlenecks.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="font-medium text-gray-700 truncate w-3/4" title={item.name}>{item.name}</span>
                        <span className="font-bold text-gray-900">{item.count}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(item.count / stats.summary.total_tests) * 100}%`,
                            backgroundColor: SEVERITY_COLORS[item.severity] || '#eab308'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">Nessun collo di bottiglia registrato.</p>
                )}
              </div>
            </div>

            {/* Level Distribution */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-green-500 rounded-full"></span>
                Distribuzione Livelli
              </h3>
              <div className="h-48 relative">
                <Doughnut
                  data={levelData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    cutout: '70%'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <span className="text-3xl font-bold text-gray-900">{stats.summary.total_tests}</span>
                  <span className="text-xs text-gray-500 uppercase">Test Totali</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {stats.summary.level_distribution.map(level => (
                  <div key={level.level} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: LEVEL_COLORS[level.level] }}></span>
                      <span className="text-gray-600">{level.level}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{level.percentage.toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Tests List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-gray-800 rounded-full"></span>
                Ultimi Test
              </h3>
              <div className="space-y-4">
                {stats.recent_tests.slice(0, 5).map(test => (
                  <div key={test.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{test.nome} {test.cognome}</div>
                      <div className="text-xs text-gray-500">{new Date(test.created_at).toLocaleDateString('it-IT')}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-600 text-sm">{test.punteggio}%</div>
                      <div className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full inline-block mt-1">
                        {test.livello}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <Link href="/admin/test-maturita/archivio" className="text-sm font-semibold text-purple-600 hover:text-purple-700">
                  Vedi tutti i test →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

