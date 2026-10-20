"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.1 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.1 });
    let shown = false;
    const move = (e) => {
      if (!shown) { shown = true; gsap.to([ring.current, dot.current], { opacity: 1, duration: 0.4 }); }
      rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
    };
    const over = (e) => {
      const hit = e.target.closest("a, button, input, select, label, summary, .pcard, .stage");
      gsap.to(ring.current, { scale: hit ? 1.8 : 1, duration: 0.3 });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over); };
  }, []);

  return (<><div className="cursor-ring" ref={ring} /><div className="cursor-dot" ref={dot} /></>);
}
