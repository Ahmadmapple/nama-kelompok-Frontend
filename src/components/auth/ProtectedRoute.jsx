import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, requireAuth = true, requireAdmin = false }) => {
  const { user, authChecked } = useAuth();
  const location = useLocation();

  // ⏳ Tunggu auth dicek (bukan loading request)
  if (!authChecked) {
    return null;
  }

  // 🔐 Route butuh login
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🚫 Route khusus guest
  if (!requireAuth && user) {
    // Jika user adalah admin, redirect ke admin panel
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    const from = location.state?.from?.pathname || "/profile";
    return <Navigate to={from} replace />;
  }

  // 👑 Route khusus admin
  if (requireAdmin && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
