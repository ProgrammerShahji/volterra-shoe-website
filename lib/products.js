export const SIZES = [6, 7, 8, 9, 10, 11, 12];
export const CATS = ["All", "Running", "Trail", "Lifestyle"];
export const FREE_SHIP = 200;
export const SHIP_FEE = 9;

const base = {
  desc: "A cushioned, featherweight trainer with an air-assisted heel, breathable engineered knit and a deep-lug outsole built for daily miles.",
};

// NOTE: only 3 real photos exist, so the last 3 products reuse them with a colour tint.
export const PRODUCTS = [
  { ...base, id: "aero-sunburst", name: "Aero Sunburst", cat: "Running", price: 149, was: 179, rating: 4.8, reviews: 312, src: "/shoes/orange.png", glow: "#ff8a2b", dot: "#ff7a1a", tint: "", color: "Cream and orange", tag: "Best Seller" },
  { ...base, id: "aero-stealth", name: "Aero Stealth", cat: "Lifestyle", price: 159, was: null, rating: 4.7, reviews: 204, src: "/shoes/black.png", glow: "#6d7a99", dot: "#15151b", tint: "", color: "Triple black", tag: "New" },
  { ...base, id: "aero-cobalt", name: "Aero Cobalt", cat: "Running", price: 149, was: 169, rating: 4.9, reviews: 268, src: "/shoes/blue.png", glow: "#2f6bff", dot: "#1f4fd8", tint: "", color: "White and cobalt", tag: "Limited" },
  { ...base, id: "aero-mint", name: "Aero Mint", cat: "Trail", price: 139, was: null, rating: 4.6, reviews: 97, src: "/shoes/orange.png", glow: "#22c58b", dot: "#22c58b", tint: "hue-rotate(110deg) saturate(1.15)", color: "Mint and cream", tag: "Trail Pick" },
  { ...base, id: "aero-rose", name: "Aero Rose", cat: "Lifestyle", price: 145, was: 165, rating: 4.7, reviews: 143, src: "/shoes/orange.png", glow: "#ff5c8a", dot: "#ff5c8a", tint: "hue-rotate(-38deg) saturate(1.2)", color: "Rose and white", tag: "Sale" },
  { ...base, id: "aero-violet", name: "Aero Violet", cat: "Trail", price: 155, was: null, rating: 4.8, reviews: 121, src: "/shoes/blue.png", glow: "#8b5cf6", dot: "#8b5cf6", tint: "hue-rotate(60deg) saturate(1.1)", color: "Violet and white", tag: "New" },
];

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
export const money = (n) => "$" + (n % 1 ? n.toFixed(2) : n);
export const shadow = (p, s = "drop-shadow(0 26px 24px rgba(10,30,70,.25))") => `${p.tint || ""} ${s}`.trim();
