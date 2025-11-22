'use client';

import SectionTitle from '@/components/SectionTitle';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HomeFAQ() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionTitle
                    title="Domande Frequenti"
                    description="Dubbi? Ecco le risposte alle domande più comuni degli imprenditori."
                    centered
                />
                <div
                    ref={ref}
                    className={`max-w-3xl mx-auto space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                >
                    {[
                        {
                            q: "Quanto costa la consulenza?",
                            a: "Dipende dalle tue esigenze. Offro pacchetti a partire da 700€/mese, ma tutto inizia con un check-up gratuito per capire cosa ti serve davvero."
                        },
                        {
                            q: "Lavori solo in presenza?",
                            a: "Lavoro sia in presenza (Venezia, Padova, Rovigo) che da remoto. Molti clienti apprezzano la flessibilità delle sessioni Zoom per i check periodici."
                        },
                        {
                            q: "In quanto tempo vedrò i risultati?",
                            a: "Dipende dall'obiettivo. L'organizzazione migliora in 90 giorni. I numeri (fatturato/margini) solitamente mostrano trend positivi entro 6 mesi di lavoro costante."
                        },
                        {
                            q: "Il metodo OSM funziona per la mia azienda?",
                            a: "Il metodo è universale perché si basa sulle persone, non solo sul settore. Ho lavorato con metalmeccanica, servizi, edilizia, commercio: i principi di gestione sono gli stessi."
                        }
                    ].map((faq, index) => (
                        <div key={index} className="bg-[var(--color-bg-secondary)] rounded-xl p-6 hover:shadow-md transition-all duration-300">
                            <h3 className="font-bold text-lg mb-3 text-[var(--color-text)]">{faq.q}</h3>
                            <p className="text-[var(--color-subtext)] leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
