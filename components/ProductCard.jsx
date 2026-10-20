"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { useShop } from "./Providers";
import { SIZES, money, shadow } from "../lib/products";

export default function ProductCard({ p }) {
  const { addToCart, toggleWish, wish, notify } = useShop();
  const [size, setSize] = useState(null);
  const card = useRef(null);
  const sizes = useRef(null);
  const liked = wish.includes(p.id);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(".pimg img", { y: -10, duration: gsap.utils.random(2.6, 3.6), ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, card);
    return () => ctx.revert();
  }, []);

  const move = (e) => {
    const el = card.current;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--mx", (nx + 0.5) * 100 + "%");
    el.style.setProperty("--my", (ny + 0.5) * 100 + "%");
    gsap.to(el.querySelector(".pimg img"), { rotationY: nx * 26, rotationX: -ny * 18, x: nx * 22, scale: 1.14, rotate: -6, transformPerspective: 800, duration: 0.6, ease: "power3.out", overwrite: "auto" });
    gsap.to(el.querySelector(".pglow"), { x: nx * 70, y: ny * 40, opacity: 0.65, duration: 0.8 });
  };
  const leave = () => {
    const el = card.current;
    gsap.to(el.querySelector(".pimg img"), { rotationX: 0, rotationY: 0, x: 0, scale: 1, rotate: 0, duration: 1.1, ease: "elastic.out(1,0.5)", overwrite: "auto" });
    gsap.to(el.querySelector(".pglow"), { x: 0, y: 0, opacity: 0.32, duration: 0.8 });
  };

  const add = () => {
    if (!size) {
      gsap.fromTo(sizes.current, { x: -10 }, { x: 0, duration: 0.7, ease: "elastic.out(1,0.2)" });
      notify("Please select a size first", "warn");
      return;
    }
    addToCart(p.id, size);
  };

  return (
    <article className="pcard" ref={card} onPointerMove={move} onPointerLeave={leave}>
      <div className="pshine" />
      <span className="ptag">{p.tag}</span>
      <button className={`heart ${liked ? "on" : ""}`} onClick={() => toggleWish(p.id)} aria-pressed={liked} aria-label="Toggle wishlist">
        <Heart size={18} fill={liked ? "currentColor" : "none"} />
      </button>
      <Link href={`/product/${p.id}`} className="pimg" aria-label={`View ${p.name}`}>
        <div className="pglow" style={{ background: p.glow }} />
        <img src={p.src} alt={p.name} draggable={false} style={{ filter: shadow(p) }} />
      </Link>
      <div className="pbody">
        <div className="prow">
          <Link href={`/product/${p.id}`}><h3>{p.name}</h3></Link>
          <span className="price">{money(p.price)}{p.was && <s>{money(p.was)}</s>}</span>
        </div>
        <div className="pmeta">
          <span className="st"><Star size={14} fill="currentColor" /></span>
          <b>{p.rating}</b> ({p.reviews}) · {p.cat}
        </div>
        <div className="psizes" ref={sizes} role="group" aria-label="Select size">
          {SIZES.map((s) => (
            <button key={s} className={s === size ? "on" : ""} onClick={() => setSize(s)} aria-pressed={s === size}>{s}</button>
          ))}
        </div>
        <button className="btn dark add" data-magnetic onClick={add}><ShoppingBag size={16} /> Add to cart</button>
      </div>
    </article>
  );
}
