import { Outlet } from "react-router-dom";
import { Navbar } from "../../shared/Navbar/Navbar";
import { AdminNavbar } from "./AdminNavbar/AdminNavbar";

export const AdminLayout = () => {
  return (
    <div className="min-h-[100dvh] bg-[var(--background-color)]">
      <Navbar />
      <AdminNavbar />
      <main className="p-[var(--spacing-md)] max-w-7xl m-auto shadow-inner">
        <Outlet />
      </main>
    </div>
  );
};
