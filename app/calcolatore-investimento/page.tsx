import { generateMetadata } from '@/lib/seo';
import Hero from '@/components/Hero';
import InvestmentCalculator from '@/components/InvestmentCalculator';
import InvestorQuestionnaire from '@/components/InvestorQuestionnaire';
import CTA from '@/components/CTA';
import SectionTitle from '@/components/SectionTitle';

export const metadata = generateMetadata({
  title: 'Calcolatore di Investimento - Simulatore Interesse Semplice e Composto | Enrico Rizzi',
  description: 'Calcola il tuo patrimonio futuro con interesse semplice e composto. Analisi AI personalizzata per raggiungere l\'indipendenza finanziaria e diversificazione investimenti.',
  path: '/calcolatore-investimento',
});

export default function CalcolatoreInvestimentoPage() {
  return (
    <>
      <Hero
        h1="Calcolatore di Investimento"
        subtitle="Simula il tuo patrimonio futuro con interesse semplice e composto. Ottieni un'analisi AI personalizzata per raggiungere l'indipendenza finanziaria."
        primaryCTA={{
          text: 'Inizia il Calcolo',
          href: '#calcolatore',
        }}
        secondaryCTA={{
          text: 'Scopri i Servizi',
          href: '/servizi',
        }}
      />

      {/* Calcolatore */}
      <section id="calcolatore" className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <InvestmentCalculator />
        </div>
      </section>

      {/* Check-up Dedicato */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Prenota un Check-up Dedicato"
            description="Analisi approfondita della tua situazione finanziaria e strategia personalizzata per raggiungere i tuoi obiettivi"
            centered
          />
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-[var(--radius-card)] p-8 border border-[var(--color-line)] text-center">
              <div className="text-5xl mb-6">💼</div>
              <h3 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-4">
                Check-up Finanziario Personalizzato
              </h3>
              <p className="text-lg text-[var(--color-subtext)] mb-6">
                Durante il check-up analizziamo insieme:
              </p>
              <ul className="text-left max-w-2xl mx-auto space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] mt-1">✓</span>
                  <span className="text-[var(--color-text)]">Situazione attuale dei tuoi investimenti</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] mt-1">✓</span>
                  <span className="text-[var(--color-text)]">Strategia di diversificazione ottimale</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] mt-1">✓</span>
                  <span className="text-[var(--color-text)]">Percorso verso 1,5 milioni di patrimonio</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] mt-1">✓</span>
                  <span className="text-[var(--color-text)]">Piano per rendita passiva e libertà finanziaria</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-primary)] mt-1">✓</span>
                  <span className="text-[var(--color-text)]">Allocazione tra immobiliare, oro, finanziario, crypto, aziende</span>
                </li>
              </ul>
              <CTA href="/contatti" variant="primary" size="large" className="w-full md:w-auto">
                Prenota il tuo Check-up →
              </CTA>
            </div>
          </div>
        </div>
      </section>

      {/* Questionario Livello Investitore */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Misura il tuo Livello di Investitore"
            description="Scopri il tuo profilo come investitore e gestore finanziario con questo breve questionario"
            centered
          />
          <div className="max-w-3xl mx-auto">
            <InvestorQuestionnaire />
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-16 bg-[var(--color-primary)] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Pronto a costruire il tuo futuro finanziario?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Prenota un check-up dedicato e ottieni una strategia personalizzata per raggiungere l'indipendenza finanziaria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
              Prenota Check-up →
            </CTA>
            <CTA href="/contatti" variant="secondary" size="large" className="bg-white/10 text-white border-2 border-white hover:bg-white/20">
              Parla con me 30' →
            </CTA>
          </div>
        </div>
      </section>
    </>
  );
}
