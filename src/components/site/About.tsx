import { Calendar, Plane, Rocket, PartyPopper, Clock } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const BLOCKS = [
  {
    title: "What the residency is",
    body: "A focused technology residency where developers, builders, researchers and innovators work together on privacy-focused blockchain technology. Over three weeks, residents move from fundamentals to shipping real projects.",
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
    body: "Participants develop technical skills, collaborate with other builders, work on practical projects and engage with the broader privacy and blockchain ecosystem.",
  },
  {
    title: "Why it matters for Africa",
    body: "Privacy technology protects people, and blockchain development creates open infrastructure. Building that capability locally strengthens Africa's technology ecosystem.",
  },
];

const TIMELINE = [
  {
    icon: Plane,
    date: "Tuesday, 1 September 2026",
    title: "Arrival & Induction",
    body: "Residents arrive, register and are inducted into the programme.",
  },
  {
    icon: Rocket,
    date: "Wednesday, 2 September 2026",
    title: "Programme Launch",
    body: "Lectures, practical sessions and project building officially begin.",
  },
  {
    icon: Clock,
    date: "Programme Duration: 3 Weeks",
    title: "Three Weeks of Building",
    body: "The programme combines education, practical development, daily challenges, community interaction, project building and friendly competition.",
  },
  {
    icon: PartyPopper,
    date: "Sunday, 20 September 2026",
    title: "Demo Day & Gala Night",
    body: "Final presentations, awards, recognition of outstanding residents, networking and celebration.",
  },
  {
    icon: Plane,
    date: "Monday, 21 September 2026",
    title: "Departure",
    body: "Checkout and departure of residents.",
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

      <div className="mt-16">
        <SectionHeading
          eyebrow="Programme Timeline"
          title="Key dates and milestones"
          description="A clear arc from arrival to departure."
        />

        <div className="mt-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-5 hidden w-px bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0 md:block" />
            <div className="grid gap-6">
              {TIMELINE.map((item) => (
                <div key={item.date} className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                  <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background text-primary">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div className="surface-panel flex-1 rounded-2xl p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">{item.date}</p>
                    <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
