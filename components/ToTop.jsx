"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ToTop() {
  const [show, setShow] = useState(false);
  const ring = useRef(null);
  useEffect(() => {
    const C = 2 * Math.PI * 22;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setShow(window.scrollY > 600);
      if (ring.current) ring.current.style.strokeDashoffset = String(C * (1 - p));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button className={`totop ${show ? "show" : ""}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <svg viewBox="0 0 50 50" width="50" height="50" aria-hidden>
        <circle cx="25" cy="25" r="22" fill="none" stroke="rgba(11,26,56,.12)" strokeWidth="3" />
        <circle ref={ring} cx="25" cy="25" r="22" fill="none" stroke="#ff7a1a" strokeWidth="3" strokeLinecap="round" strokeDasharray={2 * Math.PI * 22} strokeDashoffset={2 * Math.PI * 22} transform="rotate(-90 25 25)" />
      </svg>
      <ArrowUp size={18} />
    </button>
  );
}
