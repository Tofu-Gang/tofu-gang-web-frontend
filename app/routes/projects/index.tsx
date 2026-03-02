import type { Route } from "./+types/index";
import type { Project, StrapiProject } from "~/types";
import axios, { type AxiosResponse } from "axios";
import { useState } from "react";
import ProjectCard from "~/components/ProjectCard";
import Pagination from "~/components/Pagination";
import CategoryFilter from "~/components/CategoryFilter";
import { AnimatePresence, motion } from "framer-motion";

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
    const response: AxiosResponse<{data: StrapiProject[]}> = await axios.get(`${import.meta.env.VITE_API_URL}/projects?populate=*`);
    const projects = response.data.data.map((item: StrapiProject) => ({
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
    }));
    return { projects };
}

// TODO: As with layouts, rename to ProjectsPage?
function Projects({ loaderData }: Route.ComponentProps) {
    const { projects } = loaderData as {projects: Project[]};
    // TODO: move "All" to some sort of global settings/constants?
    const [selectedCategory, setSelectedCategory] = useState("All");
    // get unique categories
    const categories = ["All", ...new Set(projects.map((project) => project.category))];
    // filter projects based on selected category
    const filteredProjects = selectedCategory === "All" ?
        projects :
        projects.filter((project) => project.category === selectedCategory);

    const [currentPage, setCurrentPage] = useState(1);
    // TODO: move to some sort of global settings?
    const projectsPerPage = 2;
    // calculate total pages
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    // get current page projects
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    return (
        <>
            <h2 className="text-3xl text-white font-bold mb-8">
                🚀 Projects
            </h2>

            <CategoryFilter categories={categories} selectedCategory={selectedCategory} onCategoryChange={(category) => {
                setSelectedCategory(category);
                setCurrentPage(1);
            }} />

            <AnimatePresence mode="wait">
                <motion.div layout className="grid gap-6 sm:grid-cols-2">
                    {currentProjects.map((project: Project) => (
                        <motion.div key={project.id} layout>
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </>
    );
}

export default Projects;
