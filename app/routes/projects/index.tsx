import type { Route } from "./+types/index";
import type { Project } from "~/types";
import axios, { type AxiosResponse } from "axios";
import ProjectCard from "~/components/ProjectCard";

export function meta({}: Route.MetaArgs) {
    return [
        {
            title: "Tofu Gang | Projects"
        },
        {
            name: "description",
            content: "Projects page"
        }
    ];
}

export async function loader({ request }: Route.LoaderArgs):Promise<{projects: Project[]}> {
    const response: AxiosResponse<Project[]> = await axios.get("http://localhost:8000/projects");
    return { projects: response.data };
}

// TODO: As with layouts, rename to ProjectsPage?
function Projects({ loaderData }: Route.ComponentProps) {
    const { projects } = loaderData as {projects: Project[]};

    return (
        <>
            <h2 className="text-3xl text-white font-bold mb-8">
                🚀 Projects
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
                {projects.map((project: Project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </>
    );
}

export default Projects;
