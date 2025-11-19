'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { workshopRegistrationSchema, type WorkshopRegistrationInput } from '@/lib/validators';

export default function WorkshopPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorkshopRegistrationInput>({
    resolver: zodResolver(workshopRegistrationSchema),
    defaultValues: {
      evento: 'Workshop 12.12.2024',
      fonte: 'Altro',
    },
  });

  const onSubmit = async (data: WorkshopRegistrationInput) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/workshop/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Errore durante la registrazione');
      }

      setSubmitSuccess(true);
      reset();
      
      // Scroll to success message
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } catch (error: any) {
      setSubmitError(error.message || 'Errore durante la registrazione. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                🎯 Workshop Esclusivo OSM
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
              Automatizza la tua Azienda:
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                AI & Digitalizzazione
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Da imprenditori per imprenditori. Scopri come trasformare il caos digitale in processi automatici che funzionano davvero.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-purple-600">12 Dicembre</div>
                <div className="text-gray-600">2024</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-blue-600">18:00</div>
                <div className="text-gray-600">OSM Partner Venezia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {submitSuccess && (
        <div className="container mx-auto px-4 mb-8">
          <div className="max-w-2xl mx-auto bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <div className="flex items-start">
              <div className="text-3xl mr-4">✅</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-green-800 mb-2">Registrazione Confermata!</h3>
                <p className="text-green-700">
                  Grazie per esserti iscritto! Ti abbiamo inviato un'email di conferma con tutti i dettagli.
                  <br />
                  <strong>Prossimo passo:</strong> Compila il{' '}
                  <a href="/test-maturita-digitale" className="underline font-semibold">
                    Test di Maturità Digitale
                  </a>{' '}
                  per capire da dove partire.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="container mx-auto px-4 mb-8">
          <div className="max-w-2xl mx-auto bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <div className="flex items-start">
              <div className="text-3xl mr-4">❌</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-800 mb-2">Errore</h3>
                <p className="text-red-700">{submitError}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cosa Imparerai */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading">
              Cosa Imparerai
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: '🎯',
                  title: 'Sistema Concreto',
                  desc: 'Vedrai un sistema reale (landing + CRM + automazioni + AI) che raccoglie, ordina e segue i lead.',
                },
                {
                  icon: '🤖',
                  title: 'Automazioni Efficaci',
                  desc: 'Scoprirai come automatizzare email, reminder e follow-up senza bisogno di IT interno.',
                },
                {
                  icon: '📊',
                  title: 'Dashboard Live',
                  desc: 'Imparerai a vedere i numeri in tempo reale: lead, fonti, conversioni, presenze.',
                },
                {
                  icon: '✨',
                  title: 'AI Copy Sprint',
                  desc: 'Demo live: generiamo titoli, post, email e script in pochi minuti con l\'AI.',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Per Chi È / Per Chi Non È */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-2xl font-bold mb-4 text-green-700 font-heading">
                  ✅ Per Chi È
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    PMI tra 1 e 20 milioni di fatturato
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Imprenditori che vogliono mettere ordine nella digitalizzazione
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Chi cerca soluzioni concrete, non teoria
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Chi vuole vedere risultati step by step
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-2xl font-bold mb-4 text-red-700 font-heading">
                  ❌ Per Chi Non È
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Grandi aziende con IT interno dedicato
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Chi cerca solo teoria senza pratica
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Chi non è pronto a investire nella digitalizzazione
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Consulenti informatici (è fatto per imprenditori)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chi Siamo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-heading">
              Da Imprenditori per Imprenditori
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Questo workshop è condotto da <strong>Enrico Rizzi</strong> e <strong>Francesco Fusano</strong>, 
              esperti OSM che hanno trasformato decine di PMI venete. Non siamo tecnici informatici: 
              siamo imprenditori che hanno capito come usare la digitalizzazione per far crescere le aziende.
            </p>
            <div className="inline-block px-6 py-3 bg-purple-100 text-purple-700 rounded-full font-semibold">
              🏆 OSM Partner Venezia
            </div>
          </div>
        </div>
      </section>

      {/* Form Registrazione */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 font-heading">
                Blocca il Tuo Posto
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Iscriviti gratuitamente. Posti limitati.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome *
                    </label>
                    <input
                      {...register('nome')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Mario"
                    />
                    {errors.nome && (
                      <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cognome *
                    </label>
                    <input
                      {...register('cognome')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Rossi"
                    />
                    {errors.cognome && (
                      <p className="text-red-500 text-sm mt-1">{errors.cognome.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="mario.rossi@azienda.it"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefono *
                  </label>
                  <input
                    {...register('telefono')}
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="347 123 4567"
                  />
                  {errors.telefono && (
                    <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Azienda *
                  </label>
                  <input
                    {...register('azienda')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Nome della tua azienda"
                  />
                  {errors.azienda && (
                    <p className="text-red-500 text-sm mt-1">{errors.azienda.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ruolo *
                  </label>
                  <input
                    {...register('ruolo')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Titolare, Direttore, Responsabile..."
                  />
                  {errors.ruolo && (
                    <p className="text-red-500 text-sm mt-1">{errors.ruolo.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Provincia *
                  </label>
                  <input
                    {...register('provincia')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Venezia, Padova, Rovigo..."
                  />
                  {errors.provincia && (
                    <p className="text-red-500 text-sm mt-1">{errors.provincia.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Come hai saputo del workshop? *
                  </label>
                  <select
                    {...register('fonte')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="BNI">BNI</option>
                    <option value="OSM">OSM</option>
                    <option value="Social">Social Media</option>
                    <option value="Passaparola">Passaparola</option>
                    <option value="Altro">Altro</option>
                  </select>
                  {errors.fonte && (
                    <p className="text-red-500 text-sm mt-1">{errors.fonte.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Qual è oggi il principale problema che senti sulla digitalizzazione/marketing nella tua azienda?
                  </label>
                  <textarea
                    {...register('problema')}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Descrivi brevemente..."
                  />
                </div>

                <input type="hidden" {...register('evento')} />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? 'Registrazione in corso...' : '🎯 Iscriviti Gratis'}
                </button>

                <p className="text-center text-sm text-gray-500">
                  Cliccando su "Iscriviti Gratis" accetti di ricevere comunicazioni relative al workshop.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

