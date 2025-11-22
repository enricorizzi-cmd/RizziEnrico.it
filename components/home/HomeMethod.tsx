'use client';

import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import CTA from '@/components/CTA';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HomeMethod() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className="py-20 bg-[var(--color-bg-secondary)] overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionTitle
                    title="Come Organizzare Meglio la Tua Azienda: 5 Step Pratici"
                    description="Un percorso strutturato che ti aiuta a mettere ordine: ruoli chiari, numeri che guidano le decisioni, processi efficaci, persone motivate, crescita sostenibile."
                    centered
                />

                <div
                    ref={ref}
                    className={`bento-grid transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                >
                    {[
                        {
                            title: '1. Chi - Ruoli e Responsabilità Chiare',
                            description: 'Il fondamento di ogni organizzazione. Definiamo chi fa cosa, eliminando le zone grigie e le sovrapposizioni. Creiamo mansionari vivi che guidano il lavoro quotidiano.',
                            span: 'bento-span-2 bento-row-2',
                            icon: '👥'
                        },
                        {
                            title: '2. Numeri - KPI',
                            description: 'Cruscotto di controllo semplice per guidare le scelte.',
                            span: '',
                            icon: '📊'
                        },
                        {
                            title: '3. Processi',
                            description: 'Policy semplici, riunioni efficaci, flussi stabili.',
                            span: '',
                            icon: '⚙️'
                        },
                        {
                            title: '4. Persone',
                            description: 'Leadership, formazione, incentivi corretti.',
                            span: '',
                            icon: '🎓'
                        },
                        {
                            title: '5. Espansione',
                            description: 'Vendite, marketing, partnership sul territorio.',
                            span: '',
                            icon: '🚀'
                        },
                    ].map((step, index) => (
                        <Card
                            key={index}
                            title={step.title}
                            variant="service"
                            href="/metodo"
                            className={`${step.span} premium-card-hover h-full`}
                        >
                            <div className="text-4xl mb-4">{step.icon}</div>
                            <p className="text-sm leading-relaxed opacity-80">{step.description}</p>
                            <p className="text-sm mt-4">
                                <Link href="/metodo" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold inline-flex items-center gap-1">
                                    Approfondisci <span>→</span>
                                </Link>
                            </p>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <CTA href="/metodo" variant="secondary" size="large" className="mr-4 mb-4">
                        Scopri il metodo completo →
                    </CTA>
                    <CTA href="/contatti" variant="primary" size="large">
                        Applica il Metodo - Check-up Gratuito →
                    </CTA>
                </div>

                <div className="text-center mt-8">
                    <p className="text-sm text-[var(--color-subtext)]">
                        Vuoi vedere esempi concreti? <Link href="/case-study" className="text-[var(--color-primary)] hover:underline font-semibold">Vedi i case study</Link> o <Link href="/servizi" className="text-[var(--color-primary)] hover:underline font-semibold">scopri i servizi</Link>.
                    </p>
                </div>
            </div>
        </section>
    );
}
