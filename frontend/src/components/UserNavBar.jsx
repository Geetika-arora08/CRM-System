import {
  FaUser,
  FaHome,
  FaKey,
  FaFileAlt,
  FaHistory,
  FaTicketAlt,
  FaEye,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const UserNavBar = ({ userName, email, open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  const navItemClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition 
     ${
       location.pathname === path
         ? "bg-amber-400 text-black font-semibold"
         : "hover:bg-amber-500/20 text-gray-200"
     }`;

  return (
    <>
      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen w-56 bg-[#0f172a] text-white p-5 flex flex-col font-sans z-40
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo - hidden on md+ to avoid duplicate header */}
        <div className="mb-8 text-center md:hidden">
          <h2 className="text-2xl font-bold text-amber-400">CRM</h2>
          <span className="text-xs tracking-wider text-gray-400 opacity-80">
            USER PORTAL
          </span>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg mb-8">
          <FaUser className="text-3xl text-amber-400" />
          <div className="truncate">
            <p className="text-sm text-gray-300">Welcome</p>
            <p className="font-bold text-lg text-white truncate">{userName || "User"}</p>
            <p className="text-xs text-gray-400 truncate">{email}</p>
            <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-400 inline-block"></span> Online
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col flex-1 gap-1">
          <div className={navItemClass("/userdashboard")} onClick={() => { navigate("/userdashboard"); setOpen(false); }}>
            <FaHome /> Dashboard
          </div>
          <div className={navItemClass("/changepassword")} onClick={() => { navigate("/changepassword"); setOpen(false); }}>
            <FaKey /> Change Password
          </div>
          <div className={navItemClass("/profile")} onClick={() => { navigate("/profile"); setOpen(false); }}>
            <FaUser /> Profile
          </div>
          <div className={navItemClass("/requestquote")} onClick={() => { navigate("/requestquote"); setOpen(false); }}>
            <FaFileAlt /> Request a Quote
          </div>
          <div className={navItemClass("/quotehistory")} onClick={() => { navigate("/quotehistory"); setOpen(false); }}>
            <FaHistory /> Quotes History
          </div>
          <div className={navItemClass("/createticket")} onClick={() => { navigate("/createticket"); setOpen(false); }}>
            <FaTicketAlt /> Create Ticket
          </div>
          <div className={navItemClass("/my-tickets")} onClick={() => { navigate("/my-tickets"); setOpen(false); }}>
            <FaEye /> View Ticket
          </div>

          {/* Logout */}
          <div
            className="mt-auto flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-red-400 hover:bg-red-500 hover:text-white transition"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </div>
        </nav>
      </div>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default UserNavBar;