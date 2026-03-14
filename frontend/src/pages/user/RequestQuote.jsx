import React, { useState } from "react";
import UserNavBar from "../../components/UserNavBar";
import api from "../../api";

const RequestQuote = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.name || "User";
  const email = storedUser?.email || "";

  const [form, setForm] = useState({
    product: "",
    details: "",
  });

  // Sidebar open state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/quotes", {
        name: userName,
        email: email,
        service: form.product,
        message: form.details,
      });

      alert("Quote Requested Successfully ✅");

      setForm({
        product: "",
        details: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to submit quote");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden flex">
      {/* Sidebar */}
      <UserNavBar userName={userName} email={email} open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "opacity-50 md:opacity-100" : "opacity-100"} md:ml-56`}>
        {/* Mobile topbar with hamburger */}
        <div className="md:hidden flex items-center justify-between bg-white shadow p-4">
          <button
            className="text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">Request a Quote</h1>
        </div>

        {/* Center Area */}
        <div className="min-h-screen flex justify-center items-center p-6">
          <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Request a Quote
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* PRODUCT */}
              <input
                type="text"
                placeholder="Product / Service"
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
                required
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#299479] outline-none"
              />

              {/* DETAILS */}
              <textarea
                placeholder="Project Details"
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                required
                className="border border-gray-300 rounded-lg p-3 min-h-[130px] focus:ring-2 focus:ring-[#299479] outline-none"
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="bg-[#299479] hover:bg-[#237a64] text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Submit Quote Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;