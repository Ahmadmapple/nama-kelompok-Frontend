import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, requireAuth = true }) => {
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
    const from = location.state?.from?.pathname || "/profile";
    return <Navigate to={from} replace />;
  }

  return children;
};

export default ProtectedRoute;
