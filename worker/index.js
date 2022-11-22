'use strict'

const fetchCachedNextData = (event) => {
    const url = new URL(event.request.url);
    

    // e.g.`workbox-precache-v2-http://localhost:4200/`;
    const cacheName = `workbox-precache-v2-${location.origin}/`;
    // match request to cache, also fetch request. 
    // update cache and serve what is available
    event.respondWith(caches.open(cacheName).then((cache) => {
        return caches.match(event.request, {ignoreSearch: true})
            .then((cachedResponse) => {
                const fetchedResponse = fetch(event.request).then((networkResponse) => {
                    cache.put(event.request, networkResponse.clone());
                    
                    return networkResponse;
                });
                if (cachedResponse) {
                    console.log('FOUND', url.href);
                } else {
                    
                    console.log('NOT FOUND', url.href);
                }
    
                return cachedResponse || fetchedResponse;
            }
        );
    }));
  };

// use one fetch to keep track of which fetches are handled
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
  
    const isNextData = url.href.includes('/_next/data');
  
    if (isNextData) {
      return fetchCachedNextData(event);
    } else {
        return;
    }
  });
  