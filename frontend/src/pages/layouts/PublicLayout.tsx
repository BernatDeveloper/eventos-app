import { Outlet } from "react-router-dom";
import { Footer } from "../../shared/Footer/Footer";
import { PublicNavbar } from "../../shared/Navbar/PublicNavbar";

export const PublicLayout = () => {
    return (
        <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto] bg-[var(--background-color)] text-[var(--text-primary-color)]">
            <PublicNavbar />
            <main className="w-full mx-auto ">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
