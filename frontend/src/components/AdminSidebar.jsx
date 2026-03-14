import {
  FaUser,
  FaHome,
  FaKey,
  FaFileAlt,
  FaTicketAlt,
  FaChartLine,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Logout?")) {
      localStorage.clear();
      navigate("/admin");
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-slate-600 text-white font-semibold"
        : "hover:bg-slate-700 text-gray-200"
    }`;

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div
        className={`fixed md:relative z-50 top-0 left-0 h-full bg-slate-800 text-white flex flex-col justify-between p-5 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64`}
      >
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>

          <nav className="flex flex-col space-y-3">
            <NavLink to="/admin-panel" className={linkClass}>
              <FaHome /> Dashboard
            </NavLink>
            <NavLink to="/admin-panel/users" className={linkClass}>
              <FaUser /> Users
            </NavLink>
            <NavLink to="/admin-panel/tickets" className={linkClass}>
              <FaTicketAlt /> Tickets
            </NavLink>
            <NavLink to="/admin-panel/quotes" className={linkClass}>
              <FaFileAlt /> Quotes
            </NavLink>
            <NavLink to="/admin-panel/visitors" className={linkClass}>
              <FaChartLine /> Visitors
            </NavLink>
            <NavLink to="/admin-panel/change-password" className={linkClass}>
              <FaKey /> Change Password
            </NavLink>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition p-2 rounded-lg mt-5"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default AdminSidebar;