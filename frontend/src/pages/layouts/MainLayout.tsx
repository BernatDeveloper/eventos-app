import { Navbar } from "../../shared/Navbar/Navbar";
import { Footer } from "../../shared/Footer/Footer";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
    return (
        <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Navbar />
            <main className="container mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
