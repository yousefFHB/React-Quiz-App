import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h2 className="text-xl font-extrabold text-indigo-600 mb-4">
              {t("common.brand")}
            </h2>
            <p className="text-slate-600 text-sm">{t("footer.description")}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-indigo-400">{t("footer.quizzesTitle")}</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link to="/quiz">{t("footer.allQuizzes")}</Link>
              </li>
              <li>
                <Link to="/create-quiz">{t("footer.createQuiz")}</Link>
              </li>
              <li>
                <Link to="/profile">{t("footer.myProgress")}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-indigo-400">{t("footer.platformTitle")}</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link to="/about">{t("footer.howItWorks")}</Link>
              </li>
              <li>
                <Link to="/about">{t("footer.privacy")}</Link>
              </li>
              <li>
                <Link to="/about">{t("footer.support")}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-indigo-400">{t("footer.updatesTitle")}</h4>
            <p className="text-slate-600 text-sm mb-3">{t("footer.updatesDesc")}</p>
            <input
              type="email"
              placeholder={t("footer.emailPlaceholder")}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-2"
            />
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition">
              {t("footer.subscribe")}
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          {t("footer.copyright", { year })}
        </div>
      </div>
    </footer>
  );
}
