import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import CacheDisplay from '../components/cache-display';

export default function Home() {
  const [activated, setActivated] = useState('not yet');
  const [installed, setInstalled] = useState('not yet');

  useEffect(() => {
    // Listen to the response
    navigator.serviceWorker.onmessage = (event) => {
      if (event.data.type === 'ACTIVATED') {
        setActivated('activated');
      }
      if (event.data.type === 'INSTALLED') {
        setInstalled('installed');
      }
     
    };
  
  }, []);



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
        <h2>activated: {activated}</h2>
        <h2>installed: {installed}</h2>
        <CacheDisplay />

      </main>

    </div>
  )
}
