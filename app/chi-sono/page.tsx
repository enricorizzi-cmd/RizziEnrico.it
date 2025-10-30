import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import Testimonial from '@/components/Testimonial';
import CTA from '@/components/CTA';

export const metadata = generateMetadata({
  title: 'Chi sono - Enrico Rizzi | Consulente OSM Venezia-Rovigo',
  description: 'Consulente OSM per PMI che vogliono crescere con metodo: persone, KPI e processi. Area servita: Venezia-Rovigo, Veneto.',
  path: '/chi-sono',
});

export default function ChiSonoPage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl font-bold text-[var(--color-primary)]">ER</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
              Enrico Rizzi
            </h1>
            <p className="text-xl text-[var(--color-subtext)]">
              Consulente OSM per PMI che vogliono crescere con metodo: persone, KPI e processi.
            </p>
            <p className="text-lg text-[var(--color-subtext)] mt-2">
              Area servita: Venezia - Rovigo, Veneto
            </p>
          </div>

          {/* Bio */}
          <section className="mb-16">
            <SectionTitle title="La mia storia" />
            <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed">
              <p className="mb-4">
                Da oltre 10 anni aiuto PMI del Veneto a passare da organizzazione caotica
                a sistema strutturato orientato ai risultati.
              </p>
              <p className="mb-4">
                Ho iniziato la mia carriera in aziende manifatturiere, dove ho visto da vicino
                quanto il caos organizzativo limita la crescita. Ho poi approfondito il metodo OSM,
                che applico con successo in aziende tra 9 e 200 addetti.
              </p>
              <p>
                Il mio approccio è pratico e basato sui numeri: non teoria, ma strumenti concreti
                che portano risultati misurabili. In 90 giorni mettiamo ordine, in 6 mesi vedi i numeri.
              </p>
            </div>
          </section>

          {/* Timeline Risultati */}
          <section className="mb-16">
            <SectionTitle title="Timeline Risultati" />
            <div className="space-y-8">
              {[
                { year: '2024', achievement: '25+ PMI organizzate con metodo strutturato' },
                { year: '2023', achievement: '100+ KPI dashboard attive e funzionanti' },
                { year: '2022', achievement: 'Network OSM consolidato in Veneto' },
                { year: '2020-2021', achievement: 'Specializzazione in passaggi generazionali' },
                { year: '2014', achievement: 'Certificazione OSM e inizio consulenza' },
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-heading font-bold">
                      {item.year}
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-lg text-[var(--color-text)]">{item.achievement}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Valori */}
          <section className="mb-16">
            <SectionTitle title="I miei valori" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Concretezza',
                  description: 'Zero fuffa, solo strumenti pratici che funzionano nella realtà PMI.',
                },
                {
                  title: 'Numeri',
                  description: 'Decisioni basate su dati, non su opinioni o sensazioni.',
                },
                {
                  title: 'Metodo',
                  description: 'Approccio strutturato e replicabile, non improvvisazione.',
                },
                {
                  title: 'Territorio',
                  description: 'Conoscenza profonda del tessuto economico Veneto e delle sue specificità.',
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]"
                >
                  <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-[var(--color-subtext)]">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Certificazioni */}
          <section className="mb-16">
            <SectionTitle title="Certificazioni e formazione" />
            <ul className="space-y-3 text-[var(--color-text)]">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Certificazione OSM - Organizzazione Scientifica del Lavoro</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Formazione continua su KPI e Controllo di Gestione</span>
              </li>
            </ul>
          </section>

          {/* CTA */}
          <section className="bg-[var(--color-primary)] text-white rounded-[var(--radius-card)] p-8 text-center">
            <h2 className="font-heading text-2xl font-bold mb-4">
              Pronto a lavorare insieme?
            </h2>
            <p className="mb-6 opacity-90">
              Prenota una diagnosi gratuita: analizziamo insieme numeri e criticità della tua PMI.
            </p>
            <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
              Prenota diagnosi 30' →
            </CTA>
          </section>
        </div>
      </div>
    </div>
  );
}

