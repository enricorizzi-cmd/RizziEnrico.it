// Simple in-memory rate limiter (in produzione: usare Redis o Upstash)
const requests = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minuti
  maxRequests: 100, // 100 richieste per window
};

export function rateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = requests.get(identifier);

  if (!record || now > record.resetTime) {
    // Nuovo window
    requests.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return { allowed: true, remaining: RATE_LIMIT.maxRequests - 1 };
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT.maxRequests - record.count };
}

// Cleanup vecchie entry ogni 5 minuti (più frequente per ridurre memoria)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    let cleaned = 0;
    for (const [key, record] of requests.entries()) {
      if (now > record.resetTime) {
        requests.delete(key);
        cleaned++;
      }
    }
    // Limita dimensione Map (max 1000 entry per sicurezza)
    if (requests.size > 1000) {
      const entries = Array.from(requests.entries());
      // Rimuovi le entry più vecchie
      entries.sort((a, b) => a[1].resetTime - b[1].resetTime);
      const toRemove = entries.slice(0, requests.size - 1000);
      for (const [key] of toRemove) {
        requests.delete(key);
      }
    }
  }, 5 * 60 * 1000); // Ogni 5 minuti invece di 30
}

