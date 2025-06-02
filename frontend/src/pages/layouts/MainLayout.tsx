import { Navbar } from "../../shared/Navbar/Navbar";
import { Footer } from "../../shared/Footer/Footer";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto] bg-[var(--background-color)] text-[var(--text-primary-color)]">
      <Navbar />

      <main className="w-full bg-[var(--background-color)] max-w-7xl mx-auto p-[var(--spacing-lg)] lg:px-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

