import Link from "next/link";
import { Truck, RotateCcw, Package } from "lucide-react";
import PageShell from "../../components/PageShell";

export const metadata = { title: "Shipping and Returns | Volterra" };

export default function Page() {
  return (
    <PageShell eyebrow="Policies" title="Shipping and" accent="returns." sub="Simple, fair and fast.">
      <div className="grid3">
        <div className="glass card rv"><span className="ico"><Truck size={20} /></span><h3>Shipping</h3><p>Flat $9 per order. Free on orders over $200. Standard delivery takes 3 to 6 business days.</p></div>
        <div className="glass card rv"><span className="ico"><RotateCcw size={20} /></span><h3>30-day returns</h3><p>Not right? Return unworn shoes within 30 days for a full refund to your original payment method.</p></div>
        <div className="glass card rv"><span className="ico"><Package size={20} /></span><h3>Exchanges</h3><p>Need a different size? Request an exchange and we will ship the new pair as soon as yours arrives.</p></div>
      </div>
      <div className="glass card prose rv">
        <h3>How to return an item</h3>
        <ol>
          <li>Open <Link href="/orders">My Orders</Link> and find your order number.</li>
          <li>Contact us through the <Link href="/contact">contact page</Link> with the order number and reason.</li>
          <li>Pack the shoes in their original box and use the prepaid label we send you.</li>
          <li>Your refund is issued within 5 business days of us receiving the parcel.</li>
        </ol>
      </div>
    </PageShell>
  );
}
