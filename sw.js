const reviewCache = 'my-cache-1';

self.addEventListener('activate', (event) =>{
    event.waitUntill(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cacheName){
                    return cacheName.startsWith('my-') && cacheNames !== reviewCache
                }).map(function(cacheName){
                    return caches.delete(cacheName);
                })
            );
        })
    );
});


self.addEventListener('install', (event) =>{
    event.waitUntil(
        caches.open(reviewCache).then((cache)=>{
            console.log(cache);
            return cache.addAll(
                [
                    '/',
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

                ]
            );
        }).catch(error => {
            console.log(error);
        })
    );
});




self.addEventListener('fetch', (event) => {
    console.log(event);
        event.respondWith(caches.match(event.request).then((response)=>{
        return response || fetch(event.request)
    })
    );//offline first 
    

});