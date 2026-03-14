import { useEffect, useState } from "react";
import api from "../../api";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuotes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/quotes/all");
      setQuotes(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch quotes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/quotes/${id}`, { status: newStatus });
      setQuotes((prev) =>
        prev.map((q) => (q._id === id ? { ...q, status: newStatus } : q))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Quote Requests
      </h1>

      {/* Table for md+ */}
      <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto hidden md:block">
        <table className="min-w-[700px] w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map(({ _id, name, service, message, status, createdAt }) => (
              <tr key={_id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 max-w-xs truncate">{name}</td>
                <td className="p-3 max-w-xs truncate">{service}</td>
                <td className="p-3 max-w-lg truncate">{message}</td>
                <td className="p-3 flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusBadge(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                  <select
                    value={status}
                    onChange={(e) => handleStatusChange(_id, e.target.value)}
                    className="border rounded-lg px-2 py-1 text-sm outline-none cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-3 whitespace-nowrap">
                  {new Date(createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards for < md */}
      <div className="md:hidden space-y-4">
        {quotes.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No quotes found</p>
        ) : (
          quotes.map(({ _id, name, service, message, status, createdAt }) => (
            <div key={_id} className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold text-lg truncate">{name}</h2>
              <p className="text-gray-700 mb-1 truncate">
                <span className="font-medium">Service:</span> {service}
              </p>
              <p className="text-gray-700 mb-2 line-clamp-3">
                <span className="font-medium">Message:</span> {message}
              </p>
              <div className="flex justify-between items-center mb-1">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusBadge(
                    status
                  )}`}
                >
                  {status}
                </span>
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(_id, e.target.value)}
                  className="border rounded-lg px-2 py-1 text-sm outline-none cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <p className="text-gray-500 text-sm">
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Quotes;