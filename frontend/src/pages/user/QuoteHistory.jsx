import React, { useState, useEffect } from "react";
import UserNavBar from "../../components/UserNavBar";
import api from "../../api";

const QuoteHistory = () => {
  const [quotes, setQuotes] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.name || "User";
  const email = storedUser?.email || "";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ================= FETCH =================
  const fetchQuotes = async () => {
    try {
      const res = await api.get("/quotes/myquotes");
      setQuotes(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  // ✅ Status Color Badge
  const getStatusStyle = (status) => {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden flex">
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
          <h1 className="text-lg font-semibold">Quote History</h1>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-gray-800">Quote History</h1>

        <div className="bg-white shadow-lg rounded-xl overflow-auto max-w-full">
          <table className="w-full text-left min-w-[300px]">
            <thead className="bg-[#299479] text-white">
              <tr>
                <th className="p-4">Service</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {quotes.length > 0 ? (
                quotes.map((quote) => (
                  <tr key={quote._id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4 font-medium">{quote.service}</td>

                    <td className="p-4">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                          quote.status
                        )}`}
                      >
                        {quote.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-6 text-gray-500">
                    No Quotes Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuoteHistory;