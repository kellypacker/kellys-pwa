import Head from 'next/head';

function OfflinePage() {
    return (
        <>
            <Head>
                <title>next-pwa example</title>
            </Head>
            <div className="bg-red">
                <h1>This is offline fallback page</h1>
                <h2>When offline, any page route will fallback to this page</h2>
            </div>
        </>
    );
}
export default OfflinePage;
