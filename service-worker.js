// service-worker.js

const CACHE_NAME = "farmassist-cache-v1";

// List of files to cache for offline app shell
const FILES_TO_CACHE = [
  "/",                  // root
  "/index.html",
  "/offline.html",
  "/index.css",
  "/index.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
  // you can add more static assets here if needed, e.g. images used in advisory tips
];

// Install event: cache core assets
self.addEventListener("install", event => {
  console.log("[Service Worker] Install");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("[Service Worker] Caching app shell");
        return cache.addAll(FILES_TO_CACHE);
      })
      .catch(err => {
        console.error("[Service Worker] Failed to cache during install", err);
      })
  );
  // Activate this service worker immediately without waiting for old one to close
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener("activate", event => {
  console.log("[Service Worker] Activate");
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(name => {
            if (name !== CACHE_NAME) {
              console.log("[Service Worker] Removing old cache:", name);
              return caches.delete(name);
            }
            return null;
          })
        );
      })
      .catch(err => {
        console.error("[Service Worker] Error during activation:", err);
      })
  );
  self.clients.claim();
});

// Fetch event: serve from cache first, fallback to network, fallback offline page
self.addEventListener("fetch", event => {
  // For navigation requests (e.g. user enters url or clicks link)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Put response in cache for future
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(error => {
          console.log("[Service Worker] Fetch failed; returning offline page instead.", error);
          return caches.match("/offline.html");
        })
    );
    return;
  }

  // For other requests (CSS, JS, images etc.)
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request)
          .then(networkResponse => {
            // Optionally cache new resource
            return caches.open(CACHE_NAME).then(cache => {
              // Only cache if valid response
              if (networkResponse && networkResponse.status === 200) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            });
          })
          .catch(error => {
            // If both cache and network fail, maybe provide fallback (if defined)
            // Example: fallback image for missing images
            console.error("[Service Worker] Resource fetch failed:", error);
            return Promise.reject(error);
          });
      })
  );
});

