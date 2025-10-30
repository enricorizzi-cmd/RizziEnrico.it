'use client';

interface IPBenefitListProps {
  benefits: string[];
  variant?: 'default' | 'compact';
}

export default function IPBenefitList({ benefits, variant = 'default' }: IPBenefitListProps) {
  return (
    <ul className={`space-y-${variant === 'compact' ? '2' : '3'}`}>
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-5 h-5 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
              <svg className="w-3 h-3 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <span className={`text-${variant === 'compact' ? 'sm' : 'base'} text-[var(--color-text)]`}>
            {benefit}
          </span>
        </li>
      ))}
    </ul>
  );
}

