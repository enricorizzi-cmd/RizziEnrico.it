import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import CTA from '@/components/CTA';

export default function HomeMethod() {
    return (
        <section className="py-16 bg-[var(--color-card)]">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionTitle
                    title="Come Organizzare Meglio la Tua Azienda: 5 Step Pratici"
                    description="Un percorso strutturato che ti aiuta a mettere ordine: ruoli chiari, numeri che guidano le decisioni, processi efficaci, persone motivate, crescita sostenibile."
                    centered
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {[
                        {
                            title: '1. Chi - Ruoli e Responsabilità Chiare',
                            description: 'Ruoli chiari, mansionari, responsabilità definite.',
                        },
                        {
                            title: '2. Numeri - KPI e Controllo di Gestione',
                            description: 'KPI (Indicatori Chiave di Prestazione) pratici e cruscotto che guidano le scelte.',
                        },
                        {
                            title: '3. Processi - Flussi Efficaci',
                            description: 'Policy semplici, riunioni efficaci, flussi stabili.',
                        },
                        {
                            title: '4. Persone - Leadership e Formazione',
                            description: 'Leadership, formazione, incentivi corretti.',
                        },
                        {
                            title: '5. Espansione - Vendite e Marketing',
                            description: 'Vendite, marketing, partnership sul territorio.',
                        },
                    ].map((step, index) => (
                        <Card
                            key={index}
                            title={step.title}
                            variant="service"
                            href="/metodo"
                        >
                            <p className="text-sm">{step.description}</p>
                            <p className="text-sm mt-3">
                                <Link href="/metodo" className="text-[var(--color-primary)] hover:underline font-semibold">
                                    Approfondisci il metodo →
                                </Link>
                            </p>
                        </Card>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <CTA href="/metodo" variant="secondary" size="large">
                        Scopri il metodo completo →
                    </CTA>
                </div>
                <div className="text-center mt-8">
                    <CTA href="/contatti" variant="primary" size="large">
                        Applica il Metodo alla Tua PMI - Check-up Gratuito →
                    </CTA>
                </div>
                <div className="text-center mt-6">
                    <p className="text-sm text-[var(--color-subtext)]">
                        Vuoi vedere esempi concreti? <Link href="/case-study" className="text-[var(--color-primary)] hover:underline font-semibold" title="Case study di PMI che hanno ottenuto risultati">Vedi i case study</Link> o <Link href="/servizi" className="text-[var(--color-primary)] hover:underline font-semibold" title="Scopri i servizi di consulenza">scopri i servizi</Link>.
                    </p>
                </div>
            </div>
        </section>
    );
}
