import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";

const AdminHeader = ({ setOpen }) => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setAdminName(user.name);
  }, []);

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <FaBars />
      </button>

      <h1 className="font-semibold text-lg text-gray-700">
        Admin Dashboard
      </h1>

      <div className="text-sm text-gray-500">Welcome, {adminName}</div>
    </header>
  );
};

export default AdminHeader;