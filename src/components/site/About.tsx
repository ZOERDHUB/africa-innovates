import { SectionHeading } from "./SectionHeading";

const BLOCKS = [
  {
    title: "What the residency is",
    body: "A focused technology residency where developers, builders, researchers and innovators work together on privacy-focused blockchain technology. Full programme details are published by the organisers. [DETAILS TO BE CONFIRMED]",
  },
  {
    title: "Why it is being organised",
    body: "To grow local capacity in privacy engineering and blockchain development, and to connect African builders with the wider open-source ecosystem.",
  },
  {
    title: "The role of ZOERD",
    body: "ZOERD Privacy Blockchain & AI Innovation Hub convenes the residency, provides the innovation environment, technical direction and research framing.",
  },
  {
    title: "The role of Zcash Ghana",
    body: "Zcash Ghana brings community, privacy-technology expertise and ecosystem connections to the residency programme.",
  },
  {
    title: "What participants learn and build",
    body: "Participants develop technical skills, collaborate with other builders, work on practical projects and engage with the broader privacy and blockchain ecosystem. [CURRICULUM TO BE CONFIRMED]",
  },
  {
    title: "Why it matters for Africa",
    body: "Privacy technology protects people, and blockchain development creates open infrastructure. Building that capability locally strengthens Africa's technology ecosystem.",
  },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading
        eyebrow="About the Programme"
        title="A residency built around builders, not hype"
        description="The residency is an opportunity to develop technical skills, collaborate with other builders, work on practical projects and engage with the privacy and blockchain ecosystem."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {BLOCKS.map((block) => (
          <article key={block.title} className="surface-panel rounded-2xl p-6">
            <h3 className="text-lg font-semibold">{block.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{block.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
