'use client';

import dynamic from 'next/dynamic';

// Dynamic import per InvestmentCalculator (include Chart.js, pesante)
const InvestmentCalculator = dynamic(() => import('@/components/InvestmentCalculator'), {
  ssr: false,
  loading: () => <div className="text-center py-8">Caricamento calcolatore...</div>,
});

export default function ClientInvestmentCalculator() {
  return <InvestmentCalculator />;
}

