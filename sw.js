const CACHE = 'biketrip-v118';

self.addEventListener('install', e => {
  const scope = self.registration.scope;
  const precache = [scope, scope + 'index.html', scope + 'trip-data.js', scope + 'gothenburg-alingsas-route.json', scope + 'alingsas-nitta-camp-route.json', scope + 'jonkoping-odeshog-route.json', scope + 'odeshog-linkoping-route.json', scope + 'linkoping-norrkoping-route.json', scope + 'norrkoping-camp-route.json', scope + 'nykoping-camp-route.json', scope + 'sodertalje-route.json', scope + 'stockholm-route.json', scope + 'stockholm-archipelago-camp-route.json', scope + 'norrtalje-grisslehamn-route.json', scope + 'eckero-camp-route.json', scope + 'eckero-mariehamn-route.json', scope + 'mariehamn-langnas-route.json', scope + 'hellso-kokar-camp-route.json', scope + 'korpo-turku-route.json', scope + 'turku-salo-route.json', scope + 'salo-lohja-route.json', scope + 'lohja-helsinki-route.json', scope + 'tallinn-estonia-route.json', scope + 'photos/2026-07-25-parnu-01.jpg', scope + 'photos/2026-07-25-parnu-02.jpg', scope + 'photos/2026-07-25-parnu-03.jpg', scope + 'haapsalu-parnu-route.json', scope + 'estonia-haapsalu-route.json', scope + 'photos/2026-07-24-kasari-bridge-01.jpg', scope + 'photos/2026-07-23-haapsalu-coast-01.jpg', scope + 'photos/2026-07-22-tallinn-estonia-01.jpg', scope + 'photos/2026-07-17-salo-lohja-01.jpg', scope + 'photos/2026-07-26-ainazi-forest-01.jpg', scope + 'photos/2026-07-26-ainazi-forest-02.jpg', scope + 'photos/2026-07-26-ainazi-forest-03.jpg', scope + 'photos/2026-07-26-latvia-border-01.jpg', scope + 'photos/2026-07-27-vilku-muiza-01.jpg', scope + 'photos/2026-07-27-malamutes-01.jpg', scope + 'photos/2026-07-27-malamutes-02.jpg', scope + 'ainazi-vilkumuiza-route.json', scope + 'jurmala-talsi-route.json', scope + 'talsi-kuldiga-route.json', scope + 'photos/2026-07-30-talsi-01.jpg', scope + 'photos/2026-07-30-talsi-02.jpg', scope + 'photos/2026-07-30-talsi-03.jpg', scope + 'photos/2026-07-30-talsi-04.jpg', scope + 'photos/2026-07-31-kuldiga-01.jpg', scope + 'photos/2026-07-31-kuldiga-02.jpg', scope + 'photos/2026-07-31-kuldiga-03.jpg', scope + 'photos/2026-07-31-p120-lost-01.jpg', scope + 'photos/2026-07-31-p120-lost-02.jpg', scope + 'photos/2026-07-31-p120-lost-03.jpg', scope + 'photos/2026-07-31-p120-lost-04.jpg', scope + 'kuldiga-jurkalne-route.json'];
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
