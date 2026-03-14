import {FaUser, FaFileAlt, FaTicketAlt, FaChartLine} from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    visitors: 0,
    users: 0,
    quotes: 0,
    tickets: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/admin");

      try {
        const { data } = await api.get("/admin/dashboard");

        setMessage(data.message);
        localStorage.setItem("adminName", data.user.name);
        setStats(data.stats);

      } catch (error) {
        console.error(error);
        navigate("/admin");
      }finally {
      setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Main Content */}
      <div className="flex-1 p-10">
     <h1 className="text-3xl font-bold mb-2">
  {message}
</h1>
        {/* <p className="text-gray-600 mb-8">{message}</p> */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          <StatCard
            icon={<FaChartLine size={28} />}
            title="Visitors"
            value={stats.visitors}
            color="bg-teal-500"
            onClick={() => navigate("/admin-panel/visitors")}
          />

          <StatCard
            icon={<FaUser size={28} />}
            title="Users"
            value={stats.users}
            color="bg-amber-500"
            onClick={() => navigate("/admin-panel/users")}
          />

          <StatCard
            icon={<FaFileAlt size={28} />}
            title="Quotes"
            value={stats.quotes}
            color="bg-blue-500"
            onClick={() => navigate("/admin-panel/quotes")}
          />

          <StatCard
            icon={<FaTicketAlt size={28} />}
            title="Tickets"
            value={stats.tickets}
            color="bg-red-500"
            onClick={() => navigate("/admin-panel/tickets")}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

/* ================= Components ================= */

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
        isActive
          ? "bg-slate-600"
          : "hover:bg-slate-700"
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

const StatCard = ({ icon, title, value, color, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition transform hover:-translate-y-1"
  >
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-lg text-white mb-4 ${color}`}
    >
      {icon}
    </div>
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);
 