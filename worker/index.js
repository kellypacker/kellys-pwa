'use strict'

const fetchCachedNextData = (event) => {
    const url = new URL(event.request.url);
    
    // get file name
    const findFile = new RegExp(/\/(.*?).json/gm);
    const matches = findFile.exec(url.href);
    const fileParts = matches[1].split('/');
    const fileName = fileParts[fileParts.length - 1];
    console.log(fileName);
    // e.g.`workbox-precache-v2-http://localhost:4200/`;
    const cacheName = `workbox-precache-v2-${location.origin}/`;

    // remove older versions of the page
    cache.keys().then((keys) => {
        console.log({keys});
        const matches = keys.filter(request => {
            return request.url.includes(fileName);
        });
        console.log({matches});

        if (matches.length > 1) {
            // filter out current request
            // also files with __WB_REVISION__ - not exactly sure what part they play
            const toDelete = matches.filter(request => {
                return request.url !== cachedResponse.url;
            });
            console.log(toDelete);
            toDelete.forEach((request, index, array) => {
                cache.delete(request);
            });
        }
    });

    // match request to cache, also fetch request. 
    // update cache and serve what is available
    event.respondWith(caches.open(cacheName).then((cache) => {
        return cache.matchAll(event.request, {ignoreSearch: true})
            .then((responses) => {

                const cachedResponse = responses[0];
                if (responses.length > 0) {

                }
                // delete other matches
                console.log({responses});
                // for (const response of responses) {
                //     cache.delete(response);
                // }
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
  