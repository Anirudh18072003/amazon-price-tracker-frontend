import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaBell, FaChartLine, FaMoneyBillWave, FaLock } from "react-icons/fa";

export default function LearnMore() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 px-6 py-12">
        <div className="max-w-5xl mx-auto text-gray-800">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-800">
            Why Use Our Price Tracker?
          </h1>
          <p className="text-center text-lg mb-10 text-gray-600 max-w-3xl mx-auto">
            Get the best deals without refreshing Amazon a hundred times. Let us
            monitor prices for you while you relax.
          </p>

          <div className="grid sm:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg border">
              <FaBell className="text-blue-600 text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Alerts</h3>
              <p className="text-gray-700">
                We'll notify you via email the moment your product drops below
                your desired price.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg border">
              <FaChartLine className="text-green-600 text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Visual Price History
              </h3>
              <p className="text-gray-700">
                See how prices have changed over time through easy-to-read
                charts.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg border">
              <FaMoneyBillWave className="text-yellow-500 text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Save Money Automatically
              </h3>
              <p className="text-gray-700">
                Never overpay again. Set your budget and let the app do the
                work.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg border">
              <FaLock className="text-purple-600 text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
              <p className="text-gray-700">
                Your data is protected with secure login and encrypted
                communication.
              </p>
            </div>
          </div>

          <div className="text-center mb-12">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow"
            >
              Start Tracking Now
            </Link>
          </div>

          <div className="text-center text-sm text-gray-500">
            Curious about the tech behind it?{" "}
            <Link to="/about" className="text-blue-600 hover:underline">
              Read more here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
