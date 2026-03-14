import React, { useState } from "react";
import UserNavBar from "../../components/UserNavBar";
import api from "../../api";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
  });

  // Sidebar open state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Save profile changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/users/profile", { name: user.name });
      console.log(res.data);

      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, name: res.data.user.name })
      );
      alert("Profile Updated ✅");
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Failed to update profile ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden flex">
      {/* Sidebar */}
      <UserNavBar userName={user.name} email={user.email} open={sidebarOpen} setOpen={setSidebarOpen} />

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
          <h1 className="text-lg font-semibold">Profile</h1>
        </div>

        {/* Profile form container */}
        <div className="min-h-screen flex justify-center items-center p-6">
          <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
            {/* User Header */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 rounded-full bg-amber-400 flex items-center justify-center text-black text-2xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#299479]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-400 text-black font-semibold px-5 py-2 rounded-lg hover:bg-amber-300 transition shadow"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;