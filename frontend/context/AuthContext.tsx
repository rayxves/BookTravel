"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  authLogin: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("jwt");
    const tokenExpiration = Cookies.get("token_expiration");

    if (storedToken && tokenExpiration) {
      const expirationTime = parseInt(tokenExpiration, 10);
      if (new Date().getTime() < expirationTime) {
        setIsAuthenticated(true);
      } else {
        logout();
      }
    }
  }, []);

  const authLogin = (token: string) => {
    const expiration = new Date().getTime() + 30 * 60 * 1000;
    Cookies.remove("jwt");
    Cookies.remove("token_expiration");

    Cookies.set("jwt", token, {
      expires: 7,
      path: "/",
      // sameSite: "strict",
    });

    Cookies.set("token_expiration", expiration.toString(), {
      expires: 7,
      path: "/",
      // sameSite: "strict",
    });

    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("jwt");
    Cookies.remove("token_expiration");

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
