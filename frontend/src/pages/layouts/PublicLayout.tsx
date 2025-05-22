import { Outlet } from "react-router-dom";
import { Footer } from "../../shared/Footer/Footer";

export const PublicLayout = () => {
    return (
        <div className="min-h-[100dvh] grid grid-rows-[1fr_auto]">
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
