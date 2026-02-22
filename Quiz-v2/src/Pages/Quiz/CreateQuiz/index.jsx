import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { QuizContext } from "../../../Context/QuizContext";
import useFormFields from "../../../Hooks/useFormFields";

const getLocalizedText = (value, language) => {
  if (!value || typeof value !== "object") return "";
  return value[language] || value.fa || value.en || "";
};

export default function CreateQuiz({ onBack }) {
  const { createQuiz } = useContext(QuizContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const language =
    i18n.language === "pr" || i18n.language === "fr" ? "fa" : i18n.language;

  const [quizFields, handleQuizChange] = useFormFields({
    titleEn: "",
    titleFa: "",
    descriptionEn: "",
    descriptionFa: "",
  });

  const [questionFields, handleQuestionChange, setQuestionFields] = useFormFields({
    textEn: "",
    textFa: "",
    option1En: "",
    option1Fa: "",
    option2En: "",
    option2Fa: "",
    option3En: "",
    option3Fa: "",
    option4En: "",
    option4Fa: "",
    correctIndex: "0",
  });

  const [questions, setQuestions] = useState([]);
  const [formError, setFormError] = useState("");
  const [questionError, setQuestionError] = useState("");

  const handleAddQuestion = () => {
    const options = [1, 2, 3, 4].map((index) => ({
      en: questionFields[`option${index}En`].trim(),
      fa: questionFields[`option${index}Fa`].trim(),
    }));

    const hasMissingQuestionText = !questionFields.textEn.trim() || !questionFields.textFa.trim();
    const hasMissingOption = options.some((option) => !option.en || !option.fa);

    if (hasMissingQuestionText || hasMissingOption) {
      setQuestionError(t("quizCreate.errors.questionAndOptionsRequired"));
      return;
    }

    const newQuestion = {
      text: {
        en: questionFields.textEn.trim(),
        fa: questionFields.textFa.trim(),
      },
      options,
      correctIndex: Number(questionFields.correctIndex),
    };

    setQuestions((previous) => [...previous, newQuestion]);
    setQuestionFields({
      textEn: "",
      textFa: "",
      option1En: "",
      option1Fa: "",
      option2En: "",
      option2Fa: "",
      option3En: "",
      option3Fa: "",
      option4En: "",
      option4Fa: "",
      correctIndex: "0",
    });
    setQuestionError("");
  };

  const handleRemoveQuestion = (index) => {
    setQuestions((previous) => previous.filter((_, current) => current !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (questions.length === 0) {
      setFormError(t("quizCreate.errors.addAtLeastOneQuestion"));
      return;
    }

    const newQuiz = {
      id: uuid(),
      title: {
        en: quizFields.titleEn.trim(),
        fa: quizFields.titleFa.trim(),
      },
      description: {
        en: quizFields.descriptionEn.trim(),
        fa: quizFields.descriptionFa.trim(),
      },
      questions,
    };

    createQuiz(newQuiz);
    setFormError("");

    if (onBack) {
      onBack();
    } else {
      navigate("/quiz");
    }
  };

  return (
    <div className="w-full bg-linear-to-br from-indigo-500 to-purple-600 py-20">
      <form
        onSubmit={handleSubmit}
        dir={language === "fa" ? "rtl" : "ltr"}
        className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl max-w-4xl mx-auto space-y-6"
      >
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-extrabold text-slate-800">{t("quizCreate.title")}</h2>
          <p className="text-sm text-slate-500 mt-1">{t("quizCreate.subtitle")}</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-indigo-600">{t("quizCreate.englishVersion")}</label>
              <input
                name="titleEn"
                placeholder={t("quizCreate.quizTitleEnPlaceholder")}
                value={quizFields.titleEn}
                onChange={handleQuizChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                required
              />
              <textarea
                name="descriptionEn"
                placeholder={t("quizCreate.quizDescriptionEnPlaceholder")}
                value={quizFields.descriptionEn}
                onChange={handleQuizChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all min-h-25"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-600">{t("quizCreate.persianVersion")}</label>
              <input
                name="titleFa"
                placeholder={t("quizCreate.quizTitleFaPlaceholder")}
                value={quizFields.titleFa}
                onChange={handleQuizChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                required
              />
              <textarea
                name="descriptionFa"
                placeholder={t("quizCreate.quizDescriptionFaPlaceholder")}
                value={quizFields.descriptionFa}
                onChange={handleQuizChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all min-h-25"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="text-xs font-bold text-indigo-600 mb-2 block">{t("quizCreate.questionTitle")}</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="textEn"
                placeholder={t("quizCreate.questionEnPlaceholder")}
                value={questionFields.textEn}
                onChange={handleQuestionChange}
                className="w-full bg-indigo-50/30 border border-indigo-100 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
              />
              <input
                name="textFa"
                placeholder={t("quizCreate.questionFaPlaceholder")}
                value={questionFields.textFa}
                onChange={handleQuestionChange}
                className="w-full bg-emerald-50/40 border border-emerald-100 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  name={`option${index}En`}
                  placeholder={t("quizCreate.optionEnPlaceholder", { index })}
                  value={questionFields[`option${index}En`]}
                  onChange={handleQuestionChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                <input
                  name={`option${index}Fa`}
                  placeholder={t("quizCreate.optionFaPlaceholder", { index })}
                  value={questionFields[`option${index}Fa`]}
                  onChange={handleQuestionChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            ))}
          </div>

          <div className="pt-2">
            <label className="text-xs font-bold text-emerald-600 mb-2 block">
              {t("quizCreate.correctOptionLabel")}
            </label>
            <select
              name="correctIndex"
              value={questionFields.correctIndex}
              onChange={handleQuestionChange}
              className="w-full bg-emerald-50/50 border border-emerald-100 text-emerald-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4].map((index) => (
                <option key={index} value={index - 1}>
                  {t("quizCreate.correctOptionValue", { index })}
                </option>
              ))}
            </select>
          </div>

          {questionError && <p className="text-xs font-semibold text-rose-500">{questionError}</p>}

          <button
            type="button"
            onClick={handleAddQuestion}
            className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition-all"
          >
            {t("quizCreate.addQuestion")}
          </button>

          {questions.length > 0 && (
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
              <div className="text-xs font-bold text-slate-600">
                {t("quizCreate.questionsCount", { count: questions.length })}
              </div>
              {questions.map((question, index) => (
                <div
                  key={`${index}-${question.correctIndex}`}
                  className="flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-3"
                >
                  <div className="text-sm font-semibold text-slate-700">
                    {index + 1}. {getLocalizedText(question.text, language)}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(index)}
                    className="text-xs font-semibold text-rose-500"
                  >
                    {t("quizCreate.removeQuestion")}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {formError && <p className="text-sm font-semibold text-rose-500">{formError}</p>}

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-2 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-500 active:scale-[0.98] transition-all shadow-lg shadow-indigo-600/20"
          >
            {t("quizCreate.saveQuiz")}
          </button>

          <button
            type="button"
            onClick={onBack ? onBack : () => navigate("/quiz")}
            className="flex-1 border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all"
          >
            {t("quizCreate.cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}
