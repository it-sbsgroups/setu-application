"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const USER_STORAGE_KEY = "sbs_user";
const AuthContext = createContext(null);

// Demo-only stand-in for the real admin approval workflow: a new organization
// account starts "pending" and is auto-approved a few seconds later so the
// rest of the RFQ flow is testable without a live admin backend.
const MOCK_VERIFICATION_DELAY_MS = 6000;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const verifyTimer = useRef(null);

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
    return () => clearTimeout(verifyTimer.current);
  }, []);

  function persist(nextUser) {
    setUser(nextUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
  }

  function login(nextUser) {
    persist(nextUser);
    if (nextUser.orgVerification === "pending") {
      clearTimeout(verifyTimer.current);
      verifyTimer.current = setTimeout(() => {
        persist({ ...nextUser, orgVerification: "verified" });
      }, MOCK_VERIFICATION_DELAY_MS);
    }
  }

  function logout() {
    clearTimeout(verifyTimer.current);
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
