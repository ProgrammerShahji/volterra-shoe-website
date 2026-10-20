"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Mask from "./Mask";

export default function PageHead({ eyebrow, title, accent, sub, center = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".mask > span", { yPercent: 120, duration: 1.1, stagger: 0.12, ease: "power4.out" });
      gsap.from(".pg-eyebrow, .pg-sub", { y: 20, opacity: 0, duration: 0.8, stagger: 0.15, delay: 0.25, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`page-head ${center ? "center" : ""}`}>
      {eyebrow && <span className="badge pg-eyebrow">{eyebrow}</span>}
      <h1 className="page-title"><Mask>{title}</Mask>{accent && <Mask className="grad">{accent}</Mask>}</h1>
      {sub && <p className="sec-sub pg-sub">{sub}</p>}
    </div>
  );
}
