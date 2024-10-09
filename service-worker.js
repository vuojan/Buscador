const CACHE_NAME = 'v1';
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

// Fetch para manejar las solicitudes
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});