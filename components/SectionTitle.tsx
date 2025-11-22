interface SectionTitleProps {
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionTitle({
  title,
  description,
  centered = false,
  className = '',
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
        {title}
      </h2>
      {description && (
        <p className={`text-lg text-[var(--color-subtext)] max-w-3xl ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}

