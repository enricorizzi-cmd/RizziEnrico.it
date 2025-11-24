import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  // Cache headers per risorse statiche (migliora performance)
  if (pathname.startsWith('/_next/static')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (pathname.startsWith('/_next/image')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2|ttf|eot)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (pathname.match(/\.(css|js)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    // Cache per pagine HTML (più breve)
    response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
  }

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
    "connect-src 'self' https://plausible.io https://www.google-analytics.com https://google-analytics.com https://region1.google-analytics.com https://region2.google-analytics.com https://region3.google-analytics.com https://region4.google-analytics.com https://region5.google-analytics.com https://www.googletagmanager.com wss:",
    "frame-src 'self' https://www.youtube.com https://calendly.com",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // Trusted Types rimosso perché incompatibile con Google Analytics e altri script dinamici
  // La sicurezza è già garantita dal CSP sopra

  // Basic Auth per /admin
  if (pathname.startsWith('/admin')) {
    const basicAuth = request.headers.get('authorization');
    const url = request.nextUrl;

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (pwd === 'osm') {
        return response;
      }
    }

    url.pathname = '/api/auth';
    return new NextResponse('Auth Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

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

