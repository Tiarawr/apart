import { Link } from "@inertiajs/react";
import {
    Home,
    Building,
    Phone,
    Menu,
    User,
    Settings,
    LayoutDashboard,
    LogOut,
    LogIn,
} from "lucide-react";

export default function Header({ auth }) {
    return (
        <header
            className="navbar bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 px-4 lg:px-16 py-4 fixed top-0 z-50"
            data-theme="light"
        >
            <div className="navbar-start">
                <Link
                    href="/"
                    className="text-2xl lg:text-3xl font-bold text-gray-900 font-['Poppins'] hover:text-blue-600 transition-colors"
                >
                    Lilo apart
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

            <div className="navbar-end">
                {auth.user ? (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar hover:bg-gray-100 transition-all"
                        >
                            <div className="w-10 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-all">
                                <img
                                    alt="User"
                                    src={`https://ui-avatars.com/api/?name=${auth.user.name}&background=1e1e1e&color=fff`}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-xl w-52 border border-gray-100"
                        >
                            <li>
                                <Link
                                    href={route("dashboard")}
                                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                                >
                                    <LayoutDashboard size={16} />
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("profile.edit")}
                                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                                >
                                    <Settings size={16} />
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link
                            href={route("login")}
                            className="btn bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 font-medium border-none transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                            Login
                        </Link>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            <div className="dropdown lg:hidden">
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
                    {!auth.user && (
                        <li>
                            <Link
                                href={route("login")}
                                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                            >
                                <LogIn size={16} />
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
}
