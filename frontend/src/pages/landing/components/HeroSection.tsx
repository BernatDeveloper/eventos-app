import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import { useTranslation } from "react-i18next";

export const HeroSection = () => {
    const { t: tLanding } = useTranslation("landing");
    const { t: tCommon } = useTranslation("translation");


    return (
        <section className="flex flex-col items-center justify-center text-center py-28 px-6 bg-[var(--primary-color)] text-white shadow-[var(--box-shadow-medium)]">
            <h1 className="!text-[var(--text-color)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-4xl leading-tight break-words">
                {tLanding('title')}
            </h1>
            <p className="mt-6 max-w-3xl md:text-md lg:text-2xl">
                {tLanding('sub_title')}
            </p>
            <NavLink
                to={ROUTES.dashboard}
                className="mt-10 inline-block px-10 py-4 rounded-[var(--border-radius-medium)] bg-[var(--background-color)] text-[var(--primary-color)] font-semibold shadow-[var(--box-shadow-light)] hover:bg-[var(--background-secondary-color)] transition"
            >
                {tCommon('navbar.dashboard')}
            </NavLink>
        </section>
    )
};
