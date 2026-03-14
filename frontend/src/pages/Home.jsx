import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen bg-gradient-to-b from-[#0b1120] to-[#111827] text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            The Smart Way to <br />
            <span className="text-amber-400">Manage Customers</span>
          </h1>

          <p className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Organize customers, track leads, and grow your business
            with a modern CRM platform designed for efficiency.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link
              to="/register"
              className="bg-amber-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-300 transition shadow-lg"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-gray-500 px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
          </div>

          {/* highlight stats */}
          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
            <p>✔ Easy Setup</p>
            <p>✔ Secure Data</p>
            <p>✔ Powerful Analytics</p>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12">
            Everything You Need in a CRM
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-xl transition">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-3">
                Customer Management
              </h3>
              <p className="text-gray-500">
                Keep track of customer information, communication,
                and history in one place.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-xl transition">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-3">
                Lead Tracking
              </h3>
              <p className="text-gray-500">
                Track potential leads and convert them into
                loyal customers efficiently.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-xl transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">
                Analytics Dashboard
              </h3>
              <p className="text-gray-500">
                Understand business performance with visual
                reports and data insights.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 sm:py-20 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">

          <div className="p-6 rounded-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">100+</h2>
            <p className="text-gray-500 mt-2">Businesses Using CRM</p>
          </div>

          <div className="p-6 rounded-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">1M+</h2>
            <p className="text-gray-500 mt-2">Leads Managed</p>
          </div>

          <div className="p-6 rounded-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">99.9%</h2>
            <p className="text-gray-500 mt-2">System Uptime</p>
          </div>

        </div>
      </section>

      {/* WHY CRM */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Why Businesses Choose Our CRM
            </h2>

            <p className="text-gray-600 mb-6">
              Our CRM system helps teams stay organized,
              improve customer relationships, and make
              smarter decisions with real-time insights.
            </p>

            <ul className="space-y-3 text-gray-600">
              <li>✔ Easy customer data management</li>
              <li>✔ Smart lead tracking system</li>
              <li>✔ Real-time analytics</li>
              <li>✔ Secure cloud storage</li>
            </ul>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4">
              Boost Your Sales
            </h3>

            <p className="text-gray-500 mb-6">
              Organize leads and close deals faster
              with our intelligent CRM system.
            </p>

            <Link
              to="/register"
              className="bg-amber-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-300 transition"
            >
              Start Free
            </Link>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-[#0b1120] text-white text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Ready to Grow Your Business?
        </h2>

        <p className="text-gray-300 mb-8">
          Join businesses using our CRM to manage customers better.
        </p>

        <Link
          to="/register"
          className="bg-amber-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-amber-300 transition shadow-lg"
        >
          Create Free Account
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 text-center py-6 text-sm">
        © 2026 Geetika Arora | CRM System
      </footer>
    </>
  );
};

export default Home;