import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { QuizContext } from "../../../Context/QuizContext";

export default function TakeQuiz() {
  const { id } = useParams();
  const { getQuizById } = useContext(QuizContext);

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
    return <p className="text-center mt-20">کوییز پیدا نشد</p>;
  }

  if (!quiz.questions || quiz.questions.length === 0) {
    return (
      <p className="text-center mt-20">هیچ سوالی وجود ندارد</p>
    );
  }

  const q = quiz.questions[currentIndex];

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
      setError("Select an option to continue.");
      return;
    }

    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = selected;
    setAnswers(nextAnswers);
    setError("");

    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex((prev) => prev + 1);
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
        <h2 className="text-2xl font-bold text-indigo-800">{quiz.title}</h2>
        <span className="text-xs font-semibold text-slate-500">
          سوال ها  {currentIndex + 1} / {quiz.questions.length}
        </span>
      </div>

      {!submitted ? (
        <>
          <p className="text-slate-900 mb-6">{q.text}</p>

          <div className="space-y-3 text-black">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-4  py-2 rounded-lg border
                  ${selected === i
                    ? "border-indigo-600  text-indigo-800 bg-indigo-50"
                    : "border-slate-300"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {error && <p className="mt-4 text-sm text-rose-500">{error}</p>}

          <button
            onClick={handleNext}
            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg"
          >
            {currentIndex + 1 === quiz.questions.length
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        </>
      ) : (
        <>
          <p dir="rtl" className={`text-center text-lg  font-semibold p-4 rounded-2xl text-slate-700 ${score === quiz.questions.length ? "bg-green-900 text-white" : "bg-red-900 text-white"
            }`}>
            نمره شما:  {quiz.questions.length} / {score}

          </p>
          <button
            onClick={handleRestart}
            className="mt-6 w-full bg-slate-900 text-white py-2 rounded-lg"
          >
            تللاش دوباره
          </button>
        </>
      )}
    </div>
  );
}
