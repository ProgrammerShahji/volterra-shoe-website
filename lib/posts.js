export const POSTS = [
  { slug: "choose-the-right-running-shoe", title: "How to choose the right running shoe", tag: "Guides", date: "2026-09-12", read: 5, src: "/shoes/orange.png", glow: "#ff8a2b", tint: "",
    excerpt: "Cushion, drop, fit and surface: four questions that point you to the right pair.",
    body: [
      { p: "The best running shoe is the one that disappears on your foot. Start with where you run most: roads need smooth, cushioned soles, while trails need grip and a sturdier upper." },
      { h: "Check the fit first", p: "Leave a thumb's width in front of your longest toe and make sure your heel stays put. Try shoes in the afternoon, when your feet are at their largest." },
      { h: "Then think about cushion", p: "More cushion feels plush on long, easy runs. Less cushion feels faster and more connected. If you are unsure, choose a balanced midsole and adjust later." },
    ] },
  { slug: "trail-vs-road", title: "Trail vs road: what actually changes", tag: "Guides", date: "2026-08-28", read: 4, src: "/shoes/orange.png", glow: "#22c58b", tint: "hue-rotate(110deg) saturate(1.15)",
    excerpt: "Lugs, rock plates and tougher uppers: what trail shoes add, and when you really need them.",
    body: [
      { p: "Trail shoes look like road shoes with a bolder outsole, but the differences go deeper. Deeper lugs bite into soft ground, and a tougher upper shrugs off scrapes." },
      { h: "Grip you can trust", p: "Wet rock, mud and loose gravel all demand an outsole that bites. Our Mint and Violet pairs use deep lugs that still feel smooth on pavement." },
      { h: "Can you use trail shoes on the road?", p: "Yes, for short stretches. For mostly paved routes, a road shoe will feel lighter and quieter." },
    ] },
  { slug: "inside-the-aero-midsole", title: "Inside the Aero: a lighter midsole", tag: "Tech", date: "2026-08-10", read: 6, src: "/shoes/blue.png", glow: "#2f6bff", tint: "",
    excerpt: "A look at the air-assisted heel and the recycled foam that keep the Aero near 280 grams.",
    body: [
      { p: "Weight is the enemy of a good run. The Aero midsole combines a responsive foam with an air-assisted heel pocket, so you get cushioning without the bulk." },
      { h: "Recycled, not compromised", p: "A large share of the foam and mesh comes from recycled sources. We test every batch for rebound and durability before it reaches a shoe." },
      { h: "Where the grams went", p: "Thinner overlays, an open knit upper and a leaner heel counter shave weight while keeping the shoe locked in." },
    ] },
  { slug: "build-your-base-mileage", title: "Five easy routes to build your base mileage", tag: "Training", date: "2026-07-22", read: 5, src: "/shoes/black.png", glow: "#6d7a99", tint: "",
    excerpt: "Slow down, run more often and let your body adapt. A simple plan for the first eight weeks.",
    body: [
      { p: "Base mileage is built on patience. Run most of your miles at a pace where you can hold a conversation, and add no more than ten percent a week." },
      { h: "Keep the routes simple", p: "Pick loops you enjoy: a park circuit, a riverside path, a quiet neighbourhood. Familiar routes make it easier to focus on effort, not navigation." },
      { h: "Rest is training", p: "Take a full rest day each week and sleep well. Adaptation happens while you recover, not while you run." },
    ] },
  { slug: "caring-for-your-knit-upper", title: "Caring for your knit upper", tag: "Care", date: "2026-07-05", read: 3, src: "/shoes/orange.png", glow: "#ff5c8a", tint: "hue-rotate(-38deg) saturate(1.2)",
    excerpt: "Keep your shoes fresh and bright with a few two-minute habits.",
    body: [
      { p: "Knit uppers are light and breathable, but they like gentle care. Brush off dry dirt first, then wipe with a damp cloth and mild soap." },
      { h: "Skip the washing machine", p: "Heat and tumbling can warp the midsole and loosen glue. Air dry away from direct sun or radiators, with the laces out." },
      { h: "Rotate your pairs", p: "Giving shoes a day to dry between runs extends their life and keeps them smelling fresh." },
    ] },
];
export const getPost = (slug) => POSTS.find((p) => p.slug === slug);
export const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
