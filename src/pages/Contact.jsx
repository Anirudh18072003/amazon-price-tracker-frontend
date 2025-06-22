import Navbar from "../components/Navbar";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEnvelope, FaUser, FaCommentDots, FaStar } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact`,
        form
      );
      toast.success("📨 Message sent successfully!");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        rating: "",
      });
    } catch (err) {
      toast.error("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4 py-12 flex justify-center items-center">
        <div className="max-w-3xl w-full bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-blue-100">
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-6">
            📬 Contact & Feedback
          </h2>

          <p className="text-center text-gray-600 mb-8">
            We'd love to hear from you — whether it's a suggestion, feedback, or
            help!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
            {/* Name */}
            <div>
              <label className="text-sm font-semibold">Your Name</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1 shadow-sm bg-white">
                <FaUser className="text-blue-500 mr-2" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full outline-none bg-transparent text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold">Your Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1 shadow-sm bg-white">
                <FaEnvelope className="text-blue-500 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full outline-none bg-transparent text-sm"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm font-semibold">Subject</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1 shadow-sm bg-white">
                <FaCommentDots className="text-blue-500 mr-2" />
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Enter subject"
                  className="w-full outline-none bg-transparent text-sm"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-semibold">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm bg-white outline-none"
              />
            </div>

            {/* Optional Rating */}
            <div>
              <label className="text-sm font-semibold flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                Rate our App (optional)
              </label>
              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="w-full mt-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none shadow-sm"
              >
                <option value="">Choose rating</option>
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                <option value="4">⭐⭐⭐⭐ Great</option>
                <option value="3">⭐⭐⭐ Good</option>
                <option value="2">⭐⭐ Needs improvement</option>
                <option value="1">⭐ Poor</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2.5 rounded-xl shadow-md"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
