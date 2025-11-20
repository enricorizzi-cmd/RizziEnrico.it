'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Pie, Bar, Line } from 'react-chartjs-2';
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

interface EmailStats {
  summary: {
    total_leads: number;
    total_emails_sent: number;
    total_emails_not_sent: number;
    average_emails_per_lead: number;
  };
  by_type: Record<string, {
    total: number;
    sent: number;
    not_sent: number;
    details: Array<{
      lead_id: string;
      nome: string;
      cognome: string;
      email: string;
      sent_at: string | null;
    }>;
  }>;
  emails_by_type: Array<{
    type: string;
    sent: number;
    not_sent: number;
    percentage: number;
  }>;
  timeline: Array<{
    date: string;
    type: string;
    count: number;
  }>;
}

const EMAIL_TYPE_LABELS: Record<string, string> = {
  'email_conferma_iscrizione_sent': 'Email conferma iscrizione',
  'email_5_giorni_sent': 'Email 5 giorni dopo iscrizione',
  'email_10_giorni_sent': 'Email 10 giorni dopo iscrizione',
  'email_3_giorni_sent': 'Email 3 giorni prima evento',
  'email_giorno_evento_sent': 'Email giorno evento',
  'email_post_immediata_sent': 'Email post-evento immediata',
  'email_post_24h_sent': 'Email post-evento 24h',
  'email_post_48h_sent': 'Email post-evento 48h',
};

interface EmailContent {
  subject: string;
  text: string;
}

export default function EmailAnalyticsDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<EmailStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});
  const [expandedContent, setExpandedContent] = useState<Record<string, boolean>>({});
  const [emailContents, setEmailContents] = useState<Record<string, EmailContent>>({});
  const [loadingContent, setLoadingContent] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/workshop/email-stats');
      if (!response.ok) throw new Error('Errore nel caricamento');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDetails = (type: string) => {
    setExpandedDetails(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const toggleContent = async (type: string) => {
    const isExpanded = expandedContent[type];
    
    if (isExpanded) {
      // Se già espanso, chiudi
      setExpandedContent(prev => ({
        ...prev,
        [type]: false,
      }));
    } else {
      // Se non espanso, carica contenuto e apri
      if (!emailContents[type]) {
        setLoadingContent(prev => ({ ...prev, [type]: true }));
        try {
          const response = await fetch(`/api/admin/workshop/email-content?type=${encodeURIComponent(type)}`);
          if (response.ok) {
            const data = await response.json();
            setEmailContents(prev => ({
              ...prev,
              [type]: { subject: data.subject, text: data.text },
            }));
          }
        } catch (error) {
          console.error('Errore caricamento contenuto email:', error);
        } finally {
          setLoadingContent(prev => ({ ...prev, [type]: false }));
        }
      }
      setExpandedContent(prev => ({
        ...prev,
        [type]: true,
      }));
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

  // Grafico invii per tipo email
  const emailsByTypeData = {
    labels: stats.emails_by_type.map(e => EMAIL_TYPE_LABELS[e.type] || e.type),
    datasets: [
      {
        label: 'Inviate',
        data: stats.emails_by_type.map(e => e.sent),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
      },
      {
        label: 'Non inviate',
        data: stats.emails_by_type.map(e => e.not_sent),
        backgroundColor: 'rgba(220, 38, 38, 0.8)',
      },
    ],
  };

  // Grafico percentuale invio per tipo
  const percentageData = {
    labels: stats.emails_by_type.map(e => EMAIL_TYPE_LABELS[e.type] || e.type),
    datasets: [
      {
        label: 'Percentuale invio',
        data: stats.emails_by_type.map(e => e.percentage),
        backgroundColor: 'rgba(102, 126, 234, 0.6)',
      },
    ],
  };

  // Timeline email
  const timelineData = {
    labels: [...new Set(stats.timeline.map(t => t.date))].sort(),
    datasets: Object.keys(EMAIL_TYPE_LABELS).map((type, idx) => {
      const typeData = stats.timeline
        .filter(t => t.type === type)
        .map(t => {
          const dateIdx = [...new Set(stats.timeline.map(t => t.date))].sort().indexOf(t.date);
          return { x: dateIdx, y: t.count };
        });
      
      return {
        label: EMAIL_TYPE_LABELS[type] || type,
        data: typeData.map(t => t.y),
        borderColor: `hsl(${idx * 45}, 70%, 50%)`,
        backgroundColor: `hsla(${idx * 45}, 70%, 50%, 0.1)`,
        tension: 0.4,
      };
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin/workshop')}
            className="mb-4 text-purple-600 hover:text-purple-800 font-semibold"
          >
            ← Torna alla Dashboard Workshop
          </button>
          <h1 className="text-3xl font-bold text-gray-900">📧 Analisi Email Workshop</h1>
          <p className="text-gray-600 mt-2">Statistiche complete su tutte le email inviate</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Totale Lead</div>
            <div className="text-3xl font-bold text-gray-900">{stats.summary.total_leads}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Email Inviate</div>
            <div className="text-3xl font-bold text-green-600">{stats.summary.total_emails_sent}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Email Non Inviate</div>
            <div className="text-3xl font-bold text-red-600">{stats.summary.total_emails_not_sent}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Media Email/Lead</div>
            <div className="text-3xl font-bold text-purple-600">
              {stats.summary.average_emails_per_lead.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Grafici */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Grafico invii per tipo */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Invii per Tipo Email</h2>
            <Bar
              data={emailsByTypeData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>

          {/* Grafico percentuale */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Percentuale Invio per Tipo</h2>
            <Bar
              data={percentageData}
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
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Timeline Invii Email</h2>
          <Line
            data={timelineData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: false },
              },
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>

        {/* Dettagli per tipo email */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Dettagli per Tipo Email</h2>
          <div className="space-y-4">
            {Object.entries(stats.by_type).map(([type, data]) => (
              <div key={type} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">
                    {EMAIL_TYPE_LABELS[type] || type}
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleContent(type)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-semibold px-3 py-1 border border-blue-300 rounded hover:bg-blue-50 transition-colors"
                    >
                      {loadingContent[type] ? 'Caricamento...' : expandedContent[type] ? 'Nascondi contenuto' : 'Visualizza contenuto'}
                    </button>
                    <button
                      onClick={() => toggleDetails(type)}
                      className="text-purple-600 hover:text-purple-800 text-sm font-semibold"
                    >
                      {expandedDetails[type] ? 'Nascondi' : 'Mostra'} dettagli
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Totale:</span>
                    <span className="ml-2 font-semibold">{data.total}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Inviate:</span>
                    <span className="ml-2 font-semibold text-green-600">{data.sent}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Non inviate:</span>
                    <span className="ml-2 font-semibold text-red-600">{data.not_sent}</span>
                  </div>
                </div>
                
                {expandedContent[type] && emailContents[type] && (
                  <div className="mt-4 border-t pt-4 bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-3 text-gray-800">📧 Contenuto Email:</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-semibold text-gray-700 block mb-1">Oggetto:</span>
                        <div className="bg-white p-3 rounded border border-gray-200 text-sm text-gray-900">
                          {emailContents[type].subject}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-700 block mb-1">Testo:</span>
                        <div className="bg-white p-3 rounded border border-gray-200 text-sm text-gray-900 whitespace-pre-wrap font-mono">
                          {emailContents[type].text}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {expandedDetails[type] && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-semibold mb-2">Dettaglio Invii:</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left">Nome</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Data Invio</th>
                            <th className="px-4 py-2 text-left">Stato</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {data.details.map((detail, idx) => (
                            <tr key={idx} className={detail.sent_at ? 'bg-green-50' : 'bg-red-50'}>
                              <td className="px-4 py-2">{detail.nome} {detail.cognome}</td>
                              <td className="px-4 py-2">{detail.email}</td>
                              <td className="px-4 py-2">
                                {detail.sent_at
                                  ? new Date(detail.sent_at).toLocaleString('it-IT')
                                  : 'Non inviata'}
                              </td>
                              <td className="px-4 py-2">
                                {detail.sent_at ? (
                                  <span className="text-green-600 font-semibold">✓ Inviata</span>
                                ) : (
                                  <span className="text-red-600 font-semibold">✗ Non inviata</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

