import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LandingPage } from "../pages/landing/LandingPage"
import { LoginPage } from "../pages/login/LoginPage"
import { DashboardPage } from "../pages/dashboard/DashboardPage"
import { ProtectedRoutes } from "./ProtectedRoutes"


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
