"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import { TrackIcon, CartIcon, UserIcon } from "@/components/ui/Icons";

const APP_LINKS = [
  { icon: "📱", title: "iOS App", sub: "Download on App Store" },
  { icon: "🤖", title: "Android App", sub: "Get it on Google Play" },
  { icon: "💻", title: "Desktop App", sub: "Windows & macOS" },
];

export default function HeaderActions() {
  const { count } = useCart();
  const { user } = useAuth();
  const { openTrack, openCart, openLogin } = useUI();

  const loginLabel = user ? user.name.split(" ")[0].slice(0, 10) : "Login";

  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={openTrack}
        className="flex flex-col items-center rounded-lg border border-white/20 px-3 py-1.5 text-white transition-colors hover:bg-white/10"
      >
        <TrackIcon />
        <span className="text-xs font-medium">Track Order</span>
      </button>

      <button
        type="button"
        onClick={openCart}
        className="flex flex-col items-center rounded-lg border border-white/20 px-3 py-1.5 text-white transition-colors hover:bg-white/10"
      >
        <div className="relative">
          <CartIcon />
          {count > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-primary px-0.5 font-bold text-white" style={{ fontSize: 9 }}>
              {count}
            </span>
          )}
        </div>
        <span className="text-xs font-medium">Cart</span>
      </button>

      <button
        type="button"
        onClick={openLogin}
        className="flex flex-col items-center rounded-lg border border-white/20 px-3 py-1.5 text-white transition-colors hover:bg-white/10"
      >
        <UserIcon />
        <span className="text-xs font-medium">{loginLabel}</span>
      </button>

      <div className="group relative">
        <button
          type="button"
          aria-label="More options"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:bg-white/10"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
        <div className="dropdown-animate absolute right-0 top-11 z-50 hidden w-60 rounded-xl bg-white py-2 shadow-2xl group-hover:block">
          <div className="mb-1 border-b border-gray-100 px-4 py-2">
            <p className="text-xs font-semibold text-gray-500">DOWNLOAD APPS</p>
          </div>
          {APP_LINKS.map((app) => (
            <button key={app.title} type="button" className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
              <span className="text-lg">{app.icon}</span>
              <div className="text-left">
                <div className="font-medium">{app.title}</div>
                <div className="text-xs text-gray-400">{app.sub}</div>
              </div>
            </button>
          ))}
          <div className="mt-1 border-t border-gray-100 pt-1">
            <button type="button" onClick={openTrack} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
              <span className="text-lg">🚚</span>
              <div className="text-left">
                <div className="font-medium">Track Order</div>
                <div className="text-xs text-gray-400">Enter ORN number</div>
              </div>
            </button>
            <button type="button" onClick={openLogin} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
              <span className="text-lg">👤</span>
              <div className="text-left">
                <div className="font-medium">Login / Sign up</div>
                <div className="text-xs text-gray-400">Mobile, Email or Google</div>
              </div>
            </button>
            <button type="button" className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
              <span className="text-lg">🛟</span>
              <div className="text-left">
                <div className="font-medium">Help & Support</div>
                <div className="text-xs text-gray-400">24×7 customer care</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
