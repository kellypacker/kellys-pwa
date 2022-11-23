import Link from "next/link";

export default function TestNested() {
    return (
        <>
            <h1>TEST NESTED</h1>

            {/* <h1 className="title">
                <Link href="/">Back to Home</Link>
            </h1> */}
            <h2>
                <Link href="/test">Back to test</Link>
            </h2>
            <h2>
                <Link href="/[slug]" as="/test-slug">Slug</Link>
            </h2>
        </>
    )
}