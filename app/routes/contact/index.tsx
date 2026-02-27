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

function Contact() {
    return (
        <section>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
                📬 Contact Me
            </h2>
        </section>
    );
}

export default Contact;
