'use client';

import Image from 'next/image';
import Link from 'next/link';
import CTA from '@/components/CTA';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HomeBio() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <div
                    ref={ref}
                    className={`flex flex-col lg:flex-row items-center gap-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                >
                    <div className="lg:w-1/2">
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[var(--color-primary)]/10 rounded-full z-0"></div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[var(--color-warning)]/10 rounded-full z-0"></div>
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                                <Image
                                    src="/enrico-rizzi.jpg"
                                    alt="Enrico Rizzi Consulente Aziendale"
                                    width={600}
                                    height={600}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-[var(--color-text)]">
                            Chi è Enrico Rizzi
                        </h2>
                        <p className="text-lg text-[var(--color-subtext)] mb-6 leading-relaxed">
                            Da oltre 10 anni affianco gli imprenditori veneti nella crescita delle loro aziende.
                            Non sono un teorico: vengo dal mondo delle PMI e conosco le sfide quotidiane che affronti.
                        </p>
                        <p className="text-lg text-[var(--color-subtext)] mb-8 leading-relaxed">
                            Come partner OSM (Open Source Management), porto in azienda un metodo collaudato su migliaia di casi di successo,
                            adattandolo alla tua realtà specifica. Il mio obiettivo è renderti autonomo, non dipendente dalla mia consulenza.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <CTA href="/chi-sono" variant="primary" size="large" className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                                Leggi la mia storia →
                            </CTA>
                            <CTA href="/contatti" variant="secondary" size="large">
                                Parliamone a voce →
                            </CTA>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
