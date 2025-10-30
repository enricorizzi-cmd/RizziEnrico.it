interface Step {
  number: number;
  title: string;
  description: string;
  benefits?: string[];
  iprofile?: {
    title: string;
    description: string;
    benefits: string[];
    cta: {
      text: string;
      href: string;
    };
  };
}

interface StepsProps {
  steps: Step[];
  className?: string;
}

export default function Steps({ steps, className = '' }: StepsProps) {
  return (
    <div className={`space-y-12 ${className}`}>
      {steps.map((step, index) => (
        <div key={index}>
          <div className="flex gap-6">
            {/* Number Circle */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-heading text-2xl font-bold">
                {step.number}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-2">
                {step.title}
              </h3>
              <p className="text-[var(--color-subtext)] mb-4 text-lg">
                {step.description}
              </p>
              {step.benefits && step.benefits.length > 0 && (
                <ul className="space-y-2">
                  {step.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-[var(--color-subtext)]">
                      <svg
                        className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* i-Profile Sub-section per Step Persone */}
          {step.iprofile && (
            <div className="mt-6 ml-24 bg-[var(--color-card)] rounded-[var(--radius-card)] p-6 border border-[var(--color-line)]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-[var(--color-primary)]">i-Profile</span>
                <span className="text-xs px-2 py-0.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded">
                  Strumento
                </span>
              </div>
              <h4 className="font-heading text-lg font-bold text-[var(--color-text)] mb-2">
                {step.iprofile.title}
              </h4>
              <p className="text-sm text-[var(--color-subtext)] mb-4">
                {step.iprofile.description}
              </p>
              <ul className="space-y-2 mb-4">
                {step.iprofile.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text)]">
                    <span className="text-[var(--color-primary)] mt-1">→</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <a
                href={step.iprofile.cta.href}
                className="inline-block px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                {step.iprofile.cta.text} →
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

