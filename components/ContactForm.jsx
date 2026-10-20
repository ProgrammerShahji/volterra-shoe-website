"use client";

import { useState } from "react";
import gsap from "gsap";
import { Send, Check } from "lucide-react";
import { useShop } from "./Providers";

const EMPTY = { name: "", email: "", subject: "Order help", message: "" };

export default function ContactForm() {
  const { notify } = useShop();
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k, v) => { setF((s) => ({ ...s, [k]: v })); if (err[k]) setErr((e) => ({ ...e, [k]: "" })); };

  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (f.name.trim().length < 2) e.name = "Enter your name";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email";
    if (f.message.trim().length < 10) e.message = "Write at least 10 characters";
    setErr(e);
    if (Object.keys(e).length) {
      notify("Please fix the highlighted fields", "warn");
      requestAnimationFrame(() => { const el = document.querySelector(".field.err"); if (el) gsap.fromTo(el, { x: -8 }, { x: 0, duration: 0.6, ease: "elastic.out(1,0.25)" }); });
      return;
    }
    setBusy(true);
    setTimeout(() => {
      try { const l = JSON.parse(localStorage.getItem("vt-messages") || "[]"); localStorage.setItem("vt-messages", JSON.stringify([{ ...f, date: new Date().toISOString() }, ...l])); } catch {}
      setBusy(false); setSent(true);
    }, 1000);
  };

  if (sent) {
    return (
      <div className="glass card form-done">
        <span className="ico ok"><Check size={24} /></span>
        <h3>Message sent</h3>
        <p>Thanks {f.name.split(" ")[0]}, we will reply to {f.email} within one business day.</p>
        <button className="btn ghost" onClick={() => { setF(EMPTY); setSent(false); }}>Send another</button>
      </div>
    );
  }

  return (
    <form className="glass card" onSubmit={submit} noValidate>
      <h3>Send us a message</h3>
      <div className="fgrid">
        <div className={`field ${err.name ? "err" : ""}`}><label htmlFor="c-name">Name</label><input id="c-name" value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />{err.name && <small className="errmsg">{err.name}</small>}</div>
        <div className={`field ${err.email ? "err" : ""}`}><label htmlFor="c-email">Email</label><input id="c-email" type="email" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />{err.email && <small className="errmsg">{err.email}</small>}</div>
        <div className="field span2"><label htmlFor="c-sub">Topic</label>
          <select id="c-sub" value={f.subject} onChange={(e) => set("subject", e.target.value)}>
            <option>Order help</option><option>Returns and exchanges</option><option>Sizing advice</option><option>Wholesale</option><option>Something else</option>
          </select>
        </div>
        <div className={`field span2 ${err.message ? "err" : ""}`}><label htmlFor="c-msg">Message</label><textarea id="c-msg" rows={5} value={f.message} onChange={(e) => set("message", e.target.value)} />{err.message && <small className="errmsg">{err.message}</small>}</div>
      </div>
      <button className="btn dark big" type="submit" disabled={busy}>{busy ? "Sending..." : <>Send message <Send size={15} /></>}</button>
    </form>
  );
}
