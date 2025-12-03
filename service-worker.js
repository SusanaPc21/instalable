// service-worker.js
const CACHE_NAME = 'sw4-static-v2';
const DYNAMIC_CACHE = 'sw4-dynamic-v2';

const cacheAssets = [
  './',
  './index.html',
  './pagina1.html',
  './pagina2.html',
  './pagina3.html',
  './styles.css',
  './app.js',
  './logo.jpg',
  './offline.html',
  './manifest.webmanifest',
  './favicon.ico',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  console.log('[SW] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(cacheAssets))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  console.log('[SW] Activado');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME && k !== DYNAMIC_CACHE)
            .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    fetch(req)
      .then(networkRes => {
        const resClone = networkRes.clone();
        caches.open(DYNAMIC_CACHE).then(cache => cache.put(req, resClone));
        return networkRes;
      })
      .catch(() =>
        caches.match(req)
          .then(cacheRes => cacheRes || caches.match('./offline.html'))
      )
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        for (const client of clientList) {
          if ('focus' in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow('./index.html');
      })
  );
});
