import {
  BookOpen,
  ShieldCheck,
  Code2,
  Hammer,
  Compass,
  Users,
  GitMerge,
  Lightbulb,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const HIGHLIGHTS = [
  { icon: BookOpen, title: "Technical Learning", body: "Structured sessions on core engineering fundamentals. [DETAILS TO BE CONFIRMED]" },
  { icon: ShieldCheck, title: "Privacy & Blockchain", body: "Shielded transactions, zero-knowledge concepts and privacy-preserving design." },
  { icon: Code2, title: "Developer Workshops", body: "Hands-on workshops facilitated by ecosystem contributors." },
  { icon: Hammer, title: "Project Building", body: "Residents build practical projects during the residency." },
  { icon: Compass, title: "Mentorship", body: "Guidance from mentors across the privacy and blockchain ecosystem." },
  { icon: Users, title: "Community", body: "A cohort of builders, researchers and innovators working side by side." },
  { icon: GitMerge, title: "Collaboration", body: "Open-source collaboration and shared contribution." },
  { icon: Lightbulb, title: "Innovation", body: "Space to explore new ideas for Africa's technology ecosystem." },
];

export function Highlights() {
  return (
    <section id="programme" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading
        eyebrow="Programme Highlights"
        title="What participants experience"
        description="Each element of the residency is designed around practical building, technical depth and community."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HIGHLIGHTS.map((item) => (
          <article
            key={item.title}
            className="surface-panel group rounded-2xl p-6 transition-colors hover:border-primary/50"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
              <item.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-base font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
