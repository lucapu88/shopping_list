/* eslint-env serviceworker */
const CACHE_PREFIX = 'shopping-list-shell-';
const CACHE_NAME = `${CACHE_PREFIX}__BUILD_VERSION__`;
const PRECACHE_URLS = __PRECACHE_URLS__; // eslint-disable-line no-undef -- Sostituito con i percorsi reali durante la build.
const STATIC_PATHS = new Set(PRECACHE_URLS);
const FONT_CACHE = 'shopping-list-fonts-v1';

self.addEventListener('install', event => {
  // Completa l'installazione solo dopo aver salvato tutti i file necessari all'avvio offline.
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    // Elimina solo le vecchie cache dell'app, senza toccare liste e tessere salvate.
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    // Usa la pagina salvata per riaprire l'app offline, senza intercettare percorsi API o login.
    if (request.mode === 'navigate' && (url.pathname === '/' || url.pathname === '/index.html')) {
      event.respondWith(caches.open(CACHE_NAME).then(cache => cache.match('/index.html')));
    } else if (STATIC_PATHS.has(url.pathname)) {
      event.respondWith(caches.open(CACHE_NAME).then(async cache =>
        (await cache.match(url.pathname)) || fetch(request)));
    }
    return;
  }

  // Tra le risorse esterne salva solo i font: API, credenziali e pagamenti restano fuori dalla cache.
  if (['fonts.googleapis.com', 'fonts.gstatic.com'].includes(url.hostname)) {
    event.respondWith((async () => {
      const cache = await caches.open(FONT_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok || response.type === 'opaque') {
          await cache.put(request, response.clone());
        }
        return response;
      } catch {
        // Se il font non è disponibile, il tema resta leggibile con i caratteri di ripiego del CSS.
        return new Response('', { headers: { 'Content-Type': 'text/css' } });
      }
    })());
  }
});
