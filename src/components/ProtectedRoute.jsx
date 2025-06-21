import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const token = getToken(); // Assumes token is stored in localStorage
  return token ? children : <Navigate to="/login" replace />;
}
