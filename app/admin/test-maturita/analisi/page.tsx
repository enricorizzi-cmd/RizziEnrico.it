'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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

export default function TestMaturitaAnalyticsDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<TestStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

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
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">Caricamento...</div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 text-red-600">Errore nel caricamento dei dati</div>
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
          'rgba(245, 158, 11, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
      },
    ],
  };

  // Grafico medie per categoria
  const categoryData = {
    labels: Object.keys(stats.by_category),
    datasets: [
      {
        label: 'Punteggio medio',
        data: Object.values(stats.by_category).map(c => c.average),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
      },
    ],
  };

  // Timeline test compilati
  const timelineData = {
    labels: stats.timeline.map(t => new Date(t.date).toLocaleDateString('it-IT')),
    datasets: [
      {
        label: 'Test compilati',
        data: stats.timeline.map(t => t.count),
        borderColor: 'rgba(102, 126, 234, 1)',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">📊 Analisi Test Maturità Digitale</h1>
          <p className="text-gray-600 mt-2">Dashboard completa con statistiche e insights</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Totale Test</div>
            <div className="text-3xl font-bold text-gray-900">{stats.summary.total_tests}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Punteggio Medio</div>
            <div className="text-3xl font-bold text-purple-600">
              {stats.summary.average_score.toFixed(1)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Livello Medio</div>
            <div className="text-3xl font-bold text-blue-600">
              {stats.summary.average_level || 'N/A'}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Categorie Analizzate</div>
            <div className="text-3xl font-bold text-green-600">
              {Object.keys(stats.by_category).length}
            </div>
          </div>
        </div>

        {/* Grafici principali */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Distribuzione livelli */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Distribuzione per Livello</h2>
            <Doughnut
              data={levelData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'right' },
                  title: { display: false },
                },
              }}
            />
            <div className="mt-4 space-y-2">
              {stats.summary.level_distribution.map(level => (
                <div key={level.level} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: LEVEL_COLORS[level.level] || '#6b7280' }}
                    ></div>
                    <span>{level.level}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">{level.count}</span>
                    <span className="text-gray-500">({level.percentage.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Distribuzione punteggi */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Distribuzione Punteggi</h2>
            <Bar
              data={scoreDistributionData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>
        </div>

        {/* Grafici secondari */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Medie per categoria */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Punteggio Medio per Categoria</h2>
            <Bar
              data={categoryData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: function(value) {
                        return value + '%';
                      },
                    },
                  },
                },
              }}
            />
            <div className="mt-4 space-y-2">
              {Object.entries(stats.by_category).map(([category, data]) => (
                <div key={category} className="flex items-center justify-between text-sm">
                  <span>{category}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">{data.average.toFixed(1)}%</span>
                    <span className="text-gray-500">({data.total} test)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Timeline Test Compilati</h2>
            <Line
              data={timelineData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>
        </div>

        {/* Tabella test recenti */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Test Recenti</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Punteggio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Livello
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.recent_tests.map(test => (
                  <tr key={test.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {test.nome} {test.cognome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {test.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded font-semibold ${
                          test.punteggio >= 80
                            ? 'bg-green-100 text-green-800'
                            : test.punteggio >= 60
                            ? 'bg-blue-100 text-blue-800'
                            : test.punteggio >= 40
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {test.punteggio}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className="px-2 py-1 rounded font-semibold"
                        style={{
                          backgroundColor: `${LEVEL_COLORS[test.livello] || '#6b7280'}20`,
                          color: LEVEL_COLORS[test.livello] || '#6b7280',
                        }}
                      >
                        {test.livello}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(test.created_at).toLocaleDateString('it-IT')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

