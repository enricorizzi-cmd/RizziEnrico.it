'use client';

import { useState } from 'react';
import IPBadge from './IPBadge';

interface IPUseCasesTabsProps {
  useCases: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    benefits: string[];
    cta?: {
      text: string;
      href: string;
    };
  }[];
}

export default function IPUseCasesTabs({ useCases }: IPUseCasesTabsProps) {
  const [activeTab, setActiveTab] = useState(useCases[0]?.id || '');

  const activeCase = useCases.find(uc => uc.id === activeTab) || useCases[0];

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 md:p-8 border border-[var(--color-line)]">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-[var(--color-line)]">
        {useCases.map((useCase) => (
          <button
            key={useCase.id}
            onClick={() => setActiveTab(useCase.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === useCase.id
                ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                : 'text-[var(--color-subtext)] hover:text-[var(--color-text)]'
            }`}
          >
            {useCase.title}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeCase && (
        <div>
          <h3 className="font-heading text-xl font-bold text-[var(--color-text)] mb-2">
            {activeCase.subtitle}
          </h3>
          <p className="text-[var(--color-subtext)] mb-4">
            {activeCase.description}
          </p>
          <ul className="space-y-2 mb-6">
            {activeCase.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] mt-1">→</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          {activeCase.cta && (
            <a
              href={activeCase.cta.href}
              className="inline-block px-6 py-2 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              {activeCase.cta.text}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

