import { Mail, Phone, MapPin, Clock } from "lucide-react";
import PageShell from "../../components/PageShell";
import ContactForm from "../../components/ContactForm";

export const metadata = { title: "Contact | Volterra" };

const INFO = [
  { Icon: Mail, t: "Email", d: "hello@volterra.example" },
  { Icon: Phone, t: "Phone", d: "+1 (555) 010-2030" },
  { Icon: MapPin, t: "Studio", d: "123 Runner Avenue, Sample City" },
  { Icon: Clock, t: "Hours", d: "Mon to Fri, 9am to 6pm" },
];

export default function Contact() {
  return (
    <PageShell eyebrow="We reply fast" title="Let's talk" accent="about your run." sub="Questions about an order, sizing or anything else? Send us a note and a real person will answer.">
      <div className="contact-grid">
        <div className="info-col">
          {INFO.map(({ Icon, t, d }) => (
            <div className="glass card info rv" key={t}><span className="ico"><Icon size={20} /></span><div><h4>{t}</h4><p>{d}</p></div></div>
          ))}
        </div>
        <div className="rv"><ContactForm /></div>
      </div>
    </PageShell>
  );
}
