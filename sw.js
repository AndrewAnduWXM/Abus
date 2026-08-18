const CACHE_NAME = 'abus-mobil-v1';
const CORE_FILES = ['./productie-mobil.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_FILES)).catch(() => {})
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Rețea întâi (date mereu proaspete), cu fallback pe cache dacă nu are semnal
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
