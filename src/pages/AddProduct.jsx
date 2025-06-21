import { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { FaAmazon, FaRupeeSign } from "react-icons/fa";

export default function AddProduct() {
  const [form, setForm] = useState({ url: "", targetPrice: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/products/add", form, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      toast.success("✅ Product added successfully!");
      navigate("/");
    } catch (err) {
      toast.error(
        "❌ Failed to add product: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16 px-4">
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8 border">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
            🎯 Track a New Product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amazon URL */}
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amazon Product URL
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
                <FaAmazon className="text-blue-500 mr-2" />
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={form.url}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent placeholder-gray-400 text-sm"
                  placeholder="e.g. https://www.amazon.in/dp/B08C4WV6FT"
                  required
                />
              </div>
            </div>

            {/* Target Price */}
            <div>
              <label
                htmlFor="targetPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Target Price (₹)
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
                <FaRupeeSign className="text-green-500 mr-2" />
                <input
                  type="number"
                  id="targetPrice"
                  name="targetPrice"
                  value={form.targetPrice}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent placeholder-gray-400 text-sm"
                  placeholder="Enter your target price"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Adding...
                </>
              ) : (
                "Add Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
