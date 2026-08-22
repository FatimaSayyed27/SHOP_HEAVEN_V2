import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminProtectedRoute() {
  const { isAuthenticated } = useAuth();

  const isStaff =
    localStorage.getItem("is_staff") === "true";

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (!isStaff) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
}

export default AdminProtectedRoute;