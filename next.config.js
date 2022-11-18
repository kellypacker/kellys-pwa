// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withPWA = require('next-pwa')
// const runtimeCaching = require('next-pwa/cache')
// const runtimeCaching = require('./worker/cache')

// https://dev.to/sfiquet/precaching-pages-with-next-pwa-31f2#how-to-precache-pages

module.exports = async (phase) => {

  const pwaConfig =  {
    // disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    // dynamicStartUrl: false, // precache home page instead of storing it in runtime cache by default
    runtimeCaching,
    sw: 'sw.js',
  };
  const config = {
    pwa: pwaConfig,
    experimental: {
      scrollRestoration: true,
      // https://docs.uniform.dev/sitecore/deploy/how-tos/how-to-control-nextjs-threads/
      // helps address issue with api erroring out with too many requests
      workerThreads: false,
      cpus: 1,
    }
  };

  const allConfig = {
    ...config,
    nx: {
      svgr: false,
    },
    images: {
      domains: ['moar-prod.imgix.net', 'moar-staging.imgix.net', 'moar-media-staging.s3.amazonaws.com'],
    },
    // this adds the lang="en" to the html tag, but breaks the PWA due to something in the caching. 
    // i18n: {
    //   locales: ["en"],
    //   defaultLocale: "en",
    // },
  };
  // const plugins = [[withNx], [withPWA, pwaConfig]];
  const plugins = [withNx, withPWA];

  const finalConfig = plugins.reduce((acc, plugin) => plugin(acc), { ...allConfig });
  // console.log(finalConfig);
  // return withPlugins([...plugins], allConfig);
  // return withPWA(withNx(allConfig));
  return finalConfig;
}
