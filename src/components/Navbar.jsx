import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/auth";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = !!getToken();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!loggedIn) return setLoading(false);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load user profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [loggedIn]);

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="text-2xl font-extrabold text-gray-800 hover:text-blue-600 transition-colors"
          >
            🛒 PriceTrackr
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {loggedIn ? (
              loading ? (
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-600 hover:text-blue-600 font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/add"
                    className="text-gray-600 hover:text-blue-600 font-medium"
                  >
                    Add Product
                  </Link>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-blue-600 font-medium"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-blue-600 font-medium"
                  >
                    Contact
                  </Link>

                  {/* Avatar with dropdown */}
                  <div className="relative">
                    <div
                      className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold cursor-pointer hover:ring-2 ring-blue-400 transition"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      {userInitial}
                    </div>

                    {dropdownOpen && (
                      <div
                        className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50"
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Profile
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow font-medium transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
