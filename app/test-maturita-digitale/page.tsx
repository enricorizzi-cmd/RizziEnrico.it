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
  tipo: 'si_no' | 'scala';
  peso: number;
}

const questions: Question[] = [
  // PILASTRO 1: Organizzazione & Processi Interni (6 domande)
  { id: 'q1', categoria: 'Organizzazione & Processi', domanda: 'I tuoi collaboratori sanno sempre dove trovare procedure, documenti e informazioni aziendali?', tipo: 'si_no', peso: 3 },
  { id: 'q2', categoria: 'Organizzazione & Processi', domanda: 'Le riunioni di team terminano con un piano d\'azione chiaro e condiviso?', tipo: 'si_no', peso: 2 },
  { id: 'q3', categoria: 'Organizzazione & Processi', domanda: 'Hai processi documentati per le attività principali (onboarding, gestione ordini, customer care)?', tipo: 'si_no', peso: 3 },
  { id: 'q4', categoria: 'Organizzazione & Processi', domanda: 'I documenti aziendali (contratti, fatture, preventivi) sono tutti digitalizzati e facilmente reperibili?', tipo: 'si_no', peso: 2 },
  { id: 'q5', categoria: 'Organizzazione & Processi', domanda: 'Perdi meno di 2 ore alla settimana in attività ripetitive (mail standard, report, preventivi ripetitivi)?', tipo: 'si_no', peso: 3 },
  { id: 'q6', categoria: 'Organizzazione & Processi', domanda: 'Dedichi meno di 2 ore a settimana a coordinare il lavoro tra collaboratori?', tipo: 'si_no', peso: 2 },

  // PILASTRO 2: Acquisizione Clienti & Marketing (5 domande)
  { id: 'q7', categoria: 'Acquisizione Clienti', domanda: 'Hai un sistema per raccogliere contatti (lead) in modo automatico dal sito?', tipo: 'si_no', peso: 3 },
  { id: 'q8', categoria: 'Acquisizione Clienti', domanda: 'Sai esattamente quale canale (Google, social, passaparola) ti porta più clienti nuovi?', tipo: 'si_no', peso: 3 },
  { id: 'q9', categoria: 'Acquisizione Clienti', domanda: 'Hai landing page dedicate per campagne o servizi specifici?', tipo: 'si_no', peso: 2 },
  { id: 'q10', categoria: 'Acquisizione Clienti', domanda: 'I lead che arrivano vengono contattati sistematicamente entro 24 ore?', tipo: 'si_no', peso: 3 },
  { id: 'q11', categoria: 'Acquisizione Clienti', domanda: 'Dedichi meno di 1 ora a settimana a creare contenuti marketing (post, email, materiali)?', tipo: 'si_no', peso: 2 },

  // PILASTRO 3: Gestione Clienti & Vendite (5 domande)
  { id: 'q12', categoria: 'Gestione Clienti', domanda: 'Hai un CRM dove registri tutti i contatti con clienti e prospect?', tipo: 'si_no', peso: 3 },
  { id: 'q13', categoria: 'Gestione Clienti', domanda: 'Prepari un preventivo in meno di 30 minuti?', tipo: 'si_no', peso: 2 },
  { id: 'q14', categoria: 'Gestione Clienti', domanda: 'I clienti ricevono follow-up automatici dopo un acquisto o richiesta?', tipo: 'si_no', peso: 2 },
  { id: 'q15', categoria: 'Gestione Clienti', domanda: 'Sai quali clienti generano l\'80% del tuo fatturato?', tipo: 'si_no', peso: 3 },
  { id: 'q16', categoria: 'Gestione Clienti', domanda: 'Riesci sempre a rispondere a tutte le richieste clienti entro 24 ore?', tipo: 'si_no', peso: 2 },

  // PILASTRO 4: AI & Automazione (5 domande)
  { id: 'q17', categoria: 'AI & Automazione', domanda: 'Usi l\'AI regolarmente per velocizzare attività quotidiane (scrivere email, riassumere riunioni)?', tipo: 'si_no', peso: 3 },
  { id: 'q18', categoria: 'AI & Automazione', domanda: 'Hai almeno UN processo completamente automatizzato (email conferma, reminder, report)?', tipo: 'si_no', peso: 3 },
  { id: 'q19', categoria: 'AI & Automazione', domanda: 'L\'AI ti aiuta a creare contenuti marketing (post, copy, email)?', tipo: 'si_no', peso: 2 },
  { id: 'q20', categoria: 'AI & Automazione', domanda: 'Hai template o prompt AI pronti per attività ripetitive?', tipo: 'si_no', peso: 2 },
  { id: 'q21', categoria: 'AI & Automazione', domanda: 'Hai provato almeno 3 strumenti AI diversi per il lavoro?', tipo: 'si_no', peso: 2 },

  // PILASTRO 5: Dati & Misurazione (4 domande)
  { id: 'q22', categoria: 'Dati & Misurazione', domanda: 'Monitori almeno 3 KPI chiave (lead, conversioni, margini) regolarmente?', tipo: 'si_no', peso: 3 },
  { id: 'q23', categoria: 'Dati & Misurazione', domanda: 'Hai visibilità in tempo reale sui numeri chiave dell\'azienda?', tipo: 'si_no', peso: 3 },
  { id: 'q24', categoria: 'Dati & Misurazione', domanda: 'Prendi decisioni importanti basandoti principalmente su dati concreti (vs sensazioni)?', tipo: 'si_no', peso: 2 },
  { id: 'q25', categoria: 'Dati & Misurazione', domanda: 'Dedichi meno di 1 ora a settimana ad analizzare report e dati?', tipo: 'si_no', peso: 2 },
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
    const scoresPerCategory: Record<string, number> = {};
    let totalScore = 0;
    let maxScore = 0;

    questions.forEach((q) => {
      const answer = answers[q.id];
      const category = q.categoria;

      if (!scoresPerCategory[category]) {
        scoresPerCategory[category] = 0;
      }

      maxScore += q.peso;

      if (answer === true || answer === 'si') {
        scoresPerCategory[category] += q.peso;
        totalScore += q.peso;
      }
    });

    const percentage = (totalScore / maxScore) * 100;

    // Livello basato su score
    let livello = 'Iniziale';
    let livelloDescription = 'Primi Passi Digitali';
    if (percentage >= 80) {
      livello = 'Eccellente';
      livelloDescription = 'Leader Digitale';
    } else if (percentage >= 60) {
      livello = 'Avanzato';
      livelloDescription = 'Digitalmente Maturo';
    } else if (percentage >= 40) {
      livello = 'Intermedio';
      livelloDescription = 'In Crescita';
    } else if (percentage >= 20) {
      livello = 'Base';
      livelloDescription = 'Fondamenta Digitali';
    }

    // === 1. DIAGNOSI PERSONALIZZATA ===
    const diagnosi = generateDiagnosi(percentage, scoresPerCategory, livelloDescription);

    // === 2. QUICK WINS (3 azioni immediate) ===
    const quickWins = generateQuickWins(scoresPerCategory, answers);

    // === 3. PIANO 30-60-90 GIORNI ===
    const piano306090 = generatePiano306090(percentage, scoresPerCategory);

    // === 4. ROI STIMATO ===
    const roiStimato = calculateROI(percentage, scoresPerCategory);

    // === 5. BENCHMARK ===
    const benchmark = generateBenchmark(scoresPerCategory);

    // === 6. ROADMAP PER PILASTRO ===
    const roadmapPilastri = generateRoadmapPilastri(scoresPerCategory);

    // === 7. RISORSE BONUS ===
    const risorseBonus = [
      'Checklist "20 Processi Da Automatizzare"',
      'Template Prompt AI per Email & Post',
      'Guida "Come Scegliere un CRM in 5 Step"',
      'Calcolatore ROI Digitalizzazione',
      'Video "Dashboard KPI in 30 Minuti"'
    ];

    // === 8. NEXT STEPS ===
    const nextSteps = {
      immediato: 'Scarica il toolkit gratuito e applica i 3 Quick Wins',
      settimana: 'Prenota Digital Checkup Gratuito (1h in azienda)',
      mese: 'Workshop "AI in Azienda" - 12 Dicembre 2025'
    };

    // Raccomandazioni legacy (per compatibilità)
    const raccomandazioni: string[] = [];
    Object.entries(scoresPerCategory).forEach(([category, score]) => {
      const categoryMax = questions
        .filter((q) => q.categoria === category)
        .reduce((sum, q) => sum + q.peso, 0);
      const categoryPercentage = (score / categoryMax) * 100;

      if (categoryPercentage < 50) {
        raccomandazioni.push(`Migliora ${category}: hai completato solo il ${categoryPercentage.toFixed(0)}% delle attività`);
      }
    });

    return {
      punteggio_totale: totalScore,
      punteggio_per_categoria: scoresPerCategory,
      livello_maturita: livello,
      livello_description: livelloDescription,
      percentage,
      diagnosi,
      quick_wins: quickWins,
      piano_30_60_90: piano306090,
      roi_stimato: roiStimato,
      benchmark,
      roadmap_pilastri: roadmapPilastri,
      risorse_bonus: risorseBonus,
      next_steps: nextSteps,
      raccomandazioni, // Legacy
    };
  };

  // === HELPER FUNCTIONS PER OUTPUT PREMIUM ===

  const generateDiagnosi = (percentage: number, scores: Record<string, number>, livelloDesc: string) => {
    const oreLiberabili = Math.round(8 + (100 - percentage) * 0.12); // 8-20 ore
    const costoOppMensile = oreLiberabili * 4 * 35; // €35/ora per 4 settimane
    const leadIncrease = Math.round(20 + (100 - percentage) * 0.4); // 20-60%

    return {
      livello: livelloDesc,
      opportunita: {
        ore_liberabili: `${oreLiberabili}-${oreLiberabili + 4} ore/settimana`,
        costo_opportunita: `€${costoOppMensile.toLocaleString()}-€${(costoOppMensile + 500).toLocaleString()}/mese`,
        lead_increase: `+${leadIncrease}% lead qualificati`,
        errori_reduction: '60%'
      }
    };
  };

  const generateQuickWins = (scores: Record<string, number>, answers: Record<string, any>) => {
    const wins = [];

    // Quick Win 1: Automazione base
    if (!answers['q18']) {
      wins.push({
        titolo: 'Automatizza Conferme Ordine/Richieste',
        tempo_setup: '2 ore',
        risparmio: '4 ore/settimana',
        come: 'Template email automatiche con trigger'
      });
    }

    // Quick Win 2: Lead acquisition
    if (!answers['q7'] || !answers['q9']) {
      wins.push({
        titolo: 'Landing Page Servizio Principale',
        tempo_setup: '3 ore',
        impatto: '+15% conversioni',
        come: 'Pagina focalizzata con form raccolta lead'
      });
    }

    // Quick Win 3: Organizzazione
    if (!answers['q1'] || !answers['q4']) {
      wins.push({
        titolo: 'Centralizza Documenti Aziendali',
        tempo_setup: '4 ore',
        risparmio: '6 ore/settimana ricerche',
        come: 'Google Drive strutturato + naming convention'
      });
    }

    // Fallback se tutto già fatto
    if (wins.length === 0) {
      wins.push(
        { titolo: 'Ottimizza CRM', tempo_setup: '2 ore', risparmio: '3 ore/settimana', come: 'Automazioni follow-up' },
        { titolo: 'Dashboard KPI', tempo_setup: '3 ore', impatto: 'Decisioni 2x più veloci', come: 'Google Data Studio base' },
        { titolo: 'AI per Contenuti', tempo_setup: '1 ora', risparmio: '5 ore/settimana', come: 'Template ChatGPT post/email' }
      );
    }

    return wins.slice(0, 3);
  };

  const generatePiano306090 = (percentage: number, scores: Record<string, number>) => {
    return {
      mese1: {
        focus: 'Fondamenta',
        obiettivi: ['CRM base attivo', '2 automazioni email', 'Landing page pilota'],
        target: '+20% efficienza'
      },
      mese2: {
        focus: 'Accelerazione',
        obiettivi: ['AI per contenuti marketing', 'Dashboard KPI real-time', 'Processo lead nurturing'],
        target: '+10 lead qualificati/mese'
      },
      mese3: {
        focus: 'Scala',
        obiettivi: ['Chatbot FAQ clienti', 'Preventivi semi-automatizzati', '5 processi documentati'],
        target: `-${Math.round(10 + percentage * 0.05)} ore lavoro ripetitivo/sett`
      }
    };
  };

  const calculateROI = (percentage: number, scores: Record<string, number>) => {
    const oreLiberateSettimana = Math.round(8 + (100 - percentage) * 0.12);
    const costoOraWorking = 35;
    const risparmiAnnui = oreLiberateSettimana * 52 * costoOraWorking;
    const maggioriVendite = Math.round(risparmiAnnui * 0.7); // 70% dei risparmi
    const menoErrori = 3000;
    const totaleBenefici = risparmiAnnui + maggioriVendite + menoErrori;
    const investimento = 4000; // Medio
    const roiPercentage = Math.round(((totaleBenefici - investimento) / investimento) * 100);
    const paybackMesi = Math.round((investimento / (totaleBenefici / 12)) * 10) / 10;

    return {
      investimento: `€${investimento.toLocaleString()}`,
      risparmi_annui: `€${risparmiAnnui.toLocaleString()}`,
      maggiori_vendite: `€${maggioriVendite.toLocaleString()}`,
      meno_errori: `€${menoErrori.toLocaleString()}`,
      totale_benefici: `€${totaleBenefici.toLocaleString()}`,
      roi_percentage: `${roiPercentage}%`,
      payback_mesi: `${paybackMesi} mesi`
    };
  };

  const generateBenchmark = (scores: Record<string, number>) => {
    // Calcola percentuali per categoria
    const benchmarkData: Record<string, any> = {};

    Object.entries(scores).forEach(([category, score]) => {
      const categoryMax = questions
        .filter((q) => q.categoria === category)
        .reduce((sum, q) => sum + q.peso, 0);
      const yourScore = Math.round((score / categoryMax) * 100);

      benchmarkData[category] = {
        tuo: yourScore,
        media_settore: Math.min(yourScore + 15, 65), // Media settore leggermente più alta
        top_10: Math.min(yourScore + 35, 90) // Top 10% significativamente più alto
      };
    });

    return benchmarkData;
  };

  const generateRoadmapPilastri = (scores: Record<string, number>) => {
    const roadmap: any[] = [];

    Object.entries(scores).forEach(([category, score]) => {
      const categoryMax = questions
        .filter((q) => q.categoria === category)
        .reduce((sum, q) => sum + q.peso, 0);
      const percentage = Math.round((score / categoryMax) * 100);

      let priorita = 'BASSA';
      let icon = '✅';
      if (percentage < 30) {
        priorita = 'CRITICA';
        icon = '❌';
      } else if (percentage < 50) {
        priorita = 'ALTA';
        icon = '⚠️';
      } else if (percentage < 70) {
        priorita = 'MEDIA';
        icon = '⚡';
      }

      roadmap.push({
        pilastro: category,
        punteggio: percentage,
        priorita,
        icon,
        azioni: getAzioniPerPilastro(category, percentage)
      });
    });

    // Ordina per priorità
    return roadmap.sort((a, b) => {
      const priorityOrder = { 'CRITICA': 0, 'ALTA': 1, 'MEDIA': 2, 'BASSA': 3 };
      return priorityOrder[a.priorita as keyof typeof priorityOrder] - priorityOrder[b.priorita as keyof typeof priorityOrder];
    });
  };

  const getAzioniPerPilastro = (category: string, percentage: number) => {
    const azioni: Record<string, string[]> = {
      'Organizzazione & Processi': ['Documenta top 3 processi', 'Centralizza file', 'Automatizza report'],
      'Acquisizione Clienti': ['Landing page', 'Form automatici', 'Contenuti AI'],
      'Gestione Clienti': ['CRM attivo', 'Preventivi template', 'Follow-up automatici'],
      'AI & Automazione': ['Formazione AI base', '1° automazione', 'Template prompt'],
      'Dati & Misurazione': ['Dashboard real-time', 'Report automatici', 'KPI tracking']
    };

    return azioni[category] || ['Migliora processi', 'Digitalizza workflow', 'Automatizza attività'];
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
          diagnosi: calculatedResults.diagnosi,
          quick_wins: calculatedResults.quick_wins,
          piano_30_60_90: calculatedResults.piano_30_60_90,
          roi_stimato: calculatedResults.roi_stimato,
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
              AI Readiness Scan
            </h1>
            <p className="text-center text-gray-600 mb-8 text-lg">
              Scopri in 7 minuti come l'AI può liberare tempo, acquisire clienti e ridurre sprechi nella tua azienda
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
              {currentPageQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 ${answers[question.id] === true
                    ? 'border-l-green-500 bg-green-50/20'
                    : answers[question.id] === false
                      ? 'border-l-red-500 bg-red-50/20'
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

                    {/* Answer Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAnswer(question.id, true)}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-[1.02] ${answers[question.id] === true
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
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-[1.02] ${answers[question.id] === false
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
                  </div>
                </div>
              ))}
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
              <h2 className="text-3xl font-bold mb-4 font-heading">Il Tuo AI Readiness Score</h2>
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
              <h3 className="text-2xl font-bold mb-4 font-heading text-purple-700">📍 Dove Sei Ora</h3>
              <p className="text-lg font-semibold text-gray-800 mb-4">{results.diagnosi.livello}</p>

              <div className="bg-white rounded-lg p-6 mb-4">
                <h4 className="font-bold text-lg mb-3 text-gray-900">💰 Opportunità Immediata:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Tempo Liberabile</div>
                    <div className="text-xl font-bold text-green-700">{results.diagnosi.opportunita.ore_liberabili}</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Valore Mensile</div>
                    <div className="text-xl font-bold text-blue-700">{results.diagnosi.opportunita.costo_opportunita}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Più Lead</div>
                    <div className="text-xl font-bold text-purple-700">{results.diagnosi.opportunita.lead_increase}</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Meno Errori</div>
                    <div className="text-xl font-bold text-orange-700">-{results.diagnosi.opportunita.errori_reduction}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. QUICK WINS */}
          {results.quick_wins && results.quick_wins.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 font-heading text-gray-900">🎯 3 Azioni Da Fare QUESTA Settimana</h3>
              <div className="space-y-4">
                {results.quick_wins.map((win: any, idx: number) => (
                  <div key={idx} className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-bold text-gray-900">{idx + 1}. {win.titolo}</h4>
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ⏱️ {win.tempo_setup}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      {win.risparmio && (
                        <div className="text-sm">
                          <span className="font-semibold text-green-700">💰 Risparmio:</span> {win.risparmio}
                        </div>
                      )}
                      {win.impatto && (
                        <div className="text-sm">
                          <span className="font-semibold text-blue-700">📈 Impatto:</span> {win.impatto}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-700">
                      <span className="font-semibold">🔧 Come:</span> {win.come}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. ROI STIMATO */}
          {results.roi_stimato && (
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-8 mb-8 border-2 border-yellow-300">
              <h3 className="text-2xl font-bold mb-6 font-heading text-orange-800">💰 ROI Stimato (Basato sulle Tue Risposte)</h3>

              <div className="bg-white rounded-lg p-6 mb-4">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Investimento Setup (3 mesi)</h4>
                    <div className="text-3xl font-bold text-gray-900">{results.roi_stimato.investimento}</div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Benefici Totali Annui</h4>
                    <div className="text-3xl font-bold text-green-600">{results.roi_stimato.totale_benefici}</div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tempo liberato:</span>
                    <span className="font-semibold">{results.roi_stimato.risparmi_annui}/anno</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Maggiori vendite (stimate):</span>
                    <span className="font-semibold">{results.roi_stimato.maggiori_vendite}/anno</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Meno errori:</span>
                    <span className="font-semibold">{results.roi_stimato.meno_errori}/anno</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-100 p-4 rounded-lg text-center">
                  <div className="text-sm text-green-800 mb-1">ROI Primo Anno</div>
                  <div className="text-3xl font-bold text-green-700">{results.roi_stimato.roi_percentage}</div>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <div className="text-sm text-blue-800 mb-1">Payback Period</div>
                  <div className="text-3xl font-bold text-blue-700">{results.roi_stimato.payback_mesi}</div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Per Categoria */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6 font-heading">📊 Punteggio per Pilastro</h3>
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
