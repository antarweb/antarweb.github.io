const CACHE_NAME = "hisaberkhata-v1";
const urlsToCache = [
  "/hisaberkhata/",
  "/hisaberkhata/index.html",
  "/hisaberkhata/icon-192x192.png",
  "/hisaberkhata/icon-512x512.png",
  "/hisaberkhata/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
