"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { POSTS, fmtDate } from "../lib/posts";

export function PostCard({ p, featured = false }) {
  return (
    <Link href={`/blog/${p.slug}`} className={`glass post ${featured ? "featured" : ""}`}>
      <div className="post-cover">
        <i style={{ background: p.glow }} />
        <img src={p.src} alt="" style={{ filter: p.tint }} draggable={false} />
      </div>
      <div className="post-body">
        <div className="post-meta"><span className="ptag static">{p.tag}</span><small>{fmtDate(p.date)} · {p.read} min read</small></div>
        <h3>{p.title}</h3>
        <p>{p.excerpt}</p>
        <span className="more">Read article <ArrowRight size={15} /></span>
      </div>
    </Link>
  );
}

export default function BlogList() {
  const tags = ["All", ...Array.from(new Set(POSTS.map((p) => p.tag)))];
  const [tag, setTag] = useState("All");
  const list = POSTS.filter((p) => tag === "All" || p.tag === tag);
  return (
    <>
      <div className="chips rv" style={{ marginBottom: 28 }}>
        {tags.map((t) => (<button key={t} className={`chip ${t === tag ? "on" : ""}`} onClick={() => setTag(t)}>{t}</button>))}
      </div>
      <div className="post-grid">
        {list.map((p, i) => (<PostCard key={p.slug} p={p} featured={i === 0 && tag === "All"} />))}
      </div>
    </>
  );
}
