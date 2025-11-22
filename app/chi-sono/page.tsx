'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SectionTitle from '@/components/SectionTitle';
import ProfilePhoto from '@/components/ProfilePhoto';
import OSMBadge from '@/components/OSMBadge';
import CTA from '@/components/CTA';
import Hero from '@/components/Hero';
import Link from 'next/link';

export default function ChiSonoPage() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
      <Hero
        h1="Enrico Rizzi"
        subtitle="Consulente aziendale senior che aiuta le PMI venete a mettere ordine e crescere con metodo. Padova, Venezia, Rovigo."
        badge="Chi Sono"
        primaryCTA={{
          text: 'Contattami Ora',
          href: '/contatti',
        }}
        image="/enrico-rizzi.jpg"
      />

      <div className="py-16 bg-white min-h-screen overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {/* Frase chiave AI */}
            <div
              ref={ref}
              className={`max-w-4xl mx-auto mb-16 glass-panel p-8 rounded-[2rem] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            >
              <p className="text-xl text-[var(--color-text)] leading-relaxed text-center font-medium">
                Sono <strong className="text-[var(--color-primary)]">Enrico Rizzi</strong>, consulente aziendale senior OSM per PMI venete.
                Da oltre 10 anni lavoro a fianco degli imprenditori: prima dentro l'azienda di famiglia, oggi come consulente.
                Ti aiuto a mettere ordine in organizzazione, ruoli, KPI e processi per garantire continuità generazionale e crescita.
              </p>
            </div>

            {/* Bio */}
            <section className="mb-20 reveal-on-scroll is-visible">
              <SectionTitle title="La mia storia" centered />
              <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed">
                <p className="mb-6">
                  Da oltre 10 anni lavoro a fianco degli imprenditori veneti: prima dentro l'azienda di famiglia, oggi come consulente aziendale senior OSM.
                </p>
                <p className="mb-6">
                  Ho iniziato nel <strong>2011 in Dimensione Agricoltura Srl</strong> come magazziniere. Nel tempo sono diventato tecnico commerciale con responsabilità informatiche e fiscali, sviluppando una nuova divisione dedicata ai quaderni di campagna e ai progetti di transizione al biologico e all'agricoltura sostenibile.
                </p>
                <p className="mb-6">
                  Nel <strong>2018 mi sono iscritto a Economia e Commercio</strong> e mi sono laureato nel <strong>2021</strong>, mentre continuavo a lavorare in azienda. Nello stesso anno ho conosciuto OSM come cliente: per tre anni, dal 2021 al 2023, ho applicato la metodologia dall'interno dell'azienda di famiglia, lavorando su organizzazione, persone, passaggio generazionale e numeri.
                </p>
                <p className="mb-6">
                  Sempre nel <strong>2021 ho frequentato la Scuola per Consulenti OSM</strong>, un percorso formativo di un anno, conseguendo con merito l'attestato finale. Questo mi ha dato strumenti pratici per trasformare l'esperienza "sul campo" in un vero mestiere di consulente.
                </p>
                <p className="mb-6">
                  Dal <strong>2024 ho scelto di dedicarmi completamente a questo</strong>: oggi sono Consulente Aziendale Senior presso OSM Partner Venezia–Rovigo e lavoro ogni giorno con imprenditori di PMI che vogliono mettere ordine, creare continuità e far crescere l'azienda.
                </p>
                <p>
                  Conosco bene le sfide delle aziende familiari venete perché le ho vissute prima dall'interno e ora dall'esterno. Non sono un teorico: parlo la lingua degli imprenditori e porto soluzioni concrete che funzionano nella realtà quotidiana di chi ha dipendenti, clienti, fornitori e conti da far tornare.
                </p>
              </div>
            </section>

            {/* Timeline */}
            <section className="mb-20">
              <SectionTitle title="Timeline" centered />
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--color-line)] before:to-transparent">
                {[
                  { year: '2011', achievement: 'Inizio in Dimensione Agricoltura Srl come magazziniere.' },
                  { year: '2011–2017', achievement: 'Crescita a tecnico commerciale con responsabilità informatiche e fiscali.' },
                  { year: '2018–2021', achievement: 'Laurea in Economia e Commercio, lavorando in azienda.' },
                  { year: '2021', achievement: 'Scuola per Consulenti OSM (1 anno) completata con merito.' },
                  { year: '2021–2023', achievement: 'Applicazione metodo OSM in azienda di famiglia.' },
                  { year: 'Dal 2024', achievement: 'Consulente Aziendale Senior OSM Partner Venezia–Rovigo.' },
                ].map((item, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[var(--color-bg-secondary)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <div className="w-3 h-3 bg-[var(--color-primary)] rounded-full"></div>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-[var(--radius-card)] border border-[var(--color-line)] shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-[var(--color-text)]">{item.year}</div>
                      </div>
                      <div className="text-[var(--color-subtext)]">{item.achievement}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Valori - Bento Grid */}
            <section className="mb-20">
              <SectionTitle title="I miei valori" centered />
              <div className="bento-grid">
                {[
                  {
                    title: 'Concretezza',
                    description: 'Zero fuffa. Solo strumenti pratici, procedure chiare e azioni che puoi applicare subito.',
                    icon: '🔨',
                    span: 'bento-span-2'
                  },
                  {
                    title: 'Numeri',
                    description: 'Le decisioni importanti non si prendono "a sensazione": si prendono sui numeri.',
                    icon: '📊',
                    span: ''
                  },
                  {
                    title: 'Metodo',
                    description: 'Le aziende che crescono hanno metodo, routine, riunioni, responsabilità chiare.',
                    icon: '📝',
                    span: ''
                  },
                  {
                    title: 'Territorio',
                    description: 'Conosco il tessuto economico locale, i suoi punti di forza e le sue difficoltà.',
                    icon: '📍',
                    span: 'bento-span-2'
                  },
                ].map((value, index) => (
                  <div
                    key={index}
                    className={`bg-[var(--color-card)] rounded-[var(--radius-card)] p-8 border border-[var(--color-line)] premium-card-hover ${value.span}`}
                  >
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-2">
                      {value.title}
                    </h3>
                    <p className="text-[var(--color-subtext)] leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Finale */}
            <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-[2rem] p-12 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay"></div>
              </div>

              <div className="relative z-10">
                <h2 className="font-heading text-3xl font-bold mb-6">
                  Pronto a lavorare insieme?
                </h2>
                <p className="mb-8 opacity-90 text-lg max-w-2xl mx-auto">
                  Prenota una diagnosi gratuita: analizziamo numeri, organizzazione e persone della tua PMI e capiamo da dove iniziare.
                </p>
                <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100 border-none shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Prenota una diagnosi di 30' →
                </CTA>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
