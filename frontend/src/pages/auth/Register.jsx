import { useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import FormInput from "../../components/FormInput";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (formData.password !== formData.repassword) {
    //   setMessage("Passwords do not match ❌");
    //   return;
    // }

    try {
      setLoading(true);
      const res = await api.post("/auth/register", formData);
      setMessage(res.data.message);

      setFormData({
      name: "",
      email: "",
      password: "",
    });
    } 
    catch (err) {
    setMessage(err.response?.data?.message || "Something went wrong");
    } 
    finally {
    setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your CRM Account"
      subtitle={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-amber-400 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </>
      }
      message={message}
    >
      <div className="min-h-[60vh] flex items-center">
       <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">

        <FormInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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
          {loading ? "Creating Account..." : "Register"}
        </button>

        <Link
          to="/"
          className="block text-center text-gray-500 font-medium mt-2 hover:text-gray-700 transition"
        >
          Cancel
        </Link>

      </form>
      </div>
    </AuthLayout>
  );
};

export default Register;