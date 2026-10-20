"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Search, Home, ShoppingBag, Mail } from "lucide-react";
import Ambient from "./Ambient";
import Mask from "./Mask";

export default function NotFoundView() {
  const root = useRef(null);
  const router = useRouter();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cleanups = [];
    const ctx = gsap.context(() => {
      /* intro: digits slam in, the shoe drops in as the zero and bounces */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".d1", { x: -320, rotate: -80, opacity: 0, duration: 1.3, ease: "elastic.out(1,0.6)" })
        .from(".d3", { x: 320, rotate: 80, opacity: 0, duration: 1.3, ease: "elastic.out(1,0.6)" }, "<")
        .from(".nf-shoe", { y: -700, rotate: 540, scale: 0.3, opacity: 0, duration: 1.5, ease: "bounce.out" }, 0.25)
        .from(".nf-copy .mask > span", { yPercent: 120, duration: 1, stagger: 0.12 }, "-=0.6")
        .from(".nf-copy .nf-fade", { y: 24, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=0.6");

      /* idle: shoe bobs, speed lines streak behind it */
      gsap.to(".nf-shoe-in", { y: -22, rotate: -10, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.6 });
      gsap.fromTo(".speed i", { x: 60, opacity: 0 }, { x: -140, opacity: 0.9, duration: 0.8, ease: "power1.in", repeat: -1, stagger: { each: 0.18, repeat: -1 }, delay: 1.2 });
      gsap.to(".nf-shadow", { scaleX: 0.7, opacity: 0.2, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.6 });

      /* mouse parallax: digits and shoe drift in opposite directions */
      const dx = gsap.quickTo(".nf-digits", "x", { duration: 1, ease: "power3" });
      const dy = gsap.quickTo(".nf-digits", "y", { duration: 1, ease: "power3" });
      const sx = gsap.quickTo(".nf-shoe", "x", { duration: 0.8, ease: "power3" });
      const sy = gsap.quickTo(".nf-shoe", "y", { duration: 0.8, ease: "power3" });
      const move = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        dx(-nx * 30); dy(-ny * 20); sx(nx * 50); sy(ny * 34);
      };
      window.addEventListener("pointermove", move);
      cleanups.push(() => window.removeEventListener("pointermove", move));
    }, root);
    return () => { cleanups.forEach((f) => f()); ctx.revert(); };
  }, []);

  /* click the shoe: it does a flip */
  const spin = () => gsap.to(".nf-shoe-in", { rotate: "+=720", scale: 1.15, duration: 1.1, ease: "power3.inOut", yoyo: true, repeat: 1, repeatDelay: 0 });

  const submit = (e) => { e.preventDefault(); router.push(`/shop?q=${encodeURIComponent(q.trim())}`); };

  return (
    <section className="nf" ref={root}>
      <Ambient particles={18} />
      <div className="nf-digits" aria-label="404">
        <span className="nf-digit d1">4</span>
        <button className="nf-shoe" onClick={spin} aria-label="Spin the shoe">
          <span className="speed" aria-hidden><i style={{ top: "30%", width: "40%" }} /><i style={{ top: "48%", width: "55%" }} /><i style={{ top: "64%", width: "35%" }} /></span>
          <span className="nf-shoe-in"><img src="/shoes/orange.png" alt="" draggable={false} /></span>
          <span className="nf-shadow" />
        </button>
        <span className="nf-digit d3">4</span>
      </div>

      <div className="nf-copy">
        <h1 className="page-title"><Mask>Looks like this run</Mask><Mask className="grad">went off-route.</Mask></h1>
        <p className="sec-sub nf-fade">The page you're after doesn't exist or has moved. Search for a pair instead, or head back to the track.</p>
        <form className="nf-search nf-fade" onSubmit={submit}>
          <Search size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search shoes..." aria-label="Search shoes" />
          <button className="btn dark" type="submit">Search</button>
        </form>
        <div className="nf-links nf-fade">
          <Link href="/" className="btn ghost"><Home size={16} /> Home</Link>
          <Link href="/shop" className="btn ghost"><ShoppingBag size={16} /> Shop</Link>
          <Link href="/contact" className="btn ghost"><Mail size={16} /> Contact</Link>
        </div>
      </div>
    </section>
  );
}
