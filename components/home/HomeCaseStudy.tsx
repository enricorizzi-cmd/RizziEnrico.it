'use client';

import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import CTA from '@/components/CTA';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HomeCaseStudy() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionTitle
                    title="Case Study: PMI che Hanno Trasformato Organizzazione e Risultati"
                    description="Esempi concreti di PMI venete che hanno ottenuto risultati misurabili con metodo e KPI."
                    centered
                />

                <div
                    ref={ref}
                    className={`text-center mt-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                >
                    <CTA href="/case-study" variant="secondary" size="large" className="shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">
                        Vedi tutti i Case Study →
                    </CTA>

                    <div className="mt-8">
                        <p className="text-sm text-[var(--color-subtext)] mb-4">
                            Vuoi risultati simili per la tua PMI?
                            <Link href="/contatti" className="text-[var(--color-primary)] hover:underline font-semibold ml-1" title="Prenota un check-up gratuito con Enrico Rizzi">
                                Contattami per un check-up gratuito
                            </Link> o <Link href="/servizi" className="text-[var(--color-primary)] hover:underline font-semibold ml-1" title="Scopri i servizi di consulenza PMI">
                                scopri i servizi disponibili
                            </Link>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
