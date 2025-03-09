"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  authLogin: (username: string, token: string) => void;
  logout: () => void;
  username: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("jwt");
    const storedUsername = Cookies.get("username");
    const tokenExpiration = Cookies.get("token_expiration");
 
    if (storedToken && storedUsername && tokenExpiration) {
      const expirationTime = parseInt(tokenExpiration, 10);
      if (new Date().getTime() < expirationTime) {
        setIsAuthenticated(true);
        setUsername(storedUsername);
      } else {
        logout();
      }
    }
  }, []);

  const authLogin = (username: string, token: string) => {
    const expiration = new Date().getTime() + 30 * 60 * 1000;

    Cookies.set("jwt", token, {
      expires: 7,
      path: "/",
      sameSite: "strict",
    });
    Cookies.set("username", username, {
      expires: 7,
      path: "/",
      sameSite: "strict",
    });
    Cookies.set("token_expiration", expiration.toString(), {
      expires: 7,
      path: "/",
      sameSite: "strict",
    });
   
    setIsAuthenticated(true);
    setUsername(username);
  };

  const logout = () => {
    Cookies.remove("jwt");
    Cookies.remove("username");
    Cookies.remove("token_expiration");

    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, authLogin, logout, username }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
