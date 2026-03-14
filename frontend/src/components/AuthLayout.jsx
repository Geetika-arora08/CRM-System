import Navbar from "./Navbar";

export default function AuthLayout({ title, subtitle, children, message }) {
  return (
    <div>
      <Navbar />

      <div className="bg-gray-100 min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row">

          {/* LEFT PANEL */}
          <div className="w-full md:w-1/2 bg-gradient-to-b from-[#0b1120] to-[#111827] text-white p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 md:mb-6 leading-snug">
              {title}
            </h1>

            <p className="text-gray-300 text-base mb-6 md:mb-8">
              {subtitle}
            </p>

            {/* Branding / Features */}
            <div className="space-y-2 md:space-y-3 text-sm text-gray-400">
              <p>✔ Secure CRM platform</p>
              <p>✔ Manage customers easily</p>
              <p>✔ Track leads & analytics</p>
            </div>

            {message && (
              <div className="mt-6 md:mt-10 bg-green-500 text-white px-4 py-3 rounded-lg text-center font-medium shadow">
                {message}
              </div>
            )}
          </div>

          {/* RIGHT FORM */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md w-full mx-auto">
              {children}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}