import PageShell from "../../components/PageShell";

export const metadata = { title: "Privacy Policy | Volterra" };

export default function Page() {
  return (
    <PageShell eyebrow="Legal" title="Privacy" accent="policy." sub="Last updated: October 2026. Placeholder text: replace with your own policy before launch.">
      <div className="glass card prose rv">
        <h3>What we collect</h3>
        <p>We collect the details you give us when you order or contact us: name, email, phone, delivery address and order history.</p>
        <h3>How we use it</h3>
        <p>To process and deliver orders, answer your questions and, if you opt in, send product news. We never sell your personal data.</p>
        <h3>Cookies and storage</h3>
        <p>We store your cart, wishlist and preferences in your browser so the site works as you expect.</p>
        <h3>Your rights</h3>
        <p>You can ask to see, correct or delete your data at any time by contacting hello@volterra.example.</p>
      </div>
    </PageShell>
  );
}
