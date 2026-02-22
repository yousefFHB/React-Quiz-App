import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import useFormFields from "../../../Hooks/useFormFields";
import { AuthContext } from "../../../Context/AuthContext";
import notify from "../../../Utils/Notify";
import { findLocalUser } from "../../../Utils/localUsers";
import Loading from "../../../Components/Loading";

export default function Login({ handlePageType }) {
  const [fields, handleChange, setFields] = useFormFields({
    username: "",
    password: "",
  });
  const { handleToken, handleUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const localUser = findLocalUser(fields.username, fields.password);

      if (localUser) {
        handleToken("LOCAL_TOKEN");
        handleUser({
          username: localUser.username,
          email: localUser.email,
        });
        setFields({ username: "", password: "" });
        notify("success", t("auth.login.successLocal"));
        return;
      }

      const response = await fetch(
        `https://apitester.ir/api/Users/authenticate?userName=${fields.username}&password=${fields.password}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(fields),
        },
      );

      if (!response.ok) {
        throw new Error(t("auth.login.invalidCredentials"));
      }

      const data = await response.json();
      handleToken(data.token);
      handleUser({ username: data.username, email: data.email ?? "" });
      setFields({ username: "", password: "" });
      notify("success", t("auth.login.success"));
    } catch (error) {
      setFields({ username: "", password: "" });
      notify("error", error.message || t("auth.errors.unexpected"));
    } finally {
      setLoading(false);
    }
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
      {loading && <Loading />}
      <h2 className="text-3xl font-extrabold text-slate-900 text-center">{t("auth.login.title")}</h2>
      <p className="text-sm text-slate-500 text-center">{t("auth.login.subtitle")}</p>

      <input
        type="text"
        name="username"
        value={fields.username}
        onChange={handleChange}
        placeholder={t("auth.login.usernamePlaceholder")}
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
        placeholder={t("auth.login.passwordPlaceholder")}
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
        {loading ? t("auth.login.loading") : t("auth.login.submit")}
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
        {t("auth.login.toggle")}
      </span>
    </form>
  );
}
