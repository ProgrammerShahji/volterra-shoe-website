"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Eye, EyeOff, Lock } from "lucide-react";
import Ambient from "./Ambient";
import { useShop } from "./Providers";

export default function AuthForm({ mode }) {
  const reg = mode === "register";
  const { user, login, register } = useShop();
  const router = useRouter();
  const root = useRef(null);
  const [f, setF] = useState({ name: "", email: "", password: "", confirm: "" });
  const [err, setErr] = useState({});
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (user) router.replace("/account"); }, [user, router]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".auth", { y: 60, opacity: 0, scale: 0.96, duration: 1, ease: "expo.out" });
      gsap.from(".auth-shoe", { x: 80, rotate: 20, opacity: 0, duration: 1.4, delay: 0.2, ease: "expo.out" });
      gsap.to(".auth-shoe", { y: -14, rotate: -3, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, root);
    return () => ctx.revert();
  }, []);

  const set = (k, v) => { setF((s) => ({ ...s, [k]: v })); if (err[k]) setErr((e) => ({ ...e, [k]: "" })); setMsg(""); };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = {};
    if (reg && f.name.trim().length < 2) e.name = "Enter your name";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email";
    if (f.password.length < 6) e.password = "Use at least 6 characters";
    if (reg && f.confirm !== f.password) e.confirm = "Passwords do not match";
    setErr(e);
    if (Object.keys(e).length) { requestAnimationFrame(() => { const el = document.querySelector(".field.err"); if (el) gsap.fromTo(el, { x: -8 }, { x: 0, duration: 0.6, ease: "elastic.out(1,0.25)" }); }); return; }
    setBusy(true);
    const r = reg ? await register(f) : await login(f.email, f.password);
    setBusy(false);
    if (r.error) { setMsg(r.error); gsap.fromTo(".auth-form", { x: -10 }, { x: 0, duration: 0.6, ease: "elastic.out(1,0.25)" }); }
    else router.push("/account");
  };

  const field = (k, label, o = {}) => (
    <div className={`field ${err[k] ? "err" : ""}`}>
      <label htmlFor={"a-" + k}>{label}</label>
      <div className="pw">
        <input id={"a-" + k} type={o.pw && !show ? "password" : o.type || "text"} autoComplete={o.ac} value={f[k]} onChange={(e) => set(k, e.target.value)} />
        {o.pw && k === "password" && <button type="button" className="eye" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}>{show ? <EyeOff size={17} /> : <Eye size={17} />}</button>}
      </div>
      {err[k] && <small className="errmsg">{err[k]}</small>}
    </div>
  );

  return (
    <section className="page auth-page" ref={root}>
      <Ambient particles={10} />
      <div className="auth glass">
        <div className="auth-side">
          <h2>{reg ? "Join the crew" : "Welcome back"}</h2>
          <p>{reg ? "Save favourites, track orders and get early access to new drops." : "Sign in to see your orders, wishlist and saved details."}</p>
          <img className="auth-shoe" src="/shoes/orange.png" alt="" draggable={false} />
        </div>
        <form className="auth-form" onSubmit={submit} noValidate>
          <h1>{reg ? "Create account" : "Sign in"}</h1>
          {msg && <div className="auth-msg" role="alert">{msg}</div>}
          {reg && field("name", "Full name", { ac: "name" })}
          {field("email", "Email", { type: "email", ac: "email" })}
          {field("password", "Password", { pw: true, ac: reg ? "new-password" : "current-password" })}
          {reg && field("confirm", "Confirm password", { pw: true, ac: "new-password" })}
          <button className="btn dark big center" type="submit" disabled={busy}>{busy ? "Please wait..." : reg ? "Create account" : "Sign in"}</button>
          <p className="auth-alt">{reg ? <>Already have an account? <Link href="/login">Sign in</Link></> : <>New to Volterra? <Link href="/register">Create an account</Link></>}</p>
          <p className="demo-note"><Lock size={14} /> Demo accounts are stored in this browser only.</p>
        </form>
      </div>
    </section>
  );
}
