import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  getAccessToken,
  logout as clearAuth,
} from "../utils/auth";

const AuthContext = createContext(null);

const getSavedUser = () => {
  try {
    const savedUser =
      localStorage.getItem("auth_user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  } catch (error) {
    console.error(
      "Saved user parse error:",
      error
    );

    return null;
  }
};

export function AuthProvider({
  children,
}) {
  const [isAuthenticated, setIsAuthenticated] =
    useState(Boolean(getAccessToken()));

  const [user, setUser] =
    useState(getSavedUser());

  const login = (userData) => {
    setIsAuthenticated(true);

    if (userData) {
      setUser(userData);

      localStorage.setItem(
        "auth_user",
        JSON.stringify(userData)
      );
    }
  };

  const logout = () => {
    clearAuth();

    localStorage.removeItem(
      "auth_user"
    );

    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

