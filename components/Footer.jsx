"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Send,
  ArrowUp,
} from "lucide-react";

import Ambient from "./Ambient";
import { useShop } from "./Providers";

const TRUST = [
  { Icon: Truck, t: "Free shipping over $200" },
  { Icon: RotateCcw, t: "30-day easy returns" },
  { Icon: ShieldCheck, t: "Secure checkout" },
  { Icon: Headphones, t: "Friendly support" },
];

export default function Footer() {
  const ref = useRef(null);
  const pathname = usePathname();

  // Automatically updates when the route changes
  const isHomePage = pathname === "/";

  const { notify, user } = useShop();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const st = { trigger: ref.current, start: "top 90%" };

      // Animate the subscription band only when it exists
      if (!isHomePage) {
        gsap.from(".f-band", {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: st,
        });
      }

      gsap.from(".trust", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: st,
      });

      gsap.from(".foot-col", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".foot-grid",
          start: "top 92%",
        },
      });

      gsap.from(".f-word span", {
        yPercent: 0,
        stagger: 0.05,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".f-word",
          start: "top 105%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [isHomePage]);

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
    notify("Subscribed! Use code VOLT10 at checkout");
  };

  return (
    <footer className="footer" ref={ref}>
      <Ambient particles={10} className="f-amb" />

      {/* Hide subscription band on homepage only */}
      {!isHomePage && (
        <div className="f-band">
          <div>
            <h3>Join the Volterra crew</h3>
            <p>Early drops, trail tips and 10% off your first pair.</p>
          </div>

          {done ? (
            <div className="f-done">
              You're in. Use code <b>VOLT10</b> at checkout.
            </div>
          ) : (
            <form className="f-news" onSubmit={subscribe}>
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button className="btn dark" type="submit">
                Subscribe <Send size={15} />
              </button>
            </form>
          )}
        </div>
      )}

      <div className="f-trust">
        {TRUST.map(({ Icon, t }) => (
          <div className="trust" key={t}>
            <span>
              <Icon size={19} />
            </span>
            {t}
          </div>
        ))}
      </div>

      <div className="foot-grid">
        <div className="foot-col brand">
          <Link href="/" className="logo">
            <svg
              width="30"
              height="27"
              viewBox="0 0 34 30"
              fill="none"
              aria-hidden
            >
              <path
                d="M1 3c6 1 10 4 13 9l3 7 3-7c3-5 7-8 13-9-3 7-6 12-12 16l-4 8-4-8C7 15 4 10 1 3z"
                fill="#fff"
              />
            </svg>
            <span>VOLTERRA</span>
          </Link>

          <p>
            Lightweight, breathable running shoes for people who keep going.
          </p>

          <div className="contact-lines">
            <a href="mailto:hello@volterra.example">
              <Mail size={15} /> hello@volterra.example
            </a>
            <a href="tel:+15550102030">
              <Phone size={15} /> +1 (555) 010-2030
            </a>
            <Link href="/stores">
              <MapPin size={15} /> Find a store
            </Link>
          </div>

          <div className="social">
            <a href="#" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" aria-label="YouTube">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        <div className="foot-col">
          <h5>Shop</h5>
          <Link href="/shop">All shoes</Link>
          <Link href="/shop?q=running">Running</Link>
          <Link href="/shop?q=trail">Trail</Link>
          <Link href="/shop?q=lifestyle">Lifestyle</Link>
          <Link href="/wishlist">Wishlist</Link>
        </div>

        <div className="foot-col">
          <h5>Account</h5>
          {user ? (
            <Link href="/account">My account</Link>
          ) : (
            <>
              <Link href="/login">Sign in</Link>
              <Link href="/register">Create account</Link>
            </>
          )}
          <Link href="/orders">My orders</Link>
          <Link href="/track-order">Track order</Link>
        </div>

        <div className="foot-col">
          <h5>Company</h5>
          <Link href="/about">About us</Link>
          <Link href="/blog">Journal</Link>
          <Link href="/sustainability">Sustainability</Link>
          <Link href="/careers">Careers</Link>
        </div>

        <div className="foot-col">
          <h5>Help</h5>
          <Link href="/faq">FAQ</Link>
          <Link href="/size-guide">Size guide</Link>
          <Link href="/shipping-returns">Shipping and returns</Link>
          <Link href="/contact">Contact us</Link>
        </div>
      </div>

      <div className="f-word" aria-hidden>
        {"VOLTERRA".split("").map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>

      <div className="foot-bottom">
        <span>© 2026 Volterra. All rights reserved.</span>

        <div className="pay" aria-label="Accepted payments">
          <span>VISA</span>
          <span>MASTERCARD</span>
          <span>COD</span>
        </div>

        <span className="legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <button
            className="top-link"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Top <ArrowUp size={13} />
          </button>
        </span>
      </div>
    </footer>
  );
}
