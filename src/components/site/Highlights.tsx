import { SectionHeading } from "./SectionHeading";

const JOURNEY = [
  { step: "1", title: "Blockchain Fundamentals", facilitator: "zkSquirrel", time: "6:00 PM WAT" },
  { step: "2", title: "Understanding Financial Privacy", facilitator: "zkSquirrel", time: "6:00 PM WAT" },
  { step: "3", title: "Zcash Architecture", facilitator: "zkSquirrel", time: "6:00 PM WAT" },
  { step: "4", title: "Development Environment", facilitator: "zkSquirrel", time: "6:00 PM WAT" },
  { step: "5", title: "Wallet Development", facilitator: "Lowo", time: "6:00 PM WAT" },
  { step: "6", title: "Shielded Payments", facilitator: "Dismad", time: "6:00 PM WAT" },
  { step: "7", title: "Zcash SDKs", facilitator: "Lowo", time: "6:00 PM WAT" },
  { step: "8", title: "Backend Development", facilitator: "Gilmore", time: "12:00 PM WAT" },
  { step: "9", title: "Full Stack Development", facilitator: "Lowo", time: "6:00 PM WAT" },
  { step: "10", title: "Privacy Payment Applications", facilitator: "Inspire_s", time: "12:00 PM WAT" },
  { step: "11", title: "Security", facilitator: "ZOERDHUB", time: "12:00 PM WAT" },
  { step: "12", title: "Testing", facilitator: "ZOERDHUB", time: "12:00 PM WAT" },
  { step: "13", title: "Production Development", facilitator: "ZOERDHUB", time: "12:00 PM WAT" },
  { step: "14", title: "Open Source Development", facilitator: "Vancube", time: "12:00 PM WAT" },
  { step: "15", title: "Startup & Grant Writing", facilitator: "Gilmore", time: "12:00 PM WAT" },
  { step: "16", title: "Demo Day Preparation", facilitator: "ZOERDHUB", time: "12:00 PM WAT" },
];

export function Highlights() {
  return (
    <section id="programme" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading
        eyebrow="The Learning Journey"
        title="16-Step Learning Journey"
        description="From blockchain fundamentals to demo day, each session builds toward shipping a real privacy-focused project."
      />

      <div className="mt-12 grid auto-cols-[minmax(260px,1fr)] grid-flow-col grid-rows-2 gap-3 overflow-x-auto pb-3 snap-x snap-mandatory sm:grid-cols-2 sm:grid-flow-row sm:grid-rows-none sm:overflow-visible lg:grid-cols-4">
        {JOURNEY.map((item) => (
          <article
            key={item.step}
            className="surface-panel group relative snap-start rounded-2xl p-5 transition-colors hover:border-primary/50"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              {item.step}
            </span>
            <h3 className="mt-4 text-sm font-semibold leading-snug">{item.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              {item.facilitator} · {item.time}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground lg:hidden">Swipe horizontally to see all 16 sessions.</p>
    </section>
  );
}
