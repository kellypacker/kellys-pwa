import Link from "next/link";

export default function Test() {
    return (
        <>
            <h1>TEST Offline pwa in safari</h1>

            <h1>
                <Link href="/test-nested">TEST nested</Link>
            </h1>
            
            <h1>
                <Link href="/test-slug">TEST slug</Link>
            </h1>
        </>
    )
}