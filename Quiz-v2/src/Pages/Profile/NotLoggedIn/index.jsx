import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotLoggedIn() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-linear-to-br from-sky-50 to-indigo-300">
      <div className="max-w-md w-full text-center bg-white/50 backdrop-blur-lg border border-slate-200 rounded-3xl p-8 shadow-xl">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-indigo-300/30 blur-2xl rounded-full animate-pulse" />
          <div className="relative bg-white border border-slate-200 w-24 h-24 rounded-2xl flex items-center justify-center">
            <svg
              className="w-10 h-10 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-800 mb-3">{t("notLoggedIn.title")}</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">{t("notLoggedIn.description")}</p>

        <Link
          to="/auth"
          className="block w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition active:scale-95 shadow-lg shadow-indigo-200"
        >
          {t("notLoggedIn.button")}
        </Link>

        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-slate-400" />
          <span className="text-[10px] tracking-widest text-slate-500 font-semibold">
            {t("notLoggedIn.secureAccess")}
          </span>
          <div className="h-px w-10 bg-slate-400" />
        </div>
      </div>
    </div>
  );
}
