"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Heart, Star, Minus, Plus, Truck, RotateCcw, ShieldCheck, ShoppingBag } from "lucide-react";
import Ambient from "./Ambient";
import ProductCard from "./ProductCard";
import { useShop } from "./Providers";
import { PRODUCTS, SIZES, money, shadow } from "../lib/products";

export default function ProductDetail({ p }) {
  const { addToCart, toggleWish, wish, notify } = useShop();
  const router = useRouter();
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const root = useRef(null);
  const intro = useRef(null);
  const tilt = useRef(null);
  const sizes = useRef(null);
  const liked = wish.includes(p.id);
  const others = PRODUCTS.filter((x) => x.id !== p.id).slice(0, 3);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(intro.current, { x: 220, rotate: 24, scale: 0.6, opacity: 0, duration: 1.5, ease: "expo.out" });
      gsap.from(".pd-info > *", { y: 30, opacity: 0, stagger: 0.07, duration: 0.8, ease: "power3.out", delay: 0.2 });
      gsap.to(".pd-float", { y: -16, rotate: 2, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.set(tilt.current, { transformPerspective: 1000 });
    }, root);
    return () => ctx.revert();
  }, [p.id]);

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(tilt.current, { rotationY: nx * 22, rotationX: -ny * 16, x: nx * 30, y: ny * 20, scale: 1.06, duration: 0.7, ease: "power3.out", overwrite: "auto" });
  };
  const leave = () => gsap.to(tilt.current, { rotationX: 0, rotationY: 0, x: 0, y: 0, scale: 1, duration: 1.1, ease: "elastic.out(1,0.5)", overwrite: "auto" });

  const need = () => {
    if (size) return true;
    gsap.fromTo(sizes.current, { x: -10 }, { x: 0, duration: 0.7, ease: "elastic.out(1,0.2)" });
    notify("Please select a size first", "warn");
    return false;
  };
  const add = () => { if (need()) addToCart(p.id, size, qty); };
  const buy = () => { if (need()) { addToCart(p.id, size, qty, false); router.push("/checkout"); } };

  return (
    <section className="page" ref={root}>
      <Ambient particles={10} />
      <div className="wrap">
        <div className="pd">
          <div className="pd-stage glass" onPointerMove={move} onPointerLeave={leave}>
            <div className="glow" style={{ backgroundColor: p.glow }} />
            <div className="pd-intro" ref={intro}>
              <div className="pd-tilt" ref={tilt}>
                <img className="pd-float pd-img" src={p.src} alt={p.name} draggable={false} style={{ filter: shadow(p, "drop-shadow(0 40px 36px rgba(10,30,70,.3))") }} />
              </div>
            </div>
          </div>

          <div className="pd-info">
            <small className="crumbs"><Link href="/shop">Shop</Link> / {p.cat} / {p.name}</small>
            <span className="ptag static">{p.tag}</span>
            <h1>{p.name}</h1>
            <div className="pmeta"><span className="st">{[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}</span><b>{p.rating}</b> ({p.reviews} reviews)</div>
            <div className="price big">{money(p.price)}{p.was && <s>{money(p.was)}</s>}</div>
            <p className="pd-desc">{p.desc}</p>

            <div>
              <small className="lbl">Colourway: {p.color}</small>
              <div className="swatches">
                {PRODUCTS.map((o) => (<Link key={o.id} href={`/product/${o.id}`} className={`swatch ${o.id === p.id ? "on" : ""}`} style={{ background: o.dot }} aria-label={o.name} title={o.name} />))}
              </div>
            </div>

            <div>
              <small className="lbl">Select size (US)</small>
              <div className="psizes sizegrid" ref={sizes}>
                {SIZES.map((s) => (<button key={s} className={s === size ? "on" : ""} onClick={() => setSize(s)} aria-pressed={s === size}>{s}</button>))}
              </div>
            </div>

            <div className="buy">
              <div className="qty lg">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><Minus size={16} /></button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase"><Plus size={16} /></button>
              </div>
              <button className="btn dark big" onClick={add}><ShoppingBag size={16} /> Add to cart</button>
              <button className="btn ghost big" onClick={buy}>Buy now</button>
              <button className={`heart static ${liked ? "on" : ""}`} onClick={() => toggleWish(p.id)} aria-pressed={liked} aria-label="Toggle wishlist"><Heart size={18} fill={liked ? "currentColor" : "none"} /></button>
            </div>

            <div className="perks">
              <div className="perk glass"><Truck size={18} />Free shipping over $200</div>
              <div className="perk glass"><RotateCcw size={18} />30-day returns</div>
              <div className="perk glass"><ShieldCheck size={18} />1-year warranty</div>
            </div>

            <details className="acc glass"><summary>Materials and care</summary><p>Recycled engineered knit upper, air-assisted midsole and rubber outsole. Wipe clean with a damp cloth and air dry.</p></details>
            <details className="acc glass"><summary>Fit guide</summary><p>True to size with a roomy toe box. Between sizes? Go half a size up for long runs.</p></details>
          </div>
        </div>

        <div className="sec-head"><h2 style={{ fontSize: "2rem" }}>You may also like</h2></div>
        <div className="pgrid home3">{others.map((o) => (<ProductCard key={o.id} p={o} />))}</div>
      </div>
    </section>
  );
}
