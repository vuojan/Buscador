const CACHE_NAME = 'v3';
const CACHE_ASSETS = [
    'index.html',
    'style.css',
    'script.js',
    'data.json',
    'manifest.json',
    'icon192.png',
    'icon512.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CACHE_ASSETS);
        })
    );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => !cacheWhitelist.includes(cacheName))
                    .map((cacheName) => caches.delete(cacheName))
            );
        })
        .then(() => {
            return self.clients.claim(); // Controlar las páginas abiertas inmediatamente
        })
        .catch((error) => {
            console.error('Error during service worker activation:', error);
        })
    );
});

// Fetch para manejar las solicitudes
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Check if we received a valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                const responseToCache = response.clone();

                // Update the cache with the latest response
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            })
            .catch(() => {
                // If fetch fails, attempt to return the cached response
                return caches.match(event.request);
            })
    );
});