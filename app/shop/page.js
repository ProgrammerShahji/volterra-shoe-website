import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata = { title: "Shop | Volterra" };

export default function ShopPage() {
  return (
    <Suspense fallback={<section className="page" />}>
      <ShopClient />
    </Suspense>
  );
}
