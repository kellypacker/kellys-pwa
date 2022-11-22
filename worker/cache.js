'use strict'

// Workbox RuntimeCaching config: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.RuntimeCachingEntry
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
  {
    urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'workbox-precache-v2-https://merry-bonbon-pwa.netlify.app/',
      expiration: {
        maxEntries: 500,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      },
      // not working
      matchOptions: {
          ignoreSearch: true
      }
    }
  },
]
