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

function Index() {
    return (
        <section>
            <h2 className="text-3xl font-bold text-white mb-2">
                Hey, I'm Jakub! 👋
            </h2>
        </section>
    );
}

export default Index;
