const CACHE_NAME = 'goal-wise-cache-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/logo.svg',
    '/favicon.svg'
];


// Install event: Cache specified resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        }).then(() => self.skipWaiting())
    );
});

// Activate event: Claim clients immediately
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event: Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                // Serve from cache
                return response;
            }

            // Fetch from network and cache the response
            return fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                const responseToCache = networkResponse.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            });
        }).catch(() => {
            // Optional: Provide offline fallback for failed requests
            return //caches.match('/fallback.html');
        })
    );
});


// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const targetUrl = (event.notification.data && event.notification.data.url) || '/';
    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (let client of clientList) {
                if ('focus' in client) {
                    client.navigate(targetUrl).then(() => client.focus());
                    return;
                }
            }
            if (self.clients.openWindow) {
                return self.clients.openWindow(targetUrl);
            }
        })
    );
});

// Push event handler
self.addEventListener('push', (event) => {
    let payload = { title: 'GOAL WISE', body: 'New tips available!' };
    try {
        if (event.data) {
            const parsed = event.data.json();
            if (parsed && typeof parsed === 'object') {
                payload = { ...payload, ...parsed };
            } else {
                payload.body = event.data.text();
            }
        }
    } catch (e) {
        payload.body = event.data ? event.data.text() : payload.body;
    }

    const options = {
        body: payload.body,
        icon: '/logo.svg',
        badge: '/favicon.svg',
        data: { url: payload.url || '/' },
        vibrate: [80, 40, 80],
    };
    event.waitUntil(
        self.registration.showNotification(payload.title, options)
    );
});