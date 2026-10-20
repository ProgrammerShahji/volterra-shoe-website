"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import PageHead from "../../components/PageHead";
import Ambient from "../../components/Ambient";
import ProductCard from "../../components/ProductCard";
import { useShop } from "../../components/Providers";
import { PRODUCTS } from "../../lib/products";

export default function Wishlist() {
  const { wish, ready } = useShop();
  const items = PRODUCTS.filter((p) => wish.includes(p.id));
  return (
    <section className="page">
      <Ambient />
      <div className="wrap">
        <PageHead eyebrow="Saved for later" title="Your" accent="wishlist." />
        {ready && items.length === 0 ? (
          <div className="empty glass">
            <Heart size={44} />
            <h3>Nothing saved yet</h3>
            <p>Tap the heart on any shoe to save it here.</p>
            <Link href="/shop" className="btn dark">Browse shoes</Link>
          </div>
        ) : (
          <div className="pgrid shop-grid">{items.map((p) => (<ProductCard key={p.id} p={p} />))}</div>
        )}
      </div>
    </section>
  );
}
