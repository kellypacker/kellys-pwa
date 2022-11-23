import Link from "next/link";

export const getStaticPaths = async () => {
    return {
        paths: [{ params: { slug: 'test-slug' } }],
        fallback: true,
    };
};

export const getStaticProps = async ({ params = {}, preview = false }) => {
    const slug = String(params.slug);

    return {
        props: {
            slug,
        },
    };
};

export default function TestNested(props) {
    const {slug} = props;
    return (
        <>
            <h1>TEST {slug}</h1>

            <h2>uhhhhh</h2>

            <h2>
                <Link href="/">Home</Link>
            </h2>
            <h2>
                <Link href="/test">Back to test</Link>
            </h2>
            <h2>
                <Link href="/test">To nested</Link>
            </h2>
        </>
    )
}