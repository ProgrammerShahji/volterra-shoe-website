"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Star,
  Feather,
  Wind,
  ShieldCheck,
  Leaf,
  Send,
} from "lucide-react";
import Mask from "./Mask";
import Ambient from "./Ambient";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "../lib/products";
import { useShop } from "./Providers";

const FEATURED = PRODUCTS.slice(0, 3);

const TECH_L = [
  {
    Icon: Feather,
    t: "Featherweight upper",
    d: "Engineered knit that weighs almost nothing on foot.",
  },
  {
    Icon: Wind,
    t: "Breathable mesh",
    d: "Open weave channels air through every stride.",
  },
];
const TECH_R = [
  {
    Icon: ShieldCheck,
    t: "Trail-ready grip",
    d: "Deep lugs hold on wet rock, gravel and pavement.",
  },
  {
    Icon: Leaf,
    t: "Recycled materials",
    d: "Mesh and midsole made with recycled content.",
  },
];
const STATS = [
  { v: 50, s: "K+", l: "Runners worldwide" },
  { v: 280, s: "g", l: "Weight per shoe" },
  { v: 92, s: "%", l: "Recycled mesh" },
  { v: 4.9, s: "/5", l: "Average rating", dec: 1 },
];
const REVIEWS = [
  {
    n: "Hira S.",
    r: "Trail runner",
    q: "I forgot I was wearing them by kilometre ten. The grip on wet rock is unreal.",
  },
  {
    n: "Daniyal K.",
    r: "Marathon runner",
    q: "Lightest daily trainer I own, and the mesh keeps my feet cool in summer.",
  },
  {
    n: "Maryam A.",
    r: "Weekend hiker",
    q: "Comfortable straight out of the box. The orange pair gets compliments everywhere.",
  },
];

export default function Sections() {
  const root = useRef(null);
  const { notify } = useShop();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      notify("Enter a valid email address", "warn");
      return;
    }
    try {
      const l = JSON.parse(localStorage.getItem("vt-news") || "[]");
      localStorage.setItem("vt-news", JSON.stringify([...l, email]));
    } catch {}
    setDone(true);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cleanups = [];

    const ctx = gsap.context(() => {
      /* headings */
      gsap.utils.toArray(".sec-head").forEach((h) => {
        gsap.from(h.querySelectorAll(".mask > span"), {
          yPercent: 115,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: h, start: "top 88%" },
        });
        gsap.from(h.querySelectorAll(".sec-sub"), {
          y: 24,
          opacity: 0,
          duration: 0.9,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: { trigger: h, start: "top 88%" },
        });
      });

      /* generic parallax: any [data-speed] drifts at its own pace */
      gsap.utils.toArray("[data-speed]").forEach((el) => {
        gsap.to(el, {
          y: -parseFloat(el.dataset.speed) * 160,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });
      gsap.utils.toArray(".sec .ambient .blob").forEach((b, i) => {
        gsap.to(b, {
          yPercent: (i % 2 ? -1 : 1) * 40,
          ease: "none",
          scrollTrigger: {
            trigger: b.closest(".sec"),
            scrub: 1,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });

      /* marquee */
      const mq = gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });
      ScrollTrigger.create({
        onUpdate: (self) => {
          gsap.to(mq, {
            timeScale: 1 + Math.abs(self.getVelocity()) / 350,
            duration: 0.2,
            overwrite: true,
          });
          gsap.to(mq, { timeScale: 1, duration: 1, delay: 0.2 });
        },
      });

      /* product cards */
      gsap.from(".home3 .pcard", {
        y: 120,
        rotate: 4,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".home3", start: "top 82%" },
      });

      /* technology */
      gsap.fromTo(
        ".tech-shoe",
        { rotate: -20, scale: 0.8, x: -90 },
        {
          rotate: 16,
          scale: 1.12,
          x: 90,
          ease: "none",
          scrollTrigger: {
            trigger: ".tech",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );
      gsap.from(".tech-l .callout", {
        x: -60,
        opacity: 0,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tech-grid", start: "top 78%" },
      });
      gsap.from(".tech-r .callout", {
        x: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tech-grid", start: "top 78%" },
      });

      /* stats */
      gsap.from(".stat", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stats-row", start: "top 88%" },
      });
      gsap.utils.toArray(".stat-num").forEach((el) => {
        const end = parseFloat(el.dataset.v);
        const dec = parseInt(el.dataset.dec || "0", 10);
        const o = { n: 0 };
        gsap.to(o, {
          n: end,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => {
            el.firstChild.textContent = o.n.toFixed(dec);
          },
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
      gsap.from(".review", {
        y: 0,
        opacity: 0,
        scale: 1,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".review-row", start: "top 85%" },
      });

      /* CTA */
      gsap.fromTo(
        ".cta-bg",
        { yPercent: -12, scale: 1.15 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".cta-sec",
            scrub: 1,
            start: "top bottom",
            end: "bottom top",
          },
        },
      );
      gsap.utils.toArray(".fan").forEach((el, i) => {
        gsap.from(el, {
          y: 200,
          rotate: (i - 1) * 40,
          opacity: 0,
          duration: 1.4,
          delay: i * 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: ".cta-sec", start: "top 68%" },
        });
        gsap.to(el.firstChild, {
          y: -16,
          duration: 2.8 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
      gsap.from(".cta-box > *", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cta-box", start: "top 85%" },
      });

      /* magnetic */
      root.current.querySelectorAll("[data-magnetic]").forEach((el) => {
        const mv = (e) => {
          const r = el.getBoundingClientRect();
          gsap.to(el, {
            x: (e.clientX - (r.left + r.width / 2)) * 0.3,
            y: (e.clientY - (r.top + r.height / 2)) * 0.3,
            duration: 0.4,
            ease: "power3.out",
          });
        };
        const out = () =>
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "elastic.out(1,0.4)",
          });
        el.addEventListener("pointermove", mv);
        el.addEventListener("pointerleave", out);
        cleanups.push(() => {
          el.removeEventListener("pointermove", mv);
          el.removeEventListener("pointerleave", out);
        });
      });
    }, root);

    return () => {
      cleanups.forEach((f) => f());
      ctx.revert();
    };
  }, []);

  const words = [
    "Ultra Light",
    "Breathable Mesh",
    "Durable Grip",
    "Eco Friendly",
    "Move Faster",
    "Go Further",
  ];

  return (
    <div ref={root}>
      {/* <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...words, ...words, ...words, ...words].map((w, i) => (
            <span key={i}>
              {w}
              <i />
            </span>
          ))}
        </div>
      </div> */}

      <section className="sec light" id="collection">
        <Ambient />
        <div className="sec-head center" data-speed="0.05">
          <h2>
            <Mask>The Aero Collection</Mask>
            <Mask className="grad">Three ways to run.</Mask>
          </h2>
          <p className="sec-sub">
            One cushioned platform, three colourways. Pick a size and make it
            yours.
          </p>
        </div>
        <div className="pgrid home3">
          {FEATURED.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
        <div className="center-row">
          <Link href="/shop" className="btn dark big" data-magnetic>
            View all products <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="tech" id="technology">
        <div className="tech-orb" data-speed="0.2" />
        <div className="sec-head center onDark">
          <h2>
            <Mask>Built around</Mask>
            <Mask className="grad">every step.</Mask>
          </h2>
          <p className="sec-sub">
            Scroll to spin the shoe and see what goes into it.
          </p>
        </div>
        <div className="tech-grid">
          <div className="tech-col tech-l">
            {TECH_L.map(({ Icon, t, d }) => (
              <div className="callout" key={t}>
                <span>
                  <Icon size={20} />
                </span>
                <h4>{t}</h4>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className="tech-center">
            <img
              className="tech-shoe"
              src="/shoes/orange.png"
              alt="Aero shoe"
              draggable={false}
            />
          </div>
          <div className="tech-col tech-r">
            {TECH_R.map(({ Icon, t, d }) => (
              <div className="callout" key={t}>
                <span>
                  <Icon size={20} />
                </span>
                <h4>{t}</h4>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec light" id="stats">
        <Ambient />
        <div className="sec-head center">
          <h2>
            <Mask>Numbers that</Mask>
            <Mask className="grad">keep us moving.</Mask>
          </h2>
        </div>
        <div className="stats-row">
          {STATS.map((s) => (
            <div className="stat" key={s.l}>
              <div className="stat-num" data-v={s.v} data-dec={s.dec || 0}>
                <span>0</span>
                <em>{s.s}</em>
              </div>
              <small>{s.l}</small>
            </div>
          ))}
        </div>
        <div className="review-row">
          {REVIEWS.map((r) => (
            <figure className="review" key={r.n}>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
              <blockquote>{r.q}</blockquote>
              <figcaption>
                <b>{r.n}</b>
                <small>{r.r}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-bg" />
        <div className="fans" data-speed="0.1">
          <div className="fan f1">
            <img src="/shoes/blue.png" alt="" />
          </div>
          <div className="fan f2">
            <img src="/shoes/orange.png" alt="" />
          </div>
          <div className="fan f3">
            <img src="/shoes/black.png" alt="" />
          </div>
        </div>
        <div className="cta-box">
          <h2>Ready to run further?</h2>
          <p>
            Join the list for early drops and 10% off your first pair. Use code
            VOLT10 at checkout.
          </p>
          {done ? (
            <div className="thanks">
              You're in. Use code VOLT10 at checkout.
            </div>
          ) : (
            <form className="news" onSubmit={subscribe}>
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn dark" type="submit" data-magnetic>
                Subscribe <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
