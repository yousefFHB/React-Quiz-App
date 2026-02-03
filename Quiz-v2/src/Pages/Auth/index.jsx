import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { AnimatePresence, motion } from "framer-motion";

export default function Auth() {
  const [pageType, setPageType] = useState("login");

  const handlePageType = () => {
    setPageType(pageType === "login" ? "register" : "login");
  };

  return (
   <div className="relative min-h-screen bg-linear-to-br from-indigo-600 via-slate-300 to-white flex items-center justify-center overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-slate-100/30 rounded-full blur-3xl" />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {pageType === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
            >
              <Login handlePageType={handlePageType} />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <Register handlePageType={handlePageType} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
