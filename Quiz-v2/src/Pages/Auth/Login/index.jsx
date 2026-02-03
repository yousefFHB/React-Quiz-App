import React, { useContext, useState } from "react";
import useFormFields from "./../../../Hooks/useFormFields";
import { AuthContext } from "./../../../Context/AuthContext";
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const localUser = findLocalUser(fields.username, fields.password);

      if (localUser) {
        handleToken("LOCAL_TOKEN");
        handleUser({
          username: localUser.username,
          email: localUser.email,
        });
        notify("success", "Logged in locally");
        return;
      }

      const res = await fetch(
        `https://apitester.ir/api/Users/authenticate?userName=${fields.username}&password=${fields.password}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(fields),
        },
      );
      if (!res.ok) {
        throw new Error("username or password incorrect");
      }
      const data = await res.json();
      handleToken(data.token);
      setFields({
        username: "",
        password: "",
      });
      handleUser({
        username: data.username,
      });
      notify("success", "Logged in successfully");
    } catch (error) {
      setFields({
        username: "",
        password: "",
      });
      notify("error", error.message);
    }
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
      <h2 className="text-3xl font-extrabold text-slate-900 text-center">
        خوش آمدید
      </h2>

      <p className="text-sm text-slate-500 text-center">
        برای ادامه مسیر یادگیری وارد حساب خود شوید
      </p>

      <input
        type="text"
        name="username"
        value={fields.username}
        onChange={handleChange}
        placeholder="نام کاربری"
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
        placeholder="رمز عبور"
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
        {loading ? "...در حال ورود" : "ورود"}
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
        حساب کاربری ندارید؟ ثبت‌نام کنید{" "}
      </span>
    </form>    
  );
}
