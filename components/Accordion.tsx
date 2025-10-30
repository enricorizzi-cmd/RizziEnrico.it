'use client';

import { useState } from 'react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className = '' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-[var(--color-line)] rounded-[var(--radius-base)] overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-[var(--color-card)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            aria-expanded={openIndex === index}
            aria-controls={`accordion-content-${index}`}
          >
            <span className="font-semibold text-[var(--color-text)] pr-4">
              {item.question}
            </span>
            <svg
              className={`w-5 h-5 text-[var(--color-primary)] flex-shrink-0 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            id={`accordion-content-${index}`}
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 py-4 text-[var(--color-subtext)] bg-[var(--color-card)]">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

