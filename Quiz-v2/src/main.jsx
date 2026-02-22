import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./App.jsx";
import QuizProvider from "./Context/QuizContext.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./Context/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <QuizProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QuizProvider>
    </AuthContextProvider>
  </StrictMode>,
);
