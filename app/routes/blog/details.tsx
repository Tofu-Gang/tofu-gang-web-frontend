import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/details";
import type { PostMeta } from "~/types";
import axios, { type AxiosResponse } from "axios";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

export async function loader({ request, params }: Route.LoaderArgs) {
    const { slug } = params;
    const url = new URL("/posts-meta.json", request.url);
    const response: AxiosResponse<PostMeta[]> = await axios.get(url.href);

    if(response.status !== 200) {
        // TODO: 404 page here?
        throw new Error("Failed to fetch blog metadata!");
    } else {
        const postMeta = response.data.find((post: PostMeta) => post.slug === slug);

        if(!postMeta) {
            // TODO: 404 page here?
            throw new Response(`Post ${slug} not found!`, { status: 404 });
        } else {
            // dynamically import raw markdown
            const markdown = await import(`../../posts/${slug}.md?raw`);
            return { postMeta, markdown: markdown.default };
        }
    }
}

type BlogPostDetailsProps = {
    loaderData: {
        postMeta: PostMeta;
        markdown: string;
    }
}

// TODO: As with layouts, rename to BlogPostDetailsPage?
function BlogPostDetails({ loaderData }: BlogPostDetailsProps) {
    const { postMeta, markdown } = loaderData;

    return (
        <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
            <h1 className="text-3xl font-bold text-blue-400 mb-2">{postMeta.title}</h1>
            <p className="text-sm text-gray-400 mb-6">{new Date(postMeta.date).toDateString()}</p>

            <div className="max-w-none mb-12 prose prose-invert">
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>

            <Link
                to={"/blog"}
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                <FaArrowLeft className="inline mb-1" /> Back To Posts
            </Link>
        </div>
    );
}

export default BlogPostDetails;
