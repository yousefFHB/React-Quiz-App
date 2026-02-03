import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

export default function Nav() {
  const { token, handleToken } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`sticky top-0 z-50 bg-gray-100 ${isScrolled ? "bg-white/50 backdrop-blur-xl" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
          کوییز‌ورا 🎯
        </h2>

        {/* Nav */}
        <ul className="flex items-center gap-8 text-sm font-semibold text-slate-600">
          <li><Link to="/">خانه</Link></li>
          <li><Link to="/create">ساخت آزمون</Link></li>
          <li><Link to="/quizzes">شرکت در آزمون</Link></li>
          <li><Link to="/about">درباره ما</Link></li>

          {token ? (
            <>
              <Link
                to="/profile"
                className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              >
                پروفایل
              </Link>
              <button
                onClick={() => handleToken(null)}
                className="text-xs text-rose-500"
              >
                خروج
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="px-5 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-500"
            >
              ورود / ثبت‌نام
            </Link>
          )}
        </ul>
      </div>
    </div>

  );
}
