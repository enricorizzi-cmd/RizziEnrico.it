'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { workshopRegistrationSchema, type WorkshopRegistrationInput } from '@/lib/validators';
import MagneticButton from '@/components/ui/MagneticButton';

export default function WorkshopPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

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

  // Mouse tracking per effetti parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll automatico al riquadro di successo quando appare
  useEffect(() => {
    if (submitSuccess && successRef.current) {
      // Piccolo delay per permettere il rendering
      setTimeout(() => {
        successRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 100);
    }
  }, [submitSuccess]);

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
    } catch (error: any) {
      setSubmitError(error.message || 'Errore durante la registrazione. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{
            top: `${mousePosition.y * 0.5}%`,
            left: `${mousePosition.x * 0.5}%`,
            animationDelay: '0s',
          }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{
            top: `${100 - mousePosition.y * 0.5}%`,
            right: `${100 - mousePosition.x * 0.5}%`,
            animationDelay: '2s',
          }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{
            bottom: `${mousePosition.y * 0.3}%`,
            left: `${50 + mousePosition.x * 0.3}%`,
            animationDelay: '4s',
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 z-10">
        {/* Gradient Overlay with Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-purple-600/10 animate-gradient-shift"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* OSM Logo - Posizionato in alto a destra */}
          <div className="flex justify-end mb-6">
            <Image
              src="/logo-osm-partner.png"
              alt="Open Source Management Partner"
              width={120}
              height={36}
              className="object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
              quality={90}
              sizes="120px"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 animate-fade-in-down">
              <span className="px-6 py-3 bg-white/80 backdrop-blur-sm text-purple-700 rounded-full text-sm font-semibold shadow-lg border border-purple-200/50 hover:scale-105 transition-transform duration-300 inline-flex items-center gap-2">
                <span className="animate-pulse">🎯</span>
                Workshop Esclusivo OSM
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading animate-fade-in-up">
              Più Tempo, Più organizzazione,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-[length:200%_auto] animate-gradient-text">
                meno stress: AI in Azienda
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Metti l'AI a lavorare per te e la tua azienda: un esercito di assistenti digitali che elimina il lavoro ripetitivo, mette ordine in azienda e fa sentire tutta la squadra finalmente più serena.
            </p>
            <ul className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto text-left space-y-3 animate-fade-in-up animation-delay-250">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">✓</span>
                <span>Libera ore di lavoro ogni settimana dalle attività ripetitive</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">✓</span>
                <span>Metti ordine in procedure, mail, riunioni e documenti</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">✓</span>
                <span>Migliora la velocità e la qualità delle comunicazioni</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">✓</span>
                <span>Trasforma l'AI in una valida alleata</span>
              </li>
            </ul>
            <div className="mb-8 animate-fade-in-up animation-delay-300">
              <MagneticButton>
                <a
                  href="#registrazione"
                  className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Riserva il tuo posto →
                </a>
              </MagneticButton>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-400">
              <div className="group text-center sm:text-left bg-white/60 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-purple-200/50 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform">Venerdì 12 dicembre</div>
                <div className="text-gray-600">2025</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-purple-300 to-transparent"></div>
              <div className="group text-center sm:text-left bg-white/60 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-blue-200/50 hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="text-lg font-bold text-blue-600 group-hover:scale-110 transition-transform">16:30 - 19:00</div>
                <div className="text-sm text-gray-600">accoglienza dalle 16:30 - inizio 17:00</div>
                <div className="text-sm text-gray-600 mt-1">OSM Venezia</div>
                <div className="text-xs text-gray-500 mt-1">Via Sertorio Orsato 22, Venezia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {submitSuccess && (
        <div ref={successRef} className="container mx-auto px-4 mb-8 animate-fade-in-down scroll-mt-24">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-200 rounded-full -ml-12 -mb-12 opacity-20"></div>
            <div className="flex items-start relative z-10">
              <div className="text-5xl mr-4 animate-bounce">✅</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-green-800 mb-3 bg-gradient-to-r from-green-700 to-emerald-700 text-transparent bg-clip-text">
                  Registrazione Confermata!
                </h3>
                <p className="text-green-700 mb-4 leading-relaxed">
                  Grazie per esserti iscritto! Ti abbiamo inviato un'email di conferma con tutti i dettagli.
                </p>
                <div className="mt-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-green-200">
                  <p className="text-green-800 font-semibold mb-2">🎯 Prossimo passo:</p>
                  <a
                    href="/test-maturita-digitale"
                    className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold underline hover:gap-3 transition-all duration-300"
                  >
                    Compila il Test di Maturità Digitale
                    <span className="text-xl">→</span>
                  </a>
                  <p className="text-sm text-green-600 mt-2">per capire da dove partire.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="container mx-auto px-4 mb-8 animate-fade-in-down">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-200 rounded-full -ml-12 -mb-12 opacity-20"></div>
            <div className="flex items-start relative z-10">
              <div className="text-5xl mr-4 animate-pulse">❌</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-800 mb-3">Errore</h3>
                <p className="text-red-700 leading-relaxed">{submitError}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Perché questo Workshop */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading scroll-animate">
              <span className="relative inline-block">
                Per imprenditori che non vogliono "studiare AI", ma farla lavorare per loro
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></span>
              </span>
            </h2>

            <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-purple-100/50 mb-8 scroll-animate">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Se sei un imprenditore o un manager di PMI è probabile che la situazione, oggi, sia più o meno così:
              </p>

              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">✗</span>
                  <span>stessi dati scritti 3 volte in sistemi diversi;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">✗</span>
                  <span>informazioni sparse tra mail, WhatsApp, Excel, Drive e gestionali;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">✗</span>
                  <span>clienti che chiedono, sollecitano, richiamano;</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold mt-1">✗</span>
                  <span>collaboratori sempre incasinati, tra mille urgenze e poco ordine.</span>
                </li>
              </ul>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Nel frattempo, tutti parlano di intelligenza artificiale e qualcuno la usa ma non ne vedi ancora i benefici.<br />
                Qualcuno la teme, qualcuno ci gioca. Pochissimi la stanno usando davvero per automatizzare:
              </p>

              <ul className="space-y-3 mb-8 text-gray-700 pl-6">
                <li>• togliere lavoro inutile alle persone,</li>
                <li>• organizzare meglio il lavoro,</li>
                <li>• ridurre lo stress e i picchi di sovraccarico.</li>
              </ul>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border-l-4 border-purple-600">
                <p className="text-lg text-gray-800 font-semibold">
                  Questo workshop serve esattamente a questo: farti vedere, dal vivo, come l'AI può diventare una squadra di assistenti invisibili che lavora per te, per il tuo team e per i tuoi clienti.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <a
                href="#registrazione"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Riserva il tuo posto →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cosa Imparerai */}
      <section className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading scroll-animate">
              <span className="relative inline-block">
                Cosa succede durante il workshop
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></span>
              </span>
            </h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Durante le 2 ore affronteremo in modo pratico 3 fronti:
            </p>
            <div className="space-y-8">
              {/* AI per l'organizzazione interna */}
              <div className="group scroll-animate p-8 bg-white rounded-2xl border-2 border-purple-100 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🧠</span>
                    </div>
                    <h3 className="text-2xl font-bold text-purple-600 mt-2">AI per l'organizzazione interna</h3>
                  </div>
                  <p className="text-gray-700 mb-4">Vedrai come usare l'AI per:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold mt-1">✓</span>
                      <span>riassumere mail e riunioni in piani d'azione chiari,</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold mt-1">✓</span>
                      <span>creare assistenti che spiegano procedure interne,</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold mt-1">✓</span>
                      <span>mettere ordine in documenti, idee, task.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* AI per la relazione con i clienti */}
              <div className="group scroll-animate p-8 bg-white rounded-2xl border-2 border-blue-100 hover:border-blue-300 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-600 mt-2">AI per la relazione con i clienti</h3>
                  </div>
                  <p className="text-gray-700 mb-4">Lavoreremo su casi reali (mail, preventivi, richieste) per:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold mt-1">✓</span>
                      <span>generare bozze di risposta più veloci e più chiare,</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold mt-1">✓</span>
                      <span>migliorare la velocità dei preventivi e dei follow-up,</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold mt-1">✓</span>
                      <span>creare contenuti utili (mini-guide, FAQ, spiegazioni) senza perdere ore.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Il tuo "AI Action Plan" personalizzato */}
              <div className="group scroll-animate p-8 bg-white rounded-2xl border-2 border-indigo-100 hover:border-indigo-300 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="text-2xl font-bold text-indigo-600 mt-2">Il tuo "AI Action Plan" personalizzato</h3>
                  </div>
                  <p className="text-gray-700 mb-4">Uscirai con:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-indigo-600 font-bold mt-1">✓</span>
                      <span>una lista di attività che puoi da subito delegare all'AI,</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-indigo-600 font-bold mt-1">✓</span>
                      <span>le aree interne dove introdurre i primi "assistenti digitali",</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-indigo-600 font-bold mt-1">✓</span>
                      <span>un'idea chiara di dove l'AI può liberare più tempo nella tua azienda.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border-l-4 border-yellow-500 scroll-animate">
              <p className="text-gray-800 text-center font-semibold">
                💡 Durante il workshop useremo l'AI live sui casi proposti dai partecipanti: niente teoria astratta, ma applicazioni reali su problemi reali.
              </p>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
              <a
                href="#registrazione"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Riserva il tuo posto →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Per Chi È / Per Chi Non È */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group scroll-animate bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-green-100 hover:border-green-300 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 text-green-700 font-heading flex items-center gap-3">
                    <span className="text-3xl group-hover:scale-125 transition-transform duration-300">✅</span>
                    Per chi è pensato
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Il workshop è pensato per:
                  </p>
                  <p className="text-lg font-semibold text-gray-800 mb-4">
                    Imprenditori e manager di PMI che vogliono più tempo e più organizzazione
                  </p>
                  <p className="text-gray-700 mb-4">
                    Non servono competenze tecniche o informatiche particolari.
                  </p>
                  <p className="text-gray-700 mb-2">
                    Serve solo la voglia di:
                  </p>
                  <ul className="space-y-2 text-gray-700 pl-4">
                    <li>• capire dove l'AI può dare una mano,</li>
                    <li>• iniziare a usarla davvero, non solo sentirne parlare.</li>
                  </ul>
                </div>
              </div>
              <div className="group scroll-animate bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-red-100 hover:border-red-300 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 text-red-700 font-heading flex items-center gap-3">
                    <span className="text-3xl group-hover:scale-125 transition-transform duration-300">❌</span>
                    Per Chi Non È
                  </h3>
                  <ul className="space-y-4 text-gray-700">
                    {[
                      'Chi cerca solo teoria senza pratica',
                      'Chi vuole il software magico',
                      'Chi cerca un incontro tecnico informatico (parleremo di opportunità e strategie)',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start group/item">
                        <span className="text-red-500 mr-3 text-xl group-hover/item:scale-125 transition-transform duration-300">•</span>
                        <span className="group-hover/item:text-red-700 transition-colors duration-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chi Siamo */}
      <section className="py-20 bg-gradient-to-b from-white via-purple-50/30 to-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center scroll-animate">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-heading">
              <span className="relative inline-block">
                Da Imprenditori per Imprenditori
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></span>
              </span>
            </h2>
            <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-purple-100/50 mb-8 hover:shadow-2xl transition-all duration-500">
              <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
                Questo workshop è condotto da <strong className="text-purple-600">Enrico Rizzi</strong> e <strong className="text-blue-600">Francesco Fusano</strong>,
                esperti OSM che hanno trasformato decine di PMI venete.
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Non siamo tecnici informatici: siamo imprenditori che hanno capito come usare la digitalizzazione per far crescere le aziende.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full font-semibold shadow-lg border-2 border-purple-200/50 hover:scale-105 hover:shadow-xl transition-all duration-300">
              <Image
                src="/logo-osm-partner.png"
                alt="OSM Partner Venezia"
                width={40}
                height={12}
                className="object-contain opacity-80 hover:opacity-100 transition-opacity animate-pulse"
                loading="lazy"
                decoding="async"
              />
              <span>OSM Partner Venezia</span>
            </div>
          </div>
        </div>
      </section>

      {/* E dopo il workshop? */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading scroll-animate">
              <span className="relative inline-block">
                E dopo il workshop?
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></span>
              </span>
            </h2>

            <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-purple-100/50 mb-8 scroll-animate">
              <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
                Questo workshop è il punto di partenza.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔍</span>
                  Digital Checkup
                </h3>
                <p className="text-gray-800 text-lg">
                  Per chi vorrà fare un passo in più, a fine evento avrai la possibilità di fissare: <strong>1 giornata in azienda</strong> per mappare in profondità processi, lacune e opportunità di digitalizzazione, con un piano chiaro di intervento.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <a
                href="#registrazione"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Riserva il tuo posto →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Form Registrazione */}
      <section id="registrazione" className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 relative overflow-hidden z-10">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-500 scroll-animate">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                  Riserva il Tuo Posto
                </h2>
                <p className="text-gray-600 text-lg">
                  Iscriviti gratuitamente. <span className="font-semibold text-purple-600">Posti limitati.</span>
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome *
                    </label>
                    <input
                      {...register('nome')}
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 bg-white/50 backdrop-blur-sm"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 bg-white/50 backdrop-blur-sm"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 bg-white/50 backdrop-blur-sm"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 bg-white/50 backdrop-blur-sm"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 bg-white/50 backdrop-blur-sm"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 bg-white/50 backdrop-blur-sm"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 bg-white/50 backdrop-blur-sm"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 bg-white/50 backdrop-blur-sm"
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
                    Qual è oggi il principale problema che senti sulla digitalizzazione nella tua azienda? *
                  </label>
                  <textarea
                    {...register('problema')}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 bg-white/50 backdrop-blur-sm resize-none"
                    placeholder="Descrivi brevemente..."
                  />
                  {errors.problema && (
                    <p className="text-red-500 text-sm mt-1">{errors.problema.message}</p>
                  )}
                </div>

                <input type="hidden" {...register('evento')} />

                <MagneticButton className="w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-[length:200%_auto] text-white font-bold py-5 px-8 rounded-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg overflow-hidden hover:scale-[1.02] animate-gradient-shift"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Registrazione in corso...
                        </>
                      ) : (
                        <>
                          <span className="text-2xl group-hover:scale-125 transition-transform duration-300">🎯</span>
                          Iscriviti Gratis
                          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </MagneticButton>

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



