import Image from 'next/image';

interface TestimonialProps {
  quote: string;
  authorName: string;
  role?: string;
  company?: string;
  location?: string;
  result?: string;
  avatar?: string;
  videoUrl?: string;
  caseStudyLink?: string;
  className?: string;
}

export default function Testimonial({
  quote,
  authorName,
  role,
  company,
  location,
  result,
  avatar,
  videoUrl,
  caseStudyLink,
  className = '',
}: TestimonialProps) {
  return (
    <div className={`bg-white rounded-[var(--radius-card)] p-6 md:p-8 shadow-md border border-[var(--color-line)] ${className}`}>
      {videoUrl ? (
        <div className="mb-6 aspect-video bg-gray-200 rounded-lg overflow-hidden">
          <video
            controls
            className="w-full h-full object-cover"
            poster={avatar}
          >
            <source src={videoUrl} type="video/mp4" />
            Il tuo browser non supporta il tag video.
          </video>
        </div>
      ) : null}

      <blockquote className="text-lg text-[var(--color-text)] mb-6 italic">
        "{quote}"
      </blockquote>

      {result && (
        <div className="mb-4 p-3 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-lg">
          <p className="text-sm font-semibold text-[var(--color-success)]">
            📊 Risultati: {result}
          </p>
        </div>
      )}

      <div className="flex items-center gap-4">
        {avatar && !videoUrl && (
          <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
            <Image
              src={avatar}
              alt={authorName}
              width={48}
              height={48}
              className="w-full h-full object-cover"
              loading="lazy"
              quality={85}
              sizes="48px"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="font-semibold text-[var(--color-text)]">
            {authorName}
          </div>
          <div className="text-sm text-[var(--color-subtext)]">
            {role && company ? `${role}, ${company}` : role || company}
            {location && ` • ${location}`}
          </div>
        </div>
      </div>
      {caseStudyLink && (
        <div className="mt-4 pt-4 border-t border-[var(--color-line)]">
          <a
            href={caseStudyLink}
            className="text-sm text-[var(--color-primary)] hover:underline font-medium"
          >
            Leggi Case Study Completo →
          </a>
        </div>
      )}
    </div>
  );
}






