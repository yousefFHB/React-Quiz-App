import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../Context/AuthContext";
import { QuizContext } from "../../Context/QuizContext";
import NotLoggedIn from "../Profile/NotLoggedIn";

const getLocalizedText = (value, language) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    return value[language] || value.fa || value.en || "";
  }
  return "";
};

export default function Quiz() {
  const { user } = useContext(AuthContext);
  const { quizzes, setQuizzes } = useContext(QuizContext);
  const { t, i18n } = useTranslation();
  const language =
    i18n.language === "pr" || i18n.language === "fr" ? "fa" : i18n.language;

  const handleRemove = () => {
    if (window.confirm(t("quizList.confirmRemoveAll"))) {
      setQuizzes([]);
    }
  };

  if (!user) {
    return <NotLoggedIn />;
  }

  return (
    <div className="relative min-h-screen bg-linear-to-br from-indigo-600 via-slate-300 to-white px-6 py-24">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-slate-100/40 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900">{t("quizList.title")}</h1>
          <div className="flex gap-6">
            <Link to="/create-quiz">
              <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition">
                {t("quizList.createButton")}
              </button>
            </Link>
            <button
              onClick={handleRemove}
              className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 transition"
            >
              {t("quizList.removeAllButton")}
            </button>
          </div>
        </div>

        {quizzes.length === 0 ? (
          <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-2xl p-10 text-center shadow-lg">
            <h3 className="text-xl font-bold mb-3">{t("quizList.emptyTitle")}</h3>
            <p className="text-slate-600 mb-6">{t("quizList.emptyDescription")}</p>

            <Link to="/create-quiz">
              <button className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition">
                {t("quizList.emptyAction")}
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white/80 backdrop-blur border border-slate-200 rounded-2xl p-6 shadow hover:shadow-xl transition"
              >
                <h3 className="text-lg text-indigo-800 font-bold mb-2">
                  {getLocalizedText(quiz.title, language)}
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  {getLocalizedText(quiz.description, language)}
                </p>

                <Link
                  to={`/quiz/${quiz.id}`}
                  className="inline-block text-indigo-600 font-semibold hover:underline"
                >
                  {t("quizList.joinButton")} →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
