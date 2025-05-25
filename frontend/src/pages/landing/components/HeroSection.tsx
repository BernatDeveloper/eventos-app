import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";

export const HeroSection = () => (
    <section className="flex flex-col items-center justify-center text-center py-28 px-6 bg-[var(--primary-color)] text-white shadow-[var(--box-shadow-medium)]">
        <h1 className="text-5xl md:text-6xl font-extrabold max-w-4xl leading-tight">
            Organiza Eventos con Facilidad y Profesionalismo
        </h1>
        <p className="mt-6 text-xl max-w-3xl">
            Crea, gestiona y participa en eventos con amigos, familia o equipos. Todo en una sola plataforma moderna.
        </p>
        <NavLink
            to={ROUTES.dashboard}
            className="mt-10 inline-block px-10 py-4 rounded-[var(--border-radius-medium)] bg-[var(--background-color)] text-[var(--primary-color)] font-semibold shadow-[var(--box-shadow-light)] hover:bg-[var(--background-secondary-color)] transition"
        >
            Dashboard
        </NavLink>
    </section>
);
