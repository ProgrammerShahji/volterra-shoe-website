import Link from "next/link";
import { Leaf, Recycle, Package, ArrowRight } from "lucide-react";
import PageShell from "../../components/PageShell";

export const metadata = { title: "Sustainability | Volterra" };

const ITEMS = [
  { Icon: Recycle, t: "Recycled materials", d: "Our knit uppers and midsole foam include a high share of recycled content, and we aim to raise it every season." },
  { Icon: Package, t: "Plastic-free packaging", d: "Boxes are recycled card, printed with water-based ink and shipped without plastic filler." },
  { Icon: Leaf, t: "Made to last", d: "A durable shoe is the greenest shoe. Every pair has a one-year warranty and repair guidance." },
];

export default function Page() {
  return (
    <PageShell eyebrow="Our planet" title="Lighter on" accent="the planet." sub="Running outdoors is a privilege. Here is how we try to protect the places we love to run.">
      <div className="grid3">
        {ITEMS.map(({ Icon, t, d }) => (<div className="glass card rv" key={t}><span className="ico"><Icon size={20} /></span><h3>{t}</h3><p>{d}</p></div>))}
      </div>
      <div className="glass card cta-strip rv">
        <div><h3>Shoes that run further</h3><p>Look after your pair and it will take you thousands of kilometres.</p></div>
        <Link href="/blog/caring-for-your-knit-upper" className="btn dark">Care guide <ArrowRight size={16} /></Link>
      </div>
    </PageShell>
  );
}
