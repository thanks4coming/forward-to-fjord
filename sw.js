/* Shits Creek — offline shell: static assets only (tiles & routing stay network). */
const PRECACHE = 'shits-creek-static-v1';
const ASSET_URLS = [
  './index.html',
  './shits-creek.html',
  './shits-creek.webmanifest',
  './shits-creek-icon-192.svg',
  './shits-creek-icon-512.svg',
  './vendor/leaflet.css',
  './vendor/leaflet.js',
  './vendor/images/layers.png',
  './vendor/images/layers-2x.png',
  './vendor/images/marker-icon.png',
  './vendor/images/marker-icon-2x.png',
  './vendor/images/marker-shadow.png',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(PRECACHE).then(function (cache) {
      return cache.addAll(ASSET_URLS.map(function (u) { return new URL(u, self.location).href; }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== PRECACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then(function (hit) {
      if (hit) return hit;
      return fetch(event.request).then(function (res) {
        return res;
      }).catch(function () {
        return caches.match(new URL('./shits-creek.html', self.location));
      });
    })
  );
});
