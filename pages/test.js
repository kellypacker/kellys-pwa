import Link from "next/link";
import CacheDisplay from "../components/cache-display";

export default function Test() {
    return (
        <>
            <h1>TEST Offline pwa in safari</h1>
            {/* <h2>
                <Link href="/">Home</Link>
            </h2> */}
            <h2>
                <Link href="/test-nested">TEST nested</Link>
            </h2>
            
            <h2>
                <Link href="/test-slug" >TEST slug</Link>
            </h2>

            <CacheDisplay />
           
        </>
    )
}