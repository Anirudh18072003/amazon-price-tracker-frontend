import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function PublicRoute({ children }) {
  const token = getToken();
  return token ? <Navigate to="/dashboard" replace /> : children;
}
