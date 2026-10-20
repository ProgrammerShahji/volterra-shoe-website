"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  ArrowRight,
  Play,
  Leaf,
  Feather,
  Wind,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import Ambient from "./Ambient";
import { PRODUCTS, money } from "../lib/products";

const SHOES = PRODUCTS.slice(0, 3);
const AUTOPLAY = 5; // seconds

const FEATURES = [
  { Icon: Feather, title: "Ultra Light", sub: "Feel the freedom" },
  { Icon: Wind, title: "Breathable Mesh", sub: "Stay cool" },
  { Icon: ShieldCheck, title: "Durable Grip", sub: "All terrain" },
  { Icon: Leaf, title: "Eco Friendly", sub: "A better tomorrow" },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const busy = useRef(false);
  const offscreen = useRef(false);
  const prog = useRef(null);

  const root = useRef(null);
  const bg = useRef(null);
  const glow = useRef(null);
  const tilt = useRef(null);
  const float = useRef(null);
  const swap = useRef(null);
  const bar = useRef(null);

  /* the 5s progress bar IS the autoplay timer */
  const startProgress = () => {
    if (prog.current) prog.current.kill();
    gsap.set(bar.current, { scaleX: 0 });
    prog.current = gsap.to(bar.current, {
      scaleX: 1,
      duration: AUTOPLAY,
      ease: "none",
      onComplete: () => goTo((activeRef.current + 1) % SHOES.length),
    });
    prog.current.paused(offscreen.current);
  };

  const goTo = (i, btn) => {
    if (busy.current || i === activeRef.current) return;
    busy.current = true;
    if (prog.current) prog.current.kill();
    gsap.set(bar.current, { scaleX: 0 });
    if (btn)
      gsap.fromTo(
        btn,
        { scale: 0.88 },
        { scale: 1, duration: 0.7, ease: "elastic.out(1,0.4)" },
      );
    gsap.to(glow.current, {
      backgroundColor: SHOES[i].glow,
      duration: 1,
      ease: "power2.inOut",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        busy.current = false;
        startProgress();
      },
    });
    tl.to(swap.current, {
      x: -220,
      rotate: -18,
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
    })
      .add(() => {
        activeRef.current = i;
        flushSync(() => setActive(i));
      })
      .set(swap.current, { x: 260, rotate: 18, scale: 0.8 })
      .to(swap.current, {
        x: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
      })
      .fromTo(
        ".now",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.9",
      );
  };

  useEffect(() => {
    SHOES.forEach((s) => {
      const i = new Image();
      i.src = s.src;
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const cleanups = [];

    const ctx = gsap.context(() => {
      /* intro */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(bg.current, { scale: 1.25, duration: 2.4, ease: "power2.out" }, 0)
        .from(".badge", { y: 20, opacity: 0, duration: 0.8 }, 0.4)
        .from(
          ".line > span",
          { yPercent: 115, duration: 1.1, stagger: 0.12 },
          0.5,
        )
        .from(
          ".sub, .cta > *",
          { y: 24, opacity: 0, stagger: 0.08, duration: 0.9 },
          0.9,
        )
        .from(".gfeat", { x: 0, opacity: 0, stagger: 0.09, duration: 0.9 }, 1.6)
        .from(
          swap.current,
          {
            x: 320,
            y: -140,
            rotate: 28,
            scale: 0.55,
            opacity: 0,
            duration: 1.7,
            ease: "expo.out",
          },
          0.5,
        )
        .from(".glass-card", { x: 60, opacity: 0, duration: 1 }, 1.4)
        .from(".picker", { y: 60, opacity: 0, duration: 1 }, 1.2)
        .from(".scroll", { opacity: 0, duration: 1 }, 1.7)
        .eventCallback("onComplete", startProgress);

      /* idle motion */
      gsap.to(float.current, {
        y: -20,
        rotate: 2.5,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".shadow", {
        scale: 0.8,
        opacity: 0.25,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-feats", {
        y: 10,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });
      gsap.to(".glass-card", {
        y: -12,
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });
      gsap.to(glow.current, {
        scale: 1.12,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.fromTo(
        ".ray",
        { rotate: -24, opacity: 0.12 },
        {
          rotate: -12,
          opacity: 0.4,
          duration: 6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 1.8,
        },
      );

      /* scroll parallax: layers move at different speeds */
      const st = {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(bg.current, { yPercent: 14, ease: "none", scrollTrigger: st });
      gsap.to(".stage", { yPercent: -16, ease: "none", scrollTrigger: st });
      gsap.to(".copy", {
        yPercent: -8,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: st,
      });
      gsap.to(".hero-amb", { yPercent: -25, ease: "none", scrollTrigger: st });

      /* pause autoplay while hero is off screen */
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        onToggle: (s) => {
          offscreen.current = !s.isActive;
          if (prog.current && !busy.current)
            prog.current.paused(offscreen.current);
        },
      });

      /* mouse parallax */
      const bgX = gsap.quickTo(bg.current, "x", {
        duration: 1.4,
        ease: "power3",
      });
      const bgY = gsap.quickTo(bg.current, "y", {
        duration: 1.4,
        ease: "power3",
      });
      const tX = gsap.quickTo(tilt.current, "x", {
        duration: 0.9,
        ease: "power3",
      });
      const tY = gsap.quickTo(tilt.current, "y", {
        duration: 0.9,
        ease: "power3",
      });
      const rY = gsap.quickTo(tilt.current, "rotationY", {
        duration: 0.9,
        ease: "power3",
      });
      const rX = gsap.quickTo(tilt.current, "rotationX", {
        duration: 0.9,
        ease: "power3",
      });
      const gX = gsap.quickTo(glow.current, "x", {
        duration: 1.2,
        ease: "power3",
      });
      const gY = gsap.quickTo(glow.current, "y", {
        duration: 1.2,
        ease: "power3",
      });
      gsap.set(tilt.current, { transformPerspective: 1000 });

      const onMove = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        bgX(-nx * 40);
        bgY(-ny * 28);
        tX(nx * 40);
        tY(ny * 26);
        rY(nx * 16);
        rX(-ny * 12);
        gX(nx * 70);
        gY(ny * 50);
      };
      window.addEventListener("pointermove", onMove);
      cleanups.push(() => window.removeEventListener("pointermove", onMove));

      /* shoe hover */
      const stage = root.current.querySelector(".stage");
      const sIn = () =>
        gsap.to(tilt.current, {
          scale: 1.07,
          duration: 0.7,
          ease: "power3.out",
        });
      const sOut = () =>
        gsap.to(tilt.current, {
          scale: 1,
          duration: 0.9,
          ease: "elastic.out(1,0.5)",
        });
      stage.addEventListener("pointerenter", sIn);
      stage.addEventListener("pointerleave", sOut);
      cleanups.push(() => {
        stage.removeEventListener("pointerenter", sIn);
        stage.removeEventListener("pointerleave", sOut);
      });

      /* magnetic buttons */
      root.current.querySelectorAll("[data-magnetic]").forEach((el) => {
        const move = (e) => {
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
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", out);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", out);
        });
      });
    }, root);

    return () => {
      cleanups.forEach((fn) => fn());
      if (prog.current) prog.current.kill();
      ctx.revert();
    };
  }, []);

  const shoe = SHOES[active];

  return (
    <section className="hero" ref={root}>
      <div className="bg" ref={bg} />
      <div className="veil" />
      <i className="ray r1" />
      <i className="ray r2" />
      <Ambient blobs={false} particles={24} className="hero-amb" />

      <div className="content">
        <div className="copy">
          <span className="badge">
            <Zap size={14} /> Next Gen Performance
          </span>
          <h1>
            <span className="line">
              <span>Move Faster</span>
            </span>
            <span className="line grad">
              <span>Go Further</span>
            </span>
          </h1>
          <p className="sub">
            Engineered for the dreamers, built for the journey. Lightweight,
            breathable, and made to keep up with your every move.
          </p>
          <div className="cta">
            <Link href="/shop" className="btn dark big" data-magnetic>
              Shop Collection <ArrowRight size={16} />
            </Link>
            <a href="#technology" className="watch" data-magnetic>
              <span className="play">
                <Play size={14} fill="currentColor" />
              </span>{" "}
              Watch Video
            </a>
          </div>

          <div className="picker">
            <div className="thumbs">
              {SHOES.map((s, i) => (
                <button
                  key={s.id}
                  className={`thumb ${i === active ? "on" : ""}`}
                  onClick={(e) => goTo(i, e.currentTarget)}
                  aria-label={s.name}
                  aria-pressed={i === active}
                >
                  <img src={s.src} alt="" draggable={false} />
                </button>
              ))}
            </div>
            <div className="colors">
              <span className="now">
                {shoe.name} · {money(shoe.price)}
              </span>
              <div className="dots">
                {SHOES.map((s, i) => (
                  <i
                    key={s.id}
                    className={i === active ? "on" : ""}
                    style={{ background: s.dot }}
                  />
                ))}
              </div>
              <div className="prog">
                <i ref={bar} />
              </div>
            </div>
            <Link
              href={`/product/${shoe.id}`}
              className="pick-go"
              aria-label={`View ${shoe.name}`}
            >
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="stage">
        <div
          className="glow"
          ref={glow}
          style={{ backgroundColor: SHOES[0].glow }}
        />
        <div className="tilt" ref={tilt}>
          <div className="float" ref={float}>
            <div className="swap" ref={swap}>
              <img src={shoe.src} alt={shoe.name} draggable={false} />
            </div>
          </div>
        </div>
        <div className="shadow" />
      </div>

      <div className="glass-card">
        <span className="gc-ico">
          <Leaf size={16} />
        </span>
        <div>
          <b>Lightweight Design</b>
          <small>Feather-light build for all-day comfort.</small>
        </div>
        <ArrowRight size={16} />
      </div>

      <ul className="hero-feats">
        {FEATURES.map(({ Icon, title, sub }) => (
          <li className="gfeat" key={title}>
            <span className="gc-ico">
              <Icon size={16} />
            </span>
            <div>
              <b>{title}</b>
              <small>{sub}</small>
            </div>
          </li>
        ))}
      </ul>

      <div className="scroll">
        <span className="mouse">
          <i />
        </span>
        Scroll Down
        <ChevronDown size={14} />
      </div>
    </section>
  );
}
