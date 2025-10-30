import Testimonial from './Testimonial';

interface VideoTestimonialProps {
  videoUrl: string;
  quote: string;
  authorName: string;
  role?: string;
  company?: string;
  transcript?: string;
}

export default function VideoTestimonial({
  videoUrl,
  quote,
  authorName,
  role,
  company,
  transcript,
}: VideoTestimonialProps) {
  return (
    <div className="space-y-4">
      <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
        <video
          controls
          className="w-full h-full object-cover"
          preload="metadata"
          aria-label={`Video testimonianza di ${authorName}`}
        >
          <source src={videoUrl} type="video/mp4" />
          Il tuo browser non supporta il tag video.
        </video>
      </div>

      <Testimonial
        quote={quote}
        authorName={authorName}
        role={role}
        company={company}
      />

      {transcript && (
        <details className="bg-[var(--color-card)] rounded-lg p-4">
          <summary className="cursor-pointer font-semibold text-[var(--color-text)] mb-2">
            Trascrizione video
          </summary>
          <div className="mt-2 text-sm text-[var(--color-subtext)] whitespace-pre-line">
            {transcript}
          </div>
        </details>
      )}
    </div>
  );
}

