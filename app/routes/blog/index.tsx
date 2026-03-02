import type { Route } from "./+types/index";
import axios, { type AxiosResponse } from "axios";
import type { PostMeta } from "~/types";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import PostCard from "~/components/PostCard";
import PostFilter from "~/components/PostFilter";

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

export async function loader({ request }: Route.LoaderArgs): Promise<{posts: PostMeta[]}> {
    const url = new URL("/posts-meta.json", request.url);
    const response: AxiosResponse<PostMeta[]> = await axios.get(url.href);

    if(response.status !== 200) {
        // TODO: 404 page here?
        throw new Error("Failed to fetch blog metadata!");
    } else {
        const posts = response.data;
        // sort desc by date (newest first)
        posts.sort((a: PostMeta, b: PostMeta) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        return { posts };
    }
}

// TODO: As with layouts, rename to BlogPage?
function Blog({ loaderData }:Route.ComponentProps) {
    const { posts } = loaderData;

    const [searchQuery, setSearchQuery] = useState("");
    const filteredPosts = posts.filter((post) => {
        const query = searchQuery.toLowerCase();
        return (
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query)
        );
    });

    const [currentPage, setCurrentPage] = useState(1);
    // TODO: move to some sort of global settings?
    const postsPerPage = 2;
    // calculate total pages
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    // get current page blog posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
            <h2 className="text-3xl text-white font-bold mb-8">📝 Blog</h2>
            <PostFilter searchQuery={searchQuery} onSearchChange={(query) => {
                setSearchQuery(query);
                setCurrentPage(1);
            }} />
            <div className="space-y-8">
                {currentPosts.length === 0 ?
                    <p className="text-gray-400 text-center">No posts found</p> :
                    currentPosts.map((post) =>
                        <PostCard key={post.slug} post={post} />
                    )}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
    );
}

export default Blog;
