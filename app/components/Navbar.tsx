import { useState } from "react";
import { NavLink } from "react-router";
import { FaLaptopCode, FaTimes, FaBars } from "react-icons/fa";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
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
                        {/* TODO: extract to a component? */}
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

                {/* button to show/hide mobile nav */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        className="text-blue-400 text-xl cursor-pointer"
                        title="Menu"
                        onClick={ () => setMenuOpen((current) => !current)}
                    >
                        { menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                {/* Mobile Nav, hidden for larger screens (md, medium and larger) */}
                { menuOpen && (
                    // TODO: style flex-col so the button stays in the same place and links are under the button in a column?
                    <div className="md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-x-4 space-y-2 text-center">
                        {/* TODO: extract to a component? */}
                        {navLinks.map((navLink) => (
                            <NavLink
                                key={navLink.to}
                                className={({ isActive }) =>
                                    isActive ? navbarActiveClasses : navbarBaseClasses}
                                to={navLink.to}
                                onClick={() => setMenuOpen(false)}
                            >
                                {navLink.label}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
