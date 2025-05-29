import { Outlet, Navigate } from "react-router-dom";
import { getToken } from "../services/authService";
import { ROUTES } from "./routes";

type ProtectedRoutesProps = {
  redirectTo?: string;
};

export const ProtectedRoutes = ({ redirectTo = ROUTES.login }: ProtectedRoutesProps) => {
  const token = getToken();

  return token ? <Outlet /> : <Navigate to={redirectTo} />;
};
