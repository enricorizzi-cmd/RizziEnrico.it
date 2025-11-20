'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { testMaturitaFormSchema, testMaturitaSchema, type TestMaturitaFormInput, type TestMaturitaInput } from '@/lib/validators';

interface Question {
  id: string;
  categoria: string;
  domanda: string;
  tipo: 'si_no' | 'scala';
  peso: number;
}

const questions: Question[] = [
  // Raccolta dati & CRM
  { id: 'q1', categoria: 'Raccolta Dati & CRM', domanda: 'Hai un posto unico dove finiscono tutti i nominativi dei contatti (lead, clienti, fornitori)?', tipo: 'si_no', peso: 3 },
  { id: 'q2', categoria: 'Raccolta Dati & CRM', domanda: 'Sai sempre chi ti ha contattato, quando e da dove?', tipo: 'si_no', peso: 2 },
  { id: 'q3', categoria: 'Raccolta Dati & CRM', domanda: 'Hai un sistema per classificare i lead in base alla loro qualità?', tipo: 'si_no', peso: 2 },
  
  // Automazioni base
  { id: 'q4', categoria: 'Automazioni Base', domanda: 'Hai almeno 1 automazione che parte quando qualcuno compila un form sul tuo sito?', tipo: 'si_no', peso: 3 },
  { id: 'q5', categoria: 'Automazioni Base', domanda: 'Hai email automatiche di benvenuto per nuovi clienti?', tipo: 'si_no', peso: 2 },
  { id: 'q6', categoria: 'Automazioni Base', domanda: 'Hai reminder automatici per follow-up con i lead?', tipo: 'si_no', peso: 2 },
  
  // Presenza online
  { id: 'q7', categoria: 'Presenza Online', domanda: 'Il tuo sito web è ottimizzato per mobile?', tipo: 'si_no', peso: 2 },
  { id: 'q8', categoria: 'Presenza Online', domanda: 'Hai un Google Business Profile aggiornato con recensioni?', tipo: 'si_no', peso: 2 },
  { id: 'q9', categoria: 'Presenza Online', domanda: 'Hai almeno 1 landing page dedicata per campagne specifiche?', tipo: 'si_no', peso: 2 },
  
  // KPI & Dashboard
  { id: 'q10', categoria: 'KPI & Dashboard', domanda: 'Monitori almeno 3 KPI digitali (lead, conversioni, traffico)?', tipo: 'si_no', peso: 3 },
  { id: 'q11', categoria: 'KPI & Dashboard', domanda: 'Hai una dashboard dove vedi i numeri principali in tempo reale?', tipo: 'si_no', peso: 2 },
  { id: 'q12', categoria: 'KPI & Dashboard', domanda: 'Sai da dove arrivano i tuoi migliori clienti?', tipo: 'si_no', peso: 2 },
  
  // Uso dell'IA (Marketing)
  { id: 'q13', categoria: 'Uso dell\'IA', domanda: 'Usi l\'AI per generare contenuti (post, email, copy)?', tipo: 'si_no', peso: 2 },
  { id: 'q14', categoria: 'Uso dell\'IA', domanda: 'Hai provato almeno 1 tool AI per analizzare dati aziendali?', tipo: 'si_no', peso: 2 },
  { id: 'q15', categoria: 'Uso dell\'IA', domanda: 'Hai template AI pronti per le attività ripetitive?', tipo: 'si_no', peso: 2 },
  
  // Digitalizzazione Aziendale
  { id: 'q16', categoria: 'Digitalizzazione Aziendale', domanda: 'Hai digitalizzato almeno il 50% dei processi amministrativi (fatturazione, ordini, preventivi)?', tipo: 'si_no', peso: 3 },
  { id: 'q17', categoria: 'Digitalizzazione Aziendale', domanda: 'I tuoi dipendenti possono accedere a documenti e informazioni aziendali da remoto?', tipo: 'si_no', peso: 2 },
  { id: 'q18', categoria: 'Digitalizzazione Aziendale', domanda: 'Hai un sistema di gestione documentale digitale (archiviazione, ricerca, condivisione)?', tipo: 'si_no', peso: 3 },
  { id: 'q19', categoria: 'Digitalizzazione Aziendale', domanda: 'I processi di approvazione (ordini, spese, ferie) sono digitalizzati?', tipo: 'si_no', peso: 2 },
  { id: 'q20', categoria: 'Digitalizzazione Aziendale', domanda: 'Hai integrato i sistemi aziendali (ERP, CRM, contabilità) per evitare doppia digitazione?', tipo: 'si_no', peso: 3 },
  
  // AI nei Processi Operativi
  { id: 'q21', categoria: 'AI nei Processi Operativi', domanda: 'Usi l\'AI per automatizzare analisi di dati operativi (produzione, scorte, qualità)?', tipo: 'si_no', peso: 3 },
  { id: 'q22', categoria: 'AI nei Processi Operativi', domanda: 'Hai implementato AI per ottimizzare processi produttivi o logistici?', tipo: 'si_no', peso: 3 },
  { id: 'q23', categoria: 'AI nei Processi Operativi', domanda: 'Usi l\'AI per prevedere domanda, scorte o manutenzioni?', tipo: 'si_no', peso: 2 },
  { id: 'q24', categoria: 'AI nei Processi Operativi', domanda: 'Hai chatbot o assistenti AI per supporto clienti interno?', tipo: 'si_no', peso: 2 },
  { id: 'q25', categoria: 'AI nei Processi Operativi', domanda: 'Usi l\'AI per analizzare e migliorare processi aziendali (identificare colli di bottiglia, inefficienze)?', tipo: 'si_no', peso: 3 },
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
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

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
    
    let livello = 'Iniziale';
    if (percentage >= 80) livello = 'Eccellente';
    else if (percentage >= 60) livello = 'Avanzato';
    else if (percentage >= 40) livello = 'Intermedio';
    else if (percentage >= 20) livello = 'Base';

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
      percentage,
      raccomandazioni,
    };
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
          raccomandazioni: calculatedResults.raccomandazioni,
          percentage: calculatedResults.percentage,
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
              Test di Maturità Digitale
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Scopri il livello di digitalizzazione della tua azienda in 5 minuti
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

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Inizia il Test
              </button>
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
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 ${
                    answers[question.id] === true
                      ? 'border-l-green-500 bg-green-50/30'
                      : answers[question.id] === false
                      ? 'border-l-red-500 bg-red-50/30'
                      : 'border-l-purple-500'
                  }`}
                >
                  <div className="p-5">
                    {/* Question Number & Category */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                        {currentPage * QUESTIONS_PER_PAGE + index + 1}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">{question.categoria}</span>
                    </div>
                    
                    {/* Question Text */}
                    <h3 className="text-base font-semibold text-gray-800 mb-4 leading-relaxed">
                      {question.domanda}
                    </h3>
                    
                    {/* Answer Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAnswer(question.id, true)}
                        className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] ${
                          answers[question.id] === true
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                            : 'bg-gray-50 hover:bg-green-50 text-gray-700 border border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span className="text-lg">✓</span>
                          <span>Sì</span>
                        </span>
                      </button>
                      <button
                        onClick={() => handleAnswer(question.id, false)}
                        className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] ${
                          answers[question.id] === false
                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                            : 'bg-gray-50 hover:bg-red-50 text-gray-700 border border-gray-200 hover:border-red-300'
                        }`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span className="text-lg">✗</span>
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
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  isFirstPage
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
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                    isSubmitting || !allQuestionsAnswered
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
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                    !allCurrentPageQuestionsAnswered
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
              <h2 className="text-3xl font-bold mb-4 font-heading">Il Tuo Livello di Maturità</h2>
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

            {/* Per Categoria */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 font-heading">Punteggio per Categoria</h3>
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
                          className={`h-2 rounded-full transition-all ${
                            percentage >= 70
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

            {/* Raccomandazioni */}
            {results.raccomandazioni.length > 0 && (
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

            {/* CTA */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4 font-heading">
                Vuoi Migliorare la Tua Maturità Digitale?
              </h3>
              <p className="mb-6">
                Prenota un Check-up Digitale Gratuito e scopri come possiamo aiutarti
              </p>
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_CHECKUP_URL || 'https://calendly.com/enricorizzi/check-up-gratuito-in-azienda'}
                className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all"
              >
                Prenota Check-up Gratuito
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
