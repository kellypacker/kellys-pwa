'use strict'

// Workbox RuntimeCaching config: https://developer.chrome.com/docs/workbox/reference/workbox-build/#type-RuntimeCaching
module.exports = [
  {
    urlPattern: /\.(?:js)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-js-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\.(?:css|less)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-style-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      }
    }
  },
//   {
//     urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
//     handler: 'StaleWhileRevalidate',
//     options: {
//       cacheName: 'workbox-precache-v2-https://merry-bonbon-pwa.netlify.app/',
//       expiration: {
//         maxEntries: 200,
//         maxAgeSeconds: 24 * 60 * 60 // 24 hours
//       },
//       // not working
//       matchOptions: {
//           ignoreSearch: true
//       }
//     }
//   },
]
