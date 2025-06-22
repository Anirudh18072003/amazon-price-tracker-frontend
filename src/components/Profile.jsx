import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [changingPass, setChangingPass] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );
        setUser(res.data);
        setFormData({ name: res.data.name, email: res.data.email });
      } catch (err) {
        toast.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const validateProfileForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    if (!passwords.currentPassword)
      newErrors.currentPassword = "Enter current password";
    if (passwords.newPassword.length < 6)
      newErrors.newPassword = "Minimum 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    if (!validateProfileForm()) return;
    setUpdating(true);
    try {
      await axios.put(
        "${import.meta.env.VITE_API_BASE_URL}/auth/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success("Profile updated");
      setUser((prev) => ({ ...prev, ...formData }));
      setEditOpen(false);
    } catch (err) {
      toast.error("Error updating profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;
    setChangingPass(true);
    try {
      await axios.put(
        "${import.meta.env.VITE_API_BASE_URL}/auth/change-password",
        passwords,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      toast.success("Password changed successfully");
      setPassOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error changing password");
    } finally {
      setChangingPass(false);
    }
  };

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-gray-600 text-xl">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="ml-3">Loading profile...</span>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-200 flex items-center justify-center py-10 px-4">
        <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl p-8 space-y-6 transition-all">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg mb-2">
              {initials}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <p className="text-xs text-gray-400 mt-1">
              Joined on {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="pt-4 border-t text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Name</span>
              <span>{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Email</span>
              <span>{user.email}</span>
            </div>
          </div>

          <div className="pt-4 flex justify-center space-x-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => {
                setErrors({});
                setEditOpen(true);
              }}
            >
              Edit Profile
            </button>
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              onClick={() => {
                setErrors({});
                setPassOpen(true);
              }}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <Modal title="Edit Profile" onClose={() => setEditOpen(false)}>
          <form onSubmit={handleEditProfile} className="space-y-4">
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={errors.name}
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={errors.email}
            />
            <ActionButtons
              isLoading={updating}
              onCancel={() => setEditOpen(false)}
              submitText="Save"
            />
          </form>
        </Modal>
      )}

      {/* Password Modal */}
      {passOpen && (
        <Modal title="Change Password" onClose={() => setPassOpen(false)}>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, currentPassword: e.target.value })
              }
              error={errors.currentPassword}
            />
            <Input
              label="New Password"
              type="password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
              error={errors.newPassword}
            />
            <ActionButtons
              isLoading={changingPass}
              onCancel={() => setPassOpen(false)}
              submitText="Update"
            />
          </form>
        </Modal>
      )}
    </>
  );
}

function Modal({ children, title, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", error }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:ring-blue-300"
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function ActionButtons({ isLoading, onCancel, submitText }) {
  return (
    <div className="flex justify-end space-x-2">
      <button
        type="button"
        onClick={onCancel}
        className="text-gray-500 hover:text-gray-800"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center disabled:opacity-60"
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
        )}
        {submitText}
      </button>
    </div>
  );
}
