import Link from "next/link";
import { Feather, Leaf, ShieldCheck, ArrowRight } from "lucide-react";
import PageShell from "../../components/PageShell";

export const metadata = { title: "About | Volterra" };

const VALUES = [
  { Icon: Feather, t: "Lightweight first", d: "Every gram has to earn its place. Our Aero trainers weigh around 280 g." },
  { Icon: Leaf, t: "Lighter on the planet", d: "Recycled mesh and midsole content, plus packaging with no plastic." },
  { Icon: ShieldCheck, t: "Built to last", d: "Deep-lug outsoles and reinforced uppers, backed by a one-year warranty." },
];
const STEPS = [
  { y: "2019", t: "The first prototype", d: "A small team in a garage tests its first air-assisted heel." },
  { y: "2021", t: "Aero launches", d: "The Aero platform reaches its first 10,000 runners." },
  { y: "2024", t: "Recycled mesh", d: "92% of our upper material now comes from recycled sources." },
  { y: "2026", t: "50K runners", d: "Volterra shoes now run trails and roads around the world." },
];

export default function About() {
  return (
    <PageShell eyebrow="Our story" title="Built for people" accent="who keep going." sub="Volterra started with a simple idea: a running shoe should feel like nothing, and take you everywhere.">
      <div className="grid3">
        {VALUES.map(({ Icon, t, d }) => (
          <div className="glass card rv" key={t}><span className="ico"><Icon size={20} /></span><h3>{t}</h3><p>{d}</p></div>
        ))}
      </div>

      <div className="split glass rv">
        <img src="/shoes/orange.png" alt="Aero Sunburst" />
        <div>
          <h2>Engineered for the dreamers</h2>
          <p>We test every pair on real roads and trails before it ships. Feedback from our runners goes straight back to the design table, which is why each release is lighter, cooler and grippier than the last.</p>
          <Link href="/shop" className="btn dark big">Explore the collection <ArrowRight size={16} /></Link>
        </div>
      </div>

      <div className="timeline">
        {STEPS.map((s) => (
          <div className="tl-item glass rv" key={s.y}><b>{s.y}</b><h4>{s.t}</h4><p>{s.d}</p></div>
        ))}
      </div>
    </PageShell>
  );
}
