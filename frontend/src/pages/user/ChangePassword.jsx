import React, { useState } from "react";
import UserNavBar from "../../components/UserNavBar";

const ChangePassword = () => {
  const [form, setForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.name || "User";
  const email = storedUser?.email || "";

  // Sidebar open state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPass !== form.confirm) {
      return alert("Passwords do not match!");
    }

    alert("Password changed!");
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden flex">
      {/* Sidebar */}
      <UserNavBar userName={userName} email={email} open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "opacity-50 md:opacity-100" : "opacity-100"} md:ml-56`}>
        {/* Mobile topbar hamburger */}
        <div className="md:hidden flex items-center justify-between bg-white shadow p-4">
          <button
            className="text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold">Change Password</h1>
        </div>

        {/* Center container */}
        <div className="flex-1 flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-6">Change Password</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="Current Password"
                value={form.current}
                onChange={(e) => setForm({ ...form, current: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#299479]"
              />

              <input
                type="password"
                placeholder="New Password"
                value={form.newPass}
                onChange={(e) => setForm({ ...form, newPass: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#299479]"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#299479]"
              />

              <button
                type="submit"
                className="bg-amber-400 text-black px-5 py-2 rounded-lg hover:bg-amber-300 transition shadow"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;//