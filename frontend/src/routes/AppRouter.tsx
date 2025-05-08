import { Route, Routes } from "react-router-dom";
import { Landing } from "../pages/landing/Landing";
import { Login } from "../pages/login/Login";
import { Dashboard } from "../pages/user/dashboard/Dashboard";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Profile } from "../pages/user/profile/Profile";
import { ROUTES } from "./routes";
import { Register } from "../pages/register/Register";
import { EventPage } from "../pages/user/event/EventPage";
import { NotificationPage } from "../pages/user/notification/NotificationPage";
import { EventParticipantsPage } from "../shared/participant/EventParticipantPage";
import { CreateEvent } from "../pages/user/event/create/CreateEvent";
import { NotFound } from "../pages/notFound/NotFound";

// 🔐 Rutas del admin
import { RequireAdmin } from "./RequireAdmin";
import { AdminLayout } from "../pages/admin/AdminLayout";
import { AdminDashboard } from "../pages/admin/dashboard/AdminDashboard";
import { UsersPage } from "../pages/admin/users/UsersPage";
import { EventsAdminPage } from "../pages/admin/events/EventsAdminPage";
import { CategoriesAdminPage } from "../pages/admin/categories/CategoriesAdminPage";

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
                <Route path={ROUTES.event} element={<EventPage />} />
                <Route path={ROUTES.profile} element={<Profile />} />
                <Route path={ROUTES.notification} element={<NotificationPage />} />
                <Route path={ROUTES.participant} element={<EventParticipantsPage />} />
                <Route path={ROUTES.createEvent} element={<CreateEvent />} />
            </Route>

            {/* Rutas protegidas para admin */}
            <Route path="/admin" element={<RequireAdmin />}>
                <Route element={<AdminLayout />}>
                    <Route path={ROUTES.admin.dashboard} element={<AdminDashboard />} />
                    <Route path={ROUTES.admin.users} element={<UsersPage />} />
                    <Route path={ROUTES.admin.events} element={<EventsAdminPage />} />
                    <Route path={ROUTES.admin.categories} element={<CategoriesAdminPage />} />
                </Route>
            </Route>

            <Route path={ROUTES.notFound} element={<NotFound />} />

        </Routes>
    );
};
