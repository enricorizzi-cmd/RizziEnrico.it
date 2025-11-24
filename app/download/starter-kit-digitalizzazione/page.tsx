'use client';

import { useEffect } from 'react';

export default function StarterKitPage() {
  useEffect(() => {
    // Quando la pagina si carica, triggera il download del PDF
    window.print();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8 print:p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 print:mb-8">
          <h1 className="text-4xl font-bold mb-4 text-purple-600 font-heading">
            Starter Kit: Checklist Digitalizzazione PMI
          </h1>
          <p className="text-xl text-gray-600">
            Workshop "AI in Azienda: Più Tempo, Più Clienti, Meno Sprechi"
            <br />
            <span className="text-sm">Venerdì 12 dicembre 2025 - OSM Venezia - Via Sertorio Orsato 22, Venezia</span>
          </p>
        </div>

        {/* Introduzione */}
        <div className="mb-8 print:mb-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Questa checklist ti aiuta a capire da dove partire per digitalizzare la tua PMI.
            Segna ogni punto completato e identifica le aree su cui concentrarti.
          </p>
        </div>

        {/* Sezione 1: Raccolta Dati & CRM */}
        <div className="mb-10 print:mb-8 border-b pb-8 print:pb-6">
          <h2 className="text-2xl font-bold mb-6 text-purple-600 font-heading">
            1. Raccolta Dati & CRM
          </h2>
          <p className="text-gray-600 mb-4">
            Il primo passo è mettere ordine nei dati: sapere chi sono i tuoi contatti, da dove arrivano,
            e come seguirli.
          </p>
          <ul className="space-y-3">
            {[
              'Hai un posto unico dove finiscono tutti i nominativi dei contatti (lead, clienti, fornitori)?',
              'Sai sempre chi ti ha contattato, quando e da dove?',
              'Hai un sistema per classificare i lead in base alla loro qualità?',
              'Tutti i dati dei clienti sono centralizzati e facilmente accessibili?',
              'Hai un processo chiaro per seguire i lead da primo contatto a chiusura?',
              'Puoi vedere la storia completa di ogni contatto in un colpo d\'occhio?',
              'Hai un sistema per tracciare le fonti di provenienza dei lead?',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 mr-3 w-5 h-5 text-purple-600 border-gray-300 rounded"
                  disabled
                />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sezione 2: Automazioni Base */}
        <div className="mb-10 print:mb-8 border-b pb-8 print:pb-6">
          <h2 className="text-2xl font-bold mb-6 text-blue-600 font-heading">
            2. Automazioni Base
          </h2>
          <p className="text-gray-600 mb-4">
            Automatizza le attività ripetitive per risparmiare tempo e ridurre errori.
          </p>
          <ul className="space-y-3">
            {[
              'Hai almeno 1 automazione che parte quando qualcuno compila un form sul tuo sito?',
              'Hai email automatiche di benvenuto per nuovi clienti?',
              'Hai reminder automatici per follow-up con i lead?',
              'Le conferme appuntamenti vengono inviate automaticamente?',
              'Hai notifiche automatiche quando arriva un nuovo lead importante?',
              'I preventivi vengono generati automaticamente da template?',
              'Hai un sistema di backup automatico dei dati critici?',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 mr-3 w-5 h-5 text-blue-600 border-gray-300 rounded"
                  disabled
                />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sezione 3: Presenza Online */}
        <div className="mb-10 print:mb-8 border-b pb-8 print:pb-6">
          <h2 className="text-2xl font-bold mb-6 text-green-600 font-heading">
            3. Presenza Online Minima
          </h2>
          <p className="text-gray-600 mb-4">
            Assicurati che i clienti possano trovarti e contattarti facilmente online.
          </p>
          <ul className="space-y-3">
            {[
              'Il tuo sito web è ottimizzato per mobile?',
              'Hai un Google Business Profile aggiornato con recensioni?',
              'Hai almeno 1 landing page dedicata per campagne specifiche?',
              'Il tuo sito carica velocemente (meno di 3 secondi)?',
              'Hai almeno 10 recensioni positive su Google?',
              'I tuoi contatti (email, telefono, indirizzo) sono facilmente trovabili?',
              'Hai un sistema per raccogliere recensioni dai clienti soddisfatti?',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 mr-3 w-5 h-5 text-green-600 border-gray-300 rounded"
                  disabled
                />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sezione 4: KPI & Dashboard */}
        <div className="mb-10 print:mb-8 border-b pb-8 print:pb-6">
          <h2 className="text-2xl font-bold mb-6 text-orange-600 font-heading">
            4. KPI & Dashboard
          </h2>
          <p className="text-gray-600 mb-4">
            Misura quello che conta: solo così puoi migliorare davvero.
          </p>
          <ul className="space-y-3">
            {[
              'Monitori almeno 3 KPI digitali (lead, conversioni, traffico)?',
              'Hai una dashboard dove vedi i numeri principali in tempo reale?',
              'Sai da dove arrivano i tuoi migliori clienti?',
              'Misuri il tasso di conversione dei lead in clienti?',
              'Hai un sistema per tracciare il ROI delle campagne marketing?',
              'Sai quanto tempo passa tra primo contatto e chiusura vendita?',
              'Hai alert automatici quando i KPI scendono sotto soglie critiche?',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 mr-3 w-5 h-5 text-orange-600 border-gray-300 rounded"
                  disabled
                />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sezione 5: Uso dell'IA */}
        <div className="mb-10 print:mb-8">
          <h2 className="text-2xl font-bold mb-6 text-purple-600 font-heading">
            5. Uso dell'IA
          </h2>
          <p className="text-gray-600 mb-4">
            L'AI può accelerare molte attività: copy, analisi dati, automazioni intelligenti.
          </p>
          <ul className="space-y-3">
            {[
              'Usi l\'AI per generare contenuti (post, email, copy)?',
              'Hai provato almeno 1 tool AI per analizzare dati aziendali?',
              'Hai template AI pronti per le attività ripetitive?',
              'Usi l\'AI per ottimizzare i titoli e le descrizioni dei tuoi prodotti/servizi?',
              'Hai provato chatbot AI per rispondere alle domande frequenti?',
              'Usi l\'AI per analizzare le recensioni e capire cosa migliorare?',
              'Hai un sistema per generare preventivi personalizzati con l\'AI?',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 mr-3 w-5 h-5 text-purple-600 border-gray-300 rounded"
                  disabled
                />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-12 print:mt-8 pt-8 print:pt-6 border-t text-center text-gray-600">
          <p className="mb-4">
            <strong>Prossimo Passo:</strong> Compila il{' '}
            <a href="/test-maturita-digitale" className="text-purple-600 underline">
              Test Digitalizzazione Aziendale
            </a>{' '}
            per avere un'analisi dettagliata.
          </p>
          <p className="text-sm">
            Workshop "AI in Azienda: Più Tempo, Più Clienti, Meno Sprechi"
            <br />
            Enrico Rizzi & Francesco Fusano - OSM Partner Venezia
            <br />
            Venerdì 12 dicembre 2025
          </p>
        </div>
      </div>

      <style jsx>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}



