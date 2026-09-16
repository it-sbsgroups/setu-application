"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import { TrackIcon, CartIcon, UserIcon } from "@/components/ui/Icons";
import NotificationBell from "@/components/layout/NotificationBell";

const APP_LINKS = [
  { icon: "📱", title: "iOS App", sub: "Download on App Store" },
  { icon: "🤖", title: "Android App", sub: "Get it on Google Play" },
  { icon: "💻", title: "Desktop App", sub: "Windows & macOS" },
];

const ACCOUNT_LINKS = [
  { icon: "📊", title: "Account Dashboard", sub: "Overview & quick actions", href: "/account" },
  { icon: "📦", title: "My Orders", sub: "Track, negotiate, invoices", href: "/account/orders" },
  { icon: "🤝", title: "Negotiations", sub: "Chat with pricing desk", href: "/account/negotiations" },
  { icon: "📍", title: "Addresses", sub: "Manage delivery locations", href: "/account/addresses" },
  { icon: "👥", title: "Team & Access", sub: "Invite team members", href: "/account/team" },
  { icon: "🏭", title: "Business Profile", sub: "Organization details", href: "/account/profile" },
  { icon: "📞", title: "Support", sub: "Tickets & one-to-one calls", href: "/account/support" },
];

export default function HeaderActions({ compact = false }) {
  const { count } = useCart();
  const { user } = useAuth();
  const { openTrack, openCart, openLogin, closeOverlay } = useUI();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const loginLabel = user ? user.name.split(" ")[0].slice(0, 10) : "Login";

  function go(path) {
    closeOverlay();
    setMenuOpen(false);
    router.push(path);
  }

  /* ── Compact mobile bar ─────────────────────────────────── */
  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={openTrack}
          aria-label="Track Order"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white active:bg-white/15"
        >
          <TrackIcon />
        </button>

        <button
          type="button"
          onClick={openCart}
          aria-label={`Enquiry list${count > 0 ? ` (${count} items)` : ""}`}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white active:bg-white/15"
        >
          <CartIcon />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[9px] font-bold text-white">
              {count}
            </span>
          )}
        </button>

        <NotificationBell />

        <button
          type="button"
          onClick={openLogin}
          aria-label={user ? "Account" : "Login"}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white active:bg-white/15"
        >
          <UserIcon />
        </button>

        {/* Overflow menu */}
        <div className="relative">
          <button
            type="button"
            aria-label="More options"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white active:bg-white/15"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute right-0 top-11 z-50 max-h-[70vh] w-72 max-w-[calc(100vw-1.5rem)] overflow-y-auto rounded-xl bg-white py-2 shadow-2xl">
                {user && (
                  <>
                    <div className="mb-1 border-b border-gray-100 px-4 py-2">
                      <p className="text-xs font-semibold text-gray-500">MY ACCOUNT</p>
                    </div>
                    {ACCOUNT_LINKS.map((link) => (
                      <button
                        key={link.href}
                        type="button"
                        onClick={() => go(link.href)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 active:bg-gray-50"
                      >
                        <span className="text-lg">{link.icon}</span>
                        <div className="text-left">
                          <div className="font-medium">{link.title}</div>
                          <div className="text-xs text-gray-400">{link.sub}</div>
                        </div>
                      </button>
                    ))}
                  </>
                )}

                <div className="mb-1 border-t border-gray-100 px-4 py-2">
                  <p className="text-xs font-semibold text-gray-500">DOWNLOAD APPS</p>
                </div>
                {APP_LINKS.map((app) => (
                  <button
                    key={app.title}
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 active:bg-gray-50"
                  >
                    <span className="text-lg">{app.icon}</span>
                    <div className="text-left">
                      <div className="font-medium">{app.title}</div>
                      <div className="text-xs text-gray-400">{app.sub}</div>
                    </div>
                  </button>
                ))}

                <div className="mt-1 border-t border-gray-100 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      openTrack();
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 active:bg-gray-50"
                  >
                    <span className="text-lg">🚚</span>
                    <div className="text-left">
                      <div className="font-medium">Track Order</div>
                      <div className="text-xs text-gray-400">Enter ORN number</div>
                    </div>
                  </button>
                  {!user && (
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        openLogin();
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 active:bg-gray-50"
                    >
                      <span className="text-lg">👤</span>
                      <div className="text-left">
                        <div className="font-medium">Login / Sign up</div>
                        <div className="text-xs text-gray-400">Mobile, Email or Google</div>
                      </div>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => go("/help")}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 active:bg-gray-50"
                  >
                    <span className="text-lg">🛟</span>
                    <div className="text-left">
                      <div className="font-medium">Help &amp; Support</div>
                      <div className="text-xs text-gray-400">10 AM – 6 PM customer care</div>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  /* ── Desktop bar ────────────────────────────────────────── */
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
            <span
              className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-primary px-0.5 font-bold text-white"
              style={{ fontSize: 9 }}
            >
              {count}
            </span>
          )}
        </div>
        <span className="text-xs font-medium">Cart</span>
      </button>

      <NotificationBell />

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

        <div className="dropdown-animate absolute right-0 top-11 z-50 hidden w-64 rounded-xl bg-white py-2 shadow-2xl group-hover:block">
          {user && (
            <>
              <div className="mb-1 border-b border-gray-100 px-4 py-2">
                <p className="text-xs font-semibold text-gray-500">MY ACCOUNT</p>
              </div>
              {ACCOUNT_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => go(link.href)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <span className="text-lg">{link.icon}</span>
                  <div className="text-left">
                    <div className="font-medium">{link.title}</div>
                    <div className="text-xs text-gray-400">{link.sub}</div>
                  </div>
                </button>
              ))}
              <div className="mt-1 border-t border-gray-100 pt-1" />
            </>
          )}

          <div className="mb-1 border-b border-gray-100 px-4 py-2">
            <p className="text-xs font-semibold text-gray-500">DOWNLOAD APPS</p>
          </div>
          {APP_LINKS.map((app) => (
            <button
              key={app.title}
              type="button"
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              <span className="text-lg">{app.icon}</span>
              <div className="text-left">
                <div className="font-medium">{app.title}</div>
                <div className="text-xs text-gray-400">{app.sub}</div>
              </div>
            </button>
          ))}
          <div className="mt-1 border-t border-gray-100 pt-1">
            <button
              type="button"
              onClick={openTrack}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              <span className="text-lg">🚚</span>
              <div className="text-left">
                <div className="font-medium">Track Order</div>
                <div className="text-xs text-gray-400">Enter ORN number</div>
              </div>
            </button>
            {!user && (
              <button
                type="button"
                onClick={openLogin}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span className="text-lg">👤</span>
                <div className="text-left">
                  <div className="font-medium">Login / Sign up</div>
                  <div className="text-xs text-gray-400">Mobile, Email or Google</div>
                </div>
              </button>
            )}
            <button
              type="button"
              onClick={() => go("/help")}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              <span className="text-lg">🛟</span>
              <div className="text-left">
                <div className="font-medium">Help &amp; Support</div>
                <div className="text-xs text-gray-400">24×7 customer care</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}