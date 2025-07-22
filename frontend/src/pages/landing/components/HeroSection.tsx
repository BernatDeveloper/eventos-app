import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import { useTranslation } from "react-i18next";

import {
    MdEvent,
    MdEventAvailable,
    MdEventNote,
    MdLink,
    MdList,
    MdEdit,
    MdLocationOn,
    MdPerson
} from "react-icons/md";

export const HeroSection = () => {
    const { t: tLanding } = useTranslation("landing");
    const { t: tCommon } = useTranslation("translation");

    return (
        <section className="relative flex flex-col items-center justify-center text-center py-28 px-6
      bg-[var(--primary-color)]
      text-white shadow-[var(--box-shadow-medium)] overflow-hidden">

            {/* ICONOS DECORATIVOS RESPONSIVE */}
            <MdEventAvailable className="absolute -top-[1rem] left-[5vw] text-[var(--text-primary-color)] !opacity-20 text-[8rem] sm:text-[10rem] rotate-[20deg]" data-aos="fade-right" />
            <MdPerson className="absolute bottom-[15vh] left-[15vw] sm:left-[25vw] text-[var(--text-primary-color)] !opacity-20 text-[8rem] sm:text-[10rem] rotate-[10deg] hidden xl:block" data-aos="fade-right"/>
            <MdLocationOn className="absolute bottom-[4vh] left-[5vw] sm:left-[10vw] text-[var(--text-primary-color)] !opacity-20 text-[8rem] sm:text-[10rem] -rotate-[15deg] sm:block hidden" data-aos="fade-right" />
            <MdEdit className="absolute top-[6vh] left-[40vw] text-[var(--text-primary-color)] !opacity-20 text-[6rem] sm:text-[8rem] -rotate-[90deg] lg:block hidden" data-aos="fade-down" />
            <MdEvent className="absolute -bottom-[3rem] left-[50vw] text-[var(--text-primary-color)] !opacity-20 text-[14rem] rotate-[8deg]" data-aos="fade-left" />
            <MdLink className="absolute top-[15vh] right-[10vw] sm:right-[15vw] text-[var(--text-primary-color)] !opacity-20 text-[6rem] sm:text-[8rem] -rotate-[40deg] hidden xl:block" data-aos="fade-left" />
            <MdEventNote className="absolute -top-[2vh] -right-[1vw] -sm:right-[1vw] text-[var(--text-primary-color)] !opacity-20 text-[10rem] sm:text-[12rem] -rotate-[10deg] sm:block hidden" data-aos="fade-left" />
            <MdList className="absolute bottom-[3vh] right-[5vw] sm:right-[8vw] text-[var(--text-primary-color)] !opacity-20 text-[8rem] sm:text-[10rem] rotate-[20deg] lg:block hidden" data-aos="fade-left" />

            {/* Contenido principal */}
            <h1 className="!text-[var(--text-color)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-4xl leading-tight break-words z-10" data-aos="fade-down">
                {tLanding('title')}
            </h1>
            <p className="mt-6 max-w-3xl md:text-md lg:text-2xl z-10" data-aos="fade-down">
                {tLanding('sub_title')}
            </p>
            <NavLink
                to={ROUTES.dashboard}
                className="z-10 mt-10 inline-block px-10 py-4 rounded-[var(--border-radius-medium)] bg-[var(--background-color)] text-[var(--primary-color)] font-semibold shadow-[var(--box-shadow-light)] hover:bg-[var(--background-secondary-color)] transition"
                data-aos="fade-up"
            >
                {tCommon('navbar.dashboard')}
            </NavLink>
        </section>
    );
};
