'use strict'
import {registerRoute} from 'workbox-routing';
import {ExpirationPlugin} from 'workbox-expiration';
import {StaleWhileRevalidate} from 'workbox-strategies';

 /* ignore query string */
 const ignoreQueryStringPlugin = {
    cachedResponseWillBeUsed: async ({
      cacheName,
      request,
      matchOptions,
      cachedResponse,
      event
    }) => {
        console.log('ignoreQueryStringPlugin');
      console.log(request.url);
      if (cachedResponse) {
        return cachedResponse;
      }

      // this will match same url/diff query string where the original failed
      return caches.match(request.url, { ignoreSearch: true });
    }
};

registerRoute(/\/_next\/data\/.+\/.+\.json/i, new StaleWhileRevalidate({
    // cacheName: "workbox-precache-v2-https://merry-bonbon-pwa.netlify.app/",
    cacheName: "workbox-precache-v2-https://localhost:3000/",
    networkTimeoutSeconds: 10,
    matchOptions: {
        ignoreSearch: true
    },
    plugins: [
        new ExpirationPlugin({
            maxEntries: 500,
            maxAgeSeconds: 86400
        }),
        ignoreQueryStringPlugin
    ]
}), "GET")

const fetchCachedNextData = (event) => {
    const url = new URL(event.request.url);
    console.log({event});
    
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
               cache.keys().then((keys) => {
                   // get file name
                   
                   const getFileName = (url) => {
                       const findFile = new RegExp(/\/(.*?).json/gm);
                       const matches = findFile.exec(url);
                       const fileParts = matches[1].split('/');
                       return fileParts[fileParts.length - 1];
                   };
                   const fileName = getFileName(url.href)
                   console.log(fileName);
                   console.log({keys});

                   // find all cached versions of this page
                   const matches = keys.filter(request => {
                       return request.url.includes(fileName);
                   });
                   console.log({matches}, url.href);

                   if (matches.length > 0) {
                        try {
                            // filter out current request
                            // also files with __WB_REVISION__ - not exactly sure what part they play
                            const toDelete = matches.filter(request => {
                                console.log(request.url, url.href);
                                if (request.url.includes('__WB_REVISION__')) {
                                    return false;
                                }
                                if (request.url !== url.href) {
                                    return false;
                                }
                                return true;
                            });
                            console.log({toDelete});
                            if (toDelete.length > 0) {
                                toDelete.forEach((request, index, array) => {
                                    cache.delete(request);
                                });
                            }
                        } catch(e) {
                            console.log(e);
                        }
                   }
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
// self.addEventListener('fetch', (event) => {
//     const url = new URL(event.request.url);
  
//     const isNextData = url.href.includes('/_next/data') && event.request.method !== 'HEAD';
  
//     if (isNextData) {
//       return fetchCachedNextData(event);
//     } else {
//         return;
//     }
//   });
  