import type { Route } from "./+types/index";

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

function Projects() {
    return (
        <section>
            <h2 className="text-3xl text-white font-bold mb-8">
                🚀 Projects
            </h2>
        </section>
    );
}

export default Projects;
