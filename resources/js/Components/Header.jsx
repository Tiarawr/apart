import { Link } from "@inertiajs/react";
import { Home, Building, Phone, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 fixed top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 font-['Poppins'] hover:text-blue-600 transition-colors"
            >
              Lilo Apart
            </Link>
          </div>

          {/* Navigation - Center (Desktop) */}
          <div className="hidden lg:flex flex-1 justify-center">
            <nav className="flex items-center space-x-8">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all"
              >
                <Home size={18} />
                Home
              </Link>
              <Link
                href="/apartments"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all"
              >
                <Building size={18} />
                Apartments
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all"
              >
                <Phone size={18} />
                Contact
              </Link>
            </nav>
          </div>

          {/* Mobile Menu Button - Right */}
          <div className="lg:hidden">
            <div className="dropdown dropdown-end">
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

          {/* Spacer for balance on desktop */}
          <div className="hidden lg:block flex-shrink-0 w-16">
            {/* Empty div to balance the logo */}
          </div>
        </div>
      </div>
    </header>
  );
}
