'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SectionTitle from '@/components/SectionTitle';
import Testimonial from '@/components/Testimonial';
import CTA from '@/components/CTA';
import ClientKPIChart from '@/components/ClientKPIChart';
import Link from 'next/link';

interface CaseStudyClientProps {
    caseItem: {
        title: string;
        sector: string;
        size: string;
        context: string;
        problem: string;
        intervention: string;
        kpiBefore: any;
        kpiAfter: any;
        results: string[];
        testimonial: any;
    };
}

export default function CaseStudyClient({ caseItem }: CaseStudyClientProps) {
    // Hook used here, which is fine because this is a Client Component
    const { ref, isVisible } = useScrollAnimation();

    return (
        <div className="bg-white min-h-screen">
            {/* Header Premium */}
            <div className="bg-[var(--color-bg-secondary)] py-20 border-b border-[var(--color-line)]/50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <Link href="/case-study" className="text-[var(--color-primary)] font-semibold hover:underline mb-6 inline-block">
                            ← Torna ai Case Study
                        </Link>
                        <div className="flex gap-3 mb-6">
                            <span className="px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-sm font-bold uppercase tracking-wide shadow-sm">
                                {caseItem.sector}
                            </span>
                            <span className="px-3 py-1 bg-white text-[var(--color-text)] border border-[var(--color-line)] rounded-full text-sm font-medium">
                                {caseItem.size}
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight">
                            {caseItem.title}
                        </h1>
                        <p className="text-xl text-[var(--color-subtext)] leading-relaxed max-w-3xl">
                            {caseItem.context}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto">

                    {/* Grid Problema/Soluzione */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-red-50/50 rounded-[2rem] p-8 border border-red-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-xl">⚠️</div>
                                <h2 className="font-heading text-2xl font-bold text-red-900">
                                    Il Problema
                                </h2>
                            </div>
                            <p className="text-red-900/80 leading-relaxed whitespace-pre-line text-lg">
                                {caseItem.problem}
                            </p>
                        </div>

                        <div className="bg-blue-50/50 rounded-[2rem] p-8 border border-blue-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">🛠️</div>
                                <h2 className="font-heading text-2xl font-bold text-blue-900">
                                    L'Intervento
                                </h2>
                            </div>
                            <p className="text-blue-900/80 leading-relaxed whitespace-pre-line text-lg">
                                {caseItem.intervention}
                            </p>
                        </div>
                    </div>

                    {/* KPI Prima/Dopo */}
                    <section className="mb-20">
                        <SectionTitle title="I Numeri Parlano" description="Risultati misurabili ottenuti grazie al metodo." centered />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <div className="bg-white p-6 rounded-2xl border border-[var(--color-line)] shadow-sm">
                                <h3 className="font-bold text-red-600 mb-4 text-center uppercase tracking-wide text-sm">Prima dell'intervento</h3>
                                <ClientKPIChart data={caseItem.kpiBefore} />
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-[var(--color-line)] shadow-sm ring-2 ring-green-500/20">
                                <h3 className="font-bold text-green-600 mb-4 text-center uppercase tracking-wide text-sm">Dopo l'intervento</h3>
                                <ClientKPIChart data={caseItem.kpiAfter} />
                            </div>
                        </div>
                    </section>

                    {/* Risultati - Bento Style */}
                    <section className="mb-20">
                        <h2 className="font-heading text-3xl font-bold text-[var(--color-text)] mb-8 text-center">
                            Risultati Concreti
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {caseItem.results.map((result, index) => (
                                <div key={index} className="flex items-center gap-4 bg-[var(--color-bg-secondary)] p-6 rounded-xl border border-[var(--color-line)]/50">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="font-bold text-[var(--color-text)] text-lg">{result}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Testimonianza */}
                    <section className="mb-20">
                        <Testimonial {...caseItem.testimonial} />
                    </section>

                    {/* CTA */}
                    <section
                        ref={ref}
                        className={`bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-[2rem] p-12 text-center shadow-2xl relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                    >
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay"></div>
                            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay"></div>
                        </div>

                        <div className="relative z-10">
                            <h2 className="font-heading text-3xl font-bold mb-4">
                                Vuoi ottenere risultati simili?
                            </h2>
                            <p className="mb-8 opacity-90 text-lg max-w-2xl mx-auto">
                                Ogni azienda è diversa, ma il metodo è universale. Prenota una diagnosi gratuita e scopri come applicarlo alla tua realtà.
                            </p>
                            <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100 border-none shadow-lg hover:shadow-xl hover:-translate-y-1">
                                Prenota diagnosi 30' →
                            </CTA>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
