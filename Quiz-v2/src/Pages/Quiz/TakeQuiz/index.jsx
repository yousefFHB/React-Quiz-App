import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { QuizContext } from "../../../Context/QuizContext";
export default function TakeQuiz() {
  const { id } = useParams();
  const { getQuizById } = useContext(QuizContext);

  const quiz = getQuizById(id);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) {
    return <p className="text-center mt-20">کوییز پیدا نشد</p>;
  }

  const q = quiz.questions[0];

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-20">
      <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
      <p className="text-slate-600 mb-6">{q.text}</p>

      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full text-left px-4 py-2 rounded-lg border
              ${
                selected === i
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-slate-300"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        onClick={() => setSubmitted(true)}
        className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg"
      >
        ثبت پاسخ
      </button>

      {submitted && (
        <p className="mt-4 text-center font-semibold">
          {selected === q.correctIndex
            ? "✅ پاسخ صحیح!"
            : "❌ پاسخ اشتباه"}
        </p>
      )}
    </div>
  );
}
