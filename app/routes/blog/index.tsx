import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
    return [
        {
            title: "Tofu Gang | Blog"
        },
        {
            name: "description",
            content: "Blog page"
        }
    ];
}

// TODO: As with layouts, rename to BlogPage?
function Blog() {
    return (
        <>
            <h2 className="text-3xl text-white font-bold mb-8">
                📝 Blog
            </h2>
        </>
    );
}

export default Blog;
