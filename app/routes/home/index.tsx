import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import type {Project} from "~/types";
import axios, {type AxiosResponse} from "axios";

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

export async function loader({ request }: Route.LoaderArgs):Promise<{projects: Project[]}> {
    const response: AxiosResponse<Project[]> = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
    return { projects: response.data.filter((project) => project.featured) };
}

// TODO: As with layouts, rename to HomePage?
function Home({ loaderData }: Route.ComponentProps) {
    const { projects } = loaderData as {projects: Project[]};

    return (
        <>
            {/* TODO: move count to some sort of global settings? */}
            <FeaturedProjects projects={projects} count={2} />
        </>
    );
}

export default Home;
