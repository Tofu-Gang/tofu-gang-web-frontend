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
        <div className="max-w-5xl mx-auto px-6 py-16 bg-gray-900">
            {/* Intro */}
            <div className="flex flex-col md:flex-row md:items-start items-center gap-10 mb-12">
                <img
                    src="/images/profile.png"
                    alt="profile"
                    className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md"
                />
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Hey, I'm Jakub! 👋
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate deserunt dicta dolore
                        dolorum ducimus, eligendi, iure magni, odit omnis perferendis quibusdam reiciendis
                        reprehenderit! Amet blanditiis harum nisi tempora veniam.
                    </p>
                </div>
            </div>

            {/* Bio Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Bio</h2>
                <p className="text-gray-300 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere nisi nobis perferendis quaerat
                    voluptatem. Commodi corporis doloribus exercitationem incidunt placeat praesentium quisquam
                    reiciendis sint totam velit. Accusamus eius esse magni?
                </p>
            </div>

            {/* Tech Stack */}
            <h2 className="text-2xl font-semibold text-white mb-4">🚀 Tech I Use</h2>
            <ul className="flex flex-wrap gap-4 text-sm text-gray-300">
                {[
                    "React",
                    "React Router",
                    "JavaScript ECMA 6",
                    "TypeScript",
                    "Python 3",
                    "PySide",
                    "PyQt",
                    "Tailwind CSS",
                    "Node.js",
                    "MongoDB",
                    "PostgreSQL"
                ].map((tech) => (
                    <li key={tech} className='bg-gray-700 px-3 py-1 rounded-md'>
                        {tech}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default About;
