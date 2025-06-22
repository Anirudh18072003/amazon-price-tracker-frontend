import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaHistory, FaAmazon } from "react-icons/fa";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/products`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setProducts(res.data);
    } catch (err) {
      toast.error("❌ Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("🗑️ Product removed");
    } catch (err) {
      toast.error(
        "❌ Delete failed: " + (err.response?.data?.message || err.message)
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
            🛒 Your Tracked Products
          </h2>

          {loading ? (
            <div className="flex justify-center items-center mt-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-4 text-gray-600 text-lg font-medium">
                Loading your products...
              </span>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-600 text-lg mt-20">
              No products tracked yet. Add one to get started!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white/90 backdrop-blur-md shadow-lg border border-gray-200 p-6 rounded-2xl transition-transform hover:scale-[1.02]"
                >
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-44 object-contain mb-4 rounded-md"
                    />
                  )}

                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {product.title}
                  </h3>

                  <a
                    href={product.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-blue-600 text-sm hover:underline mt-1"
                  >
                    <FaAmazon />
                    View on Amazon
                  </a>

                  <div className="mt-4 flex justify-between text-sm">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-medium">
                      ₹{product.currentPrice}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md font-medium">
                      Target: ₹{product.targetPrice}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <Link
                      to={`/track-history/${product._id}`}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <FaHistory />
                      View History
                    </Link>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      <FaTrashAlt />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
