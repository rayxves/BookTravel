"use client";

import { createContext, useContext, useState, useEffect } from "react";

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
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("token_expiration", expiration.toString());
    }
    setIsAuthenticated(true);
    setUsername(username);
    setToken(token);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("token_expiration");
    }
    setIsAuthenticated(false);
    setUsername(null);
    setToken(null);
    
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const expiration = localStorage.getItem("token_expiration");
      if (
        storedToken &&
        expiration &&
        new Date().getTime() < parseInt(expiration)
      ) {
        setIsAuthenticated(true);
        setToken(storedToken);
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
