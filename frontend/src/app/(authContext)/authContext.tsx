"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
  username: string | null;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (username: string, token: string) => {
    const expiration = new Date().getTime() + 30 * 60 * 1000;
    Cookies.set("jwt", token, {
      expires: 7,
      path: "",
      sameSite: "Strict",
    });
    Cookies.set("username", username, {
      expires: 7,
      path: "",
      sameSite: "Strict",
    });
    Cookies.set("token_expiration", expiration.toString(), {
      expires: 7,
      path: "",
      sameSite: "Strict",
    });

    setIsAuthenticated(true);
    setUsername(username);
    setToken(token);
  };

  const logout = () => {
    Cookies.remove("jwt");
    Cookies.remove("username");
    Cookies.remove("token_expiration");

    setIsAuthenticated(false);
    setUsername(null);
    setToken(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = Cookies.get("jwt");
      const storedUsername = Cookies.get("username");
      const expiration = Cookies.get("token_expiration");
      if (
        storedToken &&
        storedUsername &&
        expiration &&
        new Date().getTime() < parseInt(expiration)
      ) {
        setIsAuthenticated(true);
        setToken(storedToken);
        setUsername(storedUsername);
      } else {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
