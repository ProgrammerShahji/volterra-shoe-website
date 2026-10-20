import PageShell from "../../components/PageShell";

export const metadata = { title: "FAQ | Volterra" };

const GROUPS = [
  { g: "Orders and shipping", q: [
    ["How long does delivery take?", "Standard delivery takes 3 to 6 business days. You get a tracking update once your order ships."],
    ["Is shipping free?", "Orders over $200 ship free. Below that, shipping is a flat $9."],
    ["Can I change my order after placing it?", "Contact us within 2 hours of ordering and we will update the size or address if it has not shipped."],
  ]},
  { g: "Sizing and fit", q: [
    ["Do Aero shoes fit true to size?", "Yes, with a roomy toe box. Between sizes, go half a size up for long runs."],
    ["Where can I find my size?", "Use the foot-length finder on our Size Guide page."],
  ]},
  { g: "Returns and warranty", q: [
    ["What is your return policy?", "Return unworn shoes within 30 days for a full refund. See Shipping and Returns for the steps."],
    ["Is there a warranty?", "Every pair has a one-year warranty against manufacturing defects."],
    ["How do I use a promo code?", "Enter your code in the promo box on the checkout page and press Apply."],
  ]},
];

export default function Faq() {
  return (
    <PageShell eyebrow="Help centre" title="Questions," accent="answered." sub="Can't find what you need? Head to the contact page and we'll help.">
      <div className="faq">
        {GROUPS.map((g) => (
          <div className="rv" key={g.g}>
            <h3 className="faq-h">{g.g}</h3>
            {g.q.map(([q, a]) => (
              <details className="acc glass" key={q}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        ))}
      </div>
    </PageShell>
  );
}
