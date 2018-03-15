var filesToCache = [
'index.html',
'km.js',
'stumm.css',
'jquery-3.3.1.min.js',
'sweetalert.min.js',
'sweetalert.css',
'fonts/LANENAR_.ttf',
'icones/bump.png',
'icones/d_ar_ger.png',
'icones/penaos.png'
];

var cacheName = 'km-0.3';
self.addEventListener('install', function(e){
	e.waitUntil(
		caches.open(cacheName).then (function(cache) {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response || fetch (e.request);
		})
	);
});
