
const FILES = [
    '/',
    '/index.html',

    '/styles.css',
    '/scripts.js',
    '/favicon.ico',
    '/sw.js',

    '/assets/fonts/nunito-700.ttf',
    '/assets/fonts/nunito-900.ttf',

    '/assets/meta/android-chrome-192x192.png',
    '/assets/meta/android-chrome-512x512.png',
    '/assets/meta/apple-touch-icon.png',
    '/assets/meta/browserconfig.xml',
    '/assets/meta/favicon-32x32.png',
    '/assets/meta/favicon-16x16.png',
    '/assets/meta/site.webmanifest',
    '/assets/meta/safari-pinned-tab.svg',

    '/utils/mm/mm.js',
    '/utils/mm/mm.types.ts',

    '/components/yata-task/yata-task.js',
    '/components/yata-app/yata-app.js',
]

const UUID = `asdasd`

const installFn = async (event) => {
    self.skipWaiting()
    const currentCache = await caches.open(UUID)
    await currentCache.addAll(FILES)
}

const activeFn = async (event) => {}

const fetchFn = async (event) => {
    // try {
        const cache = await caches.open(UUID);
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) return cachedResponse

    //     return cachedResponse
    // } catch (err) {
        const networkResponse = await fetch(event.request);
        return networkResponse
    // }
}

self.addEventListener('install', (event) => event.waitUntil(installFn(event)))
self.addEventListener('active', (event) => event.waitUntil(activeFn(event)))
self.addEventListener('fetch', (event) => event.respondWith(fetchFn(event)))