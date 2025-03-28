import { Outlet, Navigate } from "react-router-dom";
import { getToken } from "../services/authService";
import { ROUTES } from "./routes";

export const ProtectedRoutes = () => {
  const token = getToken();

  return token ? <Outlet /> : <Navigate to={ROUTES.login} />;
};
