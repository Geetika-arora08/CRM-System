import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0b1120]/90 backdrop-blur-md text-white sticky top-0 z-50 border-b border-slate-800">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-amber-400"
        >
          CRM
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">

          <Link
            to="/register"
            className="hover:text-amber-400 transition"
          >
            SIGN UP
          </Link>

          <Link
            to="/login"
            className="hover:text-amber-400 transition"
          >
            LOGIN
          </Link>

          <Link
            to="/admin"
            className="bg-amber-400 text-black px-5 py-2 rounded-lg hover:bg-amber-300 transition shadow"
          >
            ADMIN
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0b1120] border-t border-slate-800">

          <div className="flex flex-col items-center py-6 gap-6 text-sm font-semibold">

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="hover:text-amber-400"
            >
              SIGN UP
            </Link>

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="hover:text-amber-400"
            >
              LOGIN
            </Link>

            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="bg-amber-400 text-black px-5 py-2 rounded-lg hover:bg-amber-300 transition shadow"
            >
              ADMIN
            </Link>

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;