"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PackageOpen } from "lucide-react";
import PageShell from "../../components/PageShell";
import OrderCard from "../../components/OrderCard";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    try { setOrders(JSON.parse(localStorage.getItem("vt-orders") || "[]")); } catch { setOrders([]); }
  }, []);

  return (
    <PageShell eyebrow="Your account" title="My" accent="orders." sub="Track every pair you've ordered on this device.">
      {orders && orders.length === 0 && (
        <div className="empty glass"><PackageOpen size={44} /><h3>No orders yet</h3><p>When you place an order it will show up here.</p><Link href="/shop" className="btn dark">Start shopping</Link></div>
      )}
      <div className="orders">{(orders || []).map((o) => (<OrderCard key={o.id} o={o} />))}</div>
    </PageShell>
  );
}
