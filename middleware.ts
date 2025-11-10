import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // HSTS (solo su HTTPS)
  if (request.nextUrl.protocol === 'https:') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // COOP (Cross-Origin-Opener-Policy) per isolamento origine
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  
  // COEP (Cross-Origin-Embedder-Policy) - commentato perché troppo restrittivo per analytics esterni
  // Se necessario, usare 'credentialless' invece di 'require-corp' per permettere risorse cross-origin
  // response.headers.set('Cross-Origin-Embedder-Policy', 'credentialless');

  // CSP (Content Security Policy) - migliorato per XSS protection
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://plausible.io https://www.google-analytics.com wss:",
    "frame-src 'self' https://www.youtube.com https://calendly.com",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  
  // Trusted Types per mitigare XSS DOM-based
  response.headers.set('Require-Trusted-Types-For', "'script'");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

