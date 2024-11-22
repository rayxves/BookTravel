"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
  username: string | null;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  
  const login = (username: string, token: string) => {
    setIsAuthenticated(true);
    setUsername(username);
    setToken(token);

  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setToken(null);

    router.push("/");
  };

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
