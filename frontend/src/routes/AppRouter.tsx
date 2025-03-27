import { Route, Routes } from "react-router-dom"
import { Landing } from "../pages/landing/Landing"
import { Login } from "../pages/login/Login"
import { Dashboard } from "../pages/dashboard/Dashboard"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { Profile } from "../pages/profile/Profile"
import { ROUTES } from "./routes"
import { Register } from "../pages/register/Register"


export const AppRouter = () => {
    return (
        <Routes>
            <Route path={ROUTES.home} element={<Landing />} />
            <Route path={ROUTES.login} element={<Login />} />
            <Route path={ROUTES.register} element={<Register />} />
            <Route element={<ProtectedRoutes />}>
                <Route path={ROUTES.dashboard} element={<Dashboard />} />
                <Route path={ROUTES.profile} element={<Profile />} />
            </Route>
        </Routes>
    )
}
