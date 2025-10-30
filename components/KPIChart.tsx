'use client';

import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface KPIChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
      fill?: boolean;
    }[];
  };
  type?: 'line' | 'bar';
  title?: string;
  className?: string;
}

export default function KPIChart({
  data,
  type = 'line',
  title,
  className = '',
}: KPIChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: !!title,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const ChartComponent = type === 'line' ? Line : Bar;

  return (
    <div className={`h-64 md:h-80 ${className}`}>
      <ChartComponent data={data} options={options} />
    </div>
  );
}

