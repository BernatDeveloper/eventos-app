// src/routes/RequireAdmin.tsx
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext/useAuth";
import { ROUTES } from "./routes";

export const RequireAdmin = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to={ROUTES.login} />;
  if (user.role !== "admin") return <Navigate to={ROUTES.dashboard} />;

  return <Outlet />;
};