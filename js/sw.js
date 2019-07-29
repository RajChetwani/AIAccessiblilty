const cacheName = "v1";
const cacheAssets = [
  "../img/modal/pose_face_hands.gif",
  "../img/modal/sound_classification.jpg",
  "../img/portfolio/accident.jpg",
  "../img/portfolio/accident1.jpg",
  "../img/portfolio/communication.jpg",
  "../img/portfolio/home2.jpg",
  "../img/team/mentor.jpg",
  "../img/team/raj.JPG",
  "../img/team/saket.JPG",
  "../img/team/sugam.JPG",
  "../img/team/sumeet.JPG",
  "../img/header-bg.jpg",
  "../img/map-image.png"
];

// Call Install Event
self.addEventListener("install", e => {
  console.log("Service Worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("Service Worker: Caching Files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener("activate", e => {
  console.log("Service Worker: Activated");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener("fetch", e => {
  console.log("Service Worker: Fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
