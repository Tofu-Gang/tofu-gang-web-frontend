import type { Route } from "./+types/index";
import type { Project } from "~/types";
import axios, { type AxiosResponse } from "axios";
import { useState } from "react";
import ProjectCard from "~/components/ProjectCard";
import Pagination from "~/components/Pagination";

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
    const [currentPage, setCurrentPage] = useState(1);
    // TODO: move to some sort of global settings?
    const projectsPerPage = 2;
    // calculate total pages
    const totalPages = Math.ceil(projects.length / projectsPerPage);
    // get current page projects
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    return (
        <>
            <h2 className="text-3xl text-white font-bold mb-8">
                🚀 Projects
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
                {currentProjects.map((project: Project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </>
    );
}

export default Projects;
