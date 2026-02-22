import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen relative bg-slate-50 text-slate-800">
      <section className="hero-bg min-h-screen flex items-center justify-center px-6">
        <div className="text-center lg:ml-150 bg-white/5 sm:ml-0 backdrop-blur-lg p-10 rounded-3xl shadow-xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-indigo-700">{t("common.brand")}</h1>
          <p className="mt-4 text-lg text-gray-200 max-w-xl mx-auto">{t("home.heroTagline")}</p>

          <div className="mt-8 flex gap-4 justify-center">
            <Link to="/quiz">
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition">
                {t("home.start")}
              </button>
            </Link>
            <Link to="/create-quiz">
              <button className="px-8 py-4 border border-white text-white rounded-xl hover:bg-indigo-100 hover:border-indigo-600 hover:text-indigo-600 transition">
                {t("home.createQuiz")}
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full mx-auto px-6 py-24 bg-linear-to-br from-amber-600 via-slate-300 to-indigo-600">
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold text-sky-600 uppercase">{t("home.discover")}</span>
          <h2 className="text-4xl font-extrabold mt-2">{t("home.featuredTitle")}</h2>
          <p className="text-slate-600 mt-4 max-w-xl mx-auto">{t("home.featuredDesc")}</p>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              🧠
            </div>
            <h4 className="font-bold mb-2">{t("home.cards.activeLearning.title")}</h4>
            <p className="text-slate-600 text-sm">{t("home.cards.activeLearning.body")}</p>
          </div>

          <div>
            <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              ⚡
            </div>
            <h4 className="font-bold mb-2">{t("home.cards.instantFeedback.title")}</h4>
            <p className="text-slate-600 text-sm">{t("home.cards.instantFeedback.body")}</p>
          </div>

          <div>
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              📈
            </div>
            <h4 className="font-bold mb-2">{t("home.cards.trackProgress.title")}</h4>
            <p className="text-slate-600 text-sm">{t("home.cards.trackProgress.body")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
