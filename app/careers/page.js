import { Briefcase } from "lucide-react";
import PageShell from "../../components/PageShell";

export const metadata = { title: "Careers | Volterra" };

const ROLES = [
  { t: "Footwear Designer", w: "Design · Remote friendly", d: "Shape the next Aero colourways and materials." },
  { t: "Frontend Engineer", w: "Engineering · Remote", d: "Build fast, animated shopping experiences." },
  { t: "Customer Care Specialist", w: "Support · Full time", d: "Help runners find the right fit and fix any issue." },
];

export default function Page() {
  return (
    <PageShell eyebrow="Join us" title="Build shoes" accent="people love." sub="We are a small team that cares about craft, speed and kindness. Come run with us.">
      <div className="roles">
        {ROLES.map((r) => (
          <div className="glass card role rv" key={r.t}>
            <span className="ico"><Briefcase size={20} /></span>
            <div><h3>{r.t}</h3><small>{r.w}</small><p>{r.d}</p></div>
            <a className="btn dark" href={`mailto:careers@volterra.example?subject=${encodeURIComponent("Application: " + r.t)}`}>Apply</a>
          </div>
        ))}
      </div>
      <p className="note rv">Sample listings: replace with your real openings.</p>
    </PageShell>
  );
}
