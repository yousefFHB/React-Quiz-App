import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-500/20">

  {/* ================= HERO ================= */}
  <section className="relative py-24 lg:py-32 overflow-hidden border-b border-slate-200">
    {/* soft gradient background */}
    <div className="absolute inset-0 bg-linear-to-br from-indigo-600/10 via-slate-200 to-white" />
    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] bg-indigo-500/20 blur-3xl rounded-full" />

    <div className="relative max-w-7xl mx-auto px-6">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          آینده‌ی یادگیری  
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-sky-500">
            با کوییزهای هوشمند
          </span>
        </h1>

        <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
          Quizora یک پلتفرم تعاملی برای ساخت، اشتراک‌گذاری و شرکت در آزمون‌هاست.  
          یادگیری را ساده‌تر، سریع‌تر و لذت‌بخش‌تر تجربه کن.
        </p>
      </div>
    </div>
  </section>

  {/* ================= STORY / PHILOSOPHY ================= */}
  <section className="max-w-7xl mx-auto px-6 py-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      {/* Visual */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-sky-500 rounded-2xl blur opacity-20 group-hover:opacity-35 transition" />
        <div className="relative aspect-video lg:aspect-square bg-white rounded-2xl border border-slate-200 flex items-center justify-center shadow-sm">
          <span className="text-slate-400 text-sm italic">
            پیش‌نمایش محیط آزمون
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">
          فلسفه Quizora
        </h2>

        <p className="text-slate-600 leading-relaxed">
          ما باور داریم یادگیری زمانی مؤثر است که تعاملی و قابل سنجش باشد.
          Quizora به شما اجازه می‌دهد آزمون‌هایی بسازید که واقعاً سطح دانش را نشان دهند.
        </p>

        <p className="text-slate-600 leading-relaxed">
          از کلاس‌های آموزشی تا رقابت‌های دوستانه،  
          اینجا جایی است که سؤال‌ها به تجربه تبدیل می‌شوند.
        </p>

        <div className="pt-4 flex gap-10">
          <div>
            <p className="text-2xl font-bold text-slate-900">+10k</p>
            <p className="text-slate-500 text-sm">کاربر فعال</p>
          </div>
          <div className="w-px h-12 bg-slate-200" />
          <div>
            <p className="text-2xl font-bold text-slate-900">+5k</p>
            <p className="text-slate-500 text-sm">کوییز ساخته‌شده</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ================= FEATURES ================= */}
  <section className="bg-slate-50 py-24 border-y border-slate-200">
    <div className="max-w-7xl mx-auto px-6 text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">
        چرا Quizora؟
      </h2>
      <p className="text-slate-500">
        ویژگی‌هایی که یادگیری را بهتر می‌کنند
      </p>
    </div>

    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "ساخت آسان کوییز",
          desc: "بدون نیاز به دانش فنی، آزمون‌های حرفه‌ای بساز."
        },
        {
          title: "تجربه تعاملی",
          desc: "شرکت‌کنندگان نتایج را لحظه‌ای مشاهده می‌کنند."
        },
        {
          title: "مدیریت و تحلیل",
          desc: "وضعیت آزمون‌ها و عملکرد کاربران را بررسی کن."
        }
      ].map((item, i) => (
        <div
          key={i}
          className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500/40 transition group shadow-sm"
        >
          <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition">
            <div className="w-5 h-5 border-2 border-indigo-500 group-hover:border-white rounded-md" />
          </div>

          <h3 className="text-xl font-bold mb-3">
            {item.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </section>

  {/* ================= CTA ================= */}
  <section className="max-w-7xl mx-auto px-6 py-24 text-center">
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-br from-indigo-600 to-sky-500 p-14 lg:p-20 text-white">
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/20 blur-3xl rounded-full" />

      <h2 className="text-4xl md:text-5xl font-extrabold mb-8 relative z-10">
        آماده‌ای اولین کوییزت رو بسازی؟
      </h2>

      <Link
        to="/quiz"
        className="inline-block bg-white text-indigo-600 font-bold px-10 py-4 rounded-full transition-all hover:bg-slate-100 active:scale-95 shadow-lg relative z-10"
      >
        شروع کن
      </Link>
    </div>
  </section>

</div>

  );
}