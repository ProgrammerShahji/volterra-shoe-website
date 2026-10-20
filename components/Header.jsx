"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, ChevronDown, User } from "lucide-react";
import { useShop } from "./Providers";

const MAIN = [["Home", "/"], ["Shop", "/shop"], ["Journal", "/blog"], ["About", "/about"]];
const HELP = [["Size Guide", "/size-guide"], ["FAQ", "/faq"], ["Shipping & Returns", "/shipping-returns"], ["Track Order", "/track-order"], ["My Orders", "/orders"], ["Store Locator", "/stores"]];
const ALL = [...MAIN, ...HELP, ["Contact", "/contact"]];
const CLOSED = "circle(0% at 92% 4%)";

export default function Header() {
  const { count, wish, setOpen, user } = useShop();
  const path = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [help, setHelp] = useState(false);
  const [q, setQ] = useState("");
  const bar = useRef(null);
  const menuRef = useRef(null);
  const badge = useRef(null);
  const input = useRef(null);

  const isOn = (h) => (h === "/" ? path === "/" : path.startsWith(h));
  const helpOn = HELP.some(([, h]) => isOn(h));

  useEffect(() => {
    gsap.from(bar.current, { yPercent: -100, opacity: 0, duration: 1, ease: "power4.out", delay: 0.1, clearProps: "transform,opacity" });
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const outside = (e) => { if (!e.target.closest(".dd")) setHelp(false); };
    document.addEventListener("pointerdown", outside);
    return () => { window.removeEventListener("scroll", onScroll); document.removeEventListener("pointerdown", outside); };
  }, []);

  useEffect(() => { setMenu(false); setSearch(false); setHelp(false); }, [path]);

  useEffect(() => {
    if (count > 0 && badge.current) gsap.fromTo(badge.current, { scale: 1.9 }, { scale: 1, duration: 0.8, ease: "elastic.out(1,0.4)" });
  }, [count]);

  useEffect(() => { if (search && input.current) input.current.focus(); }, [search]);

  useEffect(() => {
    if (!menu) { document.body.style.overflow = ""; return; }
    document.body.style.overflow = "hidden";
    gsap.fromTo(menuRef.current, { clipPath: CLOSED }, { clipPath: "circle(150% at 92% 4%)", duration: 0.8, ease: "power3.out" });
    gsap.from(".mlink", { y: 40, opacity: 0, stagger: 0.05, delay: 0.25, duration: 0.7, ease: "power3.out" });
  }, [menu]);

  const closeMenu = () => gsap.to(menuRef.current, { clipPath: CLOSED, duration: 0.5, ease: "power3.in", onComplete: () => setMenu(false) });

  const submit = (e) => {
    e.preventDefault();
    router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
    setSearch(false);
  };

  return (
    <>
      <header ref={bar} className={`hdr ${scrolled ? "scrolled" : ""}`}>
        <div className="hdr-in">
          <Link href="/" className="logo">
            <svg width="34" height="30" viewBox="0 0 34 30" fill="none" aria-hidden>
              <path d="M1 3c6 1 10 4 13 9l3 7 3-7c3-5 7-8 13-9-3 7-6 12-12 16l-4 8-4-8C7 15 4 10 1 3z" fill="#0b1730" />
            </svg>
            <span>VOLTERRA</span>
          </Link>

          <nav className="links" aria-label="Main">
            {MAIN.map(([t, h]) => (<Link key={t} href={h} className={isOn(h) ? "on" : ""}>{t}</Link>))}
            <div className={`dd ${help ? "open" : ""}`} onMouseEnter={() => setHelp(true)} onMouseLeave={() => setHelp(false)}>
              <button className={`dd-btn ${helpOn ? "on" : ""}`} aria-expanded={help} onClick={() => setHelp((h) => !h)}>Help <ChevronDown size={14} /></button>
              <div className="dd-menu"><div className="dd-panel">
                {HELP.map(([t, h]) => (<Link key={t} href={h} className={isOn(h) ? "on" : ""}>{t}</Link>))}
              </div></div>
            </div>
            <Link href="/contact" className={isOn("/contact") ? "on" : ""}>Contact</Link>
          </nav>

          <div className="nav-right">
            <button className="icon-btn" aria-label="Search" onClick={() => setSearch((s) => !s)}>{search ? <X size={19} /> : <Search size={19} />}</button>
            <Link href={user ? "/account" : "/login"} className="icon-btn u-btn" aria-label={user ? "My account" : "Sign in"}>{user ? <span className="avatar">{user.name.trim()[0].toUpperCase()}</span> : <User size={19} />}</Link>
            <Link href="/wishlist" className="icon-btn cart" aria-label="Wishlist"><Heart size={19} />{wish.length > 0 && <i>{wish.length}</i>}</Link>
            <button className="icon-btn cart" aria-label="Open cart" onClick={() => setOpen(true)}><ShoppingBag size={19} />{count > 0 && <i ref={badge}>{count}</i>}</button>
            <Link href="/shop" className="btn dark hdr-cta">Shop Now <ArrowRight size={16} /></Link>
            <button className="icon-btn burger" aria-label="Open menu" onClick={() => setMenu(true)}><Menu size={22} /></button>
          </div>
        </div>
        <form className={`hdr-search ${search ? "show" : ""}`} onSubmit={submit}>
          <Search size={18} />
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search shoes, colours, categories..." aria-label="Search products" />
          <button className="btn dark" type="submit">Search</button>
        </form>
      </header>

      {menu && (
        <div className="mmenu" ref={menuRef}>
          <button className="icon-btn mclose" aria-label="Close menu" onClick={closeMenu}><X size={26} /></button>
          {ALL.map(([t, h]) => (<Link key={t} href={h} className="mlink" onClick={closeMenu}>{t}</Link>))}
          <Link href="/wishlist" className="mlink" onClick={closeMenu}>Wishlist ({wish.length})</Link>
          <Link href={user ? "/account" : "/login"} className="mlink" onClick={closeMenu}>{user ? "My account" : "Sign in"}</Link>
        </div>
      )}
    </>
  );
}
