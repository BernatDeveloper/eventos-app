import { useEffect, useState } from "react";
import { setLocale } from "../../services/localeService";
import i18n from "../../i18n";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const [lang, setLang] = useState("es");
  const { t } = useTranslation('footer')

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
        <div className="text-sm">
          &copy; {new Date().getFullYear()} {t('reserved_rights')}
        </div>

        {/* Selector de idioma */}
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="language" className="custom-label">
            {t('lang.title')}:
          </label>
          <select
            id="language"
            value={lang}
            onChange={handleChangeLanguage}
            className="bg-[var(--background-secondary-color)] text-[var(--text-primary-color)] border border-[var(--border-color)] rounded px-2 py-1 transition-colors duration-200"
          >
            <option value="es">{t('lang.es')}</option>
            <option value="en">{t('lang.en')}</option>
          </select>
        </div>

        {/* Iconos sociales */}
        <div className="flex space-x-6 text-white text-xl">
          <a
            href="https://www.linkedin.com/in/bernat-font-giné-07508924b"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/BernatDeveloper"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:faenabernat@gmail.com"
            aria-label="Email"
            className="hover:text-black transition"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};
