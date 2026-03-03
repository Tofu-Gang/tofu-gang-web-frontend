import type { Route } from "./+types/index";
import InputField from "~/components/InputField";

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
    // TODO: move to some global constants?
    const fields = [
        {
            name: "name",
            label: "Full Name",
            type: "text"
        },
        {
            name: "email",
            label: "Email",
            type: "email"
        },
        {
            name: "subject",
            label: "Subject",
            type: "text"
        },
        {
            name: "message",
            label: "Message",
            type: "textarea"
        }
    ];

    return (
        <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
                📬 Contact Me
            </h2>

            {/* TODO: clear the form after submission */}
            <form action={import.meta.env.VITE_FORMSPREE_API_URL} method="POST" className="space-y-6">
                {fields.map(({ name, label, type }) =>
                    <InputField key={name} name={name} label={label} type={type} />
                )}
                <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg cursor-pointer">
                    Send Message
                </button>
            </form>
        </div>
    );
}

export default Contact;
