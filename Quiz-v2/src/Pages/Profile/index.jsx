import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import NotLoggedIn from "./NotLoggedIn";
export default function Profile() {
  const { user } = useContext(AuthContext);

  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  if (!user) {
    return (
      <NotLoggedIn/>
     
  );
      
    
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-indigo-300 text-slate-700 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* ===== ACCOUNT INFO ===== */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">
            اطلاعات کاربری
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              ["نام کاربری", user.username, true],
              ["ایمیل", email, false],
              ["تلفن", phone, false],
              ["آدرس", address, false],
            ].map(([label, value, disabled], i) => (
              <div key={i}>
                <label className="text-sm text-slate-500">{label}</label>
                <input
                  disabled={disabled}
                  value={value}
                  onChange={(e) =>
                    !disabled && label === "ایمیل" && setEmail(e.target.value)
                  }
                  className="
                mt-1 w-full px-4 py-3 rounded-xl
                bg-slate-50 border border-slate-200
                focus:outline-none focus:ring-2 focus:ring-indigo-300
              "
                />
              </div>
            ))}
          </div>

          {/* MAP */}
          <div className="mt-6 h-64 rounded-2xl overflow-hidden border border-slate-200">
            <MapContainer
              center={[35.7219, 51.3347]}
              zoom={9}
              className="h-full w-full"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[35.7219, 51.3347]}>
                <Popup>موقعیت شما</Popup>
              </Marker>
            </MapContainer>
          </div>
        </section>

        {/* ===== SECURITY ===== */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">
            امنیت حساب
          </h2>

          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span>رمز عبور</span>
              <span className="tracking-widest text-slate-400">••••••••</span>
            </div>

            <button className="w-fit px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
              تغییر رمز عبور
            </button>

            <div className="flex items-center justify-between">
              <span>احراز هویت دو مرحله‌ای</span>
              <input type="checkbox" className="accent-indigo-600 scale-110" />
            </div>

            <div className="text-sm text-slate-400">آخرین ورود: ۲ ساعت پیش</div>
          </div>
        </section>

        {/* ===== QUIZ / ORDERS ===== */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">
            فعالیت‌های آموزشی
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-yellow-50 border border-yellow-200">
              <h4 className="text-yellow-600 font-semibold mb-2">
                در حال انجام
              </h4>
              <p className="text-sm">کوئیزی فعال نیست</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <h4 className="text-emerald-600 font-semibold mb-2">تکمیل شده</h4>
              <p className="text-sm">۲ آزمون موفق</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-slate-500 font-semibold mb-2">آرشیو</h4>
              <p className="text-sm">مشاهده تاریخچه</p>
            </div>
          </div>
        </section>

        {/* ===== CRM ===== */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">
            پشتیبانی و ارتباط
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <button className="p-4 rounded-2xl bg-sky-50 hover:bg-sky-100 transition">
              تماس با پشتیبانی
            </button>

            <button className="p-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 transition">
              ارسال بازخورد
            </button>

            <button className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition">
              گزارش مشکل
            </button>

            <button className="p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition">
              حذف حساب کاربری
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
