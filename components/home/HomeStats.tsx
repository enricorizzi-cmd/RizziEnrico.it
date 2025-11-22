export default function HomeStats() {
    return (
        <section className="py-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: "Risultati", label: "Misurabili su fatturato", icon: "📈" },
                        { value: "90", label: "Giorni per vedere ordine", icon: "📅" },
                        { value: "6", label: "Mesi per risultati numerici", icon: "📊" },
                        { value: "Senior", label: "Consulente OSM", icon: "🏢" }
                    ].map((stat, index) => (
                        <div key={index}>
                            <div className="text-4xl mb-2">{stat.icon}</div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                            <div className="text-sm opacity-90">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
