import Image from 'next/image';

interface TestimonialProps {
  quote: string;
  authorName: string;
  role?: string;
  company?: string;
  avatar?: string;
  videoUrl?: string;
  className?: string;
}

export default function Testimonial({
  quote,
  authorName,
  role,
  company,
  avatar,
  videoUrl,
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

      <div className="flex items-center gap-4">
        {avatar && !videoUrl && (
          <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
            <Image
              src={avatar}
              alt={authorName}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          <div className="font-semibold text-[var(--color-text)]">
            {authorName}
          </div>
          {(role || company) && (
            <div className="text-sm text-[var(--color-subtext)]">
              {role && company ? `${role}, ${company}` : role || company}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

