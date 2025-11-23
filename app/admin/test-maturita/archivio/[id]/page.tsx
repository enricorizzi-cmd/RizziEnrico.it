'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

interface Question {
    id: string;
    categoria: string;
    domanda: string;
    tipo: 'si_no' | 'scala' | 'select' | 'radio';
    peso: number;
    opzioni?: string[];
}

const questions: Question[] = [
    // ===== SEZIONE 1: PROFILAZIONE AZIENDA (6 domande - peso 0) =====
    { id: 'q1', categoria: 'Profilazione', domanda: 'Qual è il tuo ruolo in azienda?', tipo: 'select', peso: 0, opzioni: ['Titolare/Imprenditore', 'Socio/Partner', 'Direttore/Manager', 'Responsabile di funzione', 'Dipendente', 'Consulente esterno'] },
    { id: 'q2', categoria: 'Profilazione', domanda: 'In che settore opera principalmente la tua azienda?', tipo: 'select', peso: 0, opzioni: ['Produzione/Manifatturiero', 'Commercio/Retail', 'Servizi professionali', 'Servizi operativi', 'Ristorazione/Horeca', 'Edilizia/Costruzioni', 'Altro'] },
    { id: 'q3', categoria: 'Profilazione', domanda: 'Quanti collaboratori ha l\'azienda?', tipo: 'select', peso: 0, opzioni: ['Solo io (ditta individuale)', '2-5 collaboratori', '6-15 collaboratori', '16-50 collaboratori', '51-100 collaboratori', 'Oltre 100 collaboratori'] },
    { id: 'q4', categoria: 'Profilazione', domanda: 'Da quanti anni è attiva l\'azienda?', tipo: 'select', peso: 0, opzioni: ['Meno di 2 anni (startup)', '2-5 anni', '6-15 anni', '16-30 anni', 'Oltre 30 anni'] },
    { id: 'q5', categoria: 'Profilazione', domanda: 'Qual è l\'obiettivo principale per i prossimi 12 mesi?', tipo: 'select', peso: 0, opzioni: ['Aumentare il fatturato', 'Migliorare i margini', 'Ridurre costi e sprechi', 'Organizzare meglio i processi', 'Far crescere il team', 'Scalare l\'azienda'] },
    { id: 'q6', categoria: 'Profilazione', domanda: 'Quanto tempo dedichi settimanalmente ad attività operative ripetitive?', tipo: 'select', peso: 0, opzioni: ['Meno di 5 ore', '5-10 ore', '10-20 ore', '20-30 ore', 'Oltre 30 ore'] },

    // ===== SEZIONE 2: ORGANIZZAZIONE & PROCESSI =====
    { id: 'q7', categoria: 'Organizzazione & Processi', domanda: 'I tuoi collaboratori sanno sempre dove trovare procedure e documenti aziendali?', tipo: 'si_no', peso: 3 },
    { id: 'q8', categoria: 'Organizzazione & Processi', domanda: 'Hai processi documentati per le attività critiche dell\'azienda?', tipo: 'si_no', peso: 3 },
    { id: 'q9', categoria: 'Organizzazione & Processi', domanda: 'Quanti processi critici hai documentato in modo completo?', tipo: 'select', peso: 3, opzioni: ['Nessuno', '1-3 processi', '4-7 processi', '8-15 processi', 'Oltre 15 processi'] },
    { id: 'q10', categoria: 'Organizzazione & Processi', domanda: 'Quanto tempo ci vuole per formare un nuovo collaboratore?', tipo: 'select', peso: 3, opzioni: ['Meno di 1 settimana', '1-2 settimane', '2-4 settimane', '1-3 mesi', 'Oltre 3 mesi'] },
    { id: 'q11', categoria: 'Organizzazione & Processi', domanda: 'Le riunioni di team terminano sempre con un piano d\'azione chiaro?', tipo: 'si_no', peso: 2 },
    { id: 'q12', categoria: 'Organizzazione & Processi', domanda: 'Dedichi meno di 2 ore a settimana a coordinare il lavoro tra collaboratori?', tipo: 'si_no', peso: 3 },
    { id: 'q13', categoria: 'Organizzazione & Processi', domanda: 'Perdi meno di 2 ore alla settimana in attività ripetitive (mail standard, report, preventivi ripetitivi)?', tipo: 'si_no', peso: 3 },
    { id: 'q14', categoria: 'Organizzazione & Processi', domanda: 'L\'azienda funzionerebbe normalmente se fossi assente per una settimana?', tipo: 'select', peso: 4, opzioni: ['Sì, perfettamente', 'S con qualche difficoltà', 'No, rallentamenti importanti', 'No, bloccata totalmente'] },
    { id: 'q15', categoria: 'Organizzazione & Processi', domanda: 'Che percentuale dei processi aziendali può essere svolta da una sola persona specifica?', tipo: 'select', peso: 4, opzioni: ['Meno del 20%', '20-40%', '40-60%', 'Oltre il 60%'] },
    { id: 'q16', categoria: 'Organizzazione & Processi', domanda: 'Chi prende le decisioni operative quotidiane in azienda?', tipo: 'select', peso: 3, opzioni: ['Il team in autonomia', 'Manager con delega', 'Solo il titolare/founder', 'Misto caso per caso'] },

    // ===== SEZIONE 3: ACQUISIZIONE CLIENTI =====
    { id: 'q17', categoria: 'Acquisizione Clienti', domanda: 'Hai un sistema automatico per raccogliere contatti dal sito?', tipo: 'si_no', peso: 3 },
    { id: 'q18', categoria: 'Acquisizione Clienti', domanda: 'Sai esattamente quale canale ti porta più clienti nuovi?', tipo: 'si_no', peso: 3 },
    { id: 'q19', categoria: 'Acquisizione Clienti', domanda: 'Quanti nuovi contatti/lead qualificati ricevi mediamente al mese?', tipo: 'select', peso: 2, opzioni: ['0-5', '6-15', '16-30', '31-50', 'Oltre 50'] },
    { id: 'q20', categoria: 'Acquisizione Clienti', domanda: 'I lead che arrivano vengono contattati entro 24 ore?', tipo: 'si_no', peso: 3 },
    { id: 'q21', categoria: 'Acquisizione Clienti', domanda: 'Che percentuale di lead riceve una risposta entro la prima ora?', tipo: 'select', peso: 4, opzioni: ['Meno del 10%', '10-30%', '30-60%', 'Oltre il 60%'] },
    { id: 'q22', categoria: 'Acquisizione Clienti', domanda: 'Hai un sistema automatico di reminder per follow-up dei lead?', tipo: 'select', peso: 3, opzioni: ['Sì, completamente automatico', 'Sì, semi-automatico', 'No, tutto manuale', 'No, non facciamo follow-up sistematico'] },
    { id: 'q23', categoria: 'Acquisizione Clienti', domanda: 'Nell\'ultimo mese, quanti lead hai perso per incapacità di gestirli o per lentezza?', tipo: 'select', peso: 4, opzioni: ['Nessuno', '1-5 lead', '6-15 lead', 'Oltre 15 lead'] },
    { id: 'q24', categoria: 'Acquisizione Clienti', domanda: 'Dedichi meno di 1 ora a settimana a creare contenuti marketing (post, email, materiali)?', tipo: 'si_no', peso: 2 },
    { id: 'q25', categoria: 'Acquisizione Clienti', domanda: 'Hai landing page dedicate per campagne specifiche?', tipo: 'si_no', peso: 2 },
    { id: 'q26', categoria: 'Acquisizione Clienti', domanda: 'Hai un sistema di lead scoring o prioritizzazione dei contatti?', tipo: 'select', peso: 3, opzioni: ['Sì, automatico', 'Sì, manuale', 'No'] },

    // ===== SEZIONE 4: GESTIONE CLIENTI =====
    { id: 'q27', categoria: 'Gestione Clienti', domanda: 'Hai un CRM dove registri tutti i contatti con clienti e prospect?', tipo: 'si_no', peso: 3 },
    { id: 'q28', categoria: 'Gestione Clienti', domanda: 'Quanto tempo ci vuole mediamente per preparare un preventivo complesso?', tipo: 'select', peso: 3, opzioni: ['Meno di 30 minuti', '30-60 minuti', '1-3 ore', '3-5 ore', 'Oltre 5 ore'] },
    { id: 'q29', categoria: 'Gestione Clienti', domanda: 'Hai template automatici per preventivi ricorrenti o standard?', tipo: 'si_no', peso: 3 },
    { id: 'q30', categoria: 'Gestione Clienti', domanda: 'Che percentuale dei preventivi richiede personalizzazione totale (da zero)?', tipo: 'select', peso: 3, opzioni: ['Meno del 20%', '20-50%', '50-80%', 'Oltre 80%'] },
    { id: 'q31', categoria: 'Gestione Clienti', domanda: 'Il tuo CRM o sistema gestionale per preventivi è integrato automaticamente?', tipo: 'select', peso: 3, opzioni: ['Sì, completamente integrato', 'Sì, ma inserimento manuale', 'Uso Excel', 'No, nessun sistema'] },
    { id: 'q32', categoria: 'Gestione Clienti', domanda: 'Come gestisci il follow-up dei preventivi non accettati?', tipo: 'select', peso: 3, opzioni: ['Automatico con trigger', 'Semi-automatico', 'Manualmente', 'Non lo facciamo'] },
    { id: 'q33', categoria: 'Gestione Clienti', domanda: 'I clienti ricevono follow-up automatici dopo acquisto/richiesta?', tipo: 'si_no', peso: 2 },
    { id: 'q34', categoria: 'Gestione Clienti', domanda: 'Sai quali clienti generano l\'80% del tuo fatturato?', tipo: 'si_no', peso: 3 },
    { id: 'q35', categoria: 'Gestione Clienti', domanda: 'Riesci sempre a rispondere a richieste clienti entro 24 ore?', tipo: 'si_no', peso: 2 },
    { id: 'q36', categoria: 'Gestione Clienti', domanda: 'Nell\'ultimo mese, quanti problemi di qualità del servizio hai avuto per sovraccarico?', tipo: 'select', peso: 4, opzioni: ['Nessuno', '1-3 problemi', '4-10 problemi', 'Oltre 10 problemi'] },
    { id: 'q37', categoria: 'Gestione Clienti', domanda: 'Hai un sistema per misurare la soddisfazione clienti?', tipo: 'si_no', peso: 2 },

    // ===== SEZIONE 5: AI & AUTOMAZIONE =====
    { id: 'q38', categoria: 'AI & Automazione', domanda: 'Usi l\'AI regolarmente per velocizzare attività quotidiane (scrivere email, riassumere riunioni)?', tipo: 'si_no', peso: 3 },
    { id: 'q39', categoria: 'AI & Automazione', domanda: 'Hai almeno UN processo completamente automatizzato (email conferma, reminder, report)?', tipo: 'si_no', peso: 3 },
    { id: 'q40', categoria: 'AI & Automazione', domanda: 'Quante automazioni attive hai oggi in azienda?', tipo: 'select', peso: 4, opzioni: ['Nessuna', '1-2 automazioni', '3-5 automazioni', '6-10 automazioni', 'Oltre 10 automazioni'] },
    { id: 'q41', categoria: 'AI & Automazione', domanda: 'L\'AI ti aiuta a creare contenuti marketing (post, copy, email)?', tipo: 'si_no', peso: 2 },
    { id: 'q42', categoria: 'AI & Automazione', domanda: 'Hai template o prompt AI pronti per attività ripetitive?', tipo: 'si_no', peso: 2 },
    { id: 'q43', categoria: 'AI & Automazione', domanda: 'Quanti strumenti/software AI diversi hai provato per il lavoro?', tipo: 'select', peso: 2, opzioni: ['Nessuno', '1-2', '3-5', '6-10', 'Oltre 10'] },
    { id: 'q44', categoria: 'AI & Automazione', domanda: 'L\'azienda utilizza software gestionali integrati tra loro (evitando doppia digitazione)?', tipo: 'si_no', peso: 3 },
    { id: 'q45', categoria: 'AI & Automazione', domanda: 'I tuoi strumenti aziendali comunicano tra loro automaticamente?', tipo: 'select', peso: 3, opzioni: ['Sì, completamente integrati', 'Parzialmente integrati', 'No, nessuna integrazione'] },
    { id: 'q46', categoria: 'AI & Automazione', domanda: 'Che percentuale di errori hai nei processi critici ogni mese?', tipo: 'select', peso: 3, opzioni: ['Meno del 5%', '5-10%', '10-20%', 'Oltre il 20%'] },

    // ===== SEZIONE 6: DATI & MISURAZIONE =====
    { id: 'q47', categoria: 'Dati & Misurazione', domanda: 'Monitori almeno 3 KPI chiave (lead, conversioni, margini) regolarmente?', tipo: 'si_no', peso: 3 },
    { id: 'q48', categoria: 'Dati & Misurazione', domanda: 'Hai visibilità in tempo reale sui numeri chiave dell\'azienda?', tipo: 'si_no', peso: 3 },
    { id: 'q49', categoria: 'Dati & Misurazione', domanda: 'Hai dashboard con KPI aggiornati automaticamente?', tipo: 'select', peso: 3, opzioni: ['Sì, in tempo reale', 'Sì, aggiornamento settimanale', 'No, tutto manuale'] },
    { id: 'q50', categoria: 'Dati & Misurazione', domanda: 'Prendi decisioni importanti basandoti principalmente su dati concreti (vs sensazioni)?', tipo: 'si_no', peso: 2 },
    { id: 'q51', categoria: 'Dati & Misurazione', domanda: 'Quante ore a settimana dedichi a cercare informazioni, documenti o dati?', tipo: 'select', peso: 3, opzioni: ['Meno di 1 ora', '1-3 ore', '3-5 ore', '5-10 ore', 'Oltre 10 ore'] },
    { id: 'q52', categoria: 'Dati & Misurazione', domanda: 'Dove sono archiviate le informazioni aziendali critiche?', tipo: 'select', peso: 3, opzioni: ['Sistema unico centralizzato', '2-3 sistemi diversi', 'Sparse in molti posti'] },
    { id: 'q53', categoria: 'Dati & Misurazione', domanda: 'Chi ha accesso alla dashboard KPI dell\'azienda?', tipo: 'select', peso: 2, opzioni: ['Tutto il team', 'Solo manager', 'Solo il titolare', 'Non abbiamo dashboard'] },
];

export default function DettaglioTestPage() {
    const params = useParams();
    const id = params?.id as string;
    const [test, setTest] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`/api/admin/test-maturita/${id}`)
                .then(res => res.json())
                .then(data => {
                    setTest(data);
                    setLoading(false);
                })
                .catch(err => console.error(err));
        }
    }, [id]);

    if (loading) return <div className="p-8 text-center">Caricamento...</div>;
    if (!test) return <div className="p-8 text-center">Test non trovato</div>;

    // Prepare radar data
    const radarData: any[] = [];
    if (test.punteggio_per_categoria) {
        Object.entries(test.punteggio_per_categoria).forEach(([category, score]: [string, any]) => {
            if (category === 'Profilazione') return;

            const categoryMax = questions
                .filter((q) => q.categoria === category && q.peso > 0)
                .reduce((sum, q) => sum + q.peso, 0);
            const yourScore = categoryMax > 0 ? Math.round((score / categoryMax) * 100) : 0;

            const mediaSettore = Math.min(Math.max(yourScore + 8, 45), 65);
            const top10 = Math.min(Math.max(yourScore + 20, 70), 90);

            radarData.push({
                area: category.replace(' & ', '\n'),
                tuo: yourScore,
                media: mediaSettore,
                top10: top10
            });
        });
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dettaglio Test: {test.nome} {test.cognome}</h1>
                    <Link href="/admin/test-maturita/archivio" className="text-gray-600 hover:text-gray-900">
                        ← Torna all'Archivio
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonna Sinistra: Info e Score */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-4">Informazioni Contatto</h3>
                            <div className="space-y-2 text-sm">
                                <p><span className="font-semibold">Email:</span> {test.email}</p>
                                <p><span className="font-semibold">Azienda:</span> {test.azienda}</p>
                                <p><span className="font-semibold">Data:</span> {new Date(test.created_at).toLocaleString()}</p>
                                <p><span className="font-semibold">Settore:</span> {test.profilazione?.settore || '-'}</p>
                                <p><span className="font-semibold">Ruolo:</span> {test.profilazione?.ruolo || '-'}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                            <h3 className="text-lg font-bold mb-4">Score Totale</h3>
                            <div className="text-5xl font-bold text-purple-600 mb-2">{test.percentage ? test.percentage.toFixed(0) : 0}%</div>
                            <div className="text-xl font-semibold text-gray-700">{test.livello_maturita}</div>
                        </div>

                        {/* Colli di Bottiglia */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-4 text-red-600">🚫 Colli di Bottiglia</h3>
                            <div className="space-y-4">
                                {test.colli_identificati && test.colli_identificati.length > 0 ? (
                                    test.colli_identificati.map((collo: any, idx: number) => (
                                        <div key={idx} className="bg-red-50 p-3 rounded-lg border border-red-100">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-bold bg-red-200 text-red-800 px-2 py-0.5 rounded-full">{collo.severity}</span>
                                                <span className="font-semibold text-red-900 text-sm">{collo.specifico}</span>
                                            </div>
                                            <p className="text-xs text-red-700">{collo.raccomandazioni?.[0]}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">Nessun collo critico rilevato.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Colonna Destra: Radar e Dettagli */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Radar Chart */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6 text-center">Analisi Radar</h3>
                            <div className="w-full h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                        <PolarGrid stroke="#e5e7eb" />
                                        <PolarAngleAxis dataKey="area" tick={{ fill: '#374151', fontSize: 12 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                                        <Radar name="Tuo Score" dataKey="tuo" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                                        <Radar name="Media Settore" dataKey="media" stroke="#3b82f6" strokeDasharray="4 4" fill="transparent" />
                                        <Radar name="Top 10%" dataKey="top10" stroke="#10b981" strokeDasharray="4 4" fill="transparent" />
                                        <Legend />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* 1. DIAGNOSI PERSONALIZZATA */}
                        {test.diagnosi && (
                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg p-8 mb-8 border border-purple-200">
                                <h3 className="text-2xl font-bold mb-4 font-heading text-purple-700">📍 Diagnosi Completa</h3>
                                <p className="text-lg font-semibold text-gray-800 mb-6">{test.diagnosi.livello}</p>

                                {/* COLLO DI BOTTIGLIA PRIMARIO */}
                                {test.collo_bottiglia_primario && test.collo_bottiglia_primario !== 'Non identificato' && (
                                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-6">
                                        <h4 className="font-bold text-lg mb-2 text-red-800 flex items-center gap-2">
                                            ⚠️ COLLO DI BOTTIGLIA CRITICO IDENTIFICATO
                                        </h4>
                                        <p className="text-red-700 font-semibold text-xl mb-2">{test.collo_bottiglia_primario}</p>
                                        <p className="text-sm text-red-600">
                                            Questo è il punto che andrebbe in crisi per primo con una crescita rapida del business.
                                            <strong> Risolverlo è priorità assoluta.</strong>
                                        </p>
                                    </div>
                                )}

                                {/* CAPACITÀ DI CRESCITA */}
                                {test.capacita_crescita && (
                                    <div className={`rounded-lg p-6 mb-4 ${test.capacita_crescita === '+30%' ? 'bg-orange-50 border-2 border-orange-300' : test.capacita_crescita === '+60%' ? 'bg-yellow-50 border-2 border-yellow-300' : 'bg-green-50 border-2 border-green-300'}`}>
                                        <h4 className="font-bold text-lg mb-2 text-gray-900">📈 Capacità di Crescita Attuale</h4>
                                        <div className="text-4xl font-bold mb-2" style={{ color: test.capacita_crescita === '+30%' ? '#f59e0b' : test.capacita_crescita === '+60%' ? '#eab308' : '#10b981' }}>
                                            {test.capacita_crescita}
                                        </div>
                                        <p className="text-sm text-gray-700">
                                            {test.capacita_crescita === '+30%' && 'Limitata da colli di bottiglia critici. Risolvili per sbloccare la crescita.'}
                                            {test.capacita_crescita === '+60%' && 'Buona, ma con margini di miglioramento significativi.'}
                                            {test.capacita_crescita.includes('100') && 'Eccellente! Sei pronto per scalare senza vincoli.'}
                                        </p>
                                    </div>
                                )}

                                {/* OPPORTUNITÀ */}
                                {test.diagnosi.opportunita && (
                                    <div className="bg-white rounded-lg p-6">
                                        <h4 className="font-bold text-lg mb-3 text-gray-900">💰 Opportunità Immediate:</h4>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-green-50 p-4 rounded-lg">
                                                <div className="text-sm text-gray-600 mb-1">Tempo Liberabile</div>
                                                <div className="text-xl font-bold text-green-700">{test.diagnosi.opportunita.tempo_liberabile}</div>
                                                <div className="text-xs text-gray-600 mt-1">Valore: {test.diagnosi.opportunita.valore_tempo}</div>
                                            </div>
                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <div className="text-sm text-gray-600 mb-1">Accelerazione Decisioni</div>
                                                <div className="text-xl font-bold text-blue-700">{test.diagnosi.opportunita.accelerazione_decisioni}</div>
                                            </div>
                                            <div className="bg-purple-50 p-4 rounded-lg md:col-span-2">
                                                <div className="text-sm text-gray-600 mb-1">Riduzione Errori</div>
                                                <div className="text-xl font-bold text-purple-700">{test.diagnosi.opportunita.riduzione_errori}</div>
                                            </div>
                                        </div>
                                        {test.diagnosi.opportunita.note_profilo && (
                                            <p className="text-xs text-gray-500 mt-4 italic">{test.diagnosi.opportunita.note_profilo}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 2. PRIORITÀ D'AZIONE (vs Quick Wins) */}
                        {test.priorita_azione && test.priorita_azione.length > 0 && (
                            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                                <h3 className="text-2xl font-bold mb-6 font-heading text-gray-900">🎯 Priorità d'Azione (Ordine di Criticità)</h3>
                                <div className="space-y-4">
                                    {test.priorita_azione.map((priorita: any, idx: number) => (
                                        <div key={idx} className={`p-6 rounded-lg border-l-4 ${priorita.livello === 'CRITICA' ? 'bg-red-50 border-red-500' :
                                            priorita.livello === 'ALTA' ? 'bg-orange-50 border-orange-500' :
                                                'bg-yellow-50 border-yellow-500'
                                            }`}>
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${priorita.livello === 'CRITICA' ? 'bg-red-600 text-white' :
                                                        priorita.livello === 'ALTA' ? 'bg-orange-600 text-white' :
                                                            'bg-yellow-600 text-white'
                                                        }`}>
                                                        {priorita.livello}
                                                    </span>
                                                    <h4 className="text-lg font-bold text-gray-900 mt-2">{idx + 1}. {priorita.azione}</h4>
                                                </div>
                                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-4">
                                                    ⏱️ {priorita.tempo_implementazione}
                                                </span>
                                            </div>

                                            <div className="mb-3">
                                                <span className="font-semibold text-gray-700">🔴 Problema:</span>
                                                <p className="text-gray-800 mt-1">{priorita.problema}</p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-3 mb-3">
                                                <div className="text-sm">
                                                    <span className="font-semibold text-green-700">📈 Impatto:</span> {priorita.impatto}
                                                </div>
                                                <div className="text-sm">
                                                    <span className="font-semibold text-blue-700">🔧 Come:</span> {priorita.come}
                                                </div>
                                            </div>

                                            <div className="bg-white p-3 rounded border border-gray-200 text-sm">
                                                <div className="mb-1"><span className="font-semibold">🛠️ Risorse:</span> {priorita.risorse}</div>
                                                <div><span className="font-semibold">📊 KPI:</span> {priorita.kpi}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Roadmap */}
                        {test.roadmap_scalabilita && test.roadmap_scalabilita.fase1 && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="text-lg font-bold mb-4 text-green-700">🚀 Roadmap Scalabilità</h3>
                                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                    <h4 className="font-bold text-green-800 mb-2">Fase 1: {test.roadmap_scalabilita.fase1.titolo}</h4>
                                    <p className="text-sm text-green-700 mb-3">{test.roadmap_scalabilita.fase1.durata}</p>
                                    <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
                                        {test.roadmap_scalabilita.fase1.azioni?.map((azione: string, idx: number) => (
                                            <li key={idx}>{azione}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Risposte Dettagliate */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-4">Dettaglio Risposte</h3>
                            <div className="space-y-6">
                                {Object.entries(test.punteggio_per_categoria || {}).map(([cat, score]) => (
                                    <div key={cat}>
                                        <h4 className="font-semibold text-gray-800 border-b pb-2 mb-3 flex justify-between">
                                            {cat} <span>{score as number} pti</span>
                                        </h4>
                                        <div className="space-y-2">
                                            {questions.filter(q => q.categoria === cat).map(q => {
                                                const answer = test.risposte?.[q.id];
                                                return (
                                                    <div key={q.id} className="text-sm grid grid-cols-12 gap-4 py-1">
                                                        <div className="col-span-8 text-gray-600">{q.domanda}</div>
                                                        <div className="col-span-4 font-medium text-gray-900 text-right">
                                                            {typeof answer === 'boolean' ? (answer ? 'Sì' : 'No') : (answer || '-')}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
