import React, { useState } from "react";
import useFormFields from "./../../../Hooks/useFormFields";
import notify from "../../../Utils/Notify";
import { localUsers, addLocalUser } from "../../../Utils/localUsers";

export default function Register({ handlePageType }) {
  const [fields, handleChange, setFields] = useFormFields({
    username: "",
    password: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { username, password, email } = fields;

    // Basic validation
    if (!username || !password || !email) {
      notify("error", "All fields are required");
      setLoading(false);
      return;
    }

    // Check duplicates
    addLocalUser({
  username: fields.username,
  password: fields.password,
  email: fields.email,
  createdAt: new Date().toISOString(),
});

notify("success", "Registered successfully");

    // Save user locally
    localUsers.push({
      username,
      password,
      email,
      createdAt: new Date().toISOString(),
    });

    // Reset form
    setFields({
      username: "",
      password: "",
      email: "",
    });

    notify("success", "Registered successfully");
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
        ساخت حساب کاربری{" "}
      </h2>

      <p className="text-sm text-slate-500 text-center">
        به کویزورا بپیوندید و یادگیری هوشمندانه را شروع کنید{" "}
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
        type="email"
        name="email"
        value={fields.email}
        onChange={handleChange}
        placeholder="آدرس ایمیل"
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
        {loading ? "در حال ساخت اکانت" : "ثبت نام"}
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
        حساب کاربری دارید؟ وارد شوید
      </span>
    </form>
  );
}
