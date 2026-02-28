import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
    return [
        {
            title: "Tofu Gang | Contact"
        },
        {
            name: "description",
            content: "Contact page"
        }
    ];
}

// TODO: As with layouts, rename to ContactPage?
function Contact() {
    return (
        <>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
                📬 Contact Me
            </h2>
        </>
    );
}

export default Contact;
