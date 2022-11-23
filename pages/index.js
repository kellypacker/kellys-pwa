import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';

export default function Home() {
  const [cacheNames, setCacheNames] = useState();
  const [cache, setCache] = useState();
  const [mainCacheName, setMainCacheName] = useState();

  const handleClear = (e) => {
    e.preventDefault();
    window.workbox.messageSW({
      command: 'log',
      message: 'clear cache',
      action: 'CLEAR_CACHE',
    });
  };
  useEffect(() => {
    if (location) {
      setMainCacheName(`workbox-precache-v2-${location.origin}/`);
    }
  }, []);

  useEffect(() => {
    // Listen to the response
    navigator.serviceWorker.onmessage = (event) => {
      if (event.data.type === 'RETURN_CACHE_NAMES') {
        setCacheNames(event.data.payload);
      }
      if (event.data.type === 'RETURN_CACHE') {
        setCache(event.data.payload);
      }
    };
  
  }, []);

  const handleGetCacheNames = async () => {
    window.workbox.messageSW({
      command: 'log',
      message: 'get cache names',
      action: 'GET_CACHE_NAMES',
    });
  };
  
  const handleGetCache = async () => {
    window.workbox.messageSW({
      command: 'log',
      message: 'get cache',
      action: 'GET_CACHE',
    });
  };

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        /> */}
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="Best PWA App in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          <Link href="/test">PWA Safari offline test</Link>
        </h1>

        <button onClick={handleClear}>Clear Cache</button>
        <button onClick={handleGetCacheNames}>Get Names</button>
        <button onClick={handleGetCache}>List Cache</button>
        <hr />
        <div>
          <ul>
            {cacheNames && cacheNames.map(name => (
              <li>{name}</li>
            ))}
          </ul>
        </div>
        <hr />

        <div>
          <h2>{mainCacheName}</h2>
          {cache && `Records: ${cache.length}`}
          <table><tbody>
            {cache && cache.map(url => (
              <tr key={url}><td>{url}</td></tr>
              ))}
              </tbody>
            </table>
        </div>
      </main>

    </div>
  )
}
