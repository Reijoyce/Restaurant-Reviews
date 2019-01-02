const reviewCache = 'my-cache-1';

self.addEventListener('activate', event =>{
    event.waitUntill(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cacheNames){
                    return cacheNames.startsWith('my-') && cacheNames !== reviewCache
                }).map(function(cacheNames){
                    return caches.delete(cacheNames);
                })
            );
        })
    );
});

self.addEventListener('install', event =>{
    event.waitUntil(
        caches.open(reviewCache).then(function (cache){
            console.log(cache);
            return cache.addAll(
                [
                    '/',
                    './index.html',
                    './manifest.json',
                    './restaurant.html',
                    './css/styles.css',
                    './data/restaurants.json',
                    './img/1.jpg',
                    './img/2.jpg',
                    './img/3.jpg',
                    './img/4.jpg',
                    './img/5.jpg',
                    './img/6.jpg',
                    './img/7.jpg',
                    './img/8.jpg',
                    './img/9.jpg',
                    './img/10.jpg',
                    './js/main.js',
                    './js/restaurant_info.js',
                    './js/dbhelper.js',
                    './icons/icon-120x120.png',
                    './icons/icon-144x144.png',
                    '.icons/icon-152x152.png',
                    './icons/icon-192x192.png'
                ]
            );
        }).catch(error => {
            console.log(error);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
