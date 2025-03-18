const CACHE_NAME = "hisaberkhata-cache-v1";
const urlsToCache = [
    "/hisaberkhata",
    "/index.html",
    "/icon-192x192.png",
    "/icon-512x512.png"
];

// Install Service Worker and Cache Files
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch Cached Files When Offline
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
