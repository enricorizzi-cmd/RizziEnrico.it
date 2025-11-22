import ContactForm from '@/components/ContactForm';

export default function HomeContact() {
    return (
        <section className="py-16 bg-[var(--color-card)]">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-2xl mx-auto bg-white rounded-[var(--radius-card)] p-8 border border-[var(--color-line)] shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        Richiedi Check-up Gratuito
                    </h2>
                    <p className="text-center text-[var(--color-subtext)] mb-6">
                        Compila il form e ti ricontatto entro 24 ore per fissare l'appuntamento
                    </p>
                    <div className="bg-[var(--color-success)]/10 border border-[var(--color-success)] rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🎁</span>
                            <div>
                                <strong className="text-[var(--color-success)]">Check-up Gratuito</strong>
                                <p className="text-sm text-[var(--color-subtext)]">Senza impegno • 60 min Zoom o 90 min in presenza</p>
                            </div>
                        </div>
                    </div>
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
