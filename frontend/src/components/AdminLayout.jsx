import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* Right Section */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <AdminHeader setOpen={setOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{/* Nested Routes */}<Outlet /></main>
      </div>
    </div>
  );
};

export default AdminLayout;