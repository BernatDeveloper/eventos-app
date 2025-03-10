import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LandingPage } from "../pages/landing/LandingPage"
import { LoginPage } from "../pages/login/LoginPage"
import { DashboardPage } from "../pages/dashboard/DashboardPage"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { routes } from "./routes"


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.home} element={<LandingPage />} />
                <Route path={routes.login} element={<LoginPage />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path={routes.dashboard} element={<DashboardPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
