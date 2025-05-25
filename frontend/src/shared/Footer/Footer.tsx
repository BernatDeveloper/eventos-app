import { useEffect, useState } from "react";
import { setLocale } from "../../services/localeService";
import i18n from "../../i18n";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || "es";
    setLang(storedLang);
    i18n.changeLanguage(storedLang);
    setLocale(storedLang);
  }, []);

  const handleChangeLanguage = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLang = e.target.value;
    setLang(selectedLang);
    localStorage.setItem("lang", selectedLang);
    i18n.changeLanguage(selectedLang);

    try {
      await setLocale(selectedLang);
      window.location.reload();
    } catch (error) {
      console.error("Error al cambiar el idioma:", error);
    }
  };

  return (
    <footer className="bg-[var(--primary-color)] text-white py-8 mt-">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
        {/* Derechos reservados */}
        <div className="text-sm">
          &copy; {new Date().getFullYear()} TuNombre. Todos los derechos reservados.
        </div>

        {/* Selector de idioma */}
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="language" className="text-[var(--background-secondary-color)] font-medium">
            Idioma:
          </label>
          <select
            id="language"
            value={lang}
            onChange={handleChangeLanguage}
            className="bg-[var(--background-secondary-color)] text-[var(--text-primary-color)] border border-[var(--border-color)] rounded px-2 py-1 transition-colors duration-200"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Iconos sociales */}
        <div className="flex space-x-6 text-white text-xl">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--background-secondary-color)] transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--background-secondary-color)] transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--background-secondary-color)] transition"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};
