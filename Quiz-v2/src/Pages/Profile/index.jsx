import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AuthContext } from "../../Context/AuthContext";
import NotLoggedIn from "./NotLoggedIn";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { t } = useTranslation();

  if (!user) {
    return <NotLoggedIn />;
  }

  const infoFields = [
    {
      key: "username",
      label: t("profile.account.username"),
      value: user.username,
      disabled: true,
      onChange: () => {},
      placeholder: "",
    },
    {
      key: "email",
      label: t("profile.account.email"),
      value: email,
      disabled: false,
      onChange: setEmail,
      placeholder: "",
    },
    {
      key: "phone",
      label: t("profile.account.phone"),
      value: phone,
      disabled: false,
      onChange: setPhone,
      placeholder: t("profile.account.phonePlaceholder"),
    },
    {
      key: "address",
      label: t("profile.account.address"),
      value: address,
      disabled: false,
      onChange: setAddress,
      placeholder: t("profile.account.addressPlaceholder"),
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-indigo-300 text-slate-700 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-12">
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">{t("profile.account.title")}</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {infoFields.map((field) => (
              <div key={field.key}>
                <label className="text-sm text-slate-500">{field.label}</label>
                <input
                  disabled={field.disabled}
                  value={field.value}
                  placeholder={field.placeholder}
                  onChange={(event) => !field.disabled && field.onChange(event.target.value)}
                  className="
                    mt-1 w-full px-4 py-3 rounded-xl
                    bg-slate-50 border border-slate-200
                    focus:outline-none focus:ring-2 focus:ring-indigo-300
                  "
                />
              </div>
            ))}
          </div>

          <div className="mt-6 h-64 rounded-2xl overflow-hidden border border-slate-200">
            <MapContainer center={[35.7219, 51.3347]} zoom={9} className="h-full w-full">
              <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[35.7219, 51.3347]}>
                <Popup>{t("profile.account.mapPopup")}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">{t("profile.security.title")}</h2>

          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span>{t("profile.security.password")}</span>
              <span className="tracking-widest text-slate-400">••••••••</span>
            </div>

            <button className="w-fit px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
              {t("profile.security.changePassword")}
            </button>

            <div className="flex items-center justify-between">
              <span>{t("profile.security.twoFactor")}</span>
              <input type="checkbox" className="accent-indigo-600 scale-110" />
            </div>

            <div className="text-sm text-slate-400">{t("profile.security.lastLogin")}</div>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">{t("profile.activity.title")}</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-yellow-50 border border-yellow-200">
              <h4 className="text-yellow-600 font-semibold mb-2">{t("profile.activity.inProgress")}</h4>
              <p className="text-sm">{t("profile.activity.inProgressValue")}</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <h4 className="text-emerald-600 font-semibold mb-2">{t("profile.activity.completed")}</h4>
              <p className="text-sm">{t("profile.activity.completedValue")}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-slate-500 font-semibold mb-2">{t("profile.activity.archive")}</h4>
              <p className="text-sm">{t("profile.activity.archiveValue")}</p>
            </div>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">{t("profile.support.title")}</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <button className="p-4 rounded-2xl bg-sky-50 hover:bg-sky-100 transition">
              {t("profile.support.contact")}
            </button>

            <button className="p-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 transition">
              {t("profile.support.feedback")}
            </button>

            <button className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition">
              {t("profile.support.report")}
            </button>

            <button className="p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition">
              {t("profile.support.deleteAccount")}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
