import { useEffect, useState } from "react";

function CacheDisplay() {
    const [cacheNames, setCacheNames] = useState();
    const [cacheStartUrl, setCacheStartUrl] = useState(['not retrieved']);
    const [cacheNextData, setCacheNextData] = useState(['not retrieved']);
    const [cache, setCache] = useState(['not retrieved']);
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
        if (event.data.type === 'RETURN_CACHE_START_URL') {
          setCacheStartUrl(event.data.payload);
        }
        if (event.data.type === 'RETURN_CACHE_NEXT_DATA') {
          setCacheNextData(event.data.payload);
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
    const handleGetCacheStartUrl = async () => {
      window.workbox.messageSW({
        command: 'log',
        message: 'get cache start url',
        action: 'GET_CACHE_START_URL',
      });
    };
    const handleGetCacheNextData = async () => {
      window.workbox.messageSW({
        command: 'log',
        message: 'get cache next data',
        action: 'GET_CACHE_NEXT_DATA',
      });
    };

    return (
        <>
            {/* <button onClick={handleClear}>Clear Cache</button> */}
            
            
            <hr />
            <div>
                <h2>Cache names:</h2>
                <button style={{padding: '10px', display: 'block'}} onClick={handleGetCacheNames}>List Cache Names</button>
                <ul>
                    {cacheNames && cacheNames.map(name => (
                        <li>{name}</li>
                    ))}
                </ul>
            </div>
            <hr />

            <div>
                <h2>Cache: start-url</h2>
                <button style={{padding: '10px', display: 'block'}} onClick={handleGetCacheStartUrl}>List Cache start url</button>
                {cacheStartUrl &&  cacheStartUrl[0] !== 'not retrieved' && `Records: ${cacheStartUrl.length}`}
                <table><tbody>
                    {cacheStartUrl && cacheStartUrl.map(url => (
                        <tr key={url}><td>{url}</td></tr>
                    ))}
                </tbody>
                </table>
            </div>
            <hr />

            <div>
                <h2>Prefetch Cache: {mainCacheName}</h2>
                <button style={{padding: '10px', display: 'block'}} onClick={handleGetCache}>List Cache precache</button>
                {cache && cache[0] !== 'not retrieved' && `Records: ${cache.length}`}
                <table><tbody>
                    {cache && cache.map(url => (
                        <tr key={url}><td>{url}</td></tr>
                    ))}
                </tbody>
                </table>
            </div>
        </>
    )
}

export default CacheDisplay