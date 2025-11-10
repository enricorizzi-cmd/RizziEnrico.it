'use client';

import dynamic from 'next/dynamic';

// Dynamic imports per componenti non critici - caricano solo dopo che la pagina è interattiva
const AIAssistant = dynamic(() => import('@/components/AIAssistant'), {
  ssr: false,
  loading: () => null, // Non mostra nulla durante il caricamento
});

const WhatsAppWidget = dynamic(() => import('@/components/WhatsAppWidget'), {
  ssr: false,
  loading: () => null,
});

export default function ClientWidgets() {
  return (
    <>
      <AIAssistant />
      <WhatsAppWidget />
    </>
  );
}

