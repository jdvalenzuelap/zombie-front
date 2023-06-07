const nombreCache = 'cache1'
const arregloUrls = [
    "/",
    "index",
    "mapa"
]
self.addEventListener('install', evt => {
    caches.open(nombreCache).then(cache => {
        cache.addAll(arregloUrls)
    })
})

self.addEventListener('activate', evt => {
    console.log('Activado!', evt);
})

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheResponse => cacheResponse || fetch(evt.request))
    )
})