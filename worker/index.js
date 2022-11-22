'use strict'

const fetchCachedNextData = (event) => {
    const url = new URL(event.request.url);
    
    // e.g.`workbox-precache-v2-http://localhost:4200/`;
    const cacheName = `workbox-precache-v2-${location.origin}/`;
    
   

    // match request to cache, also fetch request. 
    // update cache and serve what is available
    event.respondWith(caches.open(cacheName).then((cache) => {

        

        return cache.matchAll(event.request, {ignoreSearch: true})
            .then((responses) => {

                const cachedResponse = responses[0];
                // fetch response to update cache
                const fetchedResponse = fetch(event.request).then((networkResponse) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
                // remove older versions of the page
            //    cache.keys().then((keys) => {
            //        // get file name
                   
            //        const getFileName = (url) => {
            //            const findFile = new RegExp(/\/(.*?).json/gm);
            //            const matches = findFile.exec(url);
            //            const fileParts = matches[1].split('/');
            //            return fileParts[fileParts.length - 1];
            //        };
            //        const fileName = getFileName(url.href)
            //        console.log(fileName);
            //        console.log({keys});

            //        // find all cached versions of this page
            //        const matches = keys.filter(request => {
            //            return request.url.includes(fileName);
            //        });
            //        console.log({matches});

            //        if (matches.length > 1) {
            //            // filter out current request
            //            // also files with __WB_REVISION__ - not exactly sure what part they play
            //            const toDelete = matches.filter(request => {
            //                return (cachedResponse && request.url !== cachedResponse.url) || (fetchedResponse && request.url !== fetchedResponse.url);
            //            });
            //            console.log(toDelete);
            //            toDelete.forEach((request, index, array) => {
            //                cache.delete(request);
            //            });
            //        }
            //    });

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
  