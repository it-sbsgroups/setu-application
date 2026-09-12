
"use client";
import { createContext, useContext, useState } from "react";
const LocCtx = createContext(null);
export function LocationProvider({ children }) {
  const [location, setLocation] = useState("Mumbai, 400001");
  const [isOpen, setIsOpen] = useState(false);
  return <LocCtx.Provider value={{ location, setLocation, isOpen, setIsOpen }}>{children}</LocCtx.Provider>;
}
export const useLocationCtx = () => useContext(LocCtx);
