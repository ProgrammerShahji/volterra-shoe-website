import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PageShell from "../../../components/PageShell";
import { PostCard } from "../../../components/BlogList";
import { POSTS, getPost, fmtDate } from "../../../lib/posts";

export function generateStaticParams() { return POSTS.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }) {
  const p = getPost(params.slug);
  return { title: p ? `${p.title} | Volterra` : "Journal | Volterra" };
}

export default function Post({ params }) {
  const p = getPost(params.slug);
  if (!p) notFound();
  const more = POSTS.filter((x) => x.slug !== p.slug).slice(0, 2);
  return (
    <PageShell eyebrow={`${p.tag} · ${fmtDate(p.date)} · ${p.read} min read`} title={p.title} sub={p.excerpt}>
      <article className="article">
        <div className="post-cover glass rv"><i style={{ background: p.glow }} /><img src={p.src} alt="" style={{ filter: p.tint }} /></div>
        <div className="prose-plain rv">
          {p.body.map((b, i) => (<div key={i}>{b.h && <h3>{b.h}</h3>}<p>{b.p}</p></div>))}
        </div>
        <Link href="/blog" className="btn ghost rv"><ArrowLeft size={16} /> Back to journal</Link>
      </article>
      <h2 className="more-h">Keep reading</h2>
      <div className="post-grid">{more.map((m) => (<PostCard key={m.slug} p={m} />))}</div>
    </PageShell>
  );
}
