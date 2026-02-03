import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
     <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div>
            <h2 className="text-xl font-extrabold text-indigo-600 mb-4">
              کویزورا
            </h2>
            <p className="text-slate-600 text-sm">
              یک پلتفرم مدرن برای ساخت و حل کوییز‌ها.
              یادگیری هوشمندانه با چالش‌های تعاملی.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-indigo-400">کوییزها</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="/products">مشاهده کوییزها</Link></li>
              <li><Link to="/about">ساخت کوییز</Link></li>
              <li><Link to="/profile">پیشرفت من</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-indigo-400">پلتفرم</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="#">نحوه کار</Link></li>
              <li><Link to="#">حریم خصوصی</Link></li>
              <li><Link to="#">پشتیبانی</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-indigo-400">به‌روزرسانی‌ها</h4>
            <p className="text-slate-600 text-sm mb-3">
              از کوییزها و قابلیت‌های جدید باخبر شوید.
            </p>
            <input
              type="email"
              placeholder="ایمیل شما"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-2"
            />
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition">
              عضویت
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          © ۲۰۲۶ کویزورا — ساخته‌شده برای یادگیری
        </div>

      </div>
    </footer>
  );
}
