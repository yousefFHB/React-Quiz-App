import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { QuizContext } from "../../../Context/QuizContext";

const getLocalizedText = (value, language) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    return value[language] || value.fa || value.en || "";
  }
  return "";
};

const getLocalizedOptions = (options, language) => {
  if (!Array.isArray(options)) return [];
  return options.map((option) => {
    if (typeof option === "string") return option;
    if (typeof option === "object") return option[language] || option.fa || option.en || "";
    return "";
  });
};

export default function TakeQuiz() {
  const { id } = useParams();
  const { getQuizById } = useContext(QuizContext);
  const { t, i18n } = useTranslation();
  const language =
    i18n.language === "pr" || i18n.language === "fr" ? "fa" : i18n.language;

  const quiz = getQuizById(id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSelected(answers[currentIndex] ?? null);
  }, [answers, currentIndex]);

  if (!quiz) {
    return <p className="text-center mt-20">{t("quizTake.notFound")}</p>;
  }

  if (!quiz.questions || quiz.questions.length === 0) {
    return <p className="text-center mt-20">{t("quizTake.noQuestions")}</p>;
  }

  const question = quiz.questions[currentIndex];
  const localizedOptions = getLocalizedOptions(question.options, language);

  const score = useMemo(() => {
    return answers.reduce((total, answer, index) => {
      if (quiz.questions[index] && answer === quiz.questions[index].correctIndex) {
        return total + 1;
      }
      return total;
    }, 0);
  }, [answers, quiz.questions]);

  const handleNext = () => {
    if (selected === null) {
      setError(t("quizTake.selectOptionError"));
      return;
    }

    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = selected;
    setAnswers(nextAnswers);
    setError("");

    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex((previous) => previous + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setAnswers([]);
    setSubmitted(false);
    setError("");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-indigo-800">{getLocalizedText(quiz.title, language)}</h2>
        <span className="text-xs font-semibold text-slate-500">
          {t("quizTake.questionProgress", {
            current: currentIndex + 1,
            total: quiz.questions.length,
          })}
        </span>
      </div>

      {!submitted ? (
        <>
          <p className="text-slate-900 mb-6">{getLocalizedText(question.text, language)}</p>

          <div className="space-y-3 text-black">
            {localizedOptions.map((option, index) => (
              <button
                key={`${index}-${option}`}
                onClick={() => setSelected(index)}
                className={`w-full text-left px-4 py-2 rounded-lg border ${
                  selected === index
                    ? "border-indigo-600 text-indigo-800 bg-indigo-50"
                    : "border-slate-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {error && <p className="mt-4 text-sm text-rose-500">{error}</p>}

          <button onClick={handleNext} className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg">
            {currentIndex + 1 === quiz.questions.length ? t("quizTake.finish") : t("quizTake.next")}
          </button>
        </>
      ) : (
        <>
          <p
            className={`text-center text-lg font-semibold p-4 rounded-2xl ${
              score === quiz.questions.length ? "bg-green-900 text-white" : "bg-red-900 text-white"
            }`}
          >
            {t("quizTake.score", { score, total: quiz.questions.length })}
          </p>
          <button onClick={handleRestart} className="mt-6 w-full bg-slate-900 text-white py-2 rounded-lg">
            {t("quizTake.restart")}
          </button>
        </>
      )}
    </div>
  );
}
