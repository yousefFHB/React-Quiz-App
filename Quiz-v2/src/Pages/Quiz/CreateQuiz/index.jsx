import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import { QuizContext } from "../../../Context/QuizContext";
export default function CreateQuiz({ onBack }) {
  const { createQuiz } = useContext(QuizContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuiz = {
      id: uuid(),
      title,
      description,
      questions: [
        {
          text: question,
          options,
          correctIndex,
        },
      ],
    };

    createQuiz(newQuiz);
    onBack();
  };

  return (
    <>
      <div className="w-full bg-linear-to-br from-indigo-500 to-purple-600 py-20"> <form
        onSubmit={handleSubmit}
        dir="rtl"
        className="bg-white border  border-slate-200 rounded-2xl p-8 shadow-xl max-w-xl mx-auto space-y-6"
      >
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-extrabold text-slate-800">ساخت کوییز جدید</h2>
          <p className="text-sm text-slate-500 mt-1">اطلاعات آزمون و سوال خود را وارد کنید.</p>
        </div>

        <div className="space-y-4">
          {/* عنوان کوییز */}
          <input
            placeholder="عنوان کوییز (مثلاً: مفاهیم React)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            required
          />

          {/* توضیح کوتاه */}
          <textarea
            placeholder="توضیح کوتاه درباره این آزمون..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all min-h-[100px]"
            required
          />

          {/* سوال */}
          <div className="pt-2">
            <label className="text-xs font-bold text-indigo-600 mb-2 block mr-1">صورت سوال</label>
            <input
              placeholder="سوال خود را بنویسید..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-indigo-50/30 border border-indigo-100 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
              required
            />
          </div>

          {/* گزینه‌ها */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {options.map((opt, i) => (
              <div key={i} className="relative">
                <span className="absolute left-3 top-3 text-[10px] text-slate-400 font-mono">{i + 1}</span>
                <input
                  placeholder={`گزینه ${i + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[i] = e.target.value;
                    setOptions(newOptions);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  required
                />
              </div>
            ))}
          </div>

          {/* انتخاب گزینه صحیح */}
          <div className="pt-2">
            <label className="text-xs font-bold text-emerald-600 mb-2 block mr-1">پاسخ صحیح را انتخاب کنید</label>
            <select
              value={correctIndex}
              onChange={(e) => setCorrectIndex(Number(e.target.value))}
              className="w-full bg-emerald-50/50 border border-emerald-100 text-emerald-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
            >
              <option value={0}>گزینه ۱ صحیح است</option>
              <option value={1}>گزینه ۲ صحیح است</option>
              <option value={2}>گزینه ۳ صحیح است</option>
              <option value={3}>گزینه ۴ صحیح است</option>
            </select>
          </div>
        </div>

        {/* دکمه‌ها */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-[2] bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-500 active:scale-[0.98] transition-all shadow-lg shadow-indigo-600/20"
          >
            ذخیره کوییز
          </button>

          <button
            type="button"
            onClick={onBack}
            className="flex-1 border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all"
          >
            انصراف
          </button>
        </div>
      </form></div>




    </>
  );
}
