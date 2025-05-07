import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "./routes";
import { Loader } from "../shared/loader/Loader";

export const RequireAdmin = () => {
  const { user, loading  } = useAuth();

  if (loading) return <Loader />; 

  if (!user) return <Navigate to={ROUTES.login} />;
  if (user.role !== "admin") return <Navigate to={ROUTES.dashboard} />;

  return <Outlet />;
};