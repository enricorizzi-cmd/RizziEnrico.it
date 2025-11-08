import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import KPITool from '@/components/KPITool';
import KPIAnalysisAI from '@/components/KPIAnalysisAI';
import MansionariGeneratorAI from '@/components/MansionariGeneratorAI';
import IPTeaser from '@/components/IPTeaser';
import CTA from '@/components/CTA';
import DownloadForm from '@/components/DownloadForm';

export const metadata = generateMetadata({
  title: 'Risorse Gratuite - KPI Pack e Tool per PMI | Enrico Rizzi',
  description: 'Scarica Kit KPI gratuito (template Excel), usa calcolatori online e risorse i-Profile. Tool pratici per organizzare la tua PMI. Venezia-Padova-Rovigo.',
  path: '/risorse',
});

export default function RisorsePage() {
  return (
    <div className="py-16 bg-[var(--color-card)] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
            Risorse Gratuite per PMI: KPI Pack e Tool Pratici
          </h1>
          <p className="text-xl text-[var(--color-subtext)] max-w-3xl mx-auto">
            Tool pratici e template per iniziare subito a misurare e organizzare la tua PMI.
          </p>
        </div>

        {/* KPI Pack Download */}
        <section className="mb-16">
          <div className="bg-white rounded-[var(--radius-card)] p-8 md:p-12 border border-[var(--color-line)] max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">📊</div>
              <h2 className="font-heading text-3xl font-bold text-[var(--color-text)] mb-4">
                Kit KPI (Indicatori Chiave di Prestazione) Gratuito
              </h2>
              <p className="text-lg text-[var(--color-subtext)] mb-2">
                Template Excel/Sheets con 12 KPI chiave preconfigurati
              </p>
              <p className="text-sm text-[var(--color-subtext)]">
                Ricevi via email e parti subito a misurare la tua PMI
              </p>
            </div>
            <DownloadForm resourceSlug="kpi-pack" />
          </div>
        </section>

        {/* Mini-Tool KPI */}
        <section className="mb-16">
          <SectionTitle
            title="Calcolatori KPI"
            description="Tool pratici per calcoli essenziali nella gestione della PMI"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <KPITool toolType="waste-cost" />
            <KPITool toolType="breakeven" />
            <KPITool toolType="pricing" />
            <KPITool toolType="inventory-turnover" />
            <KPITool toolType="working-capital-cycle" />
            <KPITool toolType="margin" />
            <KPITool toolType="inventory-days" />
            <KPITool toolType="turnover" />
          </div>
        </section>

        {/* i-Profile Teaser */}
        <section className="mb-16">
          <div className="bg-white rounded-[var(--radius-card)] p-8 md:p-12 border border-[var(--color-line)] max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="font-heading text-3xl font-bold text-[var(--color-text)] mb-4">
                Mini-Check Attitudinale i-Profile
              </h2>
              <p className="text-lg text-[var(--color-subtext)] mb-2">
                Prova un teaser di 5 domande per scoprire il tuo profilo attitudinale preliminare
              </p>
              <p className="text-sm text-[var(--color-subtext)]">
                Non è l'i-Profile ufficiale OSM, ma ti dà un'anteprima gratuita
              </p>
            </div>
            <IPTeaser />
          </div>
        </section>

        {/* Risorse i-Profile */}
        <section className="mb-16">
          <SectionTitle
            title="Risorse i-Profile"
            description="Guide e template per iniziare subito"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="font-heading font-bold text-lg text-[var(--color-text)] mb-2">
                Anteprima i-Profile: Guida alla lettura del report
              </h3>
              <p className="text-sm text-[var(--color-subtext)] mb-4">
                PDF con esempio report e guida all'interpretazione dei risultati.
              </p>
              <DownloadForm resourceSlug="iprofile-guida" />
            </div>
            <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-heading font-bold text-lg text-[var(--color-text)] mb-2">
                Check-list Colloquio con i-Profile
              </h3>
              <p className="text-sm text-[var(--color-subtext)] mb-4">
                Template per condurre colloqui mirati basati su evidenze attitudinali.
              </p>
              <DownloadForm resourceSlug="iprofile-checklist" />
            </div>
          </div>
        </section>

        {/* AI Tools */}
        <section className="mb-16">
          <SectionTitle
            title="Tool Intelligenza Artificiale Avanzati"
            description="Analisi automatica e generazione con Intelligenza Artificiale (AI)"
            centered
          />
          <p className="text-center text-sm text-[var(--color-subtext)] mb-6 max-w-2xl mx-auto">
            Le analisi sono indicative e non sostituiscono la consulenza.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <KPIAnalysisAI />
            <MansionariGeneratorAI />
          </div>
        </section>

        {/* Video How-To */}
        <section>
          <SectionTitle
            title="Video Guide"
            description="Come usare i KPI nella tua PMI: video tutorial pratici"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Come impostare i KPI base',
                description: 'Video 5 minuti: 5 KPI essenziali per iniziare',
                duration: '5 min',
              },
              {
                title: 'Come leggere una dashboard',
                description: 'Interpretare i numeri e prendere decisioni',
                duration: '8 min',
              },
              {
                title: 'Riunioni efficaci con KPI',
                description: 'Strutturare riunioni mensili basate sui numeri',
                duration: '6 min',
              },
            ].map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]"
              >
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">▶️</div>
                    <div className="text-sm text-gray-600">{video.duration}</div>
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-[var(--color-text)] mb-2">
                  {video.title}
                </h3>
                <p className="text-sm text-[var(--color-subtext)]">
                  {video.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

