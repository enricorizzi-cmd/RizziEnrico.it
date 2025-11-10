'use client';

import dynamic from 'next/dynamic';

// Dynamic import per KPIChart (include Chart.js, pesante)
const KPIChart = dynamic(() => import('@/components/KPIChart'), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center text-gray-400">Caricamento grafico...</div>,
});

interface ClientKPIChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor: string;
    }>;
  };
}

export default function ClientKPIChart({ data }: ClientKPIChartProps) {
  return <KPIChart data={data} />;
}

