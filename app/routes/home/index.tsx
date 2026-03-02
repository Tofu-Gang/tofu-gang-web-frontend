import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import type { Project, PostMeta } from "~/types";
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

export async function loader({ request }: Route.LoaderArgs):Promise<{projects: Project[]; posts: PostMeta[]}> {
    const projectsResponse: AxiosResponse<Project[]> = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
    const url = new URL("/posts-meta.json", request.url);
    const postsResponse: AxiosResponse<PostMeta[]> = await axios.get(url.href);

    if(projectsResponse.status !== 200 || postsResponse.status !== 200) {
        throw new Error("Failed to fetch projects or posts");
    } else {
        const projects = projectsResponse.data.filter((project) => project.featured);
        const posts = postsResponse.data;
        // sort desc by date (newest first)
        posts.sort((a: PostMeta, b: PostMeta) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        return { projects, posts };
    }
}

// TODO: As with layouts, rename to HomePage?
function Home({ loaderData }: Route.ComponentProps) {
    const { projects, posts } = loaderData as {projects: Project[]; posts: PostMeta[]};

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
