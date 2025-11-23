'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { testMaturitaFormSchema, testMaturitaSchema, type TestMaturitaFormInput, type TestMaturitaInput } from '@/lib/validators';
import MagneticButton from '@/components/ui/MagneticButton';

interface Question {
  id: string;
  categoria: string;
  domanda: string;
  tipo: 'si_no' | 'scala' | 'select' | 'radio';
  peso: number;
  opzioni?: string[]; // Per select e radio
}

const questions: Question[] = [
  // ===== SEZIONE 1: PROFILAZIONE AZIENDA (6 domande - peso 0) =====
  {
    id: 'q1',
    categoria: 'Profilazione',
    domanda: 'Qual è il tuo ruolo in azienda?',
    tipo: 'select',
    peso: 0,
    opzioni: ['Titolare/Imprenditore', 'Socio/Partner', 'Direttore/Manager', 'Responsabile di funzione', 'Dipendente', 'Consulente esterno']
  },
  {
    id: 'q2',
    categoria: 'Profilazione',
    domanda: 'In che settore opera principalmente la tua azienda?',
    tipo: 'select',
    peso: 0,
    opzioni: ['Produzione/Manifatturiero', 'Commercio/Retail', 'Servizi professionali', 'Servizi operativi', 'Ristorazione/Horeca', 'Edilizia/Costruzioni', 'Altro']
  },
  {
    id: 'q3',
    categoria: 'Profilazione',
    domanda: 'Quanti collaboratori ha l\'azienda?',
    tipo: 'select',
    peso: 0,
    opzioni: ['Solo io (ditta individuale)', '2-5 collaboratori', '6-15 collaboratori', '16-50 collaboratori', '51-100 collaboratori', 'Oltre 100 collaboratori']
  },
  {
    id: 'q4',
    categoria: 'Profilazione',
    domanda: 'Da quanti anni è attiva l\'azienda?',
    tipo: 'select',
    peso: 0,
    opzioni: ['Meno di 2 anni (startup)', '2-5 anni', '6-15 anni', '16-30 anni', 'Oltre 30 anni']
  },
  {
    id: 'q5',
    categoria: 'Profilazione',
    domanda: 'Qual è l\'obiettivo principale per i prossimi 12 mesi?',
    tipo: 'select',
    peso: 0,
    opzioni: ['Aumentare il fatturato', 'Migliorare i margini', 'Ridurre costi e sprechi', 'Organizzare meglio i processi', 'Far crescere il team', 'Scalare l\'azienda']
  },
  {
    id: 'q6',
    categoria: 'Profilazione',
    domanda: 'Quanto tempo dedichi settimanalmente ad attività operative ripetitive?',
    tipo: 'select',
    peso: 0,
    opzioni: ['Meno di 5 ore', '5-10 ore', '10-20 ore', '20-30 ore', 'Oltre 30 ore']
  },

  // ===== SEZIONE 2: ORGANIZZAZIONE & PROCESSI (11 domande - +4 nuove, -1 diretta) =====
  { id: 'q7', categoria: 'Organizzazione & Processi', domanda: 'I tuoi collaboratori sanno sempre dove trovare procedure e documenti aziendali?', tipo: 'si_no', peso: 3 },
  { id: 'q8', categoria: 'Organizzazione & Processi', domanda: 'Hai processi documentati per le attività critiche dell\'azienda?', tipo: 'si_no', peso: 3 },
  // Q9 RIMOSSA (chiedeva direttamente colli)
  {
    id: 'q9',
    categoria: 'Organizzazione & Processi',
    domanda: 'Quanti processi critici hai documentato in modo completo?',
    tipo: 'select',
    peso: 3,
    opzioni: ['Nessuno', '1-3 processi', '4-7 processi', '8-15 processi', 'Oltre 15 processi']
  },
  {
    id: 'q10',
    categoria: 'Organizzazione & Processi',
    domanda: 'Quanto tempo ci vuole per formare un nuovo collaboratore?',
    tipo: 'select',
    peso: 3,
    opzioni: ['Meno di 1 settimana', '1-2 settimane', '2-4 settimane', '1-3 mesi', 'Oltre 3 mesi']
  },
  { id: 'q11', categoria: 'Organizzazione & Processi', domanda: 'Le riunioni di team terminano sempre con un piano d\'azione chiaro?', tipo: 'si_no', peso: 2 },
  { id: 'q12', categoria: 'Organizzazione & Processi', domanda: 'Dedichi meno di 2 ore a settimana a coordinare il lavoro tra collaboratori?', tipo: 'si_no', peso: 3 },
  { id: 'q13', categoria: 'Organizzazione & Processi', domanda: 'Perdi meno di 2 ore alla settimana in attività ripetitive (mail standard, report, preventivi ripetitivi)?', tipo: 'si_no', peso: 3 },
  // Q14 RIMOSSA (chiedeva direttamente dipendenza)
  {
    id: 'q14',
    categoria: 'Organizzazione & Processi',
    domanda: 'L\'azienda funzionerebbe normalmente se fossi assente per una settimana?',
    tipo: 'select',
    peso: 4,
    opzioni: ['Sì, perfettamente', 'S con qualche difficoltà', 'No, rallentamenti importanti', 'No, bloccata totalmente']
  },
  {
    id: 'q15',
    categoria: 'Organizzazione & Processi',
    domanda: 'Che percentuale dei processi aziendali può essere svolta da una sola persona specifica?',
    tipo: 'select',
    peso: 4,
    opzioni: ['Meno del 20%', '20-40%', '40-60%', 'Oltre il 60%']
  },
  {
    id: 'q16',
    categoria: 'Organizzazione & Processi',
    domanda: 'Chi prende le decisioni operative quotidiane in azienda?',
    tipo: 'select',
    peso: 3,
    opzioni: ['Il team in autonomia', 'Manager con delega', 'Solo il titolare/founder', 'Misto caso per caso']
  },

  // ===== SEZIONE 3: ACQUISIZIONE CLIENTI (10 domande - +4 nuove, -1 trasformata) =====
  { id: 'q17', categoria: 'Acquisizione Clienti', domanda: 'Hai un sistema automatico per raccogliere contatti dal sito?', tipo: 'si_no', peso: 3 },
  { id: 'q18', categoria: 'Acquisizione Clienti', domanda: 'Sai esattamente quale canale ti porta più clienti nuovi?', tipo: 'si_no', peso: 3 },
  {
    id: 'q19',
    categoria: 'Acquisizione Clienti',
    domanda: 'Quanti nuovi contatti/lead qualificati ricevi mediamente al mese?',
    tipo: 'select',
    peso: 2,
    opzioni: ['0-5', '6-15', '16-30', '31-50', 'Oltre 50']
  },
  { id: 'q20', categoria: 'Acquisizione Clienti', domanda: 'I lead che arrivano vengono contattati entro 24 ore?', tipo: 'si_no', peso: 3 },
  {
    id: 'q21',
    categoria: 'Acquisizione Clienti',
    domanda: 'Che percentuale di lead riceve una risposta entro la prima ora?',
    tipo: 'select',
    peso: 4,
    opzioni: ['Meno del 10%', '10-30%', '30-60%', 'Oltre il 60%']
  },
  {
    id: 'q22',
    categoria: 'Acquisizione Clienti',
    domanda: 'Hai un sistema automatico di reminder per follow-up dei lead?',
    tipo: 'select',
    peso: 3,
    opzioni: ['Sì, completamente automatico', 'Sì, semi-automatico', 'No, tutto manuale', 'No, non facciamo follow-up sistematico']
  },
  {
    id: 'q23',
    categoria: 'Acquisizione Clienti',
    domanda: 'Nell\'ultimo mese, quanti lead hai perso per incapacità di gestirli o per lentezza?',
    tipo: 'select',
    peso: 4,
    opzioni: ['Nessuno', '1-5 lead', '6-15 lead', 'Oltre 15 lead']
  },
  { id: 'q24', categoria: 'Acquisizione Clienti', domanda: 'Dedichi meno di 1 ora a settimana a creare contenuti marketing (post, email, materiali)?', tipo: 'si_no', peso: 2 },
  { id: 'q25', categoria: 'Acquisizione Clienti', domanda: 'Hai landing page dedicate per campagne specifiche?', tipo: 'si_no', peso: 2 },
  {
    id: 'q26',
    categoria: 'Acquisizione Clienti',
    domanda: 'Hai un sistema di lead scoring o prioritizzazione dei contatti?',
    tipo: 'select',
    peso: 3,
    opzioni: ['Sì, automatico', 'Sì, manuale', 'No']
  },

  // ===== SEZIONE 4: GESTIONE CLIENTI (11 domande - +5 nuove, -1 trasformata) =====
  { id: 'q27', categoria: 'Gestione Clienti', domanda: 'Hai un CRM dove registri tutti i contatti con clienti e prospect?', tipo: 'si_no', peso: 3 },
  {
    id: 'q28',
    categoria: 'Gestione Clienti',
    domanda: 'Quanto tempo ci vuole mediamente per preparare un preventivo complesso?',
    tipo: 'select',
    peso: 3,
    opzioni: ['Meno di 30 minuti', '30-60 minuti', '1-3 ore', '3-5 ore', 'Oltre 5 ore']
  },
  {
    id: 'q29',
    categoria: 'Gestione Clienti',
    domanda: 'Hai template automatici per preventivi ricorrenti o standard?',
    tipo: 'si_no',
    peso: 3
  },
  {
    id: 'q30',
    categoria: 'Gestione Clienti',
    domanda: 'Che percentuale dei preventivi richiede personalizzazione totale (da zero)?',
    tipo: 'select',
    peso: 3,
    opzioni: ['Meno del 20%', '20-50%', '50-80%', 'Oltre 80%']
  },
  {
    id: 'q31',
    categoria: 'Gestione Clienti',
    domanda: 'Il tuo CRM o sistema gestionale per preventivi è integrato automaticamente?',
    tipo: 'select',
    peso: 3,
    opzioni: ['Sì, completamente integrato', 'Sì, ma inserimento manuale', 'Uso Excel', 'No, nessun sistema']
  },
  {
    id: 'q32',
    categoria: 'Gestione Clienti',
    domanda: 'Come gestisci il follow-up dei preventivi non accettati?',
    tipo: 'select',
    peso: 3,
    opzioni: ['Automatico con trigger', 'Semi-automatico', 'Manualmente', 'Non lo facciamo']
  },
  { id: 'q33', categoria: 'Gestione Clienti', domanda: 'I clienti ricevono follow-up automatici dopo acquisto/richiesta?', tipo: 'si_no', peso: 2 },
  { id: 'q34', categoria: 'Gestione Clienti', domanda: 'Sai quali clienti generano l\'80% del tuo fatturato?', tipo: 'si_no', peso: 3 },
  { id: 'q35', categoria: 'Gestione Clienti', domanda: 'Riesci sempre a rispondere a richieste clienti entro 24 ore?', tipo: 'si_no', peso: 2 },
  {
    id: 'q36',
    categoria: 'Gestione Clienti',
    domanda: 'Nell\'ultimo mese, quanti problemi di qualità del servizio hai avuto per sovraccarico?',
    tipo: 'select',
    peso: 4,
    opzioni: ['Nessuno', '1-3 problemi', '4-10 problemi', 'Oltre 10 problemi']
  },
  { id: 'q37', categoria: 'Gestione Clienti', domanda: 'Hai un sistema per misurare la soddisfazione clienti?', tipo: 'si_no', peso: 2 },

  // ===== SEZIONE 5: AI & AUTOMAZIONE (9 domande - +2 nuove) =====
  { id: 'q38', categoria: 'AI & Automazione', domanda: 'Usi l\'AI regolarmente per velocizzare attività quotidiane (scrivere email, riassumere riunioni)?', tipo: 'si_no', peso: 3 },
  { id: 'q39', categoria: 'AI & Automazione', domanda: 'Hai almeno UN processo completamente automatizzato (email conferma, reminder, report)?', tipo: 'si_no', peso: 3 },
  {
    id: 'q40',
    categoria: 'AI & Automazione',
    domanda: 'Quante automazioni attive hai oggi in azienda?',
    tipo: 'select',
    peso: 4,
    opzioni: ['Nessuna', '1-2 automazioni', '3-5 automazioni', '6-10 automazioni', 'Oltre 10 automazioni']
  },
  { id: 'q41', categoria: 'AI & Automazione', domanda: 'L\'AI ti aiuta a creare contenuti marketing (post, copy, email)?', tipo: 'si_no', peso: 2 },
  { id: 'q42', categoria: 'AI & Automazione', domanda: 'Hai template o prompt AI pronti per attività ripetitive?', tipo: 'si_no', peso: 2 },
  {
    id: 'q43',
    categoria: 'AI & Automazione',
    domanda: 'Quanti strumenti/software AI diversi hai provato per il lavoro?',
    tipo: 'select',
    peso: 2,
    opzioni: ['Nessuno', '1-2', '3-5', '6-10', 'Oltre 10']
  },
  { id: 'q44', categoria: 'AI & Automazione', domanda: 'L\'azienda utilizza software gestionali integrati tra loro (evitando doppia digitazione)?', tipo: 'si_no', peso: 3 },
  {
    id: 'q45',
    categoria: 'AI & Automazione',
    domanda: 'I tuoi strumenti aziendali comunicano tra loro automaticamente?',
    tipo: 'select',
    peso: 3,
    opzioni: ['Sì, completamente integrati', 'Parzialmente integrati', 'No, nessuna integrazione']
  },
  {
    id: 'q46',
    categoria: 'AI & Automazione',
    domanda: 'Che percentuale di errori hai nei processi critici ogni mese?',
    tipo: 'select',
    peso: 3,
    opzioni: ['Meno del 5%', '5-10%', '10-20%', 'Oltre il 20%']
  },

  // ===== SEZIONE 6: DATI & MISURAZIONE (8 domande - +3 nuove) =====
  { id: 'q47', categoria: 'Dati & Misurazione', domanda: 'Monitori almeno 3 KPI chiave (lead, conversioni, margini) regolarmente?', tipo: 'si_no', peso: 3 },
  { id: 'q48', categoria: 'Dati & Misurazione', domanda: 'Hai visibilità in tempo reale sui numeri chiave dell\'azienda?', tipo: 'si_no', peso: 3 },
  {
    id: 'q49',
    categoria: 'Dati & Misurazione',
    domanda: 'Hai dashboard con KPI aggiornati automaticamente?',
    tipo: 'select',
    peso: 3,
    opzioni: ['Sì, in tempo reale', 'Sì, aggiornamento settimanale', 'No, tutto manuale']
  },
  { id: 'q50', categoria: 'Dati & Misurazione', domanda: 'Prendi decisioni importanti basandoti principalmente su dati concreti (vs sensazioni)?', tipo: 'si_no', peso: 2 },
  {
    id: 'q51',
    categoria: 'Dati & Misurazione',
    domanda: 'Quante ore a settimana dedichi a cercare informazioni, documenti o dati?',
    tipo: 'select',
    peso: 3,
    opzioni: ['Meno di 1 ora', '1-3 ore', '3-5 ore', '5-10 ore', 'Oltre 10 ore']
  },
  {
    id: 'q52',
    categoria: 'Dati & Misurazione',
    domanda: 'Dove sono archiviate le informazioni aziendali critiche?',
    tipo: 'select',
    peso: 3,
    opzioni: ['Sistema unico centralizzato', '2-3 sistemi diversi', 'Sparse in molti posti']
  },
  {
    id: 'q53',
    categoria: 'Dati & Misurazione',
    domanda: 'Chi ha accesso alla dashboard KPI dell\'azienda?',
    tipo: 'select',
    peso: 2,
    opzioni: ['Tutto il team', 'Solo manager', 'Solo il titolare', 'Non abbiamo dashboard']
  },
];

const QUESTIONS_PER_PAGE = 5;

export default function TestMaturitaDigitalePage() {
  const [currentStep, setCurrentStep] = useState<'form' | 'questions' | 'results'>('form');
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [results, setResults] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TestMaturitaFormInput | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<TestMaturitaFormInput>({
    resolver: zodResolver(testMaturitaFormSchema),
  });

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const currentPageQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  const onSubmitForm = async (data: TestMaturitaFormInput) => {
    setFormData(data);
    setCurrentPage(0);
    setCurrentStep('questions');
  };

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll automatico in alto quando cambia la pagina
  useEffect(() => {
    if (currentStep === 'questions') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, currentStep]);

  const calculateResults = () => {
    // 1. ESTRAI PROFILAZIONE (peso 0)
    const profilazione = {
      ruolo: answers['q1'] || 'Non specificato',
      settore: answers['q2'] || 'Non specificato',
      collaboratori: answers['q3'] || 'Non specificato',
      eta_azienda: answers['q4'] || 'Non specificato',
      obiettivo_12_mesi: answers['q5'] || 'Non specificato',
      tempo_ripetitivo: answers['q6'] || 'Non specificato'
    };

    // 2. CALCOLA SCORE SOLO PER DOMANDE CON PESO > 0
    const scoresPerCategory: Record<string, number> = {};
    let totalScore = 0;
    let maxScore = 0;

    questions.forEach((q) => {
      if (q.peso === 0) return; // Skip profilazione

      const answer = answers[q.id];
      const category = q.categoria;

      if (!scoresPerCategory[category]) {
        scoresPerCategory[category] = 0;
      }

      maxScore += q.peso;

      // Score per sì/no
      if (q.tipo === 'si_no' && answer === true) {
        scoresPerCategory[category] += q.peso;
        totalScore += q.peso;
      }

      // Score per select/radio - valutiamo risposte positive
      if ((q.tipo === 'select' || q.tipo === 'radio') && answer) {
        // Risposte che indicano situazione positiva
        const positiveAnswers = [
          'Nessuno, siamo pronti',
          'No, siamo organizzati per continuare',
          'Sì, facilmente',
          'No, siamo scalabili',
          'Oltre 50',
          'Meno di 1 settimana',
          '1-2 settimane',
          'Meno di 30 minuti',
          '30-60 minuti',
          '6-10',
          'Oltre 10',
          '3-5',
          'Nessuno, ho già tutto'
        ];

        if (positiveAnswers.includes(answer)) {
          scoresPerCategory[category] += q.peso;
          totalScore += q.peso;
        } else if (answer.includes('Parzialmente') || answer.includes('qualche difficoltà')) {
          scoresPerCategory[category] += q.peso * 0.5; // Mezzo punteggio
          totalScore += q.peso * 0.5;
        }
      }
    });

    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    // 3. IDENTIFICA COLLI DI BOTTIGLIA CRITICI
    const colliBottiglia = {
      q9_crescita_processo: answers['q9'] || 'Non risposto',
      q14_dipendenza_persone: answers['q14'] || 'Non risposto',
      q19_scalabilita_lead: answers['q19'] || 'Non risposto',
      q27_scalabilita_clienti: answers['q27'] || 'Non risposto'
    };

    // Identifica il collo di bottiglia primario
    let colloBottigliaPrimario = 'Non identificato';
    if (colliBottiglia.q9_crescita_processo && colliBottiglia.q9_crescita_processo !== 'Nessuno, siamo pronti' && colliBottiglia.q9_crescita_processo !== 'Non risposto') {
      colloBottigliaPrimario = colliBottiglia.q9_crescita_processo;
    } else if (colliBottiglia.q14_dipendenza_persone && (colliBottiglia.q14_dipendenza_persone.includes('bloccherebbe') || colliBottiglia.q14_dipendenza_persone.includes('rallentamenti importanti'))) {
      colloBottigliaPrimario = 'Dipendenza da persone chiave';
    } else if (colliBottiglia.q19_scalabilita_lead && (colliBottiglia.q19_scalabilita_lead.includes('No') || colliBottiglia.q19_scalabilita_lead.includes('difficoltà'))) {
      colloBottigliaPrimario = 'Gestione lead/acquisizione clienti';
    } else if (colliBottiglia.q27_scalabilita_clienti && (colliBottiglia.q27_scalabilita_clienti.includes('collasserebbe') || colliBottiglia.q27_scalabilita_clienti.includes('rallentamento'))) {
      colloBottigliaPrimario = 'Servizio clienti e gestione volumi';
    }

    // 4. CALCOLA CAPACITÀ DI CRESCITA STIMATA
    let capacitaCrescita = '+100%+'; // Default ottimista
    let readyForGrowth = true;

    if (colliBottiglia.q9_crescita_processo !== 'Nessuno, siamo pronti') readyForGrowth = false;
    if (colliBottiglia.q14_dipendenza_persone && colliBottiglia.q14_dipendenza_persone.includes('bloccherebbe')) readyForGrowth = false;
    if (colliBottiglia.q19_scalabilita_lead && colliBottiglia.q19_scalabilita_lead.includes('perderemmo')) readyForGrowth = false;
    if (colliBottiglia.q27_scalabilita_clienti && colliBottiglia.q27_scalabilita_clienti.includes('collasserebbe')) readyForGrowth = false;

    if (!readyForGrowth) {
      capacitaCrescita = '+30%';
    } else if (percentage < 40) {
      capacitaCrescita = '+60%';
    }

    // 5. LIVELLO E DESCRIZIONE
    let livello = 'Iniziale';
    let livelloDescription = 'Primi Passi - Fondamenta da Costruire';
    if (percentage >= 80) {
      livello = 'Eccellente';
      livelloDescription = 'Leader Digitale - Best in Class';
    } else if (percentage >= 60) {
      livello = 'Avanzato';
      livelloDescription = 'Digitalmente Maturo - Ottime Basi';
    } else if (percentage >= 40) {
      livello = 'Intermedio';
      livelloDescription = 'In Crescita - Fondamenta da Consolidare';
    } else if (percentage >= 20) {
      livello = 'Base';
      livelloDescription = 'Fondamenta Digitali - Buon Inizio';
    }

    // 6. DIAGNOSI PERSONALIZZATA (QUALITATIVA, NO €)
    const diagnosi = {
      livello: livelloDescription,
      collo_bottiglia_primario: colloBottigliaPrimario,
      capacita_crescita_attuale: capacitaCrescita,
      opportunita: {
        tempo_liberabile: percentage < 40 ? '10-15 ore/settimana' : percentage < 60 ? '6-10 ore/settimana' : '3-6 ore/settimana',
        valore_tempo: percentage < 40 ? 'Molto Elevato' : percentage < 60 ? 'Elevato' : 'Significativo',
        accelerazione_decisioni: percentage < 40 ? '50-70% più veloci' : percentage < 60 ? '30-50% più veloci' : '20-30% più veloci',
        riduzione_errori: 'Significativa',
        note_profilo: `Profilo: ${profilazione.settore} con ${profilazione.collaboratori}. Obiettivo: ${profilazione.obiettivo_12_mesi}`
      }
    };

    // 7. PRIORITÀ D'AZIONE (vs Quick Wins - basato su colli di bottiglia)
    const prioritaAzione = generatePrioritaAzione(colliBottiglia, scoresPerCategory, answers, profilazione);

    // 8. ROADMAP SCALABILITÀ
    const roadmapScalabilita = {
      capacita_attuale: capacitaCrescita,
      fase1: {
        titolo: 'Risolvi Colli di Bottiglia Critici',
        durata: '1-2 mesi',
        target_crescita: '+60%',
        azioni: colloBottigliaPrimario !== 'Non identificato'
          ? [`Risolvi: ${colloBottigliaPrimario}`, 'Automatizza processi critici', 'Documenta procedure chiave']
          : ['Digitalizza processi base', 'Implementa CRM', 'Automatizza comunicazioni']
      },
      fase2: {
        titolo: 'Automatizza Processi Ripetitivi',
        durata: '3-4 mesi',
        target_crescita: '+100%',
        azioni: ['AI per contenuti e comunicazioni', 'Dashboard KPI real-time', 'Integrazione sistemi']
      },
      fase3: {
        titolo: 'Scala con AI e Automazione',
        durata: '5-6 mesi',
        target_crescita: '+200%+',
        azioni: ['Processi completamente scalabili', 'AI avanzata operativa', 'Team autonomo e organizzato']
      }
    };

    // 9. INVESTIMENTO SUGGERITO (QUALITATIVO, NO €)
    const investimentoSuggerito = {
      livello: percentage < 40 ? 'MEDIO-ALTO' : percentage < 60 ? 'MEDIO' : 'CONTENUTO',
      descrizione: percentage < 40
        ? 'Setup iniziale significativo ma con ritorni rapidi e tangibili'
        : percentage < 60
          ? 'Investimento mirato su processi specifici'
          : 'Ottimizzazioni e fine-tuning',
      tempi_rientro: percentage < 40 ? '4-8 mesi indicativo' : percentage < 60 ? '3-6 mesi indicativo' : '2-4 mesi indicativo',
      note: 'I tempi sono indicativi e dipendono dall\'impegno e dalla priorità data all\'implementazione'
    };

    // 10. BENCHMARK SETTORE (personalizzato)
    const benchmark = generateBenchmarkSettore(scoresPerCategory, profilazione.settore);

    // 11. ROADMAP PER PILASTRO
    const roadmapPilastri = generateRoadmapPilastri(scoresPerCategory, colloBottigliaPrimario);

    // 12. RISORSE BONUS (personalizzate per profilo)
    const risorseBonus = generateRisorseBonus(profilazione);

    // 13. NEXT STEPS
    const nextSteps = {
      questa_settimana: [
        'Scarica il toolkit specifico per il tuo settore',
        colloBottigliaPrimario !== 'Non identificato' ? `Identifica soluzioni per: ${colloBottigliaPrimario}` : 'Rivedi i processi critici',
        'Applica Priorità d\'Azione #1'
      ],
      entro_15_giorni: [
        'Prenota Check-up Operativo Gratuito (1h in azienda)',
        'Workshop "AI in Azienda" - 12 Dicembre 2025'
      ]
    };

    // Raccomandazioni legacy
    const raccomandazioni: string[] = [];
    Object.entries(scoresPerCategory).forEach(([category, score]) => {
      if (category === 'Profilazione') return;
      const categoryMax = questions
        .filter((q) => q.categoria === category && q.peso > 0)
        .reduce((sum, q) => sum + q.peso, 0);
      const categoryPercentage = categoryMax > 0 ? (score / categoryMax) * 100 : 0;

      if (categoryPercentage < 50) {
        raccomandazioni.push(`Area di miglioramento prioritaria: ${category} (${categoryPercentage.toFixed(0)}% maturità)`);
      }
    });

    return {
      punteggio_totale: totalScore,
      punteggio_per_categoria: scoresPerCategory,
      livello_maturita: livello,
      livello_description: livelloDescription,
      percentage,
      profilazione,
      colli_bottiglia: colliBottiglia,
      collo_bottiglia_primario: colloBottigliaPrimario,
      capacita_crescita: capacitaCrescita,
      diagnosi,
      priorita_azione: prioritaAzione,
      roadmap_scalabilita: roadmapScalabilita,
      investimento_suggerito: investimentoSuggerito,
      benchmark,
      roadmap_pilastri: roadmapPilastri,
      risorse_bonus: risorseBonus,
      next_steps: nextSteps,
      raccomandazioni,
    };
  };

  // === HELPER FUNCTIONS NUOVE ===

  const generatePrioritaAzione = (colli: any, scores: Record<string, number>, answers: Record<string, any>, profilo: any) => {
    const priorita = [];

    // PRIORITÀ 1 - CRITICA: Basata su collo di bottiglia primario
    if (colli.q9_crescita_processo && colli.q9_crescita_processo !== 'Nessuno, siamo pronti') {
      priorita.push({
        livello: 'CRITICA',
        problema: `Area che andrebbe in crisi con crescita: ${colli.q9_crescita_processo}`,
        azione: 'Digitalizza e automatizza questo processo',
        tempo_implementazione: '2-3 settimane',
        impatto: 'Elimina il collo di bottiglia principale',
        come: 'Software gestionale + automazioni workflow'
      });
    }

    // PRIORITÀ 2 - ALTA: Dipendenza persone
    if (colli.q14_dipendenza_persone && colli.q14_dipendenza_persone.includes('bloccherebbe')) {
      priorita.push({
        livello: 'ALTA',
        problema: 'Dipendenza critica da persone chiave',
        azione: 'Documenta processi e crea backup per ruoli chiave',
        tempo_implementazione: '3-4 settimane',
        impatto: 'Riduce rischio blocco operativo',
        come: 'Procedure documentate + formazione incrociata'
      });
    }

    // PRIORITÀ 3 - MEDIA: Automazioni base
    if (!answers['q30'] || answers['q30'] === false) {
      priorita.push({
        livello: 'MEDIA',
        problema: 'Mancanza automazioni base',
        azione: 'Implementa prima automazione (email/report)',
        tempo_implementazione: '1-2 settimane',
        impatto: 'Libera tempo immediato',
        come: 'Email marketing automation o report automatici'
      });
    }

    return priorita.slice(0, 3); // Max 3 priorità
  };

  const generateBenchmarkSettore = (scores: Record<string, number>, settore: string) => {
    const benchmarkData: Record<string, any> = {};

    Object.entries(scores).forEach(([category, score]) => {
      if (category === 'Profilazione') return;

      const categoryMax = questions
        .filter((q) => q.categoria === category && q.peso > 0)
        .reduce((sum, q) => sum + q.peso, 0);
      const yourScore = categoryMax > 0 ? Math.round((score / categoryMax) * 100) : 0;

      benchmarkData[category] = {
        tuo: yourScore,
        media_settore: Math.min(yourScore + 12, 58), // Media settore
        top_10: Math.min(yourScore + 28, 85) // Top 10%
      };
    });

    benchmarkData.settore = settore;
    benchmarkData.note = `Le aziende nel Top 10% del settore ${settore} gestiscono mediamente il 3x dei clienti con lo stesso team e crescono 2.5x più velocemente`;

    return benchmarkData;
  };

  const generateRoadmapPilastri = (scores: Record<string, number>, colloPrimario: string) => {
    const roadmap: any[] = [];

    Object.entries(scores).forEach(([category, score]) => {
      if (category === 'Profilazione') return;

      const categoryMax = questions
        .filter((q) => q.categoria === category && q.peso > 0)
        .reduce((sum, q) => sum + q.peso, 0);
      const percentage = categoryMax > 0 ? Math.round((score / categoryMax) * 100) : 0;

      let priorita = 'BASSA';
      let icon = '✅';
      if (percentage < 25) {
        priorita = 'CRITICA';
        icon = '❌';
      } else if (percentage < 45) {
        priorita = 'ALTA';
        icon = '⚠️';
      } else if (percentage < 65) {
        priorita = 'MEDIA';
        icon = '⚡';
      }

      // Se il collo di bottiglia primario è in questa categoria, alza priorità
      if (colloPrimario.toLowerCase().includes(category.toLowerCase()) && priorita !== 'CRITICA') {
        priorita = 'ALTA';
      }

      roadmap.push({
        pilastro: category,
        punteggio: percentage,
        priorita,
        icon,
        azioni_consigliate: getAzioniPerPilastro(category, percentage, colloPrimario)
      });
    });

    // Ordina per priorità
    const priorityOrder = { 'CRITICA': 0, 'ALTA': 1, 'MEDIA': 2, 'BASSA': 3 };
    return roadmap.sort((a, b) =>
      priorityOrder[a.priorita as keyof typeof priorityOrder] - priorityOrder[b.priorita as keyof typeof priorityOrder]
    );
  };

  const getAzioniPerPilastro = (category: string, percentage: number, colloPrimario: string) => {
    const azioni: Record<string, string[]> = {
      'Organizzazione & Processi':
        percentage < 40
          ? ['Documenta top 5 processi critici', 'Digitalizza gestione documenti', 'Crea checklist operative']
          : ['Automatizza report interni', 'Ottimizza workflow esistenti', 'Training team su processi'],
      'Acquisizione Clienti':
        percentage < 40
          ? ['Implementa form lead automatici', 'Crea landing page pilota', 'Setup tracking sorgenti']
          : ['Ottimizza conversione lead', 'Automatizza nurturing', 'A/B test campagne'],
      'Gestione Clienti':
        percentage < 40
          ? ['Attiva CRM base', 'Template preventivi', 'Follow-up automatici post-vendita']
          : ['Ottimizza pipeline vendite', 'Segmenta clientela', 'Upselling automatizzato'],
      'AI & Automazione':
        percentage < 40
          ? ['Formazione AI essenziale team', 'Prima automazione processo', 'Template prompt base']
          : ['AI avanzata per analisi', 'Automazioni multi-step', 'Integrazione AI nei processi'],
      'Dati & Misurazione':
        percentage < 40
          ? ['Dashboard KPI essenziali', 'Report automatici settimanali', 'Definisci metriche chiave']
          : ['Analytics predittiva', 'Data-driven decision making', 'Dashboard real-time avanzate']
    };

    return azioni[category] || ['Migliora processi esistenti', 'Digitalizza workflow', 'Automatizza task ripetitivi'];
  };

  const generateRisorseBonus = (profilo: any) => {
    const risorse = [
      `Checklist Colli di Bottiglia per ${profilo.settore}`,
      `Template Processi Scalabili per aziende ${profilo.collaboratori}`,
      'Guida AI: Da 0 a Operativo in 30 Giorni',
      'Dashboard KPI Essenziali (template)',
      'Calcolatore Capacità di Crescita'
    ];

    return risorse;
  };

  const submitTest = async () => {
    setIsSubmitting(true);
    const calculatedResults = calculateResults();
    setResults(calculatedResults);

    try {
      // Salva risultati con dati del form iniziale
      const formValues = formData || getValues();
      const response = await fetch('/api/test-maturita/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formValues.nome,
          cognome: formValues.cognome,
          email: formValues.email,
          azienda: formValues.azienda,
          risposte: answers,
          punteggio_totale: calculatedResults.punteggio_totale,
          punteggio_per_categoria: calculatedResults.punteggio_per_categoria,
          livello_maturita: calculatedResults.livello_maturita,
          livello_description: calculatedResults.livello_description,
          percentage: calculatedResults.percentage,
          profilazione: calculatedResults.profilazione,
          colli_bottiglia: calculatedResults.colli_bottiglia,
          collo_bottiglia_primario: calculatedResults.collo_bottiglia_primario,
          capacita_crescita: calculatedResults.capacita_crescita,
          diagnosi: calculatedResults.diagnosi,
          priorita_azione: calculatedResults.priorita_azione,
          roadmap_scalabilita: calculatedResults.roadmap_scalabilita,
          investimento_suggerito: calculatedResults.investimento_suggerito,
          benchmark: calculatedResults.benchmark,
          roadmap_pilastri: calculatedResults.roadmap_pilastri,
          risorse_bonus: calculatedResults.risorse_bonus,
          next_steps: calculatedResults.next_steps,
          raccomandazioni: calculatedResults.raccomandazioni,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error saving test:', errorData);
        // Mostra risultati comunque anche se il salvataggio fallisce
      }
    } catch (error) {
      console.error('Error saving test:', error);
      // Mostra risultati comunque anche se c'è un errore
    } finally {
      setIsSubmitting(false);
      setCurrentStep('results');
    }
  };

  const allCurrentPageQuestionsAnswered = currentPageQuestions.every((q) => answers[q.id] !== undefined);
  const allQuestionsAnswered = questions.every((q) => answers[q.id] !== undefined);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  if (currentStep === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* OSM Logo - Posizionato in alto */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo-osm-partner.png"
              alt="Open Source Management Partner"
              width={150}
              height={45}
              className="object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="eager"
              quality={90}
              sizes="150px"
              priority
            />
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl font-bold mb-6 text-center font-heading">
              Test Digitalizzazione Aziendale
            </h1>
            <p className="text-center text-gray-600 mb-8 text-lg">
              Scopri in 10 minuti il livello di digitalizzazione, i colli di bottiglia e la capacità di scala della tua azienda
            </p>

            <form onSubmit={handleSubmit(onSubmitForm, (errors) => {
              console.error('Validation errors:', errors);
            })} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Nome</label>
                <input
                  {...register('nome')}
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg ${errors.nome ? 'border-red-500' : ''}`}
                  placeholder="Mario"
                />
                {errors.nome && (
                  <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Cognome</label>
                <input
                  {...register('cognome')}
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg ${errors.cognome ? 'border-red-500' : ''}`}
                  placeholder="Rossi"
                />
                {errors.cognome && (
                  <p className="text-red-500 text-sm mt-1">{errors.cognome.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className={`w-full px-4 py-3 border rounded-lg ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="mario.rossi@azienda.it"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Azienda (opzionale)</label>
                <input
                  {...register('azienda')}
                  type="text"
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Nome azienda"
                />
              </div>

              <MagneticButton className="w-full">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Inizia il Test
                </button>
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'questions') {
    const answeredCount = questions.filter((q) => answers[q.id] !== undefined).length;
    const currentCategory = currentPageQuestions[0]?.categoria || '';

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-purple-600">{currentCategory}</span>
                </div>
                <span className="text-xs text-gray-500">
                  Pagina {currentPage + 1} / {totalPages} • {answeredCount} / {questions.length} completate
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Questions for Current Page */}
            <div className="space-y-4 mb-6">
              {currentPageQuestions.map((question, index) => {
                const answer = answers[question.id];
                const isAnswered = answer !== undefined;

                return (
                  <div
                    key={question.id}
                    className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 ${isAnswered
                      ? 'border-l-green-500 bg-green-50/20'
                      : 'border-l-purple-500'
                      }`}
                  >
                    <div className="p-4">
                      {/* Question Number & Category */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded">
                          {currentPage * QUESTIONS_PER_PAGE + index + 1}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">{question.categoria}</span>
                      </div>

                      {/* Question Text */}
                      <h3 className="text-sm font-semibold text-gray-800 mb-3 leading-snug">
                        {question.domanda}
                      </h3>

                      {/* Answer Input - CONDIZIONALE  SUL TIPO */}
                      {question.tipo === 'si_no' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAnswer(question.id, true)}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-[1.02] ${answer === true
                              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                              : 'bg-gray-50 hover:bg-green-50 text-gray-700 border border-gray-200 hover:border-green-300'
                              }`}
                          >
                            <span className="flex items-center justify-center gap-1.5">
                              <span className="text-base">✓</span>
                              <span>Sì</span>
                            </span>
                          </button>
                          <button
                            onClick={() => handleAnswer(question.id, false)}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-[1.02] ${answer === false
                              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                              : 'bg-gray-50 hover:bg-red-50 text-gray-700 border border-gray-200 hover:border-red-300'
                              }`}
                          >
                            <span className="flex items-center justify-center gap-1.5">
                              <span className="text-base">✗</span>
                              <span>No</span>
                            </span>
                          </button>
                        </div>
                      )}

                      {question.tipo === 'select' && question.opzioni && (
                        <select
                          value={answer || ''}
                          onChange={(e) => handleAnswer(question.id, e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all"
                        >
                          <option value="">-- Seleziona una risposta --</option>
                          {question.opzioni.map((opzione, idx) => (
                            <option key={idx} value={opzione}>
                              {opzione}
                            </option>
                          ))}
                        </select>
                      )}

                      {question.tipo === 'radio' && question.opzioni && (
                        <div className="space-y-2">
                          {question.opzioni.map((opzione, idx) => (
                            <label
                              key={idx}
                              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${answer === opzione
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                }`}
                            >
                              <input
                                type="radio"
                                name={question.id}
                                value={opzione}
                                checked={answer === opzione}
                                onChange={(e) => handleAnswer(question.id, e.target.value)}
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                              />
                              <span className="text-sm text-gray-700">{opzione}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4 bg-white rounded-lg shadow-sm p-4">
              <button
                onClick={goToPreviousPage}
                disabled={isFirstPage}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${isFirstPage
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md transform hover:scale-[1.02]'
                  }`}
              >
                ← Indietro
              </button>

              {isLastPage ? (
                <button
                  onClick={submitTest}
                  disabled={isSubmitting || !allQuestionsAnswered}
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${isSubmitting || !allQuestionsAnswered
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg transform hover:scale-[1.02]'
                    }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      <span>Calcolo risultati...</span>
                    </span>
                  ) : (
                    'Vedi Risultati →'
                  )}
                </button>
              ) : (
                <button
                  onClick={goToNextPage}
                  disabled={!allCurrentPageQuestionsAnswered}
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${!allCurrentPageQuestionsAnswered
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg transform hover:scale-[1.02]'
                    }`}
                >
                  Successivo →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'results' && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Score Card */}
            <div className="bg-white rounded-xl shadow-xl p-8 mb-8 text-center">
              <h2 className="text-3xl font-bold mb-4 font-heading">Il Tuo Check-up Score</h2>
              <div className="text-6xl font-bold mb-2 text-purple-600">
                {results.percentage.toFixed(0)}%
              </div>
              <div className="text-2xl font-semibold text-gray-700 mb-6">
                {results.livello_maturita}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-4 rounded-full transition-all"
                  style={{ width: `${results.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* 1. DIAGNOSI PERSONALIZZATA */}
          {results.diagnosi && (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg p-8 mb-8 border border-purple-200">
              <h3 className="text-2xl font-bold mb-4 font-heading text-purple-700">📍 Diagnosi Completa</h3>
              <p className="text-lg font-semibold text-gray-800 mb-6">{results.diagnosi.livello}</p>

              {/* COLLO DI BOTTIGLIA PRIMARIO */}
              {results.collo_bottiglia_primario && results.collo_bottiglia_primario !== 'Non identificato' && (
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-lg mb-2 text-red-800 flex items-center gap-2">
                    ⚠️ COLLO DI BOTTIGLIA CRITICO IDENTIFICATO
                  </h4>
                  <p className="text-red-700 font-semibold text-xl mb-2">{results.collo_bottiglia_primario}</p>
                  <p className="text-sm text-red-600">
                    Questo è il punto che andrebbe in crisi per primo con una crescita rapida del business.
                    <strong> Risolverlo è priorità assoluta.</strong>
                  </p>
                </div>
              )}

              {/* CAPACITÀ DI CRESCITA */}
              <div className={`rounded-lg p-6 mb-4 ${results.capacita_crescita === '+30%' ? 'bg-orange-50 border-2 border-orange-300' : results.capacita_crescita === '+60%' ? 'bg-yellow-50 border-2 border-yellow-300' : 'bg-green-50 border-2 border-green-300'}`}>
                <h4 className="font-bold text-lg mb-2 text-gray-900">📈 Capacità di Crescita Attuale</h4>
                <div className="text-4xl font-bold mb-2" style={{ color: results.capacita_crescita === '+30%' ? '#f59e0b' : results.capacita_crescita === '+60%' ? '#eab308' : '#10b981' }}>
                  {results.capacita_crescita}
                </div>
                <p className="text-sm text-gray-700">
                  {results.capacita_crescita === '+30%' && 'Limitata da colli di bottiglia critici. Risolvili per sbloccare la crescita.'}
                  {results.capacita_crescita === '+60%' && 'Buona, ma con margini di miglioramento significativi.'}
                  {results.capacita_crescita.includes('100') && 'Eccellente! Sei pronto per scalare senza vincoli.'}
                </p>
              </div>

              {/* OPPORTUNITÀ */}
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3 text-gray-900">💰 Opportunità Immediate:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Tempo Liberabile</div>
                    <div className="text-xl font-bold text-green-700">{results.diagnosi.opportunita.tempo_liberabile}</div>
                    <div className="text-xs text-gray-600 mt-1">Valore: {results.diagnosi.opportunita.valore_tempo}</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Accelerazione Decisioni</div>
                    <div className="text-xl font-bold text-blue-700">{results.diagnosi.opportunita.accelerazione_decisioni}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg md:col-span-2">
                    <div className="text-sm text-gray-600 mb-1">Riduzione Errori</div>
                    <div className="text-xl font-bold text-purple-700">{results.diagnosi.opportunita.riduzione_errori}</div>
                  </div>
                </div>
                {results.diagnosi.opportunita.note_profilo && (
                  <p className="text-xs text-gray-500 mt-4 italic">{results.diagnosi.opportunita.note_profilo}</p>
                )}
              </div>
            </div>
          )}

          {/* 2. PRIORITÀ D'AZIONE (vs Quick Wins) */}
          {results.priorita_azione && results.priorita_azione.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 font-heading text-gray-900">🎯 Priorità d'Azione (Ordine di Criticità)</h3>
              <div className="space-y-4">
                {results.priorita_azione.map((priorita: any, idx: number) => (
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. ROADMAP SCALABILITÀ */}
          {results.roadmap_scalabilita && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 mb-8 border border-blue-300">
              <h3 className="text-2xl font-bold mb-6 font-heading text-blue-800">📈 Roadmap per Sbloccare la Crescita</h3>

              <div className="bg-white rounded-lg p-4 mb-6">
                <span className="text-sm text-gray-600">Capacità Attuale:</span>
                <span className={`text-2xl font-bold ml-3 ${results.capacita_crescita === '+30%' ? 'text-orange-600' : results.capacita_crescita === '+60%' ? 'text-yellow-600' : 'text-green-600'}`}>
                  {results.roadmap_scalabilita.capacita_attuale}
                </span>
              </div>

              <div className="space-y-4">
                {/* Fase 1 */}
                <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-gray-900">{results.roadmap_scalabilita.fase1.titolo}</h4>
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">{results.roadmap_scalabilita.fase1.durata}</span>
                  </div>
                  <div className="mb-3">
                    <span className="text-sm font-semibold text-red-700">Target: {results.roadmap_scalabilita.fase1.target_crescita}</span>
                  </div>
                  <ul className="space-y-2">
                    {results.roadmap_scalabilita.fase1.azioni.map((azione: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{azione}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fase 2 */}
                <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-gray-900">{results.roadmap_scalabilita.fase2.titolo}</h4>
                    <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">{results.roadmap_scalabilita.fase2.durata}</span>
                  </div>
                  <div className="mb-3">
                    <span className="text-sm font-semibold text-yellow-700">Target: {results.roadmap_scalabilita.fase2.target_crescita}</span>
                  </div>
                  <ul className="space-y-2">
                    {results.roadmap_scalabilita.fase2.azioni.map((azione: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{azione}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fase 3 */}
                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-gray-900">{results.roadmap_scalabilita.fase3.titolo}</h4>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">{results.roadmap_scalabilita.fase3.durata}</span>
                  </div>
                  <div className="mb-3">
                    <span className="text-sm font-semibold text-green-700">Target: {results.roadmap_scalabilita.fase3.target_crescita}</span>
                  </div>
                  <ul className="space-y-2">
                    {results.roadmap_scalabilita.fase3.azioni.map((azione: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{azione}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 4. INVESTIMENTO SUGGERITO (QUALITATIVO) */}
          {results.investimento_suggerito && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-8 mb-8 border-2 border-purple-300">
              <h3 className="text-2xl font-bold mb-6 font-heading text-purple-800">💰 Investimento e Rientro Stimato</h3>

              <div className="bg-white rounded-lg p-6 mb-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Livello Investimento</h4>
                    <div className={`text-3xl font-bold ${results.investimento_suggerito.livello === 'MEDIO-ALTO' ? 'text-orange-600' : results.investimento_suggerito.livello === 'MEDIO' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {results.investimento_suggerito.livello}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{results.investimento_suggerito.descrizione}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Tempi di Rientro</h4>
                    <div className="text-3xl font-bold text-blue-600">{results.investimento_suggerito.tempi_rientro}</div>
                    <p className="text-xs text-gray-500 mt-2 italic">{results.investimento_suggerito.note}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>💡 Nota:</strong> L'investimento include software, setup e formazione. I tempi dipendono dalla priorità che dai all'implementazione e dal livello di automazione desiderato.
                </p>
              </div>
            </div>
          )}

          {/* 5. BENCHMARK SETTORE PERSONALIZZATO */}
          {results.benchmark && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 font-heading">📊 Benchmark vs Settore</h3>
              {results.benchmark.settore && (
                <p className="text-sm text-gray-600 mb-6">
                  Confronto nel settore: <strong>{results.benchmark.settore}</strong>
                </p>
              )}

              <div className="space-y-6">
                {Object.entries(results.benchmark).filter(([key]) => key !== 'settore' && key !== 'note').map(([category, data]: [string, any]) => (
                  <div key={category} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">{category}</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xs text-gray-600 mb-2">Il Tuo Score</div>
                        <div className="text-3xl font-bold text-purple-600">{data.tuo}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-2">Media Settore</div>
                        <div className="text-3xl font-bold text-blue-600">{data.media_settore}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-2">Top 10%</div>
                        <div className="text-3xl font-bold text-green-600">{data.top_10}%</div>
                      </div>
                    </div>

                    {/* Visual bars */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs w-20">Tu</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${data.tuo}%` }}></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs w-20">Media</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${data.media_settore}%` }}></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs w-20">Top 10%</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${data.top_10}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {results.benchmark.note && (
                <div className="bg-blue-50 p-4 rounded-lg mt-6">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Insight:</strong> {results.benchmark.note}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 6. ROADMAP PILASTRI CON PRIORITÀ */}
          {results.roadmap_pilastri && results.roadmap_pilastri.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 font-heading">🎯 Roadmap Priorità per Pilastro</h3>
              <div className="space-y-4">
                {results.roadmap_pilastri.map((pilastro: any, idx: number) => (
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
          {results.risorse_bonus && results.risorse_bonus.length > 0 && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-8 mb-8 border border-green-300">
              <h3 className="text-2xl font-bold mb-6 font-heading text-green-800">🎁 Toolkit Gratuito Personalizzato</h3>
              <p className="text-gray-700 mb-6">Risorse selezionate per il tuo profilo e settore:</p>

              <div className="grid md:grid-cols-2 gap-4">
                {results.risorse_bonus.map((risorsa: string, idx: number) => (
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

              <div className="mt-6 text-center">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-all">
                  📥 Scarica Toolkit Completo
                </button>
              </div>
            </div>
          )}

          {/* 8. NEXT STEPS STRUTTURATI */}
          {results.next_steps && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-8 mb-8 border-2 border-purple-300">
              <h3 className="text-2xl font-bold mb-6 font-heading text-purple-800">🚀 I Tuoi Prossimi Passi</h3>

              <div className="space-y-6">
                {results.next_steps.questa_settimana && (
                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">⚡</span>
                      Questa Settimana
                    </h4>
                    <ul className="space-y-2">
                      {results.next_steps.questa_settimana.map((step: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-purple-600 font-bold mt-0.5">□</span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {results.next_steps.entro_15_giorni && (
                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-2xl">📅</span>
                      Entro 15 Giorni
                    </h4>
                    <ul className="space-y-3">
                      {results.next_steps.entro_15_giorni.map((step: string, idx: number) => (
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

          {/* VECCHIA SEZIONE CATEGORIA (Mantieni per compatibilità) */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6 font-heading">📊 Dettaglio Score per Categoria</h3>
            <div className="space-y-4">
              {Object.entries(results.punteggio_per_categoria).map(([category, score]: [string, any]) => {
                const categoryMax = questions
                  .filter((q) => q.categoria === category)
                  .reduce((sum, q) => sum + q.peso, 0);
                const percentage = (score / categoryMax) * 100;

                return (
                  <div key={category}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{category}</span>
                      <span className="text-gray-600">
                        {score} / {categoryMax} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${percentage >= 70
                          ? 'bg-green-500'
                          : percentage >= 40
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                          }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Piano 30-60-90 */}
          {results.piano_30_60_90 && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 font-heading">📅 Il Tuo Piano 30-60-90 Giorni</h3>
              <div className="space-y-6">
                {['mese1', 'mese2', 'mese3'].map((mese, idx) => {
                  const data = results.piano_30_60_90[mese];
                  return (
                    <div key={mese} className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="font-bold text-lg">MESE {idx + 1}: {data.focus}</h4>
                          <div className="text-sm text-purple-700 font-semibold">Target: {data.target}</div>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {data.obiettivi.map((ob: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span className="text-gray-700">{ob}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Raccomandazioni */}
          {results.raccomandazioni && results.raccomandazioni.length > 0 && (
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 font-heading">💡 Raccomandazioni</h3>
              <ul className="space-y-2">
                {results.raccomandazioni.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4 font-heading">
            Vuoi Migliorare la Tua Maturità Digitale?
          </h3>
          <p className="mb-6">
            Prenota un Check-up Digitale Gratuito e scopri come possiamo aiutarti
          </p>
          <MagneticButton>
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_CHECKUP_URL || 'https://calendly.com/enricorizzi/check-up-gratuito-in-azienda'}
              className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all"
            >
              Prenota Check-up Gratuito
            </a>
          </MagneticButton>
        </div>
      </div>
    );
  }

  return null;
}
