import { NavLink } from "react-router";
import { FaLaptopCode } from "react-icons/fa";

function Navbar() {
    const navbarBaseClasses = "transition hover:text-blue-400 cursor-pointer";
    const navbarActiveClasses = "text-blue-400 font-semibold cursor-default";
    // TODO: move somewhere where it makes sense?
    const navLinks = [
        {
            to: "/",
            label: "Home"
        },
        {
            to: "/projects",
            label: "Projects"
        },
        {
            to: "/blog",
            label: "Blog"
        },
        {
            to: "/about",
            label: "About"
        },
        {
            to: "/contact",
            label: "Contact"
        }
    ]

    return (
        <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* TODO: use NavLink in Pi Generator so active link can be recognized and styled */}
                <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-blue-300">
                    <FaLaptopCode className="text-blue-400 text-xl" />
                    <span>Tofu Gang</span>
                </NavLink>

                {/* Desktop Nav, hidden for mobile (sm, small screen) */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="space-x-4 text-sm text-gray-300">
                        {navLinks.map((navLink) => (
                            <NavLink
                                key={navLink.to}
                                className={({ isActive }) =>
                                    isActive ? navbarActiveClasses : navbarBaseClasses}
                                to={navLink.to}
                            >
                                {navLink.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
