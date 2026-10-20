import PageShell from "../../components/PageShell";
import BlogList from "../../components/BlogList";

export const metadata = { title: "Journal | Volterra" };

export default function Blog() {
  return (
    <PageShell eyebrow="The journal" title="Run smarter," accent="read more." sub="Guides, training ideas and stories from the Volterra team.">
      <BlogList />
    </PageShell>
  );
}
