import PageShell from "../../components/PageShell";
import SizeGuide from "../../components/SizeGuide";

export const metadata = { title: "Size Guide | Volterra" };

export default function Page() {
  return (
    <PageShell eyebrow="Fit guide" title="Find your" accent="perfect size." sub="Measure your foot, check the chart, and run with confidence.">
      <SizeGuide />
    </PageShell>
  );
}
