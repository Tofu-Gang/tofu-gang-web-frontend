import type { Route } from "./+types/details";
import type { Project, StrapiProject, StrapiResponse } from "~/types";
import axios, { type AxiosResponse } from "axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs):Promise<{ project: Project }> {
    const { id } = params;
    const response: AxiosResponse<StrapiResponse<StrapiProject>> = await axios.get(`${import.meta.env.VITE_API_URL}/projects?filters[documentId][$eq]=${id}&populate=*`);
    if(response.status !== 200) {
        // TODO: 404 page here?
        throw new Response("Project not found", { status: 404 });
    } else {
        const item: StrapiProject = response.data.data[0];
        const project: Project = {
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
        }
        return { project };
    }
}

// TODO: As with layouts, rename to ProjectDetailsPage?
function ProjectDetails({ loaderData }:Route.ComponentProps) {
    const { project } = loaderData;

    return (
        <>
            <Link
                to="/projects"
                className="flex items-center text-blue-400 hover:text-blue-500 mb-6"
            >
                <FaArrowLeft className="mr-2" /> Back To Projects
            </Link>
            <div className="grid gap-8 md:grid-cols-2 items-start">
                <div>
                    <img src={project.image} alt={project.title} className="w-full rounded-lg shadow-md" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-blue-400 mb-4">{project.title}</h1>
                    <p className="text-gray-300 text-sm mb-4">{new Date(project.date).toLocaleDateString()} • {project.category}</p>
                    <p className="text-gray-200 mb-6">{project.description}</p>
                    <a
                        href={project.github}
                        target="_blank"
                        className="flex items-center text-blue-400 hover:text-blue-500 mb-6"
                    >
                        Github Repository <FaArrowRight className="inline ml-2" />
                    </a>
                    <Link to={`/blog/${project.blog}`} className="flex items-center text-blue-400 hover:text-blue-500 mb-6">
                        Blog Post <FaArrowRight className="inline ml-2" />
                    </Link>
                    <a
                        href={project.url}
                        target="_blank"
                        className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition"
                    >
                        View Live Site <FaArrowRight className="inline mb-1" />
                    </a>
                </div>
            </div>
        </>
    );
}

export default ProjectDetails;
