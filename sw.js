let mySiteCache = 'my-site';

self.addEventListener('activate', event =>{
    event.waitUntill(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cacheNames){
                    return cacheNames.startsWith('my-') && cacheNames !== mySiteCache
                }).map(function(cacheNames){
                    return caches.delete(cacheNames);
                })
            )
        })
    )
})

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheNames).then(function (cache) {
            return cache.addAll(
                [
                    'manifest.json',
                    'restaurant.html',
                    '/css/styles.css',
                    '/data/restaurants.json',
                    '/Restaurant-reviews/img/1.jpg',
                    '/Restaurant-reviews/img/2.jpg',
                    '/Restaurant-reviews/img/3.jpg',
                    '/Restaurant-reviews/img/4.jpg',
                    '/Restaurant-reviews/img/5.jpg',
                    '/Restaurant-reviews/img/6.jpg',
                    '/Restaurant-reviews/img/7.jpg',
                    '/Restaurant-reviews/img/8.jpg',
                    '/Restaurant-reviews/img/9.jpg',
                    '/Restaurant-reviews/img/10.jpg',
                    '/js/main.js',
                    '/js/restaurant_info.js',
                    '/js/dbhelper.js',
                    '/icons/icon-120x120.png',
                    '/icons/icon-144x144.png',
                    '/icons/icon-152x152.png',
                    '/icons/icon-192x192.png',
                    '/',
                    'index.html',
                ]
            );
        }).catch(error => {
            console.log(error);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open(mySiteCache).then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  });
