import { useEffect, useState } from "react";
import api from "../../api";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTickets = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/admin/tickets");
      setTickets(res.data.data || []);
    } catch {
      setError("Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await api.post("/admin/tickets", { subject: subject.trim(), message: message.trim() });
      setSubject("");
      setMessage("");
      fetchTickets();
    } catch {
      alert("Failed to submit ticket.");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/tickets/${id}/status`, { status });
      fetchTickets();
    } catch {
      alert("Failed to update status.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Create Ticket Form */}
      <section className="bg-white rounded-xl shadow p-6 mb-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-5 text-center">Create Support Ticket</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Subject"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none w-full"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            aria-label="Ticket subject"
            required
          />
          <textarea
            placeholder="Describe your issue..."
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none min-h-[100px] w-full resize-y"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label="Ticket message"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition w-full"
          >
            Submit Ticket
          </button>
        </form>
      </section>

      {/* Tickets Table for md+ */}
      <section className="bg-white rounded-xl shadow p-6 overflow-x-auto hidden md:block">
        <h2 className="text-2xl font-semibold mb-5">All Tickets</h2>
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading tickets...</p>
        ) : error ? (
          <p className="text-center text-red-600 py-10">{error}</p>
        ) : tickets.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No Tickets Found</p>
        ) : (
          <table className="min-w-[600px] w-full border-collapse text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">Subject</th>
                <th className="p-3 border-b">Message</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Created</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(({ _id, subject, description, status, createdAt }) => (
                <tr key={_id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 max-w-xs truncate">{subject}</td>
                  <td className="p-3 max-w-lg truncate">{description}</td>
                  <td className="p-3 flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        status
                      )}`}
                      aria-label={`Current status: ${status}`}
                    >
                      {status}
                    </span>
                    <select
                      value={status}
                      onChange={(e) => updateStatus(_id, e.target.value)}
                      className="border rounded-lg px-2 py-1 outline-none cursor-pointer"
                      aria-label={`Change status for ticket: ${subject}`}
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {new Date(createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Mobile Cards for < md */}
      <section className="md:hidden">
        <h2 className="text-2xl font-semibold mb-5 text-center">All Tickets</h2>
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading tickets...</p>
        ) : error ? (
          <p className="text-center text-red-600 py-10">{error}</p>
        ) : tickets.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No Tickets Found</p>
        ) : (
          <div className="space-y-4">
            {tickets.map(({ _id, subject, description, status, createdAt }) => (
              <div key={_id} className="bg-white rounded-xl shadow p-4">
                <h3 className="font-semibold text-lg mb-1 truncate">{subject}</h3>
                <p className="text-gray-700 mb-2 line-clamp-3">{description}</p>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      status
                    )}`}
                    aria-label={`Current status: ${status}`}
                  >
                    {status}
                  </span>
                  <select
                    value={status}
                    onChange={(e) => updateStatus(_id, e.target.value)}
                    className="border rounded-lg px-2 py-1 outline-none cursor-pointer"
                    aria-label={`Change status for ticket: ${subject}`}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <p className="mt-2 text-sm text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Tickets;