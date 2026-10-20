"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/* animated background: drifting colour blobs + floating sparks */
export default function Ambient({ blobs = true, particles = 0, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = ref.current;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".blob", box).forEach((b) => {
        gsap.to(b, { x: "random(-140,140)", y: "random(-90,90)", scale: "random(.8,1.3)", duration: "random(6,11)", ease: "sine.inOut", repeat: -1, yoyo: true, repeatRefresh: true });
      });
      for (let i = 0; i < particles; i++) {
        const d = document.createElement("span");
        d.className = "spark";
        const s = gsap.utils.random(3, 9);
        Object.assign(d.style, { width: s + "px", height: s + "px", left: gsap.utils.random(0, 100) + "%", top: gsap.utils.random(0, 100) + "%" });
        box.appendChild(d);
        gsap.to(d, { y: gsap.utils.random(-170, -60), x: gsap.utils.random(-60, 60), opacity: gsap.utils.random(0.35, 0.9), duration: gsap.utils.random(4, 9), ease: "sine.inOut", repeat: -1, yoyo: true, delay: gsap.utils.random(0, 4) });
      }
    }, box);
    return () => { ctx.revert(); box.querySelectorAll(".spark").forEach((n) => n.remove()); };
  }, [particles]);

  return (
    <div className={`ambient ${className}`} ref={ref} aria-hidden>
      {blobs && (<><i className="blob b1" /><i className="blob b2" /><i className="blob b3" /></>)}
    </div>
  );
}
