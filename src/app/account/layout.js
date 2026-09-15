"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import Skeleton from "@/components/ui/Skeleton";
import { useAccount } from "@/context/AccountContext";
import VerificationBadge from "@/components/account/VerificationBadge";

const NAV = [
  { href: "/account", label: "Dashboard", icon: "🏠" },
  { href: "/account/orders", label: "Orders", icon: "📦" },
  { href: "/account/negotiations", label: "Negotiations", icon: "🤝" },
  { href: "/account/addresses", label: "Addresses", icon: "📍" },
  { href: "/account/team", label: "Team & Access", icon: "👥" },
  { href: "/account/support", label: "Support", icon: "📞" },
  { href: "/account/verification", label: "Verifications", icon: "🛡️" },
  { href: "/account/profile", label: "Profile", icon: "⚙️" },
];

export default function AccountLayout({ children }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { openLogin } = useUI();
  const { account, hydrated } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || !hydrated) {
    return (
      <div className="mx-auto max-w-screen-2xl gap-6 px-4 py-8 lg:grid lg:grid-cols-[240px_1fr] lg:items-start">
        <Skeleton className="hidden h-80 w-full rounded-xl lg:block" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-3xl">
          🔐
        </div>
        <h1 className="font-display text-xl font-black text-gray-900">
          Login to access your account panel
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage orders, negotiations, team access and support — all in one place.
        </p>
        <button
          onClick={openLogin}
          className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primarydark"
        >
          Login / Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl gap-6 px-4 py-6 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
      {/* Sidebar — sticky under the header on desktop */}
      <aside className="mb-4 lg:sticky lg:top-24 lg:mb-0">
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-base font-black text-white">
              {(account?.profile.name || user.name || "U").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-gray-900">
                {account?.profile.name || user.name}
              </p>
              <p className="truncate text-[11px] text-gray-400">
                {account?.profile.orgName || user.orgName || "Individual"}
              </p>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-1.5">
            <VerificationBadge
              kind="Aadhaar"
              verified={account?.profile.aadharVerified}
              pending={!!account?.profile.pendingAadharChange}
            />
            <VerificationBadge
              kind="Org"
              verified={account?.profile.orgVerified}
              pending={!!account?.profile.pendingOrgVerification}
            />
          </div>

          <nav
            aria-label="Account navigation"
            className="hide-scrollbar -mx-1 flex gap-1 overflow-x-auto lg:mx-0 lg:flex-col lg:overflow-visible"
          >
            {NAV.map((item) => {
              const isActive =
                item.href === "/account"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-orange-50 text-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="min-w-0">{children}</div>
    </div>
  );
}