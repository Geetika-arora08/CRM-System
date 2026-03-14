import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import FormInput from "../../components/FormInput";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // controls form step
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // success | error
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await api.post("/auth/forgotpassword", { email });
      setMessage(res.data.message || "OTP sent to email ✅");
      setMsgType("success");
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP ❌");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await api.post("/auth/verifyotp", { email, otp });
      setMessage(res.data.message || "OTP verified ✅");
      setMsgType("success");
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP ❌");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match ❌");
      setMsgType("error");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/resetpassword", { email, otp, newPassword, confirmPassword });
      setMessage(res.data.message || "Password reset successful ✅");
      setMsgType("success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error resetting password ❌");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  // common buttons for all steps
  const CancelButton = () => (
    <button
      type="button"
      onClick={() => navigate("/login")}
      className="w-full border border-amber-400 text-amber-400 font-bold py-3 rounded-md mt-3 hover:bg-amber-400 hover:text-white transition"
    >
      Cancel
    </button>
  );

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your email and verify OTP to reset your password securely."
      message={
        message && (
          <div
            className={`text-center font-medium px-4 py-2 rounded ${
              msgType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {message}
          </div>
        )
      }
    >
      <div className="min-h-[55vh] flex items-center justify-center">
        <form className="space-y-4 w-full max-w-md">
          {step === 1 && (
            <>
              <FormInput
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full bg-amber-400 text-black font-semibold py-3 rounded-lg hover:bg-amber-300 shadow-md transition"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
              <CancelButton />
            </>
          )}

          {step === 2 && (
            <>
              <FormInput
                label="Enter OTP"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button
                type="submit"
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full bg-amber-400 text-black font-semibold py-3 rounded-lg hover:bg-amber-300 shadow-md transition"
              >
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </button>
              <CancelButton />
            </>
          )}

          {step === 3 && (
            <>
              <FormInput
                label="New Password"
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full bg-amber-400 text-black font-semibold py-3 rounded-lg hover:bg-amber-300 shadow-md transition"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
              <CancelButton />
            </>
          )}
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;