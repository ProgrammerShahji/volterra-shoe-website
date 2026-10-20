"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useShop } from "./Providers";
import { FREE_SHIP, money, shadow } from "../lib/products";

export default function CartDrawer() {
  const { open, setOpen, lines, subtotal, count, setQty, removeItem, clearCart } = useShop();
  const panel = useRef(null);
  const ov = useRef(null);
  const bar = useRef(null);

  useEffect(() => { gsap.set(panel.current, { xPercent: 100, autoAlpha: 0 }); }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    gsap.to(ov.current, { autoAlpha: open ? 1 : 0, duration: 0.4 });
    gsap.to(panel.current, { xPercent: open ? 0 : 100, autoAlpha: open ? 1 : 0, duration: open ? 0.7 : 0.45, ease: open ? "expo.out" : "power3.in" });
    if (open) gsap.from(panel.current.querySelectorAll(".ci"), { x: 50, opacity: 0, stagger: 0.07, delay: 0.25, duration: 0.6, ease: "power3.out" });
  }, [open]);

  useEffect(() => {
    const k = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [setOpen]);

  useEffect(() => {
    gsap.to(bar.current, { width: Math.min(100, (subtotal / FREE_SHIP) * 100) + "%", duration: 0.8, ease: "power3.out" });
  }, [subtotal, open]);

  const left = Math.max(0, FREE_SHIP - subtotal);

  return (
    <>
      <div className="ov" ref={ov} onClick={() => setOpen(false)} />
      <aside className="drawer" ref={panel} aria-label="Shopping cart">
        <div className="dr-head">
          <h3>Your cart ({count})</h3>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close cart"><X size={20} /></button>
        </div>

        <div className="dr-body">
          {lines.length === 0 ? (
            <div className="dr-empty">
              <ShoppingBag size={44} />
              <p>Your cart is empty.</p>
              <Link href="/shop" className="btn dark" onClick={() => setOpen(false)}>Start shopping <ArrowRight size={16} /></Link>
            </div>
          ) : lines.map((l) => (
            <div className="ci" key={l.id + l.size}>
              <div className="ci-img"><img src={l.p.src} alt={l.p.name} style={{ filter: shadow(l.p, "") }} /></div>
              <div className="ci-info">
                <div className="prow"><b>{l.p.name}</b><button className="icon-btn sm" onClick={() => removeItem(l.id, l.size)} aria-label="Remove"><Trash2 size={16} /></button></div>
                <small>US {l.size} · {l.p.color}</small>
                <div className="prow ci-bot">
                  <div className="qty">
                    <button onClick={() => setQty(l.id, l.size, l.qty - 1)} aria-label="Decrease"><Minus size={14} /></button>
                    <span>{l.qty}</span>
                    <button onClick={() => setQty(l.id, l.size, l.qty + 1)} aria-label="Increase"><Plus size={14} /></button>
                  </div>
                  <b>{money(l.p.price * l.qty)}</b>
                </div>
              </div>
            </div>
          ))}
        </div>

        {lines.length > 0 && (
          <div className="dr-foot">
            <small className="ship-txt">{left > 0 ? `Add ${money(left)} more for free shipping` : "You've unlocked free shipping!"}</small>
            <div className="ship"><i ref={bar} /></div>
            <div className="prow"><span>Subtotal</span><b>{money(subtotal)}</b></div>
            <Link href="/checkout" className="btn dark big center" onClick={() => setOpen(false)}>Checkout <ArrowRight size={16} /></Link>
            <button className="linkbtn" onClick={clearCart}>Clear cart</button>
          </div>
        )}
      </aside>
    </>
  );
}
