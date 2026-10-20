import { money } from "../lib/products";

export const STEPS = ["Confirmed", "Packed", "Shipped", "Delivered"];
const stage = (d) => { const h = (Date.now() - new Date(d)) / 36e5; return h < 1 ? 0 : h < 24 ? 1 : h < 72 ? 2 : 3; };
const fmt = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

export default function OrderCard({ o }) {
  const s = stage(o.date);
  return (
    <article className="glass card order">
      <div className="order-top">
        <div><b>{o.id}</b><small>{fmt(o.date)}</small></div>
        <b>{money(o.total)}</b>
      </div>
      <div className="track" aria-label={`Status: ${STEPS[s]}`}>
        {STEPS.map((t, i) => (<div key={t} className={`tstep ${i <= s ? "done" : ""}`}><i /><span>{t}</span></div>))}
      </div>
      <div className="order-lines">
        {o.lines.map((l) => (
          <div className="sum-line" key={l.name + l.size}><img src={l.src} alt="" /><span>{l.name} (US {l.size}) x{l.qty}</span><b>{money(l.price * l.qty)}</b></div>
        ))}
      </div>
    </article>
  );
}
