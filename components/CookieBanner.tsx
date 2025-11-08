'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    // Initialize analytics here if needed
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--color-line)] shadow-lg p-4 md:p-6">
      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-[var(--color-text)]">
            <strong>Usiamo cookie tecnici e di misurazione anonima.</strong> I cookie ci aiutano
            a migliorare il sito e non contengono dati personali. Puoi scegliere tu.{' '}
            <Link href="/cookie" className="text-[var(--color-primary)] hover:underline font-medium">
              Maggiori informazioni
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={rejectCookies}
            className="px-4 py-2 text-sm font-medium text-[var(--color-text)] border border-[var(--color-line)] rounded-lg hover:bg-[var(--color-card)] transition-colors"
          >
            Rifiuta
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-lg hover:opacity-90 transition-opacity"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}

