import { useEffect, useState } from "react";
import api from "../../api";

const Visitors = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVisitors = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await api.get("/admin/visitors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Visitors API response:", res.data);
      setLogs(res.data.data || []);
    } catch (err) {
      console.error("Error fetching visitor logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500 font-semibold">
        Loading visitor logs...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Visitor Logs (Admin Only)
      </h1>

      {/* Table for md+ screens */}
      <div className="bg-white shadow-lg rounded-xl overflow-x-auto hidden md:block">
        {logs.length === 0 ? (
          <p className="text-center text-gray-400 py-6">No visitors found</p>
        ) : (
          <table className="min-w-[700px] w-full border-collapse">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-3 text-left">IP Address</th>
                <th className="p-3 text-left">Route</th>
                <th className="p-3 text-left">Browser</th>
                <th className="p-3 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(({ _id, ipAddress, page, userAgent, createdAt }) => (
                <tr key={_id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 max-w-xs truncate">{ipAddress}</td>
                  <td className="p-3 max-w-xs truncate">{page}</td>
                  <td className="p-3 max-w-xs truncate">{userAgent}</td>
                  <td className="p-3 whitespace-nowrap">
                    {new Date(createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile cards for < md */}
      <div className="md:hidden space-y-4">
        {logs.length === 0 ? (
          <p className="text-center text-gray-400 py-6">No visitors found</p>
        ) : (
          logs.map(({ _id, ipAddress, page, userAgent, createdAt }) => (
            <div key={_id} className="bg-white rounded-xl shadow p-4">
              <p className="text-gray-800 font-semibold mb-1 truncate">
                IP: {ipAddress}
              </p>
              <p className="text-gray-700 mb-1 truncate">
                Route: {page}
              </p>
              <p className="text-gray-700 mb-1 truncate">
                Browser: {userAgent}
              </p>
              <p className="text-gray-500 text-sm">
                {new Date(createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Visitors;