'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const email = searchParams.get('email');
    const leadId = searchParams.get('lead');

    if (!email) {
      setStatus('error');
      setMessage('Email non fornita');
      return;
    }

    // Chiama API per disiscrivere
    fetch('/api/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, leadId }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus('success');
          setMessage(data.message || 'Disiscrizione completata con successo');
        } else {
          setStatus('error');
          setMessage(data.error || 'Errore durante la disiscrizione');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Errore di connessione');
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Elaborazione disiscrizione...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Disiscrizione Completata</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500">
              Non riceverai più email relative al workshop. Se hai cambiato idea, puoi sempre iscriverti di nuovo.
            </p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Errore</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500">
              Se il problema persiste, contattaci all'indirizzo{' '}
              <a href="mailto:info@rizzienrico.it" className="text-purple-600 underline">
                info@rizzienrico.it
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

