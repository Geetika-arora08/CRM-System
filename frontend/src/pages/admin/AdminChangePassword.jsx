
import { useState } from "react";
import api from '../../api';


const AdminChangePassword = () => {
const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("Form Submitted");
    e.preventDefault();
    // console.log(form);

     if (form.newPassword !== form.confirmPassword) {
    return alert("New password and confirm password do not match"); 
    }

     try {
      const res = await api.put("/admin/change-password",
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
      );

      setMessage("Password updated successfully");
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
});
       } catch (err) {
      alert(err.response?.data?.message || "Error updating password");
    }
  };

  
  return (
    <div className="p-8">   
      <div className="bg-white max-w-md mx-auto p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Change Password
        </h2>

        {message && (
        <p className="text-green-600 text-center mb-4 font-medium">
          {message}
        </p>
      )}


        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 font-medium"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminChangePassword;