import Link from 'next/link';
import ProfilePhoto from '@/components/ProfilePhoto';
import OSMBadge from '@/components/OSMBadge';
import CTA from '@/components/CTA';

export default function HomeBio() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        {/* Foto */}
                        <div className="md:col-span-1">
                            <div className="relative inline-block mx-auto md:mx-0">
                                <ProfilePhoto src="/enrico-rizzi.jpg" size="md" alt="Enrico Rizzi consulente OSM PMI Veneto" />
                                {/* Badge OSM discreto */}
                                <div className="absolute -bottom-2 -right-2 bg-white rounded-lg px-2 py-1 shadow-sm border border-[var(--color-line)]">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[9px] text-[var(--color-subtext)] font-medium">Partner</span>
                                        <OSMBadge variant="small" useImage={true} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Testo */}
                        <div className="md:col-span-2 text-center md:text-left">
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
                                Enrico Rizzi
                            </h2>
                            <p className="text-lg md:text-xl text-[var(--color-subtext)] mb-4">
                                Consulente OSM per PMI del Veneto
                            </p>
                            <p className="text-[var(--color-text)] mb-6 leading-relaxed">
                                <strong>Da oltre 10 anni lavoro dentro e a fianco delle PMI venete</strong>: prima nell'azienda di famiglia, oggi come <strong>consulente aziendale senior OSM Partner Venezia–Rovigo</strong>.
                            </p>
                            <p className="text-[var(--color-text)] mb-6 leading-relaxed">
                                Aiuto imprenditori di <strong>Venezia, Padova e Rovigo</strong> a mettere ordine in ruoli, KPI e processi <strong>e a sfruttare la digitalizzazione in modo semplice</strong>: cruscotti, strumenti online e automazioni che il team può davvero usare tutti i giorni.
                            </p>
                            <p className="text-[var(--color-text)] mb-6 leading-relaxed">
                                <strong>Risultato concreto:</strong> Nel 2024 ho aiutato un'azienda manifatturiera
                                di Padova ad <strong>aumentare significativamente il fatturato</strong> migliorando la produttività dei dipendenti,
                                ottimizzando la rete vendita e implementando un sistema di controllo di gestione efficace.
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
                                <CTA href="/chi-sono" variant="primary">
                                    La mia storia →
                                </CTA>
                                <CTA href="/contatti" variant="secondary">
                                    Contattami →
                                </CTA>
                                <div className="flex items-center gap-2 text-sm text-[var(--color-subtext)]">
                                    <span>Partner</span>
                                    <OSMBadge variant="footer" useImage={true} />
                                </div>
                            </div>
                            <div className="mt-6 text-center md:text-left">
                                <p className="text-sm text-[var(--color-subtext)]">
                                    Scopri anche: <Link href="/servizi" className="text-[var(--color-primary)] hover:underline font-semibold" title="Servizi di consulenza PMI">servizi</Link>, <Link href="/metodo" className="text-[var(--color-primary)] hover:underline font-semibold" title="Metodo OSM">metodo</Link> e <Link href="/case-study" className="text-[var(--color-primary)] hover:underline font-semibold" title="Case study PMI">case study</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-12">
                    <CTA href="/contatti" variant="primary" size="large">
                        Vuoi Risultati Simili? Contattami Ora →
                    </CTA>
                </div>
            </div>
        </section>
    );
}
