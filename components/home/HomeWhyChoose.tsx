'use client';

import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HomeWhyChoose() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionTitle
          title="Perché Scegliere un Consulente Aziendale per la Tua Azienda"
          description="Consulente aziendale per PMI venete: quando ha senso e cosa facciamo in pratica"
          centered
        />

        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
        >
          <div className="max-w-3xl mx-auto mt-8 mb-12">
            <h3 className="font-heading text-xl font-semibold text-[var(--color-text)] mb-6 text-center">
              Quattro aree di intervento concrete:
            </h3>
            <ul className="space-y-4 text-[var(--color-text)]">
              <li className="flex items-start gap-4 p-4 rounded-lg hover:bg-[var(--color-bg-secondary)] transition-colors">
                <span className="text-[var(--color-primary)] font-bold mt-1 text-xl">•</span>
                <span><strong>Organizzazione aziendale PMI:</strong> definiamo ruoli, mansionari, processi e riunioni a KPI.</span>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-lg hover:bg-[var(--color-bg-secondary)] transition-colors">
                <span className="text-[var(--color-primary)] font-bold mt-1 text-xl">•</span>
                <span><strong>Controllo di gestione semplice:</strong> cruscotti mensili per prendere decisioni su margini, tempi e carichi di lavoro.</span>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-lg hover:bg-[var(--color-bg-secondary)] transition-colors">
                <span className="text-[var(--color-primary)] font-bold mt-1 text-xl">•</span>
                <span><strong>Passaggio generazionale e continuità:</strong> strutturiamo l'azienda perché funzioni anche senza la presenza costante del titolare.</span>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-lg hover:bg-[var(--color-bg-secondary)] transition-colors">
                <span className="text-[var(--color-primary)] font-bold mt-1 text-xl">•</span>
                <span><strong>Digitalizzazione pratica per PMI:</strong> ti aiuto a scegliere e mettere in funzione strumenti digitali semplici (dashboard, app, automazioni) per rendere i processi più veloci e controllabili, senza tecnicismi.</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: "🎯",
                title: "Esperienza in PMI Locali",
                description: "10+ anni con imprenditori veneti. Conosco normative, mentalità e sfide del territorio."
              },
              {
                icon: "⚡",
                title: "Approccio Pratico",
                description: "Niente teoria fine a sé stessa. Soluzioni concrete, misurabili, orientate ai risultati."
              },
              {
                icon: "🔧",
                title: "Soluzioni Personalizzate",
                description: "Non pacchetti standard. Ogni PMI è diversa: analisi su misura e interventi mirati."
              },
              {
                icon: "🤝",
                title: "Affiancamento Continuo",
                description: "Non ti lascio solo dopo il progetto. Supporto sul lungo termine per garantire risultati."
              }
            ].map((point, index) => (
              <Card key={index} title={point.title} variant="service" href="/chi-sono" className="premium-card-hover h-full">
                <div className="text-4xl mb-4">{point.icon}</div>
                <p className="text-sm leading-relaxed opacity-80">{point.description}</p>
                <p className="text-sm mt-4">
                  <Link href="/chi-sono" className="text-[var(--color-primary)] hover:underline font-semibold" title="Scopri chi è Enrico Rizzi e la sua esperienza con PMI venete">
                    Scopri di più su Enrico Rizzi →
                  </Link>
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-[var(--color-subtext)]">
              Opero come consulente <strong>OSM Partner Venezia-Rovigo</strong>, fondata nel 1998.
              Il metodo OSM è stato sviluppato attraverso un costante lavoro di ricerca e sviluppo
              e grazie al monitoraggio di decine di migliaia di collaboratori all'interno delle aziende italiane.
              Vuoi conoscere meglio il metodo? <Link href="/metodo" className="text-[var(--color-primary)] hover:underline font-semibold" title="Scopri il metodo OSM per organizzare la tua PMI">Scopri il metodo OSM</Link> o <Link href="/servizi" className="text-[var(--color-primary)] hover:underline font-semibold" title="Vedi tutti i servizi di consulenza PMI">vedi tutti i servizi</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
