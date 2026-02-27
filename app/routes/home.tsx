import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        {
            title: "Tofu Gang"
        },
        {
            name: "description",
            content: "Tofu Gang web portfolio"
        }
    ];
}

export default function Home() {
    return (
        <>Tofu Gang Web</>
    );
}
