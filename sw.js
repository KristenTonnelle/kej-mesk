var filesToCache = [
'index.html',
'km.js',
'stumm.css',
'jquery-1.11.1.js',
'sweetalert.min.js',
'sweetalert.css',
'fonts/EDITORS.ttf',
'fonts/Hamerslag.ttf',
'fonts/LANECANE.ttf',
'fonts/LANENAR_.ttf',
'fonts/monte-cristo.ttf',
'icones/bump.png',
'icones/d_ar_ger.png',
'icones/penaos.png'
];

var cacheName = 'km-1.0';
self.addEventListener('install', function(e){
	e.waitUntil(
		caches.open(cacheName).then (function(cache) {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response || fetch (e.request);
		})
	);
});
