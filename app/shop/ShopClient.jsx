"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import Ambient from "../../components/Ambient";
import PageHead from "../../components/PageHead";
import { PRODUCTS, CATS, money } from "../../lib/products";

export default function ShopClient() {
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") || "");
  const [cat, setCat] = useState("All");
  const [max, setMax] = useState(200);
  const [sale, setSale] = useState(false);
  const [sort, setSort] = useState("featured");
  const [fOpen, setFOpen] = useState(false);

  useEffect(() => { setQ(sp.get("q") || ""); }, [sp]);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    let l = PRODUCTS.filter((p) =>
      (cat === "All" || p.cat === cat) && p.price <= max && (!sale || p.was) &&
      (`${p.name} ${p.cat} ${p.color} ${p.tag}`).toLowerCase().includes(t));
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "rating") l = [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [q, cat, max, sale, sort]);

  useEffect(() => {
    gsap.from(".sidebar", { x: -40, opacity: 0, duration: 0.9, delay: 0.3, ease: "power3.out", clearProps: "transform,opacity" });
  }, []);

  const key = list.map((p) => p.id).join();
  useEffect(() => {
    gsap.fromTo(".shop-grid .pcard", { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", clearProps: "transform,opacity" });
  }, [key]);

  const reset = () => { setQ(""); setCat("All"); setMax(200); setSale(false); setSort("featured"); };

  return (
    <section className="page">
      <Ambient particles={14} />
      <div className="wrap">
        <PageHead eyebrow="The collection" title="Shop all" accent="Aero shoes." sub="Search, filter and find the pair that matches your pace." />

        <button className="btn ghost filter-toggle" onClick={() => setFOpen((o) => !o)}><SlidersHorizontal size={16} /> {fOpen ? "Hide filters" : "Show filters"}</button>

        <div className="shop-layout">
          <aside className={`sidebar glass ${fOpen ? "open" : ""}`}>
            <label className="fld"><Search size={16} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search shoes..." aria-label="Search" /></label>

            <div className="f-group">
              <h4>Category</h4>
              <div className="catlist">
                {CATS.map((c) => (
                  <button key={c} className={`catbtn ${c === cat ? "on" : ""}`} onClick={() => setCat(c)}>
                    <span>{c}</span><em>{PRODUCTS.filter((p) => c === "All" || p.cat === c).length}</em>
                  </button>
                ))}
              </div>
            </div>

            <div className="f-group">
              <h4>Max price <b>{money(max)}</b></h4>
              <input className="range" type="range" min="100" max="200" step="5" value={max} onChange={(e) => setMax(+e.target.value)} aria-label="Max price" />
            </div>

            <label className="check"><input type="checkbox" checked={sale} onChange={(e) => setSale(e.target.checked)} /> On sale only</label>
            <button className="btn ghost center" onClick={reset}>Reset filters</button>
          </aside>

          <div className="results">
            <div className="res-bar">
              <p className="count">{list.length} {list.length === 1 ? "product" : "products"}</p>
              <label className="fld">
                Sort
                <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
                  <option value="featured">Featured</option>
                  <option value="low">Price: low to high</option>
                  <option value="high">Price: high to low</option>
                  <option value="rating">Top rated</option>
                </select>
              </label>
            </div>

            {list.length ? (
              <div className="pgrid shop-grid">{list.map((p) => (<ProductCard key={p.id} p={p} />))}</div>
            ) : (
              <div className="empty glass">
                <h3>No shoes match your filters</h3>
                <p>Try a different search or clear the filters.</p>
                <button className="btn dark" onClick={reset}>Reset filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
