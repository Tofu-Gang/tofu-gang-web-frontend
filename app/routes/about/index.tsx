import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
    return [
        {
            title: "Tofu Gang | About"
        },
        {
            name: "description",
            content: "About page"
        }
    ];
}

// TODO: As with layouts, rename to AboutPage?
function About() {
    return (
        <>
            <h2 className="text-3xl font-bold text-white mb-2">
                Hey, I'm Jakub! 👋
            </h2>
        </>
    );
}

export default About;
