// Simple in-memory rate limiter (in produzione: usare Redis o Upstash)
const requests = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minuti
  maxRequests: 100, // 100 richieste per window
};

// Limite massimo entry nel Map per prevenire crescita infinita memoria
const MAX_MAP_SIZE = 500; // Ridotto da 1000 a 500 per ridurre memoria

export function rateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = requests.get(identifier);

  if (!record || now > record.resetTime) {
    // Nuovo window
    requests.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    
    // Cleanup preventivo se Map si avvicina al limite
    if (requests.size > MAX_MAP_SIZE * 0.9) {
      cleanupOldEntries(now);
    }
    
    return { allowed: true, remaining: RATE_LIMIT.maxRequests - 1 };
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT.maxRequests - record.count };
}

// Funzione di cleanup centralizzata
function cleanupOldEntries(now: number) {
  let cleaned = 0;
  for (const [key, record] of requests.entries()) {
    if (now > record.resetTime) {
      requests.delete(key);
      cleaned++;
    }
  }
  
  // Se ancora sopra il limite, rimuovi le entry più vecchie
  if (requests.size > MAX_MAP_SIZE) {
    const entries = Array.from(requests.entries());
    entries.sort((a, b) => a[1].resetTime - b[1].resetTime);
    const toRemove = entries.slice(0, requests.size - MAX_MAP_SIZE);
    for (const [key] of toRemove) {
      requests.delete(key);
      cleaned++;
    }
  }
  
  // Forza garbage collection se disponibile (richiede --expose-gc)
  if (typeof global !== 'undefined' && (global as any).gc) {
    try {
      (global as any).gc();
    } catch (e) {
      // Ignora se GC non disponibile
    }
  }
  
  return cleaned;
}

// Cleanup vecchie entry ogni 3 minuti (più frequente per ridurre memoria)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    cleanupOldEntries(now);
  }, 3 * 60 * 1000); // Ogni 3 minuti (ridotto da 5)
}

