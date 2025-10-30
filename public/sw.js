// Service Worker per PWA
const CACHE_NAME = 'rizzienrico-v1';
const urlsToCache = [
  '/',
  '/metodo',
  '/servizi',
  '/risorse',
  '/blog',
  '/contatti',
];

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Ritorna dalla cache o fetch dalla rete
      return response || fetch(event.request);
    })
  );
});

