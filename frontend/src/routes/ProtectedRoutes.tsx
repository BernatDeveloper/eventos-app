import { Outlet, Navigate } from "react-router-dom";
import { getToken } from "../services/authService";
import { ROUTES } from "./routes";

export const ProtectedRoutes = () => {
    const isAuthenticated = !!getToken(); // Verifica si hay un token válido

    return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.login} />;
};
