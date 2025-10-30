import { notFound } from 'next/navigation';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import JSONLD from '@/components/JSONLD';
import EventRegistrationForm from '@/components/EventRegistrationForm';
import { format } from 'date-fns';
import { it } from 'date-fns/locale/it';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const events = {
  'workshop-kpi-venezia': {
    title: 'Workshop: KPI per PMI',
    description: 'Evento pratico su come definire e monitorare KPI nella tua PMI. Con template e case study reali.',
    dateStart: new Date('2024-02-15T18:00:00'),
    dateEnd: new Date('2024-02-15T20:00:00'),
    locationName: 'Centro Congressi Venezia',
    address: 'Via Example 123, Venezia, 30100',
    capacity: 30,
    isOnline: false,
  },
  'webinar-organizzazione-pmi': {
    title: 'Webinar: Organizzare la PMI in 90 giorni',
    description: 'Webinar online gratuito: metodo pratico per passare da caos a organizzazione.',
    dateStart: new Date('2024-02-20T18:00:00'),
    dateEnd: new Date('2024-02-20T19:30:00'),
    locationName: 'Online',
    address: '',
    capacity: 100,
    isOnline: true,
  },
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = events[slug as keyof typeof events];

  if (!event) {
    return { title: 'Evento non trovato' };
  }

  return generateSEOMetadata({
    title: `${event.title} - Eventi | Enrico Rizzi`,
    description: event.description,
    path: `/eventi/${slug}`,
  });
}

export async function generateStaticParams() {
  return Object.keys(events).map((slug) => ({ slug }));
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = events[slug as keyof typeof events];

  if (!event) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rizzienrico.it';

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.dateStart.toISOString(),
    endDate: event.dateEnd.toISOString(),
    location: event.isOnline
      ? {
          '@type': 'VirtualLocation',
          url: baseUrl + `/eventi/${slug}`,
        }
      : {
          '@type': 'Place',
          name: event.locationName,
          address: event.address,
        },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  };

  // Genera ICS calendar file data
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Enrico Rizzi//Event//IT',
    'BEGIN:VEVENT',
    `UID:${slug}@rizzienrico.it`,
    `DTSTART:${format(event.dateStart, "yyyyMMdd'T'HHmmss")}`,
    `DTEND:${format(event.dateEnd, "yyyyMMdd'T'HHmmss")}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    event.isOnline
      ? `URL:${baseUrl}/eventi/${slug}`
      : `LOCATION:${event.locationName}, ${event.address}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const icsBlob = new Blob([icsContent], { type: 'text/calendar' });

  return (
    <>
      <JSONLD data={eventSchema} />
      
      <div className="py-16 bg-white min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
                {event.title}
              </h1>
              <div className="space-y-2 text-lg text-[var(--color-subtext)]">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {format(event.dateStart, 'EEEE d MMMM yyyy, HH:mm', { locale: it })} -{' '}
                    {format(event.dateEnd, 'HH:mm', { locale: it })}
                  </span>
                </div>
                {event.isOnline ? (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Evento Online</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.locationName}, {event.address}</span>
                  </div>
                )}
                <div className="text-sm">
                  Posti disponibili: {event.capacity}
                </div>
              </div>
            </div>

            {/* Descrizione */}
            <div className="mb-12">
              <p className="text-lg text-[var(--color-subtext)] leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Form Registrazione */}
            <div className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-8 border border-[var(--color-line)] mb-8">
              <h2 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-4">
                Registrati all'evento
              </h2>
              <EventRegistrationForm eventSlug={slug} />
            </div>

            {/* ICS Download */}
            <div className="flex gap-4">
              <a
                href={`data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`}
                download={`${slug}.ics`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[var(--color-line)] text-[var(--color-text)] font-semibold rounded-lg hover:bg-[var(--color-card)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Aggiungi al calendario
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

