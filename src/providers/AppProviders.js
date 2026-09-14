"use client";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { UIProvider } from "@/context/UIContext";
import CartDrawer from "@/components/cart/CartDrawer";
import LoginModal from "@/components/modals/LoginModal";
import TrackModal from "@/components/modals/TrackModal";
import LocationModal from "@/components/modals/LocationModal";
import Toast from "@/components/ui/Toast";

export default function AppProviders({ children }) {
  return (
    <CartProvider>
      <AuthProvider>
        <UIProvider>
          {children}

          {/* Global overlays — rendered once, controlled entirely by UIContext */}
          <CartDrawer />
          <LoginModal />
          <TrackModal />
          <LocationModal />
          <Toast />
        </UIProvider>
      </AuthProvider>
    </CartProvider>
  );
}
