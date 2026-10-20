import PageShell from "../../components/PageShell";

export const metadata = { title: "Terms of Service | Volterra" };

export default function Page() {
  return (
    <PageShell eyebrow="Legal" title="Terms of" accent="service." sub="Last updated: October 2026. Placeholder text: replace with your own terms before launch.">
      <div className="glass card prose rv">
        <h3>Orders</h3>
        <p>An order is confirmed once you receive a confirmation email. We may cancel an order if an item is out of stock or a payment cannot be verified.</p>
        <h3>Pricing</h3>
        <p>Prices are shown in US dollars and may change without notice. Promo codes cannot be combined.</p>
        <h3>Returns</h3>
        <p>Returns are accepted within 30 days on unworn items, as described on the Shipping and Returns page.</p>
        <h3>Liability</h3>
        <p>Our liability is limited to the value of the goods purchased, to the extent permitted by law.</p>
      </div>
    </PageShell>
  );
}
