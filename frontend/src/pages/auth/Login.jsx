import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api";
import AuthLayout from "../../components/AuthLayout";
import FormInput from "../../components/FormInput";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // success | error
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Login successful! Redirecting...");
      setMsgType("success");

      setTimeout(() => {
        navigate(user.role.toLowerCase() === "admin" ? "/admindashboard" : "/userdashboard");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign in to CRM"
      subtitle={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="text-amber-400 font-semibold hover:underline">
            Sign up Now!
          </Link>
        </>
      }
      message={message && (
        <div
          className={`text-center font-medium px-4 py-2 rounded ${
            msgType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {message}
        </div>
      )}
    >
      <div className="min-h-[55vh] flex items-center justify-center">
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          <FormInput
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-400 text-black font-semibold py-3 rounded-lg hover:bg-amber-300 shadow-md transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          <Link
            to="/forgotpassword"
            className="block text-center text-gray-500 font-medium mt-2 hover:text-gray-700 transition"
          >
            Forgot Password?
          </Link>
        </form>
      </div>
    </AuthLayout>
  );
}