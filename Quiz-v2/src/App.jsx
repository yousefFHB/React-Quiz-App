import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Profile, Auth, Home, NotFound, Quiz, TakeQuiz, CreateQuiz,About } from "./Pages";
import NotLoggedIn from "./Pages/Profile/NotLoggedIn";

import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import PageWrapper from "./Components/PageWrapper";

import { AuthContext } from "./Context/AuthContext";

export default function App() {
  const { token } = useContext(AuthContext);
  const location = useLocation();

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
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/quiz" element={!token ? (
              <PageWrapper>
                <NotLoggedIn />
              </PageWrapper> // Show the pretty design instead of redirecting
            ) : (
              <PageWrapper>
                <Quiz />
              </PageWrapper>
            )} />
            <Route path="/create-quiz" element={!token ? (
              <PageWrapper>
                <NotLoggedIn />
              </PageWrapper> // Show the pretty design instead of redirecting
            ) : (
              <PageWrapper>
                <CreateQuiz />
              </PageWrapper>
            )} />
            <Route path="/quiz/:id" element={!token ? (
              <PageWrapper>
                <NotLoggedIn />
              </PageWrapper> // Show the pretty design instead of redirecting
            ) : (
              <PageWrapper>
                <TakeQuiz />
              </PageWrapper>
            )} />
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

            {/* Profile Route: Change the redirect to your new component */}
            <Route
              path="/profile"
              element={
                !token ? (
                  <PageWrapper>
                    <NotLoggedIn />
                  </PageWrapper> // Show the pretty design instead of redirecting
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
