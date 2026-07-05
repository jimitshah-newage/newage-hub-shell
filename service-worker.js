// Minimal service worker.
//
// Its only job here is to satisfy PWABuilder's installability
// requirement so it can package an Android app from this shell.
// It intentionally does NOT cache or serve any app content — the real
// dashboard lives entirely on Google Apps Script, not on this page, so
// there's nothing meaningful for this shell to work offline.

self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  // Pass every request straight through to the network.
  event.respondWith(
    fetch(event.request).catch(function () {
      return new Response('You appear to be offline.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain' }
      });
    })
  );
});
