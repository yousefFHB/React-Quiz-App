import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
   <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* HERO */}
     <section className="hero-bg min-h-screen flex items-center justify-center px-6">
      <div className="text-center lg:ml-150 bg-white/5 sm:ml-0 backdrop-blur-lg p-10 rounded-3xl shadow-xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-indigo-700">
          Quizora
        </h1>
        <p className="mt-4 text-lg text-gray-200 max-w-xl mx-auto">
          یادگیری هوشمند با کوییزهای تعاملی
        </p>

        <div className="mt-8 flex gap-4 justify-center">
         <Link to={"/quiz"}> <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition">
            شروع کنید
          </button></Link>
         <Link to={"/create-quiz"}> <button className="px-8 py-4 border border-white text-white rounded-xl hover:bg-indigo-100 hover:border-indigo-600 hover:text-indigo-600 transition">
            ساخت کوییز
          </button></Link>
        </div>
      </div>
    </section>

      {/* FEATURED QUIZZES */}
      <section className="w-full mx-auto px-6 py-24  bg-linear-to-br from-amber-600 via-slate-300 to-indigo-600">
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold text-sky-600 uppercase">
            کشف کنید
          </span>
          <h2 className="text-4xl font-extrabold mt-2">کوییز های ویژه</h2>
          <p className="text-slate-600 mt-4 max-w-xl mx-auto">
            کوییزهای محبوب برای به چالش کشیدن دانش شما
          </p>
        </div>

        {/* Quiz cards go here */}
      </section>

      {/* WHY QUIZORA */}
      <section className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              🧠
            </div>
            <h4 className="font-bold mb-2">یادگیری فعال</h4>
            <p className="text-slate-600 text-sm">
              با پاسخ دادن یاد بگیرید، نه فقط با خواندن{" "}
            </p>
          </div>

          <div>
            <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              ⚡
            </div>
            <h4 className="font-bold mb-2">بازخورد فوری</h4>
            <p className="text-slate-600 text-sm">
              بلافاصله نتیجه و توضیح پاسخ‌ها را ببینید
            </p>
          </div>

          <div>
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              📈
            </div>
            <h4 className="font-bold mb-2">پیگیری پیشرفت</h4>
            <p className="text-slate-600 text-sm">
              روند پیشرفت و امتیازات خود را دنبال کنید
            </p>
          </div>
        </div>
      </section>
    </div>

  );
}
