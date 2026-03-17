import { useEffect, useState } from "react";
import api from "../../api";
import UserNavBar from "../../components/UserNavBar";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [stats, setStats] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingTickets, setLoadingTickets] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [userName, setUserName] = useState(storedUser?.name || "");
  const [email, setEmail] = useState(storedUser?.email || "");

  // Sidebar open state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch dashboard data
  const fetchDashboard = async () => {
    try {
      const res = await api.get("/users/userdashboard");
      console.log(res.data); 
      if (res.data.success) {
        setUserName(res.data.data.name);
        setEmail(res.data.data.email);
        setStats(res.data.stats);
      }
    } catch (err) {
      console.log("Dashboard fetch error:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  // Fetch tickets data
  const fetchTickets = async () => {
    try {
      const res = await api.get("/tickets/mytickets");
      setTickets(res.data);
    } catch (err) {
      console.log("Tickets fetch error:", err);
    } finally {
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchTickets();
  }, []);

  const getStatusStyle = (status) => {
    if (status === "open") return "bg-orange-100 text-orange-600";
    if (status === "closed") return "bg-green-100 text-green-600";
    return "bg-blue-100 text-blue-600";
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden flex">
      {/* Sidebar */}
      <UserNavBar userName={userName} email={email} open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300
          ${sidebarOpen ? "opacity-50 md:opacity-100" : "opacity-100"}
          md:ml-56`}
      >
        {/* Mobile topbar with hamburger */}
        <div className="md:hidden flex items-center justify-between bg-white shadow p-4">
          <button
            className="text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-8">
            {userName && (
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Welcome to your Dashboard, {userName} 👋
              </h1>
            )}
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Here’s what’s happening with your account today.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Link to="/quotehistory">
              <div className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer min-h-[120px]">
                <p className="text-gray-500 text-sm">Total Quotes</p>
                <h2 className="text-3xl font-bold text-[#299479] mt-2">
                  {loadingStats ? "..." : stats?.totalQuotes || 0}
                </h2>
              </div>
            </Link>
            <Link to="/my-tickets?status=open">
              <div className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer min-h-[120px]">
                <p className="text-gray-500 text-sm">Open Tickets</p>
                <h2 className="text-3xl font-bold text-orange-500 mt-2">
                  {loadingStats ? "..." : stats?.openTickets || 0}
                </h2>
              </div>
            </Link>
            <Link to="/my-tickets?status=closed">
              <div className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer min-h-[120px]">
                <p className="text-gray-500 text-sm">Closed Tickets</p>
                <h2 className="text-3xl font-bold text-green-600 mt-2">
                  {loadingStats ? "..." : stats?.closedTickets || 0}
                </h2>
              </div>
            </Link>
          </div>

          {/* Recent tickets */}
          <div className="bg-white mt-8 sm:mt-10 p-4 sm:p-6 rounded-xl shadow">
            <h2 className="text-lg sm:text-xl font-semibold mb-6">
              Recent Support Tickets
            </h2>

            {loadingTickets ? (
              <p className="text-gray-500">Loading tickets...</p>
            ) : tickets.length === 0 ? (
              <p className="text-gray-500">No tickets created yet.</p>
            ) : (
              <div className="space-y-4">
                {tickets.slice(0, 5).map((ticket) => (
                  <div
                    key={ticket._id}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b hover:bg-gray-50 p-3 rounded-lg transition"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                        {ticket.subject}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                        {ticket.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;