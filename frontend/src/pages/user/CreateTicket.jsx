import React, { useState } from "react";
import UserNavBar from "../../components/UserNavBar";
import api from "../../api";

const CreateTicket = () => {
  const [ticket, setTicket] = useState({
    subject: "",
    description: "",
    priority: "Low",
  });

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.name || "User";
  const email = storedUser?.email || "";

  // Sidebar open state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/tickets", {
        subject: ticket.subject,
        description: ticket.description,
        priority: ticket.priority,
      });

      alert("Ticket Created Successfully ✅");

      setTicket({
        subject: "",
        description: "",
        priority: "Low",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create ticket");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden flex">
      {/* Sidebar */}
      <UserNavBar userName={userName} email={email} open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "opacity-50 md:opacity-100" : "opacity-100"
        } md:ml-56 p-6 flex justify-center items-center min-h-screen`}
      >
        {/* Mobile topbar with hamburger */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow p-4 flex items-center justify-between z-20">
          <button
            className="text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">Create Support Ticket</h1>
          <div></div>{/* placeholder to center the title */}
        </div>

        {/* Form container */}
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md mt-16 md:mt-0">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Create Support Ticket
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Subject"
              value={ticket.subject}
              onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#299479]"
              required
            />

            <textarea
              placeholder="Description"
              value={ticket.description}
              onChange={(e) =>
                setTicket({
                  ...ticket,
                  description: e.target.value,
                })
              }
              className="border border-gray-300 rounded-lg p-3 min-h-[120px] focus:ring-2 focus:ring-[#299479]"
              required
            />

            <select
              value={ticket.priority}
              onChange={(e) =>
                setTicket({
                  ...ticket,
                  priority: e.target.value,
                })
              }
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#299479]"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <button
              type="submit"
              className="bg-[#299479] hover:bg-[#237a64] text-white font-semibold py-3 rounded-lg transition"
            >
              Create Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;