"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { seedAccount, findOrder, findNegotiation } from "@/lib/data/account";
import { useAuth } from "@/context/AuthContext";

const AccountContext = createContext(null);

export function AccountProvider({ children }) {
  const { user } = useAuth();
  const [account, setAccount] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // Key localStorage by user contact so switching users gives a fresh account.
  const storageKey = user ? `sbs_account_v2_${user.contact}` : null;

  useEffect(() => {
    if (!storageKey) {
      setAccount(null);
      setHydrated(true);
      return;
    }
    setHydrated(false);
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (saved) {
        // Migration for older saved shapes
        if (!saved.addresses) saved.addresses = seedAccount().addresses;
        if (!saved.notifications) saved.notifications = [];
        if (!saved.preferences) saved.preferences = seedAccount().preferences;
        if (!saved.profile.role) saved.profile.role = "owner";
        setAccount(saved);
      } else {
        setAccount(seedAccount());
      }
    } catch {
      setAccount(seedAccount());
    } finally {
      setHydrated(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated || !account || !storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(account));
  }, [account, hydrated, storageKey]);

  /* ── notifications (internal helper) ─────────────────────── */

  const pushNotification = useCallback((setAccountFn, payload) => {
    setAccountFn((prev) => {
      if (!prev) return prev;
      const notification = {
        id: `NT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        at: new Date().toISOString(),
        read: false,
        ...payload,
      };
      return {
        ...prev,
        notifications: [notification, ...(prev.notifications || [])].slice(0, 50),
      };
    });
  }, []);

  /* ── profile ─────────────────────────────────────────────── */

  const updateProfile = useCallback((patch) => {
    setAccount((prev) => {
      if (!prev) return prev;
      const SENSITIVE = ["name", "mobile", "email"];
      const sensitivePatch = {};
      const livePatch = {};
      for (const [k, v] of Object.entries(patch)) {
        if (SENSITIVE.includes(k) && v !== prev.profile[k]) sensitivePatch[k] = v;
        else livePatch[k] = v;
      }
      const next = { ...prev, profile: { ...prev.profile, ...livePatch } };
      if (Object.keys(sensitivePatch).length) {
        next.profile.pendingAadharChange = {
          ...(prev.profile.pendingAadharChange || {}),
          ...sensitivePatch,
          requestedAt: new Date().toISOString(),
        };
      }
      return next;
    });
  }, []);

  const updatePreferences = useCallback((patch) => {
    setAccount((prev) => prev && {
      ...prev,
      preferences: {
        ...prev.preferences,
        ...patch,
        channels: { ...prev.preferences?.channels, ...(patch.channels || {}) },
        topics: { ...prev.preferences?.topics, ...(patch.topics || {}) },
      },
    });
  }, []);

  const cancelAadharChange = useCallback(() => {
    setAccount((prev) => prev && {
      ...prev,
      profile: { ...prev.profile, pendingAadharChange: null },
    });
  }, []);

  const completeAadharVerification = useCallback((digilockerId) => {
    setAccount((prev) => {
      if (!prev) return prev;
      const pending = prev.profile.pendingAadharChange || {};
      const merged = { ...prev.profile, ...pending };
      return {
        ...prev,
        profile: {
          ...merged,
          aadharVerified: true,
          aadharVerifiedAt: new Date().toISOString(),
          aadharName: merged.name,
          digilockerId,
          pendingAadharChange: null,
        },
      };
    });
  }, []);

  const startOrgVerification = useCallback(({ idCardName, videoSlot }) => {
    setAccount((prev) => prev && {
      ...prev,
      profile: {
        ...prev.profile,
        pendingOrgVerification: {
          idCardName,
          videoSlot,
          requestedAt: new Date().toISOString(),
        },
      },
    });
  }, []);

  const completeOrgVerification = useCallback((verifierName) => {
    setAccount((prev) => prev && {
      ...prev,
      profile: {
        ...prev.profile,
        orgVerified: true,
        orgVerifiedAt: new Date().toISOString(),
        orgVerifierName: verifierName,
        pendingOrgVerification: null,
      },
    });
  }, []);

  /* ── notifications (public) ──────────────────────────────── */

  const markNotificationRead = useCallback((id) => {
    setAccount((prev) => prev && {
      ...prev,
      notifications: (prev.notifications || []).map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    });
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setAccount((prev) => prev && {
      ...prev,
      notifications: (prev.notifications || []).map((n) => ({ ...n, read: true })),
    });
  }, []);

  /* ── addresses ───────────────────────────────────────────── */

  const addAddress = useCallback((payload) => {
    setAccount((prev) => {
      if (!prev) return prev;
      const list = prev.addresses || [];
      const nextNum = list.length + 1;
      const id = `ADDR-${String(nextNum).padStart(3, "0")}`;
      const isFirst = list.length === 0;
      const addr = { id, isDefault: isFirst, ...payload };
      return { ...prev, addresses: [...list, addr] };
    });
  }, []);

  const updateAddress = useCallback((id, patch) => {
    setAccount((prev) => prev && {
      ...prev,
      addresses: (prev.addresses || []).map((a) => (a.id === id ? { ...a, ...patch } : a)),
    });
  }, []);

  const removeAddress = useCallback((id) => {
    setAccount((prev) => {
      if (!prev) return prev;
      const list = prev.addresses || [];
      const removing = list.find((a) => a.id === id);
      const next = list.filter((a) => a.id !== id);
      if (removing?.isDefault && next.length > 0) {
        next[0] = { ...next[0], isDefault: true };
      }
      return { ...prev, addresses: next };
    });
  }, []);

  const setDefaultAddress = useCallback((id) => {
    setAccount((prev) => prev && {
      ...prev,
      addresses: (prev.addresses || []).map((a) => ({ ...a, isDefault: a.id === id })),
    });
  }, []);

  /* ── orders ──────────────────────────────────────────────── */

  const appendOrderEvent = useCallback((orn, label, note) => {
    setAccount((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        orders: prev.orders.map((o) =>
          o.orn === orn
            ? { ...o, timeline: [...o.timeline, { at: new Date().toISOString(), label, note }] }
            : o
        ),
      };
    });
  }, []);

  const addOrder = useCallback((order) => {
    setAccount((prev) => prev && { ...prev, orders: [order, ...prev.orders] });
  }, []);

  const uploadPO = useCallback((orn, payload) => {
    const opts = typeof payload === "string"
      ? { poNumber: payload }
      : (payload || {});
    const { poNumber, addressId, fileName } = opts;

    setAccount((prev) => {
      if (!prev) return prev;
      const order = prev.orders.find((o) => o.orn === orn);
      const selectedAddress = addressId
        ? (prev.addresses || []).find((a) => a.id === addressId)
        : null;

      const nextOrders = prev.orders.map((o) => {
        if (o.orn !== orn) return o;
        const addrPatch = selectedAddress
          ? {
              address: {
                name: selectedAddress.name,
                mobile: selectedAddress.mobile,
                line1: selectedAddress.line1,
                line2: selectedAddress.line2,
                city: selectedAddress.city,
                state: selectedAddress.state,
                pincode: selectedAddress.pincode,
                type: selectedAddress.type,
              },
            }
          : {};
        return {
          ...o,
          ...addrPatch,
          status: "po-received",
          poNumber,
          poFileName: fileName || o.poFileName || null,
          invoiceNumber: o.invoiceNumber || `INV-${new Date().getFullYear()}-${String(Math.floor(10000 + Math.random() * 89999))}`,
          timeline: [
            ...o.timeline,
            { at: new Date().toISOString(), label: "PO received", note: poNumber },
          ],
        };
      });

      const nextNegotiations = order?.negotiationId
        ? prev.negotiations.map((n) =>
            n.id === order.negotiationId
              ? {
                  ...n,
                  messages: [
                    ...n.messages,
                    {
                      id: `m${Date.now()}`,
                      from: "system",
                      text: `📄 PO ${poNumber} received — order is now in processing`,
                      at: new Date().toISOString(),
                    },
                  ],
                }
              : n
          )
        : prev.negotiations;

      const nextNotifications = [
        {
          id: `NT-${Date.now()}`,
          type: "order",
          title: "PO received — order in processing",
          body: `${orn} · PO ${poNumber}`,
          href: `/account/orders/${orn}`,
          at: new Date().toISOString(),
          read: false,
        },
        ...(prev.notifications || []),
      ].slice(0, 50);

      return {
        ...prev,
        orders: nextOrders,
        negotiations: nextNegotiations,
        notifications: nextNotifications,
      };
    });
  }, []);

  const cancelOrder = useCallback((orn, reason) => {
    setAccount((prev) => {
      if (!prev) return prev;
      const order = prev.orders.find((o) => o.orn === orn);
      if (!order) return prev;
      return {
        ...prev,
        orders: prev.orders.map((o) =>
          o.orn === orn
            ? {
                ...o,
                status: "cancelled",
                cancelReason: reason,
                timeline: [
                  ...o.timeline,
                  { at: new Date().toISOString(), label: "Order cancelled", note: reason },
                ],
              }
            : o
        ),
        negotiations: order.negotiationId
          ? prev.negotiations.map((n) =>
              n.id === order.negotiationId
                ? {
                    ...n,
                    status: "cancelled",
                    messages: [
                      ...n.messages,
                      {
                        id: `m${Date.now()}`,
                        from: "system",
                        text: `✕ Order cancelled by you — reason: ${reason}`,
                        at: new Date().toISOString(),
                      },
                    ],
                  }
                : n
            )
          : prev.negotiations,
      };
    });
  }, []);

  const requestExchange = useCallback((orn, productId, reason) => {
    setAccount((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        orders: prev.orders.map((o) =>
          o.orn === orn
            ? {
                ...o,
                status: "exchange-requested",
                timeline: [
                  ...o.timeline,
                  { at: new Date().toISOString(), label: "Exchange requested", note: reason },
                ],
              }
            : o
        ),
      };
    });
  }, []);

  /* ── negotiations ────────────────────────────────────────── */

  const sendNegotiationMessage = useCallback((negotiationId, from, text, author) => {
    setAccount((prev) => {
      if (!prev) return prev;
      const nextNegotiations = prev.negotiations.map((n) =>
        n.id === negotiationId
          ? {
              ...n,
              messages: [
                ...n.messages,
                { id: `m${Date.now()}`, from, text, at: new Date().toISOString(), author },
              ],
            }
          : n
      );

      // When the executive replies, push a notification (skip if user sent it).
      const nextNotifications =
        from === "exec"
          ? [
              {
                id: `NT-${Date.now()}`,
                type: "negotiation",
                title: "New reply from Pricing Desk",
                body: text.length > 80 ? text.slice(0, 80) + "…" : text,
                href: `/account/negotiations?thread=${negotiationId}`,
                at: new Date().toISOString(),
                read: false,
              },
              ...(prev.notifications || []),
            ].slice(0, 50)
          : prev.notifications;

      return { ...prev, negotiations: nextNegotiations, notifications: nextNotifications };
    });
  }, []);

  const lockPrice = useCallback((negotiationId, lockedLines, total) => {
    setAccount((prev) => {
      if (!prev) return prev;
      const neg = findNegotiation(prev, negotiationId);
      const nextNeg = {
        ...neg,
        status: "locked",
        lockedAt: new Date().toISOString(),
        lockedLines,
        messages: [
          ...neg.messages,
          {
            id: `m${Date.now()}`,
            from: "system",
            text: `✅ Price locked by executive · ₹${total.toLocaleString("en-IN")}`,
            at: new Date().toISOString(),
          },
        ],
      };
      const nextOrders = prev.orders.map((o) =>
        o.negotiationId === negotiationId
          ? {
              ...o,
              status: "awaiting-po",
              lockedTotal: total,
              items: o.items.map((l) => {
                const ll = lockedLines.find((x) => x.productId === l.productId);
                return ll ? { ...l, unitPrice: ll.unitPrice } : l;
              }),
              timeline: [
                ...o.timeline,
                { at: new Date().toISOString(), label: `Price locked at ₹${total.toLocaleString("en-IN")}` },
              ],
            }
          : o
      );

      const linkedOrder = prev.orders.find((o) => o.negotiationId === negotiationId);
      const nextNotifications = [
        {
          id: `NT-${Date.now()}`,
          type: "negotiation",
          title: "Price locked — upload your PO",
          body: `${linkedOrder?.orn || ""} · Total ₹${total.toLocaleString("en-IN")}`,
          href: `/account/negotiations?thread=${negotiationId}`,
          at: new Date().toISOString(),
          read: false,
        },
        ...(prev.notifications || []),
      ].slice(0, 50);

      return {
        ...prev,
        negotiations: prev.negotiations.map((n) => (n.id === negotiationId ? nextNeg : n)),
        orders: nextOrders,
        notifications: nextNotifications,
      };
    });
  }, []);

  /* ── team ───────────────────────────────────────────────── */

  const inviteTeamMember = useCallback((member) => {
    setAccount((prev) => {
      if (!prev) return prev;
      const id = `TM-${String(prev.team.length + 1).padStart(3, "0")}`;
      return {
        ...prev,
        team: [
          ...prev.team,
          {
            id,
            status: "invited",
            invitedAt: new Date().toISOString(),
            permissions: { viewOrders: true, negotiate: false, approvePO: false, monitorDeliveries: true },
            ...member,
          },
        ],
      };
    });
  }, []);

  const updateTeamMember = useCallback((id, patch) => {
    setAccount((prev) => prev && {
      ...prev,
      team: prev.team.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    });
  }, []);

  const removeTeamMember = useCallback((id) => {
    setAccount((prev) => prev && { ...prev, team: prev.team.filter((m) => m.id !== id) });
  }, []);

  /* ── support ─────────────────────────────────────────────── */

  const createTicket = useCallback(({ subject, orderOrn, productId, priority, message }) => {
    setAccount((prev) => {
      if (!prev) return prev;
      const id = `TKT-${Math.floor(50000 + Math.random() * 9999)}`;
      return {
        ...prev,
        tickets: [
          {
            id, subject, orderOrn, productId, priority: priority || "normal",
            status: "open", createdAt: new Date().toISOString(),
            messages: [
              { id: "t1", from: "system", text: "Ticket raised", at: new Date().toISOString() },
              { id: "t2", from: "user", text: message, at: new Date().toISOString() },
            ],
          },
          ...prev.tickets,
        ],
      };
    });
  }, []);

  const replyToTicket = useCallback((ticketId, from, text, author) => {
    setAccount((prev) => {
      if (!prev) return prev;
      const nextTickets = prev.tickets.map((t) =>
        t.id === ticketId
          ? { ...t, messages: [...t.messages, { id: `t${Date.now()}`, from, text, at: new Date().toISOString(), author }] }
          : t
      );

      const nextNotifications =
        from === "agent"
          ? [
              {
                id: `NT-${Date.now()}`,
                type: "support",
                title: `Support replied on ${ticketId}`,
                body: text.length > 80 ? text.slice(0, 80) + "…" : text,
                href: `/account/support`,
                at: new Date().toISOString(),
                read: false,
              },
              ...(prev.notifications || []),
            ].slice(0, 50)
          : prev.notifications;

      return { ...prev, tickets: nextTickets, notifications: nextNotifications };
    });
  }, []);

  /* ── reviews ─────────────────────────────────────────────── */

  const submitReview = useCallback((review) => {
    setAccount((prev) => prev && {
      ...prev,
      reviews: [{ id: `RV-${Date.now()}`, createdAt: new Date().toISOString(), ...review }, ...prev.reviews],
    });
  }, []);

  /* ── permissions helper ─────────────────────────────────── */

  const canDo = useCallback((action) => {
    if (!account) return false;
    if (account.profile.role === "owner") return true;
    // A team member's own permission set would live here.
    const me = account.team.find((m) => m.id === account.profile.teamId);
    return !!me?.permissions?.[action];
  }, [account]);

  const unreadCount = useMemo(
    () => (account?.notifications || []).filter((n) => !n.read).length,
    [account]
  );

  const value = useMemo(() => ({
    account, hydrated, unreadCount,
    findOrder: (orn) => account && findOrder(account, orn),
    findNegotiation: (id) => account && findNegotiation(account, id),
    canDo,
    updateProfile, updatePreferences, cancelAadharChange, completeAadharVerification,
    startOrgVerification, completeOrgVerification,
    markNotificationRead, markAllNotificationsRead,
    addAddress, updateAddress, removeAddress, setDefaultAddress,
    addOrder, appendOrderEvent, uploadPO, cancelOrder, requestExchange,
    sendNegotiationMessage, lockPrice,
    inviteTeamMember, updateTeamMember, removeTeamMember,
    createTicket, replyToTicket,
    submitReview,
  }), [account, hydrated, unreadCount, canDo, updateProfile, updatePreferences,
       cancelAadharChange, completeAadharVerification, startOrgVerification,
       completeOrgVerification, markNotificationRead, markAllNotificationsRead,
       addAddress, updateAddress, removeAddress, setDefaultAddress, addOrder,
       appendOrderEvent, uploadPO, cancelOrder, requestExchange,
       sendNegotiationMessage, lockPrice, inviteTeamMember, updateTeamMember,
       removeTeamMember, createTicket, replyToTicket, submitReview]);

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within an AccountProvider");
  return ctx;
}