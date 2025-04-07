import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../routes/routes";

export default function Navbar() {
    const links = [
        { to: ROUTES.home, label: "Home" },
        { to: ROUTES.dashboard, label: "Dashboard" },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <NavLink to={ROUTES.home} className="text-xl font-bold text-blue-600">
                    MyApp
                </NavLink>

                {/* Links */}
                <div className="flex items-center space-x-6">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `text-sm font-medium ${isActive
                                    ? "text-blue-600 underline"
                                    : "text-gray-700 hover:text-blue-500"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
}
