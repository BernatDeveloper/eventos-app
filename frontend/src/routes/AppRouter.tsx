import { Route, Routes } from "react-router-dom"
import { LandingPage } from "../pages/landing/LandingPage"
import { LoginPage } from "../pages/login/LoginPage"
import { DashboardPage } from "../pages/dashboard/DashboardPage"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { ProfilePage } from "../pages/profile/ProfilePage"
import { ROUTES } from "./routes"


export const AppRouter = () => {
    return (
        <Routes>
            <Route path={ROUTES.home} element={<LandingPage />} />
            <Route path={ROUTES.login} element={<LoginPage />} />
            <Route element={<ProtectedRoutes />}>
                <Route path={ROUTES.dashboard} element={<DashboardPage />} />
                <Route path={ROUTES.profile} element={<ProfilePage />} />
            </Route>
        </Routes>
    )
}
