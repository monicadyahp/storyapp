// src/sw.js
const CACHE_NAME = 'story-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/images/screenshots/screenshot-desktop-1.png',
  '/images/screenshots/screenshot-mobile-1.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  '/images/placeholder.png', // Pastikan ini ada dan sudah Anda buat di public/images/
  '/favicon.ico'
];

const FALLBACK_IMAGE_URL = '/images/placeholder.png'; // Pastikan ini path ke placeholder Anda

self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return Promise.allSettled(
          urlsToCache.map(url => {
            return fetch(url, { cache: 'no-cache' })
              .then(response => {
                if (response.ok) {
                  return cache.put(url, response);
                }
                throw new Error(`Failed to cache ${url}: ${response.statusText}`);
              })
              .catch(error => console.error(`Precaching failed for ${url}:`, error));
          })
        );
      })
      .then(() => self.skipWaiting())
      .catch((error) => console.error('Overall precaching failed:', error))
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.startsWith('story-app-') && cacheName !== CACHE_NAME) {
            console.log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Jika permintaan berasal dari origin yang sama (localhost),
  // BIARKAN BROWSER MENANGANI SECARA NORMAL (jangan diintersep oleh Service Worker).
  if (requestUrl.origin === self.location.origin) {
    console.log('Bypassing Service Worker for local asset:', event.request.url);
    // Kita tetap harus meng-respond event ini agar tidak ada Warning di konsol,
    // tapi biarkan itu lewat ke jaringan normal.
    // fetch(event.request) adalah respons default jika tidak ada cache/aturan
    event.respondWith(fetch(event.request)); 
    return; 
  }

  const isUnpkgAsset = requestUrl.origin === 'https://unpkg.com/';
  const isMapTile = requestUrl.hostname.includes('tile.openstreetmap.org');
  const isStoryImage = requestUrl.origin === 'https://story-api.dicoding.dev' && requestUrl.pathname.startsWith('/images/stories/');

  // Strategi Cache-First untuk aset eksternal dan gambar dinamis
  // Termasuk UNPKG, MAP TILES, dan STORY IMAGES
  if (isUnpkgAsset || isMapTile || isStoryImage) { // isLocalAsset sudah di-bypass di atas
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            console.log('Serving from cache:', event.request.url);
            return cachedResponse;
          }
          return fetch(event.request)
            .then((networkResponse) => {
              console.log('Serving from network and caching:', event.request.url);
              const responseToCache = networkResponse.clone();
              
              if (networkResponse.ok) {
                caches.open(CACHE_NAME).then((cache) => {
                  console.log(`Attempting to cache: ${event.request.url}`);
                  return cache.put(event.request, responseToCache)
                    .then(() => console.log(`Successfully cached: ${event.request.url}`))
                    .catch(e => console.error(`Failed to put in cache ${event.request.url}:`, e));
                });
              }
              return networkResponse;
            })
            .catch(() => {
              console.warn('Offline: No cache and network failed for:', event.request.url);
              // --- PERBAIKAN DI SINI UNTUK FALLBACK GAMBAR DAN TILE PETA ---
              if (isStoryImage || isMapTile) { // Lebih spesifik ke gambar story dan map tiles
                return caches.match(FALLBACK_IMAGE_URL)
                  .then(placeholderResponse => {
                    if (placeholderResponse) {
                      console.log('Serving placeholder from cache for:', event.request.url);
                      return placeholderResponse;
                    }
                    // Jika placeholder juga tidak ada di cache, buat respons SVG inline sebagai fallback terakhir
                    return new Response('<svg width="100" height="100" viewBox="0 0 100 100" fill="#ccc" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100"/></svg>', { headers: { 'Content-Type': 'image/svg+xml' }, status: 200 });
                  })
                  .catch(error => {
                    console.error('Error serving image/tile fallback:', error);
                    return Response.error();
                  });
              } else if (event.request.destination === 'style' || event.request.destination === 'script') {
                 // Untuk CSS/JS yang gagal di unpkg.com, kembalikan respons error yang valid tapi kosong
                 return new Response('', { status: 503, statusText: 'Offline' });
              }
              // Untuk tipe lain, kembalikan respons error standar.
              return Response.error(); 
            });
        })
    );
  } else if (requestUrl.origin === 'https://story-api.dicoding.dev') {
    if (event.request.method === 'GET' || event.request.method === 'HEAD') {
      event.respondWith(
        fetch(event.request)
          .then((networkResponse) => {
            console.log('Serving API from network and caching:', event.request.url);
            const responseToCache = networkResponse.clone();
            
            if (networkResponse.ok) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            console.warn('Network API failed, trying cache for:', event.request.url);
            return caches.match(event.request)
              .then(cachedResponse => {
                if (cachedResponse) {
                  console.log('Serving API from cache:', event.request.url);
                  return cachedResponse;
                }
                console.error('API request failed from both network and cache:', event.request.url);
                return Response.error();
              });
          })
      );
    } else {
      console.log('Non-GET API request, fetching directly:', event.request.url, event.request.method);
      event.respondWith(fetch(event.request));
    }
  } else {
    console.log('Default fetch for:', event.request.url);
    event.respondWith(fetch(event.request));
  }
});


self.addEventListener('push', (event) => {
  console.log('Push event received!', event);
  const data = event.data.json();
  const title = data.title || 'Pesan Baru';
  const options = {
    body: data.body || 'Anda memiliki pesan baru.',
    icon: data.icon || '/icons/icon-192x192.png',
    badge: data.badge || '/icons/badge-72x72.png',
    data: {
      url: data.url || '/',
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data.url;

  event.waitUntil(clients.openWindow(urlToOpen));
});