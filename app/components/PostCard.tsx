import type { Post } from "~/types";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";

function PostCard({ post }: { post: Post }) {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        // This forces a rerender, so the date is rendered the second time but not the first
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    return (
        <article className="bg-gray-800 mb-4 p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold text-blue-400">{post.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{new Date(post.date).toDateString()}</p>
            {post.image && (
                <img src={post.image} alt={post.slug} className="w-full h-48 object-cover rounded mb-4" />
            )}
            <p className="text-gray-300 mb-4">{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="text-blue-300 text-sm hover:underline">
                Read More <FaArrowRight className="inline" />
            </Link>
        </article>
    );
}

export default PostCard;
