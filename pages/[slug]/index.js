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

            <h1 className="title">
                <Link href="/">Back to Home</Link>
                <Link href="/test">Back to test</Link>
            </h1>
        </>
    )
}