import { useEffect, useState } from "react";
import { setLocale } from "../../services/localeService";
import i18n from "../../i18n";

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
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p className="text-sm mb-2">
        © {new Date().getFullYear()} TuNombre. Todos los derechos reservados.
      </p>
      <select
        value={lang}
        onChange={handleChangeLanguage}
        className="bg-gray-700 text-white text-sm px-2 py-1 rounded"
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </footer>
  );
};
