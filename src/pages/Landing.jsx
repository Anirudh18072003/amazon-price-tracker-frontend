import { Link } from "react-router-dom";
import { FaSearch, FaBell, FaChartLine } from "react-icons/fa";
import heroImg from "../assets/image_hero-1-1.svg"; // Replace with your actual image path

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700">PriceTrackr</h1>
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium">
              Log In
            </button>
          </Link>
          <Link to="/register">
            <button className="px-5 py-2 bg-white border border-blue-600 text-blue-600 hover:bg-blue-100 rounded-xl text-sm font-medium">
              Sign Up
            </button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="flex-1">
          <h2 className="text-5xl font-bold text-blue-800 mb-6 leading-tight">
            Track Amazon Prices Effortlessly
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Never miss a deal again. Set a target price, get notified when your
            favorite product drops, and view price trends with ease.
          </p>
          <div className="space-x-4">
            <Link to="/register">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow">
                Get Started Free
              </button>
            </Link>
            <Link to="/learnmore">
              <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-xl text-sm font-semibold shadow">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1">
          <img
            src={heroImg}
            alt="Track products visually"
            className="w-full max-w-md mx-auto drop-shadow-lg"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-blue-50 rounded-xl shadow">
            <FaSearch className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Easy Tracking
            </h3>
            <p className="text-gray-600 text-sm">
              Just paste your Amazon product link, and we'll do the rest.
            </p>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl shadow">
            <FaBell className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Instant Alerts
            </h3>
            <p className="text-gray-600 text-sm">
              Get notified via email when your desired price is reached.
            </p>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl shadow">
            <FaChartLine className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Visual Trends
            </h3>
            <p className="text-gray-600 text-sm">
              See price history with beautiful charts and stay informed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
