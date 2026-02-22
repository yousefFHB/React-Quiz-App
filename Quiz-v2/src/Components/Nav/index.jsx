import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../Context/AuthContext";

export default function Nav() {
  const { token, handleToken, handleUser } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguage =
    i18n.language === "pr" || i18n.language === "fr" ? "fa" : i18n.language;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
    localStorage.setItem("app_language", language);
  };

  const handleLogout = () => {
    handleToken(null);
    handleUser(null);
  };

  return (
    <div
      className={`sticky top-0 z-50 bg-white ${isScrolled ? "bg-white/50 backdrop-blur-xl" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-500">
          {t("common.brand")} 🎯
        </h2>

        <ul className="flex items-center gap-6 text-sm font-semibold text-slate-600">
          <li>
            <Link to="/">{t("nav.home")}</Link>
          </li>
          <li>
            <Link to="/create-quiz">{t("nav.createQuiz")}</Link>
          </li>
          <li>
            <Link to="/quiz">{t("nav.takeQuiz")}</Link>
          </li>
          <li>
            <Link to="/about">{t("nav.about")}</Link>
          </li>
          <li>
            <select
              value={currentLanguage}
              onChange={handleLanguageChange}
              aria-label={t("nav.languageAria")}
              className="px-3 py-2 rounded-full border border-slate-300 bg-white text-slate-700 text-xs"
            >
              <option value="en">{t("common.english")}</option>
              <option value="fa">{t("common.persian")}</option>
            </select>
          </li>

          {token ? (
            <>
              <Link
                to="/profile"
                className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              >
                {t("nav.profile")}
              </Link>
              <button onClick={handleLogout} className="text-xs text-rose-500">
                {t("nav.logout")}
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="px-5 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-500"
            >
              {t("nav.auth")}
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
