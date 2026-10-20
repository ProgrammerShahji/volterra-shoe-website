import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import PageShell from "../../components/PageShell";

export const metadata = { title: "Store Locator | Volterra" };

const STORES = [
  { n: "Volterra Flagship", a: "123 Runner Avenue, Sample City", h: "Daily 10am to 9pm", p: "+1 (555) 010-2030" },
  { n: "Volterra Trail House", a: "48 Summit Road, Sample Heights", h: "Mon to Sat 9am to 7pm", p: "+1 (555) 010-2031" },
  { n: "Volterra Lakeside", a: "7 Lakeview Plaza, Sample Bay", h: "Daily 10am to 8pm", p: "+1 (555) 010-2032" },
];

export default function Page() {
  return (
    <PageShell eyebrow="Visit us" title="Find a" accent="Volterra store." sub="Try a pair on, get a free gait check and meet the team.">
      <div className="grid3">
        {STORES.map((s) => (
          <div className="glass card rv" key={s.n}>
            <span className="ico"><MapPin size={20} /></span>
            <h3>{s.n}</h3>
            <p>{s.a}</p>
            <p className="line-ico"><Clock size={15} /> {s.h}</p>
            <p className="line-ico"><Phone size={15} /> {s.p}</p>
            <a className="btn ghost" style={{ marginTop: 16 }} target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.a)}`}><Navigation size={15} /> Directions</a>
          </div>
        ))}
      </div>
      <p className="note rv">Sample locations: replace with your real stores.</p>
    </PageShell>
  );
}
