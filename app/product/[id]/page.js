import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "../../../lib/products";
import ProductDetail from "../../../components/ProductDetail";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }) {
  const p = getProduct(params.id);
  return { title: p ? `${p.name} | Volterra` : "Product | Volterra" };
}

export default function ProductPage({ params }) {
  const p = getProduct(params.id);
  if (!p) notFound();
  return <ProductDetail p={p} />;
}
