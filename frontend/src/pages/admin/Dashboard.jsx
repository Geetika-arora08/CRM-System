import { FaUser, FaFileAlt, FaTicketAlt, FaChartLine } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    visitors: 0,
    users: 0,
    quotes: 0,
    tickets: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/admin");
        return;
      }

      try {
        const res = await api.get("/auth/admindashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.stats) setStats(res.data.stats);
      } catch (err) {
        console.error(err);
        navigate("/admin");
      }
    };

    fetchAdminData();
  }, [navigate]);

  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <FaChartLine size={28} className="text-teal-500" />
          <p className="text-gray-500 mt-4">Overall Visitors</p>
          <h2 className="text-3xl font-bold mt-1">{stats.visitors}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <FaUser size={28} className="text-yellow-500" />
          <p className="text-gray-500 mt-4">Registered Users</p>
          <h2 className="text-3xl font-bold mt-1">{stats.users}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <FaFileAlt size={28} className="text-blue-500" />
          <p className="text-gray-500 mt-4">Quote Requests</p>
          <h2 className="text-3xl font-bold mt-1">{stats.quotes}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <FaTicketAlt size={28} className="text-red-500" />
          <p className="text-gray-500 mt-4">Overall Tickets</p>
          <h2 className="text-3xl font-bold mt-1">{stats.tickets}</h2>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => navigate('/admin/users')} className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
            View Users
          </button>

          <button onClick={() => navigate('/admin/tickets')} className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
            Manage Tickets
          </button>

          <button onClick={() => navigate('/admin/quotes')} className="bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition">
            View Quotes
          </button>
        </div>
      </div>

      {/* Activity Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-500 text-sm">Recent registrations, tickets and quote activity will appear here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
