import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../utils/auth";
import Navbar from "../components/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

export default function TrackHistory() {
  const { productId } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!productId) {
        console.error("Invalid product ID");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products/history/${productId}`,
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );

        // Format checkedAt with full date & time
        const formattedHistory = res.data.history.map((item) => ({
          ...item,
          checkedAt: new Date(item.checkedAt).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
        }));

        const prices = formattedHistory.map((item) => item.price);
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));

        setHistory(formattedHistory);
      } catch (err) {
        console.error("Failed to load price history", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [productId]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-6">Price History</h2>
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : history.length === 0 ? (
            <p className="text-gray-600">No price history available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={history}
                margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
              >
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="checkedAt"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={70}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                  formatter={(value) => [`₹${value}`, "Price"]}
                  labelFormatter={(label) => `Checked At: ${label}`}
                />

                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    strokeWidth: 2,
                    fill: "#fff",
                    stroke: "#3B82F6",
                  }}
                  activeDot={{ r: 6 }}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />

                {history.map((item, index) => {
                  if (item.price === minPrice || item.price === maxPrice) {
                    return (
                      <ReferenceDot
                        key={index}
                        x={item.checkedAt}
                        y={item.price}
                        r={6}
                        fill={item.price === maxPrice ? "#10B981" : "#EF4444"}
                        stroke="#fff"
                        label={{
                          value:
                            item.price === maxPrice
                              ? `Max ₹${item.price}`
                              : `Min ₹${item.price}`,
                          position: "top",
                          fontSize: 12,
                          fill: "#374151",
                        }}
                      />
                    );
                  }
                  return null;
                })}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </>
  );
}
