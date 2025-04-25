import { Route, Routes } from "react-router-dom";
import { Landing } from "../pages/landing/Landing";
import { Login } from "../pages/login/Login";
import { Dashboard } from "../pages/user/dashboard/Dashboard";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Profile } from "../pages/user/profile/Profile";
import { ROUTES } from "./routes";
import { Register } from "../pages/register/Register";

// 🔐 Rutas del admin
import { RequireAdmin } from "./RequireAdmin";
import { AdminLayout } from "../pages/admin/AdminLayout";
import { AdminDashboard } from "../pages/admin/dashboard/AdminDashboard";
import { UsersPage } from "../pages/admin/users/UsersPage";
import { EventPage } from "../pages/admin/events/EventPage";

export const AppRouter = () => {
    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path={ROUTES.home} element={<Landing />} />
            <Route path={ROUTES.login} element={<Login />} />
            <Route path={ROUTES.register} element={<Register />} />

            {/* Rutas protegidas normales */}
            <Route element={<ProtectedRoutes />}>
                <Route path={ROUTES.dashboard} element={<Dashboard />} />
                <Route path={ROUTES.profile} element={<Profile />} />
            </Route>

            {/* Rutas protegidas para admin */}
            <Route path="/admin" element={<RequireAdmin />}>
                <Route element={<AdminLayout />}>
                    <Route path={ROUTES.admin.dashboard} element={<AdminDashboard />} />
                    <Route path={ROUTES.admin.users} element={<UsersPage />} />
                    <Route path={ROUTES.admin.events} element={<EventPage />} />
                </Route>
            </Route>
        </Routes>
    );
};
