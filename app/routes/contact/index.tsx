import type { Route } from "./+types/index";
import { Form } from "react-router";
import InputField from "~/components/InputField";

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

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const data = Object.fromEntries(
        fields.map(({ name }) => [name, formData.get(name)])
    );
    return { message: "Form submitted successfully", data };
}

// TODO: As with layouts, rename to ContactPage?
function Contact({ actionData }:Route.ComponentProps) {
    return (
        <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
                📬 Contact Me
            </h2>

            {/* TODO: when message appears, avoid moving rest of the form */}
            {actionData?.message &&
                <p className="mb-6 p-4 bg-green-700 text-green-100 text-center rounded-lg border border-green-500 shadow-md">
                    {actionData.message}
                </p>
            }

            <Form method="POST" className="space-y-6">
                {fields.map(({ name, label, type }) =>
                    <InputField key={name} name={name} label={label} type={type} />
                )}
                <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg cursor-pointer">
                    Send Message
                </button>
            </Form>
        </div>
    );
}

export default Contact;
