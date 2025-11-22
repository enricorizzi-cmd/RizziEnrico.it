import Link from 'next/link';
import Accordion from '@/components/Accordion';

export default function HomeLocalSEO() {
    return (
        <section className="py-16 bg-[var(--color-card)]">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4 text-center">
                        Consulente Aziendale Padova, Venezia, Rovigo: Dove Opero
                    </h2>
                    <p className="text-lg text-[var(--color-subtext)] mb-6 text-center">
                        Opero in Veneto con focus su Venezia, Padova e Rovigo. Conosco le dinamiche locali delle aziende familiari del territorio e ti aiuto a migliorare organizzazione e risultati concreti.
                    </p>
                    <ul className="space-y-3 mb-8 max-w-2xl mx-auto">
                        <li className="flex items-start gap-3 text-[var(--color-text)]">
                            <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Incontri in presenza (Venezia-Padova-Rovigo)</span>
                        </li>
                        <li className="flex items-start gap-3 text-[var(--color-text)]">
                            <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Check-up gratuito: 60' Zoom o 90' in presenza</span>
                        </li>
                        <li className="flex items-start gap-3 text-[var(--color-text)]">
                            <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Esperienza su manifatturiero, servizi, commercio</span>
                        </li>
                    </ul>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
                        <Link href="/consulenza-pmi-venezia" className="bg-white rounded-[var(--radius-card)] p-4 border border-[var(--color-line)] hover:shadow-md transition-shadow text-center">
                            <h3 className="font-heading font-semibold text-[var(--color-text)] mb-2">Consulenza PMI Venezia</h3>
                            <p className="text-sm text-[var(--color-subtext)]">Servizi per aziende veneziane</p>
                        </Link>
                        <Link href="/consulenza-pmi-padova" className="bg-white rounded-[var(--radius-card)] p-4 border border-[var(--color-line)] hover:shadow-md transition-shadow text-center">
                            <h3 className="font-heading font-semibold text-[var(--color-text)] mb-2">Consulenza PMI Padova</h3>
                            <p className="text-sm text-[var(--color-subtext)]">Servizi per aziende padovane</p>
                        </Link>
                        <Link href="/consulenza-pmi-rovigo" className="bg-white rounded-[var(--radius-card)] p-4 border border-[var(--color-line)] hover:shadow-md transition-shadow text-center">
                            <h3 className="font-heading font-semibold text-[var(--color-text)] mb-2">Consulenza PMI Rovigo</h3>
                            <p className="text-sm text-[var(--color-subtext)]">Servizi per aziende rodigine</p>
                        </Link>
                    </div>
                    <div className="bg-white rounded-[var(--radius-card)] p-6 border border-[var(--color-line)] max-w-2xl mx-auto">
                        <Accordion items={[
                            {
                                question: 'Fate interventi anche fuori regione?',
                                answer: 'Sì, su valutazione.',
                            },
                            {
                                question: 'Quanto tempo serve per iniziare?',
                                answer: 'Dopo il check-up, calendario e piano.',
                            },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    );
}
