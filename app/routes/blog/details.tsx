import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/details";
import type { Post, StrapiResponse, StrapiPost } from "~/types";
import axios, { type AxiosResponse } from "axios";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

export async function loader({ request, params }: Route.LoaderArgs) {
    const { slug } = params;
    const response: AxiosResponse<StrapiResponse<StrapiPost>> =
        await axios.get(`${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=image`);

    if(response.status !== 200) {
        // TODO: 404 page here?
        throw new Error("Failed to fetch blog metadata!");
    } else {
        const item: StrapiPost = response.data.data[0];
        const post = {
            id: item.id,
            title: item.title,
            slug: item.slug,
            excerpt: item.excerpt,
            body: item.body,
            date: item.date,
            image: item.image?.url && `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
        }
        return { post };
    }
}

type BlogPostDetailsProps = {
    loaderData: {
        post: Post;
    }
}

// TODO: As with layouts, rename to BlogPostDetailsPage?
function BlogPostDetails({ loaderData }: BlogPostDetailsProps) {
    const { post } = loaderData;

    return (
        <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
            <h1 className="text-3xl font-bold text-blue-400 mb-2">{post.title}</h1>
            <p className="text-sm text-gray-400 mb-6">{new Date(post.date).toDateString()}</p>

            {post?.image && (
                <img src={post.image} alt={post.slug} className="w-full h-64 object-cover mb-4" />
            )}

            <div className="max-w-none mb-12 prose prose-invert">
                <ReactMarkdown>{post.body}</ReactMarkdown>
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
