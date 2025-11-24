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
    { id: 'q10', categoria: 'Organizzazione & Processi', domanda: 'Quanto tempo ci vuole per formare un nuovo collaboratore?', tipo: 'select', peso: 3, opzioni: ['Circa 3 mesi', 'Circa 6 mesi', 'Un anno', 'Un anno e mezzo', 'Due anni', 'Più di due anni'] },
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
    { id: 'q24', categoria: 'Acquisizione Clienti', domanda: 'Quanto tempo dedichi a settimana alla creazione di contenuti marketing (post, email, materiali)?', tipo: 'select', peso: 2, opzioni: ['Non facciamo marketing', 'Meno di 1 ora (saltuario)', '1-4 ore (costante)', 'Oltre 4 ore (intensivo)'] },
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

    // ===== SEZIONE 7: COMPETENZE & STRUMENTI =====
    { id: 'q54', categoria: 'Competenze & Strumenti', domanda: 'Quanto tempo il tuo team dedica al data entry manuale (copiare dati da carta a PC o da un software all\'altro)?', tipo: 'select', peso: 4, opzioni: ['Meno di 2 ore/settimana', '2-5 ore/settimana', '5-10 ore/settimana', 'Oltre 10 ore/settimana'] },
    { id: 'q55', categoria: 'Competenze & Strumenti', domanda: 'Come utilizzi principalmente Excel/Fogli di Calcolo in azienda?', tipo: 'select', peso: 3, opzioni: ['Solo per analisi dati (corretto)', 'Come database clienti/ordini', 'Per gestire il magazzino', 'Per tutto (è il nostro gestionale)'] },
    { id: 'q56', categoria: 'Competenze & Strumenti', domanda: 'Come valuti l\'autonomia digitale dei tuoi collaboratori?', tipo: 'select', peso: 3, opzioni: ['Sono autonomi ed esperti', 'Se la cavano ma chiedono aiuto', 'Hanno spesso difficoltà', 'Bassa competenza digitale'] },
    { id: 'q57', categoria: 'Competenze & Strumenti', domanda: 'Ogni quanto fai formazione su nuovi strumenti digitali o AI?', tipo: 'select', peso: 2, opzioni: ['Mensilmente/Trimestralmente', 'Una volta l\'anno', 'Mai o quasi mai'] },
    { id: 'q58', categoria: 'Competenze & Strumenti', domanda: 'Gli strumenti informatici (PC, connessione, software) rallentano il lavoro quotidiano?', tipo: 'select', peso: 3, opzioni: ['No, sono veloci e aggiornati', 'A volte, qualche rallentamento', 'Sì, spesso perdiamo tempo per problemi tecnici'] },
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
                {/* Header con link indietro */}
                <div className="mb-6">
                    <Link href="/admin/test-maturita/archivio" className="text-purple-600 hover:text-purple-900 font-medium inline-flex items-center gap-2">
                        ← Torna all'Archivio
                    </Link>
                </div>

                {/* Riquadro Dati Utente Completo */}
                <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg p-6 mb-8 border-2 border-purple-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="text-3xl">👤</span>
                        Dati Utente Completi
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Informazioni Base */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-3">Informazioni Base</h3>
                            <div className="space-y-2">
                                <div>
                                    <span className="text-xs text-gray-500 font-semibold">Nome Completo</span>
                                    <p className="text-gray-900 font-medium">{test.nome} {test.cognome}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 font-semibold">Email</span>
                                    <p className="text-gray-900 font-medium break-all">{test.email}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 font-semibold">Azienda</span>
                                    <p className="text-gray-900 font-medium">{test.azienda || '-'}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 font-semibold">Data Test</span>
                                    <p className="text-gray-900 font-medium">{new Date(test.created_at).toLocaleString('it-IT', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}</p>
                                </div>
                            </div>
                        </div>

                        {/* Profilazione Aziendale */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-3">Profilazione Aziendale</h3>
                            <div className="space-y-2">
                                <div>
                                    <span className="text-xs text-gray-500 font-semibold">Ruolo</span>
                                    <p className="text-gray-900 font-medium">{test.profilazione?.ruolo || '-'}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 font-semibold">Settore</span>
                                    <p className="text-gray-900 font-medium">{test.profilazione?.settore || '-'}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 font-semibold">Collaboratori</span>
                                    <p className="text-gray-900 font-medium">{test.profilazione?.collaboratori || '-'}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 font-semibold">Età Azienda</span>
                                    <p className="text-gray-900 font-medium">{test.profilazione?.eta_azienda || '-'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Obiettivi e Tempo */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-3">Obiettivi & Tempo</h3>
                            <div className="space-y-2">
                                <div>
                                    <span className="text-xs text-gray-500 font-semibold">Obiettivo 12 Mesi</span>
                                    <p className="text-gray-900 font-medium">{test.profilazione?.obiettivo_12_mesi || '-'}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 font-semibold">Tempo Ripetitivo/Settimana</span>
                                    <p className="text-gray-900 font-medium">{test.profilazione?.tempo_ripetitivo || '-'}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 font-semibold">Score Totale</span>
                                    <p className="text-2xl font-bold text-purple-600">{test.percentage ? test.percentage.toFixed(1) : 0}%</p>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 font-semibold">Livello Maturità</span>
                                    <p className="text-lg font-bold text-gray-900">{test.livello_maturita || '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonna Sinistra: Info e Score */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                            <h3 className="text-lg font-bold mb-4">Score Totale</h3>
                            <div className="text-5xl font-bold text-purple-600 mb-2">{test.percentage ? test.percentage.toFixed(0) : 0}%</div>
                            <div className="text-xl font-semibold text-gray-700">{test.livello_maturita}</div>
                        </div>

                        {/* Colli di Bottiglia - Top 3 */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-4 text-red-600">🚫 Top 3 Colli di Bottiglia</h3>
                            <div className="space-y-4">
                                {test.colli_bottiglia && Array.isArray(test.colli_bottiglia) && test.colli_bottiglia.length > 0 ? (
                                    test.colli_bottiglia.map((collo: any, idx: number) => (
                                        <div key={idx} className={`p-4 rounded-lg border-l-4 ${collo.severity === 'CRITICO' ? 'bg-red-50 border-red-500' :
                                            collo.severity === 'ALTO' ? 'bg-orange-50 border-orange-500' :
                                                'bg-yellow-50 border-yellow-500'
                                            }`}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-lg font-bold text-gray-700">#{idx + 1}</span>
                                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${collo.severity === 'CRITICO' ? 'bg-red-600 text-white' :
                                                    collo.severity === 'ALTO' ? 'bg-orange-600 text-white' :
                                                        'bg-yellow-600 text-white'
                                                    }`}>
                                                    {collo.severity}
                                                </span>
                                            </div>
                                            <p className="font-semibold text-gray-900 mb-2">{collo.specifico || collo.nome}</p>
                                            {collo.raccomandazioni && collo.raccomandazioni.length > 0 && (
                                                <p className="text-xs text-gray-700">{collo.raccomandazioni[0]}</p>
                                            )}
                                        </div>
                                    ))
                                ) : test.collo_bottiglia_primario ? (
                                    <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                                        <p className="font-semibold text-red-900 text-sm">{test.collo_bottiglia_primario}</p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">Nessun collo critico rilevato.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Colonna Destra: Radar e Dettagli */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Radar Chart PREMIUM - Allineato con output utente */}
                        <div className="bg-white rounded-xl shadow-xl p-8">
                            <h3 className="text-2xl font-bold mb-2 font-heading text-center text-purple-800">📊 Analisi Radar - 7 Pilastri</h3>
                            <p className="text-center text-gray-600 mb-6">Confronto tra il tuo score, la media di settore e il top 10%</p>

                            <div className="w-full bg-white p-4 rounded-xl" style={{ height: '500px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={radarData}>
                                        <PolarGrid stroke="#e5e7eb" strokeWidth={1} />
                                        <PolarAngleAxis
                                            dataKey="area"
                                            tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }}
                                            tickLine={false}
                                        />
                                        <PolarRadiusAxis
                                            angle={90}
                                            domain={[0, 100]}
                                            tick={{ fill: '#9ca3af', fontSize: 11 }}
                                            tickCount={6}
                                        />

                                        {/* Top 10% - Verde */}
                                        <Radar
                                            name="Top 10%"
                                            dataKey="top10"
                                            stroke="#10b981"
                                            fill="transparent"
                                            strokeWidth={2}
                                            strokeDasharray="3 3"
                                        />

                                        {/* Media Settore - Blu */}
                                        <Radar
                                            name="Media Settore"
                                            dataKey="media"
                                            stroke="#60a5fa"
                                            fill="transparent"
                                            strokeWidth={2}
                                            strokeDasharray="5 5"
                                        />

                                        {/* Il Tuo Score - Viola */}
                                        <Radar
                                            name="Tuo Score"
                                            dataKey="tuo"
                                            stroke="#8b5cf6"
                                            fill="#8b5cf6"
                                            fillOpacity={0.25}
                                            strokeWidth={3}
                                        />

                                        <Legend
                                            wrapperStyle={{ paddingTop: 10 }}
                                            iconType="line"
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Stats cards sotto al radar - come user view */}
                            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                                <div className="bg-purple-50 p-3 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">Il Tuo Score</div>
                                    <div className="text-2xl font-bold text-purple-600">{test.percentage?.toFixed(0) || 0}%</div>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">Media {test.profilazione?.settore || 'Settore'}</div>
                                    <div className="text-2xl font-bold text-blue-600">~52%</div>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg">
                                    <div className="text-sm text-gray-600 mb-1">Top 10%</div>
                                    <div className="text-2xl font-bold text-green-600">~78%</div>
                                </div>
                            </div>
                        </div>

                        {/* 1. DIAGNOSI PERSONALIZZATA */}
                        {test.diagnosi && (
                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg p-8 mb-8 border border-purple-200">
                                <h3 className="text-2xl font-bold mb-4 font-heading text-purple-700">📍 Diagnosi Completa</h3>
                                <p className="text-lg font-semibold text-gray-800 mb-6">{test.diagnosi.livello}</p>

                                {/* TOP 3 COLLI DI BOTTIGLIA */}
                                {test.colli_bottiglia && test.colli_bottiglia.length > 0 && (
                                    <div className="mb-6 space-y-3">
                                        <h4 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
                                            ⚠️ TOP 3 COLLI DI BOTTIGLIA IDENTIFICATI
                                        </h4>
                                        {test.colli_bottiglia.map((collo: any, idx: number) => (
                                            <div
                                                key={idx}
                                                className={`rounded-lg p-5 border-l-4 ${collo.severity === 'CRITICO'
                                                    ? 'bg-red-50 border-red-500'
                                                    : collo.severity === 'ALTO'
                                                        ? 'bg-orange-50 border-orange-500'
                                                        : 'bg-yellow-50 border-yellow-500'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xl font-bold text-gray-700">#{idx + 1}</span>
                                                        <span
                                                            className={`px-2 py-0.5 rounded-full text-xs font-bold ${collo.severity === 'CRITICO'
                                                                ? 'bg-red-600 text-white'
                                                                : collo.severity === 'ALTO'
                                                                    ? 'bg-orange-600 text-white'
                                                                    : 'bg-yellow-600 text-white'
                                                                }`}
                                                        >
                                                            {collo.severity}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="font-semibold text-gray-900 text-lg mb-2">{collo.specifico}</p>
                                                {collo.raccomandazioni && collo.raccomandazioni.length > 0 && (
                                                    <div className="mt-3">
                                                        <p className="text-sm font-semibold text-gray-700 mb-1">Azioni consigliate:</p>
                                                        <ul className="text-sm text-gray-700 space-y-1">
                                                            {collo.raccomandazioni.map((rac: string, racIdx: number) => (
                                                                <li key={racIdx} className="flex items-start">
                                                                    <span className="mr-2">✓</span>
                                                                    <span>{rac}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
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

                        {/* 4. INVESTIMENTO SUGGERITO */}
                        {test.investimento_suggerito && (
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-8 mb-8 border-2 border-purple-300">
                                <h3 className="text-2xl font-bold mb-6 font-heading text-purple-800">💰 Investimento e Rientro Stimato</h3>
                                <div className="bg-white rounded-lg p-6">
                                    <div className="mb-4">
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${test.investimento_suggerito.livello === 'MEDIO-ALTO' ? 'bg-orange-600 text-white' :
                                            test.investimento_suggerito.livello === 'MEDIO' ? 'bg-yellow-600 text-white' :
                                                'bg-green-600 text-white'
                                            }`}>
                                            {test.investimento_suggerito.livello}
                                        </span>
                                    </div>
                                    <p className="text-gray-800 mb-4">{test.investimento_suggerito.descrizione}</p>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-sm font-semibold text-gray-600">Tempi di Rientro:</span>
                                            <p className="text-gray-900 font-medium">{test.investimento_suggerito.tempi_rientro}</p>
                                        </div>
                                        {test.investimento_suggerito.note && (
                                            <div>
                                                <span className="text-sm font-semibold text-gray-600">Note:</span>
                                                <p className="text-gray-900 font-medium">{test.investimento_suggerito.note}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 5. BENCHMARK SETTORE */}
                        {test.benchmark && test.benchmark.settore && (
                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-8 mb-8 border-2 border-indigo-300">
                                <h3 className="text-2xl font-bold mb-6 font-heading text-indigo-800">📊 Benchmark Settore</h3>
                                <div className="bg-white rounded-lg p-6">
                                    <p className="text-gray-700 mb-4"><span className="font-semibold">Settore:</span> {test.benchmark.settore}</p>
                                    {Object.entries(test.benchmark).map(([key, value]: [string, any]) => {
                                        if (key === 'settore' || key === 'note') return null;
                                        return (
                                            <div key={key} className="mb-4 p-4 bg-gray-50 rounded-lg">
                                                <h4 className="font-bold text-gray-900 mb-3">{key}</h4>
                                                <div className="grid md:grid-cols-3 gap-4">
                                                    <div className="bg-purple-50 p-3 rounded">
                                                        <div className="text-xs text-gray-600 mb-1">Il Tuo</div>
                                                        <div className="text-xl font-bold text-purple-700">{value.tuo || '-'}%</div>
                                                    </div>
                                                    <div className="bg-blue-50 p-3 rounded">
                                                        <div className="text-xs text-gray-600 mb-1">Media Settore</div>
                                                        <div className="text-xl font-bold text-blue-700">{value.media_settore || '-'}%</div>
                                                    </div>
                                                    <div className="bg-green-50 p-3 rounded">
                                                        <div className="text-xs text-gray-600 mb-1">Top 10%</div>
                                                        <div className="text-xl font-bold text-green-700">{value.top_10 || '-'}%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {test.benchmark.note && (
                                        <p className="text-sm text-gray-600 italic mt-4">{test.benchmark.note}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Roadmap Scalabilità */}
                        {test.roadmap_scalabilita && test.roadmap_scalabilita.fase1 && (
                            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                                <h3 className="text-2xl font-bold mb-6 font-heading text-green-700">🚀 Roadmap Scalabilità (3 Fasi)</h3>
                                <div className="space-y-4">
                                    {test.roadmap_scalabilita.capacita_attuale && (
                                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                            <span className="font-semibold text-gray-700">Capacità Attuale:</span>
                                            <p className="text-gray-900">{test.roadmap_scalabilita.capacita_attuale}</p>
                                        </div>
                                    )}
                                    {['fase1', 'fase2', 'fase3'].map((fase) => {
                                        const faseData = test.roadmap_scalabilita[fase];
                                        if (!faseData) return null;
                                        return (
                                            <div key={fase} className="bg-green-50 p-6 rounded-lg border border-green-200">
                                                <h4 className="font-bold text-green-800 mb-2 text-lg">{faseData.titolo}</h4>
                                                <div className="grid md:grid-cols-2 gap-4 mb-3">
                                                    <div>
                                                        <span className="text-sm font-semibold text-gray-600">Durata:</span>
                                                        <p className="text-gray-900 font-medium">{faseData.durata}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-semibold text-gray-600">Target Crescita:</span>
                                                        <p className="text-gray-900 font-medium">{faseData.target_crescita}</p>
                                                    </div>
                                                </div>
                                                {faseData.azioni && faseData.azioni.length > 0 && (
                                                    <div>
                                                        <span className="text-sm font-semibold text-gray-700 mb-2 block">Azioni:</span>
                                                        <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                                                            {faseData.azioni.map((azione: string, idx: number) => (
                                                                <li key={idx}>{azione}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* 6. ROADMAP PILASTRI CON PRIORITÀ */}
                        {test.roadmap_pilastri && test.roadmap_pilastri.length > 0 && (
                            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                                <h3 className="text-2xl font-bold mb-6 font-heading">🎯 Roadmap Priorità per Pilastro</h3>
                                <div className="space-y-4">
                                    {test.roadmap_pilastri.map((pilastro: any, idx: number) => (
                                        <div key={idx} className={`rounded-lg p-6 border-l-4 ${pilastro.priorita === 'CRITICA' ? 'bg-red-50 border-red-500' :
                                            pilastro.priorita === 'ALTA' ? 'bg-orange-50 border-orange-500' :
                                                pilastro.priorita === 'MEDIA' ? 'bg-yellow-50 border-yellow-500' :
                                                    'bg-green-50 border-green-500'
                                            }`}>
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{pilastro.icon}</span>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900">{pilastro.pilastro}</h4>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${pilastro.priorita === 'CRITICA' ? 'bg-red-600 text-white' :
                                                                pilastro.priorita === 'ALTA' ? 'bg-orange-600 text-white' :
                                                                    pilastro.priorita === 'MEDIA' ? 'bg-yellow-600 text-white' :
                                                                        'bg-green-600 text-white'
                                                                }`}>
                                                                {pilastro.priorita}
                                                            </span>
                                                            <span className="text-sm text-gray-600">Score: {pilastro.punteggio}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <span className="text-sm font-semibold text-gray-700">Azioni consigliate:</span>
                                                <ul className="mt-2 space-y-1">
                                                    {pilastro.azioni_consigliate && pilastro.azioni_consigliate.map((azione: string, azioneIdx: number) => (
                                                        <li key={azioneIdx} className="text-sm text-gray-700 flex items-start">
                                                            <span className="mr-2">✓</span>
                                                            <span>{azione}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 7. RISORSE BONUS PERSONALIZZATE */}
                        {test.risorse_bonus && test.risorse_bonus.length > 0 && (
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-8 mb-8 border border-green-300">
                                <h3 className="text-2xl font-bold mb-6 font-heading text-green-800">🎁 Toolkit Gratuito Personalizzato</h3>
                                <p className="text-gray-700 mb-6">Risorse selezionate per il tuo profilo e settore:</p>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {test.risorse_bonus.map((risorsa: string, idx: number) => (
                                        <div key={idx} className="bg-white rounded-lg p-4 border border-green-200 hover:border-green-400 transition-all hover:shadow-md">
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl">📄</span>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{risorsa}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 8. NEXT STEPS STRUTTURATI */}
                        {test.next_steps && (
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-8 mb-8 border-2 border-purple-300">
                                <h3 className="text-2xl font-bold mb-6 font-heading text-purple-800">🚀 I Tuoi Prossimi Passi</h3>

                                <div className="space-y-6">
                                    {test.next_steps.questa_settimana && (
                                        <div className="bg-white rounded-lg p-6">
                                            <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                                                <span className="text-2xl">⚡</span>
                                                Questa Settimana
                                            </h4>
                                            <ul className="space-y-2">
                                                {test.next_steps.questa_settimana.map((step: string, idx: number) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <span className="text-purple-600 font-bold mt-0.5">□</span>
                                                        <span className="text-gray-700">{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {test.next_steps.entro_15_giorni && (
                                        <div className="bg-white rounded-lg p-6">
                                            <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                                                <span className="text-2xl">📅</span>
                                                Entro 15 Giorni
                                            </h4>
                                            <ul className="space-y-3">
                                                {test.next_steps.entro_15_giorni.map((step: string, idx: number) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <span className="text-blue-600 font-bold mt-0.5">→</span>
                                                        <span className="text-gray-700">{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
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
