const CACHE = 'biketrip-v61';

self.addEventListener('install', e => {
  const scope = self.registration.scope;
  const precache = [scope, scope + 'index.html', scope + 'trip-data.js', scope + 'gothenburg-alingsas-route.json', scope + 'alingsas-nitta-camp-route.json', scope + 'jonkoping-odeshog-route.json', scope + 'odeshog-linkoping-route.json', scope + 'linkoping-norrkoping-route.json', scope + 'norrkoping-camp-route.json', scope + 'nykoping-camp-route.json'];
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(precache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
