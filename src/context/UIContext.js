"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

const UIContext = createContext(null);

// The only overlays that can be open at once — kept as a single value
// (rather than four booleans) so opening one always closes the others.
const OVERLAYS = { NONE: null, CART: "cart", LOGIN: "login", TRACK: "track", LOCATION: "location" };

export function UIProvider({ children }) {
  const [overlay, setOverlay] = useState(OVERLAYS.NONE);
  const [toastMessage, setToastMessage] = useState("");
  const [deliveryLabel, setDeliveryLabel] = useState("Mumbai, 400001");
  // Optional ORN prefilled into TrackModal (e.g. after a successful checkout).
  const [trackOrn, setTrackOrn] = useState("");
  const toastTimer = useRef(null);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(""), 2200);
  }, []);

  const closeOverlay = useCallback(() => setOverlay(OVERLAYS.NONE), []);

  const value = {
    overlay,
    openCart: () => setOverlay(OVERLAYS.CART),
    openLogin: () => setOverlay(OVERLAYS.LOGIN),
    /**
     * Opens the Track modal. Optionally accepts an ORN string that gets
     * prefilled into the input — pass the ORN from a placed order so the
     * user only needs to enter the OTP.
     */
    openTrack: (orn) => {
      setTrackOrn(typeof orn === "string" ? orn : "");
      setOverlay(OVERLAYS.TRACK);
    },
    openLocation: () => setOverlay(OVERLAYS.LOCATION),
    closeOverlay,
    toastMessage,
    showToast,
    deliveryLabel,
    setDeliveryLabel,
    trackOrn,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within a UIProvider");
  return ctx;
}