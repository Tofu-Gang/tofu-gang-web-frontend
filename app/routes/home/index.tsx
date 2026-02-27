import type { Route } from "./+types/index";

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

export default function Index() {
    return (
        <section>
            Tofu Gang Web
        </section>
    );
}
