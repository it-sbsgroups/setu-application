"use client";

import { createContext, useContext, useEffect, useState } from "react";

const USER_STORAGE_KEY = "sbs_user";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || "null");
      // Hydrating from localStorage must happen after mount, so this
      // one-time sync-on-mount is the correct use of an effect.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setUser(saved);
    } catch {
      // ignore corrupt storage
    }
  }, []);

  function login(nextUser) {
    setUser(nextUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
