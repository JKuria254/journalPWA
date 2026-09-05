const CACHE='tradelab-v5';
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll([
    '/journalPWA/',
    '/journalPWA/index.html',
    '/journalPWA/manifest.json',
    '/journalPWA/icon-192.png',
    '/journalPWA/icon-512.png'
  ])));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); });
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
