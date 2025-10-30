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

// Cleanup vecchie entry ogni 30 minuti
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of requests.entries()) {
      if (now > record.resetTime) {
        requests.delete(key);
      }
    }
  }, 30 * 60 * 1000);
}

