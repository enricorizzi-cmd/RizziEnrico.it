// Performance monitoring utilities
import React from 'react';

export function reportWebVitals(metric: any) {
  // Invia metriche CWV a Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    });
  }

  // Log per debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
}

// Lazy load componenti pesanti
export function lazyLoadComponent<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return React.lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(importFunc());
      }, 0);
    });
  });
}

