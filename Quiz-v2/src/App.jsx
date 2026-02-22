import React, { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import {
  Profile,
  Auth,
  Home,
  NotFound,
  Quiz,
  TakeQuiz,
  CreateQuiz,
  About,
} from "./Pages";
import NotLoggedIn from "./Pages/Profile/NotLoggedIn";

import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import PageWrapper from "./Components/PageWrapper";

import { AuthContext } from "./Context/AuthContext";

export default function App() {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const language =
      i18n.language === "pr" || i18n.language === "fr" ? "fa" : i18n.language;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <>
      <Nav />

      <main className="min-h-screen bg-zinc-950">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />
            <Route
              path="/about"
              element={
                <PageWrapper>
                  <About />
                </PageWrapper>
              }
            />
            <Route
              path="/quiz"
              element={
                !token ? (
                  <PageWrapper>
                    <NotLoggedIn />
                  </PageWrapper>
                ) : (
                  <PageWrapper>
                    <Quiz />
                  </PageWrapper>
                )
              }
            />
            <Route
              path="/create-quiz"
              element={
                !token ? (
                  <PageWrapper>
                    <NotLoggedIn />
                  </PageWrapper>
                ) : (
                  <PageWrapper>
                    <CreateQuiz />
                  </PageWrapper>
                )
              }
            />
            <Route
              path="/quiz/:id"
              element={
                !token ? (
                  <PageWrapper>
                    <NotLoggedIn />
                  </PageWrapper>
                ) : (
                  <PageWrapper>
                    <TakeQuiz />
                  </PageWrapper>
                )
              }
            />
            <Route path="/take-quiz" element={<Navigate to="/quiz" />} />

            <Route
              path="/auth"
              element={
                token ? (
                  <Navigate to="/profile" />
                ) : (
                  <PageWrapper>
                    <Auth />
                  </PageWrapper>
                )
              }
            />

            <Route
              path="/profile"
              element={
                !token ? (
                  <PageWrapper>
                    <NotLoggedIn />
                  </PageWrapper>
                ) : (
                  <PageWrapper>
                    <Profile />
                  </PageWrapper>
                )
              }
            />
            <Route
              path="*"
              element={
                <PageWrapper>
                  <NotFound />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <Toaster />
    </>
  );
}
