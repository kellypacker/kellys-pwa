import Link from "next/link";

export default function Test() {
    return (
        <>
        <h1>TEST</h1>

        <h1 className="title">
          <Link href="/test-nested">TEST nested</Link>
        </h1>
        </>
    )
}