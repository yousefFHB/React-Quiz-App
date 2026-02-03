import { createContext, useState } from "react"

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const initialToken = localStorage.getItem("token");
  const initialUser = JSON.parse(localStorage.getItem("user"));

  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);

  const handleToken = (tk) => {
    if (tk) {
      localStorage.setItem("token", tk);
    } else {
      localStorage.removeItem("token");
    }
    setToken(tk);
  };

  const handleUser = (userData) => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
    setUser(userData);
  };

  const logout = () => {
    handleToken(null);
    handleUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        handleToken,
        handleUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

