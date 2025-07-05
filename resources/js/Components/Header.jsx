import { Link } from "@inertiajs/react";
import { Home, Building, Phone, Menu } from "lucide-react";

export default function Header() {
    return (
        <header
            className="navbar bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 px-4 sm:px-6 lg:px-16 py-3 sm:py-4 fixed top-0 z-50 w-full"
            data-theme="light"
        >
            <div className="navbar-start flex-1">
                <Link
                    href="/"
                    className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 font-['Poppins'] hover:text-blue-600 transition-colors"
                >
                    Lilo Apart
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    <li>
                        <Link
                            href="/"
                            className="btn btn-ghost bg-transparent hover:bg-gray-100 rounded-full px-6 text-base font-medium text-gray-700 hover:text-gray-900 transition-all flex items-center gap-2"
                        >
                            <Home size={18} />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/apartments"
                            className="btn btn-ghost bg-transparent hover:bg-gray-100 rounded-full px-6 text-base font-medium text-gray-700 hover:text-gray-900 transition-all flex items-center gap-2"
                        >
                            <Building size={18} />
                            Apartments
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className="btn btn-ghost bg-transparent hover:bg-gray-100 rounded-full px-6 text-base font-medium text-gray-700 hover:text-gray-900 transition-all flex items-center gap-2"
                        >
                            <Phone size={18} />
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="navbar-end flex-none">
                {/* Mobile Menu */}
                <div className="dropdown dropdown-end lg:hidden">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle hover:bg-gray-100 transition-all"
                    >
                        <Menu size={20} className="text-gray-700" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-xl w-52 border border-gray-100"
                    >
                        <li>
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                            >
                                <Home size={16} />
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/apartments"
                                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                            >
                                <Building size={16} />
                                Apartments
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                            >
                                <Phone size={16} />
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
