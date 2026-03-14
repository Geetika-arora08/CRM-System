import { useState } from "react";
import api from "../../api";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/auth/admin", formData);

      const user = res.data.user;
      const role = (user.role || "").trim().toLowerCase();

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate(role === "admin" ? "/admin-panel" : "/userdashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Admin Sign In"
      subtitle={
        <>
          Forgot your password?{" "}
          <Link
            to="/forgotpassword"
            className="text-amber-400 font-semibold hover:underline"
          >
            Reset here
          </Link>
        </>
      }
      message={message}
    >
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          autoFocus
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-400 text-black font-semibold py-3 rounded-lg hover:bg-amber-300 shadow-lg transition"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

      </form>
    </AuthLayout>
  );
};

export default AdminLogin;