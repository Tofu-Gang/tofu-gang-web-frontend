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

function Blog() {
    return (
        <section>
            <h2 className="text-3xl text-white font-bold mb-8">
                📝 Blog
            </h2>
        </section>
    );
}

export default Blog;
