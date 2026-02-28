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

// TODO: As with layouts, rename to HomePage?
function Home() {
    return (
        <>
            Homepage
        </>
    );
}

export default Home;
