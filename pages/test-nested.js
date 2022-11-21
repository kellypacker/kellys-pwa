import Link from "next/link";

export default function TestNested() {
    return (
        <>
            <h1>TEST NESTED</h1>

            <h1 className="title">
            <Link href="/">Back to Home</Link>
            <Link href="/test">Back to test</Link>
            </h1>
        </>
    )
}