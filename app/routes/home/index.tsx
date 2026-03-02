import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import type { Project, Post, StrapiProject, StrapiPost } from "~/types";
import axios, { type AxiosResponse } from "axios";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";

export function meta({}: Route.MetaArgs) {
    return [
        {
            title: "Tofu Gang | Welcome"
        },
        {
            name: "description",
            content: "Tofu Gang web portfolio"
        }
    ];
}

export async function loader({ request }: Route.LoaderArgs):Promise<{projects: Project[]; posts: Post[]}> {
    const projectsResponse: AxiosResponse<{data: StrapiProject[]}> =
        await axios.get(`${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`);
    const postsResponse: AxiosResponse<{ data: StrapiPost[] }> =
        await axios.get(`${import.meta.env.VITE_API_URL}/posts?sort[0]=date:desc&populate=*`);

    if(projectsResponse.status !== 200 || postsResponse.status !== 200) {
        throw new Error("Failed to fetch projects or posts");
    } else {
        const projects = projectsResponse.data.data.map(
            (item: StrapiProject) => ({
                id: item.id,
                documentId: item.documentId,
                title: item.title,
                description: item.description,
                image: `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`,
                url: item.url,
                github: item.github,
                blog: item.blog,
                date: item.date,
                category: item.category,
                featured: item.featured
            })
        );
        const posts = postsResponse.data.data.map((item: StrapiPost) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            excerpt: item.excerpt,
            body: item.body,
            date: item.date,
            image: item.image?.url && `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
        }));
        return { projects, posts };
    }
}

// TODO: As with layouts, rename to HomePage?
function Home({ loaderData }: Route.ComponentProps) {
    const { projects, posts } = loaderData as {projects: Project[]; posts: Post[]};

    return (
        <>
            {/* TODO: move count to some sort of global settings? */}
            <FeaturedProjects projects={projects} count={2} />
            <AboutPreview />
            <LatestPosts posts={posts} limit={3} />
        </>
    );
}

export default Home;
