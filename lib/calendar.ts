/**
 * Genera contenuto ICS per evento calendario
 */
export function generateICS({
  title,
  description,
  startDate,
  endDate,
  location,
  organizer = { name: 'Enrico Rizzi', email: 'info@rizzienrico.it' },
}: {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location: string;
  organizer?: { name: string; email: string };
}): string {
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const escapeText = (text: string): string => {
    return text.replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Enrico Rizzi//Workshop//IT',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@rizzienrico.it`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${escapeText(title)}`,
    description ? `DESCRIPTION:${escapeText(description)}` : '',
    `LOCATION:${escapeText(location)}`,
    `ORGANIZER;CN=${escapeText(organizer.name)}:MAILTO:${organizer.email}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Promemoria workshop',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(line => line !== '')
    .join('\r\n');

  return icsContent;
}

/**
 * Genera URL per aggiungere evento a Google Calendar
 */
export function generateGoogleCalendarUrl({
  title,
  description,
  startDate,
  endDate,
  location,
}: {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location: string;
}): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    details: description || '',
    location: location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Genera URL per aprire navigatore (Google Maps)
 */
export function generateMapsUrl(location: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(location)}`;
}

