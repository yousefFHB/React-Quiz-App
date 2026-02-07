import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import NotLoggedIn from "../Profile/NotLoggedIn";
import CreateQuiz from "./CreateQuiz";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { QuizContext } from "../../Context/QuizContext";

export default function Quiz() {
  const { user } = useContext(AuthContext);
  const { quizzes,setQuizzes } = useContext(QuizContext);
  const [pageType, setPageType] = useState("list");
  
  const handleRemove = () => {
    if (window.confirm("آیا از حذف تمام کوییزها اطمینان دارید؟")) {
      setQuizzes([]);
    }
  };



  if (!user) {
    return <NotLoggedIn />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-600 via-slate-300 to-white px-6 py-24">
      {/* background accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-slate-100/40 rounded-full blur-3xl" />

      <div className="relative  z-10 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {pageType === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-10">
                <h1 className="text-3xl font-extrabold text-slate-900">
                  آزمون‌های موجود
                </h1>
                <div className="flex gap-6">

                <Link to={"/create-quiz"}><button

                  className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
                >
                  ساخت کوییز جدید
                </button></Link>
                <button onClick={handleRemove} className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 transition"
                > حذف سوالات </button></div>
              </div>

              {/* QUIZ LIST */}
              {quizzes.length === 0 ? (
                <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-2xl p-10 text-center shadow-lg">
                  <h3 className="text-xl font-bold mb-3">
                    کوییزی در دسترس نیست
                  </h3>
                  <p className="text-slate-600 mb-6">
                    هنوز هیچ آزمونی ساخته نشده.
                    می‌تونی اولین کوییز رو خودت بسازی 👇
                  </p>

                  <Link to={"/create-quiz"} ><button

                    className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
                  >
                    رفتن به ساخت کوییز
                  </button></Link>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="bg-white/80 backdrop-blur border border-slate-200 rounded-2xl p-6 shadow hover:shadow-xl transition"
                    >
                      <h3 className="text-lg text-indigo-800 font-bold mb-2">
                        {quiz.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4">
                        {quiz.description}
                      </p>

                      <Link
                        to={`/quiz/${quiz.id}`}
                        className="inline-block text-indigo-600 font-semibold hover:underline"
                      >
                        شرکت در آزمون →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {pageType === "create" && (
            <motion.div
              key="create"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <CreateQuiz onBack={() => setPageType("list")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
