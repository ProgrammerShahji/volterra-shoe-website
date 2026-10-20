"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PackageOpen, Heart, ShoppingBag, LogOut } from "lucide-react";
import PageShell from "../../components/PageShell";
import { useShop } from "../../components/Providers";

export default function Account() {
  const { user, ready, logout, updateName, wish, count, setOpen } = useShop();
  const router = useRouter();
  const [name, setName] = useState("");
  const [orders, setOrders] = useState(0);

  useEffect(() => { if (ready && !user) router.replace("/login"); }, [ready, user, router]);
  useEffect(() => { if (user) setName(user.name); }, [user]);
  useEffect(() => { try { setOrders(JSON.parse(localStorage.getItem("vt-orders") || "[]").length); } catch {} }, []);

  if (!user) return <PageShell eyebrow="Your account" title="Loading" accent="..." />;

  return (
    <PageShell eyebrow="Your account" title={`Hi, ${user.name.split(" ")[0]}`} accent="ready to run?">
      <div className="acct">
        <div className="glass card profile">
          <span className="avatar big">{user.name.trim()[0].toUpperCase()}</span>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <small>Member since {new Date(user.joined).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</small>
          <button className="btn ghost" onClick={() => { logout(); router.push("/"); }}><LogOut size={16} /> Sign out</button>
        </div>
        <div className="acct-main">
          <div className="grid3">
            <Link href="/orders" className="glass card tile"><PackageOpen size={22} /><b>{orders}</b><span>Orders</span></Link>
            <Link href="/wishlist" className="glass card tile"><Heart size={22} /><b>{wish.length}</b><span>Wishlist</span></Link>
            <button className="glass card tile" onClick={() => setOpen(true)}><ShoppingBag size={22} /><b>{count}</b><span>In cart</span></button>
          </div>
          <form className="glass card" onSubmit={(e) => { e.preventDefault(); if (name.trim().length >= 2) updateName(name.trim()); }}>
            <h3>Profile details</h3>
            <div className="field"><label htmlFor="p-name">Full name</label><input id="p-name" value={name} onChange={(e) => setName(e.target.value)} /></div>
            <button className="btn dark" type="submit" style={{ marginTop: 16 }}>Save changes</button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
