// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')
const runtimeCaching = require('./worker/cache')
const { PHASE_PRODUCTION_BUILD } = require('next/constants')

// https://dev.to/sfiquet/precaching-pages-with-next-pwa-31f2#how-to-precache-pages
module.exports = async (phase) => {

    const config = {
        pwa: {
            mode: 'production'
        },
    }

    const getBuildId = require('./buildid.js');
    const buildId = getBuildId();
    config.generateBuildId = getBuildId;
    const precachedEntries = [
        { "url" : "/test", "revision": buildId },
        { "url" : `/_next/data/${buildId}/test.json`, "revision":null },
        { "url" : "/test-nested", "revision": buildId },
        { "url" : `/_next/data/${buildId}/test-nested.json`, "revision":null }
    ];
    config.pwa.additionalManifestEntries = precachedEntries;

    console.log({config});
  
    return withPWA(config);
}
