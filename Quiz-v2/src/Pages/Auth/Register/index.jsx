import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useFormFields from "../../../Hooks/useFormFields";
import notify from "../../../Utils/Notify";
import { addLocalUser } from "../../../Utils/localUsers";

export default function Register({ handlePageType }) {
  const [fields, handleChange, setFields] = useFormFields({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const { username, password, email } = fields;

    if (!username || !password || !email) {
      notify("error", t("auth.register.errors.required"));
      setLoading(false);
      return;
    }

    addLocalUser({
      username,
      password,
      email,
      createdAt: new Date().toISOString(),
    });

    setFields({
      username: "",
      password: "",
      email: "",
    });

    notify("success", t("auth.register.success"));
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        max-w-md mx-auto my-14
        bg-white/30
        backdrop-blur-lg
        border border-slate-200
        rounded-2xl
        shadow-lg
        px-8 py-8
        flex flex-col gap-5
      "
    >
      <h2 className="text-3xl font-extrabold text-slate-900 text-center">{t("auth.register.title")}</h2>
      <p className="text-sm text-slate-500 text-center">{t("auth.register.subtitle")}</p>

      <input
        type="text"
        name="username"
        value={fields.username}
        onChange={handleChange}
        placeholder={t("auth.register.usernamePlaceholder")}
        className="
          w-full px-4 py-3
          border border-slate-500
          rounded-xl
          text-slate-800
          placeholder:text-slate-400
          focus:outline-none
          focus:ring-2 focus:ring-indigo-500/30
          focus:border-indigo-500
          transition
        "
      />

      <input
        type="email"
        name="email"
        value={fields.email}
        onChange={handleChange}
        placeholder={t("auth.register.emailPlaceholder")}
        className="
          w-full px-4 py-3
          border border-slate-500
          rounded-xl
          text-slate-800
          placeholder:text-slate-400
          focus:outline-none
          focus:ring-2 focus:ring-indigo-500/30
          focus:border-indigo-500
          transition
        "
      />

      <input
        type="password"
        name="password"
        value={fields.password}
        onChange={handleChange}
        placeholder={t("auth.register.passwordPlaceholder")}
        className="
          w-full px-4 py-3
          border border-slate-500
          rounded-xl
          text-slate-800
          placeholder:text-slate-400
          focus:outline-none
          focus:ring-2 focus:ring-indigo-500/30
          focus:border-indigo-500
          transition
        "
      />

      <button
        type="submit"
        disabled={loading}
        className="
          mt-2
          w-full py-3
          rounded-xl
          bg-indigo-600
          text-white font-semibold
          hover:bg-indigo-500
          transition
          disabled:opacity-50
        "
      >
        {loading ? t("auth.register.loading") : t("auth.register.submit")}
      </button>

      <span
        onClick={handlePageType}
        className="
          text-sm text-center
          text-slate-500
          hover:text-indigo-600
          cursor-pointer
          transition
        "
      >
        {t("auth.register.toggle")}
      </span>
    </form>
  );
}
