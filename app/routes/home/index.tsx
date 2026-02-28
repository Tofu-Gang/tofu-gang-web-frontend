import type { Route } from "./+types/index";
import Hero from "~/components/Hero";

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
            <Hero />
        </section>
    );
}
