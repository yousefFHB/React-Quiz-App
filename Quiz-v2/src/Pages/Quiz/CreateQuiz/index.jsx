import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../../Context/QuizContext";
import useFormFields from "../../../Hooks/useFormFields";

export default function CreateQuiz({ onBack }) {
  const { createQuiz } = useContext(QuizContext);
  const navigate = useNavigate();

  const [quizFields, handleQuizChange] = useFormFields({
    title: "",
    description: "",
  });

  const [questionFields, handleQuestionChange, setQuestionFields] = useFormFields({
    text: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctIndex: "0",
  });

  const [questions, setQuestions] = useState([]);
  const [formError, setFormError] = useState("");
  const [questionError, setQuestionError] = useState("");

  const handleAddQuestion = () => {
    const options = [
      questionFields.option1,
      questionFields.option2,
      questionFields.option3,
      questionFields.option4,
    ].map((opt) => opt.trim());

    if (!questionFields.text.trim() || options.some((opt) => !opt)) {
      setQuestionError("Please fill the question and all options.");
      return;
    }

    const newQuestion = {
      text: questionFields.text.trim(),
      options,
      correctIndex: Number(questionFields.correctIndex),
    };

    setQuestions((prev) => [...prev, newQuestion]);
    setQuestionFields({
      text: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctIndex: "0",
    });
    setQuestionError("");
  };

  const handleRemoveQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (questions.length === 0) {
      setFormError("Add at least one question before saving.");
      return;
    }

    const newQuiz = {
      id: uuid(),
      title: quizFields.title.trim(),
      description: quizFields.description.trim(),
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
    <>
      <div className="w-full bg-linear-to-br from-indigo-500 to-purple-600 py-20">
        <form
          onSubmit={handleSubmit}
          dir="rtl"
          className="bg-white border  border-slate-200 rounded-2xl p-8 shadow-xl max-w-xl mx-auto space-y-6"
        >
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-extrabold text-slate-800">ساخت کوییز جدید</h2>
            <p className="text-sm text-slate-500 mt-1">اطلاعات آزمون و سوال خود را وارد کنید.</p>

          </div>

          <div className="space-y-4">

            <input
              name="title"
              placeholder="عنوان کوییز (مثلاً: مفاهیم React)"
              value={quizFields.title}
              onChange={handleQuizChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              required
            />


            <textarea
              name="description"
              placeholder="توضیح کوتاه درباره این آزمون..."
              value={quizFields.description}
              onChange={handleQuizChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all min-h-[100px]"
              required
            />

            <div className="pt-2">
              <label className="text-xs font-bold text-indigo-600 mb-2 block mr-1">صورت سوال</label>
              <input
                name="text"
                placeholder="سوال خود را بنویسید..."
                value={questionFields.text}
                onChange={handleQuestionChange}
                className="w-full bg-indigo-50/30 border border-indigo-100 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="relative">
                  <span className="absolute left-3 top-3 text-[10px] text-slate-400 font-mono">{i + 1}</span>
                  <input
                    name={`option${i + 1}`}
                    placeholder={`گزینه ${i + 1}`}
                    value={questionFields[`option${i + 1}`]}
                    onChange={handleQuestionChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              ))}
            </div>

            <div className="pt-2">
              <label className="text-xs font-bold text-emerald-600 mb-2 block mr-1">پاسخ صحیح را انتخاب کنید</label>
              <select
                name="correctIndex"
                value={questionFields.correctIndex}
                onChange={handleQuestionChange}
                className="w-full bg-emerald-50/50 border border-emerald-100 text-emerald-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
              >
                <option value={0}>گزینه ۱ صحیح است</option>
                <option value={1}>گزینه ۲ صحیح است</option>
                <option value={2}>گزینه ۳ صحیح است</option>
                <option value={3}>گزینه ۴ صحیح است</option>
              </select>
            </div>

            {questionError && (
              <p className="text-xs font-semibold text-rose-500">{questionError}</p>
            )}

            <button
              type="button"
              onClick={handleAddQuestion}
              className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition-all"
            >
              Add Question
            </button>

            {questions.length > 0 && (
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                <div className="text-xs font-bold text-slate-600">
                  Questions: {questions.length}
                </div>
                {questions.map((q, index) => (
                  <div
                    key={`${q.text}-${index}`}
                    className="flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-3"
                  >
                    <div className="text-sm font-semibold text-slate-700">
                      {index + 1}. {q.text}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(index)}
                      className="text-xs font-semibold text-rose-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {formError && (
            <p className="text-sm font-semibold text-rose-500">{formError}</p>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-[2] bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-500 active:scale-[0.98] transition-all shadow-lg shadow-indigo-600/20"
            >
              ذخیره کوییز
            </button>

            <button
              type="button"
              onClick={onBack ? onBack : () => navigate("/quiz")}
              className="flex-1 border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
