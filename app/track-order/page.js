"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import PageShell from "../../components/PageShell";
import OrderCard from "../../components/OrderCard";

export default function TrackOrder() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [found, setFound] = useState(undefined);

  const submit = (e) => {
    e.preventDefault();
    let list = [];
    try { list = JSON.parse(localStorage.getItem("vt-orders") || "[]"); } catch {}
    const o = list.find((x) => x.id.toLowerCase() === id.trim().toLowerCase() && x.email.toLowerCase() === email.trim().toLowerCase());
    setFound(o || null);
  };

  return (
    <PageShell eyebrow="Where's my order?" title="Track your" accent="order." sub="Enter the order number from your confirmation and the email you used at checkout.">
      <form className="glass card track-form" onSubmit={submit}>
        <div className="fgrid">
          <div className="field"><label htmlFor="t-id">Order number</label><input id="t-id" placeholder="VT-ABC123" value={id} onChange={(e) => setId(e.target.value)} required /></div>
          <div className="field"><label htmlFor="t-mail">Email</label><input id="t-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        </div>
        <button className="btn dark big" type="submit"><Search size={16} /> Track order</button>
      </form>
      {found === null && <p className="errmsg track-msg">We couldn't find that order on this device. Check the number and email and try again.</p>}
      {found && <div className="orders track-result"><OrderCard o={found} /></div>}
    </PageShell>
  );
}
