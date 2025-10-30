import { generateMetadata } from '@/lib/seo';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import CTA from '@/components/CTA';
import { format } from 'date-fns';
import { it } from 'date-fns/locale/it';

export const metadata = generateMetadata({
  title: 'Eventi & Speaking - Calendario Eventi | Enrico Rizzi',
  description: 'Eventi, workshop e interventi pubblici su organizzazione aziendale e KPI per PMI. Venezia, Rovigo, Veneto.',
  path: '/eventi',
});

// Mock data - in produzione da Supabase
const events = [
  {
    slug: 'workshop-kpi-venezia',
    title: 'Workshop: KPI per PMI',
    description: 'Evento pratico su come definire e monitorare KPI nella tua PMI. Con template e case study reali.',
    dateStart: new Date('2024-02-15T18:00:00'),
    dateEnd: new Date('2024-02-15T20:00:00'),
    locationName: 'Centro Congressi Venezia',
    address: 'Via Example 123, Venezia',
    capacity: 30,
    isOnline: false,
  },
  {
    slug: 'webinar-organizzazione-pmi',
    title: 'Webinar: Organizzare la PMI in 90 giorni',
    description: 'Webinar online gratuito: metodo pratico per passare da caos a organizzazione.',
    dateStart: new Date('2024-02-20T18:00:00'),
    dateEnd: new Date('2024-02-20T19:30:00'),
    locationName: 'Online',
    address: '',
    capacity: 100,
    isOnline: true,
  },
];

export default function EventiPage() {
  return (
    <div className="py-16 bg-[var(--color-card)] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
            Eventi & Speaking
          </h1>
          <p className="text-xl text-[var(--color-subtext)] max-w-3xl mx-auto">
            Workshop, webinar e interventi pubblici su organizzazione aziendale e KPI per PMI.
            Venezia, Rovigo, Veneto.
          </p>
        </div>

        {/* Lista Eventi */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {events.map((event) => (
            <Card
              key={event.slug}
              title={event.title}
              variant="event"
              href={`/eventi/${event.slug}`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-[var(--color-subtext)]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {format(event.dateStart, 'd MMMM yyyy, HH:mm', { locale: it })} -{' '}
                    {format(event.dateEnd, 'HH:mm', { locale: it })}
                  </span>
                </div>
                {event.isOnline ? (
                  <div className="flex items-center gap-2 text-sm text-[var(--color-subtext)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Online</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-[var(--color-subtext)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.locationName}, {event.address}</span>
                  </div>
                )}
                <p className="text-sm">{event.description}</p>
                <div className="text-xs text-[var(--color-subtext)]">
                  Posti disponibili: {event.capacity}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

