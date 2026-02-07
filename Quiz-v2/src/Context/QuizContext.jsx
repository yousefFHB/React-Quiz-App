import { createContext, useEffect, useState } from "react";

export const QuizContext = createContext();

export default function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState(() => {
    const stored = localStorage.getItem("quizzes");
    return stored ? JSON.parse(stored) : [];
  });
  const handleRemove=()=>{
    setQuizzes([]);
  }

  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  const createQuiz = (quiz) => {
    setQuizzes((prev) => [...prev, quiz]);
  };

  const getQuizById = (id) => {
    return quizzes.find((q) => q.id === id);
  };

  return (
    <QuizContext.Provider value={{ quizzes, createQuiz, getQuizById ,handleRemove,setQuizzes}}>
      {children}
    </QuizContext.Provider>
  );
}
