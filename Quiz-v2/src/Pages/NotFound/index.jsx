import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="notfound-bg min-h-screen bg-slate-50 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />

      <div className="relative z-10 text-center bg-white/20 shadow-2xl shadow-gray-500 p-4 rounded-2xl backdrop-blur-lg max-w-md">
        <h1 className="text-[10rem] font-black text-slate-400 leading-none">404</h1>

        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{t("notFound.title")}</h2>

        <p className="text-slate-600 mb-10">{t("notFound.description")}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
          >
            {t("notFound.homeButton")}
          </Link>

          <Link
            to="/quiz"
            className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
          >
            {t("notFound.quizButton")}
          </Link>
        </div>
      </div>
    </div>
  );
}
