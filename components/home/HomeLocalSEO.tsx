'use client';

import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HomeLocalSEO() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className="py-16 bg-[var(--color-bg-secondary)] border-t border-[var(--color-line)] overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionTitle
                    title="Consulenza Aziendale Vicino a Te"
                    description="Opero direttamente nelle province di Venezia, Padova e Rovigo per garantire presenza e supporto costante."
                    centered
                />
                <div
                    ref={ref}
                    className={`grid grid-cols-1 md:grid-cols-3 gap-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                >
                    <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                        <h3 className="font-heading text-xl font-bold mb-4 text-[var(--color-primary)]">Venezia</h3>
                        <p className="text-[var(--color-subtext)] mb-4">
                            Consulenza per PMI a Mestre, Mirano, Chioggia, San Donà di Piave.
                        </p>
                        <Link href="/consulenza-pmi-venezia" className="text-[var(--color-primary)] font-semibold hover:underline inline-flex items-center gap-1">
                            Consulente Venezia <span>→</span>
                        </Link>
                    </div>
                    <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                        <h3 className="font-heading text-xl font-bold mb-4 text-[var(--color-primary)]">Padova</h3>
                        <p className="text-[var(--color-subtext)] mb-4">
                            Supporto aziende a Padova, Albignasego, Selvazzano, Cittadella.
                        </p>
                        <Link href="/consulenza-pmi-padova" className="text-[var(--color-primary)] font-semibold hover:underline inline-flex items-center gap-1">
                            Consulente Padova <span>→</span>
                        </Link>
                    </div>
                    <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                        <h3 className="font-heading text-xl font-bold mb-4 text-[var(--color-primary)]">Rovigo</h3>
                        <p className="text-[var(--color-subtext)] mb-4">
                            Interventi a Rovigo, Adria, Porto Viro, Occhiobello.
                        </p>
                        <Link href="/consulenza-pmi-rovigo" className="text-[var(--color-primary)] font-semibold hover:underline inline-flex items-center gap-1">
                            Consulente Rovigo <span>→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
