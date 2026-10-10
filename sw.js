// يخزن صفحة الإطلاق وأيقوناتها فقط، ولا يخزن بيانات نظام Google Apps Script.
const CACHE = 'gifted-jed-launcher-v1';
const ASSETS = ['./', './index.html', './apple-touch-icon.png', './icon-192.png', './icon-512.png', './manifest.webmanifest'];
self.addEventListener('install', event => {event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))); self.skipWaiting();});
self.addEventListener('activate', event => {event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))); self.clients.claim();});
self.addEventListener('fetch', event => {const url=new URL(event.request.url); if (url.origin !== self.location.origin || event.request.method !== 'GET') return; event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));});
