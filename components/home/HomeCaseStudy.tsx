import Link from 'next/link';
import SectionTitle from '@/components/SectionTitle';
import CTA from '@/components/CTA';

export default function HomeCaseStudy() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionTitle
                    title="Case Study: PMI che Hanno Trasformato Organizzazione e Risultati"
                    description="Esempi concreti di PMI venete che hanno ottenuto risultati misurabili con metodo e KPI."
                    centered
                />
                <div className="text-center mt-8">
                    <CTA href="/case-study" variant="secondary" size="large">
                        Vedi tutti i Case Study →
                    </CTA>
                </div>
                <div className="text-center mt-6">
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
        </section>
    );
}
