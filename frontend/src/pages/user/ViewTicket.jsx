import React, { useEffect, useState } from "react";
import UserNavBar from "../../components/UserNavBar";
import api from "../../api";

const ViewTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.name || "User";
  const email = storedUser?.email || "";

  // ================= FETCH TICKETS =================
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await api.get("/tickets/mytickets");
      setTickets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex overflow-x-hidden">
      {/* Sidebar */}
      <UserNavBar userName={userName} email={email} open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "opacity-50 md:opacity-100" : "opacity-100"
        } md:ml-56 p-4`}
      >
        {/* Mobile topbar with hamburger */}
        <div className="md:hidden flex items-center justify-between bg-white shadow p-4 mb-6">
          <button
            className="text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">My Support Tickets</h1>
          <div></div> {/* Placeholder for centering */}
        </div>

        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Support Tickets</h1>

        {tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl font-semibold text-gray-600">No Tickets Created Yet</h2>
            <p className="text-gray-400 mt-2">You haven't created any support tickets.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-5 flex flex-col justify-between"
              >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">{ticket.subject}</h2>

                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full
                      ${
                        ticket.status === "open"
                          ? "bg-green-100 text-green-700"
                          : ticket.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {ticket.status}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{ticket.description}</p>

                {/* FOOTER */}
                <div className="flex justify-between items-center text-xs">
                  <span
                    className={`px-2 py-1 rounded-full font-semibold
                      ${
                        ticket.priority === "High"
                          ? "bg-red-100 text-red-600"
                          : ticket.priority === "Medium"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                  >
                    {ticket.priority} Priority
                  </span>
                  <span className="text-gray-400">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTicket;