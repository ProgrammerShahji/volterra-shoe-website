"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Ambient from "./Ambient";
import PageHead from "./PageHead";

/* common frame for every content page: header block + scroll-reveal for .rv children */
export default function PageShell({ children, ...head }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set(".rv", { opacity: 0, y: 40 });
      ScrollTrigger.batch(".rv", {
        start: "top 90%", once: true,
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", clearProps: "transform" }),
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="page" ref={ref}>
      <Ambient particles={8} />
      <div className="wrap">
        <PageHead {...head} />
        {children}
      </div>
    </section>
  );
}
