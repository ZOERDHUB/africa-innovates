import { Link } from "@tanstack/react-router";
import { Heart, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";

const POINTS = [
  {
    icon: Sparkles,
    title: "Support Developers",
    body: "Sponsorship funds resident support, learning resources and developer prizes.",
  },
  {
    icon: ShieldCheck,
    title: "Build Privacy",
    body: "Contribute in ZEC, with shielded options where technically supported.",
  },
  {
    icon: Users,
    title: "Grow the Ecosystem",
    body: "Sponsor a challenge, a workshop, an award — or a single resident for 1 ZEC.",
  },
];

export function Sponsorship() {
  return (
    <section id="sponsorship" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading
        eyebrow="ZEC Sponsorship & Community Support Programme"
        title="Support Developers. Build Privacy. Grow the Zcash Ecosystem."
        description="An ecosystem-building initiative — not advertising. Individuals, developers, organisations, protocols and wallets can support the Residency and the developers taking part in it, using ZEC."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {POINTS.map((p) => (
          <article key={p.title} className="surface-panel rounded-2xl p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
              <p.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="hero" size="lg">
          <Link to="/sponsorship">Support the Residency with ZEC</Link>
        </Button>
        <Button asChild variant="accent" size="lg">
          <Link to="/sponsorship" hash="sponsor-a-resident">
            <Heart /> Sponsor a Developer
          </Link>
        </Button>
      </div>
    </section>
  );
}
