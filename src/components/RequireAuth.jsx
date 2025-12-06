/*import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  console.log("RequireAuth: checking authentication", { isAuthenticated: !!user });

  if (!user) {
    console.log("RequireAuth: redirecting to /auth");
    // Save the current location to redirect back after authentication
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  console.log("RequireAuth: user is authenticated, rendering children");
  return <>{children}</>;
}*/
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function RequireAuth({ children }) {
  const { user, loading } = useAuth(); // ✅ Get loading
  const location = useLocation();

  console.log("RequireAuth: checking authentication", { isAuthenticated: !!user, loading });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // ✅ Show loader while checking
  }

  if (!user) {
    console.log("RequireAuth: redirecting to /auth");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  console.log("RequireAuth: user is authenticated, rendering children");
  return <>{children}</>;
}

