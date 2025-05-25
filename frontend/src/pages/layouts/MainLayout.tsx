import { Navbar } from "../../shared/Navbar/Navbar";
import { Footer } from "../../shared/Footer/Footer";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto] bg-[var(--background-color)] text-[var(--text-primary-color)]">
      <Navbar />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

