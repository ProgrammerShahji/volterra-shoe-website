"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { CreditCard, Banknote, Lock, Tag, ShoppingBag } from "lucide-react";
import PageHead from "../../components/PageHead";
import Ambient from "../../components/Ambient";
import { useShop } from "../../components/Providers";
import { FREE_SHIP, SHIP_FEE, money } from "../../lib/products";

const EMPTY = { name: "", email: "", phone: "", address: "", city: "", zip: "", card: "", exp: "", cvc: "" };
const fmtCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
const fmtExp = (v) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; };
const fmtNum = (v) => v.replace(/\D/g, "").slice(0, 4);

export default function Checkout() {
  const { lines, subtotal, clearCart, ready, notify, user } = useShop();
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [pay, setPay] = useState("card");
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => { if (user) setF((s) => ({ ...s, name: s.name || user.name, email: s.email || user.email })); }, [user]);

  const discount = applied ? Math.round(subtotal * 10) / 100 : 0;
  const after = subtotal - discount;
  const ship = after === 0 || after >= FREE_SHIP ? 0 : SHIP_FEE;
  const total = after + ship;

  const set = (k, v) => { setF((s) => ({ ...s, [k]: v })); if (err[k]) setErr((e) => ({ ...e, [k]: "" })); };

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === "VOLT10") { setApplied(true); notify("Promo VOLT10 applied: 10% off"); }
    else notify("Invalid promo code", "warn");
  };

  const validate = () => {
    const e = {};
    if (f.name.trim().length < 2) e.name = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email";
    if (f.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a valid phone number";
    if (f.address.trim().length < 5) e.address = "Enter your street address";
    if (f.city.trim().length < 2) e.city = "Enter your city";
    if (f.zip.trim().length < 3) e.zip = "Enter a postal code";
    if (pay === "card") {
      if (f.card.replace(/\s/g, "").length < 13) e.card = "Enter a valid card number";
      const m = f.exp.match(/^(\d{2})\/(\d{2})$/);
      const now = new Date();
      if (!m || +m[1] < 1 || +m[1] > 12 || new Date(2000 + +m[2], +m[1], 0) < new Date(now.getFullYear(), now.getMonth(), 1)) e.exp = "Invalid expiry";
      if (f.cvc.length < 3) e.cvc = "Invalid CVC";
    }
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErr(e);
    if (Object.keys(e).length) {
      notify("Please fix the highlighted fields", "warn");
      requestAnimationFrame(() => {
        const el = document.querySelector(".field.err");
        if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); gsap.fromTo(el, { x: -8 }, { x: 0, duration: 0.6, ease: "elastic.out(1,0.25)" }); }
      });
      return;
    }
    setBusy(true);
    setTimeout(() => {
      const o = {
        id: "VT-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
        date: new Date().toISOString(), name: f.name, email: f.email, total, pay,
        lines: lines.map((l) => ({ name: l.p.name, size: l.size, qty: l.qty, price: l.p.price, src: l.p.src })),
      };
      try { const prev = JSON.parse(localStorage.getItem("vt-orders") || "[]"); localStorage.setItem("vt-orders", JSON.stringify([o, ...prev])); } catch {}
      setOrder(o);
      clearCart();
      setBusy(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  useEffect(() => {
    if (!order) return;
    const tl = gsap.timeline();
    tl.from(".ok-circle", { scale: 0, duration: 0.7, ease: "back.out(2)" })
      .from(".ok-tick", { strokeDashoffset: 60, duration: 0.6, ease: "power2.out" }, "-=0.2")
      .from(".ok-wrap > *:not(.ok-circle)", { y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power3.out" }, "-=0.3");
    return () => tl.kill();
  }, [order]);

  const field = (k, label, o = {}) => (
    <div className={`field ${err[k] ? "err" : ""} ${o.span ? "span2" : ""}`}>
      <label htmlFor={k}>{label}</label>
      <input id={k} type={o.type || "text"} inputMode={o.mode} placeholder={o.ph} autoComplete={o.ac} value={f[k]} onChange={(e) => set(k, o.fmt ? o.fmt(e.target.value) : e.target.value)} />
      {err[k] && <small className="errmsg">{err[k]}</small>}
    </div>
  );

  if (order) {
    return (
      <section className="page">
        <Ambient particles={16} />
        <div className="wrap">
          <div className="ok-wrap glass">
            <svg className="ok-circle" width="96" height="96" viewBox="0 0 96 96" fill="none">
              <circle cx="48" cy="48" r="46" fill="#22c58b" />
              <path className="ok-tick" d="M28 49l14 14 27-30" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="60" />
            </svg>
            <h2>Order confirmed!</h2>
            <p>Thanks {order.name.split(" ")[0]}. Your order <b>{order.id}</b> is on its way. A confirmation was sent to {order.email}.</p>
            <div className="ok-items">
              {order.lines.map((l) => (
                <div key={l.name + l.size} className="sum-line"><img src={l.src} alt="" /><span>{l.name} (US {l.size}) x{l.qty}</span><b>{money(l.price * l.qty)}</b></div>
              ))}
              <div className="sum-line total"><span>Total paid ({order.pay === "card" ? "card" : "cash on delivery"})</span><b>{money(order.total)}</b></div>
            </div>
            <Link href="/shop" className="btn dark big">Continue shopping</Link>
          </div>
        </div>
      </section>
    );
  }

  if (ready && lines.length === 0) {
    return (
      <section className="page">
        <Ambient />
        <div className="wrap"><div className="empty glass"><ShoppingBag size={44} /><h3>Your cart is empty</h3><p>Add a pair or two to check out.</p><Link href="/shop" className="btn dark">Browse shoes</Link></div></div>
      </section>
    );
  }

  return (
    <section className="page">
      <Ambient />
      <div className="wrap">
        <PageHead eyebrow="Almost there" title="Secure" accent="checkout." />
        <form className="co" onSubmit={submit} noValidate>
          <div className="co-form glass">
            <h3>Shipping details</h3>
            <div className="fgrid">
              {field("name", "Full name", { ac: "name", span: true })}
              {field("email", "Email", { type: "email", ac: "email" })}
              {field("phone", "Phone", { type: "tel", mode: "tel", ac: "tel" })}
              {field("address", "Street address", { ac: "street-address", span: true })}
              {field("city", "City", { ac: "address-level2" })}
              {field("zip", "Postal code", { ac: "postal-code" })}
            </div>

            <h3>Payment</h3>
            <div className="pay-opts">
              <button type="button" className={`pay-opt ${pay === "card" ? "on" : ""}`} onClick={() => setPay("card")}><CreditCard size={18} /> Card</button>
              <button type="button" className={`pay-opt ${pay === "cod" ? "on" : ""}`} onClick={() => setPay("cod")}><Banknote size={18} /> Cash on delivery</button>
            </div>
            {pay === "card" && (
              <div className="fgrid">
                {field("card", "Card number", { mode: "numeric", ph: "1234 5678 9012 3456", ac: "cc-number", fmt: fmtCard, span: true })}
                {field("exp", "Expiry (MM/YY)", { mode: "numeric", ph: "MM/YY", ac: "cc-exp", fmt: fmtExp })}
                {field("cvc", "CVC", { mode: "numeric", ph: "123", ac: "cc-csc", fmt: fmtNum })}
              </div>
            )}
            <p className="demo-note"><Lock size={14} /> Demo checkout: no real payment is processed and card details are never stored.</p>
          </div>

          <aside className="sum glass">
            <h3>Order summary</h3>
            {lines.map((l) => (
              <div key={l.id + l.size} className="sum-line"><img src={l.p.src} alt="" style={{ filter: l.p.tint }} /><span>{l.p.name} (US {l.size}) x{l.qty}</span><b>{money(l.p.price * l.qty)}</b></div>
            ))}
            <div className="promo">
              <label className="fld grow"><Tag size={15} /><input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo code (try VOLT10)" aria-label="Promo code" disabled={applied} /></label>
              <button type="button" className="btn ghost" onClick={applyPromo} disabled={applied}>{applied ? "Applied" : "Apply"}</button>
            </div>
            <div className="sum-row"><span>Subtotal</span><b>{money(subtotal)}</b></div>
            {applied && <div className="sum-row good"><span>Discount (10%)</span><b>-{money(discount)}</b></div>}
            <div className="sum-row"><span>Shipping</span><b>{ship ? money(ship) : "Free"}</b></div>
            <div className="sum-row total"><span>Total</span><b>{money(total)}</b></div>
            <button className="btn dark big center" type="submit" disabled={busy}>{busy ? "Processing..." : `Place order · ${money(total)}`}</button>
          </aside>
        </form>
      </div>
    </section>
  );
}
