import CTA from '@/components/CTA';
import IPBadge from '@/components/IPBadge';

export default function HomeProfile() {
    return (
        <section className="py-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <IPBadge variant="inline" className="text-white" />
                        <span className="text-sm opacity-90">Prodotto di punta</span>
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
                        Scopri il tuo profilo attitudinale
                    </h2>
                    <p className="text-lg mb-6 opacity-90">
                        Prendi decisioni sulle persone con più dati e meno rischi.
                        La persona giusta nel posto giusto non è fortuna: è metodo.
                    </p>
                    <CTA href="/i-profile" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
                        Scopri i-Profile →
                    </CTA>
                </div>
            </div>
        </section>
    );
}
