"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "../lib/products";

const Ctx = createContext(null);
export const useShop = () => useContext(Ctx);

export function Providers({ children }) {
  const [cart, setCart] = useState([]);
  const [wish, setWish] = useState([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("vt-cart") || "[]"));
      setWish(JSON.parse(localStorage.getItem("vt-wish") || "[]"));
      setUser(JSON.parse(localStorage.getItem("vt-session") || "null"));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("vt-cart", JSON.stringify(cart));
      localStorage.setItem("vt-wish", JSON.stringify(wish));
    } catch {}
  }, [cart, wish, ready]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const notify = useCallback((msg, type = "ok") => setToast({ msg, type, k: Date.now() }), []);

  const addToCart = useCallback((id, size, qty = 1, openDrawer = true) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.id === id && x.size === size);
      if (i > -1) { const n = [...c]; n[i] = { ...n[i], qty: Math.min(10, n[i].qty + qty) }; return n; }
      return [...c, { id, size, qty }];
    });
    notify(`${getProduct(id).name} (US ${size}) added to cart`);
    if (openDrawer) setOpen(true);
  }, [notify]);

  const setQty = useCallback((id, size, qty) => {
    setCart((c) => qty <= 0
      ? c.filter((x) => !(x.id === id && x.size === size))
      : c.map((x) => (x.id === id && x.size === size ? { ...x, qty: Math.min(10, qty) } : x)));
  }, []);
  const removeItem = useCallback((id, size) => setQty(id, size, 0), [setQty]);
  const clearCart = useCallback(() => setCart([]), []);

  const toggleWish = useCallback((id) => {
    const has = wish.includes(id);
    setWish(has ? wish.filter((x) => x !== id) : [...wish, id]);
    notify(has ? "Removed from wishlist" : "Saved to wishlist");
  }, [wish, notify]);

  /* ---- demo accounts (browser only, passwords are hashed) ---- */
  const sha = async (v) => {
    if (!window.crypto || !window.crypto.subtle) return v;
    const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("vt:" + v));
    return Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, "0")).join("");
  };
  const getUsers = () => { try { return JSON.parse(localStorage.getItem("vt-users") || "[]"); } catch { return []; } };
  const startSession = (u) => {
    const sess = { name: u.name, email: u.email, joined: u.joined };
    setUser(sess);
    try { localStorage.setItem("vt-session", JSON.stringify(sess)); } catch {}
  };
  const register = async ({ name, email, password }) => {
    const users = getUsers();
    const mail = email.trim().toLowerCase();
    if (users.some((u) => u.email === mail)) return { error: "An account with this email already exists." };
    const u = { name: name.trim(), email: mail, hash: await sha(password), joined: Date.now() };
    try { localStorage.setItem("vt-users", JSON.stringify([...users, u])); } catch {}
    startSession(u);
    notify(`Welcome, ${u.name.split(" ")[0]}!`);
    return { ok: true };
  };
  const login = async (email, password) => {
    const mail = email.trim().toLowerCase();
    const u = getUsers().find((x) => x.email === mail);
    if (!u || u.hash !== (await sha(password))) return { error: "Incorrect email or password." };
    startSession(u);
    notify(`Welcome back, ${u.name.split(" ")[0]}!`);
    return { ok: true };
  };
  const logout = () => {
    setUser(null);
    try { localStorage.removeItem("vt-session"); } catch {}
    notify("You have been signed out");
  };
  const updateName = (name) => {
    if (!user) return;
    const users = getUsers().map((u) => (u.email === user.email ? { ...u, name } : u));
    try { localStorage.setItem("vt-users", JSON.stringify(users)); } catch {}
    startSession({ ...user, name });
    notify("Profile updated");
  };

  const lines = useMemo(() => cart.map((c) => ({ ...c, p: getProduct(c.id) })).filter((l) => l.p), [cart]);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.qty * l.p.price, 0);

  const value = { user, login, register, logout, updateName, ready, lines, count, subtotal, wish, open, setOpen, addToCart, setQty, removeItem, clearCart, toggleWish, notify };

  return (
    <Ctx.Provider value={value}>
      {children}
      {toast && <div key={toast.k} className={`toast ${toast.type}`} role="status">{toast.msg}</div>}
    </Ctx.Provider>
  );
}
